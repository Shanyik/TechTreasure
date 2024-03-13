import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ShowAds from '../ShowAds/ShowAds';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center mb-4" style={{marginTop: '100px'}}>
        <h1>Featured Ads</h1>
      </div>
      <ShowAds isPagination={true} />
      <Button style={{marginBottom: '100px'}} variant="success" className="me-2" onClick={() =>{ navigate("/allads")}}>See all ads</Button>
    </div>
  );
};

export default Home;