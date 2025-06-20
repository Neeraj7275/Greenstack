import mongoose from "mongoose";

const dbconnection = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODBURI}/${process.env.DBNAME}`)
        console.log("data base connected successfully !!!");
        
    } catch (error) {
        console.log("db connection failed",error); 
    }
}

export default dbconnection;