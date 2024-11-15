"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/format";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DUMMY_PRODUCTS } from "../data";
import toast from "react-hot-toast";

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

      <div className="grid grid-cols-1 gap-6">
        {items.map((item) => {
          const productImage = getProductImage(item.productId);

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative h-48 md:h-full">
                  {productImage && (
                    <Image
                      src={productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="p-4 md:col-span-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {item.productName}
                      </h2>
                      <div className="space-y-1 text-sm text-gray-600">
                        {item.modifiers.size && (
                          <p>Size: {item.modifiers.size}</p>
                        )}
                        {item.modifiers.ice && <p>Ice: {item.modifiers.ice}</p>}
                        {item.modifiers.sweetness && (
                          <p>Sweetness: {item.modifiers.sweetness}</p>
                        )}
                        {item.modifiers.diary && (
                          <p>Milk: {item.modifiers.diary}</p>
                        )}
                        {item.modifiers.extras &&
                          item.modifiers.extras.length > 0 && (
                            <p>Extras: {item.modifiers.extras.join(", ")}</p>
                          )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <label className="text-sm text-gray-600">Quantity:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="border rounded-lg px-3 py-2 text-sm"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.basePrice)} base price
                      </p>
                      {item.modifiers.size === "Large" && (
                        <p className="text-sm text-gray-600">
                          +{formatCurrency(8000)} large size
                        </p>
                      )}
                      {item.modifiers.diary &&
                        item.modifiers.diary !== "Milk" && (
                          <p className="text-sm text-gray-600">
                            +
                            {formatCurrency(
                              item.modifiers.diary === "Soy Milk"
                                ? 11000
                                : 18000
                            )}{" "}
                            {item.modifiers.diary}
                          </p>
                        )}
                      {item.modifiers.extras &&
                        item.modifiers.extras.length > 0 && (
                          <p className="text-sm text-gray-600">
                            +
                            {formatCurrency(
                              item.modifiers.extras.length * 6000
                            )}{" "}
                            extras
                          </p>
                        )}
                      <p className="font-semibold mt-1">
                        {formatCurrency(
                          (item.basePrice + item.modifiersCost) * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
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
        <button
          onClick={handleCheckout}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
