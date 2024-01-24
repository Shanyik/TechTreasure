import { useState } from 'react';
import './App.css';

function App() {

  const [ads, setAds] = useState(null)

  const handleOnClick = () => {
    fetch('api/Ad/GetAll', {
      method: 'GET',
  })
      .then(response => {return response.json()})
      .then(data => {
          setAds(data)
          console.log(data);
      }
      )
      .catch(error => console.log(error))
  }

  return (
    
    <div className="App">
      <button onClick={() => {handleOnClick()}}>GetAllAds</button>
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
    
  );
}

export default App;
