import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const existingUser = await prisma.user.findUnique({
    where: { email: "test@test.com" },
  });

  if (!existingUser) {
    const user = await prisma.user.create({
      data: {
        email: "test@test.com",
        username: "Test User",
        password,
      },
    });
    console.log({ user });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
