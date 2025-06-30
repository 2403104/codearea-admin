import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ContestContext from '../myContext/contest/ContestContext';

const CreateContest = () => {
  const navigate = useNavigate();
  const { setContest, setContestId } = useContext(ContestContext);

  const [contestData, setContestData] = useState({
    contestName: '',
    organisation: '',
    startDate: '',
    duration: ''
  });

  const handleChange = (e) => {
    setContestData({ ...contestData, [e.target.name]: e.target.value });
  };

  const handleProceed = async () => {
    const url = "http://localhost:3001/admin/create-contest";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token")
        },
        body: JSON.stringify({
          contestName: contestData.contestName,
          organisation: contestData.organisation,
          startDate: contestData.startDate,
          duration: parseInt(contestData.duration)
        })
      });
      const json = await response.json();
      setContest(json.contest);
      setContestId(json.contest._id);
      navigate("/admin/manage-contest");
      setContestData({
        contestName: '',
        organisation: '',
        startDate: '',
        duration: ''
      });
      alert("Contest created successfully!");
    } catch (err) {
      console.error("Error creating contest:", err);
      alert("Failed to create contest");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start" style={{ minHeight: '90vh', paddingTop: '60px', background: '#f8f9fa',width:'100vw' }}>
      <div style={{
        width: '60vw',
        padding: '30px 40px',
        background: '#ffffff',
        border: '1px solid #dee2e6',
        borderRadius: '12px'
      }}>
        <h3 className="text-center fw-bold mb-4" style={{ color: '#2c3e50' }}>Create Contest</h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">Contest Name</label>
          <input
            type="text"
            name="contestName"
            value={contestData.contestName}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., CodeArena 2025"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Start Date & Time</label>
          <input
            type="datetime-local"
            name="startDate"
            value={contestData.startDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Duration (in minutes)</label>
          <input
            type="number"
            name="duration"
            value={contestData.duration}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., 120"
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Organisation</label>
          <input
            type="text"
            name="organisation"
            value={contestData.organisation}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Code University"
          />
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary px-4 py-2" onClick={handleProceed}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContest;
