import { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiEdit2, FiCamera } from 'react-icons/fi';

export default function ProfilePage() {
  const [avatar, setAvatar] = useState('/images/avatar/avatar-1.jpg');
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="main-content">
  <Container fluid className="p-4 p-lg-6" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <Row>
        <Col lg={12} md={12} xs={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-0 h2 fw-bold">My Profile</h1>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={4} md={12} className="mb-4">
          <Card className="text-center">
            <Card.Body className="p-4">
              <div className="position-relative d-inline-block mb-3">
                <img
                  src={avatar}
                  className="rounded-circle avatar-xxl"
                  alt="User Avatar"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="d-none"
                />
                <button
                  onClick={triggerFileInput}
                  className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 border-0"
                  style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                  title="Change avatar"
                >
                  <FiCamera size={18} />
                </button>
              </div>
              <h4>Abdul Ahad</h4>
              <p className="text-muted mb-4">Administrator</p>
              <Button variant="outline-primary" className="mt-2" onClick={triggerFileInput}>
                <FiEdit2 className="me-1" /> Change Avatar
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8} md={12}>
          <Card>
            <Card.Body>
              <h5 className="mb-4">Personal Information</h5>
              <Form>
                <Row className="mb-3">
                  <Col md={6} className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" defaultValue="Abdul" />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" defaultValue="Ahad" />
                  </Col>
                </Row>
                <div className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiMail /></span>
                    <Form.Control type="email" defaultValue="abdulahad@example.com" />
                  </div>
                </div>
                <div className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiPhone /></span>
                    <Form.Control type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiMapPin /></span>
                    <Form.Control as="textarea" rows={2} defaultValue="123 Main St, New York, NY 10001" />
                  </div>
                </div>
                <div className="text-end">
                  <Button variant="primary">
                    <FiSave className="me-2" /> Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
  );
}
