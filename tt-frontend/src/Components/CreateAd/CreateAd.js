import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export const CreateAd = () => {
    const [user, setUser] = useState("");

    const [adData, setAdData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        condition: '',
        sold: false,
        seller: "",
        images: []
    });

    useEffect(() => {
        fetch('/api/user')
            .then(response => response.json())
            .then(data => {
                setUser(data[0]);
                setAdData(AdData => ({
                    ...AdData,
                    seller: data[0]
                }))
            })
            .catch(error => console.error('Error fetching user:', error))
    }, []);

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
      if (response.ok) {
        console.log('Ad created successfully');
        // Reset form data if needed
        setAdData({
          name: '',
          description: '',
          price: 0,
          category: '',
          condition: '',
          sold: false,
          seller: user,
          images: []
        });
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