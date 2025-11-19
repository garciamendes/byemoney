type styleNumberFormat = "currency" | "decimal" | "percent";
export const formatToMoney = (
  value: number,
  style: styleNumberFormat = "currency"
) => {
  const formatted = new Intl.NumberFormat("PT-BR", {
    style,
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatted.format(value);
};

export function parseBRLMoneyToNumber(value: string): number | null {
  if (!value) return null;

  const onlyDigits = value.replace(/\D/g, "");

  if (onlyDigits.length === 0) return null;

  const intValue = Number(onlyDigits) / 100;

  return intValue;
}
