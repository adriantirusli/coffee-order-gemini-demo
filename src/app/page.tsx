import Image from "next/image";
import ProductCard from "../components/ProductCard";
import { DUMMY_PRODUCTS } from "./data";
import bannerHome from "/public/images/banner-home.webp";

const Home = () => {
  return (
    <>
      <Image
        src={bannerHome}
        alt="Banner"
        className="w-full h-full lg:h-96 object-cover"
        priority
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Beverages</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16">
            {DUMMY_PRODUCTS.filter(
              (product) => product.category === "beverage"
            ).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Pastries</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16">
            {DUMMY_PRODUCTS.filter(
              (product) => product.category === "pastry"
            ).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
