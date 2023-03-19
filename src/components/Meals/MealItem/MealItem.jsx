import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import { CartContext } from "../../../context/cart-context";
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const { id, name, description, price } = props;
  const { addItem } = useContext(CartContext);

  const addToCartHandler = (amount) => {
    addItem({
      ...props,
      amount,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>${price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={id} />
      </div>
    </li>
  );
};

export default MealItem;
