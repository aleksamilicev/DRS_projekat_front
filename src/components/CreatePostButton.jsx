import React, { useState } from 'react';

const CreatePostButton = ({ onPostCreated, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePost = () => {
    if (!user || !user.username) {
      console.error("Korisnik nije ulogovan.");
      return;
    }

    if (newPostContent.trim()) {
      const newPost = {
        id: Date.now(),
        username: user.username,
        content: newPostContent,
        timestamp: new Date().toISOString(),
      };

      onPostCreated(newPost);
      setNewPostContent('');
      closeModal();
    }
  };

  return (
    <div>
      <button onClick={openModal}>Kreiraj novu objavu</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Nova objava</h2>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Unesite sadržaj objave..."
            />
            <button onClick={handleCreatePost}>Objavi</button>
            <button onClick={closeModal}>Zatvori</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostButton;
