export const addExpenses = (req, res) => {
  const { text, amount } = req.body;
  console.log(req.body);

  if (!text || !amount) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const { userId, email } = req.user;
  console.log(req.user.userId);
};

export const fetchExpenses = (req, res) => {};
export const deleteExpenses = (req, res) => {};

