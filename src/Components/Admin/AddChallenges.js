import React, { useState, useContext } from 'react';
import ContestContext from '../myContext/contest/ContestContext';
const AddProblem = () => {
  const {contest,contestId,getContest}=useContext(ContestContext);

  const [hiddenTestcases, setHiddenTestcases] = useState([]);
  const [checkerCode, setCheckerCode] = useState('');

  const addHiddenTestcase = () => {
    setHiddenTestcases([...hiddenTestcases, { input: '', expected: '' }]);
  };

  const deleteHiddenTestcase = (idx) => {
    const temp = hiddenTestcases.filter((_, i) => i !== idx);
    setHiddenTestcases(temp);
  };

  const handleHiddenTestcaseChange = (index, field, value) => {
    const temp = [...hiddenTestcases];
    temp[index][field] = value;
    setHiddenTestcases(temp);
  };

  const handleSubmision = async (e) => {
    e.preventDefault();

    const problemData = {
      QNo: 0,
      title: document.getElementById("title").value,
      score: parseInt(document.getElementById("score").value),
      description: document.getElementById("description").value,
      difficulty: document.getElementById("difficulty").value,
      inputFormat: document.getElementById("inputFormat").value,
      outputFormat: document.getElementById("outputFormat").value,
      constraints: document.getElementById("constraints").value.split('\n'),
      topics: document.getElementById("topics").value.split('\n'),
      timeLimit: parseFloat(document.getElementById("timeLimit").value),
      memoryLimit: parseInt(document.getElementById("memoryLimit").value),
      checkerCode,
      sampleTestCases: [
        {
          input: document.getElementById("input1").value,
          output: document.getElementById("output1").value,
          explaination: document.getElementById("explaination1").value,
        },
        {
          input: document.getElementById("input2").value,
          output: document.getElementById("output2").value,
          explaination: document.getElementById("explaination2").value,
        },
      ],
      testcases: hiddenTestcases,
    };

    try {
      const res = await fetch('http://localhost:3001/admin/add-challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contestName:contest.contestName,
          challenge:problemData
        }),
      });
      const data = await res.json();
      alert("Problem added.");

      document.querySelectorAll('textarea').forEach(el => el.value = '');
      setCheckerCode('');
      setHiddenTestcases([]);
    } catch (err) {
      console.error(err);
      alert("Failed to add problem.");
    }
  };

  return (
    <div className="container mt-1 p-4 rounded " style={{ width:'100%' }}>
      <form onSubmit={handleSubmision}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">Title</label>
          <textarea className="form-control" id="title" rows="1" />
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="score" className="form-label fw-bold">Score</label>
            <textarea className="form-control" id="score" rows="1" />
          </div>
          <div className="col-md-4">
            <label htmlFor="difficulty" className="form-label fw-bold">Difficulty</label>
            <textarea className="form-control" id="difficulty" rows="1" />
          </div>
          <div className="col-md-2">
            <label htmlFor="timeLimit" className="form-label fw-bold">Time (s)</label>
            <textarea className="form-control" id="timeLimit" rows="1" />
          </div>
          <div className="col-md-2">
            <label htmlFor="memoryLimit" className="form-label fw-bold">Memory (MB)</label>
            <textarea className="form-control" id="memoryLimit" rows="1" />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">Description</label>
          <textarea className="form-control" id="description" rows="6" />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="inputFormat" className="form-label fw-bold">Input Format</label>
            <textarea className="form-control" id="inputFormat" rows="4" />
          </div>
          <div className="col-md-6">
            <label htmlFor="outputFormat" className="form-label fw-bold">Output Format</label>
            <textarea className="form-control" id="outputFormat" rows="4" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="constraints" className="form-label fw-bold">Constraints</label>
            <textarea className="form-control" id="constraints" rows="3" />
          </div>
          <div className="col-md-6">
            <label htmlFor="topics" className="form-label fw-bold">Topics</label>
            <textarea className="form-control" id="topics" rows="3" />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">Checker Code</label>
          <textarea
            className="form-control font-monospace"
            id="checkerCode"
            value={checkerCode}
            onChange={(e) => setCheckerCode(e.target.value)}
            style={{ fontFamily: 'monospace', whiteSpace: 'pre', minHeight: '200px' }}
            placeholder={`#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Your checker logic\n    return 0;\n}`}
          />
        </div>

        <h5 className="mb-2">Sample Testcase 1</h5>
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Input</label>
            <textarea className="form-control" id="input1" rows="3" />
          </div>
          <div className="col-md-4">
            <label>Output</label>
            <textarea className="form-control" id="output1" rows="3" />
          </div>
          <div className="col-md-4">
            <label>Explanation</label>
            <textarea className="form-control" id="explaination1" rows="3" />
          </div>
        </div>

        <h5 className="mb-2">Sample Testcase 2</h5>
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Input</label>
            <textarea className="form-control" id="input2" rows="3" />
          </div>
          <div className="col-md-4">
            <label>Output</label>
            <textarea className="form-control" id="output2" rows="3" />
          </div>
          <div className="col-md-4">
            <label>Explanation</label>
            <textarea className="form-control" id="explaination2" rows="3" />
          </div>
        </div>

        <h4 className="mt-4">Hidden Testcases</h4>
        {hiddenTestcases.map((testcase, index) => (
          <div key={index} className="mb-3 p-3 border bg-white rounded">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="m-0">Hidden Testcase {index + 1}</h6>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteHiddenTestcase(index)}>Delete</button>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label>Input</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={testcase.input}
                  onChange={(e) => handleHiddenTestcaseChange(index, 'input', e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-2">
                <label>Expected</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={testcase.expected}
                  onChange={(e) => handleHiddenTestcaseChange(index, 'expected', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-success mb-4" onClick={addHiddenTestcase}>
          Add Hidden Testcase
        </button>

        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary px-5 py-2">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProblem;
