function Register(){
    return(
      <div className="auth-wrapper">
          <div className="auth-inner bg-dark">
            <form>
              <h3 className="text-item whitetext">Register</h3>
              <div className="row">
                <div className="mb-3 col">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control whitetext"
                    placeholder="First name"
                  />
                </div>
                <div className="mb-3 col">
                  <label>Last name</label>
                  <input type="text" className="form-control whitetext" placeholder="Last name" />
                </div>
              </div>
              <div className="mb-3">
                <label>Username</label>
                <input type="text" className="form-control whitetext" placeholder="Username" />
              </div>

              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control whitetext"
                  placeholder="Email address"
                />
              </div>
              <div className="row">
                <div className="mb-3 col">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control whitetext"
                    placeholder="Password"
                  />
                </div>

                <div className="mb-3 col">
                  <label>Repeat password</label>
                  <input
                    type="password"
                    className="form-control whitetext"
                    placeholder="Repeat password"
                  />
                </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right whitetext">
            <a href="/sign-in">Already registered?</a>
            </p>
          </form>
        </div>
      </div>
    )
}
export default Register;

/*email, username, rendesname, 2x password*/
