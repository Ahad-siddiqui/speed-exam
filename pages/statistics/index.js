import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { FiDatabase, FiUser, FiCalendar, FiCreditCard, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('meezan');
  const currentPlan = "Basic Plan";

  const plans = [
    { id: 1, name: 'Basic Plan', monthly: '$19', yearly: '$199' },
    { id: 2, name: 'Pro Plan', monthly: '$49', yearly: '$499' },
    { id: 3, name: 'Enterprise Plan', monthly: '$99', yearly: '$999' },
    { id: 4, name: 'Premium Plan', monthly: '$149', yearly: '$1499' }
  ];

  return (
    <Fragment>
      <Container fluid className="mt-n22 px-6 pt-20 pb-10">
        <Row className="justify-content-center">
          <Col lg={12} md={10} xs={12}>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="mb-2 mb-lg-0 p-3">
                <h3 className="mb-0 text-black">Manage My Plan</h3>
              </div>
              <div>
                <Link href="/" className="btn btn-primary">Back to Dashboard</Link>
              </div>
            </div>

            {/* Main Card */}
            <Card className="mb-6">
              <Card.Body className="p-5">
                {/* Logo in Card */}
                <div className="text-center mb-4">
                  <div className="bg-white rounded-circle mx-auto mb-3" style={{width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Link href="/" className="navbar-brand">
                      <Image src="/images/brand/logo/i9.png" alt="" width={100} height={50} />
                    </Link>
                  </div>
                </div>

               

                {/* Current Plan */}
                <div className="text-center mb-4">
                  <h3 className="text-muted mb-2">You are currently using {currentPlan}</h3>
                </div>

                {/* Choose Plan Heading */}
                <div className="text-center mb-4">
                  <p className="text-muted">Please choose the plan as per your need and budget</p>
                </div>

                {/* Tabs */}
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4 justify-content-center"
                >
                  <Tab eventKey="all" title="All Plan"></Tab>
                  <Tab eventKey="yearly" title="Yearly"></Tab>
                  <Tab eventKey="monthly" title="Monthly"></Tab>
                </Tabs>

                {/* Payment Methods */}
                <div className="text-center mb-4">
                  <h6 className="mb-3">Payment Methods</h6>
                  <div className="d-flex justify-content-center gap-3">
                    <Button
                      variant={paymentMethod === 'meezan' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => setPaymentMethod('meezan')}
                    >
                      Meezan Bank
                    </Button>
                    <Button
                      variant={paymentMethod === 'paypal' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      PayPal
                    </Button>
                    <Button
                      variant={paymentMethod === 'stripe' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => setPaymentMethod('stripe')}
                    >
                      Stripe
                    </Button>
                  </div>
                </div>

                {/* Plan Cards */}
                <Row>
                  {plans.map((plan) => (
                    <Col md={6} lg={3} className="mb-4" key={plan.id}>
                      <Card className="h-100">
                        <Card.Body className="text-center">
                          <Card.Title className="mb-3">{plan.name}</Card.Title>
                          <div className="mb-3">
                            <div className="mb-2">
                              <FiCalendar className="me-1 text-muted" />
                              <span className="text-muted">Monthly</span>
                            </div>
                            <h3 className="text-primary mb-0">{plan.monthly}</h3>
                          </div>
                          <div className="mb-3">
                            <div className="mb-2">
                              <FiUser className="me-1 text-muted" />
                              <span className="text-muted">Yearly</span>
                            </div>
                            <h3 className="text-success mb-0">{plan.yearly}</h3>
                          </div>
                          <Button variant="primary" className="w-100">
                            <FiCreditCard className="me-1" /> Select Plan
                          </Button>
                        </Card.Body>
                      </Card>
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

export default Statistics;