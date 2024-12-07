import {dashboard, expenses, income, transactions} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/viewtransactions",
    },
    {
        id: 3,
        title: "Log your Income",
        icon: income,
        link: "/income",
    },
    {
        id: 4,
        title: "Log your Expense",
        icon: expenses,
        link: "/expenses",
    },
]