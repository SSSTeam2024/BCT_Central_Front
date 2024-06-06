import React, { useState } from "react";
import {
  Container,
  Dropdown,
  Form,
  Row,
  Card,
  Col,
  Button,
  Image,
  ListGroup,
  Modal,
} from "react-bootstrap";


const PrincingInfo = () => {
  return (
    <React.Fragment>
      <Col lg={12}>
        <form
          id="createproduct-form"
          autoComplete="off"
          className="needs-validation"
          noValidate
        >
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <Form className="tablelist-form">
                  <input type="hidden" id="id-field" />

                  <Row>
                    <table>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Currency Symbol
                          </Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            // defaultValue="Bouden Coach Travel"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              Before
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              After
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Balance Due
                          </Form.Label>
                        </td>
                        <td>
                          <select
                            className="form-select text-muted"
                            name="choices-single-default"
                            id="statusSelect"
                            required
                          >
                            <option value="">Balance Due</option>
                            <option value="Male">0 days before travel</option>
                            <option value="Female">1 days before travel</option>
                            <option value="Other">2 days before travel</option>
                            <option value="Male">3 days before travel</option>
                            <option value="Female">4 days before travel</option>
                            <option value="Other">5 days before travel</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Default Deposit
                          </Form.Label>
                        </td>
                        <td>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              Cash
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              Before Percent(%)
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            // defaultValue="App Code: 2683"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Auto Pricing
                          </Form.Label>
                        </td>
                        <td>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="formCheck1"
                              checked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formCheck1"
                            >
                              Increse Pricing(%)
                            </label>
                          </div>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="formCheck1"
                            checked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formCheck1"
                          >
                            Show Journey Price
                          </label>
                        </div>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            required
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            required
                          />
                        </td>
                      </tr>
                    </table>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </form>
      </Col>
    </React.Fragment>
  );
};
export default PrincingInfo;
