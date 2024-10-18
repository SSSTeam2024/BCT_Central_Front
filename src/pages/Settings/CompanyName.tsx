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
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import img1 from "assets/images/brands/img-1.png";
import img2 from "assets/images/brands/img-2.png";
import img3 from "assets/images/brands/img-3.png";
import img4 from "assets/images/brands/img-4.png";
import img5 from "assets/images/brands/img-5.png";
import img6 from "assets/images/brands/img-6.png";
import img7 from "assets/images/brands/img-7.png";
import img8 from "assets/images/brands/img-8.png";
import img9 from "assets/images/brands/img-9.png";
import img10 from "assets/images/brands/img-10.png";
import img11 from "assets/images/brands/img-11.png";
import img12 from "assets/images/brands/img-12.png";
import img13 from "assets/images/brands/img-13.png";
import img14 from "assets/images/brands/img-14.png";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

const CompanyName = () => {
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
                            Company Trading name
                          </Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            defaultValue="Coach Hire Network"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Registered Company Name
                          </Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            defaultValue="Bouden Travel ltd"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Registered Company Number
                          </Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            defaultValue="08406680"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Registered Tax Number
                          </Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            defaultValue="156841980"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Driver App
                          </Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            defaultValue="App Code: 2683"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Billing Profile
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
                              Yes
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            >
                              No
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label htmlFor="customerName-field">
                            Prefix
                          </Form.Label>
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
                              Automatic copy Customer Details
                            </label>
                          </div>
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
export default CompanyName;
