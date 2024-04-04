import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import ProfileDisplay from "../Components/ProfileDisplay";

function MyProfile(){
  const [isUserLoggedin, setUserLoggedin] = useState(Cookies.get('token') != null);
  const [loading, setLoading] = useState(true);
  //after 2000ms, timeout loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  })
    return(
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
      ) : isUserLoggedin ? (
        <ProfileDisplay/>
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
          <NavLink to={`/sign-in`} className="whitetextboldhoverable">Please Sign in to view your profile.</NavLink>
          </p>
        </div>
      )}
    </div>
    );
};

export default MyProfile;