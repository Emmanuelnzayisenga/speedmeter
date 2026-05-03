import * as z from "zod";

// Bank Card Schemas
export const createBankCardSchema = z.object({
  userId: z.string().min(1, "Atleast one character required"),
  bankId: z.number().positive(),
  cardNumber: z.string()
    .min(13, "Card number must be at least 13 digits")
    .max(19, "Card number must not exceed 19 digits")
    .regex(/^\d+$/, "Card number must contain only digits"),
  holderName: z.string().min(2, "Holder name must be at least 2 characters"),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format"),
  cvv: z.string()
    .length(3, "CVV must be 3 digits")
    .or(z.string().length(4, "CVV must be 4 digits")),
  cardNetwork: z.enum(["VISA", "MASTERCARD", "AMERICAN_EXPRESS", "DISCOVER", "JCB", "UNIONPAY", "OTHER"]),
});

export const updateBankCardSchema = z.object({
  status: z.enum(["ACTIVE", "BLOCKED", "EXPIRED"]).optional(),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format")
    .optional(),
});

// App Card Schemas
export const createAppCardSchema = z.object({
  userId: z.string().min(1, "Atleast one character required"),
  cardNumber: z.string()
    .regex(/^([0-9A-Fa-f]{2}:)+[0-9A-Fa-f]{2}$/, "Card number must be in format XX:XX:XX:XX (hex pairs separated by colons)"),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format"),
});

export const updateAppCardSchema = z.object({
  status: z.enum(["ACTIVE", "BLOCKED", "EXPIRED"]).optional(),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format")
    .optional(),
});
// Card Limit Schemas
export const updateCardLimitsSchema = z.object({
  dailyLimit: z.number().positive().optional(),
  monthlyLimit: z.number().positive().optional(),
  transactionLimit: z.number().positive().optional(),
});

// Card Verification Schema
export const verifyCardSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// Card Block Schema
export const blockCardSchema = z.object({
  reason: z.string().optional(),
});

// Card Query Schema
export const cardQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  status: z.enum(["ACTIVE", "BLOCKED", "EXPIRED"]).optional(),
  bankId: z.number().positive().optional(),
  userId: z.string().min(1, "Atleast one character required").optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type CreateBankCardInput = z.infer<typeof createBankCardSchema>;
export type UpdateBankCardInput = z.infer<typeof updateBankCardSchema>;
export type CreateAppCardInput = z.infer<typeof createAppCardSchema>;
export type UpdateAppCardInput = z.infer<typeof updateAppCardSchema>;
export type UpdateCardLimitsInput = z.infer<typeof updateCardLimitsSchema>;
export type VerifyCardInput = z.infer<typeof verifyCardSchema>;
export type BlockCardInput = z.infer<typeof blockCardSchema>;
export type CardQueryInput = z.infer<typeof cardQuerySchema>;