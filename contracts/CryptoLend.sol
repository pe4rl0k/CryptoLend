// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CryptoLend
 * @dev A simple lending contract allowing borrowers to create and repay loans.
 */
contract CryptoLend {
    address public owner;

    // Events
    event LoanCreated(uint indexed loanId, address indexed borrower, uint amount);
    event LoanRepaid(uint indexed loanId, address indexed borrower, uint amount);

    // Loan structure
    struct Loan {
        uint id;
        address borrower;
        uint amount;
        bool isRepaid;
    }

    // State variables
    Loan[] public loans;
    mapping(address => uint[]) private borrowerLoans;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    /**
     * @dev Constructor sets the owner of the contract to the address that deploys it.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Creates a new loan.
     * @param _amount The amount of the loan.
     */
    function createLoan(uint _amount) public {
        uint loanId = loans.length;
        loans.push(Loan(loanId, msg.sender, _amount, false));
        borrowerLoans[msg.sender].push(loanId);
        emit LoanCreated(loanId, msg.sender, _amount);
    }

    /**
     * @notice Allows a borrower to repay a loan.
     * @param _loanId The ID of the loan to be repaid.
     */
    function repayLoan(uint _loanId) public payable {
        require(_loanId < loans.length, "Invalid loan ID.");
        Loan storage loan = loans[_loanId];

        require(msg.sender == loan.borrower, "Only the borrower can repay the loan.");
        require(!loan.isRepaid, "Loan is already repaid.");
        require(msg.value >= loan.amount, "Insufficient amount to repay the loan.");

        loan.isRepaid = true;
        // Refund any excess amount sent
        if (msg.value > loan.amount) {
            payable(msg.sender).transfer(msg.value - loan.amount);
        }
        emit LoanRepaid(loan.id, msg.sender, msg.value);
    }

    /**
     * @notice Retrieves a loan by its ID.
     * @param _loanId The ID of the loan.
     * @return Loan The requested loan.
     */
    function getLoan(uint _loanId) public view returns (Loan memory) {
        require(_loanId < loans.length, "Invalid loan ID.");
        return loans[_loanId];
    }

    /**
     * @notice Retrieves all loan IDs for a borrower.
     * @param _borrower The address of the borrower.
     * @return uint[] An array of loan IDs.
     */
    function getBorrowerLoans(address _borrower) public view returns (uint[] memory) {
        return borrowerLoans[_borrower];
    }
}