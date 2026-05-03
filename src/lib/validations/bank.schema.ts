import { CardNetwork } from "@/app/generated/prisma";
import { AccountStatus } from "@/app/generated/prisma";
import * as z from "zod";
import { CardStatus } from "@/app/generated/prisma";


const createBankSchema = z.object({
  bankName: z.string().min(2, "Bank name must be at least 2 character"),
  code: z.string().min(2, "Bank code must be at least 2 characters"),
  logoUrl:z.string().url("Logo URL must be a valid URL"),
});

const updateBankSchema = z.object({
  bankName: z
    .string()
    .min(2, "Bank name must be at least 2 characters")
    .optional(),
  code: z.string().min(2, "Bank code must be at least 2 characters").optional(),
  logoUrl: z.string().url("Logo URL must be a valid URL").optional(),
});

const createBankAccountSchema = z.object({
  accountName: z.string().min(2, "Account name must be at least 2 characters"),
  accountNumber: z
    .string()
    .min(2, "Account number must be at least 2 characters"),
  bankId: z.number().min(1,"Bank ID must be an integer"),
  userId: z.string().min(2,"User Id must be at least one character"),
});

const updateBankAccountSchema = z.object({
  accountName: z
    .string()
    .min(2, "Account name must be at least 2 characters")
    .optional(),
  accountNumber: z
    .string()
    .min(2, "Account number must be at least 2 characters")
    .optional(),
  bankId: z.number().min(1,"Bank ID must be an integer").optional(),
  userId: z.string().min(2,"User Id must be at least one character").optional(),
  balance: z.number().optional(),
  availableBalance: z.number().optional(),
  status: z.enum(Object.values(AccountStatus) , {
    message:   `Status must be one of  ${Object.values(AccountStatus).join(", ")}`,
  }).optional(),
});

const createBankCardSchema = z.object({
  userId: z.string().min(2,"User Id must be at least one character"),
  bankId: z.number().min(1,"Bank ID must be an integer"),
  cardNumber: z.string().min(2, "Card number must be at least 2 characters"),
  holderName: z
    .string()
    .min(2, "Card holder name must be at least 2 characters"),
  expiryDate: z.string().min(2, "Expiry date must be at least 2 characters"),
  cvv: z.string().min(2, "CVV must be at least 2 characters"),
  cardNetwork: z.enum(Object.values(CardNetwork) , {
    message:   `Card network must be one of  ${Object.values(CardNetwork).join(", ")}`,
  }),
});

const updateBankCardSchema = z.object({
  userId: z.string().min(2,"User Id must be at least one character").optional(),
  bankId: z.number().min(1,"Bank ID must be an integer").optional(),
    cardNumber: z.string().min(2, "Card number must be at least 2 characters").optional(),
    holderName: z
      .string()
      .min(2, "Card holder name must be at least 2 characters")
      .optional(),
    expiryDate: z.string().min(2, "Expiry date must be at least 2 characters").optional(),
    cvv: z.string().min(2, "CVV must be at least 2 characters").optional(),
    cardNetwork: z.enum(Object.values(CardNetwork) , {
      message:   `Card network must be one of  ${Object.values(CardNetwork).join(", ")}`,
    }).optional(),
    status: z.enum(Object.values(CardStatus) , {
      message:   `Status must be one of  ${Object.values(CardStatus).join(", ")}`,
    }).optional(),
  });

export type CreateBankValues = z.infer<typeof createBankSchema>;
export type UpdateBankValues = z.infer<typeof updateBankSchema>;
export type CreateBankAccountValues = z.infer<typeof createBankAccountSchema>;
export type UpdateBankAccountValues = z.infer<typeof updateBankAccountSchema>;
export type CreateBankCardValues = z.infer<typeof createBankCardSchema>;
export type UpdateBankCardValues = z.infer<typeof updateBankCardSchema>;

export {
  createBankSchema,
  updateBankSchema,
  createBankAccountSchema,
  updateBankAccountSchema,
  createBankCardSchema,
  updateBankCardSchema,
};
