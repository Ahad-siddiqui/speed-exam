import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Pagination } from 'react-bootstrap';
import Checkbox from '../../components/bootstrap/Checkbox';
import { FiClock, FiUsers, FiBook, FiCalendar, FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ExaminationList = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);

  // Load exams from localStorage on component mount
  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem('exams') || '[]');
    setExams(storedExams);
  }, []);

  // Delete exam
  const handleDelete = (id) => {
    const updatedExams = exams.filter(exam => exam.id !== id);
    setExams(updatedExams);
    localStorage.setItem('exams', JSON.stringify(updatedExams));
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allExamIds = currentItems.map(exam => exam.id);
      setSelectedExams(allExamIds);
    } else {
      setSelectedExams([]);
    }
  };

  // Handle individual checkbox
  const handleSelectExam = (examId) => {
    if (selectedExams.includes(examId)) {
      setSelectedExams(selectedExams.filter(id => id !== examId));
    } else {
      setSelectedExams([...selectedExams, examId]);
    }
  };

  // Filter exams based on search term
  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (exam.course && exam.course.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (exam.status && exam.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExams.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);

  // Check if all current items are selected
  const isAllSelected = currentItems.length > 0 && currentItems.every(exam => selectedExams.includes(exam.id));

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
                <h3 className="mb-0 text-black">Examination List</h3>
              </div>
              <div>
                <Link href="/exam/add" className="btn btn-primary">Add Exam</Link>
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
                        placeholder="Search exams by name, course, or status..."
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
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredExams.length)} of {filteredExams.length} exams
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
                        <th>Exam Name</th>
                        <th>Duration</th>
                        <th>Questions</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((exam) => (
                          <tr key={exam.id}>
                            <td className="align-middle">
                              <Checkbox
                                checked={selectedExams.includes(exam.id)}
                                onChange={() => handleSelectExam(exam.id)}
                              />
                            </td>
                            <td className="align-middle">
                              <div className="fw-semibold">{exam.name}</div>
                            </td>
                            <td className="align-middle">{exam.duration}</td>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <FiBook className="me-1 text-muted" size={14} />
                                {exam.totalMarks || 0} Questions
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="d-flex gap-1">
                                <Button variant="light" size="sm" className="me-1" title="Edit">
                                  <FiEdit2 size={14} />
                                </Button>
                                <Button variant="light" size="sm" className="me-1" title="Delete" onClick={() => handleDelete(exam.id)}>
                                  <FiTrash2 size={14} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            <div className="text-muted">
                              <FiBook size={48} className="mb-3" />
                              <h5>No exams added yet</h5>
                              <p>Click "Add Exam" to create your first exam</p>
                              <Button variant="primary" onClick={() => router.push('/exam/add')} className="mt-2">
                                <FiPlus className="me-1" /> Add Your First Exam
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

export default ExaminationList;
