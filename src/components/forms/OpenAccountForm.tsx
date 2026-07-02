import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useOpenAccount } from "@/hooks/useAccountMutations";
import { openAccountSchema, type OpenAccountFormValues } from "@/utils/validation";

export function OpenAccountForm() {
  const navigate = useNavigate();
  const openAccount = useOpenAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OpenAccountFormValues>({ resolver: zodResolver(openAccountSchema) });

  const onSubmit = (values: OpenAccountFormValues) => {
    openAccount.mutate(values, {
      onSuccess: (account) => {
        navigate({ to: "/accounts/$accountNumber", params: { accountNumber: account.accountNumber } });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="First Name" placeholder="Adaeze" error={errors.firstName?.message} {...register("firstName")} />
        <Input label="Last Name" placeholder="Okafor" error={errors.lastName?.message} {...register("lastName")} />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="adaeze.okafor@email.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Button type="submit" isLoading={openAccount.isPending} className="mt-2 self-start">
        Open Account
      </Button>
    </form>
  );
}
