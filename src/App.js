import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { useEffect, useContext } from 'react';

import AdminNavbar from './Components/Admin/AdminNavbar';
import AdminHome from './Components/Admin/AdminHome';
import CreateContest from './Components/Admin/CreateContest';
import ManageProblem from './Components/Admin/ManageProblem';
import ContestHistory from './Components/Admin/ContestHistory';
import ManageContest from './Components/Admin/ManageContest';

import LoginPage from './Components/Auth/loginPage';
import ContestState from './Components/myContext/contest/ContestState';

function AppContent() {
  const location = useLocation();
  return (
    <>
      <AdminNavbar />
      <div className="container mx-0">
        <Routes>
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/auth/codearea-login" element={<LoginPage />} />
          <Route exact path="/admin/create-contest" element={<CreateContest />} />
          <Route exact path="/admin/manage-problems" element={<ManageProblem />} />
          <Route exact path="/admin/contest-details" element={<ContestHistory />} />
          <Route exact path="/admin/manage-contest" element={<ManageContest />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
      <ContestState>
        <Router>
          <AppContent />
        </Router>
      </ContestState>
  );
}

export default App;
