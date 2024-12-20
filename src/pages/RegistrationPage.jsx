import React, { useState } from 'react';

const RegistrationPage = ({ onRegister }) => {
  const [firstName, setFirstName] = useState('');  // Dodajemo stanje za ime
  const [lastName, setLastName] = useState('');    // Dodajemo stanje za prezime
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validacija registracije (možete dodati više provera, ako je potrebno)
    if (firstName && lastName && username && password && email) {
      const newUser = { firstName, lastName, username, password, email };
      onRegister(newUser); // Pozivanje funkcije za registraciju
    } else {
      alert('Molimo popunite sva polja!');
    }
  };

  return (
    <div className="register-page">
      <h2>Registracija</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="firstName">Ime</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Prezime</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Registruj se</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
