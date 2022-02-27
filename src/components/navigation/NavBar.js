import React from "react";
import classes from "./NavBar.module.css";
import logo from "../../assets/commerce.png";
import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useCart } from "../../store/CartProvider";
import { useNavigate } from "react-router";

export default function NavBar({ inCartPage }) {
  const cartCtx = useCart();

  const navigate = useNavigate();

  const showCartHandler = () => {
    navigate("/cart", { push: true });
  };

  const goHomeHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={classes.nav}>
      <nav className={classes.navBar}>
        <div onClick={goHomeHandler}>
          <img src={logo} alt="" />

          <h3>Commerce.js</h3>
        </div>

        {!inCartPage && (
          <IconButton
            onClick={showCartHandler}
            aria-label="Show cart items"
            color="inherit"
          >
            <Badge badgeContent={cartCtx.cart.total_items} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        )}
      </nav>
    </div>
  );
}
