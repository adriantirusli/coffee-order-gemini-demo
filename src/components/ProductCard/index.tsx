import { formatCurrency } from "@/utils/format";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ProductProps = {
  id?: number;
  name?: string;
  price?: number;
  image?: StaticImageData;
  category?: string;
};

const ProductCard = ({ id, name, price, image, category }: ProductProps) => {
  return (
    <Link href={`/product/${id ?? ""}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <Image
          src={image ?? "/placeholder.jpg"}
          alt={name ?? "Product"}
          className="w-full h-full object-cover"
        />
        <div className="flex justify-between items-center">
          <div className="p-4">
            <h3 className="text-lg font-semibold">
              {name ?? "Untitled Product"}
            </h3>
            <p className="text-gray-600">{formatCurrency(price ?? 0)}</p>
            <span className="text-sm text-gray-500 capitalize">
              {category ?? "Uncategorized"}
            </span>
          </div>
          <PlusCircleIcon className="size-8 mr-4" />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
