import React, { useState } from "react";
import {
  Container,
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
import { Link } from "react-router-dom";

const DeletedJobs = () => {
  document.title = " Deleted Jobs | Bouden Coach Travel";
  const [modal_QuoteInfo, setmodal_QuoteInfo] = useState<boolean>(false);
  function tog_QuoteInfo() {
    setmodal_QuoteInfo(!modal_QuoteInfo);
  }
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (cell: any) => {
        return (
          <span>
            <Link to="#">
              <span className="text-dark">{cell.Quote_ID}</span>
            </Link>{" "}
            <i className="ph ph-eye" onClick={() => tog_QuoteInfo()}></i>
          </span>
        );
      },
      sortable: true,
    },
    {
      name: (
        <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>
      ),
      selector: (row: any) => row.driver,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle Type</span>,
      selector: (row: any) => row.vehicletype,
      sortable: true,
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) => row.vehicle,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.Date,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Time</span>,
      selector: (row: any) => row.Time,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pax</span>,
      selector: (row: any) => row.Pax,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pick Up</span>,
      selector: (row: any) => row.PickUp,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row.Destination,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Progress</span>,
      selector: (cell: any) => {
        switch (cell.Progress) {
          case "New":
            return <span className="badge bg-danger"> {cell.Progress} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.Progress} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.Progress} </span>;
          default:
            return <span className="badge bg-danger"> {cell.Progress} </span>;
        }
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Passenger Name</span>,
      selector: (row: any) => row.PassengerName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <span
            className="mdi mdi-phone-in-talk-outline"
            title={cell.Mobile}
          ></span>
        );
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <span className="mdi mdi-email-outline" title={cell.Email}></span>
        );
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Mileage</span>,
      selector: (row: any) => row.Mileage,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Arrival Date</span>,
      selector: (row: any) => row.ArrivalDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => row.Price,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Balance</span>,
      selector: (row: any) => row.Balance,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Contract</span>,
      selector: (row: any) => row.Contract,
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Flight N°</span>,
    //   selector: (row: any) => row.FlightNum,
    //   sortable: true,
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Flight Arrival N°</span>,
    //   selector: (row: any) => row.FlightArrival,
    //   sortable: true,
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Flight In</span>,
    //   selector: (row: any) => row.FlightIn,
    //   sortable: true,
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Flight Out</span>,
    //   selector: (row: any) => row.FlightOut,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      selector: (row: any) => row.EnquiryDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Affiliate</span>,
      selector: (row: any) => row.Affiliate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Callback</span>,
      selector: (row: any) => row.Callback,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Payment Status</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.PaymentStatus) {
          case "Not Paid":
            return (
              <span className="badge bg-danger"> {cell.PaymentStatus} </span>
            );
          case "Medium":
            return (
              <span className="badge bg-info"> {cell.PaymentStatus} </span>
            );
          case "Low":
            return (
              <span className="badge bg-success"> {cell.PaymentStatus} </span>
            );
          default:
            return (
              <span className="badge bg-danger"> {cell.PaymentStatus} </span>
            );
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.Status) {
          case "Pending":
            return <span className="badge bg-warning"> {cell.Status} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.Status} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.Status} </span>;
          default:
            return <span className="badge bg-danger"> {cell.Status} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Account Name</span>,
      selector: (row: any) => row.AccountName,
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">External Reference</span>,
    //   selector: (row: any) => row.ExternalReference,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">Notes</span>,
      selector: (row: any) => row.Notes,
      sortable: true,
    },
  ];
  const data = [
    {
      Quote_ID: "89089",
      driver: "No driver",
      vehicletype: "10-16 Seat Standard Minibus",
      vehicle: "No Vehicle",
      Date: "21 Dec 2023",
      Time: "18:00",
      Pax: "7",
      PickUp: "Dwyran, Wales LL61 6AX",
      Destination: "BIRMINGHAM NEW STREET STATION",
      Progress: "New",
      PassengerName: "Erica",
      Mobile: "07990547241",
      Email: "erica7018@gmail.com",
      Mileage: "37",
      ArrivalDate: "24 Dec 2023 09:00",
      Price: "£0.00",
      Balance: "£0.00",
      Contract: "None",
      EnquiryDate: "10th Nov 2023",
      Affiliate: "No affiliate",
      Callback: "10th Nov 2023 14:29",
      PaymentStatus: "Not Paid",
      Status: "Pending",
      AccountName: "N/A",
      Notes: "The next day pick up point might be changing (within London)",
      // FlightNum: "Joseph Parker",
      // FlightArrival: "Alexis Clarke",
      // FlightIn: "Joseph Parker",
      // FlightOut: "03 Oct, 2021",
      // ExternalReference: "Re-open",
    },
    {
      Quote_ID: "90262",
      driver: "No driver",
      vehicletype: "53 Seat Standard Coach",
      vehicle: "No Vehicle",
      Date: "13 Dec 2023",
      Time: "10:00",
      Pax: "50",
      PickUp:
        "The Little Theatre Dover Street Leicester England LE1 6PT United Kingdom",
      Destination: "Wigston Road Oadby Leicester LE2 5QF United Kingdom",
      Progress: "New",
      PassengerName: "Georgina illston",
      Mobile: "07745090368",
      Email: "Oadby-50plus@outlook.com",
      Mileage: "26",
      ArrivalDate: "Wed 13th Dec 2023 16:00",
      Price: "£0.00",
      Balance: "£0.00",
      Contract: "N/A",
      // FlightNum: "Joseph Parker",
      // FlightArrival: "Alexis Clarke",
      // FlightIn: "Joseph Parker",
      // FlightOut: "03 Oct, 2021",
      EnquiryDate: "Wed 2nd Aug 2023",
      Affiliate: "N/A",
      Callback: "Not set",
      PaymentStatus: "Not Paid",
      Status: "Pending",
      AccountName: "N/A",
      // ExternalReference: "Re-open",
      Notes:
        "We wondered if it would be possible to pick up from every ones homes or if this is not possible?",
    },
    {
      Quote_ID: "86563",
      driver: "No driver",
      vehicletype: "29 Seat Standard Midi Coach",
      vehicle: "No Vehicle",
      Date: "15 Dec 2023",
      Time: "09:30",
      Pax: "24",
      PickUp:
        "Becketts Farm A435 Alcester Road Birmingham England B47 6AJ United Kingdom",
      Destination: "ONeills Poplar Rd Solihull England B91 3AJ United Kingdom",
      Progress: "New",
      PassengerName: "Simon Ray",
      Mobile: "07828250084",
      Email: "simon@touchwoodbuilding.co.uk",
      Mileage: "46",
      ArrivalDate: "Fri 15th Dec 2023 19:00",
      Price: "£450.00",
      Balance: "£450.00",
      Contract: "None",
      EnquiryDate: "Tue 19th Sep 2023",
      Affiliate: "No affiliate",
      Callback: "Not Set",
      PaymentStatus: "Not Paid",
      Status: "Pending",
      AccountName: "N/A",
      Notes:
        "Hi, I would also like a quote for the same journey on 16/12 for approx 12 with an 11am collection - 4pm return, & them 6pm that evening for 6pm drop off 11.30pm collection for approx 24 (these are just rough times & numbers at the moment to get an idea of costs)  Thank you in advance, ",
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Deleted Jobs" pageTitle="Jobs" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All</option>
                      <option value="Today">Today</option>
                      <option value="Yesterday">Yesterday</option>
                      <option value="Last 7 Days">Last 7 Days</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option defaultValue="This Month">This Month</option>
                      <option value="Last Month">Last Month</option>
                    </select>
                  </Col>
                  <Col lg={2}>
                    {/* <input type="text" className="form-control" data-provider="flatpickr" data-date-format="d M, Y" data-range-date="true" id="demo-datepicker" placeholder="Select date" /> */}
                    <Flatpickr
                      className="form-control flatpickr-input"
                      placeholder="Select Date"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                      }}
                    />
                  </Col>
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All Payment</option>
                      <option value="Today">Not paid</option>
                      <option value="Yesterday">Part paid</option>
                      <option value="Last 7 Days">Paid</option>
                      <option value="Last 30 Days">Pay Cash</option>
                    </select>
                  </Col>
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All Progress</option>
                      <option value="Today">Accepted</option>
                      <option value="Yesterday">Allocated</option>
                      <option value="Last 7 Days">Confirmed</option>
                      <option value="Last 30 Days">Ended</option>
                      <option value="Today">In Progress</option>
                      <option value="Yesterday">Internal Job</option>
                      <option value="Last 7 Days">New</option>
                      <option value="Today">On route</option>
                      <option value="Yesterday">On site</option>
                      <option value="Last 7 Days">Under bid</option>
                    </select>
                  </Col>
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All Priority</option>
                      <option value="Today">1</option>
                      <option value="Yesterday">2</option>
                      <option value="Last 7 Days">3</option>
                      <option value="Last 30 Days">4</option>
                      <option value="Today">5</option>
                    </select>
                  </Col>

                  <Col className="d-flex align-items-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        Private Hire
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox2"
                      >
                        Contract
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox3"
                      >
                        Non Invoiced
                      </label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
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
                      <button type="button" className="btn btn-outline-dark">
                        Excel
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        PDF
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        Print
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
        </Container>
      </div>
      <Modal
        className="fade zoomIn"
        size="lg"
        show={modal_QuoteInfo}
        onHide={() => {
          tog_QuoteInfo();
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
                  <Form.Label htmlFor="arrivalDate-field">Postcode</Form.Label>
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
                    <option value="Ascension Island">Ascension Island</option>
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
                    <option value="Christmas Island">Christmas Island</option>
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
                      tog_QuoteInfo();
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
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
    </React.Fragment>
  );
};
export default DeletedJobs;
