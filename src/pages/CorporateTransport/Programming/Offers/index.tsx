import React, { useState } from "react";
import {
  Container,
  Dropdown,
  Form,
  Row,
  Card,
  Col,
  Button,
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
import { Link, useNavigate } from "react-router-dom";

const Offers = () => {
  document.title = " Offers | Bouden Coach Travel";

  const navigate = useNavigate();

  const [modal_AddOffreModals, setmodal_AddOffreModals] =
    useState<boolean>(false);
  function tog_AddOffer() {
    setmodal_AddOffreModals(!modal_AddOffreModals);
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.Name,
      sortable: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Corporate</span>,
      selector: (row: any) => row.Corporate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Contact</span>,
      selector: (row: any) => row.Contact,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle</span>,
      selector: (row: any) => row.Vehicle,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Driver</span>,
      selector: (row: any) => row.Driver,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pickup</span>,
      sortable: true,
      selector: (row: any) => row.Pickup,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      sortable: true,
      selector: (row: any) => row.Destination,
    },
    {
      name: <span className="font-weight-bold fs-13">Cost</span>,
      sortable: true,
      selector: (row: any) => row.Cost,
    },
    {
      name: <span className="font-weight-bold fs-13">Offer Number</span>,
      sortable: true,
      selector: (row: any) => row.OfferNumber,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to={`/offer-details/${cell.srNo}`}
                className="badge badge-soft-primary edit-item-btn"
                state={cell}
              >
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to={`/edit-offer/${cell.srNo}`}
                className="badge badge-soft-success edit-item-btn"
                state={cell}
              >
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
      srNo: "Alfred Hurst",
      modalId: "VLZ-452",
      purchaseId: "VLZ1400087402",
      title: "MBS2018",
      user: "Joseph Parker",
      assigned: "Alexis Clarke",
      createdBy: "Joseph Parker",
      createDate: "03 Oct, 2021",
      status: "Re-open",
      priority: "High",
    },
    {
      srNo: "Tommy Carey",
      modalId: "VLZ-453",
      purchaseId: "BMWE2017",
      title: "Additional Calendar",
      user: "Diana Kohler",
      assigned: "Admin",
      createdBy: "Mary Rucker",
      createDate: "05 Oct, 2021",
      status: "On-Hold",
      priority: "Medium",
    },
    {
      srNo: "Cassius Brock",
      modalId: "VLZ-454",
      purchaseId: "MBL2019",
      title: "Make a creating an account profile",
      user: "Tonya Noble",
      assigned: "Admin",
      createdBy: "Tonya Noble",
      createDate: "27 April, 2022",
      status: "Closed",
      priority: "Low",
    },
    {
      srNo: "Gabrielle Holden",
      modalId: "VLZ-455",
      purchaseId: "MBS2020",
      title: "Apologize for shopping Error!",
      user: "Joseph Parker",
      assigned: "Alexis Clarke",
      createdBy: "Joseph Parker",
      createDate: "14 June, 2021",
      status: "Inprogress",
      priority: "Medium",
    },
    {
      srNo: "Jacques Leon",
      modalId: "VLZ-456",
      purchaseId: "RRS2021",
      title: "Support for theme",
      user: "Donald Palmer",
      assigned: "Admin",
      createdBy: "Donald Palmer",
      createDate: "25 June, 2021",
      status: "Closed",
      priority: "Low",
    },
    {
      srNo: "Edward Rogers",
      modalId: "VLZ-457",
      purchaseId: "AE2018",
      title: "Benner design for FB & Twitter",
      user: "Mary Rucker",
      assigned: "Jennifer Carter",
      createdBy: "Mary Rucker",
      createDate: "14 Aug, 2021",
      status: "Inprogress",
      priority: "Medium",
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Offers" pageTitle="Management" />
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
                  <Col className="col-xxl-auto col-sm-auto ms-auto">
                    <Button
                      variant="success"
                      onClick={() => tog_AddOffer()}
                      className="add-btn btn-sm"
                    >
                      <i className="mdi mdi-bullhorn me-1 align-middle fs-22"></i>{" "}
                      Add Offer
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable columns={columns} data={data} pagination />
              </Card.Body>
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
                        <label htmlFor="locationSelect" className="form-label">
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
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Offers;
