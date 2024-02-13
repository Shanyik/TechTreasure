import React, { useEffect, useState } from 'react';
import { Card, Pagination, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 8; // Number of ads to display per page

  useEffect(() => {
    fetch('/api/Ad/GetAll', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        setAds(data);
        const totalPages = Math.ceil(data.length / adsPerPage);
        setCurrentPage(prevPage => Math.min(prevPage, totalPages));
      })
      .catch(error => console.log(error));
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div>
      <div className="text-center mb-4">
        <h1>Featured Ads</h1>
      </div>
      <Container style={{ minWidth: '80%', margin: 'auto', position: "relative", transform: "translate(0, 0)", left: 0, top: 0}}>
        <Row  md={4} className="g-4"> {/* 2 columns for extra small screens, 8 columns for medium screens */}
          {currentAds.map((ad, index) => (
            <Col key={index}>
              <Card className="h-100 d-flex align-items-center justify-content-center"> {/* Ensure cards take full height */}
                {ad.images && ad.images.length > 0 ? (
                  <Card.Img variant="top" src={ad.images[0].url} />
                ) : (
                  <div className="text-center" style={{ height: '200px', width: '100%' }}>No Picture</div>
                )}
                <Card.Body>
                  <Card.Title>{ad.name}</Card.Title>
                  <Card.Text>{ad.description}</Card.Text>
                  <Card.Text>Price: ${ad.price}</Card.Text>
                  <Card.Text>Condition: {ad.condition}</Card.Text>
                  <Card.Text>Seller: {ad.seller.userName}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination className="mt-3 justify-content-center">
          {Array.from({ length: Math.ceil(ads.length / adsPerPage) }).map((_, index) => (
            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </div>
  );
};

export default Home;