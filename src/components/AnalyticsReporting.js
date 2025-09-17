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
    }
  };

  const reportTypes = [
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
            className={`analytics-tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📄 Reports
          </button>
        </div>
      </div>

      <div className="analytics-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'reports' && renderReports()}
      </div>
    </div>
  );
};

export default AnalyticsReporting;
