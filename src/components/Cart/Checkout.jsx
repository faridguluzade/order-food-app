import { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const { setIsCartOpen } = useContext(CartContext);

  const confirmHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <button type="button" onClick={setIsCartOpen}>
        Cancel
      </button>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
