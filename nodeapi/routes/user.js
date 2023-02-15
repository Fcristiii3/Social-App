const express  = require("express");
const {userById,userByIdP, allUsers, getUser,updateUser, deleteUser, updateUserP, getUserP, allUsersP, updateUserPP, userPhoto, followById, getUserFollower, userByIdPP} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const {addFollower,addFollowing,removeFollower,removeFollowing} = require("../controllers/user")

const router = express.Router();


router.get("/users", allUsers);
router.get("/usersp", allUsersP);
router.get("/user/:userId", getUser);

router.put("/user/:userId", requireSignin, updateUserPP); ///
router.put("/user/aboutpp/:userIdP", updateUserPP);
//router.put("/user/aboutpp/:userIdP", updateUserPP);
router.get("/user/about/:userIdP", userPhoto);
router.get("/user/aboutp/:userIdP", getUserP);

router.delete("/user/:userId", requireSignin, deleteUser);


router.put("/userss/follow",requireSignin,addFollowing,addFollower)
router.put("/userss/unfollow",requireSignin,removeFollowing,removeFollower)
router.get("/userss/follow/:userByIdPP", requireSignin, getUserFollower);



// any route containing :userId, our app will first execute userById method

router.param("userByIdPP",userByIdPP);
router.param("userIdP", userByIdP);
router.param("userId", userById);


module.exports = router; 
