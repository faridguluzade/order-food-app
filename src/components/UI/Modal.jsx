import { useContext } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../../context/cart-context";
import classes from "./Modal.module.css";

const Backdrop = () => {
  const { setIsCartOpen } = useContext(CartContext);

  return <div className={classes.backdrop} onClick={setIsCartOpen} />;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children }) => {
  return (
    <>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
