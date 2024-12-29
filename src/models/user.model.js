import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,

    },
    username:{
        type:String,
        required:true,
        unique:true,
        index : true,

    },
    email :{
        type:String,
        required:true,
        unique:true,
        
    },
    avatar :{
        type :String //cloudinary

    },
    password :{
        type :String,
        required : [true,"Password is required"]
    }
},{
    timestamps:true
})



userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.IsPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User",userSchema);