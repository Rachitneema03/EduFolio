import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EditProfileModal from './EditProfileModal';
import ProfileSetupModal from './ProfileSetupModal';
import AccountSettings from './AccountSettings';
import dashboardLogo from '../Assets/dashboard-logo.png';
import logoDark from '../Assets/logo-dark.png';
import './StudentDashboard.css'; // Reusing the same CSS for consistency

const FacultyDashboard = () => {
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
    department: '',
    designation: '',
    experience: '',
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
      case 'analytics':
        return <AnalyticsContent 
          students={students}
          courses={courses}
        />;
      case 'settings':
        return <AccountSettings 
          userData={userData}
          onUserDataUpdate={setUserData}
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
          onNotificationSettingsUpdate={(settings) => console.log('Notification settings updated:', settings)}
          onPrivacySettingsUpdate={(settings) => console.log('Privacy settings updated:', settings)}
          onAccountSettingsUpdate={(settings) => console.log('Account settings updated:', settings)}
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
              className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <span className="nav-icon"><i className="bi bi-graph-up"></i></span>
              <span className="nav-text">Analytics</span>
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
      <ProfileSetupModal
        isOpen={isProfileSetupOpen}
        onComplete={handleProfileSetupComplete}
        userType="faculty"
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        userData={userData}
        userType="faculty"
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
    <div className="profile-content">
      <div className="profile-card">
        <div className="profile-main">
          <div className="profile-left">
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
              <div className="achieved-badge-icon">
                🎓
              </div>
            </div>
            <h2 className="username">{userData.name}</h2>
          </div>
          
          <div className="profile-center">
            <div className="institution-info">
              {userData.department && (
                <div className="institution">
                  <div className="institution-label">Department:</div>
                  <span>{userData.department}</span>
                </div>
              )}
              {userData.designation && (
                <div className="year">Designation: {userData.designation}</div>
              )}
              {userData.experience && (
                <div className="degree">Experience: {userData.experience} years</div>
              )}
              {userData.email && (
                <div className="passing-year">Email: {userData.email}</div>
              )}
            </div>
          </div>
          
          <div className="profile-right">
            <button className="edit-profile-btn" onClick={onEditProfile}>
              <i className="bi bi-pencil-square"></i>
              Edit Profile
            </button>
            <div className="profile-stats">
              <div className="stat-section">
                <span className="stat-label">Total Students:</span>
                <span className="stat-value">{totalStudents}</span>
              </div>
              <div className="stat-section">
                <span className="stat-label">Active Courses:</span>
                <span className="stat-value">{activeCourses.length}</span>
              </div>
              <div className="stat-section">
                <span className="stat-label">Student Achievements:</span>
                <span className="stat-value">{totalAchievements}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-bottom">
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
  return (
    <div className="courses-content">
      <div className="courses-header">
        <h2 className="section-title">My Students</h2>
      </div>

      <div className="courses-grid">
        {students.map(student => (
          <div key={student.id} className="course-card glass-morphism">
            <div className="course-header">
              <div className="course-icon">👨‍🎓</div>
              <div className="course-status ongoing">Active</div>
            </div>
            <h3 className="course-name">{student.name}</h3>
            <p className="course-platform">{student.department}</p>
            <div className="course-dates">
              <span className="date-item">
                <strong>Year:</strong> {student.year}
              </span>
              <span className="date-item">
                <strong>Achievements:</strong> {student.achievements}
              </span>
            </div>
            <div className="student-actions">
              <button className="view-profile-btn">View Profile</button>
              <button className="message-btn">Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Faculty Courses Content Component
const FacultyCoursesContent = ({ courses, setCourses }) => {
  return (
    <div className="courses-content">
      <div className="courses-header">
        <h2 className="section-title">My Courses</h2>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className={`course-card glass-morphism ${course.status}`}>
            <div className="course-header">
              <div className="course-icon">📚</div>
              <div className={`course-status ${course.status}`}>
                {course.status === 'active' ? 'Active' : 'Completed'}
              </div>
            </div>
            <h3 className="course-name">{course.name}</h3>
            <p className="course-platform">{course.code}</p>
            <div className="course-dates">
              <span className="date-item">
                <strong>Semester:</strong> {course.semester}
              </span>
              <span className="date-item">
                <strong>Students:</strong> {course.students}
              </span>
            </div>
            <div className="course-actions">
              <button className="view-course-btn">View Details</button>
              <button className="manage-students-btn">Manage Students</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics Content Component
const AnalyticsContent = ({ students, courses }) => {
  const totalStudents = students.length;
  const activeCourses = courses.filter(course => course.status === 'active').length;
  const totalAchievements = students.reduce((sum, student) => sum + student.achievements, 0);
  const avgAchievements = totalStudents > 0 ? (totalAchievements / totalStudents).toFixed(1) : 0;

  return (
    <div className="courses-content">
      <div className="courses-header">
        <h2 className="section-title">Analytics Dashboard</h2>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card glass-morphism">
          <div className="analytics-icon">👥</div>
          <h3>Total Students</h3>
          <div className="analytics-value">{totalStudents}</div>
        </div>

        <div className="analytics-card glass-morphism">
          <div className="analytics-icon">📚</div>
          <h3>Active Courses</h3>
          <div className="analytics-value">{activeCourses}</div>
        </div>

        <div className="analytics-card glass-morphism">
          <div className="analytics-icon">🏆</div>
          <h3>Total Achievements</h3>
          <div className="analytics-value">{totalAchievements}</div>
        </div>

        <div className="analytics-card glass-morphism">
          <div className="analytics-icon">📊</div>
          <h3>Avg Achievements</h3>
          <div className="analytics-value">{avgAchievements}</div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-card glass-morphism">
          <h3>Student Distribution by Year</h3>
          <div className="chart-placeholder">
            <p>Chart visualization would go here</p>
          </div>
        </div>

        <div className="chart-card glass-morphism">
          <h3>Achievement Trends</h3>
          <div className="chart-placeholder">
            <p>Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
