import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './config';

const LoanView = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`${API_URL}/loans`);
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans data:', error);
      }
    };

    fetchLoans();
  }, []);

  const handleLoanInteraction = async (loanId, action) => {
    try {
      const response = await axios.post(`${API_URL}/loans/${loanId}/${action}`);
      console.log('Loan action response:', response.data);
      fetchLoans();
    } catch (error) {
      console.error('Error handling loan interaction:', error);
    }
  };

  return (
    <div>
      <h2>Loan Details</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            <p>Loan ID: {loan.id}</p>
            <p>Amount: {loan.amount}</p>
            <p>Status: {loan.status}</p>
            <button onClick={() => handleLoanInteraction(loan.id, 'repay')}>Repay Loan</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanView;