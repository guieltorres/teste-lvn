import { useCart } from "@/app/contexts/cart";
import { Product } from "@/app/types/product";
import Image from "next/image";
import { useState } from "react";

type ProductDetailsModalProps = {
  product: Product;
  toggleModal: () => void;
};

export default function ProductDetailsModal({
  product,
  toggleModal,
}: ProductDetailsModalProps) {
  const { addItem } = useCart();
  const [animate, setAnimate] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  return (
    <div
      id="product-details-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Product Details
            </h3>
            <button
              data-testid="close-modal"
              onClick={toggleModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="product-details-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-10">
              <div>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {product.title}
                </h1>
                <p className="text-base text-gray-500 mt-2">
                  {product.category}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  ${product.price}
                </p>
                <div className="mt-5">
                  <button
                    onClick={handleAddToCart}
                    className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add to cart
                  </button>
                  {animate && (
                    <div
                      className={`mt-2 text-left text-green-500 ${
                        animate ? "animate-bounce-center" : ""
                      }`}
                    >
                      Item added to cart!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
