import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { FiMonitor, FiEye, FiClock, FiUsers } from 'react-icons/fi';
import Link from 'next/link';

const SettingsExamMonitor = () => {
  const [exams] = useState([
    {
      id: 1,
      name: 'Mathematics Final Exam',
      candidatesOnline: 45,
      startTime: '09:00 AM',
      status: 'active'
    },
    {
      id: 2,
      name: 'Physics Midterm',
      candidatesOnline: 23,
      startTime: '10:30 AM',
      status: 'scheduled'
    },
    {
      id: 3,
      name: 'Chemistry Quiz',
      candidatesOnline: 12,
      startTime: '02:00 PM',
      status: 'completed'
    },
    {
      id: 4,
      name: 'English Literature Test',
      candidatesOnline: 31,
      startTime: '11:00 AM',
      status: 'active'
    }
  ]);

  const getStatusVariant = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'scheduled': return 'warning';
      case 'completed': return 'secondary';
      default: return 'primary';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Active';
      case 'scheduled': return 'Scheduled';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const handleViewDetails = (examId) => {
    alert(`Viewing details for exam ID: ${examId}`);
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Exam Monitor</h3>
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
              <Card.Header className="bg-white py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Ongoing Exams</h4>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">
                      <FiMonitor className="me-1" /> Refresh
                    </Button>
                    <Button variant="primary" size="sm">
                      <FiClock className="me-1" /> Schedule Exam
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="text-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Exam Name</th>
                        <th>Candidates Online</th>
                        <th>Start Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exams.map(exam => (
                        <tr key={exam.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-md avatar-indicators avatar-primary me-2">
                                <FiUsers size={20} />
                              </div>
                              <strong>{exam.name}</strong>
                            </div>
                          </td>
                          <td>
                            <Badge bg="primary" className="px-3 py-2">
                              <FiUsers className="me-1" /> {exam.candidatesOnline}
                            </Badge>
                          </td>
                          <td>
                            <FiClock className="me-1 text-muted" />
                            {exam.startTime}
                          </td>
                          <td>
                            <Badge bg={getStatusVariant(exam.status)}>
                              {getStatusText(exam.status)}
                            </Badge>
                          </td>
                          <td>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleViewDetails(exam.id)}
                            >
                              <FiEye className="me-1" /> View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SettingsExamMonitor;