import React, { useState } from 'react';
import './Connect.css';

const Connect = ({ onPlatformDataUpdate }) => {
  const [connectedPlatforms, setConnectedPlatforms] = useState([
    {
      id: 1,
      platform: 'LinkedIn',
      username: 'john-doe-dev',
      profileUrl: 'https://linkedin.com/in/john-doe-dev',
      isConnected: true,
      icon: 'bi-linkedin'
    },
    {
      id: 2,
      platform: 'GitHub',
      username: 'johndoe',
      profileUrl: 'https://github.com/johndoe',
      isConnected: true,
      icon: 'bi-github'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [newPlatform, setNewPlatform] = useState({
    platform: '',
    username: '',
    profileUrl: '',
    icon: 'bi-link'
  });

  const availablePlatforms = [
    { name: 'LinkedIn', icon: 'bi-linkedin', color: '#0077b5' },
    { name: 'GitHub', icon: 'bi-github', color: '#ffffff' },
    { name: 'Coursera', icon: 'bi-mortarboard', color: '#0056d3' },
    { name: 'Udemy', icon: 'bi-book', color: '#a435f0' },
    { name: 'GeeksforGeeks', icon: 'bi-code-slash', color: '#2f8d46' },
    { name: 'LeetCode', icon: 'bi-lightning', color: '#ffa116' },
    { name: 'HackerRank', icon: 'bi-trophy', color: '#00ea64' },
    { name: 'CodePen', icon: 'bi-pencil', color: '#ffffff' },
    { name: 'Portfolio Website', icon: 'bi-globe', color: '#6366f1' },
    { name: 'Twitter', icon: 'bi-twitter', color: '#1da1f2' },
    { name: 'YouTube', icon: 'bi-youtube', color: '#ff0000' },
    { name: 'Medium', icon: 'bi-file-text', color: '#00ab6c' },
    { name: 'Dev.to', icon: 'bi-code-square', color: '#ffffff' },
    { name: 'Stack Overflow', icon: 'bi-stack-overflow', color: '#f48024' },
    { name: 'Other', icon: 'bi-link', color: '#6b7280' }
  ];

  const handleAddPlatform = () => {
    if (newPlatform.platform && newPlatform.username) {
      const platform = {
        id: Date.now(),
        platform: newPlatform.platform,
        username: newPlatform.username,
        profileUrl: newPlatform.profileUrl || `https://${newPlatform.platform.toLowerCase()}.com/${newPlatform.username}`,
        isConnected: true,
        icon: newPlatform.icon
      };

      setConnectedPlatforms(prev => [...prev, platform]);
      setNewPlatform({ platform: '', username: '', profileUrl: '', icon: 'bi-link' });
      setIsAddModalOpen(false);
      onPlatformDataUpdate([...connectedPlatforms, platform]);
    }
  };

  const handleEditPlatform = (platform) => {
    setEditingPlatform(platform);
    setNewPlatform({
      platform: platform.platform,
      username: platform.username,
      profileUrl: platform.profileUrl,
      icon: platform.icon
    });
    setIsAddModalOpen(true);
  };

  const handleUpdatePlatform = () => {
    if (editingPlatform && newPlatform.platform && newPlatform.username) {
      setConnectedPlatforms(prev => 
        prev.map(p => 
          p.id === editingPlatform.id 
            ? {
                ...p,
                platform: newPlatform.platform,
                username: newPlatform.username,
                profileUrl: newPlatform.profileUrl || `https://${newPlatform.platform.toLowerCase()}.com/${newPlatform.username}`,
                icon: newPlatform.icon
              }
            : p
        )
      );
      setEditingPlatform(null);
      setNewPlatform({ platform: '', username: '', profileUrl: '', icon: 'bi-link' });
      setIsAddModalOpen(false);
    }
  };

  const handleDeletePlatform = (id) => {
    setConnectedPlatforms(prev => {
      const updated = prev.filter(p => p.id !== id);
      onPlatformDataUpdate(updated);
      return updated;
    });
  };

  const handleToggleConnection = (id) => {
    setConnectedPlatforms(prev => {
      const updated = prev.map(p => 
        p.id === id ? { ...p, isConnected: !p.isConnected } : p
      );
      onPlatformDataUpdate(updated);
      return updated;
    });
  };

  const getPlatformInfo = (platformName) => {
    return availablePlatforms.find(p => p.name === platformName) || { name: platformName, icon: 'bi-link', color: '#6b7280' };
  };

  const openModal = () => {
    setEditingPlatform(null);
    setNewPlatform({ platform: '', username: '', profileUrl: '', icon: '🔗' });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setEditingPlatform(null);
    setNewPlatform({ platform: '', username: '', profileUrl: '', icon: '🔗' });
    setIsAddModalOpen(false);
  };

  return (
    <div className="connect-content">
      <div className="connect-header">
        <h2 className="section-title">Connect Your Platforms</h2>
        <p className="section-subtitle">Link your professional accounts for easy access and portfolio integration</p>
      </div>

      {/* Add Platform Button */}
      <div className="add-platform-section">
        <button className="add-platform-btn" onClick={openModal}>
          <span><i className="bi bi-plus"></i></span>
          Add Platform
        </button>
      </div>

      {/* Connected Platforms Grid */}
      <div className="platforms-grid">
        {connectedPlatforms.length > 0 ? (
          connectedPlatforms.map(platform => {
            const platformInfo = getPlatformInfo(platform.platform);
            return (
              <div key={platform.id} className={`platform-card ${platform.isConnected ? 'connected' : 'disconnected'}`}>
                <div className="platform-header">
                  <div className="platform-icon" style={{ color: platformInfo.color }}>
                    <i className={`bi ${platform.icon}`}></i>
                  </div>
                  <div className="platform-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEditPlatform(platform)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeletePlatform(platform.id)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>

                <div className="platform-info">
                  <h3 className="platform-name">{platform.platform}</h3>
                  <p className="platform-username">@{platform.username}</p>
                  <a 
                    href={platform.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="platform-link"
                  >
                    Visit Profile
                  </a>
                </div>

                <div className="platform-status">
                  <button 
                    className={`status-toggle ${platform.isConnected ? 'connected' : 'disconnected'}`}
                    onClick={() => handleToggleConnection(platform.id)}
                  >
                    {platform.isConnected ? '✅ Connected' : '❌ Disconnected'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-platforms">
            <div className="empty-icon"><i className="bi bi-link"></i></div>
            <h3>No Platforms Connected</h3>
            <p>Add your professional platforms to get started</p>
            <button className="add-first-platform-btn" onClick={openModal}>
              <i className="bi bi-plus"></i>
              Add Your First Platform
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Platform Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="platform-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingPlatform ? 'Edit Platform' : 'Add New Platform'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Platform</label>
                <select
                  value={newPlatform.platform}
                  onChange={(e) => {
                    const selected = availablePlatforms.find(p => p.name === e.target.value);
                    setNewPlatform(prev => ({
                      ...prev,
                      platform: e.target.value,
                      icon: selected ? selected.icon : 'bi-link'
                    }));
                  }}
                >
                  <option value="">Select Platform</option>
                  {availablePlatforms.map(platform => (
                    <option key={platform.name} value={platform.name}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={newPlatform.username}
                  onChange={(e) => setNewPlatform(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <label>Profile URL (Optional)</label>
                <input
                  type="url"
                  value={newPlatform.profileUrl}
                  onChange={(e) => setNewPlatform(prev => ({ ...prev, profileUrl: e.target.value }))}
                  placeholder="https://platform.com/your-profile"
                />
                <small>Leave empty to auto-generate from username</small>
              </div>

              <div className="form-group">
                <label>Icon (Optional)</label>
                <input
                  type="text"
                  value={newPlatform.icon}
                  onChange={(e) => setNewPlatform(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="🔗"
                  maxLength="2"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={editingPlatform ? handleUpdatePlatform : handleAddPlatform}
              >
                {editingPlatform ? 'Update Platform' : 'Add Platform'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connect;
