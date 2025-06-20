import jwt from "jsonwebtoken";
const sellerLogin = async (req,res,next)=>{
try {
        const {email,password} = req.body;
            if(!email || !password){
                return res.json({success:false,message:"incomplete credential"})
            }
            
    
            if(email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD){
                const sellerToken = jwt.sign({email},process.env.JWTSECRET,{expiresIn:"7d"})
                res.cookie("sellerToken",sellerToken,{
                            httpOnly:true,
                            })
                return res.json({success:true,message:"logged in seller"});
            }
            else{
                return res.json({success:false ,message:"invalid seller credential"});
            }
} catch (error) {
    return res.json({success:false ,message:error.message});
}
}

 const isAuthSeller = async(req,res)=>{
   try {
     return res.json({success:true});
   } catch (error) {
    return res.json({success:false,message:error.message});
   }
}

 const sellerLogout = async(req,res,next)=>{
      try {
        res.clearCookie("sellerToken",
            {httpOnly:true})

            return res.json({success:true,message:"logged out"});
    } catch (error) {
         return res.json({success:false,message:error.message});
    }
}

export {
    sellerLogin,
    isAuthSeller,
    sellerLogout
}