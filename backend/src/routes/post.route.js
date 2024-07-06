// import controllers
import {
    createPost,
    deletePost,
    followerPost,
    followingPost,
    getAllPost,
    getPostDetail,
    like,
    unlike
} from '../controllers/post.controller.js'
import authenticate from '../middlewares/authentication.middleware.js';
import upload from '../middlewares/multer.middleware.js'



// router setup
import express from 'express'
const router = express.Router();

// router routes
router.route("/createPost").post(upload.single("image"),authenticate,createPost)
router.route("/deletePost").post(authenticate, deletePost)
router.route("/getPostDetail/:id").get(getPostDetail)
router.route("/like").post(authenticate, like)
router.route("/unlike").post(authenticate, unlike)
router.route("/getAllPost").get(getAllPost)
router.route("/followingPost").get(followingPost)
router.route("/followerPost").get(followerPost)


export default router