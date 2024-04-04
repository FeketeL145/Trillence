import Cookies from "js-cookie";
import React from "react";

function ProfileDisplay() {
    return (
        <div className="w-100 h-100 p-5" style={{backdropFilter: "blur(7.5px)"}}>
            <div className="card w-100 h-100" style={{backgroundColor: "#15171c"}}>
                <div className="card-body p-4">
                    <div className="d-flex align-items-center">
                        <p className="display-5 whitetextbold">Hi, {Cookies.get('username')}!</p>
                    </div>
                    <div className="card-content mt-4">
                        <p className="whitetext"></p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default ProfileDisplay;