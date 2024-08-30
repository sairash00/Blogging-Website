
import User from '../models/user.model.js'
import { generateToken, decodeToken } from '../utils/tokenGenerator.js'
import { encrypt, compare } from '../utils/password.js'
import {uploadOnCloudinary, removeFromCloudinary} from '../utils/cloudinary.js'
import { isValidObjectId } from 'mongoose'


export const registerUser = async(req,res) => {
    try {


        const userInfo = req.body?.data
        if(!userInfo || !userInfo.username || !userInfo.password || !userInfo.email || !userInfo.fullName){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const isFound =await User.findOne({email: userInfo.email})

        if(isFound){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await encrypt(userInfo.password)
        userInfo.password = hashedPassword


        const user = await User.create(userInfo)

        if(!user){
             res.status(500).json({
                success: false,
                message: "Failed to register user"
            })
        }


        const data = {
            id: user._id,
            email: user.email
        }

        const token = generateToken(data)
        const options = {
            expiresIn: new Date(Date.now() +1000 * 60 * 60 * 12),
            secure: true,
            httpOnly: true
        }


        return res.status(200)
        .cookie("accessToken", token, options)
        .json({
            success: true,
            message: "User registered successfully",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

export const loginUser = async(req,res) => {
try {
    
        const data = req.body.data
    
        if(!data || !data.email || !data.password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
    
        const user = await User.findOne({email: data.email}).select('password email')
    
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
    
        const isMatch = await compare(data.password, user.password )
    
        if(!isMatch){
            return res.status(404).json({
                success: false,
                message: "Incorrect password"
            })
        }
    
        const values = {
            id: user._id,
            email: user.email
        }
        const option = {
            expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 12),
            httpOnly: true,
            secure: true,
        }
    
        const token = generateToken(values)
    
        res.status(200)
        .cookie("accessToken", token , option)
        .json({
            success: true,
            message: "User logged in successfully",
        })
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
}
}

export const logoutUser = async(req,res) => {
    try {
        res.status(200)
        .clearCookie("accessToken")
        .json({
            success: true,
            message: "User logged out successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const getUserProfile = async(req,res) => {
    try {
        
    const token = req.cookies?.accessToken
    const decodedToken = decodeToken(token)

    if(!decodedToken){
        return res.status(400).json({
            success: false,
            message: "Invalid Token"
        })
    }

    const user = await User.findById(decodedToken.id)
    .select('-password ')
    .populate('following', " username email avatar  ")
    .populate("followers", " username email avatar followers")
    .populate("posts", "title content images")
    .populate("comments", "content ")

    if(!user){
        res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "User successfully fetched",
        user
    })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getOtherUserProfile = async(req,res) => {
    try {

    const token = req.cookies?.accessToken
    let decodedToken
    if(token){
     decodedToken = decodeToken(token)
    }

    const id = req.body.id
    const user = await User.findById(id)
    .select('-password ')
    .populate('following', " username email avatar  ")
    .populate("followers", " username email avatar followers")
    .populate("posts", "title content images")

    if(!user){
        res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "User successfully fetched",
        id: decodedToken?.id || null,
        user
    })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteUser = async(req,res) => {

   try {
     const token = req.cookies?.accessToken
     const decodedToken = decodeToken(token)
 
     if(!decodedToken){
         return res.status(400).json({
             success: false,
             message: "Invalid Token"
         })
     }
 
     const user = await User.findById(decodedToken.id).select("avatar")

     if(!user){
         return res.status(404).json({
             success: false,
             message: "User not found"
         })
     }
 
     if(user.avatar && user.avatar !== process.env.DEFAULT_AVATAR){
        await removeFromCloudinary(user.avatar)
     }

     const deletedUser = await user.deleteOne()
 
     res.status(200)
     .clearCookie("accessToken")
     .json({
         success: true,
         message: "User deleted successfully",
         deletedUser
     })
   } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
   }

}

export const addLinks = async(req,res) => {
    try{

        const links = req.body
        if(!links || !links.platform || !links.link){
            return res.status(400).json({
                success: false,
                message: "Inappropriate request"
            })
        }

        const linkData = {
            platform: links.platform,
            link: links.link
        }

        const token = req.cookies?.accessToken
        const decodedToken = decodeToken(token)
        
        if(!decodedToken){
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }

        const user = await User.findById({_id: decodedToken.id}).select('links')
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
                user
            })
        }

        if(user.links.some(link => link.platform === links.platform)){
           return res.status(401).json({
                success: false,
                message: "Link already exists for this platform"
            })
        }

        user.links.push(linkData);
        await user.save();


        res.status(200).json({
            success: true,
            message: "Links added successfully",
            links: user.links
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateLinks = async(req,res) => {
   try {
     const data = req.body

    if(!data || !data.platform || !data.link){
        return res.status(400).json({
            success: false,
            message: "Inappropriate request"
        })
    }

     const linkData = {
         platform: data.platform,
         link : data.link
     }
 
     const token = req.cookies?.accessToken
     const decodedToken = decodeToken(token)
 
     if(!decodedToken){
         return res.status(400).json({
             success: false,
             message: "Invalid Token"
         })
     }
     
     const user = await User.findByIdAndUpdate({_id: decodedToken.id}).select("links")
 
     if(!user){
         return res.status(400).json({
             success: false,
             message: "User not found"
         })
     }
 
     const linkIndex = user.links.findIndex(link => link.platform === linkData.platform)
 
     if(linkIndex !== -1){
         user.links[linkIndex].link = linkData.link
     }
 
     await user.save()
 
     res.status(200).json({
         success: true,
         message: "Links updated successfully",
         links: user.links
     })
 
   } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
   }

}

export const deleteLinks = async(req,res) => {
    try {
        const data = req.body
        
        if(!data){
            return res.status(400).json({
                success:false,
                message: "Inappropriate request"
            })
        }
    
        const token = req.cookies?.accessToken
        const decodedToken = decodeToken(token)
    
        if(!decodedToken){
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }
    
        const user = await User.findById({_id : decodedToken.id}).select("links")
    
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
    
        const linkIndex = user.links.findIndex(link => link.platform === data.platform )
    
    
        if(linkIndex == -1 ){
            return res.status(401).json({
                success: false,
                message: "Link not found"
            })
        }
        
        user.links.splice(linkIndex, 1)
        await user.save()
    
        res.status(200).json({
            success: true,
            message: "Links deleted successfully",
            links: user.links
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const uploadAvatar = async (req,res) => {

    try {
        const file = req.file
    
        if(!file){
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            })
        }
    
        const filepath = file.path
    
        const token = req.cookies?.accessToken
        const decodedToken = decodeToken(token)
    
        if(!decodedToken){
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }

        const user = await User.findById(decodedToken.id).select('avatar')

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const response = await uploadOnCloudinary(filepath)
        if(!response){
            return res.status(500).json({
                success: false,
                message: "Failed to upload avatar"
            })
        }
        if(user.avatar && user.avatar !== process.env.DEFAULT_AVATAR){
             await removeFromCloudinary(user.avatar)
        }
        
        user.avatar = response.secure_url
        await user.save()

        res.status(200).json({
            success: true,
            message: "Avatar uploaded successfully",
            user,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const follow = async(req,res) => {
try {
    
        const token = req.cookies?.accessToken
        const decodedToken = decodeToken(token)
    
        if(!decodedToken){
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            }) 
        }
    
        const followedUser = req.body?.id
        if(!followedUser || !isValidObjectId(followedUser) || followedUser === decodedToken.id ){
           return res.status(401).json({
                success: false,
                message: "Id is required"
            })
        }
        const user = await User.findById(followedUser).select("followers username followersCount")

        if(user.followers.includes(decodedToken.id)){
            return res.status(400).json({
                success: false,
                message: "Already following"
            })
        }

        if((!user)){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    
        user.followersCount++;
        user.followers.push(decodedToken.id);
        await user.save();
    
        const currentUser = await User.findByIdAndUpdate(decodedToken.id, {
            $push: { following: followedUser },
            $inc: { followingCount: 1 }
        }, { new: true }).select("following followingCount")
    
        if(!currentUser){
            return res.status(500).json({
                success: false,
                message: "Failed to add follower"
            })
        }
    
        res.status(200).json({
            success: true,
            message: `Followed ${user.username}`,
            currentUser
    
        })
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
}
}

export const unfollow = async(req,res) => {
    try {
        const token = req.cookies?.accessToken
        const decodedToken = decodeToken(token)
    
        if(!decodedToken){
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }
    
        const unfollowedUser = req.body?.id
        if(!unfollowedUser || !isValidObjectId(unfollowedUser) || unfollowedUser === decodedToken.id ){
            return res.status(401).json({
                success: false,
                message: "Id is required"
            })
        }
    
        const self = await User.findByIdAndUpdate(decodedToken.id, {
            $pull: { following: unfollowedUser },
            $inc: { followingCount: -1 }
        }, { new: true }).select("following followingCount")
    
        if(!self){
            return res.status(500).json({
                success:false,
                message: "Failed to remove follower"
            })
        }

        const user = await User.findByIdAndUpdate(unfollowedUser,{
            $pull: {  followers: decodedToken.id },
            $inc: {followersCount: -1}
        },{new: true}).select("followers username followingCount")

        if(!user){
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }

        res.status(200).json({
            success: true,
            message: `Unfollowed ${user.username}`,
            user
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const isLoggedIn = async (req,res) => {
    const user = req.user
    res.status(200).json({
        success: true,
        loggedIn: true,
        message: "User is logged in",
        user
    })
} 