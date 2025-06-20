import { response } from "express";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import stripe from "stripe";
import userModel from "../models/user.model.js";

// place order cod :/api/order/cod
export const placeOrderCOD = async(req,res,next)=>{
 try {
       const {items,address} = req.body;
       if(items.length === 0 || !address){
           return res.json({success:false, message:"invalid data"})
       }
   
       // calculate amount using items
   
       let amount = await items.reduce(async(acc,item)=>{
           const product =await productModel.findById(item.product);
           return (await acc) + product.offerPrice * item.quantity
       },0)
   
       // add tax charge 2%
       amount+=Math.floor(amount*0.02);
   
       await orderModel.create({
           userId: req.user.id,
           items,
           amount,
           address,
           paymentType:"COD"
       })
       return res.json({success:true, message: "order placed successfully"})
 } catch (error) {
    return res.json({success:false, message:"kixboc"})
 }
}

// place order stripe :/api/order/stripe
export const placeOrderStripe = async(req,res,next)=>{
 try {
       const {items,address} = req.body;
       const {origin} = req.headers;
       if(items.length === 0 || !address){
           return res.json({success:false, message:"invalid data"})
       }

       let productData = [];
   
       // calculate amount using items
   
       let amount = await items.reduce(async(acc,item)=>{
           const product =await productModel.findById(item.product);
           productData.push({
            name:product.name,
            price:product.offerPrice,
            quantity:item.quantity
           })
           return (await acc) + product.offerPrice * item.quantity
       },0)
   
       // add tax charge 2%
       amount+=Math.floor(amount*0.02);
   
       const order = await orderModel.create({
           userId: req.user.id,
           items,
           amount,
           address,
           paymentType:"Online"
       })

    //    stripe gateway initialization
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // create line items for stripe
    const line_items = productData.map((item)=>{
        return{
            price_data: {
                currency:"usd",
                product_data:{
                    name: item.name,
                },
                unit_amount: Math.floor(item.price + item.price*0.02)
            },
            quantity:item.quantity,
        }
    })

    // create session
    const session = await stripeInstance.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${origin}/loader?next=my-orders`,
        cancel_url: `${origin}/cart`,
        metadata:{
            orderId: order._id.toString(),
            userId: req.user.id,
        }
    })


       return res.json({success:true,url:session.url});
 } catch (error) {
    return res.json({success:false, message:error.message})
 }
}

// stripe webhook to verify payments action:/stripe
export const stripeWebhooks = async( request,response)=>{
    // stripe gateway initialize
     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

     const sig = request.headers["stripe-signature"];
     let event;
     try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
     } catch (error) {
        response.status(400).send(`webhook error : ${error.message}`)
     }

    //  handle the event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            });

            const {orderId, userId} = session.data[0].metadata;

            // mark payment as paid
            await orderModel.findByIdAndUpdate(orderId,{isPaid:true})
            // clear user cart
            await userModel.findByIdAndUpdate(userId,{cartItems: {}});
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            });

            const {orderId} = session.data[0].metadata;
            await orderModel.findByIdAndDelete(orderId);
            break;
        }
            
    
        default:
            console.error(`unhandled event type ${event.type}`)
            break;
    }
    response.json({received:true});
}

// get order by userId :/api/order/user
export const getUserOrders = async(req,res,next)=>{
    try {
       const orders =  await orderModel.find({
            userId: req.user.id,
            $or:[
                {paymentType:"COD"},
                {isPaid:true}
            ]
        }).populate("items.product address").sort({createdAt:-1});
        console.log(orders);
        return res.json({success:true, orders});
    } catch (error) {
      return res.json({success:false, message:error.message})
    }
}


// get all orders (seller/admin) :/api/order/seller
export const getAllOrders = async(req,res,next)=>{
    try {
       const orders =  await orderModel.find({
            $or:[
                {paymentType:"COD"},
                {isPaid:true}
            ]
        }).populate("items.product address").sort({createdAt:-1});
        
        return res.json({success:true, orders});
    } catch (error) {
      return res.json({success:false, message:error.message})
    }
}
