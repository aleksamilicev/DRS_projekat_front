import React from 'react';

const PostCard = ({ post }) => {
  const formattedTimestamp = new Date(post.timestamp).toLocaleString();

  return (
    <div className="post-card">
      <div className="post-card-header">
        <h3>{post.username}</h3>
        <p className="timestamp">{formattedTimestamp}</p>
      </div>
      <div className="post-card-body">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;
