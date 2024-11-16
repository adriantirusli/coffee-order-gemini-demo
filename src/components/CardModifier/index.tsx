import { DUMMY_PRODUCTS } from "@/app/data";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/format";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function CardModifier({ qty = true, remove = true }) {
  const { items, removeItem, updateQuantity } = useCartStore();

  const getProductImage = (productId: number) => {
    return DUMMY_PRODUCTS.find((p) => p.id === productId)?.image;
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {items.map((item) => {
        const productImage = getProductImage(item.productId);

        return (
          <div
            key={item.id}
            className="bg-white rounded-lg border-2 border-black"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative h-48 md:h-full">
                {productImage && (
                  <Image
                    src={productImage}
                    alt={item.productName}
                    fill
                    className="object-cover border-b-2 lg:border-b-0 lg:rounded-l-lg lg:border-r-2 border-black"
                  />
                )}
              </div>

              <div className="p-4 md:col-span-3 ">
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

                  {remove && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  {qty && (
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
                  )}

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
                            item.modifiers.diary === "Soy Milk" ? 11000 : 18000
                          )}{" "}
                          {item.modifiers.diary}
                        </p>
                      )}
                    {item.modifiers.extras &&
                      item.modifiers.extras.length > 0 && (
                        <p className="text-sm text-gray-600">
                          +{formatCurrency(item.modifiers.extras.length * 6000)}{" "}
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
  );
}
