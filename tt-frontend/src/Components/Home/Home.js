import React, { useEffect, useState } from 'react'

const Home = () => {

  const [ads, setAds] = useState(null)

  useEffect(() => {
    fetch('/api/Ad/GetAll', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          
      },
  })
      .then(response => {return response.json()})
      .then(data => {
          setAds(data)
          console.log(data);
      }
      )
      .catch(error => console.log(error))
  }, []);
 
  return (
    <>
        <div>Home</div>
        {
        ads ? (
          ads.map((ad) => (
            <>
              <p>id: {ad.id}</p>
              <p>name: {ad.name}</p>
              <p>description: {ad.description}</p>
            </>
          ))
        ) : (
          <p>Waiting for connection...</p>
        )
      }
    </>
  )
}

export default Home