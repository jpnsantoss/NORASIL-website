import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
const db = new PrismaClient()

dotenv.config();

async function main() {
  const user = await db.authorizedEmail.findFirst({
    where: {
      email: process.env.ADMIN_EMAIL! as string,
    }
  })
  if(!user) { await db.authorizedEmail.create({
    data: {
      email: process.env.ADMIN_EMAIL! as string ,
    },
  })
  console.log(`Added authorized user: ${process.env.ADMIN_EMAIL}`)
}
  const counter = await db.counter.count();
  if(counter == 0) {
    await db.counter.create({data: {}})
  }
  
  console.log("Added counter to database")
}

main()
.catch((error) => {
  console.error(error);
  process.exit(1);
})
.finally(async () => {
  await db.$disconnect();
});