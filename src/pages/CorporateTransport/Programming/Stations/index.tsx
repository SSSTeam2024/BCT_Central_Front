import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Offcanvas,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import TableContainer from "Common/TableContainer";
import { shipments } from "Common/data";
import offerbanner from "../../../../assets/images/ecommerce/offer-banner.jpg";

const Stations = () => {
  document.title = "Stations | Bouden Coach Travel";

  const navigate = useNavigate();

  const [modal_AddStationModals, setmodal_AddStationModals] =
    useState<boolean>(false);
  function tog_AddStationModals() {
    setmodal_AddStationModals(!modal_AddStationModals);
  }
  const [showStations, setShowStations] = useState<boolean>(false);
  const [showCouponDetails, setShowCouponsDetails] = useState<any>({});

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        disableFilters: true,
        filterable: true,
        accessor: "orderId",
      },
      {
        Header: "City",
        accessor: "shipment_no",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Region",
        accessor: "customer_name",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Postcode",
        accessor: "supplier",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Country",
        accessor: "location",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link
                  to="#couponDetails"
                  className="badge badge-soft-primary edit-item-btn"
                  state={cellProps}
                  onClick={() => {
                    setShowCouponsDetails(cellProps);
                    setShowStations(!showStations);
                  }}
                >
                  <i className="ri-eye-line"></i>
                </Link>
              </li>
              <li>
                <Link to="#" className="badge badge-soft-success edit-item-btn">
                  <i className="ri-edit-2-line"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="badge badge-soft-danger remove-item-btn"
                >
                  <i className="ri-delete-bin-2-line"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Stations" pageTitle="Management" />
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
                    onClick={() => tog_AddStationModals()}
                    className="add-btn"
                  >
                    <i className="mdi mdi-map-marker-plus me-1 align-middle"></i>{" "}
                    Add Station
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive table-card">
                <TableContainer
                  columns={columns || []}
                  data={shipments || []}
                  // isGlobalFilter={false}
                  iscustomPageSize={false}
                  isBordered={false}
                  customPageSize={10}
                  className="custom-header-css table align-middle table-nowrap"
                  tableClassName="table-centered align-middle table-nowrap mb-0"
                  theadClassName="text-muted table-light"
                  SearchPlaceholder="Search Products..."
                />
              </div>
              <div className="noresult" style={{ display: "none" }}>
                <div className="text-center py-4">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                      <i className="bi bi-search"></i>
                    </div>
                  </div>
                  <h5 className="mt-2">Sorry! No Result Found</h5>
                  <p className="text-muted mb-0">
                    We've searched more than 150+ shipment orders We did not
                    find any shipment orders for you search.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Modal
            className="fade zoomIn"
            size="lg"
            show={modal_AddStationModals}
            onHide={() => {
              tog_AddStationModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Add Station
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
                      <Form.Label htmlFor="customerName-field">Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="customerName-field"
                        placeholder="Enter customer name"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label htmlFor="supplierName-field">City</Form.Label>
                      <Form.Control
                        type="text"
                        id="supplierName-field"
                        placeholder="Enter supplier name"
                        required
                      />
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="orderDate-field">Region</Form.Label>
                      <Flatpickr
                        className="form-control flatpickr-input"
                        placeholder="Select Date"
                        options={{
                          dateFormat: "d M, Y",
                        }}
                      />
                      {/* <Form.Control type="text" id="orderDate-field" data-provider="flatpickr" data-date-format="d M, Y" placeholder="Select date" required /> */}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="arrivalDate-field">
                        Postcode
                      </Form.Label>
                      <Flatpickr
                        className="form-control flatpickr-input"
                        placeholder="Select Date"
                        options={{
                          dateFormat: "d M, Y",
                        }}
                      />
                      {/* <Form.Control type="text" id="arrivalDate-field" data-provider="flatpickr" data-date-format="d M, Y" placeholder="Select date" required /> */}
                    </div>
                  </Col>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="locationSelect" className="form-label">
                        Country
                      </label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="locationSelect"
                        required
                      >
                        <option value="">Location</option>
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
                        <option value="Spain">Spain</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Europe">Europe</option>
                        <option value="Finland">Finland</option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="France">France</option>
                        <option value="England">England</option>
                        <option value="Scotland">Scotland</option>
                        <option value="Georgia">Georgia</option>
                        <option value="UA">UA</option>
                        <option value="Poland">Poland</option>
                        <option value="Italy">Italy</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Albania">Albania</option>
                        <option value="Spain">Spain</option>
                        <option value="Jersey">Jersey</option>
                      </select>
                    </div>
                  </div>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="statusSelect" className="form-label">
                        Postion
                      </label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="statusSelect"
                        required
                      >
                        <option value="">Status</option>
                        <option value="Pickups">Pickups</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Out Of Delivery">Out Of Delivery</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-ghost-danger"
                        onClick={() => {
                          tog_AddStationModals();
                        }}
                        data-bs-dismiss="modal"
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Close
                      </Button>
                      <Button variant="primary" id="add-btn">
                        Add Station
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
          <Offcanvas
            show={showStations}
            onHide={() => setShowStations(!showStations)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Cyber Sale</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div>
                <img src={offerbanner} alt="" className="img-thumbnail" />
              </div>
              <div className="mt-3">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <span className="text-muted">Use Code</span>
                        </td>
                        <td>
                          <span className="fw-medium">
                            {showCouponDetails.code}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-muted">Discount</span>
                        </td>
                        <td>
                          <span className="fw-medium text-uppercase">
                            {showCouponDetails.discount}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-muted">Start Date</span>
                        </td>
                        <td>
                          <span className="fw-medium">
                            {showCouponDetails.startDate}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-muted">END Date</span>
                        </td>
                        <td>
                          <span className="fw-medium">
                            {showCouponDetails.endDate}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-muted">Product Type</span>
                        </td>
                        <td>
                          <span className="fw-medium">
                            {showCouponDetails.productType}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-muted">Status</span>
                        </td>
                        <td>
                          <span
                            className={
                              showCouponDetails.status === "Expired"
                                ? "badge badge-soft-danger text-uppercase"
                                : "badge badge-soft-success text-uppercase"
                            }
                          >
                            {showCouponDetails.status}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Stations;
