import React, { useEffect, useState } from "react";

const SpotDL = () => {
  const [localhostAvailable, setLocalhostAvailable] = useState(false);
  const [loading, setLoading] = useState(true); // Initially, set loading to true
  const [isMobileDevice, setMobileDevice] = useState(false);

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
        img.src = "http://localhost:8800/favicon.ico"; // You can change this URL to any resource on your localhost
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
      ) : localhostAvailable ? (
        <iframe
          title="SpotDL"
          src="http://localhost:8800/"
          className="spotdlFrame"
        ></iframe>
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
          <p
            className="whitetext text-center ps-2"
            style={{ fontSize: "30px" }}
          >
            SpotDL is not available, please make sure it was installed correctly on the host machine.
          </p>
        </div>
      )}
    </div>
  );
};

export default SpotDL;
