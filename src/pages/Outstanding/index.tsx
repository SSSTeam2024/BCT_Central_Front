import React from "react";
import { Container, Card, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";

const Outstanding = () => {
  document.title = " Outstanding | Coach Hire Network";
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Quote</span>,
      selector: (row: any) => row.srNo,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Passenger</span>,
      selector: (row: any) => row.createdBy,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => row.assigned,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Due</span>,
      selector: (row: any) => row.createdBy,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Due Date</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Outward Date</span>,
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Invoice Sent Date</span>,
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
          <Breadcrumb title="Outstanding" pageTitle="Finance" />
          <Col lg={12}>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-sm">
                      <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                        <i className="mdi mdi-currency-usd-off"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">Booked but not paid</h5>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <DataTable columns={columns} data={data} pagination />
              </Card.Body>
            </Card>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-sm">
                      <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                        <i className="mdi mdi-fraction-one-half"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">Part paid</h5>
                  </div>
                </div>
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
export default Outstanding;
