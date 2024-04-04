function ForgotPassword() {
  return (
    <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
      <div
        className="card p-5"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          color: "white",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
          width: "30rem",
        }}
      >
        <form>
          <h3 className="whitetextbold text-center">Forgotten Password</h3>
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
