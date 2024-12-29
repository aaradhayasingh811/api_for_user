import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const updateProfileDetails = async (req, res) => {
    try {
        const { username, name, email } = req.body;

        // Validate required fields
        if (!username || !name || !email) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Credentials wrong!! User not found" });
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    name,
                    email,
                    username,
                },
            },
            { new: true } // Return the updated document
        );

        // Respond with success and updated user data
        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export { updateProfileDetails };
