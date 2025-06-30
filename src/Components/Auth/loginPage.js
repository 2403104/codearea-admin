import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/admin/codearea-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('auth-token', json.authToken);
      navigate('/admin');
    } else {
      alert(json.error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-5" style={{ width: '360px', borderRadius: '16px' }}>
        <h4 className="text-center mb-4 fw-semibold" style={{ color: '#2C3E50' }}>
          Admin Panel Login
        </h4>

        <div className="form-group mb-3">
          <label className="form-label text-muted">Username</label>
          <input
            type="text"
            name="username"
            className="form-control rounded-3"
            value={credentials.username}
            onChange={onChange}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label text-muted">Password</label>
          <input
            type="password"
            name="password"
            className="form-control rounded-3"
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter password"
          />
        </div>

        <button onClick={handleLogin} className="btn btn-primary w-100 fw-semibold rounded-3">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
