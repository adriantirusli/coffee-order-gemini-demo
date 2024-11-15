"use client";

import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully placed.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Menu
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-white text-black px-6 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
          >
            View Order Status
          </button>
        </div>
      </div>
    </div>
  );
}
