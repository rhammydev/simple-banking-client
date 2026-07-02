import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTransferFund } from "@/hooks/useAccountMutations";
import { transferSchema, type TransferFormValues } from "@/utils/validation";

interface TransferFormProps {
  defaultSenderAccountNumber?: string;
  onDone: () => void;
}

export function TransferForm({ defaultSenderAccountNumber, onDone }: TransferFormProps) {
  const transferFund = useTransferFund();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      senderAccountNumber: defaultSenderAccountNumber ?? "",
      receiverAccountNumber: "",
      amount: undefined,
      naration: "",
    },
  });

  const onSubmit = (values: TransferFormValues) => {
    transferFund.mutate(values, { onSuccess: onDone });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label="From Account"
        placeholder="Sender account number"
        readOnly={Boolean(defaultSenderAccountNumber)}
        error={errors.senderAccountNumber?.message}
        {...register("senderAccountNumber")}
      />
      <Input
        label="To Account"
        placeholder="Recipient account number"
        error={errors.receiverAccountNumber?.message}
        {...register("receiverAccountNumber")}
      />
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
        placeholder="e.g. Rent payment"
        error={errors.naration?.message}
        {...register("naration")}
      />
      <Button type="submit" isLoading={transferFund.isPending} className="self-end">
        Send Transfer
      </Button>
    </form>
  );
}
