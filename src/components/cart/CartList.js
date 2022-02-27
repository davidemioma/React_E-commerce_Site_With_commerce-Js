import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./CartList.module.css";
import CartItem from "./CartItem";
import { commerce } from "../../lib/commerce";
import { useCart } from "../../store/CartProvider";
import { useNavigate } from "react-router";

export default function CartList({ cart }) {
  const cartCtx = useCart();

  const navigate = useNavigate();

  const onRemoveItem = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    cartCtx.setCart(cart);
  };

  const emptyCartHandler = async () => {
    const { cart } = await commerce.cart.empty();

    cartCtx.setCart(cart);
  };

  const upadateCartQtyHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    cartCtx.setCart(cart);
  };

  const checkoutHandler = () => {
    navigate("/checkout", { push: true });
  };

  const EmptyCart = () => {
    return (
      <p className={classes.link}>
        You have no items in Your shopping cart,{" "}
        <Link to="/">start adding some!</Link>
      </p>
    );
  };

  const FilledCart = () => {
    return (
      <div className={classes.cartList}>
        {cart.line_items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addCartItemQty={upadateCartQtyHandler}
            minusartItemQty={upadateCartQtyHandler}
            removeItem={onRemoveItem}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Your Shopping Cart</h1>

      {cart.line_items.length <= 0 ? (
        <EmptyCart />
      ) : (
        <Fragment>
          <FilledCart />

          <div className={classes.details}>
            <div className={classes.info}>
              <p>
                <span>SubTotal:</span>
                {cart.subtotal.formatted_with_symbol}
              </p>
            </div>

            <div className={classes.controls}>
              <button onClick={emptyCartHandler} className={classes.emptyCart}>
                empty cart
              </button>

              <button onClick={checkoutHandler} className={classes.checkout}>
                checkout
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
