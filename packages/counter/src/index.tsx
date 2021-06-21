import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import "zeigermann-component-lib/dist/index.esm.css";

import { LoadingIndicator } from "./common/components/LoadingIndicator";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

import "./i18n";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingIndicator title="Loading..." />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// https://web.dev/vitals/

getTTFB(console.log); // Time to First Byte (TTFB): https://web.dev/time-to-first-byte/, is the server slow?
getFCP(console.log); // First Contentful Paint (FCP): https://web.dev/fcp/, first time user sees anything
getLCP(console.log); // Largest Contentful Paint (LCP): https://web.dev/lcp/, first time user sees app
getFID(console.log); // First Input Delay (FID): https://web.dev/fid/, once user can interact how long till app responds
getCLS(console.log); // Cumulative Layout Shift (CLS): https://web.dev/cls/, is the app "jumpy"?
