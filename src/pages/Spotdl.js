import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

const SpotDL = () => {
  const [localhostAvailable, setLocalhostAvailable] = useState(false);
  const [loading, setLoading] = useState(true); // Initially, set loading to true
  const isAdminCookie = Cookies.get("isAdmin") === "true"; // Convert cookie to boolean
  const [isUserAdmin, setUserAdmin] = useState(isAdminCookie);

  useEffect(() => {
    const checkLocalhost = () => {
      const isLocalhostAvailable = () => {
        const img = new Image();
        img.onload = function () {
          setLocalhostAvailable(true);
          setLoading(false);
        };
        img.onerror = function () {
          setLocalhostAvailable(false);
          setLoading(false);
        };
        img.src = "http://localhost:8800/favicon.ico"; //Ez ellenőrzi a SpotDL betöltését
      };

      if (navigator.onLine) {
        isLocalhostAvailable();
      } else {
        setLocalhostAvailable(false);
        setLoading(false);
      }
    };

    checkLocalhost();
  }, []);

  return (
    <div>
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
      ) : isUserAdmin ? (
        localhostAvailable ? (
          <iframe
            title="SpotDL"
            src="http://localhost:8800/"
            className="embedFrame"
          ></iframe>
        ) : (
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
            <p
              className="whitetext text-center ps-2"
              style={{ fontSize: "30px" }}
            >
              SpotDL is not available, please make sure it was installed
              correctly on the host machine.
            </p>
          </div>
        )
      ) : (
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
      )}
    </div>
  );
};

export default SpotDL;
