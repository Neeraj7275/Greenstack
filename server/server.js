import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnection from "./config/db.js";
import userRouter from "./routes/user.route.js";
import sellerRouter from "./routes/seller.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";
import cloudinaryConnection from "./config/cloudinary.js";
import { stripeWebhooks } from "./controllers/order.controller.js";



const app = express();

const port = process.env.PORT || 4000;
const allowedOrigin = ['http://localhost:5173','https://greenstack.vercel.app/']

await dbconnection();
await cloudinaryConnection();

app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:allowedOrigin,credentials:true}));
app.use(cookieParser()); 

app.get("/", (req,res,next)=>{
    res.send("api is working");
})

// routes
app.use("/api/user",userRouter);
app.use("/api/seller",sellerRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/address",addressRouter);
app.use("/api/order",orderRouter);

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);   
})