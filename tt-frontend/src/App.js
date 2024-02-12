import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetAllAdsTest from './Components/GetAllAdsTest';
import Login from './Components/Auth/Login';
import Registration from './Components/Auth/Registration';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';

function App() {

  return (
    
    <Router>
      <div className='App'>
        <NavBar/>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
          <Route path='/getalladstest' element={<GetAllAdsTest/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registration' element={<Registration/>}></Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
