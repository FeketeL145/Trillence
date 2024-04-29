import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangeUsername() {
  const [newusername, setNewusername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameModification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://localhost:7172/auth/change-username',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldUsername: Cookies.get('username'),
            newUsername: newusername,
          }),
        }
      );

      if (response.ok) {
        console.log('Username changed successfully');
        setError('Username changed successfully');

        Cookies.set('username', newusername, { path: '/' });

        setNewusername('');

        navigate('/profile');
      } else {
        console.error('Failed to change username');
        setError('Failed to change username');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
      <div
        className="card p-5"
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          color: 'white',
          boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
          width: '30rem',
        }}
      >
        <form onSubmit={handleUsernameModification}>
          <h3 className="whitetextbold text-center">Change Username</h3>
          <p className="whitetext text-center">
            Please enter your new username in the input field, then press change username.
          </p>
          <p className="whitetext">{error}</p>
          <div className="mb-3">
            <input
              type="text"
              className="form-control whitetext"
              placeholder="New Username"
              value={newusername}
              onChange={(e) => setNewusername(e.target.value)}
            />
          </div>
          <div className="d-grid pt-4">
            <button type="submit" className="btn btn-primary">
              Change username
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeUsername;
