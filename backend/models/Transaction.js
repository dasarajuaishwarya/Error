const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['income', 'expense'], // Restrict to valid types
        required: true,
    },
    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Income', // Reference to the related Income or Expense
    },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
