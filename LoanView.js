import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './config';

const LoanView = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        fetchLoansData();
    }, []);

    const fetchLoansData = async () => {
        try {
            const response = await axios.get(`${API_URL}/loans`);
            setLoans(response.data);
        } catch (error) {
            console.error('Error fetching loans data:', error);
        }
    };

    const handleLoanInteraction = async (loanId, action) => {
        try {
            await performLoanAction(loanId, action);
            fetchLoansData(); // Refresh loans data after any interaction
        } catch (error) {
            console.error('Error handling loan interaction:', error);
        }
    };

    const performLoanAction = async (loanId, action) => {
        try {
            const response = await axios.post(`${API_URL}/loans/${loanId}/${action}`);
            console.log('Loan action response:', response.data);
        } catch (error) {
            console.error(`Error performing ${action} on loan ${loanId}:`, error);
        }
    };

    return (
        <div>
            <h2>Loan Details</h2>
            <ul>
                {loans.map((loan) => (
                    <LoanListItem
                        key={loan.id}
                        loan={loan}
                        onInteraction={handleLoanInteraction}
                    />
                ))}
            </ul>
        </div>
    );
};

const LoanListItem = ({ loan, onInteraction }) => (
    <li>
        <p>Loan ID: {loan.id}</p>
        <p>Amount: {loan.amount}</p>
        <p>Status: {loan.status}</p>
        <button onClick={() => onInteraction(loan.id, 'repay')}>
            Repay Loan
        </button>
    </li>
);

export default LoanView;