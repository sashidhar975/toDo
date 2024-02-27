import React, { useState } from 'react';
import {Link , useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';

const Login = ({ setName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        localStorage.setItem('token', data.token);
        navigate('/tasks');
        alert("Login successful");
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div className="container-fluid">
        <Link to="/" className="navbar-brand">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                {!name && <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>}
            </ul>
        </div>
    </div>
</nav>
    <form onSubmit={submit} style={{ maxWidth: '15rem' , margin: '0 auto' }}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <input
        type="email"
        className="form-control"
        placeholder="Email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <input
        type={showPassword ? 'text' : 'password'}
        className="form-control"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
       <Form.Check
        type="switch"
        id="custom-switch"
        label={`Show ${showPassword ? 'Hide' : 'Show'} Password`}
        onChange={togglePasswordVisibility}
      />
      <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
     
    </form>
    </>
  );
};

export default Login;
