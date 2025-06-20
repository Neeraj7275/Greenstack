import jwt from "jsonwebtoken";

 const authSeller = async (req,res,next)=>{
    try {
            const sellerToken = req.cookies.sellerToken;
            if(!sellerToken){
                  return res.json({success:false,message:"invalid sellerToken"}) 
            }
        
            const decodedSellerToken = jwt.verify(sellerToken,process.env.JWTSECRET);
            
            if(decodedSellerToken.email === process.env.SELLER_EMAIL){
              next();
            }else{
                return res.json({success:false,message:"invalid sellerToken"})
            }
    } catch (error) {
        return res.json({success:false,message:"invalid token"})
    }
}

export default authSeller;