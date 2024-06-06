import React from "react";
import { Container, Form, Row, Card, Col } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";

const RequestFeature = () => {
  document.title = "Request New Feature | Bouden Coach Travel";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Request Feature" pageTitle="Help" />
          <Card>
            <Row>
              <Col lg={6}>
                <Card.Header className="border-0">
                  <h3>New Request</h3>
                </Card.Header>
                <Card.Body>
                  <Row className="d-flex justify-content-center">
                    {/* Company  == Done */}
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="customerName-field">
                            Company
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            // placeholder="Enter contract"
                            required
                          />
                        </div>
                      </Col>
                    </Row>

                    {/* Email == Done */}
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Email
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            // placeholder="Enter account name"
                            required
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {/* Subject  == Done */}
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Subject
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="choices-single-default"
                            id="statusSelect"
                            required
                          >
                            <option value="">Bouden Coach Travel</option>
                            <option value="Entreprise">Billing</option>
                            <option value="Schools">Digital Marketing</option>
                            <option value="Entreprise">Other</option>
                            <option value="Schools">Sales</option>
                            <option value="Schools">Emails and Hosting</option>
                            <option value="Schools">
                              Website and mobile app
                            </option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    {/* Title  == Done */}
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Title
                          </Form.Label>
                          <Form.Control
                            type="terxt"
                            id="supplierName-field"
                            // placeholder="Enter email"
                            required
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Details
                          </Form.Label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea5"
                            // placeholder="for everyone : customer can see it"
                            rows={3}
                          ></textarea>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Screenshot
                          </Form.Label>
                          <Form.Control
                            type="terxt"
                            id="supplierName-field"
                            placeholder="Click here and press Ctrl+V to paste a screenshot"
                            required
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Upload Images
                          </Form.Label>
                          <div>
                            <input
                              className="form-control mb-2"
                              type="file"
                              id="formFile"
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <div
                        className="position-relative"
                        style={{ height: "40px" }}
                      >
                        <div className="position-absolute bottom-0 start-50 translate-middle-x">
                          <button
                            type="button"
                            className="btn rounded-pill btn-info"
                          >
                            <span className="mdi mdi-send-outline"></span> Send
                          </button>
                        </div>
                      </div>
                    </Row>
                  </Row>
                </Card.Body>
              </Col>
              <Col lg={6}>
                <Card.Header>
                  <h3>Check an existing request</h3>
                  <Row className="d-flex justify-content-center">
                    {/* Email  == Done */}
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="customerName-field">
                            Email
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            // placeholder="Enter contract"
                            required
                          />
                        </div>
                      </Col>
                    </Row>

                    {/* Reference == Done */}
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Reference
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            // placeholder="Enter account name"
                            required
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <div
                        className="position-relative"
                        style={{ height: "40px" }}
                      >
                        <div className="position-absolute bottom-0 start-50 translate-middle-x">
                          <button
                            type="button"
                            className="btn rounded-pill btn-info"
                          >
                            <span className="mdi mdi-send-outline"></span> Send
                          </button>
                        </div>
                      </div>
                    </Row>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <h3>Emergency Support</h3>
                  <p>
                    For all normal requests please submit the details in the box
                    on the left. In an emergency please phone using the numbers
                    below:
                  </p>
                  <p>UK: +44(0)203 409 0646</p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default RequestFeature;
