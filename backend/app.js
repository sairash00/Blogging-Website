// import routes
import userRoute from './src/routes/user.route.js'
import postRoute from './src/routes/post.route.js'

import cookieParser from 'cookie-parser'
import express, { urlencoded } from 'express'

// middleware
const app = express()
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

// routes configurations
app.use("/api/v1/users",userRoute)
app.use("/api/v1/post",postRoute)



// export app

export default app