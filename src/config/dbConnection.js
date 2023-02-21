const mongoose = require("mongoose");
const env = require("dotenv");

//Used for connecting to MongoDB
const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.DB_CONNECT_URL);
    }catch(err){
        process.exit(1);
    }
};

module.exports = connectDB;