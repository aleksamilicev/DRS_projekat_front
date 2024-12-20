import React, { useState } from "react";

const EditProfileForm = ({ currentUserData, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: currentUserData.firstName,
    lastName: currentUserData.lastName,
    email: currentUserData.email,
    username: currentUserData.username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Šaljemo izmenjene podatke nazad na roditeljsku komponentu
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfileForm;
