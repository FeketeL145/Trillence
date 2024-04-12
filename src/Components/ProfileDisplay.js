import Cookies from "js-cookie";
import React from "react";
import * as FaIcons from "react-icons/fa";

function ProfileDisplay() {
  return (
    <div className="w-100 h-100 p-5">
      <div
        className="w-100 h-100"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
          borderRadius: "15px",
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex align-items-center">
            <p className="whitetext display-5">
              Hi, {Cookies.get("username")}!
            </p>
          </div>
          <div className="card-content mt-4">
            <p className="whitetextbold">
              <FaIcons.FaCog /> Settings
            </p>
            <div className="whitetext ps-2 settings-option">asd</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDisplay;
