import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const CreditPage = () => {
  const [credits, setCredits] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  const token = useMemo(() => localStorage.getItem('token'), []);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/video/credits', {
          headers: { Authorization: token }
        });

        if (user?.isAdmin) {
          setAllUsers(res.data.users);
        } else {
          setCredits(res.data.credits);
        }
      } catch (err) {
        console.error('Error fetching credits', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      {user?.isAdmin ? (
        <>
          <h2>All Users and Credits</h2>
          {allUsers.map(u => (
            <div key={u._id} className="card">
              <b>{u.name}</b> - {u.email} → Credits: <strong>{u.credits}</strong>
            </div>
          ))}
        </>
      ) : (
        <h2>Your Total Credits: {credits}</h2>
      )}
    </div>
  );
};

export default CreditPage;
