import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { FiActivity, FiFilter, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

const SettingsCandidateActivity = () => {
  const [activities] = useState([
    {
      id: 1,
      candidateName: 'John Smith',
      action: 'Logged in to exam portal',
      date: '2024-01-15 09:30:22',
      ipAddress: '192.168.1.101'
    },
    {
      id: 2,
      candidateName: 'Sarah Johnson',
      action: 'Started Mathematics Exam',
      date: '2024-01-15 10:15:45',
      ipAddress: '192.168.1.102'
    },
    {
      id: 3,
      candidateName: 'Mike Brown',
      action: 'Submitted Physics Exam',
      date: '2024-01-15 11:30:18',
      ipAddress: '192.168.1.103'
    },
    {
      id: 4,
      candidateName: 'Emily Davis',
      action: 'Viewed exam results',
      date: '2024-01-15 14:22:33',
      ipAddress: '192.168.1.104'
    },
    {
      id: 5,
      candidateName: 'David Wilson',
      action: 'Downloaded certificate',
      date: '2024-01-15 16:45:12',
      ipAddress: '192.168.1.105'
    }
  ]);

  const [dateFilter, setDateFilter] = useState('');

  const filteredActivities = dateFilter 
    ? activities.filter(activity => activity.date.includes(dateFilter))
    : activities;

  return (
    <Fragment>
      <div className="bg-gray-700 pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Settings</h3>
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
                  <h4 className="mb-0">Activity Logs</h4>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      size="sm"
                      style={{ maxWidth: '180px' }}
                    />
                    <Button variant="outline-primary" size="sm">
                      <FiFilter className="me-1" /> Filter
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="text-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Candidate Name</th>
                        <th>Action</th>
                        <th>Date</th>
                        <th>IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredActivities.map(activity => (
                        <tr key={activity.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-md avatar-indicators avatar-primary me-2">
                                <FiActivity size={20} />
                              </div>
                              <strong>{activity.candidateName}</strong>
                            </div>
                          </td>
                          <td>{activity.action}</td>
                          <td>
                            <FiCalendar className="me-1 text-muted" />
                            {activity.date}
                          </td>
                          <td>
                            <span className="badge bg-light text-dark">{activity.ipAddress}</span>
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

export default SettingsCandidateActivity;