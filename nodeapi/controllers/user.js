const _ = require("lodash");
const User = require("../models/user");
const UserP = require("../models/aboutandpp");
const formidable = require("formidable");
const fs = require("fs");
const user = require("../models/user");
const follows = require("../models/follow");
const { result } = require("lodash");

exports.userById = (req, res, next, id) => {
    //console.log("basic")
    User.findById(id).exec(function (err, user) {

        if (err || !user) {
            return res.status(400).json({ error: "User not found)" })
        }
        req.profile = user // adds profile obj in req with user info
        next()

    })
};

exports.userByIdP = (req, res, next, id) => {
    //console.log("BIGP")
    UserP.findOne({ UserId: id })
        .populate("UserId", "_id ")
        .exec((err, Userp) => {
            if (err || !Userp) {
                return res.status(400).json({
                    error: err
                });
            }

            req.profile = Userp;
            //console.log(Userp)
            next();
        });
};
exports.userByIdPP = (req, res, next, id) => {
    //console.log("BIGPPPP")
    follows.findOne({ UserId: id })
        .exec((err, fol) => {
            if (err || !fol) {
                return res.status(400).json({
                    error: err
                });
            }

            req.profile = fol;
            next();
        });
};




exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if (!authorized) {
        return res.json({
            error: "User is not autherized to perform this action"
        });
    }
};

exports.allUsers = function (req, res) {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        res.json(users)
    }).select("name email updated created")

};

exports.allUsersP = function (req, res) {
    UserP.find((err, users) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        res.json(users)
    }).select("about UserId")

};

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {

    let user = req.profile;

    user = _.extend(user, req.body); //extend - mutate the source object
    user.updated = Date.now();
    user.save((err) => {
        if (err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            });
        };

        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({ user: user })
    });
};

exports.updateUserP = (req, res, next) => {
    //console.log("A");

    let userp = req.profile
    userp = _.extend(userp, req.body); //extend - mutate the source object
    userp.save((err) => {

        res.json(userp)
    });
};

exports.updateUserPP = (req, res, next) => {
    let form = new formidable.IncomingForm();
     //console.log("incoming form data: ", form);
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save user
        let user = req.profile;
        // console.log("user in update: ", user);
        user = _.extend(user, fields);

        user.updated = Date.now();
        // console.log("USER FORM DATA UPDATE: ", user);

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.filepath);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            // console.log("user after update with formdata: ", user);
            res.json(user);
        });
    });
};

exports.userPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType)
        //console.log(req)
        //console.log("aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aa")
        return res.send(req.profile.photo.data)
    }
    next();
}

exports.getUserP = (req, res) => {
    return res.json(req.profile);
};


exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) return res.status(400).json({ err: err });
        res.json({ message: "User deleted succesfully" })
    })

}


exports.followById = (req,res,next,id)=>{
    follows.findById(id)
    .populate("UserId","_id name")
    .populate("following","_id name")
    .populate("followers","_id name")
    .exec((err,follow)=>{
        if(err || !follow){
            return res.status(400).json({
                error:err
            });
        }
        req.follow=follow;
        next();
    });
};

exports.addFollowing = (req,res,next)=>{
    follows.findOneAndUpdate({UserId:req.body.userId},{$push:{following:req.body.followId}},(err,result)=>{
        //console.log(follows.findById({UserId:req.body.userId}))
        
        if(err){
  
            return res.status(400).json({error:err})
        }
        //console.log(result);
        
        next();
    })
}

exports.addFollower = (req,res)=>{
    follows.findOneAndUpdate({UserId:req.body.followId},{$push:{followers:req.body.userId}},{new:true}
    )
    .populate("following","_id name")
    .populate("followers","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.json(result)
    })
    
}

exports.removeFollowing = (req,res,next)=>{
    follows.findOneAndUpdate({UserId:req.body.userId},{$pull:{following:req.body.unfollowId}},(err,res)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        
        next();
    })
}

exports.removeFollower = (req,res)=>{
    follows.findOneAndUpdate({UserId:req.body.unfollowId},{$pull:{followers:req.body.userId}},{new:true}
    )
    .populate('following','_id name')
    .populate('followers','_id name')
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.json(result);
    })
    
    
}

exports.getUserFollower = (req, res) => {
    //console.log(req.profile)
    return res.json(req.profile);
};