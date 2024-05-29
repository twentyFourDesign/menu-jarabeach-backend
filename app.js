import cors from "cors";
import express from "express";
import { ROUTES } from "./constants/index.js";
import { errorMiddleware, notFound } from "./middlewares/index.js";
// import { categoryRoutes, itemRoutes } from "./routes/index.js";
import { categoryRoutes, itemRoutes, imageRoutes } from "./routes/index.js";
import { v2 as cloudinary } from 'cloudinary';

const app = express();
app.use(cors());

app.use(express.json());

//  client cloudnary key     
cloudinary.config({
  cloud_name: 'dihoze8oz',
  api_key: '126679656111281',
  api_secret: 'wuTyoF_hxU9v8DqYp2kq7ERY9II'
});

app.use(ROUTES.ROOT, categoryRoutes);
app.use(ROUTES.ROOT, itemRoutes);
app.use(ROUTES.ROOT, imageRoutes);

app.use(notFound);
app.use(errorMiddleware);


export { app };
