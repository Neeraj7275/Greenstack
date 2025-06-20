import addressModel from "../models/address.model.js";

// add address :api/address/add
export const addAddress = async(req,res,next)=>{
  try {
      const {address} = req.body;
      await addressModel.create({...address,userId:req.user.id});
      res.json({success:true, message: "address added successfully"});
  } catch (error) {
    res.json({success:false, message:error.message});
  }
}

// get address : /api/address/get
export const getAddress = async(req,res,next)=>{
    try {
        const addresses = await addressModel.find({userId: req.user.id});
        res.json({success:true, addresses});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
}