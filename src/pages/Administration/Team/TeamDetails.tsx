import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Modal,
  Nav,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import profilebgImg from "../../../assets/images/profile-bg.jpg";
import companyImg3 from "../../../assets/images/companies/img-3.png";
import Flatpickr from "react-flatpickr";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import SimpleBar from "simplebar-react";
import productsImg1 from "../../../assets/images/products/img-1.png";
import productsImg4 from "../../../assets/images/products/img-4.png";
import productsImg5 from "../../../assets/images/products/img-5.png";
import productsImg6 from "../../../assets/images/products/img-6.png";
import productsImg7 from "../../../assets/images/products/img-7.png";
import productsImg8 from "../../../assets/images/products/img-8.png";
import productsImg9 from "../../../assets/images/products/img-9.png";
import productsImg11 from "../../../assets/images/products/img-11.png";
import productsImg14 from "../../../assets/images/products/img-14.png";
import productsImg15 from "../../../assets/images/products/img-15.png";
import { Link } from "react-router-dom";
import country from "Common/country";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";

const bookmarkProduct = (e: any) => {
  const ele = e.target.closest("button");
  if (ele.classList.contains("active")) {
    ele.classList.remove("active");
  } else {
    ele.classList.add("active");
  }
};

const TeamDetails = () => {
  document.title = "Team Details | Bouden Coach Travel";
  const LocationTeam = useLocation();
  if (pdfjs.GlobalWorkerOptions) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }
  const [numPages, setNumPages] = useState<number | null>(null);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }
  const [activeVerticalTab, setactiveVerticalTab] = useState<number>(1);
  const [seletedCountry, setseletedCountry] = useState("");
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Col xl={12}>
            <Card>
              <div className="d-flex align-items-center p-2">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-1">
                    {LocationTeam.state.firstName} {LocationTeam.state.lastName}
                  </h5>
                </div>
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-info btn-label btn-sm"
                  >
                    <i className="ri-check-fill label-icon align-middle fs-18 me-2"></i>{" "}
                    Apply
                  </button>
                </div>
              </div>
              <hr className="my-2 text-muted" />
              <Card.Body>
                <Row>
                  <Tab.Container defaultActiveKey="custom-v-pills-home">
                    <Col lg={3}>
                      <Nav
                        variant="pills"
                        className="flex-column nav-pills-tab custom-verti-nav-pills text-center"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <Nav.Link eventKey="custom-v-pills-home">
                          <i className="ri-user-2-line d-block fs-20 mb-1"></i>{" "}
                          Profile
                        </Nav.Link>
                        <Nav.Link eventKey="custom-v-pills-profile">
                          <i className="ri-file-copy-2-line d-block fs-20 mb-1"></i>{" "}
                          Documents
                        </Nav.Link>
                        <Nav.Link eventKey="custom-v-pills-work">
                          <i className="ri-suitcase-line d-block fs-20 mb-1"></i>{" "}
                          Work
                        </Nav.Link>
                        <Nav.Link eventKey="custom-v-pills-messages">
                          <i className="ri-bank-line d-block fs-20 mb-1"></i>{" "}
                          Bank Details
                        </Nav.Link>
                      </Nav>
                    </Col>
                    <Col lg={9}>
                      <Tab.Content className="text-muted mt-3 mt-lg-0">
                        <Tab.Pane eventKey="custom-v-pills-home">
                          <div>
                            <h5>Profile</h5>
                          </div>
                          <div>
                            <Row className="g-3">
                              <Col sm={6}>
                                <label
                                  htmlFor="firstName"
                                  className="form-label"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  placeholder="Enter First Name"
                                  defaultValue={LocationTeam.state.firstName}
                                />
                              </Col>

                              <Col sm={6}>
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                  placeholder="Enter Last Name"
                                  defaultValue={LocationTeam.state.lastName}
                                />
                              </Col>

                              <div className="col-12">
                                <label
                                  htmlFor="username"
                                  className="form-label"
                                >
                                  Address
                                </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter Address"
                                    defaultValue={LocationTeam.state.address}
                                  />
                                </div>
                              </div>

                              <div className="col-12">
                                <label htmlFor="email" className="form-label">
                                  Email{" "}
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  placeholder="Enter Email"
                                  defaultValue={LocationTeam.state.email}
                                />
                              </div>
                              <div className="col-12">
                                <label
                                  htmlFor="dateBirth"
                                  className="form-label"
                                >
                                  Date of Birth
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="dateBirth"
                                  placeholder="Enter phone number"
                                  defaultValue={LocationTeam.state.birth_date}
                                />
                              </div>
                              <div className="col-12">
                                <label htmlFor="email" className="form-label">
                                  Mobile / Phone No.{" "}
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  placeholder="Enter phone number"
                                  defaultValue={LocationTeam.state.phone}
                                />
                              </div>
                              <div className="col-12">
                                <label htmlFor="email" className="form-label">
                                  Gender
                                </label>
                                <select
                                  className="form-select text-muted"
                                  name="choices-single-default"
                                  id="statusSelect"
                                  defaultValue={LocationTeam.state.gender}
                                >
                                  <option value="">Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                              <div className="col-12">
                                <label htmlFor="email" className="form-label">
                                  Civil Status
                                </label>
                                <select
                                  className="form-select text-muted"
                                  name="choices-single-default"
                                  id="statusSelect"
                                  defaultValue={
                                    LocationTeam.state.marital_status
                                  }
                                >
                                  <option value="">Status</option>
                                  <option value="Married">Married</option>
                                  <option value="Single">Single</option>
                                  <option value="Divorced">Divorced</option>
                                  <option value="Widowed">Widowed</option>
                                </select>
                              </div>
                              <div className="col-12">
                                <label htmlFor="email" className="form-label">
                                  Number of Child
                                </label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter number of childs"
                                  defaultValue={
                                    LocationTeam.state.number_of_childs
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <label htmlFor="email" className="form-label">
                                  Nationality
                                </label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter number of childs"
                                  defaultValue={LocationTeam.state.nationality}
                                />
                              </div>
                            </Row>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="custom-v-pills-profile">
                          <div>
                            <h5>Document</h5>
                          </div>

                          <div>
                            <Row className="g-3">
                              <div>
                                <label
                                  className="form-label"
                                  htmlFor="des-info-description-input"
                                >
                                  Legal Card Number
                                </label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter number of childs"
                                  defaultValue={LocationTeam.state.legal_card}
                                />
                              </div>
                              <div>
                                <label
                                  className="form-label"
                                  htmlFor="des-info-description-input"
                                >
                                  Legal Card Expiry
                                </label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter number of childs"
                                  defaultValue={LocationTeam.state.id_card_date}
                                />
                              </div>
                              <Row className="mt-2">
                                <div className="text-center hstack gap-5">
                                  <Button
                                    variant="soft-danger"
                                    className="btn-label"
                                    onClick={() => {
                                      tog_AddShippingModals();
                                    }}
                                  >
                                    <i className="bi bi-filetype-pdf label-icon align-middle fs-24 me-2"></i>
                                    Legal Card
                                  </Button>
                                </div>
                              </Row>
                            </Row>
                          </div>
                          <div className="d-flex align-items-start gap-3 mt-4">
                            <Button
                              type="button"
                              className="btn btn-light btn-label previestab"
                              onClick={() => setactiveVerticalTab(1)}
                            >
                              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                              Back to Profile
                            </Button>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="custom-v-pills-work">
                          <div>
                            <h5>Work</h5>
                          </div>
                          <div>
                            <Row className="gy-3">
                              <Col md={12}>
                                <label htmlFor="cc-name" className="form-label">
                                  Name on card
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cc-name"
                                  placeholder=""
                                  defaultValue={`${LocationTeam.state.firstName} ${LocationTeam.state.lastName}`}
                                />
                              </Col>

                              <Col md={6}>
                                <label
                                  htmlFor="cc-number"
                                  className="form-label"
                                >
                                  Joining Date
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cc-number"
                                  placeholder=""
                                  defaultValue={LocationTeam.state.service_date}
                                />
                              </Col>

                              <Col md={3}>
                                <label
                                  htmlFor="cc-expiration"
                                  className="form-label"
                                >
                                  Access Level
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cc-expiration"
                                  placeholder=""
                                  defaultValue={LocationTeam.state.access_level}
                                />
                              </Col>

                              <Col md={3}>
                                <label htmlFor="cc-cvv" className="form-label">
                                  Contract Type
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cc-cvv"
                                  placeholder=""
                                  defaultValue={
                                    LocationTeam.state.contract_type
                                  }
                                />
                              </Col>
                            </Row>
                            <Row className="gy-3">
                              <Col md={12}>
                                <label htmlFor="cc-name" className="form-label">
                                  Salary
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cc-name"
                                  placeholder=""
                                  defaultValue={LocationTeam.state.salary}
                                />
                              </Col>

                              {/* <Col md={6}>
                                <label
                                  htmlFor="cc-number"
                                  className="form-label"
                                >
                                  Day Shift
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cc-number"
                                  placeholder=""
                                  required
                                />
                              </Col>

                              <Col md={3}>
                                <label
                                  htmlFor="cc-expiration"
                                  className="form-label"
                                >
                                  Weekend Shift
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cc-expiration"
                                  placeholder=""
                                  required
                                />
                              </Col>

                              <Col md={3}>
                                <label htmlFor="cc-cvv" className="form-label">
                                  Holiday Shift
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cc-cvv"
                                  placeholder=""
                                  required
                                />
                              </Col> */}
                            </Row>
                          </div>

                          <div className="d-flex align-items-start gap-3 mt-4">
                            <Button
                              type="button"
                              className="btn btn-light btn-label previestab"
                              onClick={() => setactiveVerticalTab(2)}
                            >
                              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                              Back to Document
                            </Button>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="custom-v-pills-messages">
                          <div>
                            <h5>Bank Details</h5>
                          </div>
                          <div>
                            <Row className="gy-3">
                              <div className="mt-2">
                                <label
                                  className="form-label"
                                  htmlFor="des-info-description-input"
                                >
                                  Bank Name
                                </label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter bank name"
                                  defaultValue={LocationTeam.state.bank_name}
                                />
                              </div>
                              <div className="mt-2">
                                <label
                                  className="form-label"
                                  htmlFor="des-info-description-input"
                                >
                                  Account Name
                                </label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter account name"
                                  defaultValue={LocationTeam.state.account_name}
                                />
                              </div>
                              <div className="mt-2">
                                <label
                                  className="form-label"
                                  htmlFor="des-info-description-input"
                                >
                                  Account Number
                                </label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter account number"
                                  defaultValue={
                                    LocationTeam.state.account_number
                                  }
                                />
                              </div>
                              <div className="mt-2">
                                <label
                                  className="form-label"
                                  htmlFor="des-info-description-input"
                                >
                                  Sort Code
                                </label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter sort code"
                                  defaultValue={LocationTeam.state.sort_code}
                                />
                              </div>
                            </Row>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Tab.Container>
                </Row>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-center">
                <button
                  type="button"
                  className="d-flex justify-content-center btn btn-info btn-label"
                >
                  <i className="ri-check-fill label-icon align-middle fs-16 me-2"></i>{" "}
                  Apply
                </button>
              </Card.Footer>
            </Card>
          </Col>
          <Modal
            className="fade zoomIn"
            size="xl"
            show={modal_AddShippingModals}
            onHide={() => {
              tog_AddShippingModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Legal Card
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <div
                id="alert-error-msg"
                className="d-none alert alert-danger py-2"
              ></div>
              <div>
                <Document
                  file={`${process.env.REACT_APP_BASE_URL}/teamFiles/${LocationTeam.state.id_file}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={1} />
                </Document>
              </div>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TeamDetails;
