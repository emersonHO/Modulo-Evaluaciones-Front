import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./general/store";
import { AyudaDocWeb } from "./AyudaDocWeb";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AyudaDocWeb />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
