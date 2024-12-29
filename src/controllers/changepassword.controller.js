import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"



const changePassword = async(req,res) =>{
const {username, oldPassword, newPassword} = req.body;
    if (!username || !oldPassword || !newPassword) {
        res.status(400).json({message: "All fields are required"});
    }
    const user = await User.findOne( {username});
    console.log(username);
    const isPasswordCorrect = await user.IsPasswordCorrect(oldPassword);
    // const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
        res.json({status :200, message:"Old password is incorrect"}) ;
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
}

export {changePassword};