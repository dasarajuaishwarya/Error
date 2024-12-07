const express = require('express'); // Import express
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { protect } = require('../middleware/auth'); // Import the protect middleware
const Transaction = require('../models/Transaction');

const router = express.Router(); // Create a router instance

// Income routes
router.post('/add-income', protect, addIncome);
router.get('/get-incomes', protect, getIncomes);
router.delete('/delete-income/:id', protect, deleteIncome);

// Expense routes
router.post('/add-expense', protect, addExpense);
router.get('/get-expenses', protect, getExpenses);
router.delete('/delete-expense/:id', protect, deleteExpense);



// router.get('/transactions', protect, async (req, res) => {
//     const { startDate, endDate } = req.query;

//     const filter = { user: req.user.id };
//     if (startDate && endDate) {
//         filter.date = {
//             $gte: new Date(startDate),
//             $lte: new Date(endDate),
//         };
//     }

//     try {
//         const transactions = await Transaction.find(filter).sort({ date: -1 });
//         res.status(200).json(transactions);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }

//     console.log('Start Date:', startDate);
// console.log('End Date:', endDate);
// console.log('Filter:', filter);
// console.log('Authenticated User ID:', req.user.id);
// });

router.get('/transactions', protect, async (req, res) => {
    const { startDate, endDate } = req.query;

    const filter = { user: req.user.id };
    if (startDate && endDate) {
        filter.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    try {
        const transactions = await Transaction.find(filter).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test route working' });
});



module.exports = router; // Export the router
