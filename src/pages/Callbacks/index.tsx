import React from "react";
import {
  Container,
  Dropdown,
  Form,
  Row,
  Card,
  Col,
  Button,
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

const Callbacks = () => {
  document.title = "Callbacks | Bouden Coach Travel";
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (row: any) => row.srNo,
      sortable: true,
    },
    {
      name: (
        <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>
      ),
      selector: (row: any) => row.srNo,
      sortable: true,
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) => row.user,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.assigned,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Time</span>,
      selector: (row: any) => row.createdBy,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pax</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pick Up</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.status) {
          case "Re-open":
            return (
              <span className="badge badge-soft-info"> {cell.status} </span>
            );
          case "On-Hold":
            return (
              <span className="badge badge-soft-secondary">
                {" "}
                {cell.status}{" "}
              </span>
            );
          case "Closed":
            return (
              <span className="badge badge-soft-danger"> {cell.status} </span>
            );
          case "Inprogress":
            return (
              <span className="badge badge-soft-warning"> {cell.status} </span>
            );
          case "Open":
            return (
              <span className="badge badge-soft-primary"> {cell.status} </span>
            );
          case "New":
            return (
              <span className="badge badge-soft-success"> {cell.status} </span>
            );
          default:
            return (
              <span className="badge badge-soft-success"> {cell.status} </span>
            );
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Progress</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Passenger Name</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile</span>,
      sortable: true,
      selector: (cell: any) => {
        return <span className="mdi mdi-phone-in-talk-outline"></span>;
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      sortable: true,
      selector: (cell: any) => {
        return <span className="mdi mdi-email-outline"></span>;
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Mileage</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Arrival</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Other Part</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Balance</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Contract</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },

    {
      name: <span className="font-weight-bold fs-13">Flight N°</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Flight Arrival N°</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Flight In</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Flight Out</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Affiliate</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Callback</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Payment Status</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Account Name</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">External Reference</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Notes</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Internal Profile</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.priority) {
          case "High":
            return <span className="badge bg-danger"> {cell.priority} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.priority} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.priority} </span>;
          default:
            return <span className="badge bg-danger"> {cell.priority} </span>;
        }
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
    {
      srNo: "Harrison Matthews",
      modalId: "VLZ-458",
      purchaseId: "MBL2018",
      title: "Change email option process",
      user: "James Morris",
      assigned: "Admin",
      createdBy: "James Morris",
      createDate: "12 March, 2022",
      status: "Open",
      priority: "High",
    },
    {
      srNo: "Zachariah Poole",
      modalId: "VLZ-460",
      purchaseId: "MBS2018",
      title: "Support for theme",
      user: "Nathan Cole",
      assigned: "Nancy Martino",
      createdBy: "Nathan Cole",
      createDate: "28 Feb, 2022",
      status: "On-Hold",
      priority: "Low",
    },
    {
      srNo: "Carter Francis",
      modalId: "VLZ-461",
      purchaseId: "MBL2019",
      title: "Form submit issue",
      user: "Grace Coles",
      assigned: "Admin",
      createdBy: "Grace Coles",
      createDate: "07 Jan, 2022",
      status: "New",
      priority: "High",
    },
    {
      srNo: "Jasper Parry",
      modalId: "VLZ-462",
      purchaseId: "MBS2018",
      title: "Edit customer testimonial",
      user: "Freda",
      assigned: "Alexis Clarke",
      createdBy: "Freda",
      createDate: "16 Aug, 2021",
      status: "Closed",
      priority: "Medium",
    },
    {
      srNo: "Maximilian Holland",
      modalId: "VLZ-463",
      purchaseId: "MBS2020",
      title: "Ca i have an e-copy invoice",
      user: "Williams",
      assigned: "Admin",
      createdBy: "Williams",
      createDate: "24 Feb, 2022",
      status: "Open",
      priority: "Low",
    },
    {
      srNo: "Carter Francis",
      modalId: "VLZ-464",
      purchaseId: "RRS2021",
      title: "Brand logo design",
      user: "Richard V.",
      assigned: "Admin",
      createdBy: "Richard V.",
      createDate: "16 March, 2021",
      status: "Inprogress",
      priority: "High",
    },
    {
      srNo: "Harrison Matthews",
      modalId: "VLZ-466",
      purchaseId: "AE2018",
      title: "Issue with finding information about order ?",
      user: "Olive Gunther",
      assigned: "Alexis Clarke",
      createdBy: "Schaefer",
      createDate: "32 March, 2022",
      status: "New",
      priority: "High",
    },
    {
      srNo: "Gabrielle Holden",
      modalId: "VLZ-467",
      purchaseId: "AE2018",
      title: "Make a creating an account profile",
      user: "Edwin",
      assigned: "Admin",
      createdBy: "Edwin",
      createDate: "05 April, 2022",
      status: "Inprogress",
      priority: "Low",
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Callbacks" pageTitle="Jobs" />
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
    </React.Fragment>
  );
};
export default Callbacks;
