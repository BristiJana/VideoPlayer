import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
  <div style={{
    background: '#5c6ac4',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <Link to="/" style={{ color: 'white', marginRight: 10 }}>Home</Link>
      {user?.isAdmin && <Link to="/upload" style={{ color: 'white', marginRight: 10 }}>Upload</Link>}
      <Link to="/credits" style={{ color: 'white', marginRight: 10 }}>Credits</Link>
    </div>
    <div>
      {user ? (
        <button
          onClick={logout}
          style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid white',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" style={{ color: 'white', marginRight: 10 }}>Login</Link>
          <Link to="/signup" style={{ color: 'white' }}>Signup</Link>
        </>
      )}
    </div>
  </div>
);
};

export default Navbar;
