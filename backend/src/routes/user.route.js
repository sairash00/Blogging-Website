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
     unfollow

 } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.middleware.js'



// router setup
import express from 'express'
const router = express.Router();

// router routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/getUser").get(getUserProfile)
router.route("/deleteUser").post(deleteUser)
router.route("/addLinks").post(addLinks)
router.route("/updateLinks").post(updateLinks)
router.route("/deleteLinks").post(deleteLinks)
router.route("/uploadAvatar").post(upload.single("avatar"),uploadAvatar)
router.route("/follow").post(follow)
router.route("/unfollow").post(unfollow)


export default router