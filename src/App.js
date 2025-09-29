import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard';
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

const AdminDashboardWrapper = () => {
  const navigate = useNavigate();
  return <AdminDashboard onNavigate={navigate} />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPageWrapper />} />
            <Route path="/signin" element={<SignInWrapper />} />
            <Route path="/signup" element={<SignUpWrapper />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <StudentDashboardWrapper />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty-dashboard" 
              element={
                <ProtectedRoute>
                  <FacultyDashboardWrapper />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboardWrapper />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
