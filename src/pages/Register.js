import { useState } from "react";
import { NavLink } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !repeatPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const code = generateVerificationCode();
      setGeneratedCode(code);
      await sendVerificationEmail(email, code);
      setShowVerification(true);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send verification email");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setError("Verification code is required");
      return;
    }
    try {
      if (verificationCode != generatedCode) {
        setError("Wrong verification code.");
        return;
      }
      const response = await fetch("https://localhost:7172/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
          email: email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Something went wrong");
      } else {
        setError(null);
        console.log("Registration successful");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong");
    }
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const sendVerificationEmail = async (email, code) => {
    try {
      const response = await fetch("https://localhost:7106/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Verification Code",
          body: `<h1>Your verification code is: ${code}</h1>`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }
    } catch (error) {
      throw error;
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
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
          )}
          <div className="d-grid mt-4">
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
    </div>
  );
}

export default Register;