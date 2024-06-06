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

const SupplierRoutingRule = () => {
  const [modal_QuoteInfo, setmodal_QuoteInfo] = useState<boolean>(false);
  function tog_QuoteInfo() {
    setmodal_QuoteInfo(!modal_QuoteInfo);
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.Name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Location</span>,
      selector: (row: any) => row.Location,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Minimum Price</span>,
      selector: (row: any) => row.MinPrice,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Maximum Price</span>,
      selector: (row: any) => row.MAxPrice,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Booking</span>,
      selector: (row: any) => row.Booking,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Confirmation</span>,
      selector: (row: any) => row.Confirmation,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Priority</span>,
      selector: (row: any) => row.Priority,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      cell: () => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link to="#" className="badge badge-soft-primary edit-item-btn">
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn">
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];
  const data = [
    {
      carType: "10-16 Seat Standard Minibus",
      Limit: "8 hours",
      Price: "£ 5.00",
    },
    {
      carType: "10-16 Seat Standard Minibus",
      Limit: "15 hours",
      Price: "£ 10.00",
    },
    {
      carType: "10-16 Seat Executive Minibus",
      Limit: "8 hours",
      Price: "£ 5.00",
    },
    {
      carType: "10-16 Seat Executive Minibus",
      Limit: "15 hours",
      Price: "£ 10.00",
    },
    {
      carType: "17-24 Seat Standard Midi Coach",
      Limit: "8 hours",
      Price: "£ 6.00",
    },
    {
      carType: "17-24 Seat Standard Midi Coach",
      Limit: "15 hours",
      Price: "£ 12.00",
    },
    {
      carType: "17-24 Seat Executive Midi Coach",
      Limit: "8 hours",
      Price: "£ 6.00",
    },
    {
      carType: "17-24 Seat Executive Midi Coach",
      Limit: "15 hours",
      Price: "£ 12.00",
    },
    {
      carType: "17-24 Seat Luxury Midi Coach",
      Limit: "6 hours",
      Price: "£ 12.00",
    },
    {
      carType: "29 Seat Standard Midi Coach",
      Limit: "8 hours",
      Price: "£ 7.00",
    },
  ];

  const [modal_AddSupplier, setmodal_AddSupplier] = useState<boolean>(false);
  function tog_AddSupplier() {
    setmodal_AddSupplier(!modal_AddSupplier);
  }

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card id="shipmentsList">
          <Card.Header className="border-bottom-dashed">
            <Row className="g-3">
              <Col xxl={3} lg={6}>
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Search for something..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </Col>
              <Col lg={7}></Col>
              <Col>
                <div
                  className="btn-group btn-group-sm mt-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => tog_AddSupplier()}
                  >
                    <i className="mdi mdi-routes align-middle"></i>{" "}
                    <span>Add New Supplier Routing Rule</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable columns={columns} data={data} pagination />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="lg"
        show={modal_AddSupplier}
        onHide={() => {
          tog_AddSupplier();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Add New Supplier Routing Rule
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
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field">
                    Routing Rule Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="customerName-field"
                    // placeholder="Enter Limit"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">Priority</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="choices-single-default"
                    id="statusSelect"
                    required
                  >
                    <option value="Brit Coaches Ltd" selected>
                      1
                    </option>
                    <option value="Dorset Mini Coach">2</option>
                    <option value="Brit Coaches Ltd">3</option>
                    <option value="Dorset Mini Coach">4</option>
                    <option value="Dorset Mini Coach">5</option>
                    <option value="Dorset Mini Coach">6</option>
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field">
                    Minimum Price
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="customerName-field"
                    // placeholder="£ 0.00"
                    required
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field">
                    Maximum Price
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="customerName-field"
                    // placeholder="£ 0.00"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">Location</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="choices-single-default"
                    id="statusSelect"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Brit Coaches Ltd">Aberdeen Airport</option>
                    <option value="Dorset Mini Coach">
                      London City Airport
                    </option>
                    <option value="Brit Coaches Ltd">Lutton</option>
                    <option value="Dorset Mini Coach">
                      Manchester Airport
                    </option>
                    <option value="Dorset Mini Coach">Stansted Airport</option>
                  </select>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field">
                    Location Raduis(Miles)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="customerName-field"
                    // placeholder="£ 0.00"
                    required
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">
                    Vehicle Type
                  </Form.Label>
                  <select
                    className="form-select text-muted"
                    name="choices-single-default"
                    id="statusSelect"
                    required
                  >
                    <option value="">Type</option>
                    <option value="Brit Coaches Ltd">
                      Standard Saloon Car
                    </option>
                    <option value="Dorset Mini Coach">
                      Executive Saloon Car
                    </option>
                    <option value="Brit Coaches Ltd">VIP Saloon Car</option>
                    <option value="Dorset Mini Coach">
                      Standard 6 Seat MPV
                    </option>
                    <option value="Dorset Mini Coach">
                      Executive 6 Seat MPV
                    </option>
                    <option value="Dorset Mini Coach">
                      10-16 Seat Standard Minibus
                    </option>
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">
                    Journey Type
                  </Form.Label>
                  <select
                    className="form-select text-muted"
                    name="choices-single-default"
                    id="statusSelect"
                    required
                  >
                    <option value="">All</option>
                    <option value="Brit Coaches Ltd">Airport Transfer</option>
                    <option value="Dorset Mini Coach">Corporate Event</option>
                    <option value="Brit Coaches Ltd">
                      UK Tour or International Tour
                    </option>
                    <option value="Dorset Mini Coach">Charity Event</option>
                    <option value="Dorset Mini Coach">Sporting Event</option>
                    <option value="Dorset Mini Coach">Weeding</option>
                    <option value="Dorset Mini Coach">Stag/Hen Do</option>
                    <option value="Dorset Mini Coach">
                      Staff Shuttles or Transport
                    </option>
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">
                    Affiliate Included{" "}
                    <span className="badge rounded-pill badge-outline-light text-info">
                      Must be 100%
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="customerName-field"
                    placeholder="Search Affiliate Include"
                    required
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="d-flex align-items-between justify-content-center mb-3">
                  <div className="form-check mb-2">
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
                      Booking
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Confirmation
                    </label>
                  </div>
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddSupplier();
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button variant="primary" id="add-btn">
                    Add
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default SupplierRoutingRule;
