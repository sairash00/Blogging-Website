import dotenv from'dotenv'
dotenv.config()

import app from "./app.js"
import connectDB from './src/database/index.js'

// Connect to MongoDB

connectDB()



app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`)
})