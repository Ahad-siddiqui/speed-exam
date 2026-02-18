import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Accordion } from 'react-bootstrap';
import { FiHelpCircle, FiBook, FiMail, FiMessageSquare, FiSearch } from 'react-icons/fi';
import Link from 'next/link';

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKey, setActiveKey] = useState('0');

  const faqs = [
    {
      id: '0',
      question: 'How do I create a new exam?',
      answer: 'Go to Exams > Add Exam. Enter exam details like name, duration, and passing marks. Add questions manually or import from the question bank.'
    },
    {
      id: '1',
      question: 'How to add candidates?',
      answer: 'Navigate to Candidates > Add Candidate. Enter candidate details including name, email, and assign to appropriate groups.'
    },
    {
      id: '2',
      question: 'How to import bulk questions?',
      answer: 'Visit Settings > Import Questions. Download the sample Excel template, fill your questions, and upload the completed file.'
    },
    {
      id: '3',
      question: 'How to schedule an exam?',
      answer: 'In the exam creation form, set start date, end date, and duration. Configure security settings and candidate groups.'
    },
    {
      id: '4',
      question: 'How to view results?',
      answer: 'Go to Statistics page to see detailed exam analytics, candidate performance reports, and download results in various formats.'
    }
  ];

  const supportOptions = [
    {
      id: 1,
      title: 'Documentation',
      icon: <FiBook size={20} />,
      description: 'Complete user guides',
      link: '/documentation'
    },
    {
      id: 2,
      title: 'Email Support',
      icon: <FiMail size={20} />,
      description: 'support@examportal.com',
      link: 'mailto:support@examportal.com'
    },
    {
      id: 3,
      title: 'Live Chat',
      icon: <FiMessageSquare size={20} />,
      description: 'Instant assistance',
      link: '#'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <Container fluid className="mt-n22 px-6 pt-20 pb-10">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center mb-5 p-3">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-black">Help & Support</h3>
                <p className="text-muted mb-0">Examination Management System Assistance</p>
              </div>
              <div>
                <Link href="/" className="btn btn-primary">Back to Dashboard</Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Search Section */}
        <Row className="mb-5">
          <Col lg={8} md={12} className="mx-auto">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 text-center">
                <FiHelpCircle size={40} className="text-primary mb-3" />
                <h3 className="mb-3">How can we assist you?</h3>
                <p className="text-muted mb-4">Find answers to common questions about our examination system</p>
                <div className="position-relative mx-auto" style={{ maxWidth: '500px' }}>
                  <Form.Control
                    type="text"
                    placeholder="Search help topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-2 ps-5"
                  />
                  <FiSearch className="position-absolute" style={{ left: '15px', top: '10px', color: '#6c757d' }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Support Options */}
        <Row className="mb-5">
          <Col lg={12}>
            <h4 className="mb-4">Support Options</h4>
            <Row>
              {supportOptions.map(option => (
                <Col md={4} className="mb-3" key={option.id}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-3">
                      <div className="avatar avatar-md avatar-indicators avatar-primary mb-2 mx-auto">
                        {option.icon}
                      </div>
                      <h6 className="mb-1">{option.title}</h6>
                      <p className="text-muted small mb-2">{option.description}</p>
                      <Button 
                        variant="primary"
                        size="sm"
                        href={option.link}
                        className="w-100"
                      >
                        Access
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row>
          <Col lg={8} className="mx-auto">
            <h4 className="mb-4">Frequently Asked Questions</h4>
            {filteredFaqs.length > 0 ? (
              <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                {filteredFaqs.map(faq => (
                  <Accordion.Item eventKey={faq.id} key={faq.id}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <Card className="border-0 bg-light">
                <Card.Body className="text-center py-4">
                  <FiHelpCircle size={32} className="text-muted mb-2" />
                  <h5 className="text-muted">No results found</h5>
                  <p className="text-muted small">Try different search terms</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HelpSupport;