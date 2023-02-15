const formidable = require("formidable");
const fs = require("fs");
const Post = require("../models/post");
const _ = require("lodash");
const Like = require("../models/likes");

const getPosts = function (req, res) {
    const posts = Post.find()
    .populate("postedBy","_id name",)
    .select("_id body title")
    .then(function (posts){
        res.json(posts);
    })
    .catch(function(error){console.log("EROOR")})
};
const postById = (req,res,next,id)=>{
    Post.findById(id)
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(400).json({
                error:err
            });
        }
        req.post=post;
        next();
    });
};

const postlikeId = (req,res,next)=>{

    Like.findOneAndUpdate({PostId:req.body.postId},{$push:{Value:"1"}},{$push:{UserId:req.body.userId}})
    .exec((err,result)=>{
        if(err)return res.status(400).json({error:err})
        else {
            res.json(result)
        }
    })
}

const postlike = (req,res,next)=>{
    console.log("AAAAAAAAAAAAAAAAAA");
    Like.findOne({PostId:req.body.id})
    .exec((err,posts) => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(posts);
    })
}
//unlike with $pull

createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log("FORM PARSE ERROR", err);
  
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }
  
      //console.log("FORM FIELDS FILES", fields, files);
  
      let post = new Post(fields);
  
      req.profile.hashed_password = undefined;
      req.profile.salt = undefined;
      post.postedBy = req.profile;
  
      if (files.photo) {
        post.photo.data = fs.readFileSync(files.photo.filepath);
        post.photo.contentType = files.photo.type;
      }
      post.save((err, result) => {
        if (err) {
          return res.status(400).json({
            //error: "Could not create post",
          });
        }
        res.json(result);
      });
      const likes  =   new Like(req.body);
      likes.PostId=post._id
      likes.save()
    });
  };

const postsByUser = (req,res)=>{

    Post.find({postedBy:req.profile._id})
    .populate("postedBy","_id name")
    .sort("_created")
    .exec((err,posts) => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(posts);
    })

}
const isPoster = (req,res,next)=>{
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if(!isPoster){
        
        return res.status(403).json({
            error:"User is not authorised"
        })
    }
    next();
};

const updatePost = (req,res,next)=>{
    let post= req.post;
    post = _.extend(post,req.body)
    post.updated = Date.now();
    post.save(err => {
        if(err)return res.status(400).json({error:err})
    })
    res.json(post);
}

const deletePost = (req,res)=>{
let post = req.post;
post.remove((err,post)=>{
    if(err)return res.status(400).json({
        error:err
    })
    res.json({
        message:"post deleted successfully"
    })
});
}

const photo = (req,res,next) =>{
    res.set("Content-Type",req.post.photo.contentType);

    return res.send(req.post.photo.data);
}

module.exports = {
    getPosts,
    postsByUser,
    createPost,
    postlike,
    photo,
    postById,
    isPoster,
    updatePost,
    deletePost,
    postlikeId
}

/*
63b3064a316d920dd063e34c
63b3064a316d920dd063e34c
63b3064a316d920dd063e34c
*/