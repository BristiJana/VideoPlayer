import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Upload from './components/Upload';
import VideoPlayer from './components/VideoPlayer';
import CreditPage from './components/CreditPage';
import Navbar from './components/Navbar';
import './styles.css';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={user?.isAdmin === true ? <Upload /> : <Navigate to="/" />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/credits" element={<CreditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
