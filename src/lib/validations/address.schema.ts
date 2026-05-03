import * as z from "zod";

export const createAddressSchema = z.object({
  village: z.string().min(1, "Village is required"),
  cell: z.string().min(1, "Cell is required"),
  sector: z.string().min(1, "Sector is required"),
  district: z.string().min(1, "District is required"),
  province: z.string().min(1, "Province is required"),
  userId: z.string().min(1, "Atleast one character required"),
});

export const updateAddressSchema = createAddressSchema.partial();

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;