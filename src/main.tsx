import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NotesApp from "./NotesApp";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NotesApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
