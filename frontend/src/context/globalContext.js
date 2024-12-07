// import React, { useContext, useState } from "react";
// import axios from "axios";

// const BASE_URL = "http://localhost:4000/api/v1";

// const GlobalContext = React.createContext();

// export const GlobalProvider = ({ children }) => {
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);

//   // Helper function to get token from localStorage
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`, // Include token in headers
//         "Content-Type": "application/json", // Ensure proper content type
//       },
//     };
//   };

//   // Add Income
//   const addIncome = async (income) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/add-income`,
//         income,
//         getAuthHeaders()
//       );
//       setError(null); // Clear previous errors
//       getIncomes(); // Refresh incomes after adding
//       return response.data; // Optionally return response data
//     } catch (err) {
//       console.error("Error adding income:", err);
//       setError(err.response?.data?.message || "Error adding income");
//     }
//   };

//   // Get Incomes
//   const getIncomes = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/get-incomes`,
//         getAuthHeaders()
//       );
//       setIncomes(response.data); // Set retrieved incomes
//       setError(null); // Clear previous errors
//     } catch (err) {
//       console.error("Error fetching incomes:", err);
//       setError(err.response?.data?.message || "Error fetching incomes");
//     }
//   };

//   // Delete Income
//   const deleteIncome = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/delete-income/${id}`, getAuthHeaders());
//       getIncomes(); // Refresh incomes after deletion
//       setError(null); // Clear previous errors
//     } catch (err) {
//       console.error("Error deleting income:", err);
//       setError(err.response?.data?.message || "Error deleting income");
//     }
//   };

//   // Calculate Total Income
//   const totalIncome = () => {
//     return incomes.reduce((acc, income) => acc + income.amount, 0);
//   };

//   // Add Expense
//   const addExpense = async (expense) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/add-expense`,
//         expense,
//         getAuthHeaders()
//       );
//       setError(null); // Clear previous errors
//       getExpenses(); // Refresh expenses after adding
//       return response.data; // Optionally return response data
//     } catch (err) {
//       console.error("Error adding expense:", err);
//       setError(err.response?.data?.message || "Error adding expense");
//     }
//   };

//   // Get Expenses
//   const getExpenses = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/get-expenses`,
//         getAuthHeaders()
//       );
//       setExpenses(response.data); // Set retrieved expenses
//       setError(null); // Clear previous errors
//     } catch (err) {
//       console.error("Error fetching expenses:", err);
//       setError(err.response?.data?.message || "Error fetching expenses");
//     }
//   };

//   // Delete Expense
//   const deleteExpense = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/delete-expense/${id}`, getAuthHeaders());
//       getExpenses(); // Refresh expenses after deletion
//       setError(null); // Clear previous errors
//     } catch (err) {
//       console.error("Error deleting expense:", err);
//       setError(err.response?.data?.message || "Error deleting expense");
//     }
//   };

//   // Calculate Total Expenses
//   const totalExpenses = () => {
//     return expenses.reduce((acc, expense) => acc + expense.amount, 0);
//   };

//   // Calculate Total Balance
//   const totalBalance = () => {
//     return totalIncome() - totalExpenses();
//   };

//   // Get Transaction History (latest 3 items)
// //   const transactionHistory = () => {
// //     const incomesWithType = incomes.map((income) => ({
// //       ...income,
// //       type: "income",
// //     }));
// //     const expensesWithType = expenses.map((expense) => ({
// //       ...expense,
// //       type: "expense",
// //     }));

// //     // Combine and sort by date
// //     const history = [...incomesWithType, ...expensesWithType].sort(
// //       (a, b) =>
// //         new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
// //     );

// //     // Return top 3 most recent transactions
// //     return history.slice(0, 3);
// //   };
// const transactionHistory = () => {
//     const incomesWithType = incomes.map((income) => ({
//         ...income,
//         type: "income", // Explicitly set the type
//     }));

//     const expensesWithType = expenses.map((expense) => ({
//         ...expense,
//         type: "expense", // Explicitly set the type
//     }));

//     // Combine and sort by date
//     const history = [...incomesWithType, ...expensesWithType].sort(
//         (a, b) =>
//             new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
//     );
    
//     return history; // Return the combined and sorted array
// };




// const getFilteredTransactions = async (startDate, endDate) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/transactions`, {
//             params: { startDate, endDate },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//         });

//         // Add type explicitly based on your backend data structure
//         const transactionsWithType = response.data.map((transaction) => ({
//             ...transaction,
//             type: transaction.type || (transaction.isIncome ? "income" : "expense"), // Adjust if your backend uses different field names
//         }));

//         console.log('Filtered Transactions:', transactionsWithType);
//         return transactionsWithType;
//     } catch (err) {
//         console.error('Error fetching filtered transactions:', err);
//     }
// };


//   return (
//     <GlobalContext.Provider
//       value={{
//         addIncome,
//         getIncomes,
//         incomes,
//         deleteIncome,
//         expenses,
//         totalIncome,
//         addExpense,
//         getExpenses,
//         deleteExpense,
//         totalExpenses,
//         totalBalance,
//         transactionHistory,
//         getFilteredTransactions,
//         error,
//         setError,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => {
//   return useContext(GlobalContext);
// };

import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // Helper function to get token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };


  // Add Income
  const addIncome = async (income) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/add-income`,
        income,
        getAuthHeaders()
      );
      setError(null); // Clear previous errors
      getIncomes(); // Refresh incomes after adding
      return response.data;
    } catch (err) {
      console.error("Error adding income:", err);
      setError(err.response?.data?.message || "Error adding income");
    }
  };

  // Get Incomes
  const getIncomes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/get-incomes`,
        getAuthHeaders()
      );
      setIncomes(response.data); // Set retrieved incomes
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Error fetching incomes:", err);
      setError(err.response?.data?.message || "Error fetching incomes");
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-income/${id}`, getAuthHeaders());
      getIncomes(); // Refresh incomes after deletion
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Error deleting income:", err);
      setError(err.response?.data?.message || "Error deleting income");
    }
  };

  // Calculate Total Income
  const totalIncome = () => {
    return incomes.reduce((acc, income) => acc + income.amount, 0);
  };

  // Add Expense
  const addExpense = async (expense) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/add-expense`,
        expense,
        getAuthHeaders()
      );
      setError(null); // Clear previous errors
      getExpenses(); // Refresh expenses after adding
      return response.data;
    } catch (err) {
      console.error("Error adding expense:", err);
      setError(err.response?.data?.message || "Error adding expense");
    }
  };

  // Get Expenses
  const getExpenses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/get-expenses`,
        getAuthHeaders()
      );
      setExpenses(response.data); // Set retrieved expenses
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError(err.response?.data?.message || "Error fetching expenses");
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-expense/${id}`, getAuthHeaders());
      getExpenses(); // Refresh expenses after deletion
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Error deleting expense:", err);
      setError(err.response?.data?.message || "Error deleting expense");
    }
  };

  // Calculate Total Expenses
  const totalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  // Calculate Total Balance
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // Get Transaction History (latest 3 items)
  const transactionHistory = () => {
    const incomesWithType = incomes.map((income) => ({
      ...income,
      type: "income", // Explicitly set the type
    }));

    const expensesWithType = expenses.map((expense) => ({
      ...expense,
      type: "expense", // Explicitly set the type
    }));

    // Combine and sort by date
    const history = [...incomesWithType, ...expensesWithType].sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    );

    return history; // Return the combined and sorted array
  };

  // Get filtered transactions based on date range
  const getFilteredTransactions = async (startDate, endDate) => {
    try {
      const response = await axios.get(`${BASE_URL}/transactions`, {
        params: { startDate, endDate },
        headers: getAuthHeaders().headers,
      });

      // Add type explicitly based on your backend data structure
      const transactionsWithType = response.data.map((transaction) => ({
        ...transaction,
        type: transaction.type || (transaction.isIncome ? "income" : "expense"), // Adjust if your backend uses different field names
      }));

      console.log("Filtered Transactions:", transactionsWithType);
      return transactionsWithType;
    } catch (err) {
      console.error("Error fetching filtered transactions:", err);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        getFilteredTransactions, // Provide it in context
        // updateProfile, // Provide updateProfile in context
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};


