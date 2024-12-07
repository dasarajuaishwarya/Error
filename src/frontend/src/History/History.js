import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext();

    // Get the recent transactions from the transactionHistory function
    const history = transactionHistory();

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.length > 0 ? (
                history.map((item, index) => {
                    const { _id, title, amount, type } = item;

                    // Debug to ensure type and amount are correct
                    console.log(`Transaction ${index}:`, { title, amount, type });

                    return (
                        <div key={_id || index} className="history-item">
                            {/* Title */}
                            <p style={{
                                color: type === 'expense' ? 'red' : 'var(--color-green)'
                            }}>
                                {title}
                            </p>

                            {/* Amount with color and sign */}
                            <p style={{
                                color: type === 'expense' ? 'red' : 'var(--color-green)'
                            }}>
                                {type === 'expense' ? `-$${Math.abs(amount)}` : `+$${amount}`}
                            </p>
                        </div>
                    );
                })
            ) : (
                <p>No recent transactions available.</p>
            )}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .history-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History;
