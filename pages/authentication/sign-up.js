// import node module libraries
import { useState } from "react";
import { Row, Col, Card, Form, Button, Image, Container } from "react-bootstrap";
import Link from "next/link";
import { FiUser, FiMail, FiLock, FiPhone, FiGlobe, FiCheck, FiRefreshCw } from "react-icons/fi";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";

// import data
import { authPlans, howDidYouFindOptions, timeZones } from "data/authPlansData";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [captchaText, setCaptchaText] = useState("ABCD123");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    howFound: "",
    privacyAccepted: false,
    firstName: "",
    lastName: "",
    organization: "",
    mobile: "",
    timeZone: "",
    captcha: ""
  });

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && userType) {
      setStep(2);
    } else if (step === 2 && formData.email && formData.password && formData.howFound && formData.privacyAccepted) {
      setStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle final submission
    console.log("Account created:", { userType, ...formData });
  };

  // Step 1: User Type Selection
  if (step === 1) {
    return (
      <Container className="py-8">
        <Row className="justify-content-center">
          <Col lg={8} md={10} sm={12}>
            <div className="text-center mb-6">
              <Image
                src="/images/brand/logo/i9.png"
                className="mb-4"
                alt="I9experts Logo"
                width={150}
                height={60}
              />
              <h2 className="mb-2">Create Your I9experts Account</h2>
            </div>
            
            <Card className="shadow-sm border-0">
              <Card.Body className="p-5">
                <Form onSubmit={handleNext}>
                  <div className="mb-4">
                    <h5 className="mb-4">User:</h5>
                    <div className="d-grid gap-3">
                      <Form.Check
                        type="radio"
                        id="admin"
                        name="userType"
                        label="I am an Admin (Test Administrator)"
                        value="admin"
                        checked={userType === "admin"}
                        onChange={(e) => setUserType(e.target.value)}
                        className="p-3 border rounded cursor-pointer"
                      />
                      <Form.Check
                        type="radio"
                        id="candidate"
                        name="userType"
                        label="I am a Candidate (Test Taker)"
                        value="candidate"
                        checked={userType === "candidate"}
                        onChange={(e) => setUserType(e.target.value)}
                        className="p-3 border rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      type="submit"
                      disabled={!userType}
                      size="lg"
                    >
                      Next
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  // Step 2: Account Details
  if (step === 2) {
    return (
      <Container className="py-8">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            <div className="text-center mb-5">
              <Image
                src="/images/brand/logo/i9.png"
                className="mb-3"
                alt="I9experts Logo"
                width={120}
                height={50}
              />
            </div>
            
            <Row>
              {/* Left Side - Form */}
              <Col lg={7} className="mb-4 mb-lg-0">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-5">
                    <h3 className="mb-4">Create Your I9experts Account</h3>
                    <Form onSubmit={handleNext}>
                      <Form.Group className="mb-3">
                        <Form.Label>Your Email <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>New Password <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Create a strong password"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>How did you find out about I9experts? <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          name="howFound"
                          value={formData.howFound}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select an option</option>
                          {howDidYouFindOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Check
                          type="checkbox"
                          id="privacyPolicy"
                          name="privacyAccepted"
                          checked={formData.privacyAccepted}
                          onChange={handleInputChange}
                          label={
                            <>
                              I accept SpeedExam's{' '}
                              <Link href="#" className="text-primary">Privacy Policy</Link>
                              {', '}
                              <Link href="#" className="text-primary">Refund Policy</Link>
                              {', and '}
                              <Link href="#" className="text-primary">Terms of Use</Link>
                            </>
                          }
                          required
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button 
                          variant="primary" 
                          type="submit"
                          size="lg"
                        >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              {/* Right Side - Plans */}
              <Col lg={5}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <h4 className="mb-4 text-center">Choose your Plan</h4>
                    <div className="d-grid gap-3">
                      {authPlans.map(plan => (
                        <Card 
                          key={plan.id} 
                          className={`border-2 ${plan.popular ? 'border-primary' : 'border-light'}`}
                        >
                          <Card.Body className="p-3">
                            {plan.popular && (
                              <div className="badge bg-primary mb-2">Most Popular</div>
                            )}
                            <h5 className="mb-2">{plan.name}</h5>
                            <div className="mb-2">
                              <span className="h4 fw-bold text-primary">{plan.price}</span>
                              <span className="text-muted"> / {plan.duration}</span>
                            </div>
                            <ul className="small text-muted mb-0">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="mb-1">
                                  <FiCheck size={12} className="me-1 text-success" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }

  // Step 3: Personal Details
  if (step === 3) {
    return (
      <Container className="py-8">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            <div className="text-center mb-5">
              <Image
                src="/images/brand/logo/i9.png"
                className="mb-3"
                alt="I9experts Logo"
                width={120}
                height={50}
              />
            </div>
            
            <Row>
              {/* Left Side - Form */}
              <Col lg={7} className="mb-4 mb-lg-0">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-5">
                    <h3 className="mb-4">Complete Your Profile</h3>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6} className="mb-3">
                          <Form.Group>
                            <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="Enter first name"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Group>
                            <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Enter last name"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Organization Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          placeholder="Enter organization name"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Mobile (10 Digits) <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter 10 digit mobile number"
                          maxLength="10"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Time Zone <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          name="timeZone"
                          value={formData.timeZone}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select your time zone</option>
                          {timeZones.map((zone, index) => (
                            <option key={index} value={zone}>{zone}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Enter Image Text</Form.Label>
                        <div className="d-flex gap-2 align-items-center">
                          <div className="border rounded p-2 bg-light" style={{ minWidth: '120px' }}>
                            <span className="fw-bold">{captchaText}</span>
                          </div>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            className="p-2"
                            onClick={() => {
                              const newCaptcha = generateCaptcha();
                              setCaptchaText(newCaptcha);
                              setFormData(prev => ({ ...prev, captcha: '' }));
                            }}
                          >
                            <FiRefreshCw size={16} />
                          </Button>
                          <Form.Control
                            type="text"
                            name="captcha"
                            value={formData.captcha}
                            onChange={handleInputChange}
                            placeholder="Enter the text above"
                            style={{ maxWidth: '150px' }}
                          />
                        </div>
                      </Form.Group>

                      <div className="d-grid">
                        <Button 
                          variant="primary" 
                          type="submit"
                          size="lg"
                        >
                          Complete
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              {/* Right Side - Plans */}
              <Col lg={5}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <h4 className="mb-4 text-center">Choose your Plan</h4>
                    <div className="d-grid gap-3">
                      {authPlans.map(plan => (
                        <Card 
                          key={plan.id} 
                          className={`border-2 ${plan.popular ? 'border-primary' : 'border-light'}`}
                        >
                          <Card.Body className="p-3">
                            {plan.popular && (
                              <div className="badge bg-primary mb-2">Most Popular</div>
                            )}
                            <h5 className="mb-2">{plan.name}</h5>
                            <div className="mb-2">
                              <span className="h4 fw-bold text-primary">{plan.price}</span>
                              <span className="text-muted"> / {plan.duration}</span>
                            </div>
                            <ul className="small text-muted mb-0">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="mb-1">
                                  <FiCheck size={12} className="me-1 text-success" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
};

SignUp.Layout = AuthLayout;

export default SignUp;