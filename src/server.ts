import express from "express";
import { config } from "dotenv";
import router from "./routes/auth.routes";
import { connectDB } from "./config/database.config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";
import cors from "cors";
config();

const PORT = process.env.PORT;

connectDB();

const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/api/v1/auth", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.send("Server is running Testing");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(
    `Swagger docs available on port http://localhost:${PORT}/api-docs`
  );
});
