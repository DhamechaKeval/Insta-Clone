import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const { handleRegister, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister(username, email, password);
    navigate("/login");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading..</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
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
              setemail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Enter email"
          />
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Set Password"
          />
          <button className="button register-button">Register</button>
        </form>
        <p>
          Alrady have an account?{" "}
          <Link className="toggleAuthForm" to="/">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
