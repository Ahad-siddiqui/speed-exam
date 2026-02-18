import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiSettings, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import Link from 'next/link';

const SettingsPreferences = () => {
  const [preferences, setPreferences] = useState({
    autoResult: true,
    negativeMarking: false,
    randomQuestions: true,
    emailNotifications: true,
    smsAlerts: false
  });

  const handleToggle = (preference) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  const handleSavePreferences = () => {
    alert('Preferences saved successfully!');
  };

  const ToggleSwitch = ({ label, value, onChange, description }) => (
    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
      <div>
        <h5 className="mb-1">{label}</h5>
        <p className="text-muted mb-0 small">{description}</p>
      </div>
      <Button
        variant={value ? 'success' : 'outline-secondary'}
        onClick={onChange}
        className="d-flex align-items-center"
      >
        {value ? <FiToggleRight className="me-1" /> : <FiToggleLeft className="me-1" />}
        {value ? 'ON' : 'OFF'}
      </Button>
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
                <h3 className="mb-0 text-white">Preferences</h3>
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
                <h4 className="mb-0">System Preferences</h4>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="list-group list-group-flush">
                  <ToggleSwitch
                    label="Auto Result Generation"
                    value={preferences.autoResult}
                    onChange={() => handleToggle('autoResult')}
                    description="Automatically generate results when exams are completed"
                  />
                  
                  <ToggleSwitch
                    label="Negative Marking"
                    value={preferences.negativeMarking}
                    onChange={() => handleToggle('negativeMarking')}
                    description="Enable negative marking for incorrect answers"
                  />
                  
                  <ToggleSwitch
                    label="Random Question Order"
                    value={preferences.randomQuestions}
                    onChange={() => handleToggle('randomQuestions')}
                    description="Randomize question order for each candidate"
                  />
                  
                  <ToggleSwitch
                    label="Email Notifications"
                    value={preferences.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                    description="Send email notifications for important events"
                  />
                  
                  <ToggleSwitch
                    label="SMS Alerts"
                    value={preferences.smsAlerts}
                    onChange={() => handleToggle('smsAlerts')}
                    description="Send SMS alerts for critical notifications"
                  />
                </div>
                
                <div className="p-4 border-top">
                  <div className="d-flex justify-content-center">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleSavePreferences}
                    >
                      <FiSettings className="me-2" /> Save Preferences
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

export default SettingsPreferences;