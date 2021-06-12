import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useStore } from "./Store";
import { observer } from "mobx-react";

import { LoadingIndicator } from "zeigermann-component-lib";

const App = observer(() => {
  const store = useStore();

  const isInitialized: boolean = store.initialized;

  // a real effect could also be inside the store as a mobx construct
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      store.updateHost("localhost");
      store.updatePort(80);
    })();
  }, [store]);
  const app = (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          {store.host}, {store.port}
        </p>
      </header>
    </div>
  );

  return isInitialized ? app : <LoadingIndicator title="Loading..." />;
});

export default App;
