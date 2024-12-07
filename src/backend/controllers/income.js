const IncomeSchema = require("../models/IncomeModel");
const Transaction = require("../models/Transaction");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const parsedAmount = parseFloat(amount);

    const income = new IncomeSchema({
        title,
        amount: parsedAmount,
        category,
        description,
        date,
        user: req.user.id,
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Save to Income collection
        await income.save();

        // Save to Transaction collection
        const transaction = new Transaction({
            title,
            amount: parsedAmount,
            category,
            description,
            date,
            user: req.user.id,
            type: "income", // Explicitly set the type
            relatedId: income._id, // Reference to the Income
        });
        await transaction.save();

        res.status(200).json({ message: 'Income added successfully!', income });
    } catch (error) {
        console.error('Error adding income:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    console.log("Deleting income with ID:", id);
    console.log("User ID:", req.user.id);

    try {
        // Find and delete the income document
        const income = await IncomeSchema.findOneAndDelete({ _id: id, user: req.user.id });
        if (!income) {
            return res.status(404).json({ message: "Income not found or not authorized" });
        }

        // Delete the corresponding transaction using the relatedId
        const transaction = await Transaction.findOneAndDelete({ relatedId: id });
        if (!transaction) {
            console.warn("No corresponding transaction found for the deleted income.");
        }

        res.status(200).json({ message: "Income and related transaction deleted successfully!" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

