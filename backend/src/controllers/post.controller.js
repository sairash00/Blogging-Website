import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import {decodeToken} from '../utils/tokenGenerator.js'
import {removeFromCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js'
import fs from 'fs'
import { isValidObjectId } from 'mongoose'

export const createPost = async (req,res) => {

  try {
      const token = req.cookies?.accessToken
      const decodedToken = decodeToken(token)
    
      const data = req.body
      const image = req.file


      if(!data || !data.title || !data.content){
          fs.unlinkSync(image.path)
          return res.status(400).json({
              success: false,
              message: 'all fields are required'
          })
      }
  
      const user = await User.findById(decodedToken.id).select('username posts');
      if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
      }
        let response;
        if (image?.path) {
            response = await uploadOnCloudinary(image.path)
            if(!response){
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong, Try again later"
                })
            }
        }  
  
      const postInfo = {
          title: data.title,
          content: data.content,
          author: user._id,
      }
      
      const post = await Post.create(postInfo);
      if(!post){
          return res.status(500).json({
              success: false,
              message: 'Something went wrong, Try again later'
          })
      }

      if (response?.secure_url) {
        post.images.push(response.secure_url);
        await post.save()
      }


      user.posts.push(post._id);
      await user.save()
      
      res.status(200).json({
          success: true,
          user,
          post,
          message: 'Posted successfully'
      })
  
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
  }
}
export const deletePost = async(req,res) => {
try {
        const token = req.cookies?.accessToken
        const decodedToken = decodeToken(token)
    
        const postId = req.body.id
    
        if(!postId || !isValidObjectId(postId)){
            return res.status(400).json({
                success: false,
                message: 'Id is required'
            })
        }
    
        const deletedPost = await Post.findById(postId).select("images");
        await deletedPost.deleteOne()
        
    
        if(!deletedPost){
            return res.status(500).json({
                success: false,
                message: "Couldn't delete post"
            })
        }

        await removeFromCloudinary(deletedPost.images)
    
        const user = await User.findByIdAndUpdate(decodedToken.id,{
            $pull : {posts : postId}
        }).select('posts')


    
        if(!user){
            return res.status(500).json({
                success: false,
                message: "something went wrong"
            })
        }
    
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            user
        })
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
}

}

export const getPostDetail = async(req,res) => {
    try {
        const postId = req.params.id
        if(!postId ||!isValidObjectId(postId)){
            return res.status(400).json({
                success: false,
                message: 'Id is required'
            })
        }
        const post = await Post.findById(postId)
        .populate("author","avatar username email links ")
        .populate({
            path : "comments",
            populate: {
                path: "user",
                select: "username avatar"
            }
        })
        // .populate("likes")

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const like = async (req,res) => {
    try {
        const postId = req.body.id
        if(!postId || !isValidObjectId(postId)){
            return res.status(400).json({
                success: false,
                message: 'Id is required'
            })
        }
        
        const post = await Post.findByIdAndUpdate(postId,{
            $inc: {likes: 1}
        },{new:true})

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        res.status(200).json({
            success: true,
            post
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const unlike = async (req,res) => {
    try {
        const postId = req.body.id
        if(!postId || !isValidObjectId(postId)){
            return res.status(400).json({
                success: false,
                message: 'Id is required'
            })
        }
        
        const post = await Post.findByIdAndUpdate(postId,{
            $inc: {likes: -1}
        },{new:true})

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        res.status(200).json({
            success: true,
            post
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllPost = async(req,res) => {
    try {
        
        const posts = await Post.find()
        .populate("author","username avatar links ")


        if(!posts){
            return res.status(404).json({
                success: false,
                message: "No posts found"
            })
        }

        posts.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json({
            success: true,
            posts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const followingPost = async(req,res) => {
    try {
        
                const token = req.cookies?.accessToken
                const decodedToken = decodeToken(token)
        
                const user = await User.findById(decodedToken.id).select("following").populate({
                    path: "following",
                    populate:{
                        path: "posts",
                        model: "Post",
                        
                        populate:{
                            path: "author",
                            select: "username avatar links"
                        }
                    }
                })
        
        
                if(!user){
                    return res.status(400).json({
                        success: false,
                        message: "User not found"
                    })
                }
        
                const posts = user.following.flatMap(following => following.posts.map(post => ({
                    _id: post._id,
                    title: post.title,
                    content: post.content,
                    author: post.author,
                    likes: post.likes,
                    createdAt: post.createdAt
                })));
        
                posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
                res.status(200).json({
                    success: true,
                    message: "Post fetched successfully",
                    posts
                })
            
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const followerPost = async(req,res) => {
    try {
        
                const token = req.cookies?.accessToken
                const decodedToken = decodeToken(token)
        
                const user = await User.findById(decodedToken.id).select("followers").populate({
                    path: "followers",
                    populate:{
                        path: "posts",
                        model: "Post",
                        
                        populate:{
                            path: "author",
                            select: "username avatar links"
                        }
                    }
                })
        
        
                if(!user){
                    return res.status(400).json({
                        success: false,
                        message: "User not found"
                    })
                }
        
                const posts = user.followers.flatMap(follower => follower.posts.map(post => ({
                    _id: post._id,
                    title: post.title,
                    content: post.content,
                    author: post.author,
                    likes: post.likes,
                    createdAt: post.createdAt
                })));
        
                posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
                res.status(200).json({
                    success: true,
                    message: "Post fetched successfully",
                    posts
                })
            
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}