function Register(){
    return(
        <div className="javisdmegpls container text-center d-flex align-items-center justify-content-center">
            <div className="text-center card p-5">
            <form className="">
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label>username</label>
                    <input className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label>Fullname</label>
                    <input className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label>Password again</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password again"/>
                </div>
                <button type="submit" className="btn btn-primary m-3">Login</button>
            </form>
            </div>
        </div>
    )
}
export default Register;

/*email, username, rendesname, 2x password*/
