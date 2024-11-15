export const formatCurrency = (
  amount: number,
  options: { withSymbol?: boolean } = { withSymbol: true }
): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: options.withSymbol ? "currency" : "decimal",
    currency: "IDR",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });

  return formatter.format(amount).replace("IDR", "Rp");
};

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("id-ID").format(number);
};

export const parseFormattedNumber = (formattedNumber: string): number => {
  return Number(formattedNumber.replace(/[^\d,-]/g, "").replace(",", "."));
};
