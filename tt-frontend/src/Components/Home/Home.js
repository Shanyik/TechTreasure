import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
       navigate("/login")
    } 

    const handleRegistration = () => {
        navigate("/registration")
     } 
 

  return (
    <>
        <div>Home</div>
        <div>
            <button onClick={() => {handleLogin()}}>Login</button>
            <button onClick={() => {handleRegistration()}}>Registration</button>
        </div>
    </>
  )
}

export default Home