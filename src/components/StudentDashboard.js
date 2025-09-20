import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EditProfileModal from './EditProfileModal';
import ProfileSetupModal from './ProfileSetupModal';
import MyAchievements from './MyAchievements';
import GeneratePortfolio from './GeneratePortfolio';
import Connect from './Connect';
import AccountSettings from './AccountSettings';
import ActivityTracker from './ActivityTracker';
import Documents from './Documents';
import { destroyToken, getCurrentUserToken } from '../utils/tokenManager';
import { useAuth } from '../contexts/AuthContext';
import dashboardLogo from '../Assets/dashboard-logo.png';
import logoDark from '../Assets/logo-dark.png';
import courseraLogo from '../Assets/platform-logos/coursera.svg';
import udemyLogo from '../Assets/platform-logos/udemy.svg';
import geeksforgeeksLogo from '../Assets/platform-logos/geeksforgeeks.svg';
import edxLogo from '../Assets/platform-logos/edx.svg';
import khanAcademyLogo from '../Assets/platform-logos/khan-academy.svg';
import freecodecampLogo from '../Assets/platform-logos/freecodecamp.svg';
import otherLogo from '../Assets/platform-logos/other.svg';
import './StudentDashboard.css';

const StudentDashboard = ({ onNavigate }) => {
  const { updateAuthStatus, storeData, getData, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [platformData, setPlatformData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [achievements, setAchievements] = useState({
    'all-verified': [
      {
        id: 1,
        title: "React Complete Guide Certificate",
        description: "Completed comprehensive React.js course with hands-on projects",
        category: "Engineering",
        platform: "Udemy",
        date: "2024-01-15",
        status: "verified",
        file: null
      },
      {
        id: 2,
        title: "Data Structures and Algorithms",
        description: "Mastered core DSA concepts and problem-solving techniques",
        category: "Engineering",
        platform: "GeeksforGeeks",
        date: "2024-02-20",
        status: "verified",
        file: null
      },
      {
        id: 3,
        title: "Machine Learning Specialization",
        description: "Completed 5-course specialization in machine learning",
        category: "Data Science",
        platform: "Coursera",
        date: "2024-03-10",
        status: "verified",
        file: null
      }
    ],
    'pending': [
      {
        id: 4,
        title: "AWS Cloud Practitioner",
        description: "Cloud computing fundamentals and AWS services",
        category: "Engineering",
        platform: "AWS",
        date: "2024-04-05",
        status: "pending",
        file: null
      },
      {
        id: 5,
        title: "Python for Data Science",
        description: "Advanced Python programming for data analysis",
        category: "Data Science",
        platform: "edX",
        date: "2024-04-12",
        status: "pending",
        file: null
      }
    ],
    'rejected': [
      {
        id: 6,
        title: "Blockchain Development",
        description: "Smart contracts and decentralized applications",
        category: "Engineering",
        platform: "Coursera",
        date: "2024-03-25",
        status: "rejected",
        file: null,
        rejectionReason: "Certificate not verifiable"
      }
    ]
  });
  
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

  const [userData, setUserData] = useState({
    name: 'USER',
    age: '',
    gender: '',
    collegeName: '',
    year: '',
    degree: '',
    passingYear: '',
    profilePhoto: null,
    linkedinUrl: '',
    headline: '',
    skills: ['JavaScript', 'React', 'Python', 'Node.js', 'MongoDB'],
    email: '',
    phone: '',
    location: '',
    bio: '',
    gpa: ''
  });

  // Load profile data from token storage on component mount
  useEffect(() => {
    if (isLoggedIn) {
      const savedProfileData = getData('profile');
      if (savedProfileData) {
        setUserData(savedProfileData);
        console.log('Profile data loaded from token storage:', savedProfileData);
      }
      
      // Load courses data
      const savedCoursesData = getData('courses');
      if (savedCoursesData) {
        setCourses(savedCoursesData);
        console.log('Courses data loaded from token storage:', savedCoursesData);
      }
      
      // Load achievements data
      const savedAchievementsData = getData('achievements');
      if (savedAchievementsData) {
        setAchievements(savedAchievementsData);
        console.log('Achievements data loaded from token storage:', savedAchievementsData);
      }
    }
  }, [isLoggedIn, getData]);

  // Save courses data to token storage whenever courses change
  useEffect(() => {
    if (isLoggedIn && courses.length > 0) {
      storeData('courses', courses);
      console.log('Courses data saved with token storage:', courses);
    }
  }, [courses, isLoggedIn, storeData]);

  // Save achievements data to token storage whenever achievements change
  useEffect(() => {
    if (isLoggedIn && achievements) {
      storeData('achievements', achievements);
      console.log('Achievements data saved with token storage:', achievements);
    }
  }, [achievements, isLoggedIn, storeData]);

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
    
    // Store profile data with token-based key
    if (isLoggedIn) {
      storeData('profile', newUserData);
      console.log('Profile data saved with token storage:', newUserData);
    }
    
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileSetupComplete = (newUserData) => {
    setUserData(newUserData);
    
    // Store profile data with token-based key
    if (isLoggedIn) {
      storeData('profile', newUserData);
      console.log('Profile setup completed and saved with token storage:', newUserData);
    }
    
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

    const allItems = [...courses];
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
    // Get current user token before destroying
    const currentUser = getCurrentUserToken();
    
    // Destroy authentication token and all user data
    if (currentUser) {
      destroyToken(currentUser.email);
    }
    
    // Clear any additional stored data
    localStorage.removeItem('profileCompleted');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_first_name');
    localStorage.removeItem('user_last_name');
    localStorage.removeItem('user_remember_me');
    localStorage.removeItem('user_social_provider');
    
    console.log('User signed out successfully');
    
    // Update auth context
    updateAuthStatus();
    
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
    
    
    switch (activeTab) {
      case 'profile':
        return <ProfileContent 
          userData={userData} 
          onEditProfile={handleEditProfile}
          courses={courses}
          setActiveTab={setActiveTab}
          achievements={achievements}
        />;
      case 'courses':
        return <CoursesContent 
          courses={courses}
          setCourses={setCourses}
        />;
      
      case 'achievements':
        return <MyAchievements achievements={achievements} setAchievements={setAchievements} />;
      case 'portfolio':
        return <GeneratePortfolio 
          userData={userData}
          courses={courses}
          achievements={achievements['all-verified']}
          certificates={achievements['all-verified'].map(achievement => ({
            name: achievement.title,
            platform: achievement.platform,
            date: achievement.date,
            link: achievement.file ? URL.createObjectURL(achievement.file) : null
          }))}
          platformData={platformData}
        />;
      case 'connect':
        return <Connect onPlatformDataUpdate={setPlatformData} />;
      case 'activities':
        return <ActivityTracker onActivityUpdate={setActivities} />;
      case 'documents':
        return <Documents />;
      case 'attendance':
        return <AttendanceContent />;
      case 'settings':
        return <AccountSettings 
          userData={userData}
          onUserDataUpdate={(updatedData) => {
            setUserData(updatedData);
            // Store updated profile data with token-based key
            if (isLoggedIn) {
              storeData('profile', updatedData);
              console.log('Profile data updated via AccountSettings and saved with token storage:', updatedData);
            }
          }}
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
          courses={courses}
          setActiveTab={setActiveTab}
          achievements={achievements}
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
              className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <span className="nav-icon"><i className="bi bi-folder-fill"></i></span>
              <span className="nav-text">Documents</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
              onClick={() => setActiveTab('attendance')}
            >
              <span className="nav-icon"><i className="bi bi-calendar-check-fill"></i></span>
              <span className="nav-text">Attendance</span>
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
                  }
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
              >
                <div className="result-icon">
                  📖
                </div>
                <div className="result-details">
                  <div className="result-name">{item.name}</div>
                  <div className="result-platform">{item.platform}</div>
                  <div className="result-type">
                    Course
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
const ProfileContent = ({ userData, onEditProfile, courses, setActiveTab, achievements }) => {
  // Use actual verified achievements data from shared state
  const verifiedAchievements = achievements['all-verified'] || [];

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
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
    const totalAchievements = verifiedAchievements.length;
    const badges = [
      {
        id: 'bronze',
        name: 'Bronze Badge',
        icon: '🥉',
        requirement: 3,
        achieved: totalAchievements >= 3,
        progress: Math.min(totalAchievements, 3),
        color: '#cd7f32',
        description: 'Complete 3 achievements',
        points: '3 Points'
      },
      {
        id: 'silver',
        name: 'Silver Badge',
        icon: '🥈',
        requirement: 10,
        achieved: totalAchievements >= 10,
        progress: Math.min(totalAchievements, 10),
        color: '#c0c0c0',
        description: 'Complete 10 achievements',
        points: '10 Points'
      },
      {
        id: 'gold',
        name: 'Gold Badge',
        icon: '🥇',
        requirement: 20,
        achieved: totalAchievements >= 20,
        progress: Math.min(totalAchievements, 20),
        color: '#ffd700',
        description: 'Complete 20 achievements',
        points: '20 Points'
      },
      {
        id: 'platinum',
        name: 'Platinum Badge',
        icon: '💎',
        requirement: 50,
        achieved: totalAchievements >= 50,
        progress: Math.min(totalAchievements, 50),
        color: '#e5e4e2',
        description: 'Complete 50 achievements',
        points: '50 Points'
      },
      {
        id: 'diamond',
        name: 'Diamond Badge',
        icon: '💠',
        requirement: 100,
        achieved: totalAchievements >= 100,
        progress: Math.min(totalAchievements, 100),
        color: '#e5e4e2',
        description: 'Complete 100 achievements',
        points: '100 Points'
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
            {userData.headline && (
              <p className="profile-headline">{userData.headline}</p>
            )}
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
          
          <div className="profile-middle">
            {userData.headline && (
              <div className="headline-section">
                <h4 className="headline-title">Headline</h4>
                <p className="headline-text">{userData.headline}</p>
              </div>
            )}
            {userData.skills && userData.skills.length > 0 && (
              <div className="skills-section">
                <h4 className="skills-title">Skills</h4>
                <div className="skills-container">
                  {userData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
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
              <div className="linkedin-content">
              <i className="bi bi-linkedin"></i>
                <span>LinkedIn Profile</span>
              </div>
              <div className="link-hint">Add URL to insert link</div>
            </div>
          )}
        </div>
        </div>

      {/* Courses and Achievements Sections */}
      <div className="courses-achievements-container">
        {/* Courses Section Card */}
        <div className="section-card courses-section-card">
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
        </div>

        {/* Achievements Section Card */}
        <div className="section-card achievements-section-card">
          <div className="achievements-section">
          <div className="section-header">
            <div className="section-header-top">
                <h3 style={{color: 'white'}} className="section-title">Achievements</h3>
            </div>
          </div>
          
            <div className="achievements-grid">
              {verifiedAchievements.slice(0, 3).map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-hero-image">
                    <div className="achievement-gradient-overlay"></div>
                    <div className="achievement-logo">
                      <div className="achievement-logo-icon">{getPlatformIcon(achievement.platform)}</div>
                    </div>
                  </div>
                  <div className="achievement-info">
                    <h4 className="achievement-name">{achievement.title}</h4>
                    <p className="achievement-description">{achievement.platform} Achievement</p>
                  </div>
                </div>
              ))}
          </div>
          <button 
              className="view-more-btn"
                onClick={() => setActiveTab('achievements')}
            >
              View More
            </button>
        </div>
        </div>
      </div>

      {/* Badge Achievement Section */}
      <div className="badge-achievement-section">
        <div className="section-header">
          <h3 className="section-subtitle">
            <span className="section-icon">🏆</span>
            Badge Achievements
          </h3>
          <span className="section-count">({verifiedAchievements.length} achievements)</span>
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
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    name: '',
    platform: '',
    customPlatform: '',
    startDate: '',
    endDate: '',
    status: 'ongoing'
  });

  // Date validation function
  const validateDates = (startDate, endDate) => {
    if (!startDate || !endDate) return true; // Allow empty dates during input
    return new Date(startDate) <= new Date(endDate);
  };

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.startDate && newCourse.endDate) {
      // Validate dates
      if (!validateDates(newCourse.startDate, newCourse.endDate)) {
        alert('End date must be after or equal to start date');
        return;
      }
      
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

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({
      name: course.name,
      platform: course.platform,
      customPlatform: '',
      startDate: course.startDate,
      endDate: course.endDate,
      status: course.status
    });
    setIsEditCourseOpen(true);
  };

  const handleUpdateCourse = () => {
    if (newCourse.name && newCourse.startDate && newCourse.endDate) {
      // Validate dates
      if (!validateDates(newCourse.startDate, newCourse.endDate)) {
        alert('End date must be after or equal to start date');
        return;
      }
      
      const platform = newCourse.platform === 'other' ? newCourse.customPlatform : newCourse.platform;
      const updatedCourse = {
        ...editingCourse,
        name: newCourse.name,
        platform: platform,
        startDate: newCourse.startDate,
        endDate: newCourse.endDate,
        status: newCourse.status
      };
      
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? updatedCourse : course
      ));
      
      setNewCourse({
        name: '',
        platform: '',
        customPlatform: '',
        startDate: '',
        endDate: '',
        status: 'ongoing'
      });
      setEditingCourse(null);
      setIsEditCourseOpen(false);
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const ongoingCourses = courses.filter(course => course.status === 'ongoing');
  const completedCourses = courses.filter(course => course.status === 'completed');

  const getPlatformImage = (platform) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case 'coursera':
        return courseraLogo;
      case 'udemy':
        return udemyLogo;
      case 'geeksforgeeks':
      case 'gfg':
        return geeksforgeeksLogo;
      case 'edx':
        return edxLogo;
      case 'khan academy':
        return khanAcademyLogo;
      case 'freecodecamp':
        return freecodecampLogo;
      case 'other':
        return otherLogo;
      default:
        return otherLogo;
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
                  <option value="edx">edX</option>
                  <option value="khan academy">Khan Academy</option>
                  <option value="freecodecamp">FreeCodeCamp</option>
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
                    max={newCourse.endDate || undefined}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newCourse.endDate}
                    onChange={(e) => setNewCourse({...newCourse, endDate: e.target.value})}
                    min={newCourse.startDate || undefined}
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

      {/* Edit Course Modal */}
      {isEditCourseOpen && (
        <div className="modal-overlay" onClick={() => setIsEditCourseOpen(false)}>
          <div className="add-course-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Course</h3>
              <button 
                className="close-btn"
                onClick={() => setIsEditCourseOpen(false)}
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
                  <option value="edx">edX</option>
                  <option value="khan academy">Khan Academy</option>
                  <option value="freecodecamp">FreeCodeCamp</option>
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
                    max={newCourse.endDate || undefined}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newCourse.endDate}
                    onChange={(e) => setNewCourse({...newCourse, endDate: e.target.value})}
                    min={newCourse.startDate || undefined}
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
                onClick={() => setIsEditCourseOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleUpdateCourse}
              >
                Update Course
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
                  <div className="course-icon">
                    <img 
                      src={getPlatformImage(course.platform)} 
                      alt={course.platform}
                      className="platform-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="platform-fallback" style={{display: 'none'}}>📚</span>
                  </div>
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
                <div className="course-actions">
                  <button 
                    className="edit-course-btn"
                    onClick={() => handleEditCourse(course)}
                    title="Edit course"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button 
                    className="delete-course-btn"
                    onClick={() => handleDeleteCourse(course.id)}
                    title="Delete course"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
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
                  <div className="course-icon">
                    <img 
                      src={getPlatformImage(course.platform)} 
                      alt={course.platform}
                      className="platform-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="platform-fallback" style={{display: 'none'}}>📚</span>
                  </div>
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
                <div className="course-actions">
                  <button 
                    className="edit-course-btn"
                    onClick={() => handleEditCourse(course)}
                    title="Edit course"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button 
                    className="delete-course-btn"
                    onClick={() => handleDeleteCourse(course.id)}
                    title="Delete course"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
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

// Attendance Content Component
const AttendanceContent = () => {
  return (
    <div className="attendance-content">
      <div className="coming-soon-container">
        <div className="coming-soon-icon">
          <i className="bi bi-calendar-check-fill"></i>
        </div>
        <h2 className="coming-soon-title">Attendance Tracking</h2>
        <p className="coming-soon-description">
          Track your class attendance, view attendance reports, and monitor your attendance percentage.
        </p>
        <div className="coming-soon-badge">
          <span>Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
