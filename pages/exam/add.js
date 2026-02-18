import { Fragment, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { FiArrowLeft, FiPlus, FiSettings, FiMonitor, FiShield } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AddExam = () => {
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState('grading');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    date: '',
    time: '',
    duration: '',
    students: 0,
    totalMarks: 0,
    status: 'upcoming',
    // Checkbox states
    allowMultipleAttempts: false,
    showResultsImmediately: false,
    // Select box states
    examType: 'offline',
    difficultyLevel: 'medium',
    questionShuffle: 'none',
    // Radio button states
    gradingMethod: 'automatic',
    timeLimit: 'fixed',
    resultDisplay: 'detailed'
  });

  // Advanced tab states
  const [advancedData, setAdvancedData] = useState({
    // Grading & Accessibility
    gradingScale: 'percentage',
    passingCriteria: 'percentage',
    accessibilityOptions: 'none',
    // Custom grading inputs
    gradeA: { type: 'percentage', value: 90, label: 'A' },
    gradeB: { type: 'percentage', value: 80, label: 'B' },
    gradeC: { type: 'percentage', value: 70, label: 'C' },
    gradeD: { type: 'percentage', value: 60, label: 'D' }
  });

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAdvancedChange = (e) => {
    const { name, value } = e.target;
    setAdvancedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGradeChange = (grade, field, value) => {
    setAdvancedData(prev => ({
      ...prev,
      [grade]: {
        ...prev[grade],
        [field]: field === 'value' ? parseFloat(value) || 0 : value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing exams from localStorage
    const existingExams = JSON.parse(localStorage.getItem('exams') || '[]');
    
    // Create new exam with unique ID
    const newExam = {
      ...formData,
      id: Date.now(),
      students: parseInt(formData.students),
      totalMarks: parseInt(formData.totalMarks),
      advanced: advancedData
    };
    
    // Add to existing exams
    const updatedExams = [...existingExams, newExam];
    
    // Save to localStorage
    localStorage.setItem('exams', JSON.stringify(updatedExams));
    
    // Redirect to exam list
    router.push('/exam');
  };

  const handleCancel = () => {
    router.push('/exam');
  };

  return (
    <Fragment>
      <Container fluid className="mt-n22 px-6 pt-20 pb-10">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex align-items-center justify-content-between p-3">
              
              <h3 className="mb-0 text-black">Add New Exam</h3>

              <Button
                variant="primary"
                className="btn-primary"
                onClick={handleCancel}
              >
                <FiArrowLeft className="me-1" /> Back
              </Button>

            </div>
          </Col>
        </Row>


        <Row className="mt-6">
          <Col xl={12} lg={12}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>Exam Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Mid Term Exam"
                        required
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>Course *</Form.Label>
                      <Form.Control
                        type="text"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        placeholder="e.g., Mathematics"
                        required
                      />
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Date *</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Time *</Form.Label>
                      <Form.Control
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Duration *</Form.Label>
                      <Form.Control
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g., 2 hours"
                        required
                      />
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Number of Students *</Form.Label>
                      <Form.Control
                        type="number"
                        name="students"
                        value={formData.students}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Total Marks *</Form.Label>
                      <Form.Control
                        type="number"
                        name="totalMarks"
                        value={formData.totalMarks}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Status *</Form.Label>
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  {/* Checkboxes */}
                  <Row className="mt-4">
                    <Col md={12}>
                      <h5 className="mb-3">Exam Options</h5>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Allow Multiple Attempts"
                        name="allowMultipleAttempts"
                        checked={formData.allowMultipleAttempts}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Show Results Immediately"
                        name="showResultsImmediately"
                        checked={formData.showResultsImmediately}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>

                  {/* Select Boxes */}
                  <Row className="mt-4">
                    <Col md={12}>
                      <h5 className="mb-3">Exam Configuration</h5>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Exam Type</Form.Label>
                      <Form.Select
                        name="examType"
                        value={formData.examType}
                        onChange={handleInputChange}
                      >
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                        <option value="hybrid">Hybrid</option>
                      </Form.Select>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Difficulty Level</Form.Label>
                      <Form.Select
                        name="difficultyLevel"
                        value={formData.difficultyLevel}
                        onChange={handleInputChange}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </Form.Select>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Question Shuffle</Form.Label>
                      <Form.Select
                        name="questionShuffle"
                        value={formData.questionShuffle}
                        onChange={handleInputChange}
                      >
                        <option value="none">None</option>
                        <option value="random">Random</option>
                        <option value="sectional">Sectional</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  {/* Radio Buttons */}
                  <Row className="mt-4">
                    <Col md={12}>
                      <h5 className="mb-3">Grading & Display Options</h5>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Grading Method</Form.Label>
                      {['automatic', 'manual', 'mixed'].map((method) => (
                        <Form.Check
                          key={method}
                          type="radio"
                          label={method.charAt(0).toUpperCase() + method.slice(1)}
                          name="gradingMethod"
                          value={method}
                          checked={formData.gradingMethod === method}
                          onChange={handleInputChange}
                          className="mb-2"
                        />
                      ))}
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Time Limit</Form.Label>
                      {['fixed', 'flexible', 'extended'].map((limit) => (
                        <Form.Check
                          key={limit}
                          type="radio"
                          label={limit.charAt(0).toUpperCase() + limit.slice(1)}
                          name="timeLimit"
                          value={limit}
                          checked={formData.timeLimit === limit}
                          onChange={handleInputChange}
                          className="mb-2"
                        />
                      ))}
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>Result Display</Form.Label>
                      {['detailed', 'summary', 'minimal'].map((display) => (
                        <Form.Check
                          key={display}
                          type="radio"
                          label={display.charAt(0).toUpperCase() + display.slice(1)}
                          name="resultDisplay"
                          value={display}
                          checked={formData.resultDisplay === display}
                          onChange={handleInputChange}
                          className="mb-2"
                        />
                      ))}
                    </Col>
                  </Row>

                  {/* Advanced Options Button */}
                  <Row className="mt-4">
                    <Col md={12}>
                      <Button 
                        variant="outline-primary" 
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="mb-3"
                      >
                        <FiSettings className="me-2" />
                        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                      </Button>
                    </Col>
                  </Row>

                  {/* Advanced Options Tabs */}
                  {showAdvanced && (
                    <Row className="mt-3">
                      <Col md={12}>
                        <Card>
                          <Card.Header>
                            <h5 className="mb-0">Advanced Configuration</h5>
                          </Card.Header>
                          <Card.Body>
                            <Tabs
                              activeKey={activeTab}
                              onSelect={(k) => setActiveTab(k)}
                              className="mb-4"
                            >
                              <Tab eventKey="grading" title={<span><FiSettings className="me-2" />Grading & Accessibility</span>}>
                                <Row>
                                  <Col md={12}>
                                    <h6 className="mb-3">Grading Options</h6>
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <Form.Label>Grading Scale</Form.Label>
                                    {['percentage', 'gpa', 'points'].map((scale) => (
                                      <Form.Check
                                        key={scale}
                                        type="radio"
                                        label={scale.charAt(0).toUpperCase() + scale.slice(1)}
                                        name="gradingScale"
                                        value={scale}
                                        checked={advancedData.gradingScale === scale}
                                        onChange={handleAdvancedChange}
                                        className="mb-2"
                                      />
                                    ))}
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <Form.Label>Passing Criteria</Form.Label>
                                    {['percentage', 'grade', 'points'].map((criteria) => (
                                      <Form.Check
                                        key={criteria}
                                        type="radio"
                                        label={criteria.charAt(0).toUpperCase() + criteria.slice(1)}
                                        name="passingCriteria"
                                        value={criteria}
                                        checked={advancedData.passingCriteria === criteria}
                                        onChange={handleAdvancedChange}
                                        className="mb-2"
                                      />
                                    ))}
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <Form.Label>Accessibility Options</Form.Label>
                                    {['none', 'basic', 'full'].map((option) => (
                                      <Form.Check
                                        key={option}
                                        type="radio"
                                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                                        name="accessibilityOptions"
                                        value={option}
                                        checked={advancedData.accessibilityOptions === option}
                                        onChange={handleAdvancedChange}
                                        className="mb-2"
                                      />
                                    ))}
                                  </Col>
                                </Row>

                                <Row className="mt-4">
                                  <Col md={12}>
                                    <h6 className="mb-3">Grade Configuration</h6>
                                  </Col>
                                  {['gradeA', 'gradeB', 'gradeC', 'gradeD'].map((grade) => (
                                    <Col md={3} className="mb-3" key={grade}>
                                      <Form.Label>{advancedData[grade].label} Grade</Form.Label>
                                      <Form.Select
                                        size="sm"
                                        value={advancedData[grade].type}
                                        onChange={(e) => handleGradeChange(grade, 'type', e.target.value)}
                                        className="mb-2"
                                      >
                                        <option value="percentage">Percentage</option>
                                        <option value="points">Points</option>
                                      </Form.Select>
                                      <Form.Control
                                        type="number"
                                        size="sm"
                                        value={advancedData[grade].value}
                                        onChange={(e) => handleGradeChange(grade, 'value', e.target.value)}
                                        placeholder={advancedData[grade].type === 'percentage' ? '%' : 'Points'}
                                      />
                                    </Col>
                                  ))}
                                </Row>
                              </Tab>

                              <Tab eventKey="display" title={<span><FiMonitor className="me-2" />Display & Order</span>}>
                                <Row>
                                  <Col md={12}>
                                    <h6 className="mb-3">Display Settings</h6>
                                  </Col>
                                  <Col md={6} className="mb-3">
                                    <Form.Label>Question Display Mode</Form.Label>
                                    <Form.Select>
                                      <option>One at a time</option>
                                      <option>All at once</option>
                                      <option>Section by section</option>
                                    </Form.Select>
                                  </Col>
                                  <Col md={6} className="mb-3">
                                    <Form.Label>Navigation Style</Form.Label>
                                    <Form.Select>
                                      <option>Linear</option>
                                      <option>Non-linear</option>
                                      <option>Tabbed</option>
                                    </Form.Select>
                                  </Col>
                                </Row>
                              </Tab>

                              <Tab eventKey="security" title={<span><FiShield className="me-2" />Exam Security</span>}>
                                <Row>
                                  <Col md={12}>
                                    <h6 className="mb-3">Security Settings</h6>
                                  </Col>
                                  <Col md={6} className="mb-3">
                                    <Form.Check
                                      type="checkbox"
                                      label="Enable Proctoring"
                                    />
                                  </Col>
                                  <Col md={6} className="mb-3">
                                    <Form.Check
                                      type="checkbox"
                                      label="Randomize Questions"
                                    />
                                  </Col>
                                  <Col md={6} className="mb-3">
                                    <Form.Check
                                      type="checkbox"
                                      label="Disable Copy Paste"
                                    />
                                  </Col>
                                  <Col md={6} className="mb-3">
                                    <Form.Check
                                      type="checkbox"
                                      label="Time Tracking"
                                    />
                                  </Col>
                                </Row>
                              </Tab>
                            </Tabs>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  )}
                  
                  <div className="d-flex gap-2 mt-4">
                    <Button type="submit" variant="primary" size="lg">
                      <FiPlus className="me-1" /> Add Exam
                    </Button>
                    <Button type="button" variant="secondary" size="lg" onClick={handleCancel}>
                      Cancel
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

export default AddExam;
