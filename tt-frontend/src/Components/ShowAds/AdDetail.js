import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Container, Row, Col, Carousel } from 'react-bootstrap'

const AdDetail = () => {

    const { id } = useParams();
    const [ad, setAd] = useState(null);

    useEffect(() => {
        fetch(`/api/Ad/GetById?id=${id}`)
        .then(response => response.json())
        .then(data =>setAd(data), )
        .catch(error => console.error("Error fetching ad details", error))
    }, [id])

    if (!ad) {
        return <div>Loading...</div>;
      }

  return (
    <>
    <div>AdDetail</div>
    <Container>
        <Row>
            <Col>
            <Card className="h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '500px' }}> 
                <Carousel style={{ height: '300px' }}>
                {ad.images.map((image, index) => (
                    <Carousel.Item key={index}>
                    <img
                        className="d-block w-100 h-200"
                        src={image.imageUrl}
                        alt={`Slide ${index}`}
                        style={{ objectFit: 'cover', height: '300px' }}
                    />
                    </Carousel.Item>
                ))}
                </Carousel>
                <Card.Body>
                    <Card.Title>{ad.name}</Card.Title>
                    <Card.Text>Description: {ad.description}</Card.Text>
                    <Card.Text>Price: ${ad.price}</Card.Text>
                    <Card.Text>Category: {ad.category}</Card.Text>
                    <Card.Text>Condition: {ad.condition}</Card.Text>
                    <Card.Text>Date Posted: {new Date(ad.datePosted).toLocaleDateString()}</Card.Text>
                    <Card.Text>Views: {ad.views}</Card.Text>
                    <Card.Text>Seller: {ad.seller ? ad.seller.userName : 'Unknown'}</Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default AdDetail