import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { CartContext } from "../../context/cart-context";
import classes from "./Cart.module.css";

const Cart = () => {
  const { items, totalAmount, setIsCartOpen, addItem, removeItem, clearCart } =
    useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-db-586bb-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    clearCart();
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

  const modalActions = (
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
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} />}
      {!isCheckout && modalActions}
    </>
  );

  return (
    <Modal>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && <p>Sending Order Data...</p>}
      {!isSubmitting && didSubmit && (
        <>
          <p>Successfuly sent the order!</p>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={setIsCartOpen}>
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
