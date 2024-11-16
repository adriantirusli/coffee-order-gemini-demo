"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/format";
import { useRouter } from "next/navigation";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import RetroButton from "../Button";

export default function CartBottomNav() {
  const router = useRouter();
  const { items, totalItems, totalCost } = useCartStore();

  if (items.length === 0) return null;

  return (
    <>
      <div className="h-20" />

      <div className="fixed border-t-2 border-black bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="w-full">
            <RetroButton
              onClick={() => router.push("/cart")}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="font-medium">
                  Cek Keranjang • {totalItems()} items
                </span>
              </div>
              <span className="font-semibold">
                {formatCurrency(totalCost())}
              </span>
            </RetroButton>
          </div>
        </div>
      </div>
    </>
  );
}
