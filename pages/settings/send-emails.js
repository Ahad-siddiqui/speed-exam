import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiMail, FiSend, FiEye, FiUsers } from 'react-icons/fi';
import Link from 'next/link';

const SettingsSendEmails = () => {
  const [emailData, setEmailData] = useState({
    subject: '',
    recipients: 'all',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setEmailData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendEmail = () => {
    if (!emailData.subject || !emailData.message) {
      alert('Please fill in all required fields');
      return;
    }
    alert(`Email sent to ${emailData.recipients} recipients with subject: "${emailData.subject}"`);
  };

  const handlePreview = () => {
    if (!emailData.subject || !emailData.message) {
      alert('Please fill in subject and message to preview');
      return;
    }
    alert(`Preview:\nSubject: ${emailData.subject}\nTo: ${emailData.recipients}\nMessage: ${emailData.message.substring(0, 100)}...`);
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Send Emails</h3>
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
                <h4 className="mb-0">Compose Email</h4>
              </Card.Header>
              <Card.Body className="p-5">
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Control
                      type="text"
                      value={emailData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Enter email subject"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Recipients *</Form.Label>
                    <Form.Select
                      value={emailData.recipients}
                      onChange={(e) => handleInputChange('recipients', e.target.value)}
                    >
                      <option value="all">All Candidates</option>
                      <option value="active">Active Candidates</option>
                      <option value="completed">Completed Exams</option>
                      <option value="specific">Specific Group</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      value={emailData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Enter your message here..."
                    />
                    <div className="d-flex justify-content-between mt-2">
                      <span className="text-muted small">Characters: {emailData.message.length}</span>
                      <span className="text-muted small">Words: {emailData.message.split(/\s+/).filter(word => word.length > 0).length}</span>
                    </div>
                  </Form.Group>

                  <div className="d-flex gap-3 justify-content-center">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleSendEmail}
                      disabled={!emailData.subject || !emailData.message}
                    >
                      <FiSend className="me-2" /> Send Email
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      size="lg"
                      onClick={handlePreview}
                    >
                      <FiEye className="me-2" /> Preview
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

export default SettingsSendEmails;