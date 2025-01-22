import { User } from "../Models/User.model.js";

export const addExpenses = async (req, res) => {
  const { text, amount } = req.body;
  console.log(req.body);

  if (!text || !amount) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const { userId } = req.user;
  console.log(userId);

  try {
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          expenses: {
            text,
            amount,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Expense added successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Something went wrong", success: false });
  }
};

export const fetchExpenses = async (req, res) => {
  const { userId } = req.user;
  // console.log(userId, req.body);

  try {
    const userData = await User.findById(userId).select("expenses");
    res.status(200).json({
      message: "Fetched Expenses successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};

export const deleteExpenses = async (req, res) => {
  const { userId } = req.user;
  const expenseId = req.params.expenseId;
  try {
    const userData = await User.findByIdAndUpdate(
      userId,
      { $pull: { expenses: { _id: expenseId } } },
      { new: true } // For Returning the updated documents
    );
    res.status(200).json({
      message: "Expense Deleted successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};
