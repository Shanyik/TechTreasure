import React, { useState } from 'react'

const GetAllAdsTest = () => {

    const [ads, setAds] = useState(null)

    const handleOnClick = () => {
      fetch('/api/Ad/GetAll', {
        method: 'GET',
        //credentials: 'include',
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
    }

    const handleLogOut = () => {
      fetch('/api/account/logout', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          
      },
      })
        .then(data => {
          console.log(data)
          if(data.status === 200){
            window.location.href = "/"
          }
        })
    }

  return (
    <div className="App">
      <button onClick={() => {handleOnClick()}}>GetAllAds</button>
      <button onClick={() => {handleLogOut()}}>Logout</button>
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
    </div>
  )
}

export default GetAllAdsTest