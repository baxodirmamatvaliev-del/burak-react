import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";

const useBasket = () => {
  const basket = useContext(BasketContext);

  if (!basket) {
    throw new Error("useBasket must be used inside BasketProvider");
  }

  return basket;
};

export default useBasket;
