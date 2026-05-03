import * as z from "zod";

export const createShopSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  ownerId:z.string().min(1, "owner is required"),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
});

export const updateShopSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  status: z.enum(["ACTIVE", "SUSPENDED", "CLOSED"]).optional(),
});

export const shopQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  ownerId: z.string().min(1).optional(),
  status: z.enum(["ACTIVE", "SUSPENDED", "CLOSED"]).optional(),
});

export type CreateShopInput = z.infer<typeof createShopSchema>;
export type UpdateShopInput = z.infer<typeof updateShopSchema>;
export type ShopQueryInput = z.infer<typeof shopQuerySchema>;