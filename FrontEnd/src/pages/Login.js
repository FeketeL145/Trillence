import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../Components/AuthService";
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await AuthService.login(username, password);
      if (!token) {
        setError("Username or password is incorrect");
        return;
      }
      if(token != null)
      {
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('username', username, { expires: 7 });
        window.location.href = '/';
      }
      console.log("Login Successful");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div
        className="auth-inner"
        style={{
          backdropFilter: "blur(10px)",
          color: "white",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        }}
      >
        <form onSubmit={handleLogin}>
          <h3 className="whitetextbold">Sign In</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="mb-1">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            {error && <div className="whitetext text-danger">{error}</div>}
          </div>
          <NavLink to={`/PasswordForgot`}>
            <p className="forgot-password text-secondary whitetext">
              Forgot password?
            </p>
          </NavLink>
          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
          <div className="text-center whitetext mt-4">
            Don't have an account?
            <NavLink to={`/sign-up`} className="text-center text-secondary">
              <p>Sign up</p>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
