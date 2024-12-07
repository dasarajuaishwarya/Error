import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {
        totalExpenses,
        incomes,
        expenses,
        totalIncome,
        totalBalance,
        getIncomes,
        getExpenses,
    } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    // Combine and sort incomes and expenses for recent history
    const recentHistory = [...incomes, ...expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3); // Get top 3 most recent transactions

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        {/* <h2>Recent History</h2>
                        <ul>
                            {recentHistory.length > 0 ? (
                                recentHistory.map((transaction, index) => (
                                    <li key={index}>
                                        <p>
                                            <strong>{transaction.title}</strong>: $
                                            {transaction.amount} - {transaction.type} on{' '}
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <p>No recent transactions available.</p>
                            )}
                        </ul> */}
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...incomes.map((item) => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...incomes.map((item) => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...expenses.map((item) => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...expenses.map((item) => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem; /* Reduced gap */

        .chart-con {
            grid-column: 1 / 4;
            height: 250px; /* Further reduced height */
            
            h2 {
                font-size: 1.5rem; /* Adjusted title size */
                margin-bottom: 0.5rem;
            }

            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1rem; /* Reduced gap */
                margin-top: 1rem; /* Reduced margin */

                .income, .expense {
                    grid-column: span 2;
                }

                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 1px solid #FFFFFF; /* Reduced border width */
                    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.04); /* Softer shadow */
                    border-radius: 10px; /* Reduced border radius */
                    padding: 0.6rem; /* Further reduced padding */

                    p {
                        font-size: 2rem; /* Reduced font size */
                        font-weight: 600;
                    }
                }

                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    p {
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 3rem; /* Reduced font size */
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;

            h2 {
                font-size: 1.5rem; /* Same font size as All Transactions */
                margin-bottom: 0.5rem;
                margin-top: 0; /* Aligns with All Transactions */
            }

            ul {
                list-style: none;
                padding: 0;

                li {
                    background: #FCF6F9;
                    border: 1px solid #FFFFFF;
                    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.04);
                    padding: 0.6rem;
                    border-radius: 10px;
                    margin-bottom: 0.5rem;

                    p {
                        margin: 0;
                    }
                }
            }

            .salary-title {
                font-size: 0.9rem;
                span {
                    font-size: 1.2rem;
                }
            }

            .salary-item {
                background: #FCF6F9;
                border: 1px solid #FFFFFF;
                box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.04);
                padding: 0.6rem;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-weight: 500;
                    font-size: 1rem;
                }
            }
        }
    }

    /* Align the titles horizontally */
    h2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem; /* Consistent title size */
        margin: 0 1rem; /* Add spacing between sections */
    }
`;

export default Dashboard;
