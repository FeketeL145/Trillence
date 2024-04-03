import React from "react";

function ProfileDisplay() {
    return (
        <div className="w-100 h-100 p-5" style={{backdropFilter: "blur(7.5px)"}}>
            <div className="card w-100 h-100" style={{backgroundColor: "#15171c"}}>
                <div className="card-body p-4">
                    <div className="d-flex align-items-center">
                        <img className="profile-img" src="https://placehold.co/600x600/EEE/31343C"/>
                        <p className="whitetextbold display-5">Szomorú!</p>
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