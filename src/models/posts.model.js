import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,

    },
    createdBy :{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    date :{
        type :Date,
        required:true
    }
},{
    timestamps:true
})

export const Posts = mongoose.model("Posts",postsSchema);