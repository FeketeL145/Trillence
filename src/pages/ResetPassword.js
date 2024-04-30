import Cookies from "js-cookie";
import React from "react";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
function ResetPassword() {
  const [userpasswordtochange, setUserpasswordtochange] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordModification = async (e) => {
    e.preventDefault();

    if (newpassword != repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:7172/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: Cookies.get("username"),
            oldPassword: oldpassword,
            newPassword: newpassword,
          }),
        }
      );
      if (response.ok) {
        setError(`Password changed successfully`);
        setUserpasswordtochange("");
        setOldpassword("");
        setNewpassword("");
      } else {
        console.error("Failed to change password");
        setError(`Failed to change password`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(`Error: ${error}`);
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
        <form onSubmit={handlePasswordModification}>
          <h3 className="whitetextbold text-center">Reset Password</h3>
          <p className="whitetext text-center">
            Enter your old and new password
          </p>
          <p className="whitetext">{error}</p>
          <div className="mb-3">
            <label>Current password</label>
            <input
              type="password"
              className="form-control whitetext"
              placeholder="Password"
              value={oldpassword}
              onChange={(e) => setOldpassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>New password</label>
            <input
              type="password"
              className="form-control whitetext"
              placeholder="Password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Confirm password</label>
            <input
              type="password"
              className="form-control whitetext"
              placeholder="Confirm Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="d-grid pt-4">
            <button type="submit" className="btn btn-primary">
              <span className="whitetext">Change password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;
