import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
const db = new PrismaClient()

dotenv.config();

async function main() {
  const user = await db.authorizedEmail.create({
    data: {
      email: process.env.ADMIN_EMAIL! as string ,
    },
  })
  console.log(`Added authorized user: ${user.email}`)
}

main()
.catch((error) => {
  console.error(error);
  process.exit(1);
})
.finally(async () => {
  await db.$disconnect();
});