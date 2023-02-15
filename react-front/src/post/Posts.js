import React, { Component } from "react";
import { like, likeGet, list } from "./apiPost";
import DefaultPost from '../images/munti.jpg'
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class Posts extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            infoLikes:{}
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                this.setState({ posts: data });
            }
        })

    }

    clickLike(userId,posterId) {
        console.log(userId,posterId)
        like(userId,posterId)
    }
        
    
    
    renderPosts = posts => {


        let posterId;
        let posterName
        return (
            <div className="row">
                {posts.map((post, i) => {
                     posterId=post.postedBy ? post.postedBy._id : "";
                     posterName=post.postedBy ? post.postedBy.name : " Unknown";
                     return (
                        <div className="card col-md-4" key={i}>
                         <div className="card-body">
                            <img src = {`http://localhost:8080/post/photo/${post._id}`} alt= {post.title} onError={i=> i.target.src=`${DefaultPost}`} className="img-thunbnail mb-3" style={{height:'200px',width:'auto'}}></img>
                             <h5 className="card-title">{post.title}</h5>
                             <p className="card-text">{post.body.substring(0,100)}</p>
                             <button /*(onClick={this.clickLike(posterName,post._id)}*/ className="btn btn-raised btn-info mb-4">Like</button>
                             <br></br>
                             <p className="font-italic mark">Posted By <Link to={`/user/${posterId}`} >{posterName}</Link></p>
                         </div>
                         
                     </div>
                     )
                }
                   
                )}
            </div>
        );
    }


    render() {
        const { posts } = this.state;

        return (
            <div className="container">

                <h2 className="mt-5 mb-5">Recent Posts</h2>
                {this.renderPosts(posts)}
            </div>
        )
    }
}

export default Posts