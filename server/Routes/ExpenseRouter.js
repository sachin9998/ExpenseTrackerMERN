import { Router } from "express";
import {
  addExpenses,
  deleteExpenses,
  fetchExpenses,
} from "../Controllers/ExpenseController.js";

const router = Router();

// Fetch all the expenses of user based on user_id
router.get("/", fetchExpenses);

// Add expense
router.post("/", addExpenses);

// Delete expense
router.delete("/:expenseId", deleteExpenses);

export default router;
