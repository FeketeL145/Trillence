import React, { useState } from 'react';

// Function for the 'Forgotten Password' form component
function ForgotPassword() {
  const [emailAddress, setEmailAddress] = useState(''); // State to hold email input
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false); // State to check if email was submitted
  const [resetToken, setResetToken] = useState(''); // State for reset token input
  const [newPassword, setNewPassword] = useState(''); // State for new password input

  // Handler for form submission (email reset link request)
  const handleEmailSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (emailAddress.trim() === '') {
      alert('Please enter your email address.'); // Alert if email is empty
      return;
    }

    setIsSubmitting(true); // Set submitting state to true

    try {
      const response = await fetch(`https://localhost:7172/auth/send-reset-email?emailAddress=${emailAddress}`, {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Content type for JSON data
        },
        body: JSON.stringify({ email: emailAddress }), // Body containing the email address
      });

      if (response.ok) {
        alert('Password reset email sent. Please check your email inbox.'); // Success message
        setIsEmailSubmitted(true); // Mark the email submission as successful
      } else {
        alert('Failed to send reset email. Please try again later.'); // Failure message
      }
    } catch (error) {
      console.error('Error sending reset email:', error); // Log error
      alert('An error occurred. Please try again later.'); // User-friendly error message
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // Handler for form submission (password reset)
  const handleResetPassword = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (resetToken.trim() === '' || newPassword.trim() === '') {
      alert('Please enter the required information.'); // Alert if inputs are empty
      return;
    }

    setIsSubmitting(true); // Set submitting state to true

    try {
      const response = await fetch('https://localhost:7172/auth/reset-password', {
        method: 'PUT', // HTTP method for updating
        headers: {
          'Content-Type': 'application/json', // Content type for JSON data
        },
        body: JSON.stringify({
          emailAddress,
          newPassword,
          resetToken,
        }),
      });

      if (response.ok) {
        alert('Password has been successfully reset.'); // Success message
      } else {
        alert('Failed to reset password. Please try again later.'); // Failure message
      }
    } catch (error) {
      console.error('Error resetting password:', error); // Log error
      alert('An error occurred. Please try again later.'); // User-friendly error message
    } finally {
      setIsSubmitting(false); // Reset submitting state
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
        {isEmailSubmitted ? (
          <form onSubmit={handleResetPassword}> {/* New form for reset password */}
            <h3 className="whitetextbold text-center">Enter Password Reset Token</h3>
            <p className="whitetext text-center" style={{ fontSize: '15px' }}>
              Please check your email and enter the password reset token to reset your password.
            </p>
            <div className="mb-3">
              <label>Reset Token</label>
              <input
                type="text"
                className="form-control whitetext"
                placeholder="Paste reset token here"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)} // Update reset token state
              />
            </div>
            <div className="mb-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control whitetext"
                placeholder="Enter your new password here"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} // Update new password state
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}> {/* Disable button during submission */}
                Reset Password
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleEmailSubmit}> {/* Original form for email submission */}
            <h3 className="whitetextbold text-center">Forgotten Password</h3>
            <p className="whitetext text-center" style={{ fontSize: '15px' }}>
              Enter the email address associated with your account, and we'll send you a link to reset your forgotten password.
            </p>
            <div className="mb-3">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control whitetext"
                placeholder="Enter your email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)} // Update email address state
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}> {/* Disable button during submission */}
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;