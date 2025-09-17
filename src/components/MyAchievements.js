import React, { useState } from 'react';
import './MyAchievements.css';

const MyAchievements = () => {
  const [activeAchievementTab, setActiveAchievementTab] = useState('all-verified');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    category: '',
    file: null,
    platform: '',
    date: ''
  });

  const achievements = {
    'all-verified': [
      {
        id: 1,
        title: "React Complete Guide Certificate",
        description: "Completed comprehensive React.js course with hands-on projects",
        category: "Programming",
        platform: "Udemy",
        date: "2024-01-15",
        status: "verified",
        file: null
      },
      {
        id: 2,
        title: "Data Structures and Algorithms",
        description: "Mastered core DSA concepts and problem-solving techniques",
        category: "Computer Science",
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
        category: "Cloud Computing",
        platform: "AWS",
        date: "2024-04-05",
        status: "pending",
        file: null
      },
      {
        id: 5,
        title: "Python for Data Science",
        description: "Advanced Python programming for data analysis",
        category: "Programming",
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
        category: "Blockchain",
        platform: "Coursera",
        date: "2024-03-25",
        status: "rejected",
        file: null,
        rejectionReason: "Certificate not verifiable"
      }
    ]
  };

  const handleSubmitAchievement = () => {
    if (newAchievement.title && newAchievement.description && newAchievement.category) {
      // Add to pending achievements
      console.log('New achievement submitted:', newAchievement);
      setNewAchievement({
        title: '',
        description: '',
        category: '',
        file: null,
        platform: '',
        date: ''
      });
      setIsSubmitModalOpen(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewAchievement({...newAchievement, file: file});
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return '✅';
      case 'pending': return '⏳';
      case 'rejected': return '❌';
      default: return '📄';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const currentAchievements = achievements[activeAchievementTab] || [];

  return (
    <div className="achievements-content">
      <div className="achievements-main">
        <div className="achievements-header">
        <h2 className="section-title" style={{color: 'white'}}>My Achievements</h2>
        <button 
          className="submit-achievement-btn"
          onClick={() => setIsSubmitModalOpen(true)}
          style={{backgroundColor: '#363ba1'}}
        >
          <span><i className="bi bi-plus"></i></span>
          Submit Achievement
        </button>
      </div>

      {/* Achievement Tabs */}
      <div className="achievement-tabs">
        <button 
          className={`achievement-tab ${activeAchievementTab === 'all-verified' ? 'active' : ''}`}
          onClick={() => setActiveAchievementTab('all-verified')}
        >
          <span className="tab-icon">✅</span>
          <span className="tab-text">All Verified</span>
          <span className="tab-count">({achievements['all-verified'].length})</span>
        </button>
        
        <button 
          className={`achievement-tab ${activeAchievementTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveAchievementTab('pending')}
        >
          <span className="tab-icon">⏳</span>
          <span className="tab-text">Pending Review</span>
          <span className="tab-count">({achievements['pending'].length})</span>
        </button>
        
        <button 
          className={`achievement-tab ${activeAchievementTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveAchievementTab('rejected')}
        >
          <span className="tab-icon">❌</span>
          <span className="tab-text">Rejected</span>
          <span className="tab-count">({achievements['rejected'].length})</span>
        </button>
      </div>

      {/* Achievements Grid */}
      <div className="achievements-grid">
        {currentAchievements.length > 0 ? (
          currentAchievements.map(achievement => (
            <div key={achievement.id} className="achievement-card glass-morphism">
              <div className="achievement-header">
                <div className="achievement-status">
                  <span 
                    className="status-icon"
                    style={{ color: getStatusColor(achievement.status) }}
                  >
                    {getStatusIcon(achievement.status)}
                  </span>
                  <span 
                    className="status-text"
                    style={{ color: getStatusColor(achievement.status) }}
                  >
                    {achievement.status.charAt(0).toUpperCase() + achievement.status.slice(1)}
                  </span>
                </div>
                <div className="achievement-date">{achievement.date}</div>
              </div>
              
              <div className="achievement-content">
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
                
                <div className="achievement-details">
                  <div className="achievement-category">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{achievement.category}</span>
                  </div>
                  <div className="achievement-platform">
                    <span className="detail-label">Platform:</span>
                    <span className="detail-value">{achievement.platform}</span>
                  </div>
                </div>
                
                {achievement.rejectionReason && (
                  <div className="rejection-reason">
                    <span className="rejection-label">Rejection Reason:</span>
                    <span className="rejection-text">{achievement.rejectionReason}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-achievements">
            <div className="empty-icon">📄</div>
            <p>No achievements in this category</p>
            <p className="empty-subtitle">
              {activeAchievementTab === 'all-verified' 
                ? 'Submit your first achievement to get started!'
                : activeAchievementTab === 'pending'
                ? 'No achievements pending review'
                : 'No rejected achievements'
              }
            </p>
          </div>
        )}
      </div>
      </div>

      {/* Sidebar */}
      <div className="achievements-sidebar">
        <h3 style={{color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem'}}>Achievement Stats</h3>
        
        <div style={{marginBottom: '1.5rem'}}>
          <p style={{color: '#a0a0a0', marginBottom: '0.5rem', fontSize: '0.9rem'}}>Total Verified</p>
          <p style={{color: 'white', fontSize: '2rem', fontWeight: 'bold', margin: 0}}>
            {achievements['all-verified'].length}
          </p>
        </div>
        
        <div style={{marginBottom: '1.5rem'}}>
          <p style={{color: '#a0a0a0', marginBottom: '0.5rem', fontSize: '0.9rem'}}>Pending Review</p>
          <p style={{color: '#fbbf24', fontSize: '2rem', fontWeight: 'bold', margin: 0}}>
            {achievements['pending'].length}
          </p>
        </div>
        
        <div style={{marginBottom: '1.5rem'}}>
          <p style={{color: '#a0a0a0', marginBottom: '0.5rem', fontSize: '0.9rem'}}>Rejected</p>
          <p style={{color: '#ef4444', fontSize: '2rem', fontWeight: 'bold', margin: 0}}>
            {achievements['rejected'].length}
          </p>
        </div>
        
        <div style={{marginBottom: '1.5rem'}}>
          <p style={{color: '#a0a0a0', marginBottom: '0.5rem', fontSize: '0.9rem'}}>Success Rate</p>
          <p style={{color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold', margin: 0}}>
            {achievements['all-verified'].length + achievements['pending'].length + achievements['rejected'].length > 0 
              ? Math.round((achievements['all-verified'].length / (achievements['all-verified'].length + achievements['pending'].length + achievements['rejected'].length)) * 100)
              : 0}%
          </p>
        </div>
        
        <div>
          <p style={{color: '#a0a0a0', marginBottom: '0.5rem', fontSize: '0.9rem'}}>Categories</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
            {[...new Set([...achievements['all-verified'], ...achievements['pending'], ...achievements['rejected']].map(a => a.category))].slice(0, 3).map(category => (
              <span key={category} style={{
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                padding: '0.25rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.8rem'
              }}>
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Achievement Modal */}
      {isSubmitModalOpen && (
        <div className="modal-overlay" onClick={() => setIsSubmitModalOpen(false)}>
          <div className="submit-achievement-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Submit Achievement</h3>
              <button 
                className="close-btn"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Achievement Title</label>
                <input
                  type="text"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                  placeholder="Enter achievement title"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                  placeholder="Describe your achievement"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newAchievement.category}
                    onChange={(e) => setNewAchievement({...newAchievement, category: e.target.value})}
                  >
                    <option value="">Select category</option>
                    <option value="Programming">Programming</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Platform</label>
                  <input
                    type="text"
                    value={newAchievement.platform}
                    onChange={(e) => setNewAchievement({...newAchievement, platform: e.target.value})}
                    placeholder="e.g., Coursera, Udemy"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Achievement Date</label>
                <input
                  type="date"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Supporting Document (Optional)</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="achievement-file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="achievement-file" className="file-upload-btn">
                    {newAchievement.file ? 'Change File' : 'Upload File'}
                  </label>
                  {newAchievement.file && (
                    <span className="file-name">{newAchievement.file.name}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleSubmitAchievement}
              >
                Submit Achievement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAchievements;
