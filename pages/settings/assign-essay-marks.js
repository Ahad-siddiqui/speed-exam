import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FiSearch, FiX, FiFileText } from 'react-icons/fi';
import Link from 'next/link';

const SettingsAssignEssayMarks = () => {
  const [searchData, setSearchData] = useState({
    firstName: '',
    lastName: '',
    groupName: '',
    examName: '',
    questionId: '',
    status: '',
    questionType: ''
  });

  const examOptions = [
    { value: '', label: 'Select Exam' },
    { value: 'exam1', label: 'Midterm Exam' },
    { value: 'exam2', label: 'Final Exam' },
    { value: 'exam3', label: 'Quiz 1' },
    { value: 'exam4', label: 'Quiz 2' }
  ];

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'graded', label: 'Graded' },
    { value: 'review', label: 'Under Review' },
    { value: 'completed', label: 'Completed' }
  ];

  const groupOptions = [
    { value: '', label: 'Select Group' },
    { value: 'group1', label: 'Group 1' },
    { value: 'group2', label: 'Group 2' },
    { value: 'group3', label: 'Group 3' },
    { value: 'group4', label: 'Group 4' }
  ];

  const questionTypeOptions = [
    { value: '', label: 'Select Question Type' },
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'essay', label: 'Essay' },
    { value: 'short-answer', label: 'Short Answer' },
    { value: 'coding', label: 'Coding' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality would go here
    console.log('Search data:', searchData);
    // You can implement the actual search logic here
  };

  const handleCancel = () => {
    setSearchData({
      firstName: '',
      lastName: '',
      groupName: '',
      examName: '',
      questionId: '',
      status: '',
      questionType: ''
    });
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
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Assign Essay Marks</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSearch}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="Enter first name"
                          value={searchData.firstName}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Enter last name"
                          value={searchData.lastName}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Group Name</Form.Label>
                        <Form.Select
                          name="groupName"
                          value={searchData.groupName}
                          onChange={handleInputChange}
                        >
                          {groupOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Exam Name</Form.Label>
                        <Form.Select
                          name="examName"
                          value={searchData.examName}
                          onChange={handleInputChange}
                        >
                          {examOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Question ID</Form.Label>
                        <Form.Control
                          type="text"
                          name="questionId"
                          placeholder="Enter question ID"
                          value={searchData.questionId}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          name="status"
                          value={searchData.status}
                          onChange={handleInputChange}
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Question Type</Form.Label>
                        <Form.Select
                          name="questionType"
                          value={searchData.questionType}
                          onChange={handleInputChange}
                        >
                          {questionTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button variant="secondary" type="button" onClick={handleCancel}>
                      <FiX className="me-1" /> Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                      <FiSearch className="me-1" /> Search
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Results Section - Placeholder */}
            <Card className="mt-4">
              <Card.Header>
                <h4 className="mb-0">Search Results</h4>
              </Card.Header>
              <Card.Body className="p-4 text-center">
                <FiFileText size={48} className="text-muted mb-3" />
                <h5 className="text-muted">No search results yet</h5>
                <p className="text-muted">Fill in the search form above and click Search to find essay submissions</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SettingsAssignEssayMarks;