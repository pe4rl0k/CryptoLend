import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Navigation = React.memo(() => (
  <nav className="navigation">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/market">Market</Link></li>
      <li><Link to="/lend">Lend</Link></li>
      <li><Link to="/borrow">Borrow</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </nav>
));

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CryptoLend</Link>
      </div>
      <Navigation />
    </header>
  );
};

export default React.memo(Header);