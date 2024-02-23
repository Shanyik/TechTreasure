import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export const CreateAd = () => {

    const navigate = useNavigate();

    const [adData, setAdData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        condition: '',
        images: []
    });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdData({ ...adData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(adData)
    fetch('/api/Ad/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'credentials': 'include'
      },
      body: JSON.stringify(adData)
    })
    .then(response => {
        console.log(response)
        navigate("/profile")
      if (response.ok) {
        console.log('Ad created successfully');
        
      } else {
        console.error('Failed to create ad');
      }
    })
    .catch(error => {
      console.error('Error creating ad:', error);
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
      <div className="w-50">
        <h1 className="mb-4">Create Ad</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" value={adData.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={adData.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter price" name="price" value={adData.price} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Enter category" name="category" value={adData.category} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formCondition">
            <Form.Label>Condition</Form.Label>
            <Form.Control type="text" placeholder="Enter condition" name="condition" value={adData.condition} onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Ad
          </Button>
        </Form>
      </div>
    </Container>
  );
};