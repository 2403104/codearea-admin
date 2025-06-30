import React, { useContext, useState, useEffect } from 'react';
import ContestContext from '../myContext/contest/ContestContext';

const Announcements = () => {
  const { contest } = useContext(ContestContext);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const handlePost = async () => {
    if (!newAnnouncement.trim()) return;

    try {
      const url = `http://localhost:3001/admin/announce/${contest._id}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newAnnouncement.trim() })
      });

      const json = await res.json();

      if (json.success) {
        setAnnouncements([{ text: newAnnouncement.trim(), announcedAt: new Date() }, ...announcements]);
        setNewAnnouncement('');
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (contest?.announcements) {
      setAnnouncements(contest.announcements);
    }
  }, [contest]);

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <div className="card p-4">
        <h4 className="fw-bold mb-4">Make Announcement</h4>
        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Type your announcement here..."
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={handlePost}>Post Announcement</button>
          <button className="btn btn-outline-secondary" onClick={() => setNewAnnouncement('')}>Clear</button>
        </div>
      </div>

      {announcements.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-3 text-secondary">Previous Announcements</h5>
          <ul className="list-group">
            {announcements.map((a, i) => (
              <li key={i} className="list-group-item">
                <div className="fw-semibold mb-1">{a.text}</div>
                <small className="text-muted">Posted on {new Date(a.announcedAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Announcements;
