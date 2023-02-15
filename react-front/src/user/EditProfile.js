import React from "react";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { read, readabout, updateaboutpp, updatep, updatePP } from "./apiUser";
import { update } from "./apiUser";
import { updateUser } from "./apiUser";

class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            password: "",
            email: "",
            about: "",
            redirectToProfile: false,
            isPhoto: false
        }
    }




    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token)
            .then(data => {
                if (data.error) { this.setState({ redirectToProfile: true }) }
                else {
                    this.setState({ id: data._id, name: data.name, email: data.email });
                }
            })
        readabout(userId, token)
            .then(data => {
                if (data.error) { this.setState({ redirectToProfile: true }) }
                else {
                    this.setState({ about:data.about });
                }
            })
    }

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    handleChange = name => event => {
        this.setState({ error: "" });
       //console.log(event.target.files[0])
       this.setState({ error: "" });
       let value;
       let fileSize=0;
       if(name==="photo")
       {
           value=event.target.files[0]
           fileSize=event.target.files[0].size
           this.setState({ isPhoto: true })
           //console.log(value)
       }
       else value=  event.target.value;
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize, });
    };

    clickSubmit = (event) => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name: name,
            email: email,
            password: password || undefined
        };
        const userId = this.props.match.params.userId
        const token = isAuthenticated().token
        if (this.state.isPhoto == false) {
            update(userId, token, this.userData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error })
                } else {
                   
                    updateUser(data,() => {
                        this.setState({ redirectToProfile: true })
                    })
                    
                }
            })
            updatePP(userId, token, this.userData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error })
                } else {
                    
                    this.setState({ redirectToProfile: true })
                }
            })
        }
        else {
            updatep(userId, token, this.userData)
                .then(data => {
                    if (data.error) this.setState({ error: data.error })
                    else {
                        console.log(data)
                        this.setState({
                            redirectToProfile: true
                        })
                        this.setState({ isPhoto: false , about:data.about})
                    }
                })
        }



    };

    signupForm = (name, email, password,about) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    defaultValue={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" defaultValue={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" defaultValue={password}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea onChange={this.handleChange("about")} type="password" className="form-control" defaultValue={about}></textarea>
            </div>

            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                Update
            </button>
        </form>
    )

    render() {
        if (this.state.redirectToProfile) {
            return <Redirect to={`/user/${this.state.id}`}></Redirect>
        }

        return (
            <div className="container">

                <h2 className="mt-5 mb-5">Edit Profile</h2>

                {this.signupForm(this.state.name, this.state.email, this.state.password,this.state.about)}
            </div>
        )
    }

}
export default EditProfile