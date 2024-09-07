import { useCart } from "@/app/contexts/cart";
import Image from "next/image";

type CartModalProps = {
  toggleModal: () => void;
};

export default function CartModal({ toggleModal }: CartModalProps) {
  const { items, addItem, removeItem, deleteItem } = useCart();

  return (
    <div
      id="cart-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50  justify-center items-center w-full h-full md:inset-0 max-h-full bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-5xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Cart
            </h3>
            <button
              onClick={toggleModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
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
          {items.length === 0 ? (
            <div className="p-4 md:p-5 text-center h-24 flex items-center justify-center">
              <p className="text-gray-500 ">
                Your cart is empty.{" "}
                <button
                  onClick={toggleModal}
                  className="text-gray-900 font-medium hover:text-gray-700"
                >
                  Continue shopping
                </button>
              </p>
            </div>
          ) : (
            <div className="p-4 md:p-5 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={item.product.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <Image
                            width={300}
                            height={300}
                            src={item.product.image}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={item.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {item.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                              onClick={() => removeItem(item.product)}
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <p>{item.quantity}</p>
                            </div>
                            <button
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                              onClick={() => addItem(item.product)}
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          ${item.product.price}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteItem(item.product)}
                            className="font-medium text-red-600"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Total: $
                  {items
                    .reduce(
                      (acc, item) => acc + item.quantity * item.product.price,
                      0
                    )
                    .toFixed(2)}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
