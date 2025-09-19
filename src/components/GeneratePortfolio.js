import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './GeneratePortfolio.css';

const GeneratePortfolio = ({ userData, courses = [], certificates = [], achievements = [], platformData = [] }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('light');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState({});
  const portfolioRef = useRef(null);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleContentEdit = (field, value) => {
    setEditedContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // User data with fallbacks for missing information
  const portfolioUserData = {
    name: editedContent.name || userData?.name || 'Your Name',
    email: editedContent.email || userData?.email || 'your.email@example.com',
    phone: editedContent.phone || userData?.phone || 'Your Phone Number',
    location: editedContent.location || userData?.location || 'Your Location',
    profileHeadline: editedContent.profileHeadline || userData?.headline || 'Your Professional Title',
    bio: editedContent.bio || userData?.bio || 'Write your professional bio here...',
    skills: editedContent.skills || userData?.skills || ['Add your skills here'],
    education: editedContent.education || userData?.education || [
      {
        degree: userData?.degree || 'Your Degree',
        school: userData?.collegeName || 'Your Institution',
        year: userData?.passingYear || 'Your Graduation Year',
        gpa: userData?.gpa || ''
      }
    ]
  };

  const portfolioCourses = courses.length > 0 ? courses.filter(course => course.status === 'completed') : [];

  const portfolioCertificates = certificates.length > 0 ? certificates : [];

  const portfolioAchievements = achievements.length > 0 ? achievements.filter(achievement => achievement.status === 'verified') : [];

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const element = portfolioRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${portfolioUserData.name.replace(' ', '_')}_Portfolio.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      const element = portfolioRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `${portfolioUserData.name.replace(' ', '_')}_Portfolio.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (downloadFormat === 'pdf') {
      handleGeneratePDF();
    } else {
      handleGenerateImage();
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'coursera': return <i className="bi bi-mortarboard"></i>;
      case 'udemy': return <i className="bi bi-book"></i>;
      case 'geeksforgeeks': return <i className="bi bi-code-slash"></i>;
      case 'aws': return <i className="bi bi-cloud"></i>;
      case 'freecodecamp': return <i className="bi bi-fire"></i>;
      default: return <i className="bi bi-book"></i>;
    }
  };

  return (
    <div className="generate-portfolio">
      <div className="portfolio-header">
        <div className="header-content">
          <div>
            <h2 className="section-title">Generate Portfolio</h2>
            <p className="section-subtitle">Create and download your professional portfolio</p>
          </div>
          <button 
            className={`edit-resume-btn ${isEditMode ? 'active' : ''}`}
            onClick={toggleEditMode}
          >
            {isEditMode ? <><i className="bi bi-pencil"></i> Exit Edit</> : <><i className="bi bi-pencil"></i> Edit Resume Manually</>}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="portfolio-controls">
        <div className="template-selector">
          <label>Template:</label>
          <select 
            value={selectedTemplate} 
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="minimal">Minimal</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        <div className="format-selector">
          <label>Format:</label>
          <select 
            value={downloadFormat} 
            onChange={(e) => setDownloadFormat(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="png">PNG</option>
          </select>
        </div>

        <button 
          className="generate-btn"
          onClick={handleDownload}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : `Download ${downloadFormat.toUpperCase()}`}
        </button>
      </div>

      {/* Portfolio Preview */}
      <div className="portfolio-preview">
        <div className="portfolio-preview-content">
          <div 
            ref={portfolioRef}
            className={`portfolio-template ${selectedTemplate} ${isEditMode ? 'edit-mode' : ''}`}
          >
          {/* Header Section */}
          <div className="portfolio-header-section">
            <div className="personal-info">
              {isEditMode ? (
                <input
                  type="text"
                  className="editable-input portfolio-name-input"
                  value={portfolioUserData.name}
                  onChange={(e) => handleContentEdit('name', e.target.value)}
                  placeholder="Your Name"
                />
              ) : (
                <h1 className="portfolio-name">{portfolioUserData.name}</h1>
              )}
              
              {isEditMode ? (
                <input
                  type="text"
                  className="editable-input portfolio-title-input"
                  value={portfolioUserData.profileHeadline}
                  onChange={(e) => handleContentEdit('profileHeadline', e.target.value)}
                  placeholder="Your Professional Title"
                />
              ) : (
                <p className="portfolio-title">{portfolioUserData.profileHeadline}</p>
              )}
              
              <div className="contact-info">
                {isEditMode ? (
                  <>
                    <span><i className="bi bi-envelope"></i> <input
                      type="email"
                      className="editable-input contact-input"
                      value={portfolioUserData.email}
                      onChange={(e) => handleContentEdit('email', e.target.value)}
                      placeholder="your.email@example.com"
                    /></span>
                    <span><i className="bi bi-phone"></i> <input
                      type="tel"
                      className="editable-input contact-input"
                      value={portfolioUserData.phone}
                      onChange={(e) => handleContentEdit('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    /></span>
                    <span><i className="bi bi-geo-alt"></i> <input
                      type="text"
                      className="editable-input contact-input"
                      value={portfolioUserData.location}
                      onChange={(e) => handleContentEdit('location', e.target.value)}
                      placeholder="City, State"
                    /></span>
                  </>
                ) : (
                  <>
                    <span><i className="bi bi-envelope"></i> {portfolioUserData.email}</span>
                    <span><i className="bi bi-phone"></i> {portfolioUserData.phone}</span>
                    <span><i className="bi bi-geo-alt"></i> {portfolioUserData.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="portfolio-section">
            <h2 className="section-heading">About Me</h2>
            {isEditMode ? (
              <textarea
                className="editable-textarea bio-textarea"
                value={portfolioUserData.bio}
                onChange={(e) => handleContentEdit('bio', e.target.value)}
                placeholder="Write your professional bio here..."
                rows="4"
              />
            ) : (
              <p className="bio-text">{portfolioUserData.bio}</p>
            )}
          </div>

          {/* Education Section */}
          <div className="portfolio-section">
            <h2 className="section-heading">Education</h2>
            {portfolioUserData.education.map((edu, index) => (
              <div key={index} className="education-item">
                {isEditMode ? (
                  <>
                    <input
                      type="text"
                      className="editable-input education-degree-input"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...portfolioUserData.education];
                        newEducation[index] = { ...edu, degree: e.target.value };
                        handleContentEdit('education', newEducation);
                      }}
                      placeholder="Degree Name"
                    />
                    <div className="education-details-edit">
                      <input
                        type="text"
                        className="editable-input education-school-input"
                        value={edu.school}
                        onChange={(e) => {
                          const newEducation = [...portfolioUserData.education];
                          newEducation[index] = { ...edu, school: e.target.value };
                          handleContentEdit('education', newEducation);
                        }}
                        placeholder="School Name"
                      />
                      <input
                        type="text"
                        className="editable-input education-year-input"
                        value={edu.year}
                        onChange={(e) => {
                          const newEducation = [...portfolioUserData.education];
                          newEducation[index] = { ...edu, year: e.target.value };
                          handleContentEdit('education', newEducation);
                        }}
                        placeholder="Year"
                      />
                    </div>
                    <input
                      type="text"
                      className="editable-input education-gpa-input"
                      value={edu.gpa || ''}
                      onChange={(e) => {
                        const newEducation = [...portfolioUserData.education];
                        newEducation[index] = { ...edu, gpa: e.target.value };
                        handleContentEdit('education', newEducation);
                      }}
                      placeholder="GPA (optional)"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="education-degree">{edu.degree}</h3>
                    <p className="education-school">{edu.school} • {edu.year}</p>
                    {edu.gpa && <p className="education-gpa">GPA: {edu.gpa}</p>}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="portfolio-section">
            <h2 className="section-heading">Skills</h2>
            {isEditMode ? (
              <textarea
                className="editable-textarea skills-textarea"
                value={portfolioUserData.skills.join(', ')}
                onChange={(e) => handleContentEdit('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
                rows="2"
              />
            ) : (
              <div className="skills-container">
                {portfolioUserData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            )}
          </div>

          {/* Social Links Section */}
          {platformData.length > 0 && (
            <div className="portfolio-section">
              <h2 className="section-heading">Connect With Me</h2>
              <div className="social-links-container">
                {platformData.filter(platform => platform.isConnected).map((platform, index) => (
                  <a
                    key={index}
                    href={platform.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <span className="social-icon">{platform.icon}</span>
                    <span className="social-platform">{platform.platform}</span>
                    <span className="social-username">@{platform.username}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Courses Section */}
          <div className="portfolio-section">
            <h2 className="section-heading">Courses & Training</h2>
            {portfolioCourses.map((course, index) => (
              <div key={index} className="course-item">
                <div className="course-header">
                  <h3 className="course-name">{course.name}</h3>
                  <span className="course-platform">
                    {getPlatformIcon(course.platform)} {course.platform}
                  </span>
                </div>
                <p className="course-dates">
                  {course.startDate} - {course.endDate}
                </p>
              </div>
            ))}
          </div>

          {/* Certificates Section */}
          <div className="portfolio-section">
            <h2 className="section-heading">Certifications</h2>
            {portfolioCertificates.map((cert, index) => (
              <div key={index} className="certificate-item">
                <div className="certificate-header">
                  <h3 className="certificate-name">{cert.name}</h3>
                  <span className="certificate-platform">
                    {getPlatformIcon(cert.platform)} {cert.platform}
                  </span>
                </div>
                <p className="certificate-date">Issued: {cert.date}</p>
                {cert.link && (
                  <a href={cert.link} className="certificate-link" target="_blank" rel="noopener noreferrer">
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Achievements Section */}
          <div className="portfolio-section">
            <h2 className="section-heading">Achievements</h2>
            {portfolioAchievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-header">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <span className="achievement-platform">
                    {getPlatformIcon(achievement.platform)} {achievement.platform}
                  </span>
                </div>
                <p className="achievement-date">Completed: {achievement.date}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
        
        {/* Sidebar */}
        <div className="portfolio-preview-sidebar">
          <h3 style={{color: '#1a1a1a', marginBottom: '1rem', fontSize: '1.2rem'}}>Quick Stats</h3>
          <div style={{marginBottom: '1.5rem'}}>
            <p style={{color: '#6b7280', marginBottom: '0.5rem'}}>Courses Completed</p>
            <p style={{color: '#1a1a1a', fontSize: '1.5rem', fontWeight: 'bold'}}>{portfolioCourses.length}</p>
          </div>
          <div style={{marginBottom: '1.5rem'}}>
            <p style={{color: '#6b7280', marginBottom: '0.5rem'}}>Certificates Earned</p>
            <p style={{color: '#1a1a1a', fontSize: '1.5rem', fontWeight: 'bold'}}>{portfolioCertificates.length}</p>
          </div>
          <div style={{marginBottom: '1.5rem'}}>
            <p style={{color: '#6b7280', marginBottom: '0.5rem'}}>Achievements</p>
            <p style={{color: '#1a1a1a', fontSize: '1.5rem', fontWeight: 'bold'}}>{portfolioAchievements.length}</p>
          </div>
          <div>
            <p style={{color: '#6b7280', marginBottom: '0.5rem'}}>Skills</p>
            <p style={{color: '#1a1a1a', fontSize: '1rem'}}>{portfolioUserData.skills.length} skills listed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePortfolio;
