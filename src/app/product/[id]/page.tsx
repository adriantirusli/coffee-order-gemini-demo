"use client";

import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DUMMY_MODIFIERS, DUMMY_PRODUCTS } from "../../data";
import ModifierSection from "./components/ModifierSection";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "react-hot-toast";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const resolvedParams = React.use(params);
  const product = DUMMY_PRODUCTS.find(
    (p) => p.id === parseInt(resolvedParams.id)
  );

  const [selectedModifiers, setSelectedModifiers] = useState({
    size: "1",
    ice: "1",
    sweetness: "1",
    diary: "1",
    extras: [] as string[],
  });

  const calculateModifiersCost = () => {
    let cost = 0;

    const selectedSize = DUMMY_MODIFIERS.size.find(
      (m) => m.id.toString() === selectedModifiers.size
    );
    cost += selectedSize?.price ?? 0;

    const selectedDiary = DUMMY_MODIFIERS.diary.find(
      (m) => m.id.toString() === selectedModifiers.diary
    );
    cost += selectedDiary?.price ?? 0;

    selectedModifiers.extras.forEach((extraId) => {
      const extra = DUMMY_MODIFIERS.extras.find(
        (m) => m.id.toString() === extraId
      );
      cost += extra?.price ?? 0;
    });

    return cost;
  };

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleModifierChange = (
    type: keyof typeof selectedModifiers,
    value: string | string[]
  ) => {
    setSelectedModifiers((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const modifiersCost = calculateModifiersCost();

    addItem({
      productId: product.id,
      productName: product.name,
      basePrice: product.price,
      quantity,
      modifiers: {
        size: DUMMY_MODIFIERS.size.find(
          (m) => m.id.toString() === selectedModifiers.size
        )?.name,
        ice: DUMMY_MODIFIERS.ice.find(
          (m) => m.id.toString() === selectedModifiers.ice
        )?.name,
        sweetness: DUMMY_MODIFIERS.sweetness.find(
          (m) => m.id.toString() === selectedModifiers.sweetness
        )?.name,
        diary: DUMMY_MODIFIERS.diary.find(
          (m) => m.id.toString() === selectedModifiers.diary
        )?.name,
        extras: selectedModifiers.extras.map(
          (id) =>
            DUMMY_MODIFIERS.extras.find((m) => m.id.toString() === id)?.name ??
            ""
        ),
      },
      modifiersCost,
    });

    toast.success("Added to cart!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Menu</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-6">
            {formatCurrency(product.price)}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <ModifierSection
              title="Size"
              options={DUMMY_MODIFIERS.size}
              type="radio"
              value={selectedModifiers.size}
              onChange={(value) =>
                handleModifierChange("size", value as string)
              }
            />

            <ModifierSection
              title="Ice Level"
              options={DUMMY_MODIFIERS.ice}
              type="radio"
              value={selectedModifiers.ice}
              onChange={(value) => handleModifierChange("ice", value as string)}
            />

            <ModifierSection
              title="Sweetness"
              options={DUMMY_MODIFIERS.sweetness}
              type="radio"
              value={selectedModifiers.sweetness}
              onChange={(value) =>
                handleModifierChange("sweetness", value as string)
              }
            />

            <ModifierSection
              title="Diary"
              options={DUMMY_MODIFIERS.diary}
              type="radio"
              value={selectedModifiers.diary}
              onChange={(value) =>
                handleModifierChange("diary", value as string)
              }
            />

            <ModifierSection
              title="Extras"
              options={DUMMY_MODIFIERS.extras}
              type="checkbox"
              value={selectedModifiers.extras}
              onChange={(value) => handleModifierChange("extras", value)}
            />

            <div className="flex items-center gap-4 mb-6">
              <label className="font-semibold">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-lg px-3 py-2"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-lg font-semibold mb-4">
              Total:{" "}
              {formatCurrency(
                (product.price + calculateModifiersCost()) * quantity
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
