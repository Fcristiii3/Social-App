import React, { useDeferredValue } from "react";
import { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { read, readabout, readAllUsers, readfollow } from "./apiUser";
import { Link } from "react-router-dom";
import DefaultProfile from '../images/avatar.jpg'
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "../post/apiPost";

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user:"",
            userfoll: {following:[], followers:[], user:""},
            about: "",
            users:"",
            redirectToSignin: false,
            following: false,
            posts:[]
        }
    }


    loadPosts = userId =>{
        const token = isAuthenticated().token;
        listByUser(userId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else
            {
                
                this.setState({posts:data})
            }
        })
    }

    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token)
            .then(data => {
                if (data.error) { this.setState({ redirectToSignin: true }) }
                else {
                    this.setState({ user: data });
                    this.loadPosts(data._id)
                }

            })
            readabout(userId, token)
            .then(data => {

                if (data.error) { this.setState({ redirectToSignin: true }) }
                else {
                    
                    this.setState({ about: data.about });
                }

            })
        readfollow(userId, token)
            .then(data => {
                if (data.error) { this.setState({ redirectToSignin: true }) }
                else {
                    console.log(data)
                    let following = this.checkFollow(data)
                    this.setState({ userfoll:data,following });
                }

            })
            readAllUsers(userId, token)
            .then(data => {
                if (data.error) { this.setState({ redirectToSignin: true }) }
                else {
                    this.setState({ users:data });
                }

            })
    }

    checkFollow = user => {
        const jwt = isAuthenticated()
        let match=0;
        let i=0;
        for(i=0;i<=7 && match==0;i++)
        {
            if(user.followers[i]==jwt.user._id)match=1;
        }

        return match
    }

    clickFollowButton = (callApi) =>{
        const userId = isAuthenticated().user._id;
        const name=isAuthenticated().user.name;
        const token = isAuthenticated().token;
        callApi(userId,token,this.state.user._id,name)
        .then(data =>{
            if(data.error) {
                this.setState({error:data.error})
            }
            else this.setState({following:!this.state.following})
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId);
    }


    componentWillReceiveProps(props) {
        const userId = props.match.params.userId
        this.init(userId);

    }

    render() {
        const redirectToSignin = this.state.redirectToSignin
        if (redirectToSignin) return <Redirect to="/signin"></Redirect>
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">

                    <div className="col-md-6">

                        <img
                            style={{ height: "300px", width: "auto" }}
                            className="img-thumbnail"
                            
                             src={`http://localhost:8080/user/about/${this.state.user._id}`}///make another api call
                            
                            alt={this.state.user.name}  
                            onError={i=> i.target.src=`${DefaultProfile}`}
                        />
                        <br></br>
                        <br></br>
                        
                       <div className="col-md-4">
                        <h3 className="text-primary">About me:</h3>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="lead mt-2">
                            <p>Hello {this.state.user.name}</p>
                            <p>Email: {this.state.user.email}</p>
                            <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>

                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id == this.state.user._id ? (
                            <div className="d-inline-block ">
                                 <Link className="btn btn-raised btn-info mr-5" to={`/post/create`}>Create post</Link>
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${this.state.user._id}`}>Edit Profile</Link>
                                <DeleteUser userId={this.state.user._id}></DeleteUser>
                            </div>
                        ) : <FollowProfileButton following= {this.state.following} onButtonClick={this.clickFollowButton}></FollowProfileButton>}

                       
                    </div>

                </div>
                <div className="row">
                    <div className="col md-12  mb-5">
                        <hr />
                        {this.state.about}
                        <hr />
                        <ProfileTabs follower={this.state.userfoll} user={this.state.users} post={this.state.posts}/>
                    </div>

                </div>

            </div>
        );
    }
}

export default Profile;