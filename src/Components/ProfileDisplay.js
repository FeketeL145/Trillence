import Cookies from "js-cookie";
import React from "react";
import * as FaIcons from "react-icons/fa";

function ProfileDisplay() {
  return (
    <div className="w-100 h-100">
      <div
        className="w-100 h-100"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex align-items-center">
            <p className="whitetext display-5">
              Hi, {Cookies.get("username")}!
            </p>
          </div>
          <p className="whitetextbold d-flex align-items-center">
              <FaIcons.FaCog className="m-2"/>Settings
          </p>
          <div className="card-content d-flex align-items-center justify-content-center row">
            <div className="d-flex align-items-center whitetext ps-2 settings-option row">
            <button onClick={() => window.location.href = '/resetpassword'} className="btn row m-2" style={{ backgroundColor: "#15171c", color: "white" }}>Change password</button>
            <button className="btn row m-2" style={{ backgroundColor: "#15171c", color: "white" }}>Change username</button>
            <button className="btn row m-2" style={{ backgroundColor: "#15171c", color: "white" }}>Delete all playlists</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDisplay;
