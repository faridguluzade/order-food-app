import { useContext } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { CartContext } from "./context/cart-context";

const App = () => {
  const { isCartOpen } = useContext(CartContext);
  return (
    <>
      {isCartOpen && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
