import { useState, useEffect } from "react";
import React from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import SettingsDisplay from "../Components/SettingsDisplay";

function AdminPanel() {
  const [isUserAdmin, setUserAdmin] = useState(
    Cookies.get("isAdmin") != "false"
  );
  const [loading, setLoading] = useState(true);
  //after 600ms, timeout loading
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
        <SettingsDisplay className="spotdlFrame"/>
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