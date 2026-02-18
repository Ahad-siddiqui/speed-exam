import { useRef, useState } from 'react'
import { Col, Row, Container, Card, Button, Form } from 'react-bootstrap'
import {
  FiCamera,
  FiEdit2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSave,
  FiLock,
  FiEye,
  FiEyeOff
} from 'react-icons/fi'

const Profile = () => {
  const [avatar, setAvatar] = useState('/images/avatar/default.png')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const fileInputRef = useRef(null)

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(URL.createObjectURL(file))
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    // Add your password change logic here
    alert('Password changed successfully!')
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  return (
    <Container fluid className="p-4 p-lg-5" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <Row>
        <Col lg={12} md={12} xs={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-0 h2 fw-bold">My Account</h1>
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
          <Card className="mb-4">
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
                    <Form.Control type="email" defaultValue="abdul.ahad@example.com" />
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

          {/* Password Change Section */}
          <Card>
            <Card.Body>
              <h5 className="mb-4">Change Password</h5>
              <Form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiLock /></span>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={togglePasswordVisibility}
                      type="button"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </Button>
                  </div>
                </div>
                <div className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiLock /></span>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiLock /></span>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                    />
                  </div>
                  {passwordData.newPassword && passwordData.confirmPassword && 
                    passwordData.newPassword !== passwordData.confirmPassword && (
                      <div className="text-danger small mt-1">Passwords do not match</div>
                  )}
                </div>
                <div className="text-end">
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={
                      !passwordData.currentPassword || 
                      !passwordData.newPassword || 
                      !passwordData.confirmPassword ||
                      passwordData.newPassword !== passwordData.confirmPassword
                    }
                  >
                    <FiSave className="me-2" /> Update Password
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile