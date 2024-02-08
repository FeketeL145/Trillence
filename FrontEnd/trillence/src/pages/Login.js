function Login(){
    return(
        <div className="container text-center text-justify">
        <div className="card text-center p-2 loginpagewidth">
            <form className="text-center">
                <div className="form-group m-2">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
                </div>
                <div className="form-group m-2">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    )
}
export default Login;