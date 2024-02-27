import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name, email, password }), 
      });

      if (response.ok) {
        navigate('/login');
        alert("Registration successful");
      } else {
        const data = await response.json();
        console.error('Registration failed:', data);
        alert("Registration failed: " + data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert("Error during registration: " + error.message);
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
            <Link to="/login" className="nav-link">Login</Link>
            </ul>
        </div>
    </div>
</nav>
    <form className="form-signin" onSubmit={submit} style={{ maxWidth: '15rem' , margin: '0 auto' }}>
      <h1 className="h3 mb-3 fw-normal">Please register</h1>
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input
        type="email"
        className="form-control"
        placeholder="Email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
    </>
  );
};

export default Register;
