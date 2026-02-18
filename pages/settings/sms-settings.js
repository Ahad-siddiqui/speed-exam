import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiMessageSquare, FiSend, FiServer } from 'react-icons/fi';
import Link from 'next/link';

const SettingsSMSSettings = () => {
  const [smsConfig, setSmsConfig] = useState({
    provider: 'twilio',
    apiKey: '',
    apiSecret: '',
    senderId: ''
  });

  const providers = [
    { id: 'twilio', name: 'Twilio' },
    { id: 'nexmo', name: 'Nexmo/Vonage' },
    { id: 'plivo', name: 'Plivo' },
    { id: 'aws', name: 'AWS SNS' }
  ];

  const handleInputChange = (field, value) => {
    setSmsConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    alert('SMS settings saved successfully!');
  };

  const handleTestSMS = () => {
    if (!smsConfig.apiKey || !smsConfig.apiSecret) {
      alert('Please fill in all required API credentials');
      return;
    }
    alert('Test SMS sent successfully!');
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">SMS Settings</h3>
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
                <h4 className="mb-0">API Credentials</h4>
              </Card.Header>
              <Card.Body className="p-5">
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label>Provider *</Form.Label>
                    <Form.Select
                      value={smsConfig.provider}
                      onChange={(e) => handleInputChange('provider', e.target.value)}
                    >
                      {providers.map(provider => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>API Key *</Form.Label>
                    <Form.Control
                      type="text"
                      value={smsConfig.apiKey}
                      onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      placeholder="Enter API key"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>API Secret *</Form.Label>
                    <Form.Control
                      type="password"
                      value={smsConfig.apiSecret}
                      onChange={(e) => handleInputChange('apiSecret', e.target.value)}
                      placeholder="Enter API secret"
                    />
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <Form.Label>Sender ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={smsConfig.senderId}
                      onChange={(e) => handleInputChange('senderId', e.target.value)}
                      placeholder="Enter sender ID (optional)"
                    />
                  </Form.Group>

                  <div className="alert alert-info">
                    <FiServer className="me-2" />
                    Configure your SMS provider credentials to enable SMS functionality.
                  </div>

                  <div className="d-flex gap-3 justify-content-center mt-4">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleSaveSettings}
                    >
                      <FiMessageSquare className="me-2" /> Save Settings
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="lg"
                      onClick={handleTestSMS}
                    >
                      <FiSend className="me-2" /> Test SMS
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

export default SettingsSMSSettings;