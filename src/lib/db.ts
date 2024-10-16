import { PrismaClient } from "@prisma/client/edge"; // Import from '@prisma/client/edge'
import "server-only";

const createPrismaClient = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use singleton pattern for the Prisma client instance.
const db = globalForPrisma.prisma ?? createPrismaClient();

// Export both db and acceleratedDb as the same instance.
const acceleratedDb = db;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export { acceleratedDb, db };
