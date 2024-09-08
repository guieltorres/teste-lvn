import { useCart } from "@/app/contexts/cart";
import Image from "next/image";
import { useState, useEffect } from "react";
import CartModal from "../modules/modals/cart/cartModal";
import { toggleModal } from "@/app/utils/toggleModal";

export default function CartIcon() {
  const { items } = useCart();
  const [animate, setAnimate] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const toggleCartModal = () => {
    toggleModal("cart-modal");
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 1000);

    if (items && Array.isArray(items)) {
      setTotalItems(items.reduce((acc, item) => acc + item.quantity, 0));
    } else {
      setTotalItems(0);
    }

    if (!animate) {
      setAnimate(true);
      return () => clearTimeout(timer);
    }
  }, [items]);

  return (
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
        data-modal-target="cart-modal"
        data-modal-toggle="cart-modal"
        type="button"
        onClick={() => toggleCartModal()}
        className="relative flex w-10 h-10 items-center justify-center text-sm rounded-lg md:me-0 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        id="user-menu-button"
        aria-expanded="false"
      >
        <span className="sr-only">Open cart menu</span>
        <Image
          width={0}
          height={0}
          className="w-6 h-8 rounded-full m-2"
          src="/assets/images/shopping-cart.svg"
          alt="cart logo"
        />
        {totalItems > 0 && (
          <div
            className={`absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 ${
              animate ? "animate-bounce" : ""
            }`}
          >
            <span className="p-3 flex items-center justify-center w-3 h-3 text-xxs text-white bg-red-500 rounded-full">
              {totalItems}
            </span>
          </div>
        )}
      </button>
      <div>
        <CartModal toggleModal={toggleCartModal} />
      </div>
    </div>
  );
}
