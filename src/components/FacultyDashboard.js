import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FacultyEditProfileModal from './FacultyEditProfileModal';
import FacultyProfileSetupModal from './FacultyProfileSetupModal';
import AccountSettings from './AccountSettings';
import FacultyApprovalPanel from './FacultyApprovalPanel';
import AnalyticsReporting from './AnalyticsReporting';
import dashboardLogo from '../Assets/dashboard-logo.png';
import logoDark from '../Assets/logo-dark.png';
import './StudentDashboard.css'; // Reusing the same CSS for consistency
import './FacultyDashboard.css'; // Faculty-specific styles

const FacultyDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Faculty-specific data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@university.edu",
      year: "3rd Year",
      department: "Computer Science",
      courses: ["Data Structures", "Algorithms"],
      achievements: 5,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      year: "2nd Year",
      department: "Computer Science",
      courses: ["Web Development", "Database Systems"],
      achievements: 3,
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@university.edu",
      year: "4th Year",
      department: "Computer Science",
      courses: ["Machine Learning", "AI"],
      achievements: 8,
      lastActive: "3 hours ago"
    }
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Data Structures and Algorithms",
      code: "CS301",
      semester: "Fall 2024",
      students: 45,
      status: "active"
    },
    {
      id: 2,
      name: "Web Development",
      code: "CS302",
      semester: "Fall 2024",
      students: 38,
      status: "active"
    },
    {
      id: 3,
      name: "Machine Learning",
      code: "CS401",
      semester: "Spring 2024",
      students: 32,
      status: "completed"
    }
  ]);

  const [userData, setUserData] = useState({
    name: 'FACULTY',
    age: '',
    gender: '',
    profileHeadline: '',
    collegeName: '',
    degree: '',
    passingYear: '',
    department: '',
    designation: '',
    experience: '',
    subjectsTaught: [],
    skills: [],
    profilePhoto: null,
    linkedinUrl: '',
    email: ''
  });

  // Check if profile setup is needed on component mount
  useEffect(() => {
    const profileCompleted = localStorage.getItem('facultyProfileCompleted');
    const isProfileIncomplete = !profileCompleted && (!userData.name || userData.name === 'FACULTY' || 
                               !userData.department || !userData.designation);
    setIsProfileSetupOpen(isProfileIncomplete);
  }, [userData]);

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

  const handleProfileSetupComplete = (newUserData) => {
    setUserData(newUserData);
    setIsProfileSetupOpen(false);
    // Store profile completion status in localStorage
    localStorage.setItem('facultyProfileCompleted', 'true');
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleMarkAllAsRead = () => {
    setUnreadCount(0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const allItems = [...students, ...courses];
    const filtered = allItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.email && item.email.toLowerCase().includes(query.toLowerCase())) ||
      (item.code && item.code.toLowerCase().includes(query.toLowerCase()))
    );
    
    setSearchResults(filtered);
    setIsSearchOpen(true);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '') {
      setIsSearchOpen(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 200);
  };

  const handleSignOut = () => {
    // Clear any stored data
    localStorage.removeItem('facultyProfileCompleted');
    // Redirect to sign in page
    if (onNavigate) {
      onNavigate('/signin');
    }
  };

  const notifications = [
    {
      id: 1,
      type: 'student_submission',
      title: 'New Assignment Submission',
      message: 'John Doe submitted assignment for Data Structures course',
      time: '1 hour ago',
      icon: '📝',
      unread: true
    },
    {
      id: 2,
      type: 'course_update',
      title: 'Course Registration Update',
      message: '5 new students enrolled in Web Development course',
      time: '3 hours ago',
      icon: '👥',
      unread: true
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Student Achievement',
      message: 'Jane Smith earned a certificate in Database Systems',
      time: '5 hours ago',
      icon: '🏆',
      unread: true
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Upcoming Deadline',
      message: 'Assignment deadline for Machine Learning course is tomorrow',
      time: '1 day ago',
      icon: '⏰',
      unread: false
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'New features added to faculty dashboard',
      time: '2 days ago',
      icon: '✨',
      unread: false
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <FacultyProfileContent 
          userData={userData} 
          onEditProfile={handleEditProfile}
          students={students}
          courses={courses}
          setActiveTab={setActiveTab}
        />;
      case 'students':
        return <StudentsContent 
          students={students}
          setStudents={setStudents}
        />;
      case 'courses':
        return <FacultyCoursesContent 
          courses={courses}
          setCourses={setCourses}
        />;
      case 'approvals':
        return <FacultyApprovalPanel onApprovalUpdate={(data) => console.log('Approval updated:', data)} />;
      case 'reporting':
        return <AnalyticsReporting onReportGenerate={(data) => console.log('Report generated:', data)} />;
      case 'settings':
        return <AccountSettings 
          userData={userData}
          onUserDataUpdate={setUserData}
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
          onNotificationSettingsUpdate={(settings) => console.log('Notification settings updated:', settings)}
          onPrivacySettingsUpdate={(settings) => console.log('Privacy settings updated:', settings)}
          onAccountSettingsUpdate={(settings) => console.log('Account settings updated:', settings)}
          onSignOut={handleSignOut}
        />;
      default:
        return <FacultyProfileContent 
          userData={userData} 
          onEditProfile={handleEditProfile}
          students={students}
          courses={courses}
          setActiveTab={setActiveTab}
        />;
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
          <div className="dashboard-logo-container">
            <img 
              src={isDarkMode ? dashboardLogo : logoDark} 
              alt="EduFolio Logo" 
              className="dashboard-logo"
            />
          </div>
          <div className="header-title">
            <h1>Faculty Dashboard</h1>
          </div>
        </div>
        
        <div className="header-right">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search students, courses..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            <div className="search-icon"><i className="bi bi-search"></i></div>
          </div>
          
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>}
          </button>
          
          <div className="notification-icon" onClick={toggleNotification}>
            <i className="bi bi-bell-fill"></i>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
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
              <span className="nav-icon"><i className="bi bi-person-fill"></i></span>
              <span className="nav-text">Profile</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              <span className="nav-icon"><i className="bi bi-people-fill"></i></span>
              <span className="nav-text">Students</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <span className="nav-icon"><i className="bi bi-book-fill"></i></span>
              <span className="nav-text">Courses</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'approvals' ? 'active' : ''}`}
              onClick={() => setActiveTab('approvals')}
            >
              <span className="nav-icon"><i className="bi bi-check-circle"></i></span>
              <span className="nav-text">Approvals</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'reporting' ? 'active' : ''}`}
              onClick={() => setActiveTab('reporting')}
            >
              <span className="nav-icon"><i className="bi bi-file-earmark-text"></i></span>
              <span className="nav-text">Reporting</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className="nav-icon"><i className="bi bi-gear-fill"></i></span>
              <span className="nav-text">Account Settings</span>
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

      {/* Profile Setup Modal */}
      <FacultyProfileSetupModal
        isOpen={isProfileSetupOpen}
        onComplete={handleProfileSetupComplete}
      />

      {/* Edit Profile Modal */}
      <FacultyEditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        userData={userData}
      />

      {/* Notification Popup */}
      {isNotificationOpen && (
        <div className="notification-popup">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button 
              className="close-notification-btn"
              onClick={() => setIsNotificationOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="notification-content">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.unread ? 'unread' : ''}`}
              >
                <div className="notification-icon-item">
                  <span className="notification-type-icon">{notification.icon}</span>
                </div>
                
                <div className="notification-details">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">{notification.time}</div>
                </div>
                
                {notification.unread && (
                  <div className="unread-indicator"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="notification-footer">
            <button 
              className="mark-all-read-btn"
              onClick={handleMarkAllAsRead}
            >
              Mark All as Read
            </button>
            <button className="view-all-btn">View All</button>
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isSearchOpen && searchResults.length > 0 && (
        <div className="search-results-dropdown">
          <div className="search-results-header">
            <h4>Search Results</h4>
            <span className="results-count">{searchResults.length} found</span>
          </div>
          
          <div className="search-results-list">
            {searchResults.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="search-result-item"
                onClick={() => {
                  if (item.email) {
                    setActiveTab('students');
                  } else if (item.code) {
                    setActiveTab('courses');
                  }
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
              >
                <div className="result-icon">
                  {item.email ? '👨‍🎓' : '📚'}
                </div>
                <div className="result-details">
                  <div className="result-name">{item.name}</div>
                  <div className="result-platform">
                    {item.email ? item.department : item.code}
                  </div>
                  <div className="result-type">
                    {item.email ? 'Student' : 'Course'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Faculty Profile Content Component
const FacultyProfileContent = ({ userData, onEditProfile, students, courses, setActiveTab }) => {
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'F';
  };

  const activeCourses = courses.filter(course => course.status === 'active');
  const totalStudents = students.length;
  const totalAchievements = students.reduce((sum, student) => sum + student.achievements, 0);

  return (
    <div className="faculty-profile-content">
      <div className="faculty-profile-card">
        <div className="faculty-profile-main">
          <div className="faculty-profile-left">
            <div className="faculty-profile-avatar-large">
              {userData.profilePhoto ? (
                <img 
                  src={userData.profilePhoto} 
                  alt="Profile" 
                  className="profile-photo"
                />
              ) : (
                <div className="avatar-circle">{getInitials(userData.name)}</div>
              )}
              <div className="profile-edit-icon">
                <i className="bi bi-pencil-square"></i>
              </div>
            </div>
            <h2 className="faculty-username">{userData.name || 'Faculty Member'}</h2>
          </div>
          
          <div className="faculty-profile-center">
            <div className="faculty-institution-info">
              {userData.collegeName && (
                <div className="faculty-info-item">
                  <span className="faculty-info-label">Institution:</span>
                  <span className="faculty-info-value">{userData.collegeName}</span>
                </div>
              )}
              {userData.designation && (
                <div className="faculty-info-item">
                  <span className="faculty-info-label">Designation:</span>
                  <span className="faculty-info-value">{userData.designation}</span>
                </div>
              )}
              {userData.degree && (
                <div className="faculty-info-item">
                  <span className="faculty-info-label">Degree:</span>
                  <span className="faculty-info-value">{userData.degree}</span>
                </div>
              )}
              {userData.passingYear && (
                <div className="faculty-info-item">
                  <span className="faculty-info-label">Passing Year:</span>
                  <span className="faculty-info-value">{userData.passingYear}</span>
                </div>
              )}
              {userData.experience && (
                <div className="faculty-info-item">
                  <span className="faculty-info-label">Experience:</span>
                  <span className="faculty-info-value">{userData.experience} years</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="faculty-profile-right">
            <button className="faculty-edit-profile-btn" onClick={onEditProfile}>
              <i className="bi bi-pencil-square"></i>
              Edit Profile
            </button>
            <div className="faculty-profile-stats">
              <div className="faculty-stat-section">
                <span className="faculty-stat-label">Total Students:</span>
                <span className="faculty-stat-value">{totalStudents}</span>
              </div>
              <div className="faculty-stat-section">
                <span className="faculty-stat-label">Active Courses:</span>
                <span className="faculty-stat-value">{activeCourses.length}</span>
              </div>
              <div className="faculty-stat-section">
                <span className="faculty-stat-label">Student Achievements:</span>
                <span className="faculty-stat-value">{totalAchievements}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-bottom">


          {/* LinkedIn Profile */}
          {userData.linkedinUrl ? (
            <a 
              href={userData.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin-profile-link"
            >
              <i className="bi bi-linkedin"></i>
              LinkedIn Profile
            </a>
          ) : (
            <div className="linkedin-profile-link disabled">
              <i className="bi bi-linkedin"></i>
              LinkedIn Profile
              <span className="link-hint">Add LinkedIn URL in Edit Profile</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="courses-certificates-container">
        {/* Active Courses Section */}
        <div className="courses-section">
          <div className="section-header">
            <div className="section-header-top">
              <h3 style={{color: 'white'}} className="section-title">Active Courses</h3>
            </div>
          </div>
          
          <div className="courses-grid">
            {activeCourses.slice(0, 3).map(course => (
              <div key={course.id} className="course-card">
                <div className="course-hero-image">
                  <div className="course-gradient-overlay"></div>
                  <div className="course-logo">
                    <div className="course-logo-icon">{course.code}</div>
                  </div>
                </div>
                <div className="course-info">
                  <h4 className="course-name">{course.name}</h4>
                  <p className="course-description">{course.students} students enrolled</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="view-more-btn"
            onClick={() => setActiveTab('courses')}
          >
            View More
          </button>
        </div>

        {/* Recent Students Section */}
        <div className="certificates-section">
          <div className="section-header">
            <div className="section-header-top">
              <h3 style={{color: 'white'}} className="section-title">Recent Students</h3>
            </div>
          </div>
          
          <div className="certificates-grid">
            {students.slice(0, 3).map(student => (
              <div key={student.id} className="certificate-card">
                <div className="certificate-hero-image">
                  <div className="certificate-gradient-overlay"></div>
                  <div className="certificate-logo">
                    <div className="certificate-logo-icon">👨‍🎓</div>
                  </div>
                </div>
                <div className="certificate-info">
                  <h4 className="certificate-name">{student.name}</h4>
                  <p className="certificate-description">{student.achievements} achievements</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="view-more-btn"
            onClick={() => setActiveTab('students')}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

// Students Content Component
const StudentsContent = ({ students, setStudents }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    year: '',
    department: '',
    courses: [],
    achievements: 0,
    lastActive: 'Just now'
  });

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setIsStudentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsStudentModalOpen(false);
    setSelectedStudent(null);
  };

  const handleViewProfile = (student) => {
    // Handle view profile action
    console.log('View profile for:', student.name);
    handleCloseModal();
  };

  const handleMessage = (student) => {
    // Handle message action
    console.log('Message to:', student.name);
    handleCloseModal();
  };

  const handleAddStudent = () => {
    setIsAddStudentModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddStudentModalOpen(false);
    setNewStudent({
      name: '',
      email: '',
      year: '',
      department: '',
      courses: [],
      achievements: 0,
      lastActive: 'Just now'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    
    if (!newStudent.name || !newStudent.email || !newStudent.year || !newStudent.department) {
      alert('Please fill in all required fields');
      return;
    }

    const studentToAdd = {
      ...newStudent,
      id: students.length + 1,
      courses: newStudent.courses.length > 0 ? newStudent.courses.split(',').map(c => c.trim()) : []
    };

    setStudents(prev => [...prev, studentToAdd]);
    handleCloseAddModal();
  };

  return (
    <div className="faculty-students-content">
      <div className="faculty-students-header">
        <h2 className="section-title">My Students</h2>
        <button className="add-student-btn" onClick={handleAddStudent}>
          <i className="bi bi-person-plus-fill"></i>
          Add Student
        </button>
      </div>

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Year</th>
              <th>Department</th>
              <th>Achievements</th>
              <th>Last Active</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr 
                key={student.id} 
                className="student-row"
                onClick={() => handleStudentClick(student)}
              >
                <td className="student-name">
                  <div className="student-name-cell">
                    <span className="student-icon">👨‍🎓</span>
                    {student.name}
                  </div>
                </td>
                <td className="student-email">{student.email}</td>
                <td className="student-year">{student.year}</td>
                <td className="student-department">{student.department}</td>
                <td className="student-achievements">{student.achievements}</td>
                <td className="student-last-active">{student.lastActive}</td>
                <td className="student-status">
                  <span className="status-badge active">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Details Modal */}
      {isStudentModalOpen && selectedStudent && (
        <div className="student-modal-overlay" onClick={handleCloseModal}>
          <div className="student-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="student-modal-header">
              <h3>Student Details</h3>
              <button className="close-modal-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="student-modal-body">
              <div className="student-modal-avatar">
                <div className="student-avatar-large">👨‍🎓</div>
                <h4>{selectedStudent.name}</h4>
                <p className="student-email">{selectedStudent.email}</p>
              </div>
              
              <div className="student-modal-details">
                <div className="detail-row">
                  <span className="detail-label">Year:</span>
                  <span className="detail-value">{selectedStudent.year}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Department:</span>
                  <span className="detail-value">{selectedStudent.department}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Achievements:</span>
                  <span className="detail-value">{selectedStudent.achievements}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Active:</span>
                  <span className="detail-value">{selectedStudent.lastActive}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Courses:</span>
                  <span className="detail-value">{selectedStudent.courses.join(', ')}</span>
                </div>
              </div>
            </div>
            
            <div className="student-modal-actions">
              <button 
                className="view-profile-btn"
                onClick={() => handleViewProfile(selectedStudent)}
              >
                <i className="bi bi-person-fill"></i>
                View Profile
              </button>
              <button 
                className="message-btn"
                onClick={() => handleMessage(selectedStudent)}
              >
                <i className="bi bi-chat-fill"></i>
                Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <div className="student-modal-overlay" onClick={handleCloseAddModal}>
          <div className="student-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="student-modal-header">
              <h3>Add New Student</h3>
              <button className="close-modal-btn" onClick={handleCloseAddModal}>×</button>
            </div>
            
            <form onSubmit={handleAddStudentSubmit} className="add-student-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter student name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter student email"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="year">Year *</label>
                  <select
                    id="year"
                    name="year"
                    value={newStudent.year}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={newStudent.department}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter department"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="courses">Courses (comma-separated)</label>
                <input
                  type="text"
                  id="courses"
                  name="courses"
                  value={Array.isArray(newStudent.courses) ? newStudent.courses.join(', ') : newStudent.courses}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, courses: e.target.value }))}
                  placeholder="e.g., Data Structures, Algorithms"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="achievements">Achievements</label>
                <input
                  type="number"
                  id="achievements"
                  name="achievements"
                  value={newStudent.achievements}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="Number of achievements"
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseAddModal}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Faculty Courses Content Component
const FacultyCoursesContent = ({ courses, setCourses }) => {
  return (
    <div className="faculty-courses-content">
      <div className="faculty-courses-header">
        <h2 className="section-title">My Courses</h2>
      </div>

      <div className="faculty-courses-grid">
        {courses.map(course => (
          <div key={course.id} className={`faculty-course-card ${course.status}`}>
            <div className="faculty-course-header">
              <div className="faculty-course-icon">📚</div>
              <div className={`faculty-course-status ${course.status}`}>
                {course.status === 'active' ? 'Active' : 'Completed'}
              </div>
            </div>
            <h3 className="faculty-course-name">{course.name}</h3>
            <p className="faculty-course-code">{course.code}</p>
            <div className="faculty-course-details">
              <div className="faculty-detail-item">
                <strong>Semester:</strong>
                <span className="faculty-detail-value">{course.semester}</span>
              </div>
              <div className="faculty-detail-item">
                <strong>Students:</strong>
                <span className="faculty-detail-value">{course.students}</span>
              </div>
            </div>
            <div className="faculty-course-actions">
              <button className="faculty-view-course-btn">View Details</button>
              <button className="faculty-manage-students-btn">Manage Students</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default FacultyDashboard;
