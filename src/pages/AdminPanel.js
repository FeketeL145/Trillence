import { useState, useEffect } from "react";
import React from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import SettingsDisplay from "../Components/SettingsDisplay";

function AdminPanel() {
  const [usertochange, setUsertochange] = useState("");
  const [newusername, setNewusername] = useState("");
  const [userpasswordtochange, setUserpasswordtochange] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [usertodelete, setUsertodelete] = useState("");
  const [isUserAdmin, setUserAdmin] = useState(
    Cookies.get("isAdmin") != "false"
  );
  const [loading, setLoading] = useState(true);
  //after 2000ms, timeout loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  });
  
  return (
    <div className="w-100 h-100">
      {loading ? (
        <div
          className="spotdlFrame"
          style={{
            color: "white",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="spinner-grow spinner-grow-sm m-2 text-white"
            role="status"
          ></div>
          <div
            className="spinner-grow spinner-grow-sm m-2 text-white"
            role="status"
          ></div>
          <div
            className="spinner-grow spinner-grow-sm m-2 text-white"
            role="status"
          ></div>
        </div>
      ) : isUserAdmin ? (
        <SettingsDisplay/>
      ) : (
        <div
          className="spotdlFrame"
          style={{
            color: "white",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className="whitetext">
            <NavLink to={`/sign-in`} className="whitetextboldhoverable">
              You do not have permission to view this page
            </NavLink>
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;

/*<div className="auth-wrapper">
      <div
        className="auth-inner"
        style={{
          backdropFilter: "blur(10px)",
          color: "white",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        }}
      >
        <form onSubmit={handleUserNameModification}>
          <h3>Change Username</h3>
          <div>
            <div className="mb-1">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={usertochange}
                onChange={(e) => setUsertochange(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label>New Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter new username"
                value={newusername}
                onChange={(e) => setNewusername(e.target.value)}
              />
              <div className="d-grid mt-2">
                <button type="submit" className="btn btn-primary">
                  Change Username
                </button>
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={handlePasswordModification}>
          <h3>Change Password</h3>
          <div>
            <div className="mb-1">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={userpasswordtochange}
                onChange={(e) => setUserpasswordtochange(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={oldpassword}
                onChange={(e) => setOldpassword(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter the new password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </div>
        </form>
        <form onSubmit={handleUserDeletion}>
          <h3>Delete User</h3>
          <div>
            <div className="mb-1">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter user to delete"
                value={usertodelete}
                onChange={(e) => setUsertodelete(e.target.value)}
              />
              <div className="d-grid mt-2">
                <button type="submit" className="btn btn-danger">
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
     */