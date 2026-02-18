import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiDownload, FiFolder, FiUpload, FiFile, FiX, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

const SettingsImportQuestions = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const sectionOptions = [
    { value: '', label: 'Select Section' },
    { value: 'section1', label: 'Section 1' },
    { value: 'section2', label: 'Section 2' },
    { value: 'section3', label: 'Section 3' }
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDownloadSample = () => {
    // Sample download functionality
    alert('Downloading sample Excel file...');
  };

  const handleAddNewSection = () => {
    // Add new section functionality
    alert('Add new section functionality would go here');
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    if (!selectedSection) {
      alert('Please select a section');
      return;
    }
    // Upload functionality would go here
    alert(`Uploading ${selectedFile.name} to section: ${selectedSection}`);
  };

  const handleCancel = () => {
    setSelectedSection('');
    setSelectedFile(null);
  };

  const StepIndicator = ({ number, title, isActive = false, isCompleted = false }) => (
    <div className={`d-flex align-items-center mb-4 ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted'}`}>
      <div className={`rounded-circle d-flex align-items-center justify-content-center me-3`} 
           style={{
             width: '32px', 
             height: '32px', 
             backgroundColor: isCompleted ? '#198754' : isActive ? '#0d6efd' : '#dee2e6',
             color: 'white',
             fontWeight: 'bold'
           }}>
        {isCompleted ? <FiCheckCircle size={18} /> : number}
      </div>
      <h5 className="mb-0">{title}</h5>
    </div>
  );

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Import Questions</h3>
              </div>
              <div>
                <Link href="/settings" className="btn btn-white">Back to Settings</Link>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={12} lg={12} md={12} xs={12} className="mx-auto">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                
                {/* Step 1: Download Sample Excel File */}
                <div className="mb-5">
                  <StepIndicator number="1" title="Download Sample Excel File" isActive />
                  <div className="ps-5">
                    <div className="bg-light p-4 rounded mb-4">
                      
                      <div className="d-flex justify-content-center">
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="px-4 py-2"
                          onClick={handleDownloadSample}
                        >
                          <FiDownload className="me-2" /> Download Sample File
                        </Button>
                      </div>
                      <div className="text-center mt-3">
                        <span className="text-muted small">
                          This template includes all required columns and formatting guidelines
                        </span>
                        <p className="mb-4 text-muted">
                          Download our sample Excel template to ensure your questions are formatted correctly for upload.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="text-center my-4">
                  <div className="position-relative">
                    <hr className="border-primary opacity-25" />
                  </div>
                </div>

                {/* Step 2: Select Section */}
                <div className="mb-5">
                  <StepIndicator number="2" title="Select Section" isActive />
                  <div className="ps-5">
                    <div className="bg-light p-4 rounded mb-4">
                      <p className="mb-4 text-muted">
                        Please select the section where your questions would be uploaded
                      </p>
                      <Row className="align-items-center g-3">
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label className="fw-medium">Choose Section</Form.Label>
                            <Form.Select
                              size="lg"
                              value={selectedSection}
                              onChange={(e) => setSelectedSection(e.target.value)}
                              className="py-2"
                            >
                              {sectionOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={8} className="d-flex align-items-end">
                          <Link 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); handleAddNewSection(); }}
                            className="btn btn-outline-primary"
                          >
                            + Add New Section
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="text-center my-4">
                  <div className="position-relative">
                    <hr className="border-primary opacity-25" />
                  </div>
                </div>

                {/* Step 3: Upload Excel File */}
                <div className="mb-5">
                  <StepIndicator number="3" title="Upload Your Excel File" isActive />
                  <div className="ps-5">
                    <div className="bg-light p-4 rounded mb-4">
                      <div className="d-flex flex-column align-items-center">
                        <Button 
                          variant="outline-primary" 
                          size="lg"
                          className="px-4 py-2 mb-4"
                          onClick={() => document.getElementById('fileInput').click()}
                        >
                          <FiFolder className="me-2" /> Browse For File
                        </Button>
                        <input
                          type="file"
                          id="fileInput"
                          accept=".xlsx,.xls,.csv"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        {selectedFile && (
                          <div className="d-flex align-items-center mt-2 bg-white px-3 py-2 rounded shadow-sm">
                            <FiFile className="me-2 text-primary" size={20} />
                            <span className="fw-medium flex-grow-1">{selectedFile.name}</span>
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="ms-2"
                              onClick={() => setSelectedFile(null)}
                            >
                              <FiX size={16} />
                            </Button>
                          </div>
                        )}
                        <span className="text-muted small mt-3">
                          Supported formats: .xlsx, .xls, .csv (Max 10MB)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-center gap-3 mt-5 pt-4 border-top">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="px-4 py-2"
                    onClick={handleCancel}
                  >
                    <FiX className="me-1" /> Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="px-4 py-2"
                    onClick={handleUpload}
                    disabled={!selectedFile || !selectedSection}
                  >
                    <FiUpload className="me-1" /> Upload Questions
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SettingsImportQuestions;