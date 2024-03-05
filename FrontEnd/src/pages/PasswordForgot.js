function PasswordForgot(){
    return(
        <div className="auth-wrapper">
            <div className="auth-inner bg-dark">
                <form>
                    <h3 className="whitetext">Forgotten Password</h3>
                    <p>Enter your email and we'll get you right back on track</p>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control whitetext"
                            placeholder="Enter email"
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
)}
        export default PasswordForgot;