import { AccountStatus, CardStatus } from "@/app/generated/prisma";
import * as z from "zod";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const createAccountSchema = z.object({
  userId: z.string().min(2,"User Id must be at least one character"),
  balance: z.number().optional(),
  availableBalance: z.number().optional(),
});

const updateAccountSchema = z.object({
  userId: z.string().min(2,"User Id must be at least one character"),
  balance: z.number(),
  availableBalance: z.number(),
  status: z
    .enum(Object.values(AccountStatus), {
      message: `Status must be one of  ${Object.values(AccountStatus).join(", ")}`,
    })
    .optional(),
});

const cardSchema = z.object({
  userId: z.string().min(2,"User Id must be at least one character"),
  cardNumber: z.string().min(2, "Card number must be at least 2 characters"),
  expiryDate: z.string().min(2, "Expiry date must be at least 2 characters"),
});

const updateCardSchema= z.object({
    userId: z.string().min(2,"User Id must be at least one character"),
    cardNumber: z.string().min(2, "Card number must be at least 2 characters").optional(),
    expiryDate: z.string().min(2, "Expiry date must be at least 2 characters").optional(),
    status: z.enum(Object.values(CardStatus), {
      message: `Status must be one of  ${Object.values(CardStatus).join(", ")}`,
    }).optional(),
})

const settlementAccountSchema= z.object({
    accountNumber: z.string().min(2, "Account number must be at least 2 characters").regex(phoneRegex, "Account number must be a valid phone number"),
    accountName: z.string().min(2, "Account name must be at least 2 characters"),
})
 


export type CreateAccountValues = z.infer<typeof createAccountSchema>;
export type UpdateAccountValues = z.infer<typeof updateAccountSchema>;
export type CardValues = z.infer<typeof cardSchema>;
export type UpdateCardValues = z.infer<typeof updateCardSchema>;
export type SettlementAccountValues = z.infer<typeof settlementAccountSchema>;

export { createAccountSchema, updateAccountSchema, cardSchema, updateCardSchema, settlementAccountSchema };
