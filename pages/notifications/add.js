import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FiBell, FiSave, FiPaperclip } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const AddNotification = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    attachment: null,
    recipientType: 'all',
    sendEmail: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value
    });
  };

  const handleFileUpload = (e) => {
    setFormData({
      ...formData,
      attachment: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing notifications
    const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    // Create new notification object
    const newNotification = {
      id: Date.now(),
      ...formData,
      createdDate: new Date().toLocaleDateString(),
      active: true
    };
    
    // Save to localStorage
    const updatedNotifications = [...existingNotifications, newNotification];
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    
    // Redirect to notifications list
    router.push('/notifications');
  };

  return (
    <Fragment>
      <Container fluid className="mt-n22 px-6 pt-20 pb-10">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center p-3">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-black">Add New Notification</h3>
              </div>
              <div>
                <Link href="/notifications" className="btn btn-primary">Back to List</Link>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={12} lg={12} md={12} xs={12} className="mx-auto">
            <Card>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          placeholder="Enter notification subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Notification</Form.Label>
                        <ReactQuill
                          theme="snow"
                          value={formData.content}
                          onChange={handleContentChange}
                          style={{height: '200px'}}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3 mt-6">
                      <Form.Group>
                        <Form.Label>Attach File</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={handleFileUpload}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Label className="d-block mb-2">Radio Button Group</Form.Label>
                      <div className="d-flex gap-4">
                        <Form.Check
                          type="radio"
                          id="showAll"
                          name="recipientType"
                          label="Show to all active candidates"
                          value="all"
                          checked={formData.recipientType === 'all'}
                          onChange={handleChange}
                        />
                        <Form.Check
                          type="radio"
                          id="showSelect"
                          name="recipientType"
                          label="Show to select groups"
                          value="select"
                          checked={formData.recipientType === 'select'}
                          onChange={handleChange}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <hr className="my-3" />
                    <Col md={12} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id="sendEmail"
                        label="Send this notification via email"
                        name="sendEmail"
                        checked={formData.sendEmail}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <Link href="/notifications" className="btn btn-secondary">
                      Cancel
                    </Link>
                    <Button variant="primary" type="submit">
                      <FiSave className="me-1" /> Save Notification
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

export default AddNotification;