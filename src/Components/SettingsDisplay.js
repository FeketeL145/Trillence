import Cookies from "js-cookie";
import React from "react";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaI } from "react-icons/fa6";
function ProfileDisplay() {
  const [usertochange, setUsertochange] = useState("");
  const [newusername, setNewusername] = useState("");
  const [userpasswordtochange, setUserpasswordtochange] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [usertodelete, setUsertodelete] = useState("");
  const [usertomakeadmin, setUsertomakeadmin] = useState("");

  const notifySuccess = async (message) => {
    await toast.dismiss();
    await toast.success(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const notifyError = async (message) => {
    await toast.dismiss();
    await toast.error(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const handleUserNameModification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:7172/auth/change-username",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldUsername: usertochange,
            newUsername: newusername,
          }),
        }
      );
      if (response.ok) {
        await setUsertochange("");
        await setNewusername("");
        await notifySuccess("Username changed successfully");
      } else {
        console.error("Failed to change username");
        await notifyError("Failed to change username");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePasswordModification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:7172/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userpasswordtochange,
            oldPassword: oldpassword,
            newPassword: newpassword,
          }),
        }
      );
      if (response.ok) {
        await notifySuccess(`Password changed successfully For user:\n ${userpasswordtochange}`);
        await setUserpasswordtochange("");
        await setOldpassword("");
        await setNewpassword("");
      } else {
        console.error("Failed to change password");
        await notifyError(`Failed to change password\nFor user: ${userpasswordtochange}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUserDeletion = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7172/auth/delete-user/${usertodelete}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        await notifySuccess(`User ${usertodelete} deleted successfully`);
        await setUsertodelete("");
      } else {
        console.error(`Failed to delete user ${usertodelete}`);
        await notifyError(`Failed to delete user: ${usertodelete}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMakeAdmin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7172/auth/AssignRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: usertomakeadmin,
          roleName: "admin",
        }),
      });

      if (response.ok) {
        await notifySuccess(`User ${usertomakeadmin} assigned admin role successfully`);
        await setUsertomakeadmin("");
      } else {
        console.error(`Failed to assign admin role to user ${usertomakeadmin}`);
        await notifyError(`Failed to assign admin role to user: ${usertomakeadmin}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMetadataRead = async () => {
    try {
      const res = await axios.get(`https://localhost:7106/api/Metadata`);
      if (res.status === 200) {
        notifySuccess("Metadata read successfully");
        // Process the metadata here
      } else {
        notifyError("Failed to read metadata");
      }
    } catch (error) {
      notifyError(`Error: ${error}`);
    }
  };

  return (
    <div className="embedFrame">
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      <div
        className="w-100 h-100"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <div className="card-body p-4">
          <h1 className="whitetextbold d-flex align-items-center">
            <FaIcons.FaCog className="m-2" /> Administrator settings
          </h1>
          <div className="card-content p-4">
            <form onSubmit={handleUserNameModification}>
              <h3 className="whitetextbold mt-3">
                <FaIcons.FaUser /> Change Username
              </h3>
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
                      <span className="whitetext">Change Username</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <form onSubmit={handlePasswordModification}>
              <h3 className="whitetextbold mt-3">
                <FaIcons.FaKey /> Change Password
              </h3>
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
                    placeholder="Enter current password"
                    value={oldpassword}
                    onChange={(e) => setOldpassword(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter a new password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-grid mt-2">
                <button type="submit" className="btn btn-primary">
                  <span className="whitetext">Change Password</span>
                </button>
              </div>
            </form>
            <form onSubmit={handleUserDeletion}>
              <h3 className="whitetextbold mt-3">
                <FaIcons.FaUserMinus /> Delete User
              </h3>
              <div>
                <div className="mb-1">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a username"
                    value={usertodelete}
                    onChange={(e) => setUsertodelete(e.target.value)}
                  />
                  <div className="d-grid mt-2">
                    <button type="submit" className="btn btn-danger">
                      <span className="whitetext">Delete User</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <form onSubmit={handleMakeAdmin}>
              <h3 className="whitetextbold mt-3">
                <FaIcons.FaUserShield /> Add admin role to user
              </h3>
              <div>
                <div className="mb-1">
                  <label>User email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter an email address"
                    value={usertomakeadmin}
                    onChange={(e) => setUsertomakeadmin(e.target.value)}
                  />
                  <div className="d-grid mt-2">
                    <button type="submit" className="btn btn-warning">
                      <span className="whitetext">Make Admin</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <form onSubmit={handleMetadataRead}>
              <h3 className="whitetextbold mt-3">
                <FaIcons.FaDatabase /> Read metadata from song storage
              </h3>
              <div>
                <div className="mb-1">
                  <div className="d-grid mt-2">
                    <button type="submit" className="btn btn-primary">
                      <span className="whitetext">Read metadata</span>
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
