const express  = require("express");
const authController = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {userSignupValidator} = require("../validator");
const { route } = require("./post");

const router = express.Router();

router.post("/signup",userSignupValidator, authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", authController.signout);

// any route containing :userId, our app will first execute userByIt method
router.param("userId", userById);

module.exports = router; 
