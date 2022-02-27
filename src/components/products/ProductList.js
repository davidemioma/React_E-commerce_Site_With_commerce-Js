import React from "react";
import classes from "./ProductList.module.css";
import ProductItem from "./ProductItem";
import { commerce } from "../../lib/commerce";
import { useCart } from "../../store/CartProvider";

export default function ProductList({ products }) {
  const cartCtx = useCart();

  const onAddToCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    cartCtx.setCart(cart);
  };

  return (
    <div className="container">
      <div className={classes.list}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCartHandler}
          />
        ))}
      </div>
    </div>
  );
}
