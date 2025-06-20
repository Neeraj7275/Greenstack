import userModel from "../models/user.model.js";
// update user cart data :/api/cart/update
export const updateCart = async (req,res,next)=>{
    try {
        const {cartItems} = req.body;
       await userModel.findByIdAndUpdate(req.user.id, { cartItems });
        res.json({success:true, message:"cart updated"});
    } catch (error) {
         res.json({success:false, message:error.message});
    }
}