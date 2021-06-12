import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><a href='/counter/'>React Showcase, TS, Redux</a></p>
        <p><a href='/mobx/'>Mobx with TS</a></p>
      </header>
    </div>
  );
}

export default App;
