import { prisma } from "@lib/prisma";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";
import { executeFromCondition, optionalExcute } from "@lib/excuteFromCondition";
import { JWT } from "next-auth/jwt";

type Credential = {
  email: string;
  password: string;
};

type Transform<U> = (
  credential: Credential,
  value?: U | null
) => Promise<U | null>;

const loginProcess = <T>(
  credentials: { email: string; password: string },
  value?: T | null
) => {
  const AuthProcess = {
    credentials,
    value,
    async map(transform: Transform<T>) {
      const newValue = await transform(credentials, value);
      return loginProcess<T>(credentials, newValue);
    },
    async getUser() {
      const user = value as User;
      return {
        ...user,
        id: user?.id.toString(),
      };
    },
  };
  return AuthProcess;
};
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credential) {
        if (!credential?.email || !credential.password) {
          return null;
        }
        // console.log({ credential });
        const found = await loginProcess<User>(credential).map(
          async (credential: Credential) => {
            const user = await prisma.user.findUnique({
              where: {
                email: credential.email,
              },
            });
            return user as User;
          }
        );

        const validated = await found.map(async (credential, user) => {
          if (!user) {
            return null;
          }
          if (credential?.password) {
            const isPasswordValid = await compare(
              credential?.password,
              user.password
            );
            if (!isPasswordValid) {
              return null;
            }
          }
          return user;
        });

        const user = await validated.getUser();
        return optionalExcute(
          () => user,
          () => null
        )(Boolean(user.id))();
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, session }) {
      const userLoggedIn = user as unknown as User;
      return optionalExcute(
        (token: JWT) => ({ ...token }),
        (token: JWT) => ({
          ...token,
          id: userLoggedIn?.id,
          role: userLoggedIn?.role,
          username: userLoggedIn?.username,
          email: userLoggedIn?.email,
        })
      )(!userLoggedIn)(token);
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          role: token.role,
          username: token.username,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
