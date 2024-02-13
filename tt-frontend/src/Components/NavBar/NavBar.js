import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick={() => {navigate("/")}}>TechTreasure</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/*
          <Nav
            className="d-flex justify-content-center"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Link" id="navbarScrollingDropdown" >
              <NavDropdown.Item href="#action3">Categories</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">People</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          */}
          <Form className="d-flex flex-grow-1 justify-content-center">
            <div className="w-50"> 
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </div>
          </Form>
          <div className="d-flex align-items-center">
            {loggedIn ? (
              <>
                <Button variant="secondary" className="me-2" onClick={() =>{handleProfile()}}>Profile</Button>
                <Button variant="danger" onClick={() =>{handleLogOut()}}>Sign Out</Button>
              </>
             ) : (
              <>
                <Button variant="outline-primary" className="me-2" onClick={() =>{handleLogin()}}>Login</Button>
                <Button variant="primary" onClick={() =>{handleRegistration()}}>Register</Button>
              </>
            )}
            
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;