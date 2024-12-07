const express = require("express");
const { protect } = require("../middleware/auth"); // Middleware for authentication
const IncomeSchema = require("../models/IncomeModel");
const ExpenseSchema = require("../models/ExpenseModel");



const router = express.Router();

router.get("/dashboard", protect, async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve user ID from token

    // Calculate total income
    const totalIncome = await IncomeSchema.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Calculate total expenses
    const totalExpenses = await ExpenseSchema.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Fetch recent transactions (income + expenses)
    const recentTransactions = [
      ...(await IncomeSchema.find({ user: userId }).sort({ createdAt: -1 }).limit(3)),
      ...(await ExpenseSchema.find({ user: userId }).sort({ createdAt: -1 }).limit(3)),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Respond with dashboard data
    res.status(200).json({
      username: req.user.name,
      balance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      transactions: recentTransactions,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
