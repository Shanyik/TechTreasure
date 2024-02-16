import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AllAds = () => {
    const [ads, setAds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('/api/Ad/GetAll')
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
                <Container style={{ minWidth: '80%', margin: 'auto', position: "relative", transform: "translate(0, 0)", left: 0, top: 0, marginBottom: '100px' }}>
                    <Row md={12} className="g-4" style={{marginBottom: '20px'}}>
                        <Col>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={handleSearch}
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row md={4} className="g-4">
                        {filteredAds.length > 0 ? (
                            filteredAds.map((ad, index) => (
                                <Col key={index}>
                                    <Card className="h-100 d-flex align-items-center justify-content-center">
                                        {ad.images && ad.images.length > 0 ? (
                                            <Card.Img variant="top" src={ad.images[0].url} />
                                        ) : (
                                            <div className="text-center" style={{ height: '300px', width: '100%' }}>No Picture</div>
                                        )}
                                        <Card.Body>
                                            <Card.Title>{ad.name}</Card.Title>
                                            <Card.Text>Price: ${ad.price}</Card.Text>
                                            <Card.Text>Condition: {ad.condition}</Card.Text>
                                            <Card.Text>Seller: {ad.seller.userName}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>No matching ads found.</Col>
                        )}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default AllAds;
