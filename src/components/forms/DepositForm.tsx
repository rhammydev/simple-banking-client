import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDeposit } from "@/hooks/useAccountMutations";
import { depositSchema, type DepositFormValues } from "@/utils/validation";

interface DepositFormProps {
  accountNumber: string;
  onDone: () => void;
}

export function DepositForm({ accountNumber, onDone }: DepositFormProps) {
  const deposit = useDeposit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: { accountNumber, amount: undefined, naration: "" },
  });

  const onSubmit = (values: DepositFormValues) => {
    deposit.mutate(values, { onSuccess: onDone });
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
      <Input
        label="Narration"
        placeholder="e.g. Salary deposit"
        error={errors.naration?.message}
        {...register("naration")}
      />
      <Button type="submit" isLoading={deposit.isPending} className="self-end">
        Confirm Deposit
      </Button>
    </form>
  );
}
