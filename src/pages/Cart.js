import React, { Fragment, useCallback } from "react";
import { commerce } from "../lib/commerce";
import { useCart } from "../store/CartProvider";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import CartList from "../components/cart/CartList";
import NavBar from "../components/navigation/NavBar";
import { useQuery } from "react-query";

export default function Cart() {
  const cartCtx = useCart();

  const fetchCart = useCallback(async () => {
    const cart = await commerce.cart.retrieve();

    cartCtx.setCart(cart);

    return cart;
  }, [cartCtx]);

  const { isLoading, error, data } = useQuery("cart", fetchCart);

  return (
    <Fragment>
      <NavBar inCartPage={true} />

      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="centered">
          <p>Could not get cart ata</p>
        </div>
      )}

      {data && <CartList cart={cartCtx.cart} />}
    </Fragment>
  );
}
