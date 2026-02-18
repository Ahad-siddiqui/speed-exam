import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { FiCreditCard, FiFileText, FiPlus } from 'react-icons/fi';
import Link from 'next/link';

// import widget as custom components
import { PageHeading } from 'widgets';

// Simple No Records Found component
const Nrf = () => (
  <Card.Body className="text-center p-6">
    <div className="display-4 text-muted mb-4">
      <FiCreditCard size={48} className="text-muted mb-3" />
    </div>
    <h3 className="h5 mb-3">No Payment Records Found</h3>
    <p className="text-muted mb-4">
      You haven't made any payments yet. Your payment history will appear here once you do.
    </p>
    <Button variant="primary" className="me-2">
      Make a Payment
    </Button>
  </Card.Body>
);

const Billing = () => {
  // Set this to false to see the "No Records Found" message
  const hasPayments = false;

  // Rest of your component code remains the same...
  // ... [rest of your existing code]

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="flex-grow-1">
        <Container fluid className="p-6">
          {/* Page Heading */}
          <PageHeading 
            heading="My Payment" 
            actions={
              <Button variant="primary" size="sm">
                <FiPlus className="me-1" /> Add Payment Method
              </Button>
            }
          />

          {hasPayments ? (
            <Card className="mb-4">
              <Card.Header>
                <h4 className="mb-0">Payment History</h4>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <table className="table text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Invoice</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td>{payment.date}</td>
                          <td className="fw-semi-bold">{payment.amount}</td>
                          <td>
                            <span className={`badge bg-success bg-opacity-10 text-success`}>
                              {payment.status}
                            </span>
                          </td>
                          <td>
                            <Link href="#" className="text-primary">
                              {payment.invoice}
                            </Link>
                          </td>
                          <td>
                            <Button variant="light" size="sm" className="me-1">
                              <FiFileText size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Nrf />
            </Card>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Billing;