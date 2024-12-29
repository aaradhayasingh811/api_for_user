// get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

import mongoose from "mongoose";
import {User} from '../models/user.model.js'
import { ApiError } from "../utils/ApiError.js";
import {uploadCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerController = async(req,res) =>{
    const {name, email, password , username} = req.body;
    if (
        [name, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400,"Some credintials not filled");
    }
    const existingUser = await User.findOne({ $or: [ { username }, { email }] });
    if(existingUser){
       throw new ApiError(409,"User already exist");
    }
    const avatarPath = req.files?.avatar[0]?.path;

    const cloudPath = await uploadCloudinary(avatarPath);
    if (!cloudPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const user = User.create({name,password,email, username: username.toLowerCase(),avatar :cloudPath});

    const response = User.findById(user._id).select("-password");

    if(!user){
        throw new ApiError(500,"User not created");
    }

    return res.status(201).json(
        new ApiResponse(200, user, "User registered Successfully")
    )

    
}

export {registerController}