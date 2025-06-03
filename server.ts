import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/database.config";
import router from "./src/routes/auth.routes";
import mongoose from "mongoose";

config();

const PORT = process.env.PORT;

const connectToDataBase = async () => {
  await mongoose.connect(process.env.DATABASE_URL!);
};

connectToDataBase()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(`Database connection error: ${error}`));

const app = express();
app.use(express.json());

app.use("/api/v1/auth", router);

// connectDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
