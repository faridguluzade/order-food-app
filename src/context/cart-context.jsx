import { createContext, useState } from "react";

export const CartContext = createContext({
  cartIsShown: false,
  showCartHandler: () => {},
  hideCartHandler: () => {},
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const addItemToCartHandler = (item) => {};

  const removeItemFromCartHandler = (id) => {};

  const value = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    cartIsShown,
    showCartHandler,
    hideCartHandler,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
