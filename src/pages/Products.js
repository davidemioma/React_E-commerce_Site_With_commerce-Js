import React, { Fragment, useCallback } from "react";
import ProductList from "../components/products/ProductList";
import { commerce } from "../lib/commerce";
import { useQuery } from "react-query";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import NavBar from "../components/navigation/NavBar";

export default function Products() {
  const fetchProducts = useCallback(async () => {
    const { data } = await commerce.products.list();

    return data;
  }, []);

  const { isLoading, error, data } = useQuery("products", fetchProducts);

  return (
    <Fragment>
      <NavBar inCartPage={false} />

      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="centered">
          <p>No products available</p>
        </div>
      )}

      {data && <ProductList products={data} />}
    </Fragment>
  );
}
