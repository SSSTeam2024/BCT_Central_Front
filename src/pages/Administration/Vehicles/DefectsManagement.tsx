import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";

const DefectsManagement = () => {
  document.title = " Defects Management | Bouden Coach Travel";
  const [modal_QuoteInfo, setmodal_QuoteInfo] = useState<boolean>(false);
  function tog_QuoteInfo() {
    setmodal_QuoteInfo(!modal_QuoteInfo);
  }
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Vehicle</span>,
      selector: (row: any) => row.vehicles,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Time</span>,
      selector: (row: any) => row.time,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Level</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.level) {
          case "Not Paid":
            return <span className="badge bg-danger"> {cell.level} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.level} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.level} </span>;
          default:
            return <span className="badge bg-danger"> {cell.level} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Issue</span>,
      selector: (row: any) => row.Issue,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (cell: any) => {
        switch (cell.status) {
          case "New":
            return <span className="badge bg-danger"> {cell.status} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.status} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.status} </span>;
          default:
            return <span className="badge bg-danger"> {cell.status} </span>;
        }
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Notes</span>,
      selector: (row: any) => row.Note,
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
  const navigate = useNavigate();

  function tog_AddNewDefect() {
    navigate("/new-vehicle-defect");
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Defects" pageTitle="Management" />
          <Col lg={12}>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <Row className="g-3">
                  <Col lg={3}>
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for something..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col lg={3} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All Vehicles</option>
                      <option value="Today">YS17Waa Ford Transit</option>
                      <option value="Yesterday">P30 WST VDL Berkhof</option>
                      <option value="Last 7 Days">YT19ECE SCANIA</option>
                    </select>
                  </Col>
                  <Col lg={3}>
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">Status</option>
                      <option value="Today">New</option>
                      <option value="Yesterday">Confirmed</option>
                      <option value="Last 7 Days">Work Shop</option>
                      <option value="Last 7 Days">Resolved</option>
                    </select>
                  </Col>
                  <Col lg={3} className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={() => tog_AddNewDefect()}
                      className="add-btn"
                    >
                      <i className="bi bi-plus-circle me-1 align-middle "></i>{" "}
                      New Suggested Route
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
      </div>
    </React.Fragment>
  );
};
export default DefectsManagement;
