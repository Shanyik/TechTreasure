import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Ads.css" 

const ShowAds = ({ user, isPagination, isSearchBar }) => {
    const [ads, setAds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const adsPerPage = 4;
    const maxPageNumber = 5;

    useEffect(() => {
        const fetchUrl = user ? `/api/Ad/GetAllByUserId?id=${user.id}` : '/api/Ad/GetAll';

        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                setAds(data);
                setCurrentPage(1);
            })
            .catch(error => console.error('Error fetching ads:', error));
    }, [user]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredAds = ads.filter(ad => ad.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const adsToDisplay = isPagination ? ads.slice((currentPage - 1) * adsPerPage, currentPage * adsPerPage) : filteredAds;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <> 
            <Container style={{ minWidth: '80%', margin: 'auto', marginBottom: '20px', position: 'relative', transform: 'translate(0%,0%)', left: '0%', top: '0%'}}>
            {isSearchBar ? (
                    <>
                    <Row className="g-4" md={12} style={{ marginBottom: '20px' }}>
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
                    </>
                ) : (null)}
            <Row className="g-4" md={4}>
                    {adsToDisplay.map((ad, index) => (
                        <Col key={index}>
                            <Link style={{textDecoration: "none"}} to={`/ad/${ad.id}`} key={index}>
                                <Card className="h-100 d-flex align-items-center justify-content-center cardHover" style={{ minHeight: '500px' }}> 
                                    {ad.images && ad.images.length > 0 ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70%' }}>
                                            <Card.Img variant="top" src={ad.images[0].imageUrl} />
                                        </div>     
                                    ) : (
                                        <div className="text-center" style={{ minHeight: '400px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No Picture</div>
                                    )}
                                    <Card.Body>
                                        <Card.Title>{ad.name}</Card.Title>
                                        <Card.Text>Price: ${ad.price}</Card.Text>
                                        <Card.Text>Condition: {ad.condition}</Card.Text>
                                        {!user && <Card.Text>Seller: {ad.seller.userName}</Card.Text>}
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
                {isPagination && (
                    <Pagination className="mt-3 justify-content-center">
                        {Array.from({ length: Math.min(Math.ceil(ads.length / adsPerPage), maxPageNumber) }).map((_, index) => (
                            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                )}
            </Container>
        </>
    );
};

export default ShowAds;
