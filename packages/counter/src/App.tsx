import React, { lazy } from "react";

import { SwitchLanguage } from "./SwitchLanguage";
import { Nav } from "./Nav";

// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Counter = lazy(() => import("./features/counter/Counter"));
const Hello = lazy(() => import("./features/hello/Hello"));

function App() {
  return (
    <div id="cnt-app" className="p-6 max-w-sm mx-auto space-x-5">
      <Router basename='/counter'>
        <Nav />
        <SwitchLanguage />
        <Switch>
          <Route exact path="/" component={Counter} />
          <Route path="/hello" component={Hello} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
