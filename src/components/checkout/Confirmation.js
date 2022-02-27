import classes from "./Confirmation.module.css";
import React, { Fragment } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../store/CartProvider";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { Divider } from "@mui/material";

export default function Confirmation({ isFinished }) {
  const navigate = useNavigate();

  const cartCtx = useCart();

  const onClickHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <Fragment>
      {cartCtx.order.customer ? (
        <div className={classes.confirmation}>
          <h3>
            Thank you for your purchase, {cartCtx.order.customer.firstname}{" "}
            {cartCtx.order.customer.lastname}
          </h3>

          <Divider />

          <p>Order Ref: {cartCtx.order.customer_reference}</p>

          <button onClick={onClickHandler}>Back to home</button>
        </div>
      ) : isFinished ? (
        <div className={classes.confirmation}>
          <h3>Thank you for your purchase</h3>

          <Divider />

          <button onClick={onClickHandler}>Back to home</button>
        </div>
      ) : (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
    </Fragment>
  );
}
