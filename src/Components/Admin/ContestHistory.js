import React, { useEffect, useState } from 'react';
import ContestBox from './ContextBox';
import HorizontalLoader from './../HorizontalLoader';

const ContestHistory = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContests = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/admin/get-all-contests');
      const data = await response.json();
      setContests(data.contests || []);
    } catch (err) {
      console.error('Failed to fetch contests:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const currentTime = new Date();
  const upcomingContests = contests.filter(
    c => new Date(c.startDate).getTime() + c.duration * 60000 > currentTime
  );
  const pastContests = contests.filter(
    c => new Date(c.startDate).getTime() + c.duration * 60000 <= currentTime
  );

  return (
    <div style={{ backgroundColor: '#f9fbfd', width: '100vw', minHeight: '100vh', paddingTop: '3rem', paddingBottom: '2rem' }}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '30vh' }}>
          <HorizontalLoader />
        </div>
      ) : (
        <>

          {upcomingContests.length > 0 && (
            <section className="px-4">
              <h5 className="fw-bold mb-3" style={{ color: '#1f2e4d' }}>🚀 Upcoming Contests</h5>
              <div className="d-flex flex-column gap-3">
                {upcomingContests.map((contest) => (
                  <ContestBox key={contest._id} contest={contest} />
                ))}
              </div>
            </section>
          )}

          {pastContests.length > 0 && (
            <section className="px-4 mt-5 pt-4" style={{ borderTop: '1px solid #dfe6ec' }}>
              <h5 className="fw-bold mb-3" style={{ color: '#7f8c8d' }}>📜 Past Contests</h5>
              <div className="d-flex flex-column gap-3">
                {pastContests.map((contest) => (
                  <ContestBox key={contest._id} contest={contest} />
                ))}
              </div>
            </section>
          )}

          {contests.length === 0 && (
            <p className="text-center text-muted fs-5 mt-4">No contests found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ContestHistory;
