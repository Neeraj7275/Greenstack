import jwt from "jsonwebtoken";

const authUser = async(req,res,next)=>{
try {
        const {token} = req.cookies;
        console.log(token);
        
        
        if(!token){
              return res.json({success:false,message:"not authorized"}) 
        }
    
        const decodedToken = jwt.verify(token,process.env.JWTSECRET);
        
        
        if(decodedToken.id){
           req.user = { id: decodedToken.id }; // Attach to req.user
        }else{
            return res.json({success:false,message:"not authorized"})
        }
        next();
} catch (error) {
    return res.json({success:false,message:"jkl"})
}

}

export default authUser