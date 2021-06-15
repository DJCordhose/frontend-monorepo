import logo from "./logo.svg";
import "./App.css";

import { AriaButton } from "zeigermann-component-lib";

function App() {
  const loginJwt = async () => {
    const response = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({
        login: "olli",
        password: "qweqwe123",
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
      });
    const json = await response.json();
    if (json.token) {
      localStorage.setItem("token", json.token);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <a href="/counter/">React Showcase, TS, Redux</a>
        </p>
        <p>
          <a href="/mobx/">Mobx with TS</a>
        </p>
        <p>
          <AriaButton
            testid="oha2"
            label="Login"
            text="Login"
            onClick={() => loginJwt()}
          ></AriaButton>
          <AriaButton
            testid="oha2"
            label="Logout"
            text="Logout"
            onClick={() => {localStorage.removeItem('token'); fetch("/api/logout")}}
          ></AriaButton>
        </p>
      </header>
    </div>
  );
}

export default App;
