import * as z from "zod";

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const createWalletProviderSchema = z.object({
  name: z.string().min(2, "Provider name must be at least 2 characters"),
  country: z.string().length(2, "Country code must be 2 characters"),
  logoUrl: z.string().url("Invalid logo URL"),
  status: z.boolean().default(true),
});

export const createWalletAccountSchema = z.object({
  userId: z.string().min(1, "Atleast one character required"),
  providerId: z.number().int().positive(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
});

export const updateWalletAccountSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format").optional(),
  status: z.enum(["ACTIVE", "SUSPENDED", "CLOSED"]).optional(),
});

export const depositToWalletSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  reference: z.string().min(1, "Reference is required"),
  description: z.string().optional(),
});

export const withdrawFromWalletSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  reference: z.string().min(1, "Reference is required"),
  description: z.string().optional(),
  bankAccountId: z.number().int().positive().optional(),
  bankCardId: z.number().int().positive().optional(),
}).refine(
  (data) => data.bankAccountId || data.bankCardId,
  {
    message: "Either bank account or bank card must be provided for withdrawal",
    path: ["bankAccountId", "bankCardId"],
  }
);

export const transferBetweenWalletsSchema = z.object({
  fromAccountId: z.number().int().positive(),
  toAccountId: z.number().int().positive(),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().optional(),
}).refine(
  (data) => data.fromAccountId !== data.toAccountId,
  {
    message: "Cannot transfer to the same wallet account",
    path: ["toAccountId"],
  }
);

export const verifyWalletAccountSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const walletQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  type: z.enum(["DEPOSIT", "WITHDRAWAL", "TRANSFER", "PAYMENT"]).optional(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED", "CANCELLED"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type CreateWalletProviderInput = z.infer<typeof createWalletProviderSchema>;
export type CreateWalletAccountInput = z.infer<typeof createWalletAccountSchema>;
export type UpdateWalletAccountInput = z.infer<typeof updateWalletAccountSchema>;
export type DepositToWalletInput = z.infer<typeof depositToWalletSchema>;
export type WithdrawFromWalletInput = z.infer<typeof withdrawFromWalletSchema>;
export type TransferBetweenWalletsInput = z.infer<typeof transferBetweenWalletsSchema>;
export type VerifyWalletAccountInput = z.infer<typeof verifyWalletAccountSchema>;
export type WalletQueryInput = z.infer<typeof walletQuerySchema>;