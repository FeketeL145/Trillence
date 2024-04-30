import React from "react";
import { FaAsymmetrik } from "react-icons/fa";

function LoadingComponent() {
  return (
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
  );
}

export default LoadingComponent;
