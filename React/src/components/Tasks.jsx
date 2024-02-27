import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetchTasks();
        fetchUserData();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:5000/api/task')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    const fetchUserData = () => {
        // Fetch user data from local storage or other sources
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    };

    const handleCreateTask = () => {
        axios.post('http://localhost:5000/api/task', { name: newTaskName })
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTaskName('');
            })
            .catch(error => {
                console.error('Error creating task:', error);
            });
    };

    const handleToggleComplete = (taskId) => {
        axios.put(`http://localhost:5000/api/task/${taskId}`)
            .then(response => {
                setTasks(tasks.map(task => 
                    task._id === taskId ? { ...task, completed: !task.completed } : task
                ));
            })
            .catch(error => {
                console.error('Error toggling task completion status:', error);
            });
    };

    const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:5000/api/task/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task._id !== taskId));
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    const handleLogout = () => {
        // Perform logout actions here, such as clearing local storage, etc.
        localStorage.removeItem('userName');
        setUserName('');
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
                <Link to="/logout" className="nav-link">Logout</Link>
                </ul>
            </div>
        </div>
    </nav>
            <div>
                <h1>Task Manager</h1>
                <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Enter task name"
                />
                <button onClick={handleCreateTask}>Add Task</button>
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleComplete(task._id)}
                            />
                            <span
                                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            >
                                {task.name}
                            </span>
                            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            </>
    );
};

export default Task;
