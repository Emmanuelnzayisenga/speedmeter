import { z } from "zod";

export const searchParamsSchema = z.object({
  search: z.string() .optional(),
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
});

export type SearchParamsValues = z.infer<typeof searchParamsSchema>;