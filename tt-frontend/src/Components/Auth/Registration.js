import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const registrationFetch = (data) => {
    return fetch('/api/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

const Registration = () => {

    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(null);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e, name) => {
        if (name === 'username') setUsername(e.target.value);
        if (name === 'email') setEmail(e.target.value);
        if (name === 'password') setPassword(e.target.value);
        if (name === 'phoneNumber') setPhoneNumber(e.target.value);
      };
    const handleGoBack = () => {
        navigate("/")
    }

      const registrationHandler = () => {
        const data = {
          username: username,
          email: email,
          password: password,
          phoneNumber: phoneNumber
        };
    
        // Validation Criteria
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        const phoneNumberRegex = /^\d{9}$/;

        console.log(emailRegex.test(data.email))
        console.log(passwordRegex.test(data.password))
        console.log(phoneNumberRegex.test(data.phoneNumber))
    
        if (
          !emailRegex.test(data.email) ||
          !passwordRegex.test(data.password) ||
          !phoneNumberRegex.test(data.phoneNumber)
        ) {
          setResult('invalidData');
        } else {
          registrationFetch(data).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              navigate("/")
            }
          });
        }
      };

  return (
    <div className="container">
      {loading === null ? (
        <>
          <div className="form-heading">Registration</div>
          <div id="registrationResult" className="form-error">
            {result === 'invalidData' ? 'Invalid data provided' : ''}
          </div>
          <div className="form-group">
            <label className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => handleChange(e, 'username')}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => handleChange(e, 'email')}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => handleChange(e, 'password')}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={(e) => handleChange(e, 'phoneNumber')}
              className="form-input"
            />
          </div>
          <button onClick={() => handleGoBack()} className="form-goBack">
            Go Back
          </button>
          <button onClick={() => registrationHandler()} className="form-submit">
            Register
          </button>
        </>
      ) : (
        <>
          <span className="loader"></span>
        </>
      )}
    </div>
  );
}

export default Registration