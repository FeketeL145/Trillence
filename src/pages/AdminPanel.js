import { useState, useEffect } from "react";
import React from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import SettingsDisplay from "../Components/SettingsDisplay";

function AdminPanel() {
  const isAdminCookie = Cookies.get("isAdmin") === "true"; // Convert cookie to boolean
  const [isUserAdmin, setUserAdmin] = useState(isAdminCookie);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []); // Added empty dependency array to useEffect to ensure it only runs once
  
  return (
    <div className="w-100 h-100">
      {loading ? (
        <div
          className="embedFrame"
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
      ) : !isUserAdmin ? ( // Changed condition here
        <div
          className="embedFrame"
          style={{
            color: "white",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className="whitetext">
            <NavLink to={`/`} className="whitetextboldhoverable">
              You do not have permission to view this page
            </NavLink>
          </p>
        </div>
      ) : (
        <SettingsDisplay className="embedFrame"/> // This renders if isUserAdmin is true
      )}
    </div>
  );
}

export default AdminPanel;