import React from "react";
import { Component } from "react";
import { isAuthenticated } from "../auth";
import { remove } from "./apiUser";
import { signout } from "../auth";
import { Redirect } from "react-router-dom";

class DeleteUser extends Component {
    state = {
        redirect: false
    }

    deteleConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete?")
        if(answer)this.deleteAccount();
    }


    deleteAccount = () => {
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId,token)
            .then(data => {
                if (data.error) {
                    console.log("erroRr")
                }
                else {
                    signout(() => {
                        console.log("user is deleted")
                    })
                    this.setState({ redirect: true })
                }
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <button onClick={this.deteleConfirmed} className="btn btn-raised btn-danger">Delete Profile</button>
        )
    }
}

export default DeleteUser