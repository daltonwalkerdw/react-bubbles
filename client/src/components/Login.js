import React, { useState } from "react";

import axios from "axios"

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const login = (e) => {
    e.preventDefault()

    axios
      .post(`http://localhost:5000/api/login`, credentials)
      .then(res => {
        console.log("apiRes", res)
        localStorage.setItem("token", res.data.payload)
        props.history.push('/bubble_page')
      })
      .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div>
        <form onSubmit={login}>
          <label>
            Username: <input
             type="text"
            value={credentials.username} 
            name="username" 
            onChange={handleChange}
            />
          </label>
          <label>
            Password: <input
             type="text"
            value={credentials.password} 
            name="password" 
            onChange={handleChange}
            />
          </label>
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
