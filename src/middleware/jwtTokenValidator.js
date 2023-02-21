const express = require("express");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");

//Method for validating the token passed in the header
const validateJwtToken = asyncHandler( async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401);
        throw new Error("Access token is missing");
    }
    const token = authHeader.split(" ")[1]; 
    const user = await User.findOne({accessToken: token});
    
    if(!user) {
        res.status(401);
        throw new Error("Invalid token");
    }
    
    jwt.verify(token, process.env.CLIENT_SECRET_KEY, {expiresIn: "5m"}, (err, decoded) => {
        if(err) {
            res.status(403);
            throw new Error("User is not authorized");
        }   
        req = decoded;
        next();
    });
    
});

module.exports = validateJwtToken;
