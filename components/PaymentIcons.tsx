import { paymentMethods } from "@/lib/payments";

export default function PaymentIcons() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {paymentMethods.map((method) => (
        <span
          key={method}
          className="rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#333333]"
        >
          {method}
        </span>
      ))}
    </div>
  );
}
