import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useUpdateAccount } from "@/hooks/useAccountMutations";
import { updateAccountSchema, type UpdateAccountFormValues } from "@/utils/validation";
import type { Account } from "@/types/banking";

interface UpdateAccountFormProps {
  account: Account;
  onDone: () => void;
}

export function UpdateAccountForm({ account, onDone }: UpdateAccountFormProps) {
  const [firstName, ...rest] = account.customerName.split(" ");
  const updateAccount = useUpdateAccount(account.accountNumber);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAccountFormValues>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: { firstName, lastName: rest.join(" ") },
  });

  const onSubmit = (values: UpdateAccountFormValues) => {
    updateAccount.mutate(values, { onSuccess: onDone });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input label="First Name" error={errors.firstName?.message} {...register("firstName")} />
      <Input label="Last Name" error={errors.lastName?.message} {...register("lastName")} />
      <Button type="submit" isLoading={updateAccount.isPending} className="self-end">
        Save Changes
      </Button>
    </form>
  );
}
