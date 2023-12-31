import { DictionaryType } from "core";

export class CurrencyUtils {
  static formatCurrency(amount: number, options: DictionaryType = {}) {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    return formatted;
  }

  static discountPrice(discount_percentage: number, absolute: number) {
    return absolute - absolute * (discount_percentage / 100);
  }
}
