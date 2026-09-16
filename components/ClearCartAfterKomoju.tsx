"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";

/** KOMOJU 決済成功後の完了ページで一度だけカートを空にする */
export default function ClearCartAfterKomoju() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (cleared.current) return;
    if (searchParams.get("from") === "komoju") {
      cleared.current = true;
      clearCart();
    }
  }, [searchParams, clearCart]);

  return null;
}
