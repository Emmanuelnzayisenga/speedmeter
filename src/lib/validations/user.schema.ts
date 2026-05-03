import * as z from "zod";

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

// Base schemas
export const userBaseSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().optional().nullable(),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
});

// Create user schema (includes password)
export const createUserSchema = userBaseSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["User", "Admin"]).optional().default("User"),
  language: z.enum(["en", "rw", "fr"]).optional().default("en"),
  timezoneId: z.number().int().positive().optional().default(1),
});

// Update user schema (all fields optional)
export const updateUserSchema = userBaseSchema.partial().extend({
  role: z.enum(["User", "Admin"]).optional(),
  language: z.enum(["en", "rw", "fr"]).optional(),
  isActive: z.boolean().optional(),
  profilePicture: z.string().url().optional().nullable(),
  dob: z.string().optional().nullable(),
  timezoneId: z.number().int().positive().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
});

// Edit profile schema (for users editing their own profile)
export const editProfileSchema = userBaseSchema;

// Change password schema
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });

// User query schema for filtering
export const userQuerySchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  role: z.enum(["User", "Admin"]).optional(),
  isActive: z.boolean().optional(),
  sortBy: z.string().optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

// Types
export type UserBaseInput = z.infer<typeof userBaseSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type EditProfileInput = z.infer<typeof editProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UserQueryInput = z.infer<typeof userQuerySchema>;