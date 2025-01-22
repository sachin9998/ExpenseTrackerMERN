import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import verifyJWT from "./Middlewares/Auth.js";
import authRouter from "./Routes/auth.routes.js";
import expenseRouter from "./Routes/ExpenseRouter.js";
import productRouter from "./Routes/productsRouter.js";
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/expenses", verifyJWT, expenseRouter);

// Server listening
app.listen(3000, (req, res) => {
  console.log("Server is running on port: ", port);
  connectDB();
});
