import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EditProfileModal from './EditProfileModal';
import ProfileSetupModal from './ProfileSetupModal';
import MyAchievements from './MyAchievements';
import GeneratePortfolio from './GeneratePortfolio';
import Connect from './Connect';
import AccountSettings from './AccountSettings';
import ActivityTracker from './ActivityTracker';
import dashboardLogo from '../Assets/dashboard-logo.png';
import logoDark from '../Assets/logo-dark.png';
import './StudentDashboard.css';

const StudentDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [pinnedCertificates, setPinnedCertificates] = useState([]);
  const [unreadCount, setUnreadCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [platformData, setPlatformData] = useState([]);
  const [activities, setActivities] = useState([]);
  
  // Centralized data management
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "GfG 160 Daily DSA Problems",
      platform: "GeeksforGeeks",
      type: "course",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      status: "ongoing"
    },
    {
      id: 2,
      name: "React Complete Guide",
      platform: "Udemy",
      type: "course",
      startDate: "2023-09-01",
      endDate: "2023-12-15",
      status: "completed"
    },
    {
      id: 3,
      name: "Machine Learning Specialization",
      platform: "Coursera",
      type: "course",
      startDate: "2024-02-01",
      endDate: "2024-08-31",
      status: "ongoing"
    }
  ]);

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      name: "GfG 160 Daily DSA Problems",
      platform: "GeeksforGeeks",
      achievedDate: "2024-01-15",
      certificateLink: "https://example.com/certificate1",
      certificateImage: null
    },
    {
      id: 2,
      name: "React Complete Guide",
      platform: "Udemy",
      achievedDate: "2023-12-20",
      certificateLink: "https://example.com/certificate2",
      certificateImage: null
    },
    {
      id: 3,
      name: "Machine Learning Specialization",
      platform: "Coursera",
      achievedDate: "2024-03-10",
      certificateLink: "https://example.com/certificate3",
      certificateImage: null
    }
  ]);
  const [userData, setUserData] = useState({
    name: 'USER',
    age: '',
    gender: '',
    collegeName: '',
    year: '',
    degree: '',
    passingYear: '',
    profilePhoto: null,
    linkedinUrl: ''
  });

  // Check if profile setup is needed on component mount
  useEffect(() => {
    const profileCompleted = localStorage.getItem('profileCompleted');
    const isProfileIncomplete = !profileCompleted && (!userData.name || userData.name === 'USER' || 
                               !userData.age || !userData.gender);
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
    localStorage.setItem('profileCompleted', 'true');
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

    // Use certificates data for search
    const certificatesForSearch = certificates.map(cert => ({
      ...cert,
      type: "certificate"
    }));

    const allItems = [...courses, ...certificatesForSearch];
    const filtered = allItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.platform.toLowerCase().includes(query.toLowerCase())
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
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 200);
  };

  const handleSignOut = () => {
    // Clear any stored data
    localStorage.removeItem('profileCompleted');
    // Redirect to sign in page
    if (onNavigate) {
      onNavigate('/signin');
    }
  };

  const notifications = [
    {
      id: 1,
      type: 'news',
      title: 'New Course Available',
      message: 'Machine Learning Fundamentals course is now available on Coursera',
      time: '2 hours ago',
      icon: '📚',
      unread: true
    },
    {
      id: 2,
      type: 'course_update',
      title: 'Course Progress Update',
      message: 'You have completed 75% of React Complete Guide course',
      time: '4 hours ago',
      icon: '🎯',
      unread: true
    },
    {
      id: 3,
      type: 'time_spent',
      title: 'Study Time Summary',
      message: 'You spent 3 hours studying today. Great job!',
      time: '6 hours ago',
      icon: '⏰',
      unread: false
    },
    {
      id: 4,
      type: 'news',
      title: 'Platform Update',
      message: 'New features added to the dashboard. Check them out!',
      time: '1 day ago',
      icon: '✨',
      unread: false
    },
    {
      id: 5,
      type: 'course_update',
      title: 'Certificate Earned',
      message: 'Congratulations! You earned a certificate for Data Structures course',
      time: '2 days ago',
      icon: '🏆',
      unread: false
    }
  ];

  const renderContent = () => {
    // eslint-disable-next-line no-undef
    const currentCertificates = certificates;
    // eslint-disable-next-line no-undef
    const currentPinnedCertificates = pinnedCertificates;
    // eslint-disable-next-line no-undef
    const currentSetPinnedCertificates = setPinnedCertificates;
    
    switch (activeTab) {
      case 'profile':
        return <ProfileContent 
          userData={userData} 
          onEditProfile={handleEditProfile}
          pinnedCertificates={currentPinnedCertificates}
          setPinnedCertificates={currentSetPinnedCertificates}
          onNavigateToCertificates={() => setActiveTab('certificates')}
          courses={courses}
          certificates={currentCertificates}
          setActiveTab={setActiveTab}
        />;
      case 'courses':
        return <CoursesContent 
          courses={courses}
          setCourses={setCourses}
        />;
      case 'certificates':
        return <CertificatesContent 
          certificates={currentCertificates}
          setCertificates={setCertificates}
          pinnedCertificates={currentPinnedCertificates}
          setPinnedCertificates={currentSetPinnedCertificates}
        />;
      case 'achievements':
        return <MyAchievements />;
      case 'portfolio':
        return <GeneratePortfolio 
          userData={userData}
          courses={courses}
          certificates={currentCertificates}
          achievements={[]}
          platformData={platformData}
        />;
      case 'connect':
        return <Connect onPlatformDataUpdate={setPlatformData} />;
      case 'activities':
        return <ActivityTracker onActivityUpdate={setActivities} />;
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
        return <ProfileContent 
          userData={userData} 
          onEditProfile={handleEditProfile}
          pinnedCertificates={currentPinnedCertificates}
          setPinnedCertificates={currentSetPinnedCertificates}
          onNavigateToCertificates={() => setActiveTab('certificates')}
          courses={courses}
          certificates={currentCertificates}
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
            <h1>Student Dashboard</h1>
          </div>
        </div>
        
        <div className="header-right">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search"
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
              className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <span className="nav-icon"><i className="bi bi-book-fill"></i></span>
              <span className="nav-text">Courses</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'certificates' ? 'active' : ''}`}
              onClick={() => setActiveTab('certificates')}
            >
              <span className="nav-icon"><i className="bi bi-trophy-fill"></i></span>
              <span className="nav-text">Certificates</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <span className="nav-icon"><i className="bi bi-file-earmark-text-fill"></i></span>
              <span className="nav-text">My Achievements</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
              onClick={() => setActiveTab('portfolio')}
            >
              <span className="nav-icon"><i className="bi bi-rocket-fill"></i></span>
              <span className="nav-text">Generate Portfolio</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'connect' ? 'active' : ''}`}
              onClick={() => setActiveTab('connect')}
            >
              <span className="nav-icon"><i className="bi bi-link-45deg"></i></span>
              <span className="nav-text">Connect</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'activities' ? 'active' : ''}`}
              onClick={() => setActiveTab('activities')}
            >
              <span className="nav-icon"><i className="bi bi-calendar-check"></i></span>
              <span className="nav-text">Activity Tracker</span>
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
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
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
                key={`${item.type}-${item.id}`} 
                className="search-result-item"
                onClick={() => {
                  if (item.type === 'course') {
                    setActiveTab('courses');
                  } else if (item.type === 'certificate') {
                    setActiveTab('certificates');
                  }
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
              >
                <div className="result-icon">
                  {item.type === 'course' ? '📖' : '🏆'}
                </div>
                <div className="result-details">
                  <div className="result-name">{item.name}</div>
                  <div className="result-platform">{item.platform}</div>
                  <div className="result-type">
                    {item.type === 'course' ? 'Course' : 'Certificate'}
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

// Profile Content Component
const ProfileContent = ({ userData, onEditProfile, pinnedCertificates, setPinnedCertificates, onNavigateToCertificates, courses, certificates, setActiveTab }) => {
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  const handlePinCertificate = (certificate) => {
    if (pinnedCertificates.length < 3 && !pinnedCertificates.find(cert => cert.id === certificate.id)) {
      setPinnedCertificates(prev => [...prev, certificate]);
    }
  };

  const isPinned = (certificateId) => {
    return pinnedCertificates.some(cert => cert.id === certificateId);
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'coursera': return '🎓';
      case 'udemy': return '🎯';
      case 'geeksforgeeks': return '💻';
      case 'gfg': return '💻';
      default: return '🏆';
    }
  };

  const getBadgeProgress = () => {
    const totalCertificates = certificates.length;
    const badges = [
      {
        id: 'bronze',
        name: 'Bronze Badge',
        icon: '🥉',
        requirement: 3,
        achieved: totalCertificates >= 3,
        progress: Math.min(totalCertificates, 3),
        color: '#cd7f32',
        description: 'Complete 3 certificates',
        points: '3 Points'
      },
      {
        id: 'silver',
        name: 'Silver Badge',
        icon: '🥈',
        requirement: 10,
        achieved: totalCertificates >= 10,
        progress: Math.min(totalCertificates, 10),
        color: '#c0c0c0',
        description: 'Complete 10 certificates',
        points: '10 Points'
      },
      {
        id: 'gold',
        name: 'Gold Badge',
        icon: '🥇',
        requirement: 20,
        achieved: totalCertificates >= 20,
        progress: Math.min(totalCertificates, 20),
        color: '#ffd700',
        description: 'Complete 20 certificates',
        points: '20 Points'
      },
      {
        id: 'platinum',
        name: 'Platinum Badge',
        icon: '💎',
        requirement: 50,
        achieved: totalCertificates >= 50,
        progress: Math.min(totalCertificates, 50),
        color: '#e5e4e2',
        description: 'Complete 50 certificates',
        points: '50 Points'
      }
    ];
    return badges;
  };

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
                {(() => {
                  const badges = getBadgeProgress();
                  const achievedBadge = badges.find(badge => badge.achieved);
                  return achievedBadge ? achievedBadge.icon : '🥉';
                })()}
              </div>
            </div>
            <h2 className="username">{userData.name}</h2>
          </div>
          
          <div className="profile-center">
            <div className="institution-info">
              {userData.collegeName && (
                <div className="institution">
                  <div className="institution-label">Institution:</div>
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
          </div>
          
          <div className="profile-right">
            <button className="edit-profile-btn" onClick={onEditProfile}>
              <i className="bi bi-pencil-square"></i>
              Edit Profile
            </button>
            <div className="profile-stats">
              <div className="stat-section">
                <span className="stat-label">Achievement Score:</span>
                <span className="stat-value">1,240</span>
              </div>
              <div className="stat-section">
                <span className="stat-label">Verified Achievements:</span>
                <span className="stat-value">6</span>
              </div>
              <div className="stat-section">
                <span className="stat-label">Campus Rank:</span>
                <span className="stat-value">--</span>
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

      {/* Pinned Certificates Section */}
      {/* Courses and Certificates Sections */}
      <div className="courses-certificates-container">
        {/* Courses Section */}
        <div className="courses-section">
          <div className="section-header">
            <div className="section-header-top">
              <h3 style={{color: 'white'}} className="section-title">Courses</h3>
            </div>
          </div>
          
          <div className="courses-grid">
            {courses.slice(0, 3).map(course => (
              <div key={course.id} className="course-card">
                <div className="course-hero-image">
                  <div className="course-gradient-overlay"></div>
                  <div className="course-logo">
                    <div className="course-logo-icon">GfG</div>
                  </div>
                </div>
                <div className="course-info">
                  <h4 className="course-name">{course.name}</h4>
                  <p className="course-description">GfG 160 - 160 Days of Problem Solving</p>
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

        {/* Certificates Section */}
        <div className="certificates-section">
          <div className="section-header">
            <div className="section-header-top">
              <h3 style={{color: 'white'}} className="section-title">Certificates</h3>
            </div>
            
          </div>
          
          <div className="certificates-grid">
            {pinnedCertificates.length > 0 ? (
              pinnedCertificates.slice(0, 3).map(certificate => (
                <div key={certificate.id} className="certificate-card">
                  <div className="certificate-hero-image">
                    <div className="certificate-gradient-overlay"></div>
                    <div className="certificate-logo">
                      <div className="certificate-logo-icon">GfG</div>
                    </div>
                  </div>
                  <div className="certificate-info">
                    <h4 className="certificate-name">{certificate.name}</h4>
                    <p className="certificate-description">GfG 160 - 160 Days of Problem Solving</p>
                  </div>
                </div>
              ))
            ) : (
              // Show certificates from certificates page if none are pinned
              certificates.slice(0, 3).map(certificate => (
                <div key={`cert-${certificate.id}`} className="certificate-card">
                  <div className="certificate-hero-image">
                    <div className="certificate-gradient-overlay"></div>
                    <div className="certificate-logo">
                      <div className="certificate-logo-icon">{getPlatformIcon(certificate.platform)}</div>
                    </div>
                  </div>
                  <div className="certificate-info">
                    <h4 className="certificate-name">{certificate.name}</h4>
                    <p className="certificate-description">{certificate.platform} Certificate</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <button 
              className="view-more-btn"
              onClick={() => setActiveTab('certificates')}
            >
              View More
            </button>
        </div>
        
      </div>

      {/* Badge Achievement Section */}
      <div className="badge-achievement-section">
        <div className="section-header">
          <h3 className="section-subtitle">
            <span className="section-icon">🏆</span>
            Badge Achievements
          </h3>
          <span className="section-count">({certificates.length} certificates)</span>
        </div>
        
        <div className="badge-timeline badge-timeline-scrollable">
          {getBadgeProgress().map((badge, index) => (
            <div key={badge.id} className={`badge-timeline-item ${badge.achieved ? 'achieved' : ''}`}>
              <div className="badge-timeline-connector">
                {index < getBadgeProgress().length - 1 && (
                  <div className={`timeline-line ${badge.achieved ? 'completed' : ''}`}></div>
                )}
              </div>
              
              <div className="badge-card glass-morphism">
                <div className="badge-icon-container">
                  <div 
                    className={`badge-icon ${badge.achieved ? 'achieved' : 'locked'}`}
                    style={{ color: badge.color }}
                  >
                    {badge.achieved ? badge.icon : '🔒'}
                  </div>
                  {badge.achieved && (
                    <div className="achievement-check">✓</div>
                  )}
                </div>
                
                <div className="badge-info">
                  <h4 className="badge-name">{badge.name}</h4>
                  <p className="badge-description">{badge.description}</p>
                  
                  <div className="badge-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${(badge.progress / badge.requirement) * 100}%`,
                          backgroundColor: badge.color
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {badge.progress}/{badge.requirement}
                    </span>
                  </div>
                  
                  {badge.achieved && (
                    <div className="achievement-date">
                      <span className="achievement-label">Achieved!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Courses Content Component
const CoursesContent = ({ courses, setCourses }) => {

  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    platform: '',
    customPlatform: '',
    startDate: '',
    endDate: '',
    status: 'ongoing'
  });

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.startDate && newCourse.endDate) {
      const platform = newCourse.platform === 'other' ? newCourse.customPlatform : newCourse.platform;
      const course = {
        id: Date.now(),
        name: newCourse.name,
        platform: platform,
        startDate: newCourse.startDate,
        endDate: newCourse.endDate,
        status: newCourse.status
      };
      setCourses([...courses, course]);
      setNewCourse({
        name: '',
        platform: '',
        customPlatform: '',
        startDate: '',
        endDate: '',
        status: 'ongoing'
      });
      setIsAddCourseOpen(false);
    }
  };

  const ongoingCourses = courses.filter(course => course.status === 'ongoing');
  const completedCourses = courses.filter(course => course.status === 'completed');

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'coursera': return '🎓';
      case 'udemy': return '🎯';
      case 'geeksforgeeks': return '💻';
      case 'gfg': return '💻';
      default: return '📚';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="courses-content">
      <div className="courses-header">
        <h2 className="section-title">My Courses</h2>
        <button 
          className="add-course-btn"
          onClick={() => setIsAddCourseOpen(true)}
        >
          <span>+</span>
          Add Course
        </button>
      </div>

      {/* Add Course Modal */}
      {isAddCourseOpen && (
        <div className="modal-overlay" onClick={() => setIsAddCourseOpen(false)}>
          <div className="add-course-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Course</h3>
              <button 
                className="close-btn"
                onClick={() => setIsAddCourseOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Course Name</label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  placeholder="Enter course name"
                />
              </div>

              <div className="form-group">
                <label>Platform</label>
                <select
                  value={newCourse.platform}
                  onChange={(e) => setNewCourse({...newCourse, platform: e.target.value})}
                >
                  <option value="">Select platform</option>
                  <option value="coursera">Coursera</option>
                  <option value="udemy">Udemy</option>
                  <option value="geeksforgeeks">GeeksforGeeks</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {newCourse.platform === 'other' && (
                <div className="form-group">
                  <label>Custom Platform</label>
                  <input
                    type="text"
                    value={newCourse.customPlatform}
                    onChange={(e) => setNewCourse({...newCourse, customPlatform: e.target.value})}
                    placeholder="Enter platform name"
                  />
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newCourse.startDate}
                    onChange={(e) => setNewCourse({...newCourse, startDate: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newCourse.endDate}
                    onChange={(e) => setNewCourse({...newCourse, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={newCourse.status}
                  onChange={(e) => setNewCourse({...newCourse, status: e.target.value})}
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsAddCourseOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleAddCourse}
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ongoing Courses */}
      <div className="courses-section">
        <h3 className="subsection-title">
          <span className="status-icon"><i className="bi bi-arrow-clockwise"></i></span>
          Ongoing Courses ({ongoingCourses.length})
        </h3>
      <div className="courses-grid">
          {ongoingCourses.length > 0 ? (
            ongoingCourses.map(course => (
              <div key={course.id} className="course-card glass-morphism">
                <div className="course-header">
                  <div className="course-icon">{getPlatformIcon(course.platform)}</div>
                  <div className="course-status ongoing">Ongoing</div>
                </div>
                <h3 className="course-name">{course.name}</h3>
                <p className="course-platform">{course.platform}</p>
                <div className="course-dates">
                  <span className="date-item">
                    <strong>Start:</strong> {formatDate(course.startDate)}
                  </span>
                  <span className="date-item">
                    <strong>End:</strong> {formatDate(course.endDate)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <p>No ongoing courses yet</p>
            </div>
          )}
        </div>
        </div>
        
      {/* Completed Courses */}
      <div className="courses-section">
        <h3 className="subsection-title">
          <span className="status-icon"><i className="bi bi-check-circle"></i></span>
          Completed Courses ({completedCourses.length})
        </h3>
        <div className="courses-grid">
          {completedCourses.length > 0 ? (
            completedCourses.map(course => (
              <div key={course.id} className="course-card glass-morphism completed">
                <div className="course-header">
                  <div className="course-icon">{getPlatformIcon(course.platform)}</div>
                  <div className="course-status completed">Completed</div>
                </div>
                <h3 className="course-name">{course.name}</h3>
                <p className="course-platform">{course.platform}</p>
                <div className="course-dates">
                  <span className="date-item">
                    <strong>Start:</strong> {formatDate(course.startDate)}
                  </span>
                  <span className="date-item">
                    <strong>End:</strong> {formatDate(course.endDate)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🏆</div>
              <p>No completed courses yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Certificates Content Component
const CertificatesContent = ({ certificates, setCertificates, pinnedCertificates, setPinnedCertificates }) => {

  const [isAddCertificateOpen, setIsAddCertificateOpen] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    platform: '',
    customPlatform: '',
    achievedDate: '',
    certificateLink: '',
    certificateImage: null
  });

  const handleAddCertificate = () => {
    if (newCertificate.name && newCertificate.achievedDate) {
      const platform = newCertificate.platform === 'other' ? newCertificate.customPlatform : newCertificate.platform;
      const certificate = {
        id: Date.now(),
        name: newCertificate.name,
        platform: platform,
        achievedDate: newCertificate.achievedDate,
        certificateLink: newCertificate.certificateLink || '',
        certificateImage: newCertificate.certificateImage
      };
      setCertificates([...certificates, certificate]);
      setNewCertificate({
        name: '',
        platform: '',
        customPlatform: '',
        achievedDate: '',
        certificateLink: '',
        certificateImage: null
      });
      setIsAddCertificateOpen(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewCertificate({...newCertificate, certificateImage: e.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'coursera': return '🎓';
      case 'udemy': return '🎯';
      case 'geeksforgeeks': return '💻';
      case 'gfg': return '💻';
      default: return '🏆';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePinCertificate = (certificate) => {
    if (pinnedCertificates.length < 3 && !pinnedCertificates.find(cert => cert.id === certificate.id)) {
      setPinnedCertificates(prev => [...prev, certificate]);
    }
  };

  const isPinned = (certificateId) => {
    return pinnedCertificates.some(cert => cert.id === certificateId);
  };

  return (
    <div className="certificates-content">
      <div className="certificates-header">
        <h2 className="section-title">My Certificates</h2>
        <button 
          className="add-certificate-btn"
          onClick={() => setIsAddCertificateOpen(true)}
        >
          <span>+</span>
          Add Certificate
        </button>
      </div>

      {/* Add Certificate Modal */}
      {isAddCertificateOpen && (
        <div className="modal-overlay" onClick={() => setIsAddCertificateOpen(false)}>
          <div className="add-certificate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Certificate</h3>
              <button 
                className="close-btn"
                onClick={() => setIsAddCertificateOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Certificate Name</label>
                <input
                  type="text"
                  value={newCertificate.name}
                  onChange={(e) => setNewCertificate({...newCertificate, name: e.target.value})}
                  placeholder="Enter certificate name"
                />
              </div>

              <div className="form-group">
                <label>Platform</label>
                <select
                  value={newCertificate.platform}
                  onChange={(e) => setNewCertificate({...newCertificate, platform: e.target.value})}
                >
                  <option value="">Select platform</option>
                  <option value="coursera">Coursera</option>
                  <option value="udemy">Udemy</option>
                  <option value="geeksforgeeks">GeeksforGeeks</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {newCertificate.platform === 'other' && (
                <div className="form-group">
                  <label>Custom Platform</label>
                  <input
                    type="text"
                    value={newCertificate.customPlatform}
                    onChange={(e) => setNewCertificate({...newCertificate, customPlatform: e.target.value})}
                    placeholder="Enter platform name"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Achieved/Issued Date</label>
                <input
                  type="date"
                  value={newCertificate.achievedDate}
                  onChange={(e) => setNewCertificate({...newCertificate, achievedDate: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Certificate Link (Optional)</label>
                <input
                  type="url"
                  value={newCertificate.certificateLink}
                  onChange={(e) => setNewCertificate({...newCertificate, certificateLink: e.target.value})}
                  placeholder="https://example.com/certificate"
                />
              </div>

              <div className="form-group">
                <label>Certificate Image</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    id="certificate-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="certificate-image" className="image-upload-btn">
                    {newCertificate.certificateImage ? 'Change Image' : 'Upload Image'}
                  </label>
                  {newCertificate.certificateImage && (
                    <div className="image-preview">
                      <img src={newCertificate.certificateImage} alt="Certificate preview" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsAddCertificateOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleAddCertificate}
              >
                Add Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificates Grid */}
      <div className="certificates-grid">
        {certificates.length > 0 ? (
          certificates.map(certificate => (
            <div key={certificate.id} className="certificate-card glass-morphism">
              <div className="certificate-header">
                <div className="certificate-icon">{getPlatformIcon(certificate.platform)}</div>
                <div className="certificate-actions">
                  <div className="certificate-status">Verified</div>
                  <button 
                    className={`pin-btn ${isPinned(certificate.id) ? 'pinned' : ''}`}
                    onClick={() => handlePinCertificate(certificate)}
                    disabled={isPinned(certificate.id) || pinnedCertificates.length >= 3}
                    title={isPinned(certificate.id) ? 'Already pinned' : pinnedCertificates.length >= 3 ? 'Maximum 3 certificates can be pinned' : 'Pin to profile'}
                  >
                    <i className="bi bi-pin"></i>
                  </button>
                </div>
        </div>
        
              {certificate.certificateImage ? (
                <div className="certificate-image-container">
                  <img 
                    src={certificate.certificateImage} 
                    alt={certificate.name}
                    className="certificate-image"
                  />
                </div>
              ) : (
                <div className="certificate-placeholder">
                  <div className="placeholder-icon">🏆</div>
                  <p>Certificate Image</p>
        </div>
              )}
              
              <div className="certificate-info">
                <h3 className="certificate-name">{certificate.name}</h3>
                <p className="certificate-platform">{certificate.platform}</p>
                <p className="certificate-date">
                  <strong>Achieved:</strong> {formatDate(certificate.achievedDate)}
                </p>
                {certificate.certificateLink && (
                  <a 
                    href={certificate.certificateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="certificate-link"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🏆</div>
            <p>No certificates yet</p>
        </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
