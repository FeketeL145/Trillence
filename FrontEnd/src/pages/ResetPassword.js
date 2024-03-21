function ResetPassword(){
    return(
        <div className="auth-wrapper">
                <div className="auth-inner bg-dark">
                    <form>
                        <h3 className="whitetext">Reset Password</h3>
                        <p>Enter your new password below</p>
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
    )
}
export default ResetPassword;