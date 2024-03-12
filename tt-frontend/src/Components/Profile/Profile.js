import React, { useEffect, useState } from 'react'
import ShowAds from '../ShowAds/ShowAds';

const Profile = () => {

    const [user, setUser] = useState("");
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
        <div>
            <hr style={{ width: '50%', margin: 'auto', marginTop: '30px', marginBottom: '30px' }}/>
            <div className="text-center mb-4">
                <h1>Your Ads</h1>
            </div>
                <ShowAds user={user}/>
        </div>
            </>
    ) : (
        //loading
    <></>
    )
    
  )
}

export default Profile