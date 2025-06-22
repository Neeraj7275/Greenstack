// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })

import multer from "multer";

const storage = multer.memoryStorage(); // store file in memory

export const upload = multer({ storage });

  
// export const upload = multer({ 
//     storage, 
// })