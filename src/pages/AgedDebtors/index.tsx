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

const AgedDebtors = () => {
  document.title = " Aged Debtors | Bouden Coach Travel";
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Account</span>,
      selector: (row: any) => row.srNo,
      sortable: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      selector: (row: any) => row.assigned,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Contact Name</span>,
      selector: (row: any) => row.createdBy,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Phone</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Credit Limit</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">VAT</span>,
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
      name: <span className="font-weight-bold fs-13">0-30 days</span>,
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
      name: <span className="font-weight-bold fs-13">31-60 days</span>,
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
      name: <span className="font-weight-bold fs-13">61-90 days</span>,
      sortable: true,
      selector: (cell: any) => {
        return <span className="mdi mdi-phone-in-talk-outline"></span>;
      },
    },
    {
      name: <span className="font-weight-bold fs-13">90+ days</span>,
      sortable: true,
      selector: (cell: any) => {
        return <span className="mdi mdi-email-outline"></span>;
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
          <Breadcrumb title="Aged Debtors" pageTitle="Finance" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
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
                        30 days
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
                        60 days
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
                        90 days
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
                        90+ days
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
                        Overdue
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
                        Over credit limit
                      </label>
                    </div>
                    <div className="d-flex gap-1 mb-2">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm fs-10"
                      >
                        <i className="ph ph-note-blank"></i> Email Statement
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm fs-10"
                      >
                        <i className="ph ph-key-return"></i> Print Statement
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm fs-10"
                      >
                        <i className="ph ph-copy"></i> Print Summary
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm fs-10"
                      >
                        <i className="ph ph-user-plus"></i> Export
                      </button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card id="shipmentsList">
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
export default AgedDebtors;
