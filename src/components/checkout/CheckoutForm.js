import React, { useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import classes from "./CheckoutForm.module.css";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { commerce } from "../../lib/commerce";
import { useCart } from "../../store/CartProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const steps = ["Shipping address", "Payment details"];

export default function CheckoutForm() {
  const [activeStep, setActiveStep] = useState(0);

  const [shippingData, setShippingData] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();

  const cartCtx = useCart();

  useEffect(() => {
    const generateTokenId = async () => {
      try {
        const token = await commerce.checkout.generateToken(cartCtx.cart.id, {
          type: "cart",
        });

        console.log(token);

        cartCtx.setCheckoutToken(token);
      } catch (err) {
        console.log(err);

        navigate("/", { replace: true });
      }
    };

    generateTokenId();
  }, [cartCtx.cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleNext = (data) => {
    console.log("data:", data);

    setShippingData(data);

    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 10000);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    cartCtx.setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      cartCtx.setOrder(incomingOrder);

      refreshCart();
    } catch (err) {
      setErrorMessage(err.data.error.message);
    }
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm next={handleNext} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        backStep={backStep}
        onCaptureCheckout={handleCaptureCheckout}
        timeout={timeout}
        nextStep={nextStep}
      />
    );

  return (
    <div className={classes.checkout}>
      <h1>Checkout</h1>

      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        errorMessage ? (
          <Confirmation isFinished={isFinished} />
        ) : (
          <p style={{ textAlign: "center" }}>
            {errorMessage}, go to home page <Link to="/">Home page</Link>
          </p>
        )
      ) : (
        cartCtx.checkoutToken && <Form />
      )}
    </div>
  );
}
