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

const Delayschanges = () => {
  document.title = " Delays & Changes | Coach Hire Network";
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Driver</span>,
      selector: (row: any) => row.driver,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Group</span>,
      selector: (row: any) => row.modalId,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle</span>,
      selector: (row: any) => row.vehicle,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Start Station</span>,
      selector: (row: any) => <Link to="#!">{row.title}</Link>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Start Time</span>,
      selector: (row: any) => row.user,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row.assigned,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Arrival Time</span>,
      selector: (row: any) => row.createdBy,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      cell: () => {
        return (
          <Dropdown className="dropdown d-inline-block">
            <Dropdown.Toggle className="btn btn-soft-secondary arrow-none btn-sm">
              <i className="ri-more-fill align-middle"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item href="#">
                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>View
              </Dropdown.Item>
              <Dropdown.Item className="edit-item-btn">
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit
              </Dropdown.Item>
              <Dropdown.Item className="remove-item-btn">
                {" "}
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Delete{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      },
    },
  ];
  const data = [
    {
      srNo: "01",
      modalId: "VLZ-452",
      vehicle: "MBS2018",
      title: "Post launch reminder/ post list",
      driver: "Joseph Parker",
      assigned: "Alexis Clarke",
      createdBy: "Joseph Parker",
      date: "03 Oct, 2021",
      status: "Re-open",
      priority: "High",
    },
    {
      srNo: "02",
      modalId: "VLZ-453",
      vehicle: "BMWE2017",
      title: "Additional Calendar",
      driver: "Diana Kohler",
      assigned: "Admin",
      createdBy: "Mary Rucker",
      date: "05 Oct, 2021",
      status: "On-Hold",
      priority: "Medium",
    },
    {
      srNo: "03",
      modalId: "VLZ-454",
      vehicle: "MBL2019",
      title: "Make a creating an account profile",
      driver: "Tonya Noble",
      assigned: "Admin",
      createdBy: "Tonya Noble",
      date: "27 April, 2022",
      status: "Closed",
      priority: "Low",
    },
    {
      srNo: "04",
      modalId: "VLZ-455",
      vehicle: "MBS2020",
      title: "Apologize for shopping Error!",
      driver: "Joseph Parker",
      assigned: "Alexis Clarke",
      createdBy: "Joseph Parker",
      date: "14 June, 2021",
      status: "Inprogress",
      priority: "Medium",
    },
    {
      srNo: "05",
      modalId: "VLZ-456",
      vehicle: "RRS2021",
      title: "Support for theme",
      driver: "Donald Palmer",
      assigned: "Admin",
      createdBy: "Donald Palmer",
      date: "25 June, 2021",
      status: "Closed",
      priority: "Low",
    },
    {
      srNo: "06",
      modalId: "VLZ-457",
      vehicle: "AE2018",
      title: "Benner design for FB & Twitter",
      driver: "Mary Rucker",
      assigned: "Jennifer Carter",
      createdBy: "Mary Rucker",
      date: "14 Aug, 2021",
      status: "Inprogress",
      priority: "Medium",
    },
    {
      srNo: "07",
      modalId: "VLZ-458",
      vehicle: "MBL2018",
      title: "Change email option process",
      driver: "James Morris",
      assigned: "Admin",
      createdBy: "James Morris",
      date: "12 March, 2022",
      status: "Open",
      priority: "High",
    },
    {
      srNo: "08",
      modalId: "VLZ-460",
      vehicle: "MBE2021",
      title: "Support for theme",
      driver: "Nathan Cole",
      assigned: "Nancy Martino",
      createdBy: "Nathan Cole",
      date: "28 Feb, 2022",
      status: "On-Hold",
      priority: "Low",
    },
    {
      srNo: "09",
      modalId: "VLZ-461",
      vehicle: "RRS2021",
      title: "Form submit issue",
      driver: "Grace Coles",
      assigned: "Admin",
      createdBy: "Grace Coles",
      date: "07 Jan, 2022",
      status: "New",
      priority: "High",
    },
    {
      srNo: "10",
      modalId: "VLZ-462",
      vehicle: "BMWE2017",
      title: "Edit customer testimonial",
      driver: "Freda",
      assigned: "Alexis Clarke",
      createdBy: "Freda",
      date: "16 Aug, 2021",
      status: "Closed",
      priority: "Medium",
    },
    {
      srNo: "11",
      modalId: "VLZ-463",
      vehicle: "MBS2018",
      title: "Ca i have an e-copy invoice",
      driver: "Williams",
      assigned: "Admin",
      createdBy: "Williams",
      date: "24 Feb, 2022",
      status: "Open",
      priority: "Low",
    },
    {
      srNo: "12",
      modalId: "VLZ-464",
      vehicle: "MBL2018",
      title: "Brand logo design",
      driver: "Richard V.",
      assigned: "Admin",
      createdBy: "Richard V.",
      date: "16 March, 2021",
      status: "Inprogress",
      priority: "High",
    },
    {
      srNo: "13",
      modalId: "VLZ-466",
      vehicle: "AE2018",
      title: "Issue with finding information about order ?",
      driver: "Olive Gunther",
      assigned: "Alexis Clarke",
      createdBy: "Schaefer",
      date: "32 March, 2022",
      status: "New",
      priority: "High",
    },
    {
      srNo: "14",
      modalId: "VLZ-467",
      vehicle: "VLZ1400090324",
      title: "Make a creating an account profile",
      driver: "Edwin",
      assigned: "Admin",
      createdBy: "Edwin",
      date: "05 April, 2022",
      status: "Inprogress",
      priority: "Low",
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Delays & Changes" pageTitle="Tracking" />
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
export default Delayschanges;
