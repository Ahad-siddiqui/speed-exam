import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Modal, Form } from 'react-bootstrap';
import { FiPackage, FiEdit, FiPlus, FiDollarSign } from 'react-icons/fi';
import Link from 'next/link';

const SettingsExamPackages = () => {
  const [packages] = useState([
    {
      id: 1,
      name: 'Basic Package',
      price: 75,
      duration: '1 Month',
      features: ['5 Exams', 'Basic Analytics', 'Email Support'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Standard Package',
      price: 150,
      duration: '3 Months',
      features: ['15 Exams', 'Advanced Analytics', 'Priority Support', 'Certificate Generation'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Premium Package',
      price: 300,
      duration: '6 Months',
      features: ['Unlimited Exams', 'Full Analytics Suite', '24/7 Support', 'Custom Branding', 'API Access'],
      status: 'active'
    },
    {
      id: 4,
      name: 'Enterprise License',
      price: 500,
      duration: '1 Year',
      features: ['Everything in Premium', 'Multi-user Accounts', 'Dedicated Manager', 'Custom Integrations'],
      status: 'inactive'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [packageForm, setPackageForm] = useState({
    name: '',
    price: '',
    duration: '',
    features: ''
  });

  const handleAddPackage = () => {
    setEditingPackage(null);
    setPackageForm({ name: '', price: '', duration: '', features: '' });
    setShowModal(true);
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setPackageForm({
      name: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      features: pkg.features.join(', ')
    });
    setShowModal(true);
  };

  const handleSavePackage = () => {
    alert(`${editingPackage ? 'Updated' : 'Added'} package: ${packageForm.name}`);
    setShowModal(false);
  };

  const getStatusVariant = (status) => {
    return status === 'active' ? 'success' : 'secondary';
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Exam Packages</h3>
              </div>
              <div>
                <Link href="/settings" className="btn btn-white me-2">Back to Settings</Link>
                <Button variant="primary" onClick={handleAddPackage}>
                  <FiPlus className="me-1" /> Add Package
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col xl={12} lg={12} md={12} xs={12} className="mx-auto">
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-white py-4">
                <h4 className="mb-0">Package Management</h4>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="text-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Package Name</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Features</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map(pkg => (
                        <tr key={pkg.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-md avatar-indicators avatar-primary me-2">
                                <FiPackage size={20} />
                              </div>
                              <strong>{pkg.name}</strong>
                            </div>
                          </td>
                          <td>
                            <span className="fw-bold text-success">
                              <FiDollarSign className="me-1" size={14} />
                              ${pkg.price}
                            </span>
                          </td>
                          <td>{pkg.duration}</td>
                          <td>
                            <div className="d-flex flex-wrap gap-1">
                              {pkg.features.slice(0, 2).map((feature, idx) => (
                                <span key={idx} className="badge bg-light text-dark">
                                  {feature}
                                </span>
                              ))}
                              {pkg.features.length > 2 && (
                                <span className="badge bg-primary">
                                  +{pkg.features.length - 2} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className={`badge bg-${getStatusVariant(pkg.status)}`}>
                              {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleEditPackage(pkg)}
                            >
                              <FiEdit className="me-1" /> Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Package Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingPackage ? 'Edit Package' : 'Add New Package'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Package Name *</Form.Label>
              <Form.Control
                type="text"
                value={packageForm.name}
                onChange={(e) => setPackageForm({...packageForm, name: e.target.value})}
                placeholder="Enter package name"
              />
            </Form.Group>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Price ($) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={packageForm.price}
                    onChange={(e) => setPackageForm({...packageForm, price: e.target.value})}
                    placeholder="Enter price"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Duration *</Form.Label>
                  <Form.Control
                    type="text"
                    value={packageForm.duration}
                    onChange={(e) => setPackageForm({...packageForm, duration: e.target.value})}
                    placeholder="e.g., 3 Months"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Features (comma separated) *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={packageForm.features}
                onChange={(e) => setPackageForm({...packageForm, features: e.target.value})}
                placeholder="Enter features separated by commas"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavePackage}>
            {editingPackage ? 'Update Package' : 'Add Package'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SettingsExamPackages;