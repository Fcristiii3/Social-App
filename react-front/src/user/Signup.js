import { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open : false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({error:""})
        this.setState({ [name]: event.target.value })  ///for this syntax, all the fields are taken care of
    }

    clickSubmit = (event) => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name: name,
            email: email,
            password: password
        };
        signup(user)
            .then(data => {
                if (data.error) this.setState({ error: data.error })
                else this.setState({
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    open : true
                })
            })
    };

    signupForm = (name,email,password) => (
        <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input
                            onChange={this.handleChange("name")}
                            type="text"
                            className="form-control"
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Submit
                    </button>
                </form>
    )



    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                    <div className="alert alert-danger" style={{display:this.state.error ? "" : "none"}}>{this.state.error}</div>
                    <div className="alert alert-info" style={{display:this.state.open ? "" : "none"}}>Account created. Please <Link to="/signin">Sign in</Link></div>
                {this.signupForm(this.state.name,this.state.email,this.state.password)}
            </div>
        )
    }
}
export default Signup;