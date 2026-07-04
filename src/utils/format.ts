const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 2,
});

export function formatNaira(amount: number): string {
  return nairaFormatter.format(amount);
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const CREDIT_TRANSACTION_TYPES = new Set(["deposit", "credit"]);

/** Mirrors BankingService.CreditTransactionTypes on the backend. */
export function isCreditTransaction(transactionType: string): boolean {
  return CREDIT_TRANSACTION_TYPES.has(transactionType.toLowerCase());
}

export function initialsOf(name: string): string {
  return name
    ?.trim()
    ?.split(/\s+/)
    ?.slice(0, 2)
    ?.map((part) => part[0]?.toUpperCase() ?? "")
    ?.join("");
}
