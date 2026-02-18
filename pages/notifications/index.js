import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Pagination } from 'react-bootstrap';
import { FiBell, FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Checkbox from '../../components/bootstrap/Checkbox';

const NotificationsList = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [notifications, setNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(storedNotifications);
  }, []);

  // Delete notification
  const handleDelete = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allNotificationIds = currentItems.map(notification => notification.id);
      setSelectedNotifications(allNotificationIds);
    } else {
      setSelectedNotifications([]);
    }
  };

  // Handle individual checkbox
  const handleSelectNotification = (notificationId) => {
    if (selectedNotifications.includes(notificationId)) {
      setSelectedNotifications(selectedNotifications.filter(id => id !== notificationId));
    } else {
      setSelectedNotifications([...selectedNotifications, notificationId]);
    }
  };

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter(notification => 
    notification.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  // Check if all current items are selected
  const isAllSelected = currentItems.length > 0 && currentItems.every(notification => selectedNotifications.includes(notification.id));

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
                <h3 className="mb-0 text-black">Notifications</h3>
              </div>
              <div>
                <Link href="/notifications/add" className="btn btn-primary">Add New Notification</Link>
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
                        placeholder="Search notifications by subject or content..."
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
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredNotifications.length)} of {filteredNotifications.length} notifications
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
                        <th>Subject</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((notification) => (
                          <tr key={notification.id}>
                            <td className="align-middle">
                              <Checkbox
                                checked={selectedNotifications.includes(notification.id)}
                                onChange={() => handleSelectNotification(notification.id)}
                              />
                            </td>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-md avatar-indicators avatar-online me-2">
                                  <FiBell size={20} />
                                </div>
                                <div className="fw-semibold">{notification.subject}</div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <div dangerouslySetInnerHTML={{__html: notification.content.substring(0, 50) + '...' }} />
                            </td>
                            <td className="align-middle">
                              <span className={`badge ${notification.active ? 'bg-success' : 'bg-secondary'}`}>
                                {notification.active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="align-middle">
                              {notification.createdDate || 'N/A'}
                            </td>
                            <td className="align-middle">
                              <div className="d-flex gap-1">
                                <Button variant="light" size="sm" className="me-1" title="Edit">
                                  <FiEdit2 size={14} />
                                </Button>
                                <Button variant="light" size="sm" className="me-1" title="Delete" onClick={() => handleDelete(notification.id)}>
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
                              <FiBell size={48} className="mb-3" />
                              <h5>No notifications added yet</h5>
                              <p>Click "Add New Notification" to create your first notification</p>
                              <Button variant="primary" onClick={() => router.push('/notifications/add')} className="mt-2">
                                <FiPlus className="me-1" /> Add Your First Notification
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

export default NotificationsList;