import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { useCart } from "../../store/CartProvider";
import classes from "./PaymentForm.module.css";
import { Divider } from "@mui/material";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function PaymentForm({
  shippingData,
  backStep,
  onCaptureCheckout,
  timeout,
  nextStep,
}) {
  const cartCtx = useCart();

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: cartCtx.checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(cartCtx.checkoutToken.id, orderData);

      timeout();

      nextStep();
    }
  };

  return (
    <div className={classes.paymentForm}>
      <h3>Order summary</h3>

      <div className={classes.list}>
        {cartCtx.checkoutToken.live.line_items.map((product) => (
          <div key={product.id}>
            <span>
              <p style={{ fontWeight: 800 }}>{product.name}</p>
              <p style={{ opacity: 0.6 }}>Quantity: {product.quantity}</p>
            </span>

            <p>{product.line_total.formatted_with_symbol}</p>
          </div>
        ))}
      </div>

      <div className={classes.details}>
        <p>Total</p>
        <p style={{ fontWeight: 800 }}>
          {cartCtx.checkoutToken.live.subtotal.formatted_with_symbol}
        </p>
      </div>

      <Divider />

      <h3>Payment method</h3>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />

              <div className={classes.controls}>
                <button
                  onClick={() => backStep()}
                  type="button"
                  className={classes.backBtn}
                >
                  back
                </button>

                <button
                  type="submit"
                  className={classes.nextBtn}
                  disabled={!stripe}
                >
                  Pay{" "}
                  {cartCtx.checkoutToken.live.subtotal.formatted_with_symbol}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
}
