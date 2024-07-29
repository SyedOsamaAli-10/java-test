// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const Dashboard = ({ user, setUser }) => {
  const [data, setData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data'); // Example endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      {user.role === 'admin' ? (
        <div>Admin View</div>
      ) : (
        <div>User View</div>
      )}
      <div>Data: {data}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
