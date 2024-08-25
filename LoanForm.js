import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const LoanForm = () => {
  const [loanDetails, setLoanDetails] = useState({
    borrowerAddress: '',
    amount: '',
    interest: '',
  });

  const handleChange = (e) => {
    setLoanDetails({
      ...loanDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { borrowerAddress, amount, interest } = loanDetails;
    if (!borrowerAddress || !amount || !interest) {
      alert("Please fill all fields");
      return false;
    }
    if (isNaN(amount) || isNaN(interest)) {
      alert("Amount and interest must be numbers");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanDetails),
      });
      if (!response.ok) throw new Error('Failed to create loan');
      alert("Loan created successfully!");
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanForm;