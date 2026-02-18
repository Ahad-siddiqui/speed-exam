// import node module libraries
import { useState } from "react";
import { Row, Col, Card, Form, Button, Image, Container } from "react-bootstrap";
import Link from "next/link";
import { FiMail, FiRefreshCw } from "react-icons/fi";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";

const ForgetPassword = () => {
  const [captchaText, setCaptchaText] = useState("XYZ789");
  
  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  return (
    <Container className="py-8">
      <Row className="justify-content-center">
        <Col lg={5} md={8} sm={10}>
          <div className="text-center mb-5">
            <Image
              src="/images/brand/logo/i9.png"
              className="mb-4"
              alt="I9experts Logo"
              width={150}
              height={60}
            />
            <h2 className="mb-2">Forgot Password</h2>
          </div>
          
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Email Address</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      className="ps-5"
                      required
                    />
                  </div>
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
                      }}
                    >
                      <FiRefreshCw size={16} />
                    </Button>
                    <Form.Control
                      type="text"
                      placeholder="Enter the text above"
                      style={{ maxWidth: '150px' }}
                      required
                    />
                  </div>
                </Form.Group>

                <div className="d-grid mb-4">
                  <Button variant="primary" type="submit" size="lg">
                    Send Reset Email
                  </Button>
                </div>

                <div className="text-center">
                  <Link href="/authentication/sign-in" className="text-primary">
                    ← Back to Signin
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;