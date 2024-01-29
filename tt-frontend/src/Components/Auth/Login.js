import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';

const loginFetch = (data) => {
    return fetch(`api/account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();

  const emailHandler = (input) => {
    setEmail(input.target.value);
    console.log(input.target.value);
  };

  const passwordHandler = (input) => {
    setPassword(input.target.value);
    console.log(input.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginHandler();
    }
  }

  const handleGoBack = () => {
    navigate("/")
  }

  const loginHandler = () => {
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    if (data.email === null || data.password === null) {
      setResult("noData")
    } else {
      loginFetch(data).then((res) => {
        console.log(res)
      });
    }

  };



  return (
    <div className="container">
      {
        loading === null ? (
          <>
            <div className="form-heading">Login</div>
            <div id="loginResult" className="form-error">
              {result === false ? "Wrong Email or password" :
                result === "noData" ? "Email/Username and password required!" : ""}
            </div>
            <div className="form-group">
              <label className="form-label">Email:</label>
              <input
                type="text"
                onChange={(e) => {
                  emailHandler(e);
                }}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                type="password"
                onChange={(e) => {
                  passwordHandler(e);
                }}
                onKeyDown={(e) => handleKeyPress(e)}
                className="form-input"
              />
            </div>
            <button onClick={() => (handleGoBack())} className="form-goBack">Go Back</button>
            <button onClick={() => loginHandler()} className="form-submit">Login</button>
          </>
        ) : (
          <>
            <span className="loader">

            </span>
          </>
        )
      }

    </div>
  )
}

export default Login