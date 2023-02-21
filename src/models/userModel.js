const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "An account with given email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    accessToken: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
