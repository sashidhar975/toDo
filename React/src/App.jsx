// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Task from './components/Tasks';


function App() {
  const [userName, setUserName] = useState('');

  const setName = (name) => {
    setUserName(name);
  };

  return (
    <Router>
    <div className="App">
        <Routes>
            <Route path="/" element={<Home name={userName} />} />
            <Route path="/login" element={<Login setName={setUserName} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<Task />} />
        </Routes>
    </div>
</Router>
  );
}

export default App;


