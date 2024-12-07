const mongoose = require('mongoose');
const IncomeSchema = require('../models/IncomeModel');
const ExpenseSchema = require('../models/ExpenseModel');

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        const totalIncomeResult = await IncomeSchema.aggregate([
            { $match: { user: mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        const totalExpensesResult = await ExpenseSchema.aggregate([
            { $match: { user: mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        const totalIncome = totalIncomeResult[0]?.total || 0;
        const totalExpenses = totalExpensesResult[0]?.total || 0;

        const recentTransactions = [
            ...(await IncomeSchema.find({ user: userId }).sort({ createdAt: -1 }).limit(3)),
            ...(await ExpenseSchema.find({ user: userId }).sort({ createdAt: -1 }).limit(3)),
        ].sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json({
            username: req.user.name,
            balance: totalIncome - totalExpenses,
            totalIncome,
            totalExpenses,
            transactions: recentTransactions,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getDashboardData };
