import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ActivityTracker.css';

const ActivityTracker = ({ onActivityUpdate }) => {
  const [activeTab, setActiveTab] = useState('seminars');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  
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
  const [newActivity, setNewActivity] = useState({
    title: '',
    type: 'seminar',
    description: '',
    date: '',
    duration: '',
    organizer: '',
    location: '',
    certificate: null,
    credits: 0,
    status: 'pending',
    facultyDepartment: '',
    selectedFaculty: ''
  });

  // Activity data with different types
  const [activities, setActivities] = useState({
    seminars: [
      {
        id: 1,
        title: "AI in Education Workshop",
        description: "Workshop on implementing AI tools in educational settings",
        date: "2024-01-15",
        duration: "4 hours",
        organizer: "TechEd Institute",
        location: "Virtual",
        credits: 2,
        status: "approved",
        certificate: null,
        approvedBy: "Dr. Smith",
        approvedDate: "2024-01-16"
      },
      {
        id: 2,
        title: "Research Methodology Seminar",
        description: "Advanced research techniques and methodologies",
        date: "2024-02-20",
        duration: "6 hours",
        organizer: "University Research Center",
        location: "Campus Hall A",
        credits: 3,
        status: "pending",
        certificate: null
      }
    ],
    internships: [
      {
        id: 3,
        title: "Software Development Internship",
        description: "6-month internship at leading tech company",
        date: "2024-01-01",
        duration: "6 months",
        organizer: "TechCorp Solutions",
        location: "Remote",
        credits: 15,
        status: "approved",
        certificate: null,
        approvedBy: "Ms. Davis",
        approvedDate: "2024-01-05"
      }
    ],
    extracurriculars: [
      {
        id: 4,
        title: "Coding Competition Winner",
        description: "First place in national coding competition",
        date: "2024-02-15",
        duration: "1 day",
        organizer: "CodeFest 2024",
        location: "Virtual",
        credits: 3,
        status: "approved",
        certificate: null,
        approvedBy: "Dr. Wilson",
        approvedDate: "2024-02-16"
      }
    ],
    others: [
      {
        id: 5,
        title: "Volunteer Teaching Assistant",
        description: "Assisted in teaching programming fundamentals to beginners",
        date: "2024-01-10",
        duration: "3 months",
        organizer: "Community Learning Center",
        location: "Local Library",
        credits: 4,
        status: "approved",
        certificate: null,
        approvedBy: "Ms. Johnson",
        approvedDate: "2024-01-12"
      }
    ]
  });

  const handleAddActivity = () => {
    if (newActivity.title && newActivity.date && newActivity.organizer) {
      const activity = {
        id: Date.now(),
        ...newActivity,
        type: activeTab === 'others' ? 'other' : activeTab.slice(0, -1) // Handle 'others' -> 'other'
      };
      
      setActivities(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], activity]
      }));
      
      // Notify parent component about activity update
      if (onActivityUpdate) {
        onActivityUpdate(activity);
      }
      
      setNewActivity({
        title: '',
        type: activeTab === 'others' ? 'other' : activeTab.slice(0, -1),
        description: '',
        date: '',
        duration: '',
        organizer: '',
        location: '',
        certificate: null,
        credits: 0,
        status: 'pending',
        facultyDepartment: '',
        selectedFaculty: ''
      });
      setIsAddModalOpen(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewActivity(prev => ({ ...prev, certificate: file }));
    }
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setNewActivity({
      title: activity.title,
      type: activity.type,
      description: activity.description,
      date: activity.date,
      duration: activity.duration,
      organizer: activity.organizer,
      location: activity.location,
      certificate: activity.certificate,
      credits: activity.credits,
      status: activity.status,
      facultyDepartment: activity.facultyDepartment || '',
      selectedFaculty: activity.selectedFaculty || ''
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateActivity = () => {
    if (newActivity.title && newActivity.date && newActivity.organizer) {
      setActivities(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(activity => 
          activity.id === editingActivity.id 
            ? { ...activity, ...newActivity }
            : activity
        )
      }));
      
      // Notify parent component about activity update
      if (onActivityUpdate) {
        onActivityUpdate({ ...editingActivity, ...newActivity });
      }
      
      setNewActivity({
        title: '',
        type: 'seminar',
        description: '',
        date: '',
        duration: '',
        organizer: '',
        location: '',
        certificate: null,
        credits: 0,
        status: 'pending',
        facultyDepartment: '',
        selectedFaculty: ''
      });
      setEditingActivity(null);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteActivity = (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(activity => activity.id !== activityId)
      }));
      
      // Notify parent component about activity deletion
      if (onActivityUpdate) {
        onActivityUpdate({ id: activityId, action: 'delete' });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✓';
      case 'pending': return '⏳';
      case 'rejected': return '✗';
      default: return '?';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'seminar': return '🎓';
      case 'internship': return '💼';
      case 'extracurricular': return '🏆';
      case 'other': return '📋';
      default: return '📋';
    }
  };

  const currentActivities = activities[activeTab] || [];

  return (
    <div className="activity-tracker">
      <div className="activity-header">
        <h2 className="section-title">Activity Tracker</h2>
        <button 
          className="add-activity-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          <span>+</span>
          Add Activity
        </button>
      </div>

      {/* Activity Type Tabs */}
      <div className="activity-tabs">
        {Object.keys(activities).map(tab => (
          <button
            key={tab}
            className={`activity-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <span className="tab-icon">{getActivityIcon(tab.slice(0, -1))}</span>
            <span className="tab-text">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            <span className="tab-count">({currentActivities.length})</span>
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="activities-grid">
        {currentActivities.map(activity => (
          <motion.div
            key={activity.id}
            className="activity-card glass-morphism"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="activity-header-card">
              <div className="activity-icon">{getActivityIcon(activity.type)}</div>
              <div className="activity-status" style={{ color: getStatusColor(activity.status) }}>
                <span className="status-icon">{getStatusIcon(activity.status)}</span>
                <span className="status-text">{activity.status}</span>
              </div>
            </div>
            
            <h3 className="activity-title">{activity.title}</h3>
            <p className="activity-description">{activity.description}</p>
            
            <div className="activity-details">
              <div className="detail-item">
                <strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}
              </div>
              <div className="detail-item">
                <strong>Duration:</strong> {activity.duration}
              </div>
              <div className="detail-item">
                <strong>Organizer:</strong> {activity.organizer}
              </div>
              <div className="detail-item">
                <strong>Location:</strong> {activity.location}
              </div>
              <div className="detail-item">
                <strong>Credits:</strong> {activity.credits}
              </div>
            </div>

            {activity.status === 'approved' && activity.approvedBy && (
              <div className="approval-info">
                <div className="approval-detail">
                  <strong>Approved by:</strong> {activity.approvedBy}
                </div>
                <div className="approval-detail">
                  <strong>Approved on:</strong> {new Date(activity.approvedDate).toLocaleDateString()}
                </div>
              </div>
            )}

            <div className="activity-actions">
              {activity.certificate && (
                <button className="view-certificate-btn">View Certificate</button>
              )}
              <button 
                className="edit-activity-btn"
                onClick={() => handleEditActivity(activity)}
              >
                Edit
              </button>
              <button 
                className="delete-activity-btn"
                onClick={() => handleDeleteActivity(activity.id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Activity Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="add-activity-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Activity</h3>
              <button 
                className="close-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Activity Title</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                  placeholder="Enter activity title"
                />
              </div>

              <div className="form-group">
                <label>Activity Type</label>
                <select
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                >
                  <option value="seminar">Seminar</option>
                  <option value="internship">Internship</option>
                  <option value="extracurricular">Extra-curricular</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  placeholder="Describe the activity"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                    placeholder="e.g., 2 hours, 1 day, 3 months"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Organizer</label>
                  <input
                    type="text"
                    value={newActivity.organizer}
                    onChange={(e) => setNewActivity({...newActivity, organizer: e.target.value})}
                    placeholder="Organization name"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                    placeholder="Location or 'Virtual'"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Credits</label>
                <input
                  type="number"
                  value={newActivity.credits}
                  onChange={(e) => setNewActivity({...newActivity, credits: parseInt(e.target.value) || 0})}
                  placeholder="Credit points"
                  min="0"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Faculty Department</label>
                  <select
                    value={newActivity.facultyDepartment}
                    onChange={(e) => setNewActivity({...newActivity, facultyDepartment: e.target.value, selectedFaculty: ''})}
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
                    value={newActivity.selectedFaculty}
                    onChange={(e) => setNewActivity({...newActivity, selectedFaculty: e.target.value})}
                    disabled={!newActivity.facultyDepartment}
                  >
                    <option value="">Select Faculty</option>
                    {/* Department-specific faculty */}
                    {newActivity.facultyDepartment && facultyData[newActivity.facultyDepartment]?.map(faculty => (
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
                <label>Certificate/Proof</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleAddActivity}
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Activity Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="add-activity-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Activity</h3>
              <button 
                className="close-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Activity Title</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                  placeholder="Enter activity title"
                />
              </div>

              <div className="form-group">
                <label>Activity Type</label>
                <select
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                >
                  <option value="seminar">Seminar</option>
                  <option value="internship">Internship</option>
                  <option value="extracurricular">Extra-curricular</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  placeholder="Describe the activity"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                    placeholder="e.g., 2 hours, 1 day, 3 months"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Organizer</label>
                  <input
                    type="text"
                    value={newActivity.organizer}
                    onChange={(e) => setNewActivity({...newActivity, organizer: e.target.value})}
                    placeholder="Organization name"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                    placeholder="Location or 'Virtual'"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Credits</label>
                <input
                  type="number"
                  value={newActivity.credits}
                  onChange={(e) => setNewActivity({...newActivity, credits: parseInt(e.target.value) || 0})}
                  placeholder="Credit points"
                  min="0"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Faculty Department</label>
                  <select
                    value={newActivity.facultyDepartment}
                    onChange={(e) => setNewActivity({...newActivity, facultyDepartment: e.target.value, selectedFaculty: ''})}
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
                    value={newActivity.selectedFaculty}
                    onChange={(e) => setNewActivity({...newActivity, selectedFaculty: e.target.value})}
                    disabled={!newActivity.facultyDepartment}
                  >
                    <option value="">Select Faculty</option>
                    {/* Department-specific faculty */}
                    {newActivity.facultyDepartment && facultyData[newActivity.facultyDepartment]?.map(faculty => (
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
                <label>Certificate/Proof</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleUpdateActivity}
              >
                Update Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTracker;
