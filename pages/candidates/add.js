import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FiUser, FiMail, FiPhone, FiCalendar, FiSave } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AddCandidate = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    candidateGroup: '',
    mobile: '',
    uniqueId: '',
    referenceId: '',
    specialNeeds: '',
    specialNeedsStatus: 'disable',
    moreDetail: '',
    status: 'active'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing candidates
    const existingCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    
    // Create new candidate object
    const newCandidate = {
      id: Date.now(),
      ...formData,
      registeredDate: new Date().toLocaleDateString(),
      fullName: `${formData.firstName} ${formData.lastName}`
    };
    
    // Save to localStorage
    const updatedCandidates = [...existingCandidates, newCandidate];
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    
    // Redirect to candidates list
    router.push('/candidates');
  };

  return (
    <Fragment>
      <Container fluid className="mt-n22 px-6 pt-20 pb-10">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center p-3">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-black">Add New Candidate</h3>
              </div>
              <div>
                <Link href="/candidates" className="btn btn-primary">Back to List</Link>
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
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FiUser />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FiUser />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FiMail />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Username <span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FiUser />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Candidate Group</Form.Label>
                        <Form.Select
                          name="candidateGroup"
                          value={formData.candidateGroup}
                          onChange={handleChange}
                        >
                          <option value="">Select group</option>
                          <option value="group1">Group 1</option>
                          <option value="group2">Group 2</option>
                          <option value="group3">Group 3</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Mobile <span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FiPhone />
                          </InputGroup.Text>
                          <Form.Control
                            type="tel"
                            name="mobile"
                            placeholder="Enter mobile number"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Unique Identification</Form.Label>
                        <Form.Select
                          name="uniqueId"
                          value={formData.uniqueId}
                          onChange={handleChange}
                        >
                          <option value="">Select identification type</option>
                          <option value="passport">Passport</option>
                          <option value="driver-license">Driver License</option>
                          <option value="national-id">National ID</option>
                          <option value="student-id">Student ID</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Reference ID</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="referenceId"
                            placeholder="Enter reference ID"
                            value={formData.referenceId}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label className="d-block mb-2">Special Needs</Form.Label>
                        <div className="d-flex gap-4">
                          <Form.Check
                            type="radio"
                            id="specialNeedsEnable"
                            name="specialNeedsStatus"
                            label="Enable"
                            value="enable"
                            checked={formData.specialNeedsStatus === 'enable'}
                            onChange={handleChange}
                          />
                          <Form.Check
                            type="radio"
                            id="specialNeedsDisable"
                            name="specialNeedsStatus"
                            label="Disable"
                            value="disable"
                            checked={formData.specialNeedsStatus === 'disable'}
                            onChange={handleChange}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>More Detail</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="moreDetail"
                          placeholder="Enter additional details"
                          value={formData.moreDetail}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label className="d-block mb-2">Status</Form.Label>
                        <div className="d-flex gap-4">
                          <Form.Check
                            type="radio"
                            id="active"
                            name="status"
                            label="Save as Active"
                            value="active"
                            checked={formData.status === 'active'}
                            onChange={handleChange}
                          />
                          <Form.Check
                            type="radio"
                            id="inactive"
                            name="status"
                            label="Save as Inactive"
                            value="inactive"
                            checked={formData.status === 'inactive'}
                            onChange={handleChange}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id="terms"
                        label="I agree to the terms and conditions"
                        required
                      />
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <Link href="/candidates" className="btn btn-secondary">
                      Cancel
                    </Link>
                    <Button variant="primary" type="submit">
                      <FiSave className="me-1" /> Save Candidate
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

export default AddCandidate;