import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavBar() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    fetch('/api/pingauth', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          
      },
  })
      .then(response => {return response.json()})
      .then(data => {
          if (data !== ""){
            setLoggedIn(true);
          }
      }
      )
      .catch(error => console.log(error))
  }, []);

  const navigate = useNavigate();

  const handleLogin = () => {
     navigate("/login")
  } 

  const handleRegistration = () => {
      navigate("/registration")
   } 

  const handleProfile = () => {
    navigate("/profile")
  }

  const handleCreate = () => {
    navigate("/ad/create")
  }

  const handleSearch = () => {
    //nedd to do
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
    <div>
    <Navbar expand="lg" className="bg-body-tertiary fixed-top" >
      <Container fluid>
        <Navbar.Brand onClick={() => {navigate("/")} } className="me-5">TechTreasure</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex justify-content-center align-items-center flex-grow-1">
            <div className="w-100 d-flex align-items-center justify-content-between"> 
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="success" className="me-5" onClick={() =>{handleSearch()}}>Search</Button>
            </div>
          </Form>
          <div className="d-flex align-items-center justify-content-center">
            {loggedIn ? (
              <div className="d-flex align-items-center">
                <Button variant="success" className="me-2" onClick={() =>{handleCreate()}}>Create Ad</Button>
                <Button variant="warning" className="me-2" onClick={() =>{handleProfile()}}>Profile</Button>
                <Button variant="danger" onClick={() =>{handleLogOut()}}>Sign Out</Button>
              </div>
             ) : (
              <div className="d-flex align-items-center">
                <Button variant="outline-primary" className="me-2" onClick={() =>{handleLogin()}}>Login</Button>
                <Button variant="primary" onClick={() =>{handleRegistration()}}>Register</Button>
              </div>
            )}
            
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavBar;