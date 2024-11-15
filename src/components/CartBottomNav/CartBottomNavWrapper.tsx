"use client";

import { usePathname } from "next/navigation";
import CartBottomNav from ".";

export default function CartBottomNavWrapper() {
  const pathname = usePathname();

  if (pathname === "/cart") return null;

  return <CartBottomNav />;
}
