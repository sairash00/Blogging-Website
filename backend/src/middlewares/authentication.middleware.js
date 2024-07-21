import { isValidObjectId } from "mongoose";
import User from "../models/user.model.js";
import { decodeToken} from "../utils/tokenGenerator.js";

const authenticate = async(req,res,next) => {
    try {
        const token = req.cookies?.accessToken
        if(!token){
          return res.status(401).json({
            success: false,
            loggedIn: false,
            message: "Unauthorized Access"
          })
        }
    
        const decodedToken = decodeToken(token);
    
        if(!decodedToken || !decodedToken.id || !isValidObjectId(decodedToken.id)){
           return res.status(200).json({
            success: false,
            loggedIn: false,
            message: "Invalid Token, Unauthorized Access"
           })
        }

        const user = await User.findById(decodedToken.id).select("email");
    
        if(!user){
            return res.status(401).json({
                success: false,
                loggedIn: false,
                message: "Unauthorized access"
            })
        }
        
       req.user = user
       next()

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default authenticate