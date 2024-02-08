


function Register(){
    return(
        <div className="javisdmegpls container text-center d-flex align-items-center justify-content-center">
            <div className="text-center card p-5">
            <form className="form-group needs-validation">
                <div className="form-group m-3">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" required/>
                </div>
                <div className="form-group m-2">
                    <label>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                </div>
                <div className="form-group m-2">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" required/>
                </div>
                <div className="form-group m-2">
                    <label>User Name</label>
                    <input className="form-control" id="exampleInputPassword1" placeholder="User Name" required/>
                </div>
                <div className="form-group m-2">
                    <label>Full Name</label>
                    <input className="form-control" id="exampleInputPassword1" placeholder="Full Name" required/>
                </div>
                <button type="submit" className="btn btn-primary m-3">Register</button>
            </form>
            </div>
        </div>
    )
}
export default Register;

/*email, username, rendesname, 2x password*/
