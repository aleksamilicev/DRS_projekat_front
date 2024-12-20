import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const UserSearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  
  useEffect(() => {
    // Parsiranje query parametara za pretragu
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';

    // Učitavanje korisnika iz localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Filtriranje korisnika na osnovu imena, prezimena ili korisničkog imena
    if (query) {
      const filteredUsers = storedUsers.filter(user =>
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
    }
  }, [location.search]); // Kada se URL promeni (npr. pretraga), ponovo se poziva efekat.

  return (
    <div className="user-search-page">
      <h2>Rezultati pretrage</h2>
      {searchResults.length === 0 ? (
        <p>Nema korisnika koji odgovaraju vašoj pretrazi.</p>
      ) : (
        <ul>
          {searchResults.map((user) => (
            <li key={user.username}>
              {/* Klikom na ime korisnika, odvede na njegov profil */}
              <Link to={`/profile/${user.username}`} style={{ color: 'black' }}>
                {user.firstName} {user.lastName} (@{user.username})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearchPage;
