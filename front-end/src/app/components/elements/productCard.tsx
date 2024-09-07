import Image from "next/image";
import { Product } from "../../types/product";
import { useCart } from "@/app/contexts/cart";
import ProductDetailsModal from "../modules/modals/productDetailsModal";
import { useEffect, useState } from "react";
import { toggleModal } from "@/app/utils/toggleModal";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const toggleProductDetailsModal = (product: Product | null) => {
    setSelectedProduct(product);
    toggleModal("product-details-modal");
  };

  useEffect(() => {
    selectedProduct && toggleProductDetailsModal(selectedProduct);
  }, [selectedProduct]);

  return (
    <div className="lg:max-w-sm max-w-md w-full">
      <div className="bg-white rounded-md h-68 flex flex-col">
        <div className="left-0 right-0 px-2 pt-2 flex flex-row  justify-end">
          <p className="text-xs font-semibold text-gray-500 px-2">
            {product.rating.rate}
          </p>
          <svg
            className="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
        <button
          className="flex-shrink-0"
          onClick={() => {
            toggleProductDetailsModal(product);
          }}
        >
          <Image
            width={300}
            height={300}
            className="p-4 object-contain h-60 w-full"
            src={product.image}
            alt="product image"
          />
        </button>
      </div>
      <div className="mt-2 pb-5 flex-grow flex flex-col justify-between">
        <button
          className="text-left"
          onClick={() => {
            toggleProductDetailsModal(product);
          }}
        >
          <h5 className="text-sm font-semibold tracking-tight text-gray-900 line-clamp-2">
            {product.title}
          </h5>
        </button>
        <div className="mt-1">
          <p className="text-xs text-gray-500 line-clamp-2">
            {product.category}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={() => {
              addItem(product);
            }}
            className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div>
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            toggleModal={() => toggleProductDetailsModal(null)}
          />
        )}
      </div>
    </div>
  );
}
