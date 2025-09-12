import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EditProfileModal from './EditProfileModal';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: 'USER',
    age: '',
    gender: '',
    profileHeadline: '',
    collegeName: '',
    year: '',
    degree: '',
    passingYear: '',
    profilePhoto: null
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (newUserData) => {
    setUserData(newUserData);
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent userData={userData} onEditProfile={handleEditProfile} />;
      case 'courses':
        return <CoursesContent />;
      case 'certificates':
        return <CertificatesContent />;
      default:
        return <ProfileContent userData={userData} onEditProfile={handleEditProfile} />;
    }
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-left">
          <div className="header-title">
            <div className="book-icon">📚</div>
            <h1>Student Dashboard</h1>
          </div>
        </div>
        
        <div className="header-right">
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input" />
            <div className="search-icon">🔍</div>
          </div>
          
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <div className="notification-icon">
            🔔
            <span className="notification-badge">2</span>
          </div>
          
          <div className="profile-icon">
            <div className="profile-avatar">S</div>
            <span className="profile-badge">1</span>
          </div>
        </div>
      </motion.header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <motion.aside 
          className="sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="nav-icon">👤</span>
              <span className="nav-text">Profile</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <span className="nav-icon">📖</span>
              <span className="nav-text">Courses</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'certificates' ? 'active' : ''}`}
              onClick={() => setActiveTab('certificates')}
            >
              <span className="nav-icon">🏆</span>
              <span className="nav-text">Certificates</span>
            </button>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <motion.main 
          className="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {renderContent()}
        </motion.main>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        userData={userData}
      />
    </div>
  );
};

// Profile Content Component
const ProfileContent = ({ userData, onEditProfile }) => {
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  return (
    <div className="profile-content">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar-large">
            {userData.profilePhoto ? (
              <img 
                src={userData.profilePhoto} 
                alt="Profile" 
                className="profile-photo"
              />
            ) : (
              <div className="avatar-circle">{getInitials(userData.name)}</div>
            )}
            <button className="edit-avatar">✏️</button>
          </div>
          
          <div className="profile-details">
            <h2 className="username">{userData.name}</h2>
            {userData.profileHeadline && (
              <p className="profile-headline">{userData.profileHeadline}</p>
            )}
            {userData.age && (
              <p className="profile-age">Age: {userData.age}</p>
            )}
            {userData.gender && (
              <p className="profile-gender">Gender: {userData.gender}</p>
            )}
          </div>
          
          <div className="institution-info">
            {userData.collegeName && (
              <div className="institution">
                <span className="location-icon">📍</span>
                <span>{userData.collegeName}</span>
              </div>
            )}
            {userData.year && (
              <div className="year">Year: {userData.year}</div>
            )}
            {userData.degree && (
              <div className="degree">Degree: {userData.degree}</div>
            )}
            {userData.passingYear && (
              <div className="passing-year">Passing Year: {userData.passingYear}</div>
            )}
          </div>
          
          <button className="edit-profile-btn" onClick={onEditProfile}>
            <span>✏️</span>
            Edit Profile
          </button>
        </div>
      </div>

      <div className="performance-metrics">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-value">6</div>
          <div className="metric-label">Coding Score</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-value">3</div>
          <div className="metric-label">Problem Solved</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">⭐</div>
          <div className="metric-value">--</div>
          <div className="metric-label">Contest Rating</div>
        </div>
      </div>

      <div className="campus-mantri">
        <p>Apply for Campus Mantri</p>
      </div>
    </div>
  );
};

// Courses Content Component
const CoursesContent = () => {
  return (
    <div className="courses-content">
      <h2 className="section-title">Courses</h2>
      <div className="courses-grid">
        <div className="course-card">
          <div className="course-icon">🎯</div>
          <h3>GfG 160 Daily DSA Problems</h3>
          <p>Master Data Structures and Algorithms</p>
        </div>
        
        <div className="course-card">
          <div className="course-icon">🎯</div>
          <h3>GfG 160 - 160 Days of Problem Solving</h3>
          <p>Comprehensive Problem Solving Course</p>
        </div>
        
        <div className="course-card">
          <div className="course-icon">🎯</div>
          <h3>Advanced DSA Concepts</h3>
          <p>Deep dive into advanced algorithms</p>
        </div>
      </div>
    </div>
  );
};

// Certificates Content Component
const CertificatesContent = () => {
  return (
    <div className="certificates-content">
      <h2 className="section-title">Certificates</h2>
      <div className="certificates-grid">
        <div className="certificate-card">
          <div className="certificate-icon">🏆</div>
          <h3>GfG 160 Daily DSA Problems</h3>
          <p>Certificate of Completion</p>
        </div>
        
        <div className="certificate-card">
          <div className="certificate-icon">🏆</div>
          <h3>GfG 160 - 160 Days of Problem Solving</h3>
          <p>Certificate of Excellence</p>
        </div>
        
        <div className="certificate-card">
          <div className="certificate-icon">🏆</div>
          <h3>Advanced DSA Concepts</h3>
          <p>Advanced Level Certificate</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
