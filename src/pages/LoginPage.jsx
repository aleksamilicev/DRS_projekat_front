import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Dodajemo Navigate za preusmeravanje

const LoginPage = ({ users, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false); // Za preusmeravanje

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pronađi korisnika sa odgovarajućim korisničkim imenom
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      // Pohranjujemo korisnika u localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Takođe možemo pohraniti druge podatke kao što su prijatelji i zahtevi ako su potrebni
      let storedRequests = JSON.parse(localStorage.getItem('friendRequests')) || { sent: [], received: [] };
      localStorage.setItem('friendRequests', JSON.stringify(storedRequests));

      let friends = JSON.parse(localStorage.getItem('friends')) || {};
      localStorage.setItem('friends', JSON.stringify(friends));

      onLogin(user); // Pozivanje funkcije koja menja status prijave u App.js
      setRedirectToHome(true); // Postavljanje flag-a za preusmeravanje
    } else {
      setError('Neispravno korisničko ime ili lozinka!');
    }
  };

  // Ako se uspešno prijavi, preusmeravamo ga na HomePage
  if (redirectToHome) {
    return <Navigate to="/" />; // Preusmerava na home page
  }

  return (
    <div className="login-page">
      <h2>Prijavite se</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Korisničko ime</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lozinka</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default LoginPage;
