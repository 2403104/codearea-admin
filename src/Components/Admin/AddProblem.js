import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AddProblem = () => {
  const [hiddenTestcases, setHiddenTestcases] = useState([]);
  const [checkerCode, setCheckerCode] = useState('');

  const addHiddenTestcase = () => {
    setHiddenTestcases([...hiddenTestcases, { input: '', expected: '' }]);
  };

  const deleteHiddenTestcase = (idx) =>
    setHiddenTestcases(hiddenTestcases.filter((_, i) => i !== idx));

  const handleHiddenTestcaseChange = (index, field, value) => {
    const temp = [...hiddenTestcases];
    temp[index][field] = value;
    setHiddenTestcases(temp);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const problemData = {
      QNo: 0,
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      difficulty: document.getElementById('difficulty').value,
      inputFormat: document.getElementById('inputFormat').value,
      outputFormat: document.getElementById('outputFormat').value,
      constraints: document.getElementById('constraints').value.split('\n'),
      topics: document.getElementById('topics').value.split('\n'),
      timeLimit: document.getElementById('timeLimit').value,
      memoryLimit: document.getElementById('memoryLimit').value,
      checkerCode,
      sampleTestCases: [
        {
          input: document.getElementById('input1').value,
          output: document.getElementById('output1').value,
          explanation: document.getElementById('explaination1').value,
        },
        {
          input: document.getElementById('input2').value,
          output: document.getElementById('output2').value,
          explanation: document.getElementById('explaination2').value,
        },
      ],
      testcases: hiddenTestcases,
    };
    try {
      const res = await fetch('http://localhost:3001/admin/add-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(problemData),
      });
      await res.json();
      alert('✅ Problem added successfully!');
      document.querySelectorAll('textarea').forEach((el) => (el.value = ''));
      setCheckerCode('');
      setHiddenTestcases([]);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add problem.');
    }
  };

  return (
    <div className="container mt-4 p-4 shadow rounded bg-light">
      <form onSubmit={handleSubmission}>
        <div className="mb-3">
          <label htmlFor="title"><h5>Problem Title</h5></label>
          <textarea className="form-control" id="title" rows="1" required />
        </div>

        <div className="mb-3 d-flex align-items-center gap-3">
          <div className="flex-fill">
            <label htmlFor="difficulty"><h5>Difficulty</h5></label>
            <select className="form-control" id="difficulty" defaultValue="Easy">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="flex-fill">
            <label htmlFor="timeLimit"><h5>Time Limit (s)</h5></label>
            <input type="number" className="form-control" id="timeLimit" defaultValue={1} required />
          </div>
          <div className="flex-fill">
            <label htmlFor="memoryLimit"><h5>Memory Limit (MB)</h5></label>
            <input type="number" className="form-control" id="memoryLimit" defaultValue={256} required />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description"><h5>Description</h5></label>
          <textarea className="form-control" id="description" rows="8" required />
        </div>

        <div className="mb-3 row gx-2">
          <div className="col">
            <label htmlFor="inputFormat"><h5>Input Format</h5></label>
            <textarea className="form-control" id="inputFormat" rows="6" required />
          </div>
          <div className="col">
            <label htmlFor="outputFormat"><h5>Output Format</h5></label>
            <textarea className="form-control" id="outputFormat" rows="6" required />
          </div>
        </div>

        <div className="mb-3">
          <label><h5>Constraints</h5></label>
          <textarea className="form-control" id="constraints" rows="2" placeholder="One per line" />
        </div>

        <div className="mb-3">
          <label><h5>Topics</h5></label>
          <textarea className="form-control" id="topics" rows="2" placeholder="One per line" />
        </div>

        <div className="mb-3">
          <h4>Checker Code</h4>
          <SyntaxHighlighter language="cpp" style={coy} className="rounded">
            {checkerCode || `#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n  // Checker logic\n  return 0;\n}`}
          </SyntaxHighlighter>
          <textarea
            id="checkerCode"
            className="form-control font-monospace mt-2"
            style={{ minHeight: '200px' }}
            value={checkerCode}
            onChange={(e) => setCheckerCode(e.target.value)}
            placeholder="Write your checker code here…"
          />
        </div>

        <h4>Sample Testcase 1</h4>
        {[1, 2].map((n) => (
          <div key={n} className="mb-3 row gx-2">
            <div className="col">
              <label htmlFor={`input${n}`}><h6>Input</h6></label>
              <textarea className="form-control" id={`input${n}`} rows="4" />
            </div>
            <div className="col">
              <label htmlFor={`output${n}`}><h6>Output</h6></label>
              <textarea className="form-control" id={`output${n}`} rows="4" />
            </div>
            <div className="col">
              <label htmlFor={`explaination${n}`}><h6>Explanation</h6></label>
              <textarea className="form-control" id={`explaination${n}`} rows="4" />
            </div>
          </div>
        ))}

        <h4>Hidden Testcases</h4>
        {hiddenTestcases.map((tc, idx) => (
          <div key={idx} className="mb-3 p-3 border rounded bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Testcase {idx + 1}</h5>
              <button
                type="button"
                className="btn btn-danger btn-sm fw-bolder"
                onClick={() => deleteHiddenTestcase(idx)}
              >
                Delete
              </button>
            </div>
            <div className="row gx-2">
              {['input', 'expected'].map((f) => (
                <div className="col" key={f}>
                  <label><h6>{f.charAt(0).toUpperCase() + f.slice(1)}</h6></label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={tc[f]}
                    onChange={(e) => handleHiddenTestcaseChange(idx, f, e.target.value)}
                    placeholder={f === 'input' ? 'Hidden input' : 'Expected output'}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-success mb-3"
          onClick={addHiddenTestcase}
        >
          + Add Hidden Testcase
        </button>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-5 py-2">
            Submit Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProblem;
