import React, { useContext } from 'react';
import ContestContext from '../myContext/contest/ContestContext';

const RegisteredCandidates = () => {
  const { contest } = useContext(ContestContext);

  const candidates = contest?.registeredCandidate || [];

  return (
    <div className="container mt-4">

      {candidates.length === 0 ? (
        <p className="text-center text-muted">No candidates have registered yet.</p>
      ) : (
        <table className="table borderless text-center">
          <tbody>
            <tr className="d-flex flex-wrap justify-content-start gap-3 px-2">
              {candidates.map((candidate, idx) => (
                <td
                  key={candidate._id || idx}
                  className="p-3 border rounded"
                  style={{
                    minWidth: '150px',
                    maxWidth: '200px',
                    backgroundColor: '#f0f8ff',
                    fontWeight: '500',
                    color: '#34495e',
                    fontSize: '1rem',
                    borderRadius: '10px'
                  }}
                >
                  {candidate.username}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegisteredCandidates;
