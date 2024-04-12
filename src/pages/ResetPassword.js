function ResetPassword() {
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
          <h3 className="whitetextbold text-center">Reset Password</h3>
          <p className="whitetext text-center">Enter your new password below</p>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control whitetext"
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control whitetext"
              placeholder="Confirm Password"
            />
          </div>
          <div className="d-grid pt-4">
            <button type="submit" className="btn btn-primary">
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;
