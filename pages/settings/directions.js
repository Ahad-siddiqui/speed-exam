import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Modal, Pagination } from 'react-bootstrap';
import { FiNavigation, FiEdit2, FiTrash2, FiPlus, FiSearch, FiSave, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Checkbox from '../../components/bootstrap/Checkbox';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const SettingsDirections = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [directions, setDirections] = useState([]);
  const [selectedDirections, setSelectedDirections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    directionName: '',
    directionText: ''
  });

  // Load directions from localStorage on component mount
  useEffect(() => {
    const storedDirections = JSON.parse(localStorage.getItem('settingsDirections') || '[]');
    setDirections(storedDirections);
  }, []);

  // Filter directions based on search term
  const filteredDirections = directions.filter(direction => 
    direction.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDirections.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDirections.length / itemsPerPage);

  // Delete direction
  const handleDelete = (id) => {
    const updatedDirections = directions.filter(direction => direction.id !== id);
    setDirections(updatedDirections);
    localStorage.setItem('settingsDirections', JSON.stringify(updatedDirections));
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allDirectionIds = currentItems.map(direction => direction.id);
      setSelectedDirections(allDirectionIds);
    } else {
      setSelectedDirections([]);
    }
  };

  // Handle individual checkbox
  const handleSelectDirection = (directionId) => {
    if (selectedDirections.includes(directionId)) {
      setSelectedDirections(selectedDirections.filter(id => id !== directionId));
    } else {
      setSelectedDirections([...selectedDirections, directionId]);
    }
  };

  // Check if all current items are selected
  const isAllSelected = currentItems.length > 0 && currentItems.every(direction => selectedDirections.includes(direction.id));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      directionName: '',
      directionText: ''
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTextChange = (value) => {
    setFormData({
      ...formData,
      directionText: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newDirection = {
      id: Date.now(),
      name: formData.directionName,
      text: formData.directionText,
      createdDate: new Date().toLocaleDateString()
    };
    
    const updatedDirections = [...directions, newDirection];
    setDirections(updatedDirections);
    localStorage.setItem('settingsDirections', JSON.stringify(updatedDirections));
    
    handleCloseModal();
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
                <Button variant="white" onClick={handleShowModal}>
                  <FiPlus className="me-1" /> Add Direction
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={12} lg={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <h4 className="mb-0">All Directions</h4>
              </Card.Header>
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
                        placeholder="Search directions by name..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6} className="text-md-end mt-3 mt-md-0">
                    <span className="text-muted">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDirections.length)} of {filteredDirections.length} directions
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
                        <th>Direction</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((direction) => (
                          <tr key={direction.id}>
                            <td className="align-middle">
                              <Checkbox
                                checked={selectedDirections.includes(direction.id)}
                                onChange={() => handleSelectDirection(direction.id)}
                              />
                            </td>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-md avatar-indicators avatar-online me-2">
                                  <FiNavigation size={20} />
                                </div>
                                <div>
                                  <div className="fw-semibold">{direction.name}</div>
                                  {direction.text && (
                                    <div 
                                      className="text-muted small" 
                                      dangerouslySetInnerHTML={{__html: direction.text.substring(0, 100) + '...'}}
                                    />
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              {direction.createdDate || new Date().toLocaleDateString()}
                            </td>
                            <td className="align-middle">
                              <div className="d-flex gap-1">
                                <Button variant="light" size="sm" className="me-1" title="Edit">
                                  <FiEdit2 size={14} />
                                </Button>
                                <Button variant="light" size="sm" className="me-1" title="Delete" onClick={() => handleDelete(direction.id)}>
                                  <FiTrash2 size={14} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4">
                            <div className="text-muted">
                              <FiNavigation size={48} className="mb-3" />
                              <h5>No directions added yet</h5>
                              <p>Click "Add Direction" to create your first direction</p>
                              <Button variant="primary" onClick={handleShowModal} className="mt-2">
                                <FiPlus className="me-1" /> Add Your First Direction
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

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Direction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Direction Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="directionName"
                    placeholder="Enter direction name"
                    value={formData.directionName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Direction Text <span className="text-danger">*</span></Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={formData.directionText}
                    onChange={handleTextChange}
                    style={{height: '200px'}}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              <FiX className="me-1" /> Cancel
            </Button>
            <Button variant="primary" type="submit">
              <FiSave className="me-1" /> Save Direction
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SettingsDirections;