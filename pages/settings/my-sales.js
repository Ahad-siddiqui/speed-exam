import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { FiDollarSign, FiBarChart2, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

const SettingsMySales = () => {
  const [salesSummary] = useState({
    totalSales: 12500,
    thisMonth: 3200,
    thisYear: 8900,
    averageSale: 250
  });

  const [sales] = useState([
    {
      id: 1,
      date: '2024-01-15',
      package: 'Premium Exam Package',
      amount: 150,
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-14',
      package: 'Basic Subscription',
      amount: 75,
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-01-14',
      package: 'Enterprise License',
      amount: 500,
      status: 'completed'
    },
    {
      id: 4,
      date: '2024-01-13',
      package: 'Standard Package',
      amount: 100,
      status: 'refunded'
    },
    {
      id: 5,
      date: '2024-01-12',
      package: 'Premium Exam Package',
      amount: 150,
      status: 'completed'
    }
  ]);

  const getStatusVariant = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'refunded': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Fragment>
      <div className="bg-gray-700 pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">My Sales</h3>
              </div>
              <div>
                <Link href="/settings" className="btn btn-white">Back to Settings</Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Sales Summary Cards */}
        <Row className="mt-6">
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center p-4">
                <div className="avatar avatar-lg avatar-indicators avatar-primary mb-3">
                  <FiDollarSign size={24} />
                </div>
                <h2 className="mb-1">${salesSummary.totalSales}</h2>
                <p className="text-muted mb-0">Total Sales</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center p-4">
                <div className="avatar avatar-lg avatar-indicators avatar-success mb-3">
                  <FiBarChart2 size={24} />
                </div>
                <h2 className="mb-1">${salesSummary.thisMonth}</h2>
                <p className="text-muted mb-0">This Month</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center p-4">
                <div className="avatar avatar-lg avatar-indicators avatar-info mb-3">
                  <FiCalendar size={24} />
                </div>
                <h2 className="mb-1">${salesSummary.thisYear}</h2>
                <p className="text-muted mb-0">This Year</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center p-4">
                <div className="avatar avatar-lg avatar-indicators avatar-warning mb-3">
                  <FiDollarSign size={24} />
                </div>
                <h2 className="mb-1">${salesSummary.averageSale}</h2>
                <p className="text-muted mb-0">Avg. Sale</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Sales Table */}
        <Row>
          <Col xl={12} lg={12} md={12} xs={12} className="mx-auto">
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-white py-4">
                <h4 className="mb-0">Sales Transactions</h4>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="text-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Package</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.map(sale => (
                        <tr key={sale.id}>
                          <td>
                            <FiCalendar className="me-1 text-muted" />
                            {sale.date}
                          </td>
                          <td>
                            <strong>{sale.package}</strong>
                          </td>
                          <td>
                            <span className="fw-bold text-success">${sale.amount}</span>
                          </td>
                          <td>
                            <span className={`badge bg-${getStatusVariant(sale.status)}`}>
                              {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                            </span>
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
    </Fragment>
  );
};

export default SettingsMySales;