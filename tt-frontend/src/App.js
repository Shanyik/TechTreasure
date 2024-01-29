import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetAllAdsTest from './Components/GetAllAdsTest';
import Login from './Components/Auth/Login';

function App() {

  

  return (
    
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/getalladstest' element={<GetAllAdsTest/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
