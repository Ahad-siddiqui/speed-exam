import React, { Fragment } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FiSettings, FiFolder, FiUsers, FiCompass, FiEdit3, FiFile, FiUserPlus,
  FiAward, FiMonitor, FiDownload, FiMail, FiMessageSquare, FiServer,
  FiActivity, FiToggleLeft, FiMessageCircle, FiLock, FiDollarSign,
  FiPackage, FiUser, FiShield, FiCreditCard, FiImage, FiBook,
  FiBarChart2, FiHardDrive, FiCheckCircle
} from 'react-icons/fi';
import Link from 'next/link';

const SettingsDashboard = () => {
  const settingsPages = [
    { id: 1, name: 'Sections', icon: <FiFolder size={40} />, link: '/settings/sections', color: 'primary' },
    { id: 2, name: 'Groups', icon: <FiUsers size={40} />, link: '/settings/groups', color: 'success' },
    { id: 3, name: 'Directions', icon: <FiCompass size={40} />, link: '/settings/directions', color: 'info' },
    { id: 4, name: 'Assign Essay Marks', icon: <FiEdit3 size={40} />, link: '/settings/assign-essay-marks', color: 'warning' },
    { id: 5, name: 'Import Questions', icon: <FiFile size={40} />, link: '/settings/import-questions', color: 'danger' },
    { id: 6, name: 'Import Candidates', icon: <FiUserPlus size={40} />, link: '/settings/import-candidates', color: 'primary' },
    { id: 7, name: 'Instructor Accounts', icon: <FiUsers size={40} />, link: '/settings/instructor-accounts', color: 'success' },
    { id: 8, name: 'Certificate Maker', icon: <FiAward size={40} />, link: '/settings/certificate-maker', color: 'info' },
    { id: 9, name: 'Exam Monitor', icon: <FiMonitor size={40} />, link: '/settings/exam-monitor', color: 'warning' },
    { id: 10, name: 'Export Data', icon: <FiDownload size={40} />, link: '/settings/export-data', color: 'danger' },
    { id: 11, name: 'Send Emails', icon: <FiMail size={40} />, link: '/settings/send-emails', color: 'primary' },
    { id: 12, name: 'Send SMS', icon: <FiMessageSquare size={40} />, link: '/settings/send-sms', color: 'success' },
    { id: 13, name: 'Email Settings', icon: <FiServer size={40} />, link: '/settings/email-settings', color: 'info' },
    { id: 14, name: 'SMS Settings', icon: <FiMessageSquare size={40} />, link: '/settings/sms-settings', color: 'warning' },
    { id: 15, name: 'Candidate Activity', icon: <FiActivity size={40} />, link: '/settings/candidate-activity', color: 'danger' },
    { id: 16, name: 'Preferences', icon: <FiToggleLeft size={40} />, link: '/settings/preferences', color: 'primary' },
    { id: 17, name: 'Feedback', icon: <FiMessageCircle size={40} />, link: '/settings/feedback', color: 'success' },
    { id: 18, name: 'Exam Security', icon: <FiLock size={40} />, link: '/settings/exam-security', color: 'info' },
    { id: 19, name: 'My Sales', icon: <FiDollarSign size={40} />, link: '/settings/my-sales', color: 'warning' },
    { id: 20, name: 'Exam Packages', icon: <FiPackage size={40} />, link: '/settings/exam-packages', color: 'danger' },
    { id: 21, name: 'My Account', icon: <FiUser size={40} />, link: '/settings/my-account', color: 'primary' },
    { id: 22, name: 'Certificate Authentication', icon: <FiShield size={40} />, link: '/settings/certificate-authentication', color: 'success' },
    { id: 23, name: 'Payment Gateway', icon: <FiCreditCard size={40} />, link: '/settings/payment-gateway', color: 'info' },
    { id: 24, name: 'Water Mark', icon: <FiImage size={40} />, link: '/settings/water-mark', color: 'warning' },
    { id: 25, name: 'Exam Series', icon: <FiBook size={40} />, link: '/settings/exam-series', color: 'danger' },
    { id: 26, name: 'Difficulty', icon: <FiBarChart2 size={40} />, link: '/settings/difficulty', color: 'primary' },
    { id: 27, name: 'Trusted IP Address', icon: <FiHardDrive size={40} />, link: '/settings/trusted-ip', color: 'success' },
    { id: 28, name: 'TransQ', icon: <FiCheckCircle size={40} />, link: '/settings/transq', color: 'info' }
  ];

  return (
    <Fragment>
      <Container fluid className="mt-n22 px-6 pt-20 pb-10">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="mb-2 mb-lg-0 p-3">
              <h3 className="mb-0 text-black">Settings</h3>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={12} lg={12} md={12} xs={12}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                <Row>
                  {settingsPages.map(page => (
                    <Col key={page.id} lg={3} md={6} sm={6} xs={12} className="mb-4">
                      <Link href={page.link} className="text-decoration-none">
                        <Card 
                          className="h-100 border-2 hover-shadow cursor-pointer settings-card"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#0d6efd';
                            e.currentTarget.style.borderColor = '#0d6efd';
                            const icon = e.currentTarget.querySelector('.settings-icon');
                            if (icon) icon.style.color = 'white';
                            const text = e.currentTarget.querySelector('.settings-text');
                            if (text) text.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '';
                            e.currentTarget.style.borderColor = '';
                            const icon = e.currentTarget.querySelector('.settings-icon');
                            if (icon) icon.style.color = '';
                            const text = e.currentTarget.querySelector('.settings-text');
                            if (text) text.style.color = '';
                          }}
                        >
                          <Card.Body className="text-center p-4">
                            <div className={`avatar avatar-xxxl avatar-${page.color} mb-3 mx-auto settings-icon`}>
                              {page.icon}
                            </div>
                            <h5 className="mb-0 text-dark settings-text">{page.name}</h5>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SettingsDashboard;