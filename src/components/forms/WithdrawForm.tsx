import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useWithdraw } from "@/hooks/useAccountMutations";
import { withdrawSchema, type WithdrawFormValues } from "@/utils/validation";

interface WithdrawFormProps {
  accountNumber: string;
  onDone: () => void;
}

export function WithdrawForm({ accountNumber, onDone }: WithdrawFormProps) {
  const withdraw = useWithdraw();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { accountNumber, amount: undefined },
  });

  const onSubmit = (values: WithdrawFormValues) => {
    withdraw.mutate(values, { onSuccess: onDone });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input label="Account Number" readOnly {...register("accountNumber")} />
      <Input
        label="Amount (NGN)"
        type="number"
        step="0.01"
        min="0"
        placeholder="0.00"
        error={errors.amount?.message}
        {...register("amount")}
      />
      <Button type="submit" variant="danger" isLoading={withdraw.isPending} className="self-end">
        Confirm Withdrawal
      </Button>
    </form>
  );
}
