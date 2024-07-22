pragma solidity ^0.8.0;

contract CryptoLend {
    address public owner;

    event LoanCreated(uint loanId, address borrower, uint amount);
    event LoanRepaid(uint loanId, address borrower, uint amount);

    struct Loan {
        uint id;
        address borrower;
        uint amount;
        bool isRepaid;
    }

    Loan[] public loans;
    mapping(address => uint[]) private borrowerLoans;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createLoan(uint _amount) public {
        uint loanId = loans.length;
        loans.push(Loan(loanId, msg.sender, _amount, false));
        borrowerLoans[msg.sender].push(loanId);
        emit LoanCreated(loanId, msg.sender, _amount);
    }
    
    function repayLoan(uint _loanId) public payable {
        require(_loanId < loans.length, "Invalid loan ID.");
        Loan storage loan = loans[_loanId];
        require(msg.sender == loan.borrower, "Only the borrower can repay the loan.");
        require(!loan.isRepaid, "Loan is already repaid.");
        require(msg.value >= loan.amount, "Insufficient amount to repay the loan.");

        loan.isRepaid = true;
        emit LoanRepaid(loan.id, msg.sender, msg.value);
    }

    function getLoan(uint _loanId) public view returns (Loan memory) {
        require(_loanId < loans.length, "Invalid loan ID.");
        return loans[_loanNaId];
    }

    function getBorrowerLoans(address _borrower) public view returns (uint[] memory) {
        return borrowerLoans[_borrower];
    }
}