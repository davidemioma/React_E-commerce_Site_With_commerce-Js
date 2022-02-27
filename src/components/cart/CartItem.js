import React from "react";
import classes from "./CartItem.module.css";

export default function CartItem({
  item,
  addCartItemQty,
  minusartItemQty,
  removeItem,
}) {
  const onAddCartItemQty = () => {
    addCartItemQty(item.id, item.quantity + 1);
  };

  const onMinusCartItemQty = () => {
    minusartItemQty(item.id, item.quantity - 1);
  };

  const onRemoveItem = () => {
    removeItem(item.id);
  };

  return (
    <div className={classes.item}>
      <img className={classes.itemImg} src={item.image.url} alt={item.name} />

      <div className={classes.details}>
        <div className={classes.info}>
          <h3>{item.name}</h3>
          <h3>{item.price.formatted_with_symbol}</h3>
        </div>

        <div className={classes.controls}>
          <div>
            <button onClick={onMinusCartItemQty}>-</button>

            <p>{item.quantity}</p>

            <button onClick={onAddCartItemQty}>+</button>
          </div>

          <button onClick={onRemoveItem} className={classes.removeBtn}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
