function ForgotPassword() {
  return (
    <div className="auth-wrapper">
      <div
        className="auth-inner"
        style={{
          backdropFilter: "blur(10px)",
          color: "white",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        }}
      >
        <form>
          <h3 className="whitetextbold">Forgotten Password</h3>
          <p className="whitetext text-center" style={{ fontSize: "15px" }}>
            Enter the email address associated with your account and we'll send
            you a link to reset your forgotten password
          </p>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control whitetext"
              placeholder="Enter your email"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
