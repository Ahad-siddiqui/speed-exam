import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FiFileText, FiSave, FiPlus, FiX, FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const AddQuestion = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    questionType: '',
    section: '',
    questionText: '',
    answers: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    showExplanation: false,
    showAdvancedOptions: false,
    attachDirection: false,
    directionOptions: ['', '', '', ''],
    marks: '',
    negative: '',
    difficultyLevel: '',
    tags: '',
    enableInTestmaker: false,
    hintStatus: 'disable',
    publishStatus: 'draft'
  });
  
  const [additionalChoices, setAdditionalChoices] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({
      ...formData,
      answers: newAnswers
    });
  };

  const handleDirectionChange = (index, value) => {
    const newDirections = [...formData.directionOptions];
    newDirections[index] = value;
    setFormData({
      ...formData,
      directionOptions: newDirections
    });
  };

  const addChoice = () => {
    setAdditionalChoices([...additionalChoices, '']);
  };

  const removeChoice = (index) => {
    const newChoices = [...additionalChoices];
    newChoices.splice(index, 1);
    setAdditionalChoices(newChoices);
  };

  const handleAdditionalChoiceChange = (index, value) => {
    const newChoices = [...additionalChoices];
    newChoices[index] = value;
    setAdditionalChoices(newChoices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing questions
    const existingQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    
    // Create new question object
    const newQuestion = {
      id: Date.now(),
      ...formData,
      additionalChoices: additionalChoices,
      createdDate: new Date().toLocaleDateString()
    };
    
    // Save to localStorage
    const updatedQuestions = [...existingQuestions, newQuestion];
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    
    // Redirect to questions list
    router.push('/questions');
  };

  return (
    <Fragment>
      <Container fluid className="mt-n22 px-6 pt-20 pb-10">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center p-3">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-black">Add New Question</h3>
              </div>
              <div>
                <Link href="/questions" className="btn btn-primary">Back to List</Link>
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
                        <Form.Label>Question Type</Form.Label>
                        <Form.Select
                          name="questionType"
                          value={formData.questionType}
                          onChange={handleChange}
                        >
                          <option value="">Select question type</option>
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="true-false">True/False</option>
                          <option value="short-answer">Short Answer</option>
                          <option value="essay">Essay</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Section</Form.Label>
                        <Form.Select
                          name="section"
                          value={formData.section}
                          onChange={handleChange}
                        >
                          <option value="">Select section</option>
                          <option value="section1">Section 1</option>
                          <option value="section2">Section 2</option>
                          <option value="section3">Section 3</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-10">
                      <Form.Group>
                        <Form.Label>Question</Form.Label>
                        <ReactQuill
                          theme="snow"
                          value={formData.questionText}
                          onChange={(value) => setFormData({...formData, questionText: value})}
                          style={{height: '150px'}}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Label>Answer</Form.Label>
                      {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                          <Form.Check
                            type="radio"
                            id={`answer${String.fromCharCode(65 + index)}`}
                            name="correctAnswer"
                            label={String.fromCharCode(65 + index)}
                            value={String.fromCharCode(65 + index)}
                            checked={formData.correctAnswer === String.fromCharCode(65 + index)}
                            onChange={handleChange}
                            className="me-3"
                          />
                          <ReactQuill
                            theme="snow"
                            value={formData.answers[index]}
                            onChange={(value) => handleAnswerChange(index, value)}
                            style={{height: '100px', width: 'calc(100% - 100px)'}}
                          />
                        </div>
                      ))}
                      
                      {additionalChoices.map((choice, index) => (
                        <div key={index} className="d-flex align-items-center mb-2 mt-7">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="me-2"
                            onClick={() => removeChoice(index)}
                          >
                            <FiX size={14} />
                          </Button>
                          <ReactQuill
                            theme="snow"
                            value={choice}
                            onChange={(value) => handleAdditionalChoiceChange(index, value)}
                            style={{height: '100px', width: 'calc(97% - 50px)'}}
                          />
                        </div>
                      ))}
                      
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={addChoice}
                        className="mt-10"
                      >
                        <FiPlus className="me-1" /> Add New Choice
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <div className="mb-6">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="w-10"
                          onClick={() => setFormData({...formData, showExplanation: !formData.showExplanation})}
                        >
                          {formData.showExplanation ? <FiX className="me-1" /> : <FiPlus className="me-1" />} {formData.showExplanation ? 'Hide Explanation' : 'Add Explanation'}
                        </Button>
                        {formData.showExplanation && (
                          <Form.Group>
                            <Form.Label>Explanation</Form.Label>
                            <ReactQuill
                              theme="snow"
                              value={formData.explanation}
                              onChange={(value) => setFormData({...formData, explanation: value})}
                              style={{height: '150px'}}
                            />
                          </Form.Group>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <div className="mb-3">
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="w-10 mb-3"
                          onClick={() => setFormData({...formData, showAdvancedOptions: !formData.showAdvancedOptions})}
                        >
                          <FiSettings className="me-1" /> {formData.showAdvancedOptions ? 'Hide Advanced Options' : 'Advanced Options'}
                        </Button>
                        {formData.showAdvancedOptions && (
                          <Card className="p-3">
                            <h6>Advanced Options</h6>
                            <Form.Check
                              type="checkbox"
                              id="attachDirection"
                              label="Attach Direction"
                              name="attachDirection"
                              checked={formData.attachDirection}
                              onChange={handleChange}
                              className="mb-3"
                            />
                            
                            <Form.Label>Add New Direction</Form.Label>
                            {[0, 1, 2, 3].map((index) => (
                              <Form.Select
                                key={index}
                                className="mb-2"
                                value={formData.directionOptions[index]}
                                onChange={(e) => handleDirectionChange(index, e.target.value)}
                              >
                                <option value="">Select option {index + 1}</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                              </Form.Select>
                            ))}
                            
                            <Row>
                              <Col md={3}>
                                <Form.Label>Marks</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="marks"
                                  value={formData.marks}
                                  onChange={handleChange}
                                />
                              </Col>
                              <Col md={3}>
                                <Form.Label>Negative</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="negative"
                                  value={formData.negative}
                                  onChange={handleChange}
                                />
                              </Col>
                              <Col md={3}>
                                <Form.Label>Difficulty Level</Form.Label>
                                <Form.Select
                                  name="difficultyLevel"
                                  value={formData.difficultyLevel}
                                  onChange={handleChange}
                                >
                                  <option value="">Select</option>
                                  <option value="easy">Easy</option>
                                  <option value="medium">Medium</option>
                                  <option value="hard">Hard</option>
                                </Form.Select>
                              </Col>
                              <Col md={3}>
                                <Form.Label>Answer Option</Form.Label>
                                <Form.Select
                                  name="correctAnswerOption"
                                  value={formData.correctAnswer}
                                  onChange={handleChange}
                                >
                                  <option value="">Select</option>
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="C">C</option>
                                  <option value="D">D</option>
                                </Form.Select>
                              </Col>
                            </Row>
                            
                            <Row className="mt-3">
                              <Col md={6}>
                                <Form.Label>Tags</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="tags"
                                  placeholder="Enter tags"
                                  value={formData.tags}
                                  onChange={handleChange}
                                />
                              </Col>
                              <Col md={6} className="d-flex align-items-end">
                                <Form.Check
                                  type="checkbox"
                                  id="enableInTestmaker"
                                  label="Enable in Testmaker"
                                  name="enableInTestmaker"
                                  checked={formData.enableInTestmaker}
                                  onChange={handleChange}
                                />
                              </Col>
                            </Row>
                            
                            <Row className="mt-3">
                              <Col md={12}>
                                <Form.Label>Hint for this question</Form.Label>
                                <div className="d-flex gap-4">
                                  <Form.Check
                                    type="radio"
                                    id="hintDisable"
                                    name="hintStatus"
                                    label="Disable"
                                    value="disable"
                                    checked={formData.hintStatus === 'disable'}
                                    onChange={handleChange}
                                  />
                                  <Form.Check
                                    type="radio"
                                    id="hintEnable"
                                    name="hintStatus"
                                    label="Enable"
                                    value="enable"
                                    checked={formData.hintStatus === 'enable'}
                                    onChange={handleChange}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <div className="d-flex gap-3">
                        <Form.Check
                          type="radio"
                          id="savePublish"
                          name="publishStatus"
                          label="Save & Publish"
                          value="publish"
                          checked={formData.publishStatus === 'publish'}
                          onChange={handleChange}
                        />
                        <Form.Check
                          type="radio"
                          id="saveDraft"
                          name="publishStatus"
                          label="Save as Draft"
                          value="draft"
                          checked={formData.publishStatus === 'draft'}
                          onChange={handleChange}
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <Link href="/questions" className="btn btn-secondary">
                      Cancel
                    </Link>
                    <Button variant="primary" type="submit">
                      <FiSave className="me-1" /> Save Question
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

export default AddQuestion;