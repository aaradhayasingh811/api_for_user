import mongoose from "mongoose";
import { User } from "../models/user.model.js";



const setAvatar = async (req,res)=>{
    const {id} = req.params;
    const avatarPath = req.files?.path;
    const cloudPath = await uploadCloudinary(avatarPath);
    const updatedUser = await User.findByIdAndUpdate(
        {_id :id},
        {
            $set:{
                avatar: cloudPath
            }
        },
        {new: true}
    ).select("-password")
    return res.status(200).json({
        message: "Profile picture updated successfully",
        user: updatedUser,
    });

}

export {setAvatar};