import React, { useContext, useEffect, useState } from 'react';
import ContestContext from '../myContext/contest/ContestContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Submissions = () => {
  const { contest } = useContext(ContestContext);
  const [expandedIds, setExpandedIds] = useState({});
  const [idToProb, setIdToProb] = useState(new Map());

  useEffect(() => {
    const mp = new Map();
    for (let prob of contest?.problems || []) {
      mp.set(prob._id, prob.title);
    }
    setIdToProb(mp);
  }, [contest]);

  if (!contest?.submissions?.length) {
    return <div className="text-center mt-4">No submissions found.</div>;
  }

  const toggleCodeView = (userIndex, submissionId) => {
    setExpandedIds(prev => ({
      ...prev,
      [`${userIndex}_${submissionId}`]: !prev[`${userIndex}_${submissionId}`]
    }));
  };

  return (
    <div className="container mt-4" >
      {contest.submissions.map((user, userIndex) => (
        <div key={userIndex} className="mb-4">
          <h5 className="fw-bold text-primary mb-3">{user.username}</h5>
          {user.mySubmissions.filter(sub => sub.status === 'Accepted').map((sub) => (
            <div
              key={sub._id}
              className="border rounded p-3 mb-3"
              style={{ backgroundColor: '#e8f5e9', boxShadow: '0 0 6px rgba(0, 128, 0, 0.2)' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <strong>Problem : </strong> {idToProb.get(sub.problemId) || 'Unknown'} <br />
                  <strong>Time : </strong> {sub.time} ms<br/>                  
                  <strong>SubmittedAt : </strong> {sub.submissionTime} ms
                </div>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => toggleCodeView(userIndex, sub._id)}
                >
                  {expandedIds[`${userIndex}_${sub._id}`] ? 'Hide Code' : 'View Code'}
                </button>
              </div>

              {expandedIds[`${userIndex}_${sub._id}`] && sub.code?.[0]?.sourceCode && (
                <SyntaxHighlighter language="cpp" style={coy} customStyle={{ borderRadius: '10px' }}>
                  {sub.code[0].sourceCode}
                </SyntaxHighlighter>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Submissions;
