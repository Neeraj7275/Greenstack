import mongoose from "mongoose";

const dbconnection = async ()=>{
    try {
        mongoose.connection.on('connected', ()=>console.log("data base connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/greenstack`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferTimeoutMS: 30000, // Increase to 30 seconds (30000ms)
});
        
    } catch (error) {
        console.log("db connection failed",error); 
    }
}

export default dbconnection;