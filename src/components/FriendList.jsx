import React, { useState, useEffect } from 'react';

const FriendList = ({ userId }) => {
  const [friends, setFriends] = useState([]);

  // Učitavanje prijatelja iz localStorage
  const loadFriends = () => {
    const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};
    const userFriends = storedFriends[userId] || [];
    setFriends(userFriends);
  };

  // Učitaj prijatelje kada se promeni userId
  useEffect(() => {
    loadFriends();
  }, [userId]);  // Osvežava prijatelje svaki put kada se promeni userId

  const getFriendDetails = (friendId) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const friend = storedUsers.find((u) => u.username === friendId);
    return friend ? `${friend.firstName} ${friend.lastName}` : friendId; // Ako nije pronađen, vraća samo ID
  };

  if (!friends || friends.length === 0) {
    return <p>Nema prijatelja za prikaz.</p>;
  }

  return (
    <div>
      <h3>Lista prijatelja</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend}>{getFriendDetails(friend)}</li>  
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
