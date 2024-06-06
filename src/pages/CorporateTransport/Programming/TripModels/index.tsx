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
import { Link } from "react-router-dom";
import AddNewTripModel from "./AddNewTripModel";

const TripModel = () => {
  document.title = "Trip Model | Bouden Coach Travel";

  const [modal_AddTripModelModals, setmodal_AddTripModelModals] =
    useState<boolean>(false);
  function tog_AddTripModel() {
    setmodal_AddTripModelModals(!modal_AddTripModelModals);
  }

  const [modal_EditTripModelModals, setmodal_EditTripModelModals] =
    useState<boolean>(false);
  function tog_EditTripModel() {
    setmodal_EditTripModelModals(!modal_EditTripModelModals);
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Corporate</span>,
      selector: (row: any) => row.assigned,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Group</span>,
      selector: (row: any) => row.createdBy,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Handled By</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Driver</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Cost</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pickup</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Start Time</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Real Start Time</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Arrival Time</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Real Arrival Time</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to={`/trip-model-details/${cell.srNo}`}
                className="badge badge-soft-primary edit-item-btn"
                state={cell}
              >
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-success edit-item-btn"
                state={cell}
                onClick={() => tog_EditTripModel()}
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
  ];

  const [selected, setSelected] = useState("");
  const handleOwner = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ownerName = e.target.value;
    setSelected(ownerName);
  };

  const [changeColor, setChangeColor] = useState<boolean>(false);

  // function for handleClick
  const handleClick = () => {
    setChangeColor(!changeColor);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Trip Models" pageTitle="Management" />
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
                      onClick={() => tog_AddTripModel()}
                      className="add-btn btn-sm"
                    >
                      <i className="mdi mdi-briefcase-plus me-1 align-middle fs-22"></i>{" "}
                      Add Trip Model
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable columns={columns} data={data} pagination />
              </Card.Body>
            </Card>
          </Col>
        </Container>
        {/* Add New Trip Model Modal */}
        <Modal
          className="fade zoomIn"
          size="lg"
          show={modal_AddTripModelModals}
          onHide={() => {
            tog_AddTripModel();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Add Trip Model
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
                      Corporate
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="choices-single-default"
                      id="statusSelect"
                      required
                    >
                      <option value="">All Corporate</option>
                      <option value="Small">CITY ROAD PRIMARY SCHOOL</option>
                      <option value="Medium">Denstone College</option>
                      <option value="Large">ZEELO PROLOGIS</option>
                    </select>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="orderDate-field">
                      Handled By
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="choices-single-default"
                      id="statusSelect"
                      required
                      onChange={handleOwner}
                    >
                      <option value="">Select</option>
                      <option value="Bouden">Bouden</option>
                      <option value="Affiliate">Affiliate</option>
                    </select>
                  </div>
                </Col>
                {selected === "Affiliate" ? (
                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="supplierName-field">
                        Affiliates
                      </Form.Label>
                      <select
                        className="form-select text-muted"
                        name="choices-single-default"
                        id="statusSelect"
                        required
                        onChange={handleOwner}
                      >
                        <option value="">All Affiliates</option>
                        <option value="Brit Coaches Ltd">
                          Brit Coaches Ltd
                        </option>
                        <option value="Dorset Mini Coach">
                          Dorset Mini Coach
                        </option>
                        <option value="Brit Coaches Ltd">HOUSEM MORSI</option>
                        <option value="Dorset Mini Coach">
                          Top line travel- Amjad
                        </option>
                      </select>
                    </div>
                  </Col>
                ) : (
                  ""
                )}
                {selected === "Affiliate" ? (
                  ""
                ) : (
                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="supplierName-field">
                        Driver
                      </Form.Label>
                      <select
                        className="form-select text-muted"
                        name="choices-single-default"
                        id="statusSelect"
                        required
                        onChange={handleOwner}
                      >
                        <option value="">All Drivers</option>
                        <option value="Brit Coaches Ltd">Wadi Hussain</option>
                        <option value="Dorset Mini Coach">Amar Bashir</option>
                        <option value="Brit Coaches Ltd">Ahmed Zeeshan</option>
                        <option value="Dorset Mini Coach">Raghban Ali</option>
                      </select>
                    </div>
                  </Col>
                )}
                {selected === "Affiliate" ? (
                  ""
                ) : (
                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="supplierName-field">
                        Vehicle
                      </Form.Label>
                      <select
                        className="form-select text-muted"
                        name="choices-single-default"
                        id="statusSelect"
                        required
                        onChange={handleOwner}
                      >
                        <option value="">All Vehicles</option>
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
                )}
              </Row>
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Form.Label htmlFor="supplierName-field">
                      Customer Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="customerName-field"
                      placeholder="Enter Customer name"
                      required
                    />
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="mb-3">
                    <Form.Label htmlFor="supplierName-field">
                      Customer Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      id="customerName-field"
                      placeholder="Enter Customer Email"
                      required
                    />
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="mb-3">
                    <button
                      onClick={handleClick}
                      type="button"
                      className={`btn btn-darken-light custom-toggle text-dark btn-sm ${
                        changeColor === false
                          ? "btn-darken-light"
                          : "btn-darken-light"
                      }`}
                      data-bs-toggle="button"
                    >
                      <span className="icon-on">
                        <i
                          className={`${
                            changeColor === false
                              ? "mdi mdi-cog-counterclockwise align-bottom me-1"
                              : "mdi mdi-robot align-bottom me-1"
                          }`}
                        ></i>
                        {changeColor === false ? "Manual" : "Automatic"}
                      </span>
                    </button>
                    {changeColor === false ? (
                      <Form.Control
                        type="email"
                        id="customerName-field"
                        placeholder="Enter trip cost"
                        required
                      />
                    ) : (
                      <Form.Control
                        type="email"
                        id="customerName-field"
                        defaultValue={520}
                        required
                      />
                    )}
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      className="btn-ghost-danger"
                      onClick={() => {
                        tog_AddTripModel();
                      }}
                      data-bs-dismiss="modal"
                    >
                      <i className="ri-close-line align-bottom me-1"></i> Close
                    </Button>
                    <Button variant="primary" id="add-btn">
                      Add Trip Model
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Trip Model Modal */}
        <Modal
          className="fade zoomIn"
          size="lg"
          show={modal_EditTripModelModals}
          onHide={() => {
            tog_EditTripModel();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Edit Trip Model
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <AddNewTripModel />
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default TripModel;
