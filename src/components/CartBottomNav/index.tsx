"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/format";
import { useRouter } from "next/navigation";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";

export default function CartBottomNav() {
  const router = useRouter();
  const { items, totalItems, totalCost } = useCartStore();

  if (items.length === 0) return null;

  return (
    <>
      <div className="h-20" />

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => router.push("/cart")}
            className="w-full flex items-center justify-between bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="font-medium">
                Cek Keranjang • {totalItems()} items
              </span>
            </div>
            <span className="font-semibold">{formatCurrency(totalCost())}</span>
          </button>
        </div>
      </div>
    </>
  );
}
