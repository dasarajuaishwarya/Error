const ExpenseSchema = require("../models/ExpenseModel");
const Transaction = require("../models/Transaction");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const parsedAmount = parseFloat(amount);

    const expense = new ExpenseSchema({
        title,
        amount: parsedAmount,
        category,
        description,
        date,
        user: req.user.id,
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number!" });
        }

        // Save to Expense collection
        await expense.save();

        // Save to Transaction collection
        const transaction = new Transaction({
            title,
            amount: parsedAmount,
            category,
            description,
            date,
            user: req.user.id,
            type: "expense", // Explicitly set the type
            relatedId: expense._id, // Reference to the Expense
        });
        await transaction.save();

        res.status(200).json({ message: "Expense added successfully!" });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find({ user: req.user.id }).sort({ createdAt: -1 });

        // Enrich expenses with a type field
        const enrichedExpenses = expenses.map(expense => ({
            ...expense._doc, // Spread the existing expense data
            type: 'expense', // Add the type field explicitly
        }));

        res.status(200).json(enrichedExpenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the expense entry
        const expense = await ExpenseSchema.findOneAndDelete({ _id: id, user: req.user.id });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found or not authorized" });
        }

        // Delete the corresponding transaction
        const transaction = await Transaction.findOneAndDelete({ relatedId: id, type: "expense" });
        if (!transaction) {
            console.warn(`Transaction not found for Expense ID: ${id}`);
        }

        res.status(200).json({ message: "Expense and related transaction deleted successfully!" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
