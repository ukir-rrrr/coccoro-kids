/** チェックアウト UI の value → KOMOJU payment_types */
export const checkoutPaymentToKomojuTypes: Record<string, string[]> = {
  "credit-card": ["credit_card"],
  "bank-transfer": ["bank_transfer"],
  "apple-pay": ["apple_pay"],
};

export function isSupportedCheckoutPayment(paymentMethod: string): boolean {
  return Boolean(checkoutPaymentToKomojuTypes[paymentMethod]);
}
