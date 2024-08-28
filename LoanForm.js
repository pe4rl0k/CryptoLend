import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const LoanForm = () => {
  const [loanDetails, setLoanDetails] = useState({
    borrowerAddress: '',
    amount: '',
    interest: '',
    duration: '', 
  });

  const handleChange = (e) => {
    setLoanDetails({
      ...loanDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { borrowerAddress, amount, interest, duration } = loanDetails;
    if (!borrowerAddress || !amount || !interest || !duration) {
      alert("Please fill all fields");
      return false;
    }
    if (isNaN(amount) || isNaN(interest) || isNaN(duration)) {
      alert("Amount, interest, and duration must be numbers");
      return false;
    }
    return true;
  };

  const calculateRepayment = () => {
    const { amount, interest, duration } = loanDetails;
    const totalInterest = (amount * interest * duration) / 12 / 100;
    const totalRepayable = parseFloat(amount) + totalInterest;
    return totalRepayable.toFixed(2); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const totalRepayable = calculateRepayment(); 

    try {
      const response = await fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...loanDetails,
          totalRepayable, 
        }),
      });
      if (!response.ok) throw new Error('Failed to create loan');
      alert(`Loan created successfully! Total repayable amount: $${totalRepayable}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="borrowerAddress">Borrower Address:</label>
        <input
          id="borrowerAddress"
          name="borrowerAddress"
          type="text"
          value={loanDetails.borrowerAddress}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={loanDetails.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="interest">Interest (%):</label>
        <input
          id="interest"
          name="interest"
          type="number"
          min="0"
          step="0.01"
          value={loanDetails.interest}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="duration">Duration (Months):</label>
        <input
          id="duration"
          name="duration"
          type="number"
          min="1"
          step="1"
          value={loanDetails.duration}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanForm;