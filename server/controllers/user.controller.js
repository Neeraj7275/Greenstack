import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const register = async(req,res,next)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:"incomplete credential"})
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
             return res.json({success:false,message:"user allready exist"})
        }

        const hashPassword = await bcrypt.hash(password,10);
        const user = await userModel.create({
            name,
            email,
            password:hashPassword
        })

        const token = jwt.sign({id:user._id},process.env.JWTSECRET,{expiresIn:"7d"})
        res.cookie("token",token,{
                httpOnly:true,
                secure:process.env.NODE_env === 'production',
                sameSite:process.env.NODE_env === 'production' ? 'none': 'strict',
                maxAge: 7*24*60*60*1000
            })
        return res.json({success:true,user});
        
    } catch (error) {
      res.json({success:false,message:error.message})  
    }
}

export const login = async(req,res,next)=>{
try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.json({success:false,message:"incomplete credential"})
        }
    
        const user =await userModel.findOne({email});
    
        if(!user){
             return res.json({success:false,message:"user does not exist"})
        }
    
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
             return res.json({success:false,message:"invalid password"})
        }
    
         const token = jwt.sign({id:user._id},process.env.JWTSECRET,{expiresIn:"7d"})
            res.cookie("token",token,{
                httpOnly:true,
                secure:process.env.NODE_env === 'production',
                sameSite:process.env.NODE_env === 'production' ? 'none': 'strict',
                maxAge: 7*24*60*60*1000
            })
            return res.json({success:true,user});
} catch (error) {
    res.json({success:false,message:error.message}) 
}  
}


export const isAuth = async(req,res)=>{
   try {
     const user = await userModel.findById(req.user.id).select("-password");
     
     return res.json({success:true,user});
   } catch (error) {
    return res.json({success:false,message:error.message});
   }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("token",
            {httpOnly:true,
            secure:process.env.NODE_env === 'production',
            sameSite:process.env.NODE_env === 'production' ? 'none': 'strict',
            })

            return res.json({success:true,message:"logged out"});
    } catch (error) {
         return res.json({success:false,message:error.message});
    }
}