import React, { useContext, useEffect } from 'react';
import ContestContext from '../myContext/contest/ContestContext';
import ProblemBox from './ProblemBox';

const ViewChallenges = () => {
  const {contestId, contest ,getContest} = useContext(ContestContext);

  console.log(contestId)
  useEffect(() => {
    getContest(contestId);
  }, []);
  
  const challenges = contest?.problems || [];
  return (
    <div className="container mt-4" style={{ maxWidth: '900px' }}>
      
      {challenges.length === 0 ? (
        <p className="text-center text-muted">No challenges added yet.</p>
      ) : (
        challenges.map((challenge, idx) => (
          <ProblemBox key={idx} challenge={challenge} />
        ))
      )}
    </div>
  );
};

export default ViewChallenges;
