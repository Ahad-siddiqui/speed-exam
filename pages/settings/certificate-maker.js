import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiAward, FiUpload, FiEye, FiSave } from 'react-icons/fi';
import Link from 'next/link';

const SettingsCertificateMaker = () => {
  const [certificateData, setCertificateData] = useState({
    logo: '',
    title: 'Certificate of Achievement',
    bodyText: 'This is to certify that the bearer has successfully completed the examination with outstanding performance.',
    signature: 'John Smith',
    footer: 'Issued on behalf of the Examination Board',
    selectedBackground: 'bg-blue',
    date: new Date().toISOString().split('T')[0],
    dateFormat: 'MM/DD/YYYY'
  });

  const certificateTemplates = [
    {
      id: 'bg-blue',
      name: 'Blue Gradient',
      color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      borderColor: '#2196f3',
      style: 'gradient'
    },
    {
      id: 'bg-green',
      name: 'Green Pattern',
      color: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
      borderColor: '#4caf50',
      style: 'pattern'
    },
    {
      id: 'bg-purple',
      name: 'Purple Border',
      color: '#f3e5f5',
      borderColor: '#9c27b0',
      style: 'bordered'
    },
    {
      id: 'bg-gold',
      name: 'Gold Texture',
      color: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
      borderColor: '#ffc107',
      style: 'texture'
    },
    {
      id: 'bg-marble',
      name: 'Marble Style',
      color: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderColor: '#6c757d',
      style: 'marble'
    },
    {
      id: 'bg-ribbon',
      name: 'Ribbon Design',
      color: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
      borderColor: '#e91e63',
      style: 'ribbon'
    }
  ];

  const handleInputChange = (field, value) => {
    setCertificateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setCertificateData(prev => ({
          ...prev,
          logo: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveTemplate = () => {
    alert('Certificate template saved successfully!');
  };

  const handleBackgroundSelect = (backgroundId) => {
    setCertificateData(prev => ({
      ...prev,
      selectedBackground: backgroundId
    }));
  };

  const formatDate = (dateStr, format) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    switch(format) {
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'Month DD, YYYY':
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${monthNames[date.getMonth()]} ${day}, ${year}`;
      default:
        return `${month}/${day}/${year}`;
    }
  };

  return (
    <Fragment>
      <Container fluid className="mt-n22 px-6 pt-20 pb-10">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center p-3">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-black">Certificate Maker</h3>
              </div>
              <div>
                <Link href="/settings" className="btn btn-primary">Back to Settings</Link>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col lg={12} md={12} xs={12} className="mb-4">
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-white py-4">
                <h4 className="mb-0">Please choose the certificate Background</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  {certificateTemplates.map(template => (
                    <Col md={4} lg={2} key={template.id}>
                      <Card 
                        className={`h-100 border-2 ${certificateData.selectedBackground === template.id ? 'border-primary shadow' : ''}`}
                        style={{ 
                          background: template.color, 
                          borderColor: template.borderColor, 
                          cursor: 'pointer' 
                        }}
                        onClick={() => handleBackgroundSelect(template.id)}
                      >
                        <Card.Body className="text-center p-3">
                          <div className="mb-2">
                            <div 
                              className="rounded border p-2 mx-auto"
                              style={{ 
                                background: template.color, 
                                borderColor: template.borderColor,
                                width: '80px',
                                height: '60px'
                              }}
                            >
                              <div className="border rounded bg-white p-1" style={{ height: '100%' }}>
                                <FiAward className="text-muted" size={24} />
                              </div>
                            </div>
                          </div>
                          <h6 className="mb-0" style={{ fontSize: '0.8rem' }}>{template.name}</h6>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={7} lg={12} md={12} xs={12} className="mb-4">
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-white py-4">
                <h4 className="mb-0">Certificate Template Editor</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label>Logo</Form.Label>
                    <div className="d-flex align-items-center">
                      {certificateData.logo && (
                        <img 
                          src={certificateData.logo} 
                          alt="Logo" 
                          className="me-3" 
                          style={{ maxWidth: '100px', maxHeight: '60px' }}
                        />
                      )}
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => document.getElementById('logoInput').click()}
                      >
                        <FiUpload className="me-1" /> {certificateData.logo ? 'Change Logo' : 'Upload Logo'}
                      </Button>
                      <input
                        type="file"
                        id="logoInput"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={certificateData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter certificate title"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Body Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={certificateData.bodyText}
                      onChange={(e) => handleInputChange('bodyText', e.target.value)}
                      placeholder="Enter certificate body text"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Signature</Form.Label>
                    <Form.Control
                      type="text"
                      value={certificateData.signature}
                      onChange={(e) => handleInputChange('signature', e.target.value)}
                      placeholder="Enter signature name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Footer</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={certificateData.footer}
                      onChange={(e) => handleInputChange('footer', e.target.value)}
                      placeholder="Enter footer text"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Certificate Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={certificateData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Date Format</Form.Label>
                    <Form.Select
                      value={certificateData.dateFormat}
                      onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY (02/25/2024)</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY (25/02/2024)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2024-02-25)</option>
                      <option value="Month DD, YYYY">Month DD, YYYY (February 25, 2024)</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="primary" onClick={handleSaveTemplate}>
                      <FiSave className="me-1" /> Save Template
                    </Button>
                    <Button variant="outline-secondary">
                      <FiEye className="me-1" /> Preview
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={5} lg={12} md={12} xs={12}>
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-white py-4">
                <h4 className="mb-0">Live Preview</h4>
              </Card.Header>
              <Card.Body className="p-5">
                <div 
                  className="border rounded p-4"
                  style={{
                    background: certificateTemplates.find(t => t.id === certificateData.selectedBackground)?.color || 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    borderColor: certificateTemplates.find(t => t.id === certificateData.selectedBackground)?.borderColor || '#2196f3',
                    minHeight: '400px'
                  }}
                >
                  <div className="text-center">
                    {certificateData.logo && (
                      <img 
                        src={certificateData.logo} 
                        alt="Certificate Logo" 
                        className="mb-3"
                        style={{ maxWidth: '120px', maxHeight: '80px' }}
                      />
                    )}
                    <h2 className="mb-4 text-primary">{certificateData.title}</h2>
                    <div className="my-4">
                      <p className="lead">{certificateData.bodyText}</p>
                    </div>
                    <div className="mt-5 pt-4 border-top">
                      <p className="mb-1"><strong>{certificateData.signature}</strong></p>
                      <p className="text-muted small">{formatDate(certificateData.date, certificateData.dateFormat)}</p>
                      <p className="text-muted small">{certificateData.footer}</p>
                    </div>
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

export default SettingsCertificateMaker;