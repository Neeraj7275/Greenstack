import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// this line allow to upload video and photo on cloudinary
const cloudinaryConnection = async()=>{
    cloudinary.config({ 
  cloud_name:'dlaq8wbqa', 
  api_key:'932324795921879',
  api_secret:'ZtcVe0XAldLIG4nkXN104JvBYQ4'
});
}

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         const uploadedFile = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         // file has been uploaded successfull
//         console.log("file is uploaded on cloudinary ", uploadedFile.url);
//         fs.unlinkSync(localFilePath)
//         return uploadedFile;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         console.log(error.message);
        
//         return null;
//     }
// }


export default cloudinaryConnection;
// export {uploadOnCloudinary}