import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Modal } from 'react-bootstrap';
import { FiMessageSquare, FiStar, FiEye } from 'react-icons/fi';
import Link from 'next/link';

const SettingsFeedback = () => {
  const [feedbacks] = useState([
    {
      id: 1,
      candidate: 'John Smith',
      message: 'The exam interface was very user-friendly and easy to navigate. Great experience overall!',
      rating: 5,
      date: '2024-01-15'
    },
    {
      id: 2,
      candidate: 'Sarah Johnson',
      message: 'Questions were well-structured but timing was a bit tight for some sections.',
      rating: 4,
      date: '2024-01-14'
    },
    {
      id: 3,
      candidate: 'Mike Brown',
      message: 'Excellent platform! The mobile responsiveness worked perfectly during my exam.',
      rating: 5,
      date: '2024-01-14'
    },
    {
      id: 4,
      candidate: 'Emily Davis',
      message: 'Could use some improvement in the question navigation between sections.',
      rating: 3,
      date: '2024-01-13'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const renderStars = (rating) => {
    return (
      <div className="d-flex">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i} 
            className={i < rating ? 'text-warning' : 'text-muted'} 
            fill={i < rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    );
  };

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
                <h4 className="mb-0">Candidate Feedback</h4>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="text-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Candidate</th>
                        <th>Feedback Message</th>
                        <th>Rating</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map(feedback => (
                        <tr key={feedback.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-md avatar-indicators avatar-primary me-2">
                                <FiMessageSquare size={20} />
                              </div>
                              <strong>{feedback.candidate}</strong>
                            </div>
                          </td>
                          <td>
                            <div className="text-truncate" style={{ maxWidth: '300px' }}>
                              {feedback.message}
                            </div>
                          </td>
                          <td>
                            {renderStars(feedback.rating)}
                            <span className="ms-2 text-muted small">({feedback.rating}/5)</span>
                          </td>
                          <td>{feedback.date}</td>
                          <td>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleViewFeedback(feedback)}
                            >
                              <FiEye className="me-1" /> View
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

      {/* Feedback Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Feedback Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFeedback && (
            <div>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h5 className="mb-1">{selectedFeedback.candidate}</h5>
                  <p className="text-muted mb-0">Submitted on {selectedFeedback.date}</p>
                </div>
                <div className="text-end">
                  {renderStars(selectedFeedback.rating)}
                  <div className="mt-1">
                    <span className="badge bg-primary">{selectedFeedback.rating}/5 Stars</span>
                  </div>
                </div>
              </div>
              
              <div className="border-top pt-4">
                <h6 className="mb-3">Feedback Message:</h6>
                <p className="lead">{selectedFeedback.message}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SettingsFeedback;