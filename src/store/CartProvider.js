import { createContext, useContext, useState } from "react";

const CartContext = createContext({
  cart: {},
  setCart: () => {},
  checkoutToken: {},
  setCheckoutToken: () => {},
  order: {},
  setOrder: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const [checkoutToken, setCheckoutToken] = useState(null);

  const [order, setOrder] = useState({});

  const value = {
    cart,
    setCart,
    checkoutToken,
    setCheckoutToken,
    order,
    setOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
