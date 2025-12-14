import { prisma } from "@/lib/prisma";
import { beforeAll, afterAll, afterEach } from "vitest";
import { cleanupTestData } from "./helpers/cleanup";

afterAll(async () => {
  await prisma.$disconnect();
});
