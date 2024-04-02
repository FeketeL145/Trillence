import { NavLink } from "react-router-dom";

function Login() {
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
          <h3 className="whitetextbold">Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control whitetext"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-1">
            <label>Password</label>
            <input
              type="password"
              className="form-control whitetext"
              placeholder="Enter password"
            />
          </div>
          <NavLink to={`/PasswordForgot`}>
            <p className="forgot-password text-secondary whitetext">
              Forgot password?
            </p>
          </NavLink>
          <div className="mb-3 d-grid">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label
                className="custom-control-label px-2 unselectable"
                htmlFor="customCheck1"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
          <div className="text-center whitetext mt-4">
            Don't have an account?
            <NavLink to={`/sign-up`} className="text-center text-secondary">
              <p>Sign up</p>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
