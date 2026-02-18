import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { FiUpload, FiFile, FiX, FiUsers, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import * as XLSX from 'xlsx';

const SettingsImportCandidates = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      parseFile(file);
    }
  };

  const parseFile = (file) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Process data to extract headers and rows
        if (jsonData.length > 0) {
          const headers = jsonData[0];
          const rows = jsonData.slice(1, 6); // Show first 5 rows for preview
          
          const processedData = rows.map(row => ({
            name: row[headers.indexOf('Name')] || row[0] || '',
            email: row[headers.indexOf('Email')] || row[1] || '',
            cnic: row[headers.indexOf('CNIC')] || row[2] || '',
            rollNo: row[headers.indexOf('Roll No')] || row[3] || ''
          }));
          
          setPreviewData(processedData);
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Error parsing file. Please make sure it\'s a valid CSV or Excel file.');
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setFileName('');
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleImport = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    
    // Import functionality would go here
    alert(`Importing ${previewData.length} candidates from ${fileName}`);
    console.log('Import data:', previewData);
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Import Candidates</h3>
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
                
                {/* File Upload Section */}
                <div className="mb-5">
                  <h4 className="mb-4">
                    <FiUpload className="me-2 text-primary" /> 
                    Upload CSV/Excel File
                  </h4>
                  <div className="border border-dashed rounded p-5 text-center bg-light">
                    {!selectedFile ? (
                      <>
                        <FiFile size={48} className="text-muted mb-3" />
                        <h5 className="mb-2">Drag & drop your file here</h5>
                        <p className="text-muted mb-4">or</p>
                        <Button 
                          variant="primary" 
                          size="lg"
                          onClick={() => document.getElementById('fileInput').click()}
                        >
                          <FiUpload className="me-2" /> Browse Files
                        </Button>
                        <input
                          type="file"
                          id="fileInput"
                          accept=".xlsx,.xls,.csv"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <div className="mt-3">
                          <span className="text-muted small">
                            Supported formats: .xlsx, .xls, .csv (Max 10MB)
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="d-flex flex-column align-items-center">
                        <div className="d-flex align-items-center bg-white px-4 py-3 rounded shadow-sm mb-3">
                          <FiFile className="me-3 text-primary" size={24} />
                          <div className="text-start flex-grow-1">
                            <div className="fw-bold">{fileName}</div>
                            <div className="text-muted small">{previewData.length} records found</div>
                          </div>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={handleRemoveFile}
                          >
                            <FiX size={16} />
                          </Button>
                        </div>
                        <Button 
                          variant="outline-primary"
                          onClick={() => document.getElementById('fileInput').click()}
                        >
                          <FiUpload className="me-1" /> Choose Different File
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview Section */}
                {previewData.length > 0 && (
                  <div className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="mb-0">
                        <FiUsers className="me-2 text-primary" /> 
                        Data Preview
                      </h4>
                      <span className="badge bg-primary">{previewData.length} records</span>
                    </div>
                    
                    <div className="table-responsive">
                      <Table hover className="text-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>CNIC</th>
                            <th>Roll No</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.map((candidate, index) => (
                            <tr key={index}>
                              <td>{candidate.name || '-'}</td>
                              <td>{candidate.email || '-'}</td>
                              <td>{candidate.cnic || '-'}</td>
                              <td>{candidate.rollNo || '-'}</td>
                            </tr>
                          ))}
                          {previewData.length < 5 && (
                            <tr>
                              <td colSpan="4" className="text-center text-muted py-4">
                                {5 - previewData.length} more records will be imported...
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                )}

                {/* Import Button */}
                <div className="d-flex justify-content-center mt-5 pt-4 border-top">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="px-5 py-3"
                    onClick={handleImport}
                    disabled={!selectedFile || previewData.length === 0}
                  >
                    <FiCheck className="me-2" size={20} /> 
                    Confirm Import ({previewData.length} Records)
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

export default SettingsImportCandidates;