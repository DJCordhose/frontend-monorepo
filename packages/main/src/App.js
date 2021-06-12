import logo from './logo.svg';
import './App.css';

import { AriaButton } from "zeigermann-component-lib";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><a href='/counter/'>React Showcase, TS, Redux</a></p>
        <p><a href='/mobx/'>Mobx with TS</a></p>
        <p>
          <AriaButton testid='oha2' label='Login' text='Login' onClick={() => fetch('/api/login')}></AriaButton>
          <AriaButton testid='oha2' label='Logout' text='Logout' onClick={() => fetch('/api/logout')}></AriaButton>
        </p>

      </header>
    </div>
  );
}

export default App;
