import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ContestContext from '../myContext/contest/ContestContext';

const ContestBox = ({ contest }) => {
  const navigate = useNavigate();
  const { setContestId, getContest } = useContext(ContestContext);

  const handleManageContest = (contest) => {
    setContestId(contest._id);
    getContest(contest._id);
    navigate("/admin/manage-contest");
  };

  const { contestName, organisation, startDate, duration } = contest;

  return (
    <div
      className="mb-3 d-flex flex-row justify-content-between align-items-center px-4 py-3"
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        border: '1px solid #ced4da',
        borderRadius: '10px',
        backgroundColor: '#f8f9fa',
        transition: 'background 0.3s',
      }}
    >
      <div>
        <h5 className="fw-bold mb-2 text-dark">{contestName}</h5>
        {organisation && (
          <p className="text-muted mb-1" style={{ fontSize: '0.95rem' }}>
            {organisation}
          </p>
        )}
        <p className="mb-1">
          <strong>Start:</strong> {new Date(startDate).toLocaleString()}
        </p>
        <p className="mb-0">
          <strong>Duration:</strong> {duration} minutes
        </p>
      </div>

      <div style={{ alignSelf: 'flex-end' }}>
        <button className="btn btn-primary" onClick={() => handleManageContest(contest)}>
          Manage Contest
        </button>
      </div>
    </div>
  );
};

export default ContestBox;
