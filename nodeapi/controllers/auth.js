const User = require("../models/user");
const UserP = require("../models/aboutandpp");
const follows = require("../models/follow")
var { expressjwt: JWT } = require("express-jwt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.signup = async function(req,res){

    const userExists = await User.findOne({email:req.body.email})
    if(userExists) return res.status(403).json({
        error:"Email is taken"
    })
    const user =  await new User(req.body);
    const userp =  await new UserP(req.body);
    const follow = await new follows(req.body);
    await user.save();
    console.log(user);
    userp.UserId=user._id;
    follow.UserId=user._id;
    await userp.save();
    await follow.save();
    console.log(userp);

    res.status(200).json({
        message:"Signup success! Please login."
    });
};

exports.signin = function(req,res) {
    // find the user based on email
    const {email,password} = req.body;
    User.findOne({email}, function(err,user){
        //if err or no user
        if(err || !user){
            return res.status(401).json({error:"User with that email does not exist"});
        }
        //if user is found make sure the email and password match
        //create authenticate methon in model and use here
        if(!user.authenticate(password)){ return res.status(401).json({error:"email and password do not match"})};

 //generate a token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    // persist the token as "t" in cookie with expiry date
        res.cookie("t",token, {expire: new Date()+9999});
    // return response with user and token to frontend client

        const {_id, name, email} = user;
        return res.json({token,user:{_id,email,name}});
    });
};

exports.signout = (req,res) => {
    res.clearCookie("t");
    return res.json({message:"Signout success!!"});
};

exports.requireSignin = JWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth"
  });

