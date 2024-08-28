// import controllers
import {
     registerUser,
     loginUser,
     logoutUser,
     getUserProfile,
     deleteUser,
     addLinks,
     updateLinks,
     deleteLinks,
     uploadAvatar,
     follow,
     unfollow,
     isLoggedIn,
     getOtherUserProfile

 } from '../controllers/user.controller.js';

import upload from '../middlewares/multer.middleware.js'
import authenticate from '../middlewares/authentication.middleware.js'



// router setup
import express from 'express'
const router = express.Router();

// router routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(authenticate,logoutUser)
router.route("/getUser").get(getUserProfile)
router.route("/deleteUser").post(authenticate,deleteUser)
router.route("/addLinks").post(authenticate,addLinks)
router.route("/updateLinks").post(authenticate,updateLinks)
router.route("/deleteLinks").post(authenticate,deleteLinks)
router.route("/uploadAvatar").post(upload.single("avatar"),authenticate,uploadAvatar)
router.route("/follow").post(authenticate,follow)
router.route("/unfollow").post(authenticate,unfollow)
router.route("/isLoggedIn").get(authenticate,isLoggedIn)
router.route("/getOtherUser").post(getOtherUserProfile)


export default router