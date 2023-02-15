import React, { useReducer } from "react";
import { Component } from "react";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import { read } from "./apiUser";
import { getLikes } from "../post/apiPost";
//<img height="30px" className="float-left mr-2" onError={i => (i.target.src = `${DefaultProfile}`)} src={`${process.end.REACT_APP_API_URL}/user/photo/${person._id}`} alt={person.name} />


class ProfileTabs extends Component {

    // const getUserName = (id) => {
    //     return fetch(`http://localhost:8080/user/${id}`, {
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //         },
    //     })
    //         .then(response => {
    //             return response.json()
    //         })
    //         .catch(err => console.log("error"))
    // }

    // const getName = (id) => {
    //     console.log("A")
    //         getUserName(id)
    //             .then(data => {
    //                 if (data.error) console.log("error")
    //                 else thing=data.name
    //                 console.log(thing)
    //             })

    // }

   

    render() {
        let v=[]
        let a=[]
        this.props.follower.following.map((person, i) => {
            this.props.user.map((elem)=>{
                if(elem._id==person)
                {
                    v[i]=elem.name
                }
                
            })
        })
        this.props.follower.followers.map((person, i) => {
            this.props.user.map((elem)=>{
                if(elem._id==person)
                {
                    a[i]=elem.name
                }
                
            })
        })
        
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-primary">Following</h3>
                        <hr />
                        {this.props.follower.following.map((person, i) => {
                            return (
                                <div key={i}>
                                    <div className="row">
                                        <div>

                                            <Link to={`/user/${person}`}>

                                                <div>
                                                <p className="lead">{v[i]}
                                                    </p>

                                                </div>
                                            </Link>
                                        </div>

                                    </div>
                                </div>)
                        })}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Followers</h3>
                        <hr />
                        {this.props.follower.followers.map((person, i) => {
                            return (
                                <div key={i}>
                                    <div className="row">
                                        <div>

                                            <Link to={`/user/${person}`}>

                                                <div>
                                                    <p className="lead">{a[i]}
                                                    </p>

                                                </div>
                                            </Link>
                                        </div>

                                    </div>
                                </div>)
                        })}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Posts</h3>
                        <hr />
                        {this.props.post.map((post, i) => {
                            return (
                                <div key={i} >
                                   
                                   <hr />
                                            <p className="card-title">{post.title}</p>
              
                                            <p className="card-text">{post.body}</p>

                                            <button className="card col-md-4">Likes: {getLikes(post._id)}0</button>
                                    <hr />
                                    
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileTabs