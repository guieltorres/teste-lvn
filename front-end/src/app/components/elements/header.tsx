import Image from "next/image";
import CartIcon from "./cartIcon";

export default function Header() {
  const toggleDropdown = () => {
    const navbarMenu = document.getElementById("navbar-menu");
    if (navbarMenu) {
      navbarMenu.classList.toggle("hidden");
    }
  };

  return (
    <nav className="bg-gray-100 fixed top-0 left-0 right-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-10 py-4">
        <a href="#" className="flex items-center">
          <Image
            width={0}
            height={0}
            src="/assets/images/logo.svg"
            className="h-8 w-8"
            alt="Liven Shop Logo"
          />
          <span className="px-3 self-center text-xl font-semibold whitespace-nowrap text-gray-900">
            Liven Shop
          </span>
        </a>
        <div className="flex items-center md:order-2">
          <CartIcon />
          <button
            onClick={() => toggleDropdown()}
            data-collapse-toggle="navbar-menu"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-menu"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 font-bold 0 md:p-0 text-sm"
                aria-current="page"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 font-bold md:p-0 text-sm"
                aria-current="page"
              >
                Collections
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 font-bold  md:p-0 text-sm"
                aria-current="page"
              >
                Explore
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
