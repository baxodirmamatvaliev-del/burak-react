import { createContext, ReactNode, useState } from "react";
import { CartItem } from "../../lib/types/search";

type BasketContextValue = {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelate: (item: CartItem) => void;
  onDeleteAll: () => void;
};

export const BasketContext = createContext<BasketContextValue | null>(null);

export default function BasketProvider({ children }: { children: ReactNode }) {
  const cartJson = localStorage.getItem("cartData");
  const currentCart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cartData", JSON.stringify(items));
  };

  const onAdd = (input: CartItem) => {
    const exist = cartItems.find((item) => item._id === input._id);
    const cartUpdate = exist
      ? cartItems.map((item) =>
          item._id === input._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...cartItems, input];

    updateCart(cartUpdate);
  };

  const onRemove = (input: CartItem) => {
    const exist = cartItems.find((item) => item._id === input._id);
    if (!exist) return;

    const cartUpdate =
      exist.quantity === 1
        ? cartItems.filter((item) => item._id !== input._id)
        : cartItems.map((item) =>
            item._id === input._id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );

    updateCart(cartUpdate);
  };

  const onDelate = (input: CartItem) => {
    updateCart(cartItems.filter((item) => item._id !== input._id));
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };

  return (
    <BasketContext.Provider
      value={{ cartItems, onAdd, onRemove, onDelate, onDeleteAll }}
    >
      {children}
    </BasketContext.Provider>
  );
}
