import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiDownload, FiFile, FiUsers, FiBarChart2, FiFileText } from 'react-icons/fi';
import Link from 'next/link';

const SettingsExportData = () => {
  const [exportOptions, setExportOptions] = useState({
    candidates: false,
    results: false,
    exams: false
  });

  const [selectedFormat, setSelectedFormat] = useState('csv');

  const handleOptionChange = (option) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleExport = () => {
    const selectedItems = Object.keys(exportOptions).filter(key => exportOptions[key]);
    if (selectedItems.length === 0) {
      alert('Please select at least one item to export');
      return;
    }
    alert(`Exporting ${selectedItems.join(', ')} as ${selectedFormat.toUpperCase()}`);
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Export Data</h3>
              </div>
              <div>
                <Link href="/settings" className="btn btn-white">Back to Settings</Link>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={8} lg={12} md={12} xs={12} className="mx-auto">
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-white py-4">
                <h4 className="mb-0">Export Options</h4>
              </Card.Header>
              <Card.Body className="p-5">
                <Row className="mb-5">
                  <Col md={4} className="mb-4">
                    <Card 
                      className={`h-100 cursor-pointer border-2 ${exportOptions.candidates ? 'border-primary' : 'border-light'}`}
                      onClick={() => handleOptionChange('candidates')}
                    >
                      <Card.Body className="text-center p-4">
                        <FiUsers size={32} className={`mb-3 ${exportOptions.candidates ? 'text-primary' : 'text-muted'}`} />
                        <h5>Candidates</h5>
                        <p className="text-muted small">Export candidate information and profiles</p>
                        <Form.Check
                          type="checkbox"
                          checked={exportOptions.candidates}
                          onChange={() => {}}
                          className="mt-2"
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={4} className="mb-4">
                    <Card 
                      className={`h-100 cursor-pointer border-2 ${exportOptions.results ? 'border-primary' : 'border-light'}`}
                      onClick={() => handleOptionChange('results')}
                    >
                      <Card.Body className="text-center p-4">
                        <FiBarChart2 size={32} className={`mb-3 ${exportOptions.results ? 'text-primary' : 'text-muted'}`} />
                        <h5>Results</h5>
                        <p className="text-muted small">Export exam results and scores</p>
                        <Form.Check
                          type="checkbox"
                          checked={exportOptions.results}
                          onChange={() => {}}
                          className="mt-2"
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={4} className="mb-4">
                    <Card 
                      className={`h-100 cursor-pointer border-2 ${exportOptions.exams ? 'border-primary' : 'border-light'}`}
                      onClick={() => handleOptionChange('exams')}
                    >
                      <Card.Body className="text-center p-4">
                        <FiFileText size={32} className={`mb-3 ${exportOptions.exams ? 'text-primary' : 'text-muted'}`} />
                        <h5>Exams</h5>
                        <p className="text-muted small">Export exam details and configurations</p>
                        <Form.Check
                          type="checkbox"
                          checked={exportOptions.exams}
                          onChange={() => {}}
                          className="mt-2"
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <div className="border-top pt-4">
                  <h5 className="mb-4">Export Format</h5>
                  <div className="d-flex gap-3 mb-4">
                    {['csv', 'excel', 'pdf'].map(format => (
                      <Button
                        key={format}
                        variant={selectedFormat === format ? 'primary' : 'outline-primary'}
                        onClick={() => setSelectedFormat(format)}
                        className="px-4 py-2"
                      >
                        <FiFile className="me-1" />
                        {format.toUpperCase()}
                      </Button>
                    ))}
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="px-5 py-3"
                      onClick={handleExport}
                      disabled={!Object.values(exportOptions).some(Boolean)}
                    >
                      <FiDownload className="me-2" size={20} /> 
                      Export Selected Data
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SettingsExportData;