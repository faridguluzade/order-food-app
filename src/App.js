import { useContext } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { CartContext } from "./context/cart-context";

const App = () => {
  const { cartIsShown } = useContext(CartContext);

  return (
    <>
      {cartIsShown && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
