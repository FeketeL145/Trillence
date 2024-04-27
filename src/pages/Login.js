import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import AuthService from "../Components/AuthService";
import Cookies from "js-cookie";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useState(() => {
    if (Cookies.get("token") != null) {
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false);
    }
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await AuthService.login(username, password);
      if (!token) {
        setError("Username or password is incorrect");
        return;
      }
      const response = await axios.post(
        `https://localhost:7172/auth/is-admin?username=${username}`
      );
      console.log(username);
      console.log(response.data);

      if (token != null) {
        Cookies.set("token", token, { expires: 7 });
        Cookies.set("username", username, { expires: 7 });
        Cookies.set("isAdmin", response.data.isAdmin, { expires: 7 });
        window.location.href = "/";
      }
      
      console.log("Login Successful");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
      {!isLoggedIn ? (
        <div
          className="card p-5"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "white",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
            width: "30rem",
          }}
        >
          <form onSubmit={handleLogin} autoComplete="on">
            <h3 className="whitetextbold text-center">Sign In</h3>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                autoComplete="username"
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
                autoComplete="current-password"
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
      ) : (
        <div
          className="card p-5"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "white",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
            width: "30rem",
          }}
        >
          <p className="whitetext text-center" style={{ fontSize: "25px" }}>
            You're already signed in as :
          </p>
          <h1 className="whitetextbold text-center">{Cookies.get("username")}</h1>
          <div className="d-grid mt-3">
            <NavLink to={`/`} className="btn btn-primary mb-3">
              Go back
            </NavLink>
            <NavLink to={`/sign-out`} className="btn btn-danger">
              Sign out
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
