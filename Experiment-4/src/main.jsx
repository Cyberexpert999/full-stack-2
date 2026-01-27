import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import { CounterProvider } from "./context/CounterContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CounterProvider>
        <App />
      </CounterProvider>
    </Provider>
  </StrictMode>
);
