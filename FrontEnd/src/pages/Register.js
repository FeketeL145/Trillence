import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../Components/AuthService";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Invalid email format");
        return;
      }

      // Password match validation and strength requirements
      if (password !== repeatPassword) {
        setError("Passwords do not match");
        return;
      }

      if (
        !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
      ) {
        setError(
          "Password must be at least 8 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character"
        );
        return;
      }

      const message = await AuthService.register(username, email, password);
      // Handle successful registration
      console.log("Registration Successful");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
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
        <form onSubmit={handleRegister}>
          <h3 className="whitetextbold text-center">Register</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label>Repeat password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="whitetext text-danger">{error}</div>}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <NavLink to={`/sign-in`}>
            <p className="forgot-password text-secondary whitetext mt-2">
              Already have an account?
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
}
export default Register;

/*email, username, 2x password*/
