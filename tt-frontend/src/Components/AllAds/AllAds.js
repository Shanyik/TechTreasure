import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AllAds = () => {
    const [ads, setAds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:5201/api/Ad/GetAll')
            .then(response => response.json())
            .then(data => {
                setAds(data);
            })
            .catch(error => console.error('Error fetching ads:', error));
    }, []);

    const filteredAds = ads.filter(ad => {
        return ad.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <div>
                <hr style={{ width: '50%', margin: 'auto', marginTop: '30px', marginBottom: '30px' }} />
                <div className="text-center mb-4">
                    <h1>All Ads</h1>
                </div>
                <Container style={{ minWidth: '80%', margin: 'auto', position: "relative", transform: "translate(0, 0)", left: 0, top: 0, marginBottom: '100px'}}>
                    <Row  md={4} className="g-4"> 
                    {ads.map((ad, index) => (
                        <Col key={index}>
                        <Card className="h-100 d-flex align-items-center justify-content-center" style={{minHeight: '400px'}}> 
                            {ad.images && ad.images.length > 0 ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70%', marginTop: '5%' }}>
                                <Card.Img variant="top" src={ad.images[0].imageUrl} />
                            </div>
                                
                            ) : (
                            <div className="text-center" style={{ minHeight: '400px', width: '100%',display: 'flex', justifyContent: 'center',alignItems: 'center' }}>No Picture</div>
                            )}
                            <Card.Body>
                            <Card.Title>{ad.name}</Card.Title>
                            <Card.Text>Price: ${ad.price}</Card.Text>
                            <Card.Text>Condition: {ad.condition}</Card.Text>
                            <Card.Text>Seller: {ad.seller.userName}</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default AllAds;
