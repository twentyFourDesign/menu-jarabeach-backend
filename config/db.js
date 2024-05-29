// previous code
// import mongoose from "mongoose";

// export const  connectDb = async () => {
//   try {
//     // const conn = await mongoose.connect(process.env.MONGO_URI);
//     const conn = await mongoose.connect("mongodb+srv://user:DeepSky24!@menu-jarabeachresort.bunlur8.mongodb.net/?retryWrites=true&w=majority&appName=menu-jarabeachresort");
//     console.log(`Database is connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };


import mongoose from "mongoose";
import gridfsStream from "gridfs-stream";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

let gfs;
let upload;

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://user:DeepSky24!@menu-jarabeachresort.bunlur8.mongodb.net/?retryWrites=true&w=majority&appName=menu-jarabeachresort");
    console.log(`Database is connected: ${conn.connection.host}`);

    const db = conn.connection.db;
    gfs = gridfsStream(db, mongoose.mongo);
    gfs.collection('uploads');

    const storage = new GridFsStorage({
      url: "mongodb+srv://user:DeepSky24!@menu-jarabeachresort.bunlur8.mongodb.net/?retryWrites=true&w=majority&appName=menu-jarabeachresort",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      file: (req, file) => {
        return {
          filename: `file_${Date.now()}_${file.originalname}`,
          bucketName: 'uploads',
        };
      },
    });

    upload = multer({ storage });

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { gfs, upload };
