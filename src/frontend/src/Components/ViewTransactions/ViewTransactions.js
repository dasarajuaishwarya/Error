import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';

function Dashboard() {
    const { totalIncome, totalExpenses, totalBalance, getFilteredTransactions } = useGlobalContext();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    // Log when the component renders or state updates
    useEffect(() => {
        console.log("Dashboard component rendered");
        console.log("Current state - Start Date:", startDate, "End Date:", endDate);
    }, [startDate, endDate]);

    const handleFilter = async () => {
        console.log("Filter button clicked");
        console.log("Start Date:", startDate, "End Date:", endDate);

        if (!startDate || !endDate) {
            console.log("Validation failed: Both dates are required");
            alert('Please select both start and end dates.');
            return;
        }

        const formattedStartDate = new Date(startDate).toISOString();
        const formattedEndDate = new Date(endDate).toISOString();
        console.log("Formatted Start Date:", formattedStartDate, "Formatted End Date:", formattedEndDate);

        try {
            console.log("Fetching filtered transactions...");
            const transactions = await getFilteredTransactions(formattedStartDate, formattedEndDate);
            console.log("Filtered Transactions:", transactions);
            setFilteredTransactions(transactions);
        } catch (err) {
            console.error("Error filtering transactions:", err);
            alert('Unable to fetch transactions. Please try again.');
        }
    };

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>

                <div className="filter-con">
                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                                console.log("Start Date Changed:", e.target.value);
                                setStartDate(e.target.value);
                            }}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => {
                                console.log("End Date Changed:", e.target.value);
                                setEndDate(e.target.value);
                            }}
                        />
                    </label>
                    <button onClick={handleFilter}>Filter</button>
                </div>

                <div className="history-con">
                    <h2>Filtered Transactions</h2>
                    <ul>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction) => (
                                <li key={transaction._id}>
                                    <p>
                                        <strong>{transaction.title}</strong>: $
                                        {transaction.amount} - {transaction.type} on{' '}
                                        {new Date(transaction.date).toLocaleDateString()}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <p>No transactions found for the selected dates.</p>
                        )}
                    </ul>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .filter-con {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        label {
            display: flex;
            flex-direction: column;
            font-weight: bold;
            color: #555;

            input {
                margin-top: 0.5rem;
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }

        button {
            padding: 0.5rem 1rem;
            background-color: #222260;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
                background-color: #1a1a50;
            }
        }
    }

    .history-con {
        margin-top: 2rem;

        h2 {
            margin-bottom: 1rem;
            color: #333;
        }

        ul {
            list-style: none;
            padding: 0;

            li {
                background: #fcf6f9;
                border: 1px solid #ffffff;
                box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.04);
                padding: 0.6rem;
                border-radius: 10px;
                margin-bottom: 0.5rem;

                p {
                    margin: 0;
                }
            }
        }
    }
`;

export default Dashboard;
