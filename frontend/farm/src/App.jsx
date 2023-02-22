import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Home from "./Home";
import Login from "home/Login";
import Signup from "home/Signup";

const App = () =>{
  const [authenticated, setAuthenticated] = useState(false);
  const [logging, setLogging] = useState('')

  const handleLogin = (data) => {
    localStorage.setItem('token', data.accessToken)
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    setAuthenticated(false);
  };

  const handleSignup = (data) => {
    localStorage.setItem('token', data.accessToken)
    setAuthenticated(true)
  };

  useEffect(()=> {
      if(localStorage.getItem('token')) {
        setAuthenticated(true);
      }
  }, [])

  return (
    <div>
      {authenticated ? (
          <Home onLogOut={handleLogout}/>
      ) : (<>
        <div className="buttons">
          <button onClick={()=> {setLogging('login')}}>Login</button>
          <button onClick={() => {setLogging('signup')}}>Sign up</button>
        </div>
        {logging === 'login' && <Login onLogin={handleLogin} />}
        {logging ==='signup' && <Signup onSignup={handleSignup} />}
        </>
      )}
    </div>
  );
  }
ReactDOM.render(<App />, document.getElementById("app"));
