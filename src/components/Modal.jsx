// src/components/Modal.jsx
import React, { useState } from 'react';

const Modal = ({ closeModal, onPostCreated }) => {
  const [postContent, setPostContent] = useState('');

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      const newPost = {
        username: 'Petar',  // Ovde možete dodati stvarnog korisnika
        content: postContent,
        timestamp: Date.now(),
      };
      onPostCreated(newPost);  // Poziva funkciju za kreiranje objave
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Nova Objava</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={postContent}
            onChange={handleChange}
            placeholder="Napišite svoju objavu..."
            rows="4"
          />
          <div className="modal-actions">
            <button type="button" onClick={closeModal}>Zatvori</button>
            <button type="submit">Objavi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
