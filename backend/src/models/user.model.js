import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followersCount:{
        type: Number,
        default:0,
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followingCount:{
        type: Number,
        default:0,
    },
    following:[{    
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png"
    },
    favourites:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    links:[{
        platform:{
            type: String,
        },
        link:{
            type:String
        }
    }]

},{timestamps:true})

 const User = mongoose.model('User', userSchema)
 export default User