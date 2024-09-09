import React, { createContext, useContext, useState } from "react";
import { Product } from "../types/product";
import { CartItem } from "../types/cartItem";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  deleteItem: (item: Product) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  deleteItem: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.product.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.product.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { product: item, quantity: 1 }];
      }
    });
  };

  const removeItem = (item: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.product.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((i) =>
          i.product.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prevItems;
      }
    });
  };

  const deleteItem = (item: Product) => {
    setItems((prevItems) => {
      return prevItems.filter((i) => i.product.id !== item.id);
    });
  };
  return (
    <CartContext.Provider value={{ items, addItem, removeItem, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
