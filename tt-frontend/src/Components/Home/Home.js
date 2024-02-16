import React, { useEffect, useState } from 'react';
import { Card, Pagination, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const adsPerPage = 4; // Number of ads to display per page
  const maxPageNumber = 5; // Maximum number of pages to display

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
      <div className="text-center mb-4" style={{marginTop: '100px'}}>
        <h1>Featured Ads</h1>
      </div>
      <Container style={{ minWidth: '80%', margin: 'auto', position: "relative", transform: "translate(0, 0)", left: 0, top: 0}}>
        <Row  md={4} className="g-4"> 
          {currentAds.map((ad, index) => (
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
          ))}
        </Row>
        <Pagination className="mt-3 justify-content-center">
          {Array.from({ length: Math.min(Math.ceil(ads.length / adsPerPage), maxPageNumber) }).map((_, index) => (
            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        <Button variant="success" className="me-2" onClick={() =>{ navigate("/allads")}}>See all ads</Button>
      </Container>
    </div>
  );
};

export default Home;