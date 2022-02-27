import React, { Fragment } from "react";
import NavBar from "../components/navigation/NavBar";
import CheckoutForm from "../components/checkout/CheckoutForm";

export default function Checkout() {
  return (
    <Fragment>
      <NavBar inCartPage={true} />

      <CheckoutForm />
    </Fragment>
  );
}
