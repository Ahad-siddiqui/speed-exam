import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Pagination } from 'react-bootstrap';
import { FiFileText, FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Checkbox from '../../components/bootstrap/Checkbox';

const QuestionsList = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Load questions from localStorage on component mount
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    setQuestions(storedQuestions);
  }, []);

  // Delete question
  const handleDelete = (id) => {
    const updatedQuestions = questions.filter(question => question.id !== id);
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allQuestionIds = currentItems.map(question => question.id);
      setSelectedQuestions(allQuestionIds);
    } else {
      setSelectedQuestions([]);
    }
  };

  // Handle individual checkbox
  const handleSelectQuestion = (questionId) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    } else {
      setSelectedQuestions([...selectedQuestions, questionId]);
    }
  };

  // Filter questions based on search term
  const filteredQuestions = questions.filter(question => 
    question.questionText?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQuestions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  // Check if all current items are selected
  const isAllSelected = currentItems.length > 0 && currentItems.every(question => selectedQuestions.includes(question.id));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <Container fluid className="mt-n22 px-6 pt-20 pb-10">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center p-3">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-black">Questions</h3>
              </div>
              <div>
                <Link href="/questions/add" className="btn btn-primary">Add Question</Link>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={12} lg={12}>
            <Card>
              <Card.Body className="p-4">
                {/* Search Bar */}
                <Row className="mb-4">
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FiSearch />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Search questions by text or category..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1); // Reset to first page when searching
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6} className="text-md-end mt-3 mt-md-0">
                    <span className="text-muted">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredQuestions.length)} of {filteredQuestions.length} questions
                    </span>
                  </Col>
                </Row>

                {/* Table */}
                <div className="table-responsive">
                  <Table hover className="text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th style={{width: '50px'}}>
                          <Checkbox
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>Section</th>
                        <th>Question Text</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((question) => (
                          <tr key={question.id}>
                            <td className="align-middle">
                              <Checkbox
                                checked={selectedQuestions.includes(question.id)}
                                onChange={() => handleSelectQuestion(question.id)}
                              />
                            </td>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-md avatar-indicators avatar-online me-2">
                                  <FiFileText size={20} />
                                </div>
                                <div className="fw-semibold">{question.questionText}</div>
                              </div>
                            </td>
                            <td className="align-middle">
                              {question.category || 'N/A'}
                            </td>
                            <td className="align-middle">
                              {question.type || 'N/A'}
                            </td>
                            <td className="align-middle">
                              <span className={`badge ${question.difficulty === 'Easy' ? 'bg-success' : question.difficulty === 'Medium' ? 'bg-warning' : 'bg-danger'}`}>
                                {question.difficulty || 'N/A'}
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="d-flex gap-1">
                                <Button variant="light" size="sm" className="me-1" title="Edit">
                                  <FiEdit2 size={14} />
                                </Button>
                                <Button variant="light" size="sm" className="me-1" title="Delete" onClick={() => handleDelete(question.id)}>
                                  <FiTrash2 size={14} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            <div className="text-muted">
                              <FiFileText size={48} className="mb-3" />
                              <h5>No questions added yet</h5>
                              <p>Click "Add Question" to create your first question</p>
                              <Button variant="primary" onClick={() => router.push('/questions/add')} className="mt-2">
                                <FiPlus className="me-1" /> Add Your First Question
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                      <Pagination.Prev 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default QuestionsList;