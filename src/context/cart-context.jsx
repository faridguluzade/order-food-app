import { createContext, useReducer } from "react";

export const CartContext = createContext({
  cartIsShown: false,
  showCartHandler: () => {},
  hideCartHandler: () => {},
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  isCartOpen: false,
});

const INITIAL_STATE = {
  items: [],
  totalAmount: 0,
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      let updatedItems;
      const existingCartItem = state.items.find(
        (item) => item.id === action.item.id
      );

      if (existingCartItem) {
        updatedItems = state.items.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + action.item.amount }
            : item
        );
      } else updatedItems = [...state.items, { ...action.item }];

      const updatedTotalAmount =
        state.totalAmount + action.item.amount * action.item.price;
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "REMOVE": {
      let updatedItems;

      const existingCartItem = state.items.find(
        (item) => item.id === action.id
      );

      const updatedTotalAmount = state.totalAmount - existingCartItem.price;

      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        updatedItems = state.items.map((item) =>
          item.id === action.id ? { ...item, amount: item.amount - 1 } : item
        );
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "IS_CART_OPEN": {
      return {
        ...state,
        isCartOpen: action.bool,
      };
    }
    default: {
      return state;
    }
  }
};

export const CartProvider = ({ children }) => {
  const [{ items, totalAmount, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD_ITEM", item: item });
  };

  const setIsCartOpen = () => {
    dispatch({ type: "IS_CART_OPEN", bool: !isCartOpen });
  };
  const removeItemFromCartHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  const value = {
    items,
    totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    setIsCartOpen,
    isCartOpen,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
