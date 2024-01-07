import { PrismaClient } from "@prisma/client";
export const dbService = new PrismaClient({
  errorFormat: "pretty",
});
export default dbService;
