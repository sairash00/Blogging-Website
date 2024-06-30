// import controllers
import {
    createPost,
    deletePost,
    getAllPost,
    getPostDetail,
    like,
    unlike
} from '../controllers/post.controller.js'
import upload from '../middlewares/multer.middleware.js'



// router setup
import express from 'express'
const router = express.Router();

// router routes
router.route("/createPost").post(upload.single("image"),createPost)
router.route("/deletePost").post(deletePost)
router.route("/getPostDetail/:id").get(getPostDetail)
router.route("/like").post(like)
router.route("/unlike").post(unlike)
router.route("/getAllPost").get(getAllPost)


export default router