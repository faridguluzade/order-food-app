import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import { CartContext } from "../../context/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  const { items, setIsCartOpen } = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const cartCount = items.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <button className={btnClasses} onClick={setIsCartOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartCount}</span>
    </button>
  );
};

export default HeaderCartButton;
