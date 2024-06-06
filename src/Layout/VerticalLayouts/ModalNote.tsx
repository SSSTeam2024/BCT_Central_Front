import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ModalNote = () => {
  return (
    <React.Fragment>
      <Row>
        <div
          id="alert-error-msg"
          className="d-none alert alert-danger py-2"
        ></div>
        <Form className="tablelist-form">
          <input type="hidden" id="id-field" />
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <Form.Label htmlFor="customerName-field">Title</Form.Label>
                <Form.Control
                  type="text"
                  id="customerName-field"
                  placeholder="Enter note title"
                  required
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="mb-3">
                <Form.Label htmlFor="supplierName-field">Body</Form.Label>

                <div>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea5"
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end">
                <Button variant="primary" id="add-btn">
                  Add Note
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Row>
    </React.Fragment>
  );
};

export default ModalNote;
