import React from "react";
import ReactDOM from "react-dom";

// We have Webpack 5, might need export maps to make this work
// import { AriaButton, sayHi} from "zeigermann-component-lib";

class HelloMessage extends React.Component {
    render() {
      return (
        <div>
          <p>Hiho, {this.props.name}</p>
          {/* <p><AriaButton testid='oha' label='Click mich' text='Click mich' onClick={() => console.log(sayHi("Olli"))} /></p> */}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <HelloMessage name="Olli" />,
    document.getElementById('root')
  );

  module.hot.accept();