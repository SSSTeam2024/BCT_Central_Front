import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Form,
  Modal,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";

import productImg1 from "../../../../assets/images/products/img-1.png";
import productImg2 from "../../../../assets/images/products/img-2.png";
import productImg3 from "../../../../assets/images/products/img-3.png";
import productImg5 from "../../../../assets/images/products/img-5.png";

const OfferDetails = () => {
  document.title = "Offer Details | Bouden Coach Travel";

  const [modal_AddOffreModals, setmodal_AddOffreModals] =
    useState<boolean>(false);
  function tog_AddOffer() {
    setmodal_AddOffreModals(!modal_AddOffreModals);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Offer Details" pageTitle="Management" />

          <Row className="mb-4 align-items-center">
            <Col>
              <h6 className="fs-18 mb-0">Offer Name: #22830</h6>
            </Col>
          </Row>

          <Row>
            <Col xxl={3} lg={6}>
              <div className="card bg-success bg-opacity-10 border-0">
                <div className="card-body">
                  <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                      <h6 className="fs-18 mb-3">Corporate</h6>
                      <p className="mb-0 fw-medium">Daniel Gonzalez</p>
                      <p className="mb-1">gabrielle@toner.com</p>
                      <p className="mb-0">013-789-9876</p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <div className="avatar-title bg-success-subtle text-success rounded fs-3">
                        <i className="ph-user-circle"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xxl={3} lg={6}>
              <div className="card bg-primary bg-opacity-10 border-0">
                <div className="card-body">
                  <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                      <h6 className="fs-18 mb-3">Pickup</h6>
                      <p className="mb-0">Block A, House 123, Floor 2</p>
                      <p className="mb-1">Tashkent, Uzbekistan</p>
                      <p className="mb-0">013-789-9876</p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <div className="avatar-title bg-primary-subtle text-primary rounded fs-3">
                        <i className="ph-map-pin"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xxl={3} lg={6}>
              <div className="card bg-info bg-opacity-10 border-0">
                <div className="card-body">
                  <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                      <h6 className="fs-18 mb-3">Destination</h6>
                      <p className="mb-0">Block A, House 123, Floor 2</p>
                      <p className="mb-1">Tashkent, Uzbekistan</p>
                      <p className="mb-0">013-789-9876</p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <div className="avatar-title bg-info-subtle text-info rounded fs-3">
                        <i className="ph-file-text"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xxl={3} lg={6}>
              <div className="d-flex justify-content-end">
                <Button
                  // variant="success"
                  onClick={() => tog_AddOffer()}
                  className="add-btn btn-sm bg-dark bg-opacity-10 border-0 text-dark"
                >
                  <i className="mdi mdi-bullhorn me-1 align-middle fs-22"></i>{" "}
                  Add New Offer
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xxl={12}>
              <Card>
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table align-middle table-nowrap mb-0">
                      <thead className="text-muted table-light">
                        <tr>
                          <th scope="col">Contract</th>
                          <th scope="col">Vehicle</th>
                          <th scope="col">Driver</th>
                          <th scope="col">Cost</th>
                          <th scope="col">Offer Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            #00541
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                <img
                                  src={productImg1}
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1">
                                Rockerz Ear Bluetooth Headphones
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="text-secondary">$658.00</span>
                          </td>

                          <td>01 PCS</td>
                          <td className="text-end">$658.00</td>
                        </tr>
                        <tr>
                          <td>

                            #07484

                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                <img
                                  src={productImg5}
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1">
                                United Colors Of Benetton
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="text-secondary">$145.00</span>
                          </td>

                          <td>02 PCS</td>
                          <td className="text-end">$290.00</td>
                        </tr>

                        <tr>
                          <td>

                            #00065

                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                <img
                                  src={productImg3}
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1">
                                350 ml Glass Grocery Container
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="text-secondary">$79.99</span>
                          </td>

                          <td>3 PCS</td>
                          <td className="text-end">$239.97</td>
                        </tr>

                        <tr>
                          <td>

                            #00156

                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                <img
                                  src={productImg2}
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1">One Seater Sofa</div>
                            </div>
                          </td>

                          <td>
                            <span className="text-secondary">$264.99</span>
                          </td>

                          <td>02 PCS</td>
                          <td className="text-end">$528.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
              <Modal
                className="fade zoomIn"
                size="lg"
                show={modal_AddOffreModals}
                onHide={() => {
                  tog_AddOffer();
                }}
                centered
              >
                <Modal.Header className="px-4 pt-4" closeButton>
                  <h5 className="modal-title fs-18" id="exampleModalLabel">
                    Add Offre
                  </h5>
                </Modal.Header>
                <Modal.Body className="p-4">
                  <div
                    id="alert-error-msg"
                    className="d-none alert alert-danger py-2"
                  ></div>
                  <Form className="tablelist-form">
                    <input type="hidden" id="id-field" />
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="customerName-field">
                            Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            // placeholder="Enter customer name"
                            required
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Corporate
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            // placeholder="Enter supplier name"
                            required
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="orderDate-field">
                            Contact
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            // placeholder="Enter supplier name"
                            required
                          />
                          {/* <Form.Control type="text" id="orderDate-field" data-provider="flatpickr" data-date-format="d M, Y" placeholder="Select date" required /> */}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="arrivalDate-field">
                            Vehicle
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            // placeholder="Enter supplier name"
                            required
                          />
                          {/* <Form.Control type="text" id="arrivalDate-field" data-provider="flatpickr" data-date-format="d M, Y" placeholder="Select date" required /> */}
                        </div>
                      </Col>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="locationSelect"
                            className="form-label"
                          >
                            Driver
                          </label>
                          <select
                            className="form-select"
                            name="choices-single-default"
                            id="locationSelect"
                            required
                          >
                            <option value="">Select</option>
                            <option value="Ascension Island">
                              Ascension Island
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Antigua and Barbuda">
                              Antigua and Barbuda
                            </option>
                            <option value="Armenia">Armenia</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Australia">Australia</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Canada">Canada</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Germany">Germany</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Egypt">Egypt</option>
                            <option value="Estonia">Estonia</option>
                          </select>
                        </div>
                      </div>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="statusSelect" className="form-label">
                            Pickup
                          </label>
                          <select
                            className="form-select"
                            name="choices-single-default"
                            id="statusSelect"
                            required
                          >
                            <option value="">Select</option>
                            <option value="Pickups">Pickups</option>
                            <option value="Pending">Pending</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Out Of Delivery">
                              Out Of Delivery
                            </option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="statusSelect" className="form-label">
                            Destination
                          </label>
                          <select
                            className="form-select"
                            name="choices-single-default"
                            id="statusSelect"
                            required
                          >
                            <option value="">Select</option>
                            <option value="Pickups">Pickups</option>
                            <option value="Pending">Pending</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Out Of Delivery">
                              Out Of Delivery
                            </option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="statusSelect" className="form-label">
                            Cost
                          </label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            // placeholder="Enter supplier name"
                            required
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="statusSelect" className="form-label">
                            Offer Number
                          </label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            // placeholder="Enter supplier name"
                            required
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                          <Button
                            className="btn-ghost-danger"
                            onClick={() => {
                              tog_AddOffer();
                            }}
                            data-bs-dismiss="modal"
                          >
                            <i className="ri-close-line align-bottom me-1"></i>{" "}
                            Close
                          </Button>
                          <Button variant="primary" id="add-btn">
                            Add Offer
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OfferDetails;
