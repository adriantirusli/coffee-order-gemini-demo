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
      <div className="bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow border-solid border-2 border-gray-900">
        <Image
          src={image ?? "/placeholder.jpg"}
          alt={name ?? "Product"}
          className="w-full h-full object-cover"
        />
        <div className="flex justify-between items-center border-t-2 border-gray-900 h-36 lg:h-full">
          <div className="p-4">
            <h3 className="text-lg font-semibold">
              {name ?? "Untitled Product"}
            </h3>
            <p>{formatCurrency(price ?? 0)}</p>
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
