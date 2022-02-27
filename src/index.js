import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App";
import { CartProvider } from "./store/CartProvider";

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CartProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
