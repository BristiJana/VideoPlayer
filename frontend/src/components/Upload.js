import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [form, setForm] = useState({ title: '', url: '', type: 'youtube' });
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/video/upload', form, {
      headers: { Authorization: token }
    });
    alert('Video uploaded');
    setForm({ title: '', url: '', type: 'youtube' });
  };

  return (
    <div className="container">
      <h2>Upload Video (YouTube URL)</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input name="url" placeholder="YouTube Embed URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
