import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FacultyApprovalPanel.css';

const FacultyApprovalPanel = ({ onApprovalUpdate }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Mock data for pending approvals
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      studentId: 'STU001',
      studentName: 'John Doe',
      studentEmail: 'john.doe@university.edu',
      activity: {
        title: "AI in Education Workshop",
        type: "seminar",
        description: "Workshop on implementing AI tools in educational settings",
        date: "2024-01-15",
        duration: "4 hours",
        organizer: "TechEd Institute",
        location: "Virtual",
        credits: 2,
        certificate: "certificate_ai_workshop.pdf",
        submittedDate: "2024-01-16"
      }
    },
    {
      id: 2,
      studentId: 'STU002',
      studentName: 'Jane Smith',
      studentEmail: 'jane.smith@university.edu',
      activity: {
        title: "Research Methodology Seminar",
        type: "seminar",
        description: "Advanced research techniques and methodologies",
        date: "2024-02-20",
        duration: "6 hours",
        organizer: "University Research Center",
        location: "Campus Hall A",
        credits: 3,
        certificate: "research_methodology_cert.pdf",
        submittedDate: "2024-02-21"
      }
    },
    {
      id: 3,
      studentId: 'STU003',
      studentName: 'Mike Johnson',
      studentEmail: 'mike.johnson@university.edu',
      activity: {
        title: "Machine Learning Specialization",
        type: "mooc",
        description: "Comprehensive ML course from Stanford University",
        date: "2024-01-01",
        duration: "12 weeks",
        organizer: "Coursera",
        location: "Online",
        credits: 8,
        certificate: "ml_specialization_cert.pdf",
        submittedDate: "2024-01-15"
      }
    }
  ]);

  const [approvedActivities, setApprovedActivities] = useState([
    {
      id: 4,
      studentId: 'STU004',
      studentName: 'Sarah Wilson',
      studentEmail: 'sarah.wilson@university.edu',
      activity: {
        title: "Software Development Internship",
        type: "internship",
        description: "6-month internship at leading tech company",
        date: "2024-01-01",
        duration: "6 months",
        organizer: "TechCorp Solutions",
        location: "Remote",
        credits: 15,
        certificate: "internship_completion.pdf",
        submittedDate: "2024-01-05",
        approvedDate: "2024-01-06",
        approvedBy: "Dr. Smith"
      }
    }
  ]);

  const [rejectedActivities, setRejectedActivities] = useState([
    {
      id: 5,
      studentId: 'STU005',
      studentName: 'Alex Brown',
      studentEmail: 'alex.brown@university.edu',
      activity: {
        title: "Blockchain Development Course",
        type: "mooc",
        description: "Online course on blockchain technology",
        date: "2024-01-10",
        duration: "8 weeks",
        organizer: "Blockchain Academy",
        location: "Online",
        credits: 6,
        certificate: "blockchain_cert.pdf",
        submittedDate: "2024-01-12",
        rejectedDate: "2024-01-13",
        rejectedBy: "Prof. Johnson",
        rejectionReason: "Certificate authenticity could not be verified"
      }
    }
  ]);

  const handleApprove = (approvalId) => {
    const approval = pendingApprovals.find(a => a.id === approvalId);
    if (approval) {
      // Move to approved list
      const approvedActivity = {
        ...approval,
        activity: {
          ...approval.activity,
          approvedDate: new Date().toISOString().split('T')[0],
          approvedBy: "Current Faculty" // This would be the actual faculty member
        }
      };
      
      setApprovedActivities(prev => [...prev, approvedActivity]);
      setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));
      
      // Notify parent component
      if (onApprovalUpdate) {
        onApprovalUpdate({ type: 'approved', activity: approvedActivity });
      }
    }
  };

  const handleReject = (approvalId) => {
    const approval = pendingApprovals.find(a => a.id === approvalId);
    if (approval && rejectionReason.trim()) {
      // Move to rejected list
      const rejectedActivity = {
        ...approval,
        activity: {
          ...approval.activity,
          rejectedDate: new Date().toISOString().split('T')[0],
          rejectedBy: "Current Faculty", // This would be the actual faculty member
          rejectionReason: rejectionReason
        }
      };
      
      setRejectedActivities(prev => [...prev, rejectedActivity]);
      setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));
      setRejectionReason('');
      setIsDetailModalOpen(false);
      
      // Notify parent component
      if (onApprovalUpdate) {
        onApprovalUpdate({ type: 'rejected', activity: rejectedActivity });
      }
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'seminar': return '🎓';
      case 'conference': return '🏛️';
      case 'mooc': return '💻';
      case 'internship': return '💼';
      case 'extracurricular': return '🏆';
      default: return '📋';
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

  const getCurrentData = () => {
    switch (activeTab) {
      case 'pending': return pendingApprovals;
      case 'approved': return approvedActivities;
      case 'rejected': return rejectedActivities;
      default: return [];
    }
  };

  const currentData = getCurrentData();

  return (
    <div className="faculty-approval-panel">
      <div className="approval-header">
        <h2 className="section-title">Faculty Approval Panel</h2>
        <div className="approval-stats">
          <div className="stat-item">
            <span className="stat-number">{pendingApprovals.length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{approvedActivities.length}</span>
            <span className="stat-label">Approved</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{rejectedActivities.length}</span>
            <span className="stat-label">Rejected</span>
          </div>
        </div>
      </div>

      {/* Approval Tabs */}
      <div className="approval-tabs">
        <button
          className={`approval-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <span className="tab-icon">⏳</span>
          <span className="tab-text">Pending</span>
          <span className="tab-count">({pendingApprovals.length})</span>
        </button>
        <button
          className={`approval-tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          <span className="tab-icon">✓</span>
          <span className="tab-text">Approved</span>
          <span className="tab-count">({approvedActivities.length})</span>
        </button>
        <button
          className={`approval-tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          <span className="tab-icon">✗</span>
          <span className="tab-text">Rejected</span>
          <span className="tab-count">({rejectedActivities.length})</span>
        </button>
      </div>

      {/* Approvals List */}
      <div className="approvals-list">
        {currentData.map(approval => (
          <motion.div
            key={approval.id}
            className="approval-card glass-morphism"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="approval-card-header">
              <div className="student-info">
                <div className="student-avatar">
                  {approval.studentName.charAt(0).toUpperCase()}
                </div>
                <div className="student-details">
                  <h4 className="student-name">{approval.studentName}</h4>
                  <p className="student-id">{approval.studentId}</p>
                  <p className="student-email">{approval.studentEmail}</p>
                </div>
              </div>
              <div className="activity-icon">
                {getActivityIcon(approval.activity.type)}
              </div>
            </div>

            <div className="activity-info">
              <h3 className="activity-title">{approval.activity.title}</h3>
              <p className="activity-description">{approval.activity.description}</p>
              
              <div className="activity-details">
                <div className="detail-row">
                  <span><strong>Date:</strong> {new Date(approval.activity.date).toLocaleDateString()}</span>
                  <span><strong>Duration:</strong> {approval.activity.duration}</span>
                </div>
                <div className="detail-row">
                  <span><strong>Organizer:</strong> {approval.activity.organizer}</span>
                  <span><strong>Credits:</strong> {approval.activity.credits}</span>
                </div>
                <div className="detail-row">
                  <span><strong>Location:</strong> {approval.activity.location}</span>
                  <span><strong>Submitted:</strong> {new Date(approval.activity.submittedDate).toLocaleDateString()}</span>
                </div>
              </div>

              {approval.activity.certificate && (
                <div className="certificate-info">
                  <span className="certificate-label">Certificate:</span>
                  <button className="view-certificate-btn">
                    📄 {approval.activity.certificate}
                  </button>
                </div>
              )}

              {activeTab === 'approved' && approval.activity.approvedBy && (
                <div className="approval-info">
                  <div className="approval-detail">
                    <strong>Approved by:</strong> {approval.activity.approvedBy}
                  </div>
                  <div className="approval-detail">
                    <strong>Approved on:</strong> {new Date(approval.activity.approvedDate).toLocaleDateString()}
                  </div>
                </div>
              )}

              {activeTab === 'rejected' && approval.activity.rejectedBy && (
                <div className="rejection-info">
                  <div className="rejection-detail">
                    <strong>Rejected by:</strong> {approval.activity.rejectedBy}
                  </div>
                  <div className="rejection-detail">
                    <strong>Rejected on:</strong> {new Date(approval.activity.rejectedDate).toLocaleDateString()}
                  </div>
                  <div className="rejection-reason">
                    <strong>Reason:</strong> {approval.activity.rejectionReason}
                  </div>
                </div>
              )}
            </div>

            {activeTab === 'pending' && (
              <div className="approval-actions">
                <button 
                  className="approve-btn"
                  onClick={() => handleApprove(approval.id)}
                >
                  ✓ Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => {
                    setSelectedActivity(approval);
                    setIsDetailModalOpen(true);
                  }}
                >
                  ✗ Reject
                </button>
                <button 
                  className="view-details-btn"
                  onClick={() => {
                    setSelectedActivity(approval);
                    setIsDetailModalOpen(true);
                  }}
                >
                  👁️ View Details
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Rejection Modal */}
      {isDetailModalOpen && selectedActivity && (
        <div className="modal-overlay" onClick={() => setIsDetailModalOpen(false)}>
          <div className="rejection-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Activity Details & Actions</h3>
              <button 
                className="close-btn"
                onClick={() => setIsDetailModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="activity-detail-section">
                <h4>Student Information</h4>
                <p><strong>Name:</strong> {selectedActivity.studentName}</p>
                <p><strong>ID:</strong> {selectedActivity.studentId}</p>
                <p><strong>Email:</strong> {selectedActivity.studentEmail}</p>
              </div>

              <div className="activity-detail-section">
                <h4>Activity Information</h4>
                <p><strong>Title:</strong> {selectedActivity.activity.title}</p>
                <p><strong>Type:</strong> {selectedActivity.activity.type}</p>
                <p><strong>Description:</strong> {selectedActivity.activity.description}</p>
                <p><strong>Date:</strong> {new Date(selectedActivity.activity.date).toLocaleDateString()}</p>
                <p><strong>Organizer:</strong> {selectedActivity.activity.organizer}</p>
                <p><strong>Credits:</strong> {selectedActivity.activity.credits}</p>
              </div>

              {selectedActivity.activity.certificate && (
                <div className="activity-detail-section">
                  <h4>Certificate</h4>
                  <button className="view-certificate-btn">
                    📄 View Certificate: {selectedActivity.activity.certificate}
                  </button>
                </div>
              )}

              <div className="activity-detail-section">
                <h4>Rejection Reason (if rejecting)</h4>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="approve-btn"
                onClick={() => {
                  handleApprove(selectedActivity.id);
                  setIsDetailModalOpen(false);
                }}
              >
                ✓ Approve
              </button>
              <button 
                className="reject-btn"
                onClick={() => handleReject(selectedActivity.id)}
                disabled={!rejectionReason.trim()}
              >
                ✗ Reject
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setIsDetailModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyApprovalPanel;
