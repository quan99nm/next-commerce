export const TEST_PREFIX = "test-";
import { nanoid } from "nanoid";
export function withTestPrefix(value: string) {
  return `${TEST_PREFIX}-${value}-${nanoid(8)}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
