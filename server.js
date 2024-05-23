import "dotenv/config";
import { app } from "./app.js";
import { connectDb } from "./config/db.js";

connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started: ${PORT}`));
