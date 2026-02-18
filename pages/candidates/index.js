import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Pagination } from 'react-bootstrap';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Checkbox from '../../components/bootstrap/Checkbox';

const CandidatesList = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  // Load candidates from localStorage on component mount
  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    setCandidates(storedCandidates);
  }, []);

  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(candidate => 
    candidate.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (candidate.mobile && candidate.mobile.includes(searchTerm))
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCandidates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  // Delete candidate
  const handleDelete = (id) => {
    const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allCandidateIds = currentItems.map(candidate => candidate.id);
      setSelectedCandidates(allCandidateIds);
    } else {
      setSelectedCandidates([]);
    }
  };

  // Handle individual checkbox
  const handleSelectCandidate = (candidateId) => {
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
    } else {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };



  // Check if all current items are selected
  const isAllSelected = currentItems.length > 0 && currentItems.every(candidate => selectedCandidates.includes(candidate.id));

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
                <h3 className="mb-0 text-black">Candidates</h3>
              </div>
              <div>
                <Link href="/candidates/add" className="btn btn-primary">Add Candidate</Link>
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
                        placeholder="Search candidates by name, email, or phone..."
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
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCandidates.length)} of {filteredCandidates.length} candidates
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
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Registered Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((candidate) => (
                          <tr key={candidate.id}>
                            <td className="align-middle">
                              <Checkbox
                                checked={selectedCandidates.includes(candidate.id)}
                                onChange={() => handleSelectCandidate(candidate.id)}
                              />
                            </td>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-md avatar-indicators avatar-online me-2">
                                  <FiUser size={20} />
                                </div>
                                <div className="fw-semibold">{candidate.fullName || `${candidate.firstName} ${candidate.lastName}`}</div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <FiMail className="me-1 text-muted" size={14} />
                              {candidate.email}
                            </td>
                            <td className="align-middle">
                              <FiPhone className="me-1 text-muted" size={14} />
                              {candidate.mobile || 'N/A'}
                            </td>
                            <td className="align-middle">
                              <FiCalendar className="me-1 text-muted" size={14} />
                              {candidate.registeredDate || new Date().toLocaleDateString()}
                            </td>
                            <td className="align-middle">
                              <div className="d-flex gap-1">
                                <Button variant="light" size="sm" className="me-1" title="Edit">
                                  <FiEdit2 size={14} />
                                </Button>
                                <Button variant="light" size="sm" className="me-1" title="Delete" onClick={() => handleDelete(candidate.id)}>
                                  <FiTrash2 size={14} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <div className="text-muted">
                              <FiUser size={48} className="mb-3" />
                              <h5>No candidates added yet</h5>
                              <p>Click "Add Candidate" to create your first candidate</p>
                              <Button variant="primary" onClick={() => router.push('/candidates/add')} className="mt-2">
                                <FiPlus className="me-1" /> Add Your First Candidate
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

export default CandidatesList;