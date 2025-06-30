import React, { useState, useContext, useEffect } from 'react';
import ParticularContestDetails from './ParticularContestDetails';
import AddChallenges from './AddChallenges'
import ViewChallenges from './ViewChallenges';
import ContestContext from '../myContext/contest/ContestContext';
import RegisteredCandidates from './RegisteredCandidates';
import Announcements from './Announcements'
import Submissions from './Submissions';
const ManageContest = () => {
    const {getContest,contestId}=useContext(ContestContext);
    useEffect(()=>{
        getContest(contestId);
    },[getContest])
    const [selectedOption, setSelectedOption] = useState('Contest Details');

    const renderRightPanel = () => {
        switch (selectedOption) {
            case 'Contest Details':
                return (
                    <div className="container">
                        <div><h3 className="mb-4 text-center">Contest Details</h3></div>
                        <ParticularContestDetails />
                    </div>
                )
            case 'Add Challenges':
                return (
                    <>
                        <div><h3 className="mb-4 text-center">Add Challenges</h3></div>
                        <AddChallenges />
                    </>
                )
            case 'View Challenges':
                return (
                    <>
                    <h3 className="mb-4 text-center">All Challenges</h3>
                    <ViewChallenges />
                    </>
                )
            case 'Registered Candidates':
                return (
                    <>
                    <h3 className="mb-4 text-center">Registered Candidates</h3>
                    <RegisteredCandidates/>
                    </>
                )
            case 'Submissions':
                return (
                    <>
                    <h3 className="mb-4 text-center">User Submissions</h3>
                    <Submissions/>
                    </>
                )
            case 'Make Announcements':
                return (
                    <>
                    <Announcements/>
                    </>
                )
            default:
                return <div><h4>Welcome to Contest Management Panel</h4></div>;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '90vh' }}>
            <div style={{
                width: '18vw',
                backgroundColor: '#f8f9fa',
                borderRight: '1px solid #dee2e6',
                padding: '20px'
            }}>
                <h5 className="fw-bold mb-4">Manage Contest</h5>
                <ul className="nav flex-column">
                    {['Contest Details', 'Add Challenges', 'View Challenges','Registered Candidates','Submissions','Make Announcements'].map(option => (
                        <li className="nav-item mb-3" key={option}>
                            <button
                                onClick={() => setSelectedOption(option)}
                                className="w-100 border-0"
                                style={{
                                    backgroundColor: '#e9ecef',
                                    padding: '10px 15px',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease-in-out',
                                    textAlign: 'center',
                                    color: '#212529'
                                }}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ flex: 1, padding: '40px' }}>
                {renderRightPanel()}
            </div>
        </div>
    );
};

export default ManageContest;
