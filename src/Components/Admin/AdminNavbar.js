import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth-token'));

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setIsLoggedIn(false);
        window.location.href = '/auth/codearea-login';
    };

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('auth-token'));
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ height: '70px' }}>
            <div className="container">
                <Link className="navbar-brand fs-3 fw-bold text-dark" to="/admin">
                    &lt;/&gt;CodeArea Admin&lt;/&gt;
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="adminNavbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <Link className={`nav-link fs-5 ${location.pathname === "/admin" ? "active border-bottom border-primary" : "text-dark"}`} to="/admin">Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className={`nav-link fs-5 ${location.pathname === "/admin/create-contest" ? "active border-bottom border-primary" : "text-dark"}`} to="/admin/create-contest">Create Contest</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className={`nav-link fs-5 ${location.pathname === "/admin/contest-details" ? "active border-bottom border-primary" : "text-dark"}`} to="/admin/contest-details">Contest History</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className={`nav-link fs-5 ${location.pathname === "/admin/manage-problems" ? "active border-bottom border-primary" : "text-dark"}`} to="/admin/manage-problems">Manage Problems</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        {!isLoggedIn ? (
                            <Link className="btn btn-outline-danger fs-5 px-3" to="/auth/codearea-login">Login</Link>
                        ) : (
                            <button className="btn btn-outline-danger fs-5 px-3" onClick={handleLogout}>Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
