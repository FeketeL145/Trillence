import { useState } from "react";
import React from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import SettingsDisplay from "../Components/SettingsDisplay";

function AdminPanel() {
  const isAdminCookie = Cookies.get("isAdmin") === "true"; // Convert cookie to boolean
  const [isUserAdmin] = useState(isAdminCookie);

  return (
    <div className="w-100 h-100">
      {!isUserAdmin ? (
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
        <SettingsDisplay className="embedFrame" /> // This renders if isUserAdmin is true
      )}
    </div>
  );
}

export default AdminPanel;
