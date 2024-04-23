import Cookies from "js-cookie";
import React from "react";
import * as FaIcons from "react-icons/fa";
import {useState} from "react";
function ProfileDisplay() {
  
  const [usertochange, setUsertochange] = useState("");
  const [newusername, setNewusername] = useState("");
  const [userpasswordtochange, setUserpasswordtochange] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [usertodelete, setUsertodelete] = useState("");
  const [usertomakeadmin, setUsertomakeadmin] = useState("");

  const handleUserNameModification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7172/auth/change-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldUsername: usertochange,
          newUsername: newusername,
        }),
      });
      if (response.ok) {
        console.log('Username changed successfully');
        setUsertochange('');
        setNewusername('');
      } else {
        console.error('Failed to change username');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handlePasswordModification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7172/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userpasswordtochange,
          oldPassword: oldpassword,
          newPassword: newpassword,
        }),
      });
      if (response.ok) {
        console.log('Password changed successfully');
        setUserpasswordtochange('');
        setOldpassword('');
        setNewpassword('');
      } else {
        console.error('Failed to change password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  const handleUserDeletion = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7172/auth/delete-user/${usertodelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log(`User ${usertodelete} deleted successfully`);
        setUsertodelete('');
      } else {
        console.error(`Failed to delete user ${usertodelete}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMakeAdmin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://localhost:7172/auth/AssignRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: usertomakeadmin,
          roleName: 'admin',
        }),
      });
      
      if (response.ok) {
        console.log(`User ${usertomakeadmin} assigned admin role successfully`);
        setUsertomakeadmin('');
      } else {
        console.error(`Failed to assign admin role to user ${usertomakeadmin}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          <div className="card-content mt-4" style={{
          overflowY: "scroll",
          height: "70vh"}}>
            <p className="whitetextbold">
              <FaIcons.FaCog /> Settings
            </p>
            <form onSubmit={handleUserNameModification}>
          <h3 className="whitetextbold mt-3">Change Username</h3>
          <div>
            <div className="mb-1">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={usertochange}
                onChange={(e) => setUsertochange(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label>New Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter new username"
                value={newusername}
                onChange={(e) => setNewusername(e.target.value)}
              />
              <div className="d-grid mt-2">
                <button type="submit" className="btn btn-primary">
                  Change Username
                </button>
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={handlePasswordModification}>
          <h3 className="whitetextbold mt-3">Change Password</h3>
          <div>
            <div className="mb-1">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={userpasswordtochange}
                onChange={(e) => setUserpasswordtochange(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={oldpassword}
                onChange={(e) => setOldpassword(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter the new password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </div>
        </form>
        <form onSubmit={handleUserDeletion}>
          <h3 className="whitetextbold mt-3">Delete User</h3>
          <div>
            <div className="mb-1">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter user to delete"
                value={usertodelete}
                onChange={(e) => setUsertodelete(e.target.value)}
              />
              <div className="d-grid mt-2">
                <button type="submit" className="btn btn-danger">
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={handleMakeAdmin}>
          <h3 className="whitetextbold mt-3">Make a user admin</h3>
          <div>
            <div className="mb-1">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the email of the user to make admin"
                value={usertomakeadmin}
                onChange={(e) => setUsertomakeadmin(e.target.value)}
              />
              <div className="d-grid mt-2">
                <button type="submit" className="btn btn-warning">
                  Make Admin
                </button>
              </div>
            </div>
          </div>
        </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDisplay;