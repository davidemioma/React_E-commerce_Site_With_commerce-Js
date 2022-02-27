import React from "react";
import classes from "./ProductItem.module.css";
import { AddShoppingCart } from "@mui/icons-material";

export default function ProductItem({ product, onAddToCart }) {
  const addToCartHandler = () => {
    onAddToCart(product.id, 1);
  };

  return (
    <div className={classes.product}>
      <img
        className={classes.productImg}
        src={product.image.url}
        alt={product.name}
      />

      <div className={classes.details}>
        <div>
          <h3>{product.name}</h3>
          <h3>{product.price.formatted_with_symbol}</h3>
        </div>

        <p>{product.description.slice(3, -4)}</p>

        <button onClick={addToCartHandler}>
          <AddShoppingCart />
        </button>
      </div>
    </div>
  );
}
