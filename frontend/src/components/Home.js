import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/video', {
      headers: { Authorization: token }
    }).then(res => setVideos(res.data));
  }, []);

  return (
    <div className="container">
      <h2>All Videos</h2>
      {videos.map(v => (
        <div key={v._id} className="card">
          <h4>{v.title}</h4>
          <Link to={`/video/${v._id}`}><button>Watch</button></Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
