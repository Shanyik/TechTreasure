import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const registrationFetch = (data) => {
    return fetch('/api/User/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const Popup = (message) => {
    return (
        <div className="form-error">
          <div>{message.message}</div>
        </div>
    );
  };

const Registration = () => {

    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [loading, setLoading] = useState(null);
    const [result, setResult] = useState(null);

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate("/")
    } 

    const handleChange = (e, name) => {
        if (name === 'username') setUsername(e.target.value);
        if (name === 'email') setEmail(e.target.value);
        if (name === 'password') setPassword(e.target.value);
        if (name === 'phoneNumber') setPhoneNumber(e.target.value);
        if (name === 'country') setCountry(e.target.value);
        if (name === 'postalCode') setPostalCode(e.target.value);
        if (name === 'state') setState(e.target.value);
        if (name === 'city') setCity(e.target.value);
        if (name === 'street') setStreet(e.target.value);
        if (name === 'lastName') setLastName(e.target.value);
        if (name === 'firstName') setFirstName(e.target.value);
      };

      const registrationHandler = () => {

        const address = country + "," + postalCode + "," + state + "," + city + "," + street;

        const data = {
          username: username,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          address: address,
          lastName: lastName,
          firstName: firstName
        };

        // Check if any of the required fields are empty

        if (
          username.trim() === '' ||
          email.trim() === '' ||
          password.trim() === '' ||
          phoneNumber.trim() === '' ||
          country.trim() === '' ||
          postalCode.trim() === '' ||
          state.trim() === '' ||
          city.trim() === '' ||
          street.trim() === '' 
        ) {
          setResult('One or more fields are empty!');
          return;
        }
    
        // Validation Criteria
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        const phoneNumberRegex = /^\d{9}$/;
        const postalCodeRegex = /^\d{4}$/;

        console.log(emailRegex.test(data.email))
        console.log(passwordRegex.test(data.password))
        console.log(phoneNumberRegex.test(data.phoneNumber))
    
        if (
          !emailRegex.test(data.email) ||
          !passwordRegex.test(data.password) ||
          !phoneNumberRegex.test(data.phoneNumber)
        ) {
          setResult('One or more fields have invalid data!');
        } else {
          console.log(data)
          registrationFetch(data).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              navigate("/")
            }
          });
        }
      };

  return (
    <div style={{ marginTop: '100px', marginBottom: '100px'}} className="container">
      {result && <Popup  message={result} />}
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

          <div className="form-group">
            <label className="form-label">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={(e) => handleChange(e, 'firstName')}
              className="form-input"
            />
            <label className="form-label">Last name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={(e) => handleChange(e, 'lastName')}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              onChange={(e) => handleChange(e, 'country')}
              className="form-input"
            />
            <label className="form-label">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              onChange={(e) => handleChange(e, 'postalCode')}
              className="form-input"
            />
            <label className="form-label">State</label>
            <input
              type="text"
              id="state"
              name="state"
              onChange={(e) => handleChange(e, 'state')}
              className="form-input"
            />
            <label className="form-label">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={(e) => handleChange(e, 'city')}
              className="form-input"
            />
            <label className="form-label">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              onChange={(e) => handleChange(e, 'street')}
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