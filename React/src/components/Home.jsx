import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ name }) => {
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
                            {!name && <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>}
                            {!name && <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='main'>
                {name ? `Hi ${name}! Welcome` : 'You are not logged in'}
            </div>
        </>
    );
};

export default Home;
