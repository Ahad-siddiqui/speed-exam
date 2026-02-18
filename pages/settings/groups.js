import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Modal, Pagination } from 'react-bootstrap';
import { FiUsers, FiEdit2, FiTrash2, FiPlus, FiSearch, FiSave, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Checkbox from '../../components/bootstrap/Checkbox';

const SettingsGroups = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    groupName: '',
    groupDescription: ''
  });

  // Load groups from localStorage on component mount
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('settingsGroups') || '[]');
    setGroups(storedGroups);
  }, []);

  // Filter groups based on search term
  const filteredGroups = groups.filter(group => 
    group.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGroups.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);

  // Delete group
  const handleDelete = (id) => {
    const updatedGroups = groups.filter(group => group.id !== id);
    setGroups(updatedGroups);
    localStorage.setItem('settingsGroups', JSON.stringify(updatedGroups));
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allGroupIds = currentItems.map(group => group.id);
      setSelectedGroups(allGroupIds);
    } else {
      setSelectedGroups([]);
    }
  };

  // Handle individual checkbox
  const handleSelectGroup = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  // Check if all current items are selected
  const isAllSelected = currentItems.length > 0 && currentItems.every(group => selectedGroups.includes(group.id));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      groupName: '',
      groupDescription: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newGroup = {
      id: Date.now(),
      name: formData.groupName,
      description: formData.groupDescription,
      createdDate: new Date().toLocaleDateString()
    };
    
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem('settingsGroups', JSON.stringify(updatedGroups));
    
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
                  <FiPlus className="me-1" /> Add Group
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={12} lg={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <h4 className="mb-0">All Groups</h4>
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
                        placeholder="Search groups by name..."
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
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredGroups.length)} of {filteredGroups.length} groups
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
                        <th>Group Name</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((group) => (
                          <tr key={group.id}>
                            <td className="align-middle">
                              <Checkbox
                                checked={selectedGroups.includes(group.id)}
                                onChange={() => handleSelectGroup(group.id)}
                              />
                            </td>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-md avatar-indicators avatar-online me-2">
                                  <FiUsers size={20} />
                                </div>
                                <div>
                                  <div className="fw-semibold">{group.name}</div>
                                  {group.description && (
                                    <div className="text-muted small">{group.description}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              {group.createdDate || new Date().toLocaleDateString()}
                            </td>
                            <td className="align-middle">
                              <div className="d-flex gap-1">
                                <Button variant="light" size="sm" className="me-1" title="Edit">
                                  <FiEdit2 size={14} />
                                </Button>
                                <Button variant="light" size="sm" className="me-1" title="Delete" onClick={() => handleDelete(group.id)}>
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
                              <FiUsers size={48} className="mb-3" />
                              <h5>No groups added yet</h5>
                              <p>Click "Add Group" to create your first group</p>
                              <Button variant="primary" onClick={handleShowModal} className="mt-2">
                                <FiPlus className="me-1" /> Add Your First Group
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Group Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="groupName"
                    placeholder="Enter group name"
                    value={formData.groupName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="groupDescription"
                    placeholder="Enter group description"
                    value={formData.groupDescription}
                    onChange={handleInputChange}
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
              <FiSave className="me-1" /> Save Group
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SettingsGroups;