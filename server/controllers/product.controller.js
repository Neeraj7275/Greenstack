import { json } from "express";
import productModel from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";


// add products : /api/product/add

export const addProduct = async(req,res,next)=>{
try {
   if (!req.body.productData) {
  return res.status(400).json({ success: false, message: "Missing productData" });
}

        let productData = JSON.parse(req.body.productData);
    
        const images = req.files;

       
        let imagesUrl = await Promise.all(
         images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type : "image"})
            return result.secure_url;
         })
        )

        //  {...productData, image: imagesUrl}: This is an object literal created using the spread syntax (...). It takes all the properties from the productData object and adds a new property named image with the value of the imagesUrl array (the URLs of the uploaded images). This effectively combines the product details with the URLs of its associated images.
    
         await productModel.create({...productData,image:imagesUrl});
         return res.json({success:true,message:"product added"})
} catch (error) {
     res.json({success:false, message:"something is missing"});
}
}

// productList :/api/product/list
export const productList = async(req,res,next)=>{
   try {
     const products = await productModel.find();
     res.json({success:true, products});
   } catch (error) {
      res.json({success:false, message:error.message});
   }
}

// get single product :/api/product/id
export const productById = async(req,res,next)=>{
   try {
     const {id} = req.body;
     const product = await productModel.findByid({id});
     res.json({success:true, product});
   } catch (error) {
    res.json({success:false, message :error.message});
   }
}

// change product in stock :/api/product/stock
export const changeStock = async(req,res,next)=>{
    try {
        const {id,inStock} = req.body;
        const product = await productModel.findByIdAndUpdate(id,{inStock});
    
        res.json({success:true, message:"product updated"});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}