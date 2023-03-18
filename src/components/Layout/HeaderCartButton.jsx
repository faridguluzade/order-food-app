import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import { CartContext } from "../../context/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  const { items, showCartHandler } = useContext(CartContext);

  const cartCount = items.reduce((acc, cur) => acc + cur, 0);

  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartCount}</span>
    </button>
  );
};

export default HeaderCartButton;
