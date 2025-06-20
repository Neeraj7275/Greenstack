import mongoose from "mongoose";

const dbconnection = async ()=>{
    try {
        mongoose.connection.on('connected', ()=>console.log("data base connected"))
        await mongoose.connect(`${process.env.MONGODBURI}/greencart`)
        
    } catch (error) {
        console.log("db connection failed",error); 
    }
}

export default dbconnection;