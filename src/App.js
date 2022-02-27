import Cart from "./pages/Cart";
import Products from "./pages/Products";
import { Routes, Route } from "react-router";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
