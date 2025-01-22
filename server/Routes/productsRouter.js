import { Router } from "express";
import verifyJWT from "../Middlewares/Auth.js";

const router = Router();

router.get("/", verifyJWT, (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "Product 1",
      price: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
    },
  ]);
});

export default router;
