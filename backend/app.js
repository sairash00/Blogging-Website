// import routes
import userRoute from './src/routes/user.route.js'
import postRoute from './src/routes/post.route.js'
import commentRoute from './src/routes/comment.route.js'

import cookieParser from 'cookie-parser'
import express, { urlencoded } from 'express'
import cors from 'cors'

const app = express()

// middleware
app.use(cors({
    origin: "https://blogging-website-frontend-swart.vercel.app",
    credentials: true,
    methods: ["GET", "POST"],
}))
app.use(express.json({limit:"10mb"}))
app.use(urlencoded({limit: "10mb" , extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

// routes configurations
app.use("/api/v1/users",userRoute)
app.use("/api/v1/post",postRoute)
app.use("/api/v1/comment",commentRoute)



// export app

export default app