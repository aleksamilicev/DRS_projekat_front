import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage'; // Importuj RegistrationPage
import UserSearchPage from './pages/UserSearchPage'; // Importuj UserSearchPage
import FriendRequestsPage from './pages/FriendRequestsPage'; // Importuj FriendRequestsPage
import NavBar from './components/NavBar';
import './styles/styles.css';

const App = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  });
  const [posts, setPosts] = useState([]); // Čuvanje svih objava u aplikaciji
  const [users, setUsers] = useState([]); // Čuvanje korisnika
  const navigate = useNavigate();

  // Funkcija za učitavanje korisnika iz localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    // Učitaj sve postove iz localStorage
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser({ ...userData, isLoggedIn: true });
    navigate('/'); // Nakon logovanja, idemo na HomePage sa postovima
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, firstName: '', lastName: '', email: '', username: '' });
    navigate('/'); // Kada se izlogujemo, vraćamo korisnika na početnu stranicu
  };

  // Funkcija za dodavanje novih postova
  const handlePostCreation = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]); // Dodaj novi post u stanje

    // Spremanje postova u localStorage
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    allPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(allPosts));
  };

  // Funkcija za registraciju novog korisnika
  const handleRegistration = (newUser) => {
    // Dodaj novog korisnika u listu korisnika
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Spremi korisnike u localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Preusmeri na login stranicu nakon registracije
    navigate('/login');
  };

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            user.isLoggedIn ? (
              <HomePage user={user} posts={posts} onPostCreated={handlePostCreation} />
            ) : (
              <div>
                <h2>Dobrodošli na našu platformu!</h2>
                <p>Prijavite se da biste videli objave.</p>
              </div>
            )
          }
        />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} users={users} />}
        />
        {/* Ruta za stranicu registracije */}
        <Route
          path="/register"
          element={<RegistrationPage onRegister={handleRegistration} />} // Prosleđivanje onRegister funkcije
        />
        <Route
          path="/profile/:username"
          element={<UserProfilePage user={user} posts={posts} onPostCreated={handlePostCreation} />}
        />
        <Route
          path="/search"
          element={<UserSearchPage />} // Ruta za pretragu korisnika
        />
        <Route
          path="/friend-requests"
          element={<FriendRequestsPage user={user} />} // Ruta za zahteve za prijateljstvo
        />
      </Routes>
    </>
  );
};

export default App;  