import { useState, useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (showVerification) {
        setTimeLeft((prevTimeLeft) => {
          return prevTimeLeft - 1;
        });
      } else {
        setTimeLeft(120);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (Cookies.get("token") != null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedMinutes = String(minutes).padStart(1, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const timeExpired = timeLeft <= 0;

  const sendVerificationAgain = async () => {
    setTimeLeft(120);
    try {
      await sendVerificationEmail(email);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !repeatPassword) {
      setError("All fields are required.");
      return;
    }

    if (password != repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await sendVerificationEmail(email);
      await setShowVerification(true);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send verification email.");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setError("Verification code is required.");
      return;
    }
    try {
      const verifyresponse = await axios.post(
        "https://localhost:7106/api/Verification/verifycode",
        {
          code: verificationCode,
          email: email,
        }
      );

      if (verifyresponse.data === "Code matched successfully.") {
        setError("Code matched successfully.");
      }

      if (verifyresponse.data === "Invalid code or email.") {
        setError("Invalid code or email.");
        return;
      }

      const response = await axios.post(
        "https://localhost:7172/auth/register",
        {
          userName: username,
          password: password,
          email: email,
        }
      );

      if (response.data.ok) {
        setError(response.data.message || "Something went wrong.");
      } else {
        const roleResponse = await axios.post(
          "https://localhost:7172/auth/AssignRole",
          {
            email: email,
            roleName: "user",
          }
        );

        if (roleResponse.data.ok) {
          setError(roleResponse.data.message || "Failed to assign user role.");
        } else {
          setError(
            "Registration successful!\n You can now log into your account."
          );
          Navigate("/sign-in");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong.");
    }
  };

  const sendVerificationEmail = async (email) => {
    try {
      const response = await axios.post(
        "https://localhost:7106/api/Verification/verificationAndEmail",
        {
          email: email,
        }
      );

      if (response.status != 200) {
        throw new Error("Failed to send verification email.");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="auth-wrapper">
      {!isLoggedIn ? (
        <div
          className="auth-inner"
          style={{
            backdropFilter: "blur(10px)",
            color: "white",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
          }}
        >
          <form onSubmit={showVerification ? handleVerification : handleSubmit}>
            <h3 className="text-item whitetextbold">Register</h3>
            {error && <p className="error-message">{error}</p>}
            {!showVerification && (
              <div>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control whitetext"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control whitetext"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control whitetext"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Repeat password</label>
                  <input
                    type="password"
                    className="form-control whitetext"
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
              </div>
            )}
            {showVerification && (
              <div className="mb-3">
                <p>Email sent to {email}</p>
                <label>Verification Code</label>
                <input
                  type="text"
                  className="form-control whitetext"
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChange={(e) => {
                    const inputVal = e.target.value.replace(/\D/g, "");
                    setVerificationCode(inputVal.slice(0, 6));
                  }}
                  maxLength={6}
                />
                {showVerification ? (
                  <p>
                    {timeExpired ? (
                      <p
                        className="whitetext text-center mt-3"
                        style={{
                          textDecoration: "underline",
                          textUnderlineOffset: "2px",
                        }}
                        onClick={sendVerificationAgain}
                      >
                        Request another code
                      </p>
                    ) : (
                      <p className="whitetext text-secondary text-center mt-3">
                        You can request another code in: {formattedMinutes}:
                        {formattedSeconds}
                      </p>
                    )}
                  </p>
                ) : null}
              </div>
            )}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                {showVerification ? "Verify" : "Sign Up"}
              </button>
            </div>
            {!showVerification && (
              <NavLink to={`/sign-in`}>
                <p className="forgot-password text-secondary whitetext mt-2">
                  Already have an account?
                </p>
              </NavLink>
            )}
          </form>
        </div>
      ) : (
        <div
          className="auth-inner"
          style={{
            backdropFilter: "blur(10px)",
            color: "white",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
          }}
        >
          <p className="whitetext text-center" style={{ fontSize: "25px" }}>
            You're already signed in as :
          </p>
          <h1 className="whitetextbold text-center">
            {Cookies.get("username")}
          </h1>
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

export default Register;
