import { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin } from "../auth";
import { authenticate } from "../auth";

class Signin extends Component {

    constructor() {
        super()
        this.state = {

            email: "",
            password: "",
            error: "",
            redirectToReferer:false,
            loading:false

        }
    };



    handleChange = (name) => (event) => {
        this.setState({error:""})
        this.setState({ [name]: event.target.value })  ///for this syntax, all the fields are taken care of
    }

    clickSubmit = (event) => {
        event.preventDefault();
        this.setState({loading:true})
        const { email, password } = this.state;
        const user = {
            email: email,
            password: password
        };
        //console.log(user);
        signin(user)
            .then(data => {
                if (data.error) this.setState({ error: data.error , loading:false})
                else {
                    authenticate(data,() =>{
                        this.setState({redirectToReferer:true})
                    })
                }
            })
    };

    signinForm = (email,password) => (
        <form>
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
        if(this.state.redirectToReferer){
            return <Redirect to= "/"/>
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>
                    <div className="alert alert-danger" style={{display:this.state.error ? "" : "none"}}>{this.state.error}
                    {this.state.error}
                    </div>
                  {this.state.loading ? <div className="jumbotron text-center">
                    <h2>Loading</h2>
                  </div> : ""}
                {this.signinForm(this.state.email,this.state.password)}

                

            </div>
        )
    }
}
export default Signin;