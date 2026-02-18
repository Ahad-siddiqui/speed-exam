import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Modal, Nav, Tab, Pagination } from 'react-bootstrap';
import { FiSettings, FiEdit2, FiTrash2, FiPlus, FiSearch, FiSave, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Checkbox from '../../components/bootstrap/Checkbox';

const SettingsSections = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sections, setSections] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState('add-section');
  const [formData, setFormData] = useState({
    sectionName: '',
    sectionDescription: '',
    selectSection: '',
    subSectionName: '',
    subSectionDescription: ''
  });

  // Load sections from localStorage on component mount
  useEffect(() => {
    const storedSections = JSON.parse(localStorage.getItem('settingsSections') || '[]');
    setSections(storedSections);
  }, []);

  // Filter sections based on search term
  const filteredSections = sections.filter(section => 
    section.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.path?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSections.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);

  // Delete section
  const handleDelete = (id) => {
    const updatedSections = sections.filter(section => section.id !== id);
    setSections(updatedSections);
    localStorage.setItem('settingsSections', JSON.stringify(updatedSections));
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allSectionIds = currentItems.map(section => section.id);
      setSelectedSections(allSectionIds);
    } else {
      setSelectedSections([]);
    }
  };

  // Handle individual checkbox
  const handleSelectSection = (sectionId) => {
    if (selectedSections.includes(sectionId)) {
      setSelectedSections(selectedSections.filter(id => id !== sectionId));
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  // Check if all current items are selected
  const isAllSelected = currentItems.length > 0 && currentItems.every(section => selectedSections.includes(section.id));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      sectionName: '',
      sectionDescription: '',
      selectSection: '',
      subSectionName: '',
      subSectionDescription: ''
    });
    setModalTab('add-section');
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
    
    if (modalTab === 'add-section') {
      // Add new section
      const newSection = {
        id: Date.now(),
        name: formData.sectionName,
        path: `/${formData.sectionName.toLowerCase().replace(/\s+/g, '-')}`,
        description: formData.sectionDescription,
        type: 'section',
        createdDate: new Date().toLocaleDateString()
      };
      
      const updatedSections = [...sections, newSection];
      setSections(updatedSections);
      localStorage.setItem('settingsSections', JSON.stringify(updatedSections));
    } else {
      // Add new sub-section
      const newSubSection = {
        id: Date.now(),
        name: formData.subSectionName,
        path: `/${formData.selectSection.toLowerCase().replace(/\s+/g, '-')}/${formData.subSectionName.toLowerCase().replace(/\s+/g, '-')}`,
        description: formData.subSectionDescription,
        type: 'subsection',
        parentSection: formData.selectSection,
        createdDate: new Date().toLocaleDateString()
      };
      
      const updatedSections = [...sections, newSubSection];
      setSections(updatedSections);
      localStorage.setItem('settingsSections', JSON.stringify(updatedSections));
    }
    
    handleCloseModal();
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Settings Sections</h3>
              </div>
              <div>
                <Button variant="white" onClick={handleShowModal}>
                  <FiPlus className="me-1" /> Add Section
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={12} lg={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <h4 className="mb-0">All Sections</h4>
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
                        placeholder="Search sections by name or path..."
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
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSections.length)} of {filteredSections.length} sections
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
                        <th>Section Name</th>
                        <th>Section Path</th>
                        <th>Type</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((section) => (
                          <tr key={section.id}>
                            <td className="align-middle">
                              <Checkbox
                                checked={selectedSections.includes(section.id)}
                                onChange={() => handleSelectSection(section.id)}
                              />
                            </td>
                            <td className="align-middle">
                              <div className="fw-semibold">{section.name}</div>
                              {section.description && (
                                <div className="text-muted small">{section.description}</div>
                              )}
                            </td>
                            <td className="align-middle">
                              <code>{section.path}</code>
                            </td>
                            <td className="align-middle">
                              <span className={`badge ${section.type === 'section' ? 'bg-primary' : 'bg-info'}`}>
                                {section.type === 'section' ? 'Section' : 'Sub-section'}
                              </span>
                            </td>
                            <td className="align-middle">
                              {section.createdDate || new Date().toLocaleDateString()}
                            </td>
                            <td className="align-middle">
                              <div className="d-flex gap-1">
                                <Button variant="light" size="sm" className="me-1" title="Edit">
                                  <FiEdit2 size={14} />
                                </Button>
                                <Button variant="light" size="sm" className="me-1" title="Delete" onClick={() => handleDelete(section.id)}>
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
                              <FiSettings size={48} className="mb-3" />
                              <h5>No sections added yet</h5>
                              <p>Click "Add Section" to create your first section</p>
                              <Button variant="primary" onClick={handleShowModal} className="mt-2">
                                <FiPlus className="me-1" /> Add Your First Section
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
            <Modal.Title>Add New Section</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Container defaultActiveKey="add-section" activeKey={modalTab} onSelect={(k) => setModalTab(k)}>
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link eventKey="add-section">Add Section</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="add-subsection">Add Sub Section</Nav.Link>
                </Nav.Item>
              </Nav>
              
              <Tab.Content>
                <Tab.Pane eventKey="add-section">
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Section Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="sectionName"
                          placeholder="Enter section name"
                          value={formData.sectionName}
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
                          name="sectionDescription"
                          placeholder="Enter section description"
                          value={formData.sectionDescription}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Tab.Pane>
                
                <Tab.Pane eventKey="add-subsection">
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Select Section <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          name="selectSection"
                          value={formData.selectSection}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Choose a section</option>
                          {sections
                            .filter(section => section.type === 'section')
                            .map(section => (
                              <option key={section.id} value={section.name}>
                                {section.name}
                              </option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Sub Section Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="subSectionName"
                          placeholder="Enter sub section name"
                          value={formData.subSectionName}
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
                          name="subSectionDescription"
                          placeholder="Enter sub section description"
                          value={formData.subSectionDescription}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              <FiX className="me-1" /> Cancel
            </Button>
            <Button variant="primary" type="submit">
              <FiSave className="me-1" /> Save Section
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SettingsSections;