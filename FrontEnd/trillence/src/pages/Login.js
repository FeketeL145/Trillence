import { NavLink } from "react-router-dom";

function Login(){
    return(
        <div className="auth-wrapper">
            <div className="auth-inner bg-dark">
              <form>
                <h3 className="whitetext">Sign In</h3>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control whitetext"
                    placeholder="Enter email"
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control whitetext"
                    placeholder="Enter password"
                  />
                </div>

                <div className="mb-3">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label className="custom-control-label px-2 unselectable" htmlFor="customCheck1">
                        Remember me
                    </label>
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Log in
                  </button>
                </div>
                <NavLink to={`/PasswordForgot`}>
                  <p className="forgot-password text-right whitetext"><a href="#">Forgot password?</a></p>
                </NavLink>
              </form>
            </div>
        </div>
    )
}
export default Login;