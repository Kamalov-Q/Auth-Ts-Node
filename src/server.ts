import express from "express";
import { config } from "dotenv";
import router from "./routes/auth.routes";
import { connectDB } from "./config/database.config";

config();

const PORT = process.env.PORT;

connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/auth", router);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.send("Server is running Testing");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
