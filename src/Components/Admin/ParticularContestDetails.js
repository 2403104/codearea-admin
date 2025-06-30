import React, { useContext, useEffect } from 'react';
import ContestContext from '../myContext/contest/ContestContext';
const ParticularContestDetails = () => {
  const {contest,getContest,contestId}=useContext(ContestContext);

  useEffect(() => {
    getContest(contestId);
  }, [getContest]);
  return (
    <div className="d-flex justify-content-center align-items-start mt-5" style={{width:'90%'}}>
      <div className="card shadow-sm p-4" style={{ width: '100%', backgroundColor: '#ffffff', borderRadius: '12px' }}>

        <div className="mb-3">
          <label className="form-label fw-semibold text-secondary">Contest Name</label>
          <div className="border rounded px-3 py-2 bg-light">{contest.contestName || 'N/A'}</div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-secondary">Organisation</label>
          <div className="border rounded px-3 py-2 bg-light">{contest.organisation || 'N/A'}</div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-secondary">Start Date & Time</label>
          <div className="border rounded px-3 py-2 bg-light">
            {contest.startDate ? new Date(contest.startDate).toLocaleString() : 'N/A'}
          </div>
        </div>

        <div className="mb-2">
          <label className="form-label fw-semibold text-secondary">Duration</label>
          <div className="border rounded px-3 py-2 bg-light">{contest.duration} minutes</div>
        </div>
      </div>
    </div>
  );
};

export default ParticularContestDetails;
