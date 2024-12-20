import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

const PostList = ({ posts }) => {
  const [sortedPosts, setSortedPosts] = useState(posts);

  // Sortiraj postove po vremenu kada se posts promene
  useEffect(() => {
    const sorted = [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setSortedPosts(sorted);
  }, [posts]); // Re-sortiranje kada se posts promeni

  return (
    <div className="post-list">
      <button onClick={() => setSortedPosts([...sortedPosts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))}>
        Sortiraj po vremenu
      </button>
      {sortedPosts.length === 0 ? (
        <p>Nema postova.</p>
      ) : (
        sortedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default PostList;
