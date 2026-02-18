import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiMail, FiSend, FiServer } from 'react-icons/fi';
import Link from 'next/link';

const SettingsEmailSettings = () => {
  const [smtpConfig, setSmtpConfig] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    username: '',
    password: '',
    encryption: 'tls'
  });

  const handleInputChange = (field, value) => {
    setSmtpConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    alert('SMTP settings saved successfully!');
  };

  const handleTestEmail = () => {
    if (!smtpConfig.host || !smtpConfig.port || !smtpConfig.username || !smtpConfig.password) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Test email sent successfully!');
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Email Settings</h3>
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
                <h4 className="mb-0">SMTP Configuration</h4>
              </Card.Header>
              <Card.Body className="p-5">
                <Form>
                  <Row>
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Label>Host *</Form.Label>
                        <Form.Control
                          type="text"
                          value={smtpConfig.host}
                          onChange={(e) => handleInputChange('host', e.target.value)}
                          placeholder="e.g., smtp.gmail.com"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Label>Port *</Form.Label>
                        <Form.Control
                          type="text"
                          value={smtpConfig.port}
                          onChange={(e) => handleInputChange('port', e.target.value)}
                          placeholder="e.g., 587"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Label>Username *</Form.Label>
                        <Form.Control
                          type="text"
                          value={smtpConfig.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          placeholder="Enter username/email"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Label>Password *</Form.Label>
                        <Form.Control
                          type="password"
                          value={smtpConfig.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          placeholder="Enter password"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-5">
                    <Form.Label>Encryption</Form.Label>
                    <Form.Select
                      value={smtpConfig.encryption}
                      onChange={(e) => handleInputChange('encryption', e.target.value)}
                    >
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                      <option value="none">None</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="alert alert-info">
                    <FiServer className="me-2" />
                    Make sure your SMTP settings are correct to ensure emails are delivered properly.
                  </div>

                  <div className="d-flex gap-3 justify-content-center mt-4">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleSaveSettings}
                    >
                      <FiMail className="me-2" /> Save Settings
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="lg"
                      onClick={handleTestEmail}
                    >
                      <FiSend className="me-2" /> Test Email
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SettingsEmailSettings;