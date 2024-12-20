import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Kada se pritisne enter ili submit, preusmerite na stranicu za pretragu korisnika
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      </div>
      <div className="navbar-center">
        {/* Prikazivanje pretrage samo ako je korisnik prijavljen */}
        {user.isLoggedIn && (
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Pretraga korisnika..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">Pretraga</button>
          </form>
        )}
      </div>
      <div className="navbar-right">
        {user.isLoggedIn ? (
          <>
            <Link to={`/profile/${user.username}`} style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
            {/* Dodavanje linka za Friend Requests page */}
            <Link to="/friend-requests" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
              Friend Requests
            </Link>
            <button onClick={onLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Log In</Link>
            {/* Dodavanje linka za Registraciju */}
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
