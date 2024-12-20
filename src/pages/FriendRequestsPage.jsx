import React, { useState, useEffect } from 'react';
import FriendRequestList from '../components/FriendRequestList'; // Importuj FriendRequestList komponentu

const FriendRequestsPage = ({ user, users }) => {
  const [receivedRequests, setReceivedRequests] = useState([]);

  // Učitaj dolazne zahteve iz localStorage
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('friendRequests')) || { sent: [], received: [] };

    console.log('Stored Requests:', storedRequests); // Debugging line

    // Filtriraj samo dolazne zahteve koji su upućeni korisniku
    const filteredReceived = storedRequests.received
      .filter((request) => request.receiver === user.username)  // Filtriraj samo zahteve upućene korisniku
      .map((request) => {
        // Proveri da li users postoji pre nego što pozoveš .find()
        const sender = users && Array.isArray(users) ? users.find(u => u.username === request.sender) : null;

        return {
          username: request.sender,
          firstName: sender ? sender.firstName : 'Nepoznat', // Koristi podatke iz users ili 'Nepoznat' ako nije pronađen
          lastName: sender ? sender.lastName : 'Nepoznat', // Isto za lastName
        };
      });

    console.log('Filtered Requests:', filteredReceived); // Debugging line
    setReceivedRequests(filteredReceived);
  }, [user, users]); // Dodajemo users kao zavisnost

  const handleAcceptRequest = (username) => {
    const storedRequests = JSON.parse(localStorage.getItem('friendRequests')) || { sent: [], received: [] };
    const updatedReceived = storedRequests.received.filter(request => request.sender !== username);

    let friends = JSON.parse(localStorage.getItem('friends')) || {};
    if (!friends[user.username]) friends[user.username] = [];
    if (!friends[username]) friends[username] = [];

    // Dodajemo prijatelja u listu prijatelja
    friends[user.username].push(username);
    friends[username].push(user.username);

    // Spremamo u localStorage
    localStorage.setItem('friendRequests', JSON.stringify({ sent: storedRequests.sent, received: updatedReceived }));
    localStorage.setItem('friends', JSON.stringify(friends));

    setReceivedRequests(updatedReceived);
    console.log('Request Accepted:', username); // Debugging line
  };

  const handleDeclineRequest = (username) => {
    const storedRequests = JSON.parse(localStorage.getItem('friendRequests')) || { sent: [], received: [] };
    const updatedReceived = storedRequests.received.filter(request => request.sender !== username);

    // Spremamo u localStorage
    localStorage.setItem('friendRequests', JSON.stringify({ sent: storedRequests.sent, received: updatedReceived }));
    setReceivedRequests(updatedReceived);

    console.log('Request Declined:', username); // Debugging line
  };

  return (
    <div className="friend-requests-page">
      <h2>Friend Requests</h2>

      {/* Dodaj log za provere */}
      {receivedRequests.length === 0 ? (
        <p>No friend requests</p> // Prikazivanje ako nema zahteva
      ) : (
        <FriendRequestList
          requests={receivedRequests}
          onAccept={handleAcceptRequest}
          onDecline={handleDeclineRequest}
        />
      )}
    </div>
  );
};

export default FriendRequestsPage;
