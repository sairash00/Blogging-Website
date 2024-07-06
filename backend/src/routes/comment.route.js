import { 
    createComment,
    deleteComment,
    getComments

} from '../controllers/comment.controller.js';
import authenticate from '../middlewares/authentication.middleware.js';

// router setup
import express from 'express'
const router = express.Router();

// router routes
router.route("/createComment").post(authenticate,createComment)
router.route("/deleteComment").post(authenticate,deleteComment)
router.route("/getComment/:id").get(getComments)


export default router