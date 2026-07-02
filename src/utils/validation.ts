import { z } from "zod";

const accountNumber = z
  .string()
  .trim()
  .min(1, "Account number is required");

const amount = z
  .coerce.number({ invalid_type_error: "Enter a valid amount" })
  .positive("Amount must be greater than zero");

export const openAccountSchema = z.object({
  firstName: z.string().trim().min(2, "First name is too short"),
  lastName: z.string().trim().min(2, "Last name is too short"),
  email: z.string().trim().email("Enter a valid email address"),
});
export type OpenAccountFormValues = z.infer<typeof openAccountSchema>;

export const updateAccountSchema = z.object({
  firstName: z.string().trim().min(2, "First name is too short"),
  lastName: z.string().trim().min(2, "Last name is too short"),
});
export type UpdateAccountFormValues = z.infer<typeof updateAccountSchema>;

export const depositSchema = z.object({
  accountNumber,
  amount,
  naration: z.string().trim().min(1, "Add a short narration"),
});
export type DepositFormValues = z.infer<typeof depositSchema>;

export const withdrawSchema = z.object({
  accountNumber,
  amount,
});
export type WithdrawFormValues = z.infer<typeof withdrawSchema>;

export const transferSchema = z
  .object({
    senderAccountNumber: accountNumber,
    receiverAccountNumber: accountNumber,
    amount,
    naration: z.string().trim().min(1, "Add a short narration"),
  })
  .refine((data) => data.senderAccountNumber !== data.receiverAccountNumber, {
    message: "Sender and receiver accounts must be different",
    path: ["receiverAccountNumber"],
  });
export type TransferFormValues = z.infer<typeof transferSchema>;
