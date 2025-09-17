import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import './App.css';

// Wrapper components to pass navigate function
const LandingPageWrapper = () => {
  const navigate = useNavigate();
  return <LandingPage onNavigate={navigate} />;
};

const SignInWrapper = () => {
  const navigate = useNavigate();
  return <SignIn onNavigate={navigate} />;
};

const SignUpWrapper = () => {
  const navigate = useNavigate();
  return <SignUp onNavigate={navigate} />;
};

const StudentDashboardWrapper = () => {
  const navigate = useNavigate();
  return <StudentDashboard onNavigate={navigate} />;
};

const FacultyDashboardWrapper = () => {
  const navigate = useNavigate();
  return <FacultyDashboard onNavigate={navigate} />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPageWrapper />} />
          <Route path="/signin" element={<SignInWrapper />} />
          <Route path="/signup" element={<SignUpWrapper />} />
          <Route path="/dashboard" element={<StudentDashboardWrapper />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboardWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
