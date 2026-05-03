import * as z from "zod";

export const createTransactionSchema = z.object({
  userId: z.string().min(1, "Atleast one character required"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().length(3, "Currency must be 3 characters"),
  transactionType: z.string().min(1, "Transaction type is required"),
  paymentMethod: z.enum(["BANK_ACCOUNT", "BANK_CARD", "WALLET", "OTHER"]),
});

export const updateTransactionSchema = z.object({
  status: z.enum(["PENDING", "COMPLETED", "FAILED", "CANCELLED"]).optional(),
});

export const transactionQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  userId: z.string().min(1, "Atleast one character required").optional(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED", "CANCELLED"]).optional(),
  type: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.string().optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type TransactionQueryInput = z.infer<typeof transactionQuerySchema>;