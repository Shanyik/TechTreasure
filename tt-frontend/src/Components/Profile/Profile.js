import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = () => {

    const [user, setUser] = useState("");
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/user')
            .then(response => response.json())
            .then(data => {
                setUser(data[0]);
            })
            .catch(error => console.error('Error fetching user:', error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (user) {
            fetch(`/api/Ad/GetAllByUserId?id=${user.id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setAds(data);
                })
                .catch(error => console.error('Error fetching ads:', error));
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    user ? (
        <>
        <div class="profile-container" style={{ marginTop: '100px'}}>
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class=" text-center">
                        <img alt="Profile Image" src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" class="rounded-circle img-fluid profile-image" />
                    </div>
                    <div class="">
                        <h3 class="mt-2">
                            <strong>{user.userName}</strong>
                        </h3>
                        <ul class="list-unstyled profile-details">
                            <li>
                                <i class="fas fa-map-marker-alt text-primary"></i> <strong>Address:</strong> {user.address.split(',')[0]}, {user.address.split(',')[3]}
                            </li>
                            <li>
                                <i class="fas fa-envelope text-primary"></i> <strong>Email:</strong> {user.email}
                            </li>
                            <li>
                                <i class="fas fa-phone-alt text-primary"></i> <strong>Phone Number:</strong> {user.phoneNumber}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {ads && ads.length > 0 ? (
            <>
            <div>
                <hr style={{ width: '50%', margin: 'auto', marginTop: '30px', marginBottom: '30px' }}/>
                <div className="text-center mb-4">
                    <h1>Your Ads</h1>
                </div>
                <Container style={{ minWidth: '80%', margin: 'auto', position: "relative", transform: "translate(0, 0)", left: 0, top: 0, marginBottom: '100px'}}>
                    <Row  md={4} className="g-4"> 
                    {ads.map((ad, index) => (
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
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                </Container>
            </div>
            </>
        ) : (
            <>
            No Ads
            </>
        )}
        </>
    ) : (
        //loading
    <>
    </>
    )
    
  )
}

export default Profile