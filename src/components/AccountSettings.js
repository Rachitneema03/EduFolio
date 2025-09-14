import React, { useState } from 'react';
import './AccountSettings.css';

const AccountSettings = ({ 
  userData, 
  onUserDataUpdate, 
  isDarkMode, 
  onThemeToggle,
  onNotificationSettingsUpdate,
  onPrivacySettingsUpdate,
  onAccountSettingsUpdate
}) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      courseUpdates: true,
      achievementAlerts: true,
      weeklyDigest: false,
      marketingEmails: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false,
      showLocation: true,
      allowMessages: true,
      showAchievements: true
    },
    account: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: 30,
      dataExport: true,
      accountDeletion: false
    },
    appearance: {
      theme: isDarkMode ? 'dark' : 'light',
      fontSize: 'medium',
      compactMode: false,
      animations: true
    }
  });

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleProfileEdit = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfileChanges = () => {
    onUserDataUpdate({ ...userData, ...editedData });
    setEditedData({});
    setIsEditing(false);
  };

  const saveSettings = (section) => {
    switch (section) {
      case 'notifications':
        onNotificationSettingsUpdate(settings.notifications);
        break;
      case 'privacy':
        onPrivacySettingsUpdate(settings.privacy);
        break;
      case 'account':
        onAccountSettingsUpdate(settings.account);
        break;
      case 'appearance':
        if (settings.appearance.theme !== (isDarkMode ? 'dark' : 'light')) {
          onThemeToggle();
        }
        break;
      default:
        break;
    }
  };

  const resetToDefaults = (section) => {
    const defaults = {
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        courseUpdates: true,
        achievementAlerts: true,
        weeklyDigest: false,
        marketingEmails: false
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: true,
        showPhone: false,
        showLocation: true,
        allowMessages: true,
        showAchievements: true
      },
      account: {
        twoFactorAuth: false,
        loginAlerts: true,
        sessionTimeout: 30,
        dataExport: true,
        accountDeletion: false
      },
      appearance: {
        theme: 'dark',
        fontSize: 'medium',
        compactMode: false,
        animations: true
      }
    };

    setSettings(prev => ({
      ...prev,
      [section]: defaults[section]
    }));
  };

  const sections = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'account', name: 'Account', icon: '⚙️' }
  ];

  return (
    <div className="account-settings">
      <div className="settings-header">
        <h2 className="section-title">Account Settings</h2>
        <p className="section-subtitle">Manage your account preferences and settings</p>
      </div>

      <div className="settings-container">
        {/* Settings Sidebar */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {sections.map(section => (
              <button
                key={section.id}
                className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-text">{section.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Profile Information</h3>
                <button 
                  className={`edit-btn ${isEditing ? 'save' : 'edit'}`}
                  onClick={isEditing ? saveProfileChanges : () => setIsEditing(!isEditing)}
                >
                  {isEditing ? '💾 Save' : '✏️ Edit'}
                </button>
              </div>

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.name || userData?.name || ''}
                        onChange={(e) => handleProfileEdit('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="form-value">{userData?.name || 'Not set'}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedData.email || userData?.email || ''}
                        onChange={(e) => handleProfileEdit('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p className="form-value">{userData?.email || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedData.phone || userData?.phone || ''}
                        onChange={(e) => handleProfileEdit('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="form-value">{userData?.phone || 'Not set'}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.location || userData?.location || ''}
                        onChange={(e) => handleProfileEdit('location', e.target.value)}
                        placeholder="Enter your location"
                      />
                    ) : (
                      <p className="form-value">{userData?.location || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Professional Headline</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.profileHeadline || userData?.profileHeadline || ''}
                      onChange={(e) => handleProfileEdit('profileHeadline', e.target.value)}
                      placeholder="Enter your professional headline"
                    />
                  ) : (
                    <p className="form-value">{userData?.profileHeadline || 'Not set'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editedData.bio || userData?.bio || ''}
                      onChange={(e) => handleProfileEdit('bio', e.target.value)}
                      placeholder="Tell us about yourself"
                      rows="4"
                    />
                  ) : (
                    <p className="form-value">{userData?.bio || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === 'notifications' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Notification Preferences</h3>
                <button className="reset-btn" onClick={() => resetToDefaults('notifications')}>
                  🔄 Reset to Defaults
                </button>
              </div>

              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Email Notifications</h4>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Push Notifications</h4>
                    <p>Receive browser push notifications</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Course Updates</h4>
                    <p>Get notified about course progress and deadlines</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.courseUpdates}
                      onChange={(e) => handleInputChange('notifications', 'courseUpdates', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Achievement Alerts</h4>
                    <p>Get notified when you earn new achievements</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.achievementAlerts}
                      onChange={(e) => handleInputChange('notifications', 'achievementAlerts', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Weekly Digest</h4>
                    <p>Receive a weekly summary of your activity</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.weeklyDigest}
                      onChange={(e) => handleInputChange('notifications', 'weeklyDigest', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Marketing Emails</h4>
                    <p>Receive promotional content and updates</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.marketingEmails}
                      onChange={(e) => handleInputChange('notifications', 'marketingEmails', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <button className="save-btn" onClick={() => saveSettings('notifications')}>
                💾 Save Notification Settings
              </button>
            </div>
          )}

          {/* Privacy Settings */}
          {activeSection === 'privacy' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Privacy & Security</h3>
                <button className="reset-btn" onClick={() => resetToDefaults('privacy')}>
                  🔄 Reset to Defaults
                </button>
              </div>

              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Profile Visibility</h4>
                    <p>Control who can see your profile</p>
                  </div>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Show Email</h4>
                    <p>Display email address on profile</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.showEmail}
                      onChange={(e) => handleInputChange('privacy', 'showEmail', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Show Phone</h4>
                    <p>Display phone number on profile</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.showPhone}
                      onChange={(e) => handleInputChange('privacy', 'showPhone', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Show Location</h4>
                    <p>Display location on profile</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.showLocation}
                      onChange={(e) => handleInputChange('privacy', 'showLocation', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Allow Messages</h4>
                    <p>Let others send you messages</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.allowMessages}
                      onChange={(e) => handleInputChange('privacy', 'allowMessages', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Show Achievements</h4>
                    <p>Display achievements on profile</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.showAchievements}
                      onChange={(e) => handleInputChange('privacy', 'showAchievements', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <button className="save-btn" onClick={() => saveSettings('privacy')}>
                💾 Save Privacy Settings
              </button>
            </div>
          )}

          {/* Appearance Settings */}
          {activeSection === 'appearance' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Appearance & Display</h3>
                <button className="reset-btn" onClick={() => resetToDefaults('appearance')}>
                  🔄 Reset to Defaults
                </button>
              </div>

              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Theme</h4>
                    <p>Choose your preferred theme</p>
                  </div>
                  <select
                    value={settings.appearance.theme}
                    onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Font Size</h4>
                    <p>Adjust text size for better readability</p>
                  </div>
                  <select
                    value={settings.appearance.fontSize}
                    onChange={(e) => handleInputChange('appearance', 'fontSize', e.target.value)}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Compact Mode</h4>
                    <p>Use compact layout for more content</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.appearance.compactMode}
                      onChange={(e) => handleInputChange('appearance', 'compactMode', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Animations</h4>
                    <p>Enable smooth animations and transitions</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.appearance.animations}
                      onChange={(e) => handleInputChange('appearance', 'animations', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <button className="save-btn" onClick={() => saveSettings('appearance')}>
                💾 Save Appearance Settings
              </button>
            </div>
          )}

          {/* Account Settings */}
          {activeSection === 'account' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Account Management</h3>
                <button className="reset-btn" onClick={() => resetToDefaults('account')}>
                  🔄 Reset to Defaults
                </button>
              </div>

              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.account.twoFactorAuth}
                      onChange={(e) => handleInputChange('account', 'twoFactorAuth', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Login Alerts</h4>
                    <p>Get notified of new login attempts</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.account.loginAlerts}
                      onChange={(e) => handleInputChange('account', 'loginAlerts', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Session Timeout (minutes)</h4>
                    <p>Automatically log out after inactivity</p>
                  </div>
                  <select
                    value={settings.account.sessionTimeout}
                    onChange={(e) => handleInputChange('account', 'sessionTimeout', parseInt(e.target.value))}
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                    <option value={0}>Never</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Data Export</h4>
                    <p>Allow downloading your data</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.account.dataExport}
                      onChange={(e) => handleInputChange('account', 'dataExport', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item danger">
                  <div className="setting-info">
                    <h4>Account Deletion</h4>
                    <p>Permanently delete your account and all data</p>
                  </div>
                  <button className="danger-btn">
                    🗑️ Delete Account
                  </button>
                </div>
              </div>

              <button className="save-btn" onClick={() => saveSettings('account')}>
                💾 Save Account Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
