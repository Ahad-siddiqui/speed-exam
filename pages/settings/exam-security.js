import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiLock, FiCopy, FiMaximize, FiShield } from 'react-icons/fi';
import Link from 'next/link';

const SettingsExamSecurity = () => {
  const [securitySettings, setSecuritySettings] = useState({
    browserLock: true,
    disableCopyPaste: true,
    fullScreenMode: true,
    disableRightClick: false,
    webcamMonitoring: false
  });

  const handleToggle = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = () => {
    alert('Security settings saved successfully!');
  };

  const SecurityToggle = ({ icon, label, value, onChange, description, warning }) => (
    <Card className="mb-3 border-2">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-start">
            <div className={`avatar avatar-md avatar-indicators ${value ? 'avatar-success' : 'avatar-light'} me-3`}>
              {icon}
            </div>
            <div>
              <h5 className="mb-1">{label}</h5>
              <p className="text-muted mb-0 small">{description}</p>
              {warning && (
                <div className="mt-2">
                  <span className="badge bg-warning text-dark">
                    <FiShield className="me-1" size={14} /> {warning}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant={value ? 'success' : 'outline-secondary'}
            onClick={onChange}
            className="d-flex align-items-center px-3"
          >
            {value ? 'Enabled' : 'Disabled'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Exam Security</h3>
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
                <h4 className="mb-0">Security Options</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="alert alert-info mb-4">
                  <FiShield className="me-2" />
                  Configure security measures to prevent cheating during examinations
                </div>

                <SecurityToggle
                  icon={<FiLock size={20} />}
                  label="Browser Lock"
                  value={securitySettings.browserLock}
                  onChange={() => handleToggle('browserLock')}
                  description="Lock the browser to prevent switching to other tabs or applications"
                  warning="May affect user experience on some devices"
                />

                <SecurityToggle
                  icon={<FiCopy size={20} />}
                  label="Disable Copy/Paste"
                  value={securitySettings.disableCopyPaste}
                  onChange={() => handleToggle('disableCopyPaste')}
                  description="Prevent candidates from copying or pasting content during exams"
                />

                <SecurityToggle
                  icon={<FiMaximize size={20} />}
                  label="Full Screen Mode"
                  value={securitySettings.fullScreenMode}
                  onChange={() => handleToggle('fullScreenMode')}
                  description="Force full-screen mode to prevent multitasking"
                />

                <SecurityToggle
                  icon={<FiCopy size={20} />}
                  label="Disable Right Click"
                  value={securitySettings.disableRightClick}
                  onChange={() => handleToggle('disableRightClick')}
                  description="Disable right-click context menu to prevent inspection"
                />

                <SecurityToggle
                  icon={<FiEye size={20} />}
                  label="Webcam Monitoring"
                  value={securitySettings.webcamMonitoring}
                  onChange={() => handleToggle('webcamMonitoring')}
                  description="Enable webcam monitoring during exams (requires additional setup)"
                  warning="Requires webcam permissions and additional infrastructure"
                />

                <div className="d-flex justify-content-center mt-5 pt-4 border-top">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={handleSaveSettings}
                  >
                    <FiShield className="me-2" /> Save Security Settings
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

export default SettingsExamSecurity;