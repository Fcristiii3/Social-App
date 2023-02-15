const express  = require("express");
const postController = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validator");

const router = express.Router();


router.get("/posts", postController.getPosts);
router.post("/post/new/:userId",requireSignin , postController.createPost,createPostValidator);
router.get("/posts/by/:userId", requireSignin,postController.postsByUser);
router.get("/post/photo/:postId",postController.photo)
router.delete('/post/:postId',requireSignin, postController.isPoster, postController.deletePost);
router.put('/post/:postId',requireSignin, postController.isPoster, postController.updatePost);

router.put("/post/like",postController.postlikeId)
router.get("/post/like",requireSignin,postController.postlike)

router.put("/post/unlike/:PostById",requireSignin)

// any route containing :userId, our app will first execute userByIt method
router.param("userId", userById);
// any route containing :postId, our app will first execute userByIt method
router.param("postId", postController.postById);

module.exports = router; 
