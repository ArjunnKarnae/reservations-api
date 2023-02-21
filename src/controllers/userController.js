const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//Method for registering the new users
const registerUser = asyncHandler( async (req, res) => {
    
    const {username, email, password} = req.body;
     
    if(!username|| !email || !password) {
        res.status(400);
        throw new Error("All the details are mandatory");
    }
    const existingUser = await User.findOne({email});
    
    if(null !== existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }
    
    const newUser = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10)
    });
    
    await newUser.save();
    res.status(201).json(newUser);

});

//Method for validing the users during login and providing them with a JWT token that is valid for 5 mins
const loginUser = asyncHandler(async (req, res) => { 
    const { username, email, password } =  req.body;
    
    if(!username || !email) {
        res.status(400);
        throw new Error("All the details are mandatory");
    }
    const existingUser = await User.findOne({email});
     
    if(!existingUser) {
        res.status(404);
        throw new Error("User does not exist");
    }

    if(await bcrypt.compare(password, existingUser.password)) {
       const accessToken = jwt.sign(
        {
           username: existingUser.username,
           email: existingUser.email 
        }, 
        process.env.CLIENT_SECRET_KEY, 
        {expiresIn: "5m"});
        existingUser.accessToken = accessToken;
        await existingUser.save();
        res.status(200).json({"message": "login successful", "accessToken": accessToken});
    }else{
        res.status(400);
        throw new Error("User details are incorrect");
    }

});

module.exports = {registerUser, loginUser};