import { PrismaClient } from "@prisma/client";

type global = {
  prisma?: PrismaClient;
};

export const prisma = (global as global).prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (global as global).prisma = prisma;
}
