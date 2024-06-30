import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connect(process.env.DB_URL).then((connection) => {
        console.log(`mongodb connection successful : ${connection.connection.host}`)
    }).catch((error) => {
        console.log(`Error occured while connecting to MongoDB: ${error.message}`)
    })
}

export default connectDB;