import { z } from "zod";

/**
 * Schema dùng để validate dữ liệu khi tạo brand
 * - name: tên brand, bắt buộc, tối thiểu 2 ký tự
 * - slug: dùng cho URL + filter, bắt buộc, unique
 * - logo: optional, nếu có thì phải là URL hợp lệ
 */
export const createBrandSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  logo: z.string().url("Logo must be a valid URL").optional(),
});

/**
 * TypeScript type sinh ra từ Zod schema
 * → đảm bảo service layer KHÔNG DÙNG `any`
 */
export type CreateBrandInput = z.infer<typeof createBrandSchema>;
