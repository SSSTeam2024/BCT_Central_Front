import React, { useState } from "react";
import {
  Container,
  Form,
  Row,
  Card,
  Col,
  Button,
  Offcanvas,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import Swal from "sweetalert2";
import {
  useAddNewRequestFeatureMutation,
  useGetAllRequestFeaturesQuery,
} from "features/RequestFeature/requestFeature";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useGetAllErrorReportsQuery } from "features/ErrorReport/errorReportSlice";

const ReportError = () => {
  document.title = "Errors Reported | Bouden Coach Travel";

  const { data: allRequestedFeatures = [] } = useGetAllErrorReportsQuery();

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const requestedFeatureLocation = useLocation();

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Reference</span>,
      selector: (row: any) => row.ref,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Client</span>,
      selector: (row: any) =>
        row?.company_id! !== null ? (
          <span>{row?.company_id?.name!}</span>
        ) : (
          <span>{row?.school_id?.name!}</span>
        ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Subject</span>,
      selector: (row: any) => row.section,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Title</span>,
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row: any) =>
        row.status === "Pending" ? (
          <span className="badge bg-warning">{row.status!}</span>
        ) : (
          <span className="badge bg-success">{row.status!}</span>
        ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      cell: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-info edit-item-btn"
                state={row}
                onClick={() => setShowDetails(!showDetails)}
              >
                <i
                  className="ri-eye-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.2em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn">
                <i
                  className="ri-delete-bin-2-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.2em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  // onClick={()=>AlertDelete(row._id)}
                ></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // This function is triggered when the select Subject
  const handleSelectSubject = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSubject(value);
  };

  // This function is triggered when the select Status
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredRequestedFeatures = () => {
    let filteredJobs = allRequestedFeatures;

    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        (job: any) =>
          job?.section!.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job?.company_id
            ?.name!.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          job?.school_id?.name!.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus && selectedStatus !== "all") {
      filteredJobs = filteredJobs.filter(
        (job) => job.status === selectedStatus
      );
    }

    if (selectedSubject && selectedSubject !== "all") {
      filteredJobs = filteredJobs.filter(
        (job) => job.section === selectedSubject
      );
    }

    return filteredJobs;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Errors Reported" pageTitle="Relevance" />
          <Card>
            <Card.Header className="border-bottom-dashed">
              <Row className="g-3">
                <Col lg={3}>
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search for something..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
                <Col lg={3} className="col-lg-auto">
                  <select
                    className="form-select text-muted"
                    data-choices
                    data-choices-search-false
                    name="subject"
                    id="subject"
                    onChange={handleSelectSubject}
                  >
                    <option value="all">All Subjects</option>
                    <option value="Billing">Billing</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Entreprise">Entreprise</option>
                    <option value="Sales">Sales</option>
                    <option value="Emails and Hosting">
                      Emails and Hosting
                    </option>
                    <option value="Website and mobile app">
                      Website and mobile app
                    </option>
                  </select>
                </Col>
                <Col lg={3}>
                  <select
                    className="form-select text-muted"
                    data-choices
                    data-choices-search-false
                    name="choices-single-default"
                    id="idStatus"
                    onChange={handleSelectStatus}
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Answered">Answered</option>
                  </select>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={columns}
                data={getFilteredRequestedFeatures()}
                pagination
              />
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Offcanvas
        show={showDetails}
        onHide={() => setShowDetails(!showDetails)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Request Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="border-bottom border-bottom-dashed">
            <table>
              <tr>
                <td>
                  <h6>Reference : </h6>
                </td>
                <td>{requestedFeatureLocation?.state?.ref!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Client : </h6>
                </td>
                <td>
                  {requestedFeatureLocation?.state?.company_id! !== null ? (
                    <span>
                      {requestedFeatureLocation?.state?.company_id?.name}
                    </span>
                  ) : (
                    <span>
                      {requestedFeatureLocation?.state?.school_id?.name}
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Title : </h6>
                </td>
                <td>{requestedFeatureLocation?.state?.title!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Subject : </h6>
                </td>
                <td>{requestedFeatureLocation?.state?.section!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Date : </h6>
                </td>
                <td>{requestedFeatureLocation?.state?.date!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Details : </h6>
                </td>
                <td>{requestedFeatureLocation?.state?.details!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Status : </h6>
                </td>
                <td>
                  {requestedFeatureLocation?.state?.status! === "Pending" ? (
                    <span className="badge bg-warning">
                      {requestedFeatureLocation?.state?.status!}
                    </span>
                  ) : (
                    <span className="badge bg-warning">
                      {requestedFeatureLocation?.state?.status!}
                    </span>
                  )}
                </td>
              </tr>
              {requestedFeatureLocation?.state?.status! === "Pending" ? (
                ""
              ) : (
                <tr>
                  <td>
                    <h6>Answer : </h6>
                  </td>
                  <td>{requestedFeatureLocation?.state?.answer!}</td>
                </tr>
              )}
            </table>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};
export default ReportError;
