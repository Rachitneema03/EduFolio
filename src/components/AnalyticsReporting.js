import React, { useState } from 'react';
import './AnalyticsReporting.css';

const AnalyticsReporting = ({ onReportGenerate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReport, setSelectedReport] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  });

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalStudents: 1250,
      totalActivities: 3450,
      totalCredits: 12500,
      averageCreditsPerStudent: 10.0,
      approvalRate: 87.5,
      topActivityTypes: [
        { type: 'MOOCs', count: 1200, percentage: 35 },
        { type: 'Seminars', count: 850, percentage: 25 },
        { type: 'Internships', count: 600, percentage: 17 },
        { type: 'Conferences', count: 500, percentage: 14 },
        { type: 'Extra-curriculars', count: 300, percentage: 9 }
      ],
      departmentStats: [
        { department: 'Computer Science', students: 450, activities: 1200 },
        { department: 'Electronics', students: 300, activities: 800 },
        { department: 'Mechanical', students: 250, activities: 650 },
        { department: 'Civil', students: 150, activities: 400 },
        { department: 'Others', students: 100, activities: 300 }
      ]
    },
    naac: {
      criteria1: {
        title: 'Curricular Aspects',
        score: 85,
        activities: 450,
        description: 'Activities related to curriculum enhancement and academic excellence'
      },
      criteria2: {
        title: 'Teaching-Learning and Evaluation',
        score: 90,
        activities: 600,
        description: 'Student engagement in teaching-learning processes'
      },
      criteria3: {
        title: 'Research, Innovations and Extension',
        score: 75,
        activities: 300,
        description: 'Research activities, innovations, and community extension programs'
      },
      criteria4: {
        title: 'Infrastructure and Learning Resources',
        score: 80,
        activities: 200,
        description: 'Infrastructure utilization and learning resource activities'
      },
      criteria5: {
        title: 'Student Support and Progression',
        score: 88,
        activities: 800,
        description: 'Student support services and progression activities'
      },
      criteria6: {
        title: 'Governance, Leadership and Management',
        score: 82,
        activities: 150,
        description: 'Institutional governance and management activities'
      },
      criteria7: {
        title: 'Institutional Values and Best Practices',
        score: 85,
        activities: 400,
        description: 'Values-based activities and best practices'
      }
    },
    aicte: {
      studentEngagement: {
        totalStudents: 1250,
        engagedStudents: 1100,
        engagementRate: 88.0,
        averageActivitiesPerStudent: 2.8
      },
      skillDevelopment: {
        technicalSkills: 850,
        softSkills: 600,
        leadershipSkills: 400,
        totalSkillActivities: 1850
      },
      industryConnect: {
        internships: 600,
        industryVisits: 200,
        guestLectures: 150,
        totalIndustryActivities: 950
      }
    },
    nirf: {
      teachingLearning: {
        score: 85,
        activities: 800,
        description: 'Teaching and learning process improvements'
      },
      research: {
        score: 75,
        activities: 300,
        description: 'Research and development activities'
      },
      graduationOutcomes: {
        score: 90,
        activities: 1200,
        description: 'Student graduation and placement outcomes'
      },
      outreach: {
        score: 80,
        activities: 400,
        description: 'Outreach and inclusivity activities'
      },
      perception: {
        score: 85,
        activities: 200,
        description: 'Institutional perception and reputation'
      }
    }
  };

  const reportTypes = [
    { id: 'naac', name: 'NAAC Report', description: 'National Assessment and Accreditation Council compliance report' },
    { id: 'aicte', name: 'AICTE Report', description: 'All India Council for Technical Education compliance report' },
    { id: 'nirf', name: 'NIRF Report', description: 'National Institutional Ranking Framework report' },
    { id: 'internal', name: 'Internal Report', description: 'Internal institutional evaluation report' },
    { id: 'custom', name: 'Custom Report', description: 'Customized report based on specific criteria' }
  ];

  const handleGenerateReport = async (reportType) => {
    setIsGeneratingReport(true);
    setSelectedReport(reportType);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      if (onReportGenerate) {
        onReportGenerate({
          type: reportType,
          dateRange,
          data: analyticsData[reportType] || analyticsData.overview,
          generatedAt: new Date().toISOString()
        });
      }
    }, 2000);
  };

  const renderOverview = () => (
    <div className="analytics-overview">
      <div className="overview-stats">
        <div className="stat-card glass-morphism">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{analyticsData.overview.totalStudents.toLocaleString()}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card glass-morphism">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{analyticsData.overview.totalActivities.toLocaleString()}</h3>
            <p>Total Activities</p>
          </div>
        </div>
        <div className="stat-card glass-morphism">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>{analyticsData.overview.totalCredits.toLocaleString()}</h3>
            <p>Total Credits</p>
          </div>
        </div>
        <div className="stat-card glass-morphism">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{analyticsData.overview.approvalRate}%</h3>
            <p>Approval Rate</p>
          </div>
        </div>
      </div>

      <div className="overview-charts">
        <div className="chart-section">
          <h3>Activity Distribution by Type</h3>
          <div className="activity-distribution">
            {analyticsData.overview.topActivityTypes.map((activity, index) => (
              <div key={index} className="activity-bar">
                <div className="activity-label">{activity.type}</div>
                <div className="activity-bar-container">
                  <div 
                    className="activity-bar-fill"
                    style={{ width: `${activity.percentage}%` }}
                  ></div>
                </div>
                <div className="activity-count">{activity.count} ({activity.percentage}%)</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <h3>Department-wise Statistics</h3>
          <div className="department-stats">
            {analyticsData.overview.departmentStats.map((dept, index) => (
              <div key={index} className="department-card glass-morphism">
                <h4>{dept.department}</h4>
                <div className="dept-stats">
                  <div className="dept-stat">
                    <span className="dept-stat-number">{dept.students}</span>
                    <span className="dept-stat-label">Students</span>
                  </div>
                  <div className="dept-stat">
                    <span className="dept-stat-number">{dept.activities}</span>
                    <span className="dept-stat-label">Activities</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNAAC = () => (
    <div className="naac-analytics">
      <div className="naac-header">
        <h3>NAAC Criteria Analysis</h3>
        <p>National Assessment and Accreditation Council compliance metrics</p>
      </div>
      
      <div className="naac-criteria">
        {Object.entries(analyticsData.naac).map(([key, criteria]) => (
          <div key={key} className="criteria-card glass-morphism">
            <div className="criteria-header">
              <h4>{criteria.title}</h4>
              <div className="criteria-score">
                <span className="score-number">{criteria.score}</span>
                <span className="score-label">/100</span>
              </div>
            </div>
            <p className="criteria-description">{criteria.description}</p>
            <div className="criteria-stats">
              <div className="criteria-stat">
                <span className="stat-number">{criteria.activities}</span>
                <span className="stat-label">Activities</span>
              </div>
            </div>
            <div className="criteria-progress">
              <div 
                className="progress-bar"
                style={{ width: `${criteria.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAICTE = () => (
    <div className="aicte-analytics">
      <div className="aicte-header">
        <h3>AICTE Compliance Analysis</h3>
        <p>All India Council for Technical Education compliance metrics</p>
      </div>
      
      <div className="aicte-sections">
        <div className="aicte-section glass-morphism">
          <h4>Student Engagement</h4>
          <div className="section-stats">
            <div className="section-stat">
              <span className="stat-number">{analyticsData.aicte.studentEngagement.engagementRate}%</span>
              <span className="stat-label">Engagement Rate</span>
            </div>
            <div className="section-stat">
              <span className="stat-number">{analyticsData.aicte.studentEngagement.averageActivitiesPerStudent}</span>
              <span className="stat-label">Avg Activities/Student</span>
            </div>
          </div>
        </div>

        <div className="aicte-section glass-morphism">
          <h4>Skill Development</h4>
          <div className="section-stats">
            <div className="section-stat">
              <span className="stat-number">{analyticsData.aicte.skillDevelopment.technicalSkills}</span>
              <span className="stat-label">Technical Skills</span>
            </div>
            <div className="section-stat">
              <span className="stat-number">{analyticsData.aicte.skillDevelopment.softSkills}</span>
              <span className="stat-label">Soft Skills</span>
            </div>
            <div className="section-stat">
              <span className="stat-number">{analyticsData.aicte.skillDevelopment.leadershipSkills}</span>
              <span className="stat-label">Leadership Skills</span>
            </div>
          </div>
        </div>

        <div className="aicte-section glass-morphism">
          <h4>Industry Connect</h4>
          <div className="section-stats">
            <div className="section-stat">
              <span className="stat-number">{analyticsData.aicte.industryConnect.internships}</span>
              <span className="stat-label">Internships</span>
            </div>
            <div className="section-stat">
              <span className="stat-number">{analyticsData.aicte.industryConnect.industryVisits}</span>
              <span className="stat-label">Industry Visits</span>
            </div>
            <div className="section-stat">
              <span className="stat-number">{analyticsData.aicte.industryConnect.guestLectures}</span>
              <span className="stat-label">Guest Lectures</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNIRF = () => (
    <div className="nirf-analytics">
      <div className="nirf-header">
        <h3>NIRF Ranking Analysis</h3>
        <p>National Institutional Ranking Framework metrics</p>
      </div>
      
      <div className="nirf-parameters">
        {Object.entries(analyticsData.nirf).map(([key, parameter]) => (
          <div key={key} className="parameter-card glass-morphism">
            <div className="parameter-header">
              <h4>{parameter.title}</h4>
              <div className="parameter-score">
                <span className="score-number">{parameter.score}</span>
                <span className="score-label">/100</span>
              </div>
            </div>
            <p className="parameter-description">{parameter.description}</p>
            <div className="parameter-stats">
              <div className="parameter-stat">
                <span className="stat-number">{parameter.activities}</span>
                <span className="stat-label">Activities</span>
              </div>
            </div>
            <div className="parameter-progress">
              <div 
                className="progress-bar"
                style={{ width: `${parameter.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="reports-section">
      <div className="reports-header">
        <h3>Generate Reports</h3>
        <p>Generate compliance and evaluation reports for various accreditation bodies</p>
      </div>

      <div className="date-range-selector">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
          />
        </div>
      </div>

      <div className="report-types">
        {reportTypes.map(report => (
          <div key={report.id} className="report-card glass-morphism">
            <div className="report-header">
              <h4>{report.name}</h4>
              <button 
                className="generate-report-btn"
                onClick={() => handleGenerateReport(report.id)}
                disabled={isGeneratingReport}
              >
                {isGeneratingReport && selectedReport === report.id ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <p className="report-description">{report.description}</p>
            {isGeneratingReport && selectedReport === report.id && (
              <div className="generation-progress">
                <div className="progress-bar"></div>
                <span>Generating report...</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="analytics-reporting">
      <div className="analytics-header">
        <h2 className="section-title">Analytics & Reporting</h2>
        <div className="analytics-tabs">
          <button
            className={`analytics-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`analytics-tab ${activeTab === 'naac' ? 'active' : ''}`}
            onClick={() => setActiveTab('naac')}
          >
            🏛️ NAAC
          </button>
          <button
            className={`analytics-tab ${activeTab === 'aicte' ? 'active' : ''}`}
            onClick={() => setActiveTab('aicte')}
          >
            🎓 AICTE
          </button>
          <button
            className={`analytics-tab ${activeTab === 'nirf' ? 'active' : ''}`}
            onClick={() => setActiveTab('nirf')}
          >
            🏆 NIRF
          </button>
          <button
            className={`analytics-tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📄 Reports
          </button>
        </div>
      </div>

      <div className="analytics-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'naac' && renderNAAC()}
        {activeTab === 'aicte' && renderAICTE()}
        {activeTab === 'nirf' && renderNIRF()}
        {activeTab === 'reports' && renderReports()}
      </div>
    </div>
  );
};

export default AnalyticsReporting;
