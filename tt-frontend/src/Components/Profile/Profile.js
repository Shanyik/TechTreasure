import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = () => {

    const [user, setUser] = useState("");

    useEffect(() => {
    fetch('/api/user', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          
      },
  })
      .then(response => {return response.json()})
      .then(data => {
          console.log(data);
          setUser(data[0]);
      }
      )
      .catch(error => console.log(error))
  }, []);

  return (
    user ? (
        <div class="profile-container">
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
    ) : (
    <>
    </>
    )
    
  )
}

export default Profile