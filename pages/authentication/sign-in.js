// import node module libraries
import { Row, Col, Card, Form, Button, Image, Container } from "react-bootstrap";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";

const SignIn = () => {
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
            <h2 className="mb-2">Administrative Signin</h2>
          </div>
          
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Username / Email</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="email"
                      placeholder="Enter your username or email"
                      className="ps-5"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      className="ps-5"
                      required
                    />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                  <Link href="/authentication/forget-password" className="text-primary">
                    Forgot?
                  </Link>
                </div>

                <div className="d-grid mb-4">
                  <Button variant="primary" type="submit" size="lg">
                    SIGN IN
                  </Button>
                </div>

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link href="/authentication/sign-up" className="text-primary fw-bold">
                      Create Account
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;