import React from "react";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";

class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            title:"",
            body:"",
            photo:"",
            error:"",
            fileSize:0,
            redirectToProfile:false,
            user:{}

        }
    }






    componentDidMount() {
        this.postData = new FormData();
        this.setState({user:isAuthenticated().user})
    }
    
    handleChange = name => event => {
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

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize, });
    };

    clickSubmit = (event) => {
        event.preventDefault();


        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        //console.log(this.postData)
            create(userId, token, this.postData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error })
                } else {
                    console.log("New post:",data)
                    this.setState({title:'',body:'',photo:'',redirectToProfile:true})
                    
                }
            })

        

    };

    newPostForm = (title,body) => (
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
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    defaultValue={title}
                />
            </div>


            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea onChange={this.handleChange("body")} type="password" className="form-control" defaultValue={body}></textarea>
            </div>

            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                Create Post
            </button>
        </form>
    )

    render() {
        if (this.state.redirectToProfile) {
            console.log(this.state.user)
            console.log("AAAAAAAAA")
            return <Redirect to={`/user/${this.state.user._id}`}></Redirect>
        }

        return (
            <div className="container">

                <h2 className="mt-5 mb-5">Create a new post</h2>

                {this.newPostForm(this.state.title, this.state.body)}
            </div>
        )
    }

}
export default NewPost