import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const loginFetch = (data, loginurl) => {
    return fetch(loginurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
  };

  const Popup = (message) => {
    return (
        <div className="form-error">
          <div>{message.message}</div>
        </div>
    );
  };

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [loading, setLoading] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e, name) => {
    if (name === "username") setusername(e.target.value);
    if (name === "password") setPassword(e.target.value);
    if (name === "rememberme") setRememberme(e.target.checked);
};

  const handleGoBack = () => {
    navigate("/")
  }

  const loginHandler = () => {
    const data = {
      email: username,
      password: password,
    };

    var loginurl = "";
      if (rememberme == true)
        loginurl = "/api/account/login?useCookies=true";
      else
        loginurl = "/api/account/login?useSessionCookies=true";

    console.log(data);
    if (data.username === "" || data.password === "") {
      setResult("One or more fields are empty!")
    } else {
      loginFetch(data, loginurl).then((res) => {
        console.log(res);
        if (res.status === 200){
          window.location.href = "/"
        }else {
          setResult("Wrong username / password!")
        }
        
      });
    }

  };



  return (
    <div className="container">
      {result && <Popup  message={result} />}
      {
        loading === null ? (
          <>
            <div className="form-heading">Login</div>
            <div id="loginResult" className="form-error">
            <div id="loginResult" className="form-error">
            </div>
            </div>
            <div className="form-group">
              <label className="form-label">Username:</label>
              <input
                type="username"
                id="eusername"
                name="username"
                onChange={(e) => handleChange(e, "username")}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => handleChange(e, "password")}
                className="form-input"
              />
            </div>
            <div>
                <input
                type="checkbox"
                id="rememberme"
                name="rememberme"
                onChange={(e) => handleChange(e, "rememberme")} /><span>Remember Me</span>
            </div>
            <button onClick={() => handleGoBack()} className="form-goBack">Go Back</button>
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