const formatter = Intl.NumberFormat("en", { notation: "compact" });
export const format = (num) => formatter.format(num);
