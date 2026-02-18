// import node module libraries
import { Fragment } from "react";
import { Col, Row, Image } from "react-bootstrap";
import Link from "next/link";

// import blank layout, header and footer to override default layout
import NotFound from "layouts/NotFound";

const Error404 = () => {
  return (
    <Fragment>
      <Row className="min-vh-100 d-flex align-items-center">
        <Col sm={12}>
          <div className="text-center py-5">
            <div className="mb-3">
              <Image
                src="/images/error/404-error-img.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <h1 className="display-4 fw-bold">Oops! the page not found.</h1>
            <p className="mb-4">
              Or simply leverage the expertise of our consultation team.
            </p>
          </div>
        </Col>
      </Row>

    </Fragment>
  );
};

Error404.Layout = NotFound;

export default Error404;
