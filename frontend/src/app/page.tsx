"use client";

import DefaultLayout from "./components/layouts/defaultLayout";
import { CartProvider } from "./contexts/cart";
import Catalog from "./pages/catalog";

export default function Home() {
  return (
    <CartProvider>
      <DefaultLayout>
        <Catalog />
      </DefaultLayout>
    </CartProvider>
  );
}
