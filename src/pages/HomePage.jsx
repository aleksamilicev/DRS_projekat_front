import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import CreatePostButton from '../components/CreatePostButton';

const HomePage = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState({});

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    const savedFriends = localStorage.getItem('friends');
    
    if (savedPosts) {
      console.log('Učitani postovi:', savedPosts);
      setPosts(JSON.parse(savedPosts));
    }
    
    if (savedFriends) {
      console.log('Učitani prijatelji:', savedFriends);
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  const userPosts = posts.filter(post => post.username === user.username);
  const friendsPosts = posts.filter(post => {
    return friends[user.username] && friends[user.username].includes(post.username);
  });

  const handlePostCreated = (newPost) => {
    console.log('Dodavanje nove objave:', newPost);
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleSortByTime = () => {
    console.log('Početni postovi pre sortiranja:', posts);

    const combinedPosts = [...userPosts, ...friendsPosts];
    console.log('Kombinovani postovi:', combinedPosts);

    // Pravimo kopiju niza pre nego što ga sortiramo
    const sortedPosts = [...combinedPosts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    console.log('Sortirani postovi:', sortedPosts);
    
    setPosts(sortedPosts);
    localStorage.setItem('posts', JSON.stringify(sortedPosts));
  };

  // Koristi posts umesto combinedPosts za renderovanje
  return (
    <div className="home-page">
      <h2>Dobrodošli, {user && user.firstName ? user.firstName : 'Korisniče'}!</h2>
      <div>
        <h3>Vaše objave:</h3>
        <button onClick={handleSortByTime}>Sortiraj po vremenu</button>

        {user && user.isLoggedIn ? (
          <CreatePostButton onPostCreated={handlePostCreated} user={user} />
        ) : (
          <p>Morate biti ulogovani da biste kreirali postove.</p>
        )}

        <div className="post-list">
          {(posts.length === 0) ? (
            <p>Nemate postova.</p>
          ) : (
            posts.map((post, index) => (
              <PostCard key={`${post.id}-${post.username}-${index}`} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
