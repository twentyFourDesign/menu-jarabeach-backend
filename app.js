import cors from "cors";
import express from "express";
import { ROUTES } from "./constants/index.js";
import { errorMiddleware, notFound } from "./middlewares/index.js";
import { categoryRoutes, itemRoutes } from "./routes/index.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use(ROUTES.ROOT, categoryRoutes);
app.use(ROUTES.ROOT, itemRoutes);

app.use(notFound);
app.use(errorMiddleware);

export { app };
