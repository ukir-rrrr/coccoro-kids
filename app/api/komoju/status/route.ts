import { NextResponse } from "next/server";
import { isKomojuConfigured, isKomojuTestMode } from "@/lib/komoju";

/** クライアント向け: 鍵の有無とテストモードのみ（秘密鍵は返さない） */
export async function GET() {
  return NextResponse.json({
    configured: isKomojuConfigured(),
    testMode: isKomojuTestMode(),
  });
}
