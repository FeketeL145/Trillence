import { NavLink } from "react-router-dom";

function Register() {
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
          <h3 className="text-item whitetextbold">Register</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control whitetext"
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control whitetext"
              placeholder="Email address"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control whitetext"
              placeholder="Password"
            />
          </div>
          <div className="">
            <label>Repeat password</label>
            <input
              type="password"
              className="form-control whitetext"
              placeholder="Repeat password"
            />
          </div>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <NavLink to={`/sign-in`}>
            <p className="forgot-password text-secondary whitetext mt-2">
              Already have an account?
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
}
export default Register;

/*email, username, 2x password*/
