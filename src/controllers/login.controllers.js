import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"

const loginController = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist. Please create an account!" });
        }

        console.log(user);

        // Check if the password is correct
        const isPasswordCorrect = await user.IsPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Find the user without the password field
        const responseUser = await User.findById(user._id).select("-password");

        // You can return user data or a token (e.g., JWT) here
        return res.status(200).json({ message: "Logged in successfully", user: responseUser });
    } catch (error) {
        // Pass errors to the error handler middleware
        next(error);
    }
};




export {loginController}