import React, { useState,useEffect,useContext } from 'react';
import ContestContext from '../myContext/contest/ContestContext';
const ProblemBox = ({ challenge }) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded(!expanded);
  return (
    <div className="card mb-4 border-0 shadow" style={{ backgroundColor: '#ffffff', borderRadius: '2px' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0 text-primary">{challenge.title}</h5>
          <span className={`badge ${challenge.difficulty === 'Hard' ? 'bg-danger' : challenge.difficulty === 'Medium' ? 'bg-warning text-dark' : 'bg-success'}`}>
            {challenge.difficulty}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-3 text-muted small">
          <span><strong>Score:</strong> {challenge.score}</span>
          <span><strong>QNo:</strong> {challenge.QNo}</span>
          <span><strong>Time:</strong> {challenge.timeLimit}s</span>
          <span><strong>Memory:</strong> {challenge.memoryLimit}MB</span>
        </div>

        {expanded && (
          <>
            <hr />
            <p><strong>Description:</strong><br />{challenge.description}</p>
            <p><strong>Input Format:</strong><br />{challenge.inputFormat}</p>
            <p><strong>Output Format:</strong><br />{challenge.outputFormat}</p>
            <p><strong>Constraints:</strong><br />{challenge.constraints?.join(', ')}</p>
            <p><strong>Topics:</strong><br />{challenge.topics?.join(', ')}</p>

            <div className="mb-3">
              <strong>Checker Code:</strong>
              <pre className="bg-light p-3 rounded text-dark" style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                {challenge.checkerCode}
              </pre>
            </div>

            <div className="mb-3">
              <strong>Sample Test Cases:</strong>
              {challenge.sampleTestCases?.map((test, idx) => (
                <div key={idx} className="bg-light border rounded p-2 mb-2">
                  <p><strong>Input:</strong> <pre>{test.input}</pre></p>
                  <p><strong>Output:</strong> <pre>{test.output}</pre></p>
                  <p><strong>Explanation:</strong> <pre>{test.explaination}</pre></p>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <strong>Hidden Test Cases:</strong>
              {challenge.testcases?.map((test, idx) => (
                <div key={idx} className="bg-light border rounded p-2 mb-2">
                  <p><strong>Input:</strong> <pre>{test.input}</pre></p>
                  <p><strong>Expected:</strong> <pre>{test.expected}</pre></p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-end">
          <button className="btn btn-outline-primary btn-sm" onClick={handleToggle}>
            {expanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemBox;
