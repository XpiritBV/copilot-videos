// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
  return (
    <div>
        <div className="titleHeader">
            <Link to="/" className="back-button">Back to Home</Link>
            <div>
                <h2 id="title">{title}</h2>
            </div>
        </div>
    </div>
  );
};

export default Header;