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
