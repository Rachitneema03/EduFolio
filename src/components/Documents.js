import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Documents.css';

const Documents = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [newDocument, setNewDocument] = useState({
    name: '',
    category: '',
    description: '',
    file: null,
    tags: []
  });

  // Document categories
  const categories = [
    'Academic Records',
    'Certificates',
    'Assignments',
    'Projects',
    'Research Papers',
    'Resume/CV',
    'Cover Letters',
    'Transcripts',
    'Recommendation Letters',
    'Other'
  ];

  // Sample documents data
  const [documents, setDocuments] = useState({
    'all': [
      {
        id: 1,
        name: 'Final Year Project Report',
        category: 'Projects',
        description: 'Complete project documentation for AI-based learning system',
        uploadDate: '2024-01-15',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        tags: ['AI', 'Machine Learning', 'Final Year'],
        file: null
      },
      {
        id: 2,
        name: 'Academic Transcript',
        category: 'Academic Records',
        description: 'Official transcript from university',
        uploadDate: '2024-01-10',
        fileSize: '1.2 MB',
        fileType: 'PDF',
        tags: ['Official', 'Grades'],
        file: null
      },
      {
        id: 3,
        name: 'React Certification',
        category: 'Certificates',
        description: 'React.js certification from online course',
        uploadDate: '2024-01-05',
        fileSize: '800 KB',
        fileType: 'PDF',
        tags: ['React', 'Frontend', 'Certification'],
        file: null
      }
    ],
    'Academic Records': [
      {
        id: 2,
        name: 'Academic Transcript',
        category: 'Academic Records',
        description: 'Official transcript from university',
        uploadDate: '2024-01-10',
        fileSize: '1.2 MB',
        fileType: 'PDF',
        tags: ['Official', 'Grades'],
        file: null
      }
    ],
    'Certificates': [
      {
        id: 3,
        name: 'React Certification',
        category: 'Certificates',
        description: 'React.js certification from online course',
        uploadDate: '2024-01-05',
        fileSize: '800 KB',
        fileType: 'PDF',
        tags: ['React', 'Frontend', 'Certification'],
        file: null
      }
    ],
    'Projects': [
      {
        id: 1,
        name: 'Final Year Project Report',
        category: 'Projects',
        description: 'Complete project documentation for AI-based learning system',
        uploadDate: '2024-01-15',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        tags: ['AI', 'Machine Learning', 'Final Year'],
        file: null
      }
    ],
    'Assignments': [],
    'Research Papers': [],
    'Resume/CV': [],
    'Cover Letters': [],
    'Transcripts': [],
    'Recommendation Letters': [],
    'Other': []
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewDocument(prev => ({ ...prev, file: file, name: file.name }));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setNewDocument(prev => ({ ...prev, file: file, name: file.name }));
    }
  };

  const handleUploadDocument = () => {
    if (newDocument.name && newDocument.category && newDocument.file) {
      const document = {
        id: Date.now(),
        ...newDocument,
        uploadDate: new Date().toISOString().split('T')[0],
        fileSize: (newDocument.file.size / (1024 * 1024)).toFixed(1) + ' MB',
        fileType: newDocument.file.name.split('.').pop().toUpperCase()
      };

      // Add to all documents
      setDocuments(prev => ({
        ...prev,
        all: [...prev.all, document],
        [newDocument.category]: [...prev[newDocument.category], document]
      }));

      setNewDocument({
        name: '',
        category: '',
        description: '',
        file: null,
        tags: []
      });
      setIsUploadModalOpen(false);
    }
  };

  const handleEditDocument = (document) => {
    setEditingDocument(document);
    setNewDocument({
      name: document.name,
      category: document.category,
      description: document.description,
      file: document.file,
      tags: document.tags
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateDocument = () => {
    if (newDocument.name && newDocument.category) {
      const updatedDocument = {
        ...editingDocument,
        ...newDocument
      };

      setDocuments(prev => ({
        ...prev,
        all: prev.all.map(doc => doc.id === editingDocument.id ? updatedDocument : doc),
        [editingDocument.category]: prev[editingDocument.category].map(doc => 
          doc.id === editingDocument.id ? updatedDocument : doc
        )
      }));

      setNewDocument({
        name: '',
        category: '',
        description: '',
        file: null,
        tags: []
      });
      setEditingDocument(null);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteDocument = (documentId, category) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => ({
        ...prev,
        all: prev.all.filter(doc => doc.id !== documentId),
        [category]: prev[category].filter(doc => doc.id !== documentId)
      }));
    }
  };

  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      case 'xls':
      case 'xlsx': return '📊';
      case 'ppt':
      case 'pptx': return '📊';
      default: return '📁';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Academic Records': return '🎓';
      case 'Certificates': return '🏆';
      case 'Assignments': return '📋';
      case 'Projects': return '💻';
      case 'Research Papers': return '📚';
      case 'Resume/CV': return '👤';
      case 'Cover Letters': return '✉️';
      case 'Transcripts': return '📜';
      case 'Recommendation Letters': return '💌';
      default: return '📁';
    }
  };

  const currentDocuments = documents[activeTab] || [];


  return (
    <div className="documents-content">
      <div className="documents-header">
        <h2 className="section-title">My Documents</h2>
        <button 
          className="upload-document-btn"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <span>+</span>
          Upload Document
        </button>
      </div>

      {/* Document Category Tabs */}
      <div className="document-tabs-container">
        <div className="document-tabs">
          {['all', ...categories].map(tab => (
            <button
              key={tab}
              className={`document-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="tab-icon">
                {tab === 'all' ? '📁' : getCategoryIcon(tab)}
              </span>
              <span className="tab-text">{tab === 'all' ? 'All Documents' : tab}</span>
              <span className="tab-count">({documents[tab]?.length || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="documents-grid">
        {currentDocuments.length > 0 ? (
          currentDocuments.map(document => (
            <motion.div
              key={document.id}
              className="document-card glass-morphism"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="document-header">
                <div className="document-icon">{getFileIcon(document.fileType)}</div>
                <div className="document-actions">
                  <button 
                    className="edit-document-btn"
                    onClick={() => handleEditDocument(document)}
                    title="Edit document"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button 
                    className="delete-document-btn"
                    onClick={() => handleDeleteDocument(document.id, document.category)}
                    title="Delete document"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              
              <h3 className="document-name">{document.name}</h3>
              <p className="document-description">{document.description}</p>
              
              <div className="document-details">
                <div className="detail-item">
                  <strong>Category:</strong> {document.category}
                </div>
                <div className="detail-item">
                  <strong>Upload Date:</strong> {new Date(document.uploadDate).toLocaleDateString()}
                </div>
                <div className="detail-item">
                  <strong>File Size:</strong> {document.fileSize}
                </div>
                <div className="detail-item">
                  <strong>Type:</strong> {document.fileType}
                </div>
              </div>

              {document.tags && document.tags.length > 0 && (
                <div className="document-tags">
                  {document.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="document-footer">
                <button className="download-btn">
                  <i className="bi bi-download"></i>
                  Download
                </button>
                <button className="view-btn">
                  <i className="bi bi-eye"></i>
                  View
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="empty-documents">
            <div className="empty-icon">📁</div>
            <p>No documents in this category</p>
            <p className="empty-subtitle">
              {activeTab === 'all' 
                ? 'Upload your first document to get started!'
                : `No documents in ${activeTab} category`
              }
            </p>
          </div>
        )}
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div className="upload-document-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Document</h3>
              <button 
                className="close-btn"
                onClick={() => setIsUploadModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Document Name</label>
                <input
                  type="text"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                  placeholder="Enter document name"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={newDocument.category}
                  onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newDocument.description}
                  onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                  placeholder="Describe the document"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newDocument.tags.join(', ')}
                  onChange={(e) => setNewDocument({...newDocument, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                  placeholder="e.g., AI, Machine Learning, Final Year"
                />
              </div>

              <div className="form-group">
                <label>Upload File</label>
                <div 
                  className="file-upload-area"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="document-file"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx,.ppt,.pptx"
                  />
                  <label htmlFor="document-file" className="file-upload-label">
                    {newDocument.file ? (
                      <div className="file-selected">
                        <i className="bi bi-file-earmark-check"></i>
                        <span>{newDocument.file.name}</span>
                      </div>
                    ) : (
                      <div className="file-upload-placeholder">
                        <i className="bi bi-cloud-upload"></i>
                        <span>Click to upload or drag and drop</span>
                        <small>PDF, DOC, DOCX, JPG, PNG, XLS, PPT</small>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleUploadDocument}
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Document Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="upload-document-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Document</h3>
              <button 
                className="close-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Document Name</label>
                <input
                  type="text"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                  placeholder="Enter document name"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={newDocument.category}
                  onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newDocument.description}
                  onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                  placeholder="Describe the document"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newDocument.tags.join(', ')}
                  onChange={(e) => setNewDocument({...newDocument, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                  placeholder="e.g., AI, Machine Learning, Final Year"
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
                onClick={handleUpdateDocument}
              >
                Update Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
