import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        { username, password },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter Username"
          />
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Set Password"
          />
          <button>Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
