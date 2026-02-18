import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiMessageSquare, FiSend, FiUsers } from 'react-icons/fi';
import Link from 'next/link';

const SettingsSendSMS = () => {
  const [smsData, setSmsData] = useState({
    message: '',
    recipients: 'all'
  });

  const maxLength = 160;
  const remainingChars = maxLength - smsData.message.length;

  const handleInputChange = (field, value) => {
    if (field === 'message' && value.length > maxLength) {
      return;
    }
    setSmsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendSMS = () => {
    if (!smsData.message.trim()) {
      alert('Please enter a message');
      return;
    }
    alert(`SMS sent to ${smsData.recipients} recipients: "${smsData.message}"`);
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Send SMS</h3>
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
                <h4 className="mb-0">Compose SMS</h4>
              </Card.Header>
              <Card.Body className="p-5">
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label>Recipient Selection *</Form.Label>
                    <Form.Select
                      value={smsData.recipients}
                      onChange={(e) => handleInputChange('recipients', e.target.value)}
                    >
                      <option value="all">All Candidates</option>
                      <option value="active">Active Candidates</option>
                      <option value="completed">Completed Exams</option>
                      <option value="specific">Specific Group</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message * <span className="text-muted">({remainingChars} characters remaining)</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={smsData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Enter your SMS message here..."
                      className={remainingChars < 20 ? 'border-warning' : ''}
                    />
                    <div className="d-flex justify-content-between mt-2">
                      <span className={`small ${remainingChars < 20 ? 'text-warning' : 'text-muted'}`}>
                        {remainingChars < 20 ? `${remainingChars} characters left - Consider shortening` : `${remainingChars} characters available`}
                      </span>
                      <span className="text-muted small">Words: {smsData.message.split(/\s+/).filter(word => word.length > 0).length}</span>
                    </div>
                  </Form.Group>

                  <div className="alert alert-info">
                    <FiMessageSquare className="me-2" />
                    Standard SMS limit is 160 characters. Messages longer than this will be split into multiple parts.
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <Button 
                      variant="primary" 
                      size="lg"
                      className="px-5 py-3"
                      onClick={handleSendSMS}
                      disabled={!smsData.message.trim()}
                    >
                      <FiSend className="me-2" size={20} /> Send SMS
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

export default SettingsSendSMS;