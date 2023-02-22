import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";

const App = () => (
  <div className="container">
      <Header app={{name: 'home'}}/>
      <div>home page content</div>
      <Login/>
      <Signup onSignup={()=>{}}/> 
      home app
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
