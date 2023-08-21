import { prisma } from "@lib/prisma";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";
import { executeAsyncChain } from "@lib/asyncFuncsRun";

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
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const proceduresToRun = executeAsyncChain([
          async () => {
            if (!credentials?.email || !credentials.password) {
              return null;
            }
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email,
              },
            });
            return user;
          },
          async (user: User) => {
            if (!user) {
              return null;
            }
            if (credentials?.password) {
              const isPasswordValid = await compare(
                credentials?.password,
                user.password
              );
              return { isPasswordValid, user };
            }
          },
          async ({
            isPasswordValid,
            user,
          }: {
            isPasswordValid: boolean;
            user: User;
          }) => {
            if (!isPasswordValid) {
              return null;
            }
            return {
              ...user,
            };
          },
        ]);
        return proceduresToRun();
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
