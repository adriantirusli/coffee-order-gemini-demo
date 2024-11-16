"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/format";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DUMMY_PRODUCTS } from "../data";
import toast from "react-hot-toast";
import RetroButton from "@/components/Button";
import CardModifier from "@/components/CardModifier";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, totalCost, clearCart } =
    useCartStore();

  const getProductImage = (productId: number) => {
    return DUMMY_PRODUCTS.find((p) => p.id === productId)?.image;
  };

  const handleCheckout = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Order placed successfully!");
    clearCart();
    router.push("/order-success");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Menu</span>
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Menu</span>
      </button>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <CardModifier />

      <div className="mt-8 bg-secondary rounded-lg p-6 border-2 border-black">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(totalCost())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (11%)</span>
            <span>{formatCurrency(totalCost() * 0.11)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t">
            <span>Total</span>
            <span>{formatCurrency(totalCost() * 1.11)}</span>
          </div>
        </div>
        <RetroButton onClick={handleCheckout} className="w-full mt-6">
          Proceed to Checkout
        </RetroButton>
      </div>
    </div>
  );
}
