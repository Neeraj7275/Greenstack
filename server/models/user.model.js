import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartItems:{
        type:Object,
        default:{}
    }
},{timestamps:true, minimize: false}) // Add minimize: false here

const User = mongoose.model("User",userSchema);
export default User