import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const API_URL = 'http://localhost:3000'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const data = await axios.post(`${API_URL}/login`, {email, password}).then(resp => resp.data)
    if(data){
    onLogin(data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
