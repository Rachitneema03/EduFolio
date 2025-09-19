import React, { useState } from 'react';
import './MyAchievements.css';
import managementHero from '../Assets/achievement-heroes/management.svg';
import engineeringHero from '../Assets/achievement-heroes/engineering.svg';
import dataScienceHero from '../Assets/achievement-heroes/data-science.svg';
import designHero from '../Assets/achievement-heroes/design.svg';
import marketingHero from '../Assets/achievement-heroes/marketing.svg';
import financeHero from '../Assets/achievement-heroes/finance.svg';
import healthcareHero from '../Assets/achievement-heroes/healthcare.svg';
import educationHero from '../Assets/achievement-heroes/education.svg';
import defaultHero from '../Assets/achievement-heroes/default.svg';

const MyAchievements = ({ achievements, setAchievements }) => {
  const [activeAchievementTab, setActiveAchievementTab] = useState('all-verified');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  // Faculty data structure
  const facultyData = {
    'Computer Science': [
      { id: 1, name: 'Dr. Sarah Johnson', subject: 'Data Structures' },
      { id: 2, name: 'Prof. Michael Chen', subject: 'Algorithms' },
      { id: 3, name: 'Dr. Emily Rodriguez', subject: 'Machine Learning' },
      { id: 4, name: 'Prof. David Kim', subject: 'Database Systems' }
    ],
    'Mathematics': [
      { id: 5, name: 'Dr. Robert Wilson', subject: 'Calculus' },
      { id: 6, name: 'Prof. Lisa Anderson', subject: 'Linear Algebra' },
      { id: 7, name: 'Dr. James Taylor', subject: 'Statistics' }
    ],
    'Physics': [
      { id: 8, name: 'Dr. Maria Garcia', subject: 'Quantum Mechanics' },
      { id: 9, name: 'Prof. Thomas Brown', subject: 'Thermodynamics' },
      { id: 10, name: 'Dr. Jennifer Lee', subject: 'Electromagnetism' }
    ],
    'Chemistry': [
      { id: 11, name: 'Dr. Christopher Davis', subject: 'Organic Chemistry' },
      { id: 12, name: 'Prof. Amanda White', subject: 'Physical Chemistry' },
      { id: 13, name: 'Dr. Kevin Martinez', subject: 'Inorganic Chemistry' }
    ],
    'Engineering': [
      { id: 14, name: 'Dr. Rachel Thompson', subject: 'Software Engineering' },
      { id: 15, name: 'Prof. Mark Johnson', subject: 'Computer Networks' },
      { id: 16, name: 'Dr. Nicole Adams', subject: 'System Design' }
    ],
    'Batch Mentors': [
      { id: 101, name: 'Dr. Sarah Johnson', subject: 'Batch Mentor', batchName: '2024 Batch', department: 'Computer Science' },
      { id: 102, name: 'Prof. Michael Chen', subject: 'Batch Mentor', batchName: '2023 Batch', department: 'Computer Science' },
      { id: 103, name: 'Dr. Robert Wilson', subject: 'Batch Mentor', batchName: 'Alpha Batch', department: 'Mathematics' },
      { id: 104, name: 'Dr. Maria Garcia', subject: 'Batch Mentor', batchName: 'Beta Batch', department: 'Physics' },
      { id: 105, name: 'Dr. Christopher Davis', subject: 'Batch Mentor', batchName: 'Gamma Batch', department: 'Chemistry' },
      { id: 106, name: 'Dr. Rachel Thompson', subject: 'Batch Mentor', batchName: 'Delta Batch', department: 'Engineering' }
    ]
  };
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    category: '',
    customCategory: '',
    file: null,
    platform: '',
    date: '',
    facultyDepartment: '',
    selectedFaculty: ''
  });

  const handleSubmitAchievement = () => {
    if (newAchievement.title && newAchievement.description && newAchievement.category) {
      // Add to pending achievements
      const finalCategory = newAchievement.category === 'Other' && newAchievement.customCategory 
        ? newAchievement.customCategory 
        : newAchievement.category;
      
      const submittedAchievement = {
        id: Date.now(),
        title: newAchievement.title,
        description: newAchievement.description,
        category: finalCategory,
        platform: newAchievement.platform,
        date: newAchievement.date || new Date().toISOString().split('T')[0],
        status: 'pending',
        file: newAchievement.file,
        facultyDepartment: newAchievement.facultyDepartment,
        selectedFaculty: newAchievement.selectedFaculty
      };
      
      // Add to pending achievements using state
      setAchievements(prevAchievements => ({
        ...prevAchievements,
        pending: [...prevAchievements.pending, submittedAchievement]
      }));
      
      console.log('New achievement submitted:', submittedAchievement);
      setNewAchievement({
        title: '',
        description: '',
        category: '',
        customCategory: '',
        file: null,
        platform: '',
        date: '',
        facultyDepartment: '',
        selectedFaculty: ''
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

  const handleDeleteAchievement = (achievementId, category) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      setAchievements(prev => ({
        ...prev,
        [category]: prev[category].filter(achievement => achievement.id !== achievementId)
      }));
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

  const getHeroImage = (category) => {
    const categoryLower = category.toLowerCase();
    let heroImage;
    switch (categoryLower) {
      case 'management':
        heroImage = managementHero;
        break;
      case 'engineering':
        heroImage = engineeringHero;
        break;
      case 'data science':
        heroImage = dataScienceHero;
        break;
      case 'design':
        heroImage = designHero;
        break;
      case 'marketing':
        heroImage = marketingHero;
        break;
      case 'finance':
        heroImage = financeHero;
        break;
      case 'healthcare':
        heroImage = healthcareHero;
        break;
      case 'education':
        heroImage = educationHero;
        break;
      default:
        heroImage = defaultHero;
    }
    console.log(`Hero image for category "${category}":`, heroImage);
    return heroImage;
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
            <div key={achievement.id} className="achievement-card glass-morphism cards">
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
              
              <div className="achievement-hero-image">
                <img 
                  src={(() => {
                    const imageSrc = achievement.status === 'rejected' || !achievement.file ? getHeroImage(achievement.category) : URL.createObjectURL(achievement.file);
                    console.log(`Image source for "${achievement.title}":`, imageSrc);
                    return imageSrc;
                  })()} 
                  alt={achievement.title}
                  className="achievement-image"
                />
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
              
              <div className="achievement-actions">
                <button 
                  className="delete-achievement-btn"
                  onClick={() => handleDeleteAchievement(achievement.id, activeAchievementTab)}
                >
                  Delete
                </button>
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
                    <option value="Management">Management</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {newAchievement.category === 'Other' && (
                  <div className="form-group">
                    <label>Custom Category</label>
                    <input
                      type="text"
                      value={newAchievement.customCategory}
                      onChange={(e) => setNewAchievement({...newAchievement, customCategory: e.target.value})}
                      placeholder="Enter custom category"
                    />
                  </div>
                )}

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

              <div className="form-row">
                <div className="form-group">
                  <label>Faculty Department</label>
                  <select
                    value={newAchievement.facultyDepartment}
                    onChange={(e) => setNewAchievement({...newAchievement, facultyDepartment: e.target.value, selectedFaculty: ''})}
                  >
                    <option value="">Select Department</option>
                    {Object.keys(facultyData).filter(dept => dept !== 'Batch Mentors').map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Faculty for Approval</label>
                  <select
                    value={newAchievement.selectedFaculty}
                    onChange={(e) => setNewAchievement({...newAchievement, selectedFaculty: e.target.value})}
                    disabled={!newAchievement.facultyDepartment}
                  >
                    <option value="">Select Faculty</option>
                    {/* Department-specific faculty */}
                    {newAchievement.facultyDepartment && facultyData[newAchievement.facultyDepartment]?.map(faculty => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name} ({faculty.subject})
                      </option>
                    ))}
                    {/* Batch mentors - always available */}
                    {facultyData['Batch Mentors']?.map(faculty => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name} - {faculty.batchName} ({faculty.department})
                      </option>
                    ))}
                  </select>
                </div>
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
