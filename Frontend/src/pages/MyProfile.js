import { useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import ProfileDisplay from "../Components/ProfileDisplay";

function MyProfile() {
  const [isUserLoggedin] = useState(Cookies.get("token") != null);

  return (
    <div className="w-100 h-100">
      {isUserLoggedin ? (
        <ProfileDisplay />
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
            <NavLink to={`/sign-in`} className="whitetextboldhoverable">
              Please{" "}
              <span style={{ textDecoration: "underline" }}>Sign in</span> to
              view your profile.
            </NavLink>
          </p>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
