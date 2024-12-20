import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import CreatePostButton from '../components/CreatePostButton';
import { useParams } from 'react-router-dom';
import { users } from '../mockData/users';
import FriendList from '../components/FriendList';
import '../styles/styles.css';

const UserProfilePage = ({ user }) => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [friendshipStatus, setFriendshipStatus] = useState('Add Friend');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Učitavanje profila korisnika
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || users;
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (username === loggedInUser?.username) {
      setProfileUser(loggedInUser);
    } else {
      const foundUser = storedUsers.find((u) => u.username === username);
      setProfileUser(foundUser || null);
    }
  }, [username]);

  // Učitavanje objava iz localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Filtriranje objava koje pripadaju korisniku
  const userPosts = posts.filter(post => post.username === profileUser?.username);

  // Funkcija za kreiranje nove objave
  const handlePostCreated = (newPost) => {
    const updatedPosts = [newPost, ...posts]; // Dodaje novu objavu na početak liste
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  // Funkcija za sortiranje objava po vremenu
  const handleSortByTime = () => {
    const sorted = [...userPosts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setPosts(sorted);
    localStorage.setItem('posts', JSON.stringify(sorted));
  };

  const getFriendshipStatus = (currentUser, targetUser) => {
    const friendRequests = JSON.parse(localStorage.getItem('friendRequests')) || { sent: [], received: [] };
    const friends = JSON.parse(localStorage.getItem('friends')) || {};

    if (friends[currentUser]?.includes(targetUser)) {
      return 'Friends';
    }
    if (friendRequests.sent.some(request => request.sender === currentUser && request.receiver === targetUser)) {
      return 'Request Sent';
    }
    if (friendRequests.received.some(request => request.sender === targetUser && request.receiver === currentUser)) {
      return 'Accept Request';
    }
    return 'Add Friend';
  };

  useEffect(() => {
    if (profileUser) {
      const status = getFriendshipStatus(user.username, profileUser.username);
      setFriendshipStatus(status);
    }
  }, [profileUser, user]);

  const handleSendFriendRequest = () => {
    const currentUser = user.username;
    const targetUser = profileUser.username;

    let friendRequests = JSON.parse(localStorage.getItem('friendRequests')) || { sent: [], received: [] };

    if (!friendRequests.sent.some(request => request.sender === currentUser && request.receiver === targetUser)) {
      friendRequests.sent.push({ sender: currentUser, receiver: targetUser });
      friendRequests.received.push({ sender: currentUser, receiver: targetUser });

      localStorage.setItem('friendRequests', JSON.stringify(friendRequests));
      setFriendshipStatus('Request Sent');
      alert('Zahtev za prijateljstvo je poslat.');
    } else {
      alert('Zahtev je već poslat.');
    }
  };

  const handleAcceptRequest = () => {
    const currentUser = user.username;
    const targetUser = profileUser.username;

    let friendRequests = JSON.parse(localStorage.getItem('friendRequests')) || { sent: [], received: [] };
    const updatedReceived = friendRequests.received.filter(request => request.sender !== targetUser);
    localStorage.setItem('friendRequests', JSON.stringify({ sent: friendRequests.sent, received: updatedReceived }));

    let friends = JSON.parse(localStorage.getItem('friends')) || {};
    if (!friends[currentUser]) friends[currentUser] = [];
    if (!friends[targetUser]) friends[targetUser] = [];

    friends[currentUser].push(targetUser);
    friends[targetUser].push(currentUser);

    localStorage.setItem('friends', JSON.stringify(friends));
    setFriendshipStatus('Friends');
    alert('Zahtev prihvaćen. Sada ste prijatelji!');
  };

  const handleDeclineRequest = () => {
    const currentUser = user.username;
    const targetUser = profileUser.username;

    let friendRequests = JSON.parse(localStorage.getItem('friendRequests')) || { sent: [], received: [] };
    const updatedReceived = friendRequests.received.filter(request => request.sender !== targetUser);
    localStorage.setItem('friendRequests', JSON.stringify({ sent: friendRequests.sent, received: updatedReceived }));

    setFriendshipStatus('Add Friend');
    alert('Zahtev odbijen.');
  };

  const handleCancelRequest = () => {
    const currentUser = user.username;
    const targetUser = profileUser.username;

    let friendRequests = JSON.parse(localStorage.getItem('friendRequests')) || { sent: [], received: [] };
    const updatedSent = friendRequests.sent.filter(request => request.receiver !== targetUser);
    localStorage.setItem('friendRequests', JSON.stringify({ sent: updatedSent, received: friendRequests.received }));

    setFriendshipStatus('Add Friend');
    alert('Zahtev otkazan.');
  };

  if (!profileUser) return <p>Korisnik nije pronađen.</p>;

  return (
    <div className="user-profile-page">
      <h2>Profil korisnika</h2>
      <p>Ime i prezime: {profileUser.firstName} {profileUser.lastName}</p>
      <p>Email: {profileUser.email}</p>
      <p>Korisničko ime: {profileUser.username}</p>

      {user.username === profileUser.username && (
        <button onClick={() => setIsEditing(true)}>
          Edit Profile
        </button>
      )}

      {/* Dugme za dodavanje prijatelja */}
      {user.username !== profileUser.username && (
        <button onClick={friendshipStatus === 'Add Friend' ? handleSendFriendRequest : friendshipStatus === 'Accept Request' ? handleAcceptRequest : friendshipStatus === 'Request Sent' ? handleCancelRequest : null}>
          {friendshipStatus === 'Add Friend' && 'Dodaj prijatelja'}
          {friendshipStatus === 'Request Sent' && 'Otkazivanje zahteva'}
          {friendshipStatus === 'Accept Request' && 'Prihvati zahtev'}
          {friendshipStatus === 'Friends' && 'Prijatelj'}
        </button>
      )}

      {/* Dugme za sortiranje i kreiranje objave */}
      {user.username === profileUser.username && (
        <div>
          <button onClick={handleSortByTime}>Sortiraj po vremenu</button>
          <CreatePostButton onPostCreated={handlePostCreated} user={user} />
        </div>
      )}

      {/* Lista prijatelja u gornjem desnom kutu */}
      <div className="friend-list-container">
        <FriendList userId={profileUser.username} />
      </div>

      {/* Prikazivanje objava korisnika */}
      <div className="post-list">
        {userPosts.length === 0 ? (
          <p>Nemate postova.</p>
        ) : (
          userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
