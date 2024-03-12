import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateAd = () => {

  const navigate = useNavigate();

  const [adData, setAdData] = useState({
    Name: '',
    Description: '',
    Price: '',
    Category: '',
    Condition: '',
    Images: []
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdData({ ...adData, [name]: value });
  };

  const handleImageChange = (e) => {
    setAdData({ ...adData, Images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', adData.Name);
    formData.append('Description', adData.Description);
    formData.append('Price', adData.Price);
    formData.append('Category', adData.Category);
    formData.append('Condition', adData.Condition);
    adData.Images.forEach((image) => formData.append('Images', image));

    try {
      const response = await fetch('/api/Ad/Create', {
        method: 'POST',
        body: formData,
        headers: {
          credentials: "include",
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create ad');
      }

      setSuccessMessage('Ad created successfully!');
      navigate("/profile")
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create ad');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Ad</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" name="Name" value={adData.Name} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" name="Description" value={adData.Description} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="text" className="form-control" name="Price" value={adData.Price} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" className="form-control" name="Category" value={adData.Category} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Condition:</label>
          <input type="text" className="form-control" name="Condition" value={adData.Condition} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Images:</label>
          <input type="file" className="form-control" name="Images" multiple onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">Create Ad</button>
      </form>
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
    </div>
  );
};