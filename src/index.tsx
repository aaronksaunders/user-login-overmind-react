import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// overmind
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "./overmind";

const overmindStore = createOvermind(config, {
  devtools: "localhost:3031", // will show later
});

ReactDOM.render(
  <Provider value={overmindStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
