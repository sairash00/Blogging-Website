import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import {Comment} from '../models/comment.model.js'
import {decodeToken} from '../utils/tokenGenerator.js'
import { isValidObjectId } from 'mongoose'

export const createComment = async(req,res) => {
    try {
        
        const token = req.cookies?.accessToken
        const decodedToken = decodeToken(token);

        const {content, postId}= req.body

        if(!content ||!postId ||!isValidObjectId(postId)){
            return res.status(400).json({
                success: false,
                message: 'comment and post Id are required'
            })
        }

        const data = {
            content,
            user: decodedToken.id
        }

        const comment = await Comment.create(data);
        if(!comment){
            return res.status(500).json({
                success: false,
                message: 'Failed to add comment'
            })
        }

        const updatedPost = await Post.findByIdAndUpdate(postId,{
            $push: {comments: comment._id}
        },{new: true}).select("comments")

        if(!updatedPost){
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(decodedToken.id,{
            $push: {comments: comment._id}
        },{new: true}).select("comments")

        if(!updatedUser){
            return res.status(500).json({
                success: false,
                message: "something went wrong"
            })
        }

        res.status(200).json({
            success: true,
            message: "Comment Added Successfully",
            comment,
            updatedPost,
            updatedUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteComment = async(req,res) => {
    try {
        const token = req.cookies?.accessToken
        const decodedToken = decodeToken(token);
    
        const {commentId, postId} = req.body
    
        if(!commentId ||!postId ||!isValidObjectId(postId) || !isValidObjectId(commentId)){
            return res.status(400).json({
                success: false,
                message: 'comment and post Id are required'
            })
        }
    
        const deletedComment = await Comment.findByIdAndDelete(commentId)
    
        if(!deletedComment){
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            })
        }
    
        const updatedPost = await Post.findByIdAndUpdate(postId,{
            $pull: {comments: commentId}
        },{new: true}).select("comments")
    
        if(!updatedPost){
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }
    
        const updatedUser = await User.findByIdAndUpdate(decodedToken.id,{
            $pull: {comments: commentId}
        },{new:true}).select("comments")
    
        if(!updatedUser){
            return res.status(500).json({
                success: false,
                message: "something went wrong"
            })
        }
    
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            updatedPost,
            updatedUser
        })

    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
}
}

export const getComments = async(req,res) => {
    try {
        const postId = req.params.id
    
        if(!isValidObjectId(postId)){
            return res.status(400).json({
                success: false,
                message: 'Invalid post Id'
            })
        }
        const comments = await Post.findById(postId).select("comments").populate({
            path: "comments",
            populate:{
                path: "user",
                select: "username avatar links comments",
                populate:{
                    path: "comments"
                }
            }
        })
    
        if(!comments){
            return res.status(404).json({
                success: false,
                message: "No comments"
            })
        }
    
        res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
}
}