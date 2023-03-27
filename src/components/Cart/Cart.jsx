import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { CartContext } from "../../context/cart-context";
import classes from "./Cart.module.css";

const Cart = () => {
  const { items, totalAmount, setIsCartOpen, addItem, removeItem } =
    useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && <Checkout />}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={setIsCartOpen}>
            Close
          </button>
          {items.length > 0 && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
