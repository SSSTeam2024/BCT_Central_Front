import React, { useState } from "react";
import { Container, Row, Card, Col, Button, Offcanvas } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteDefectMutation,
  useGetAllDefectsQuery,
} from "features/Defects/defectSlice";
import Swal from "sweetalert2";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";

const DefectsManagement = () => {
  document.title = " Defects Management | Coach Hire Network";

  const { data: AllDefects = [] } = useGetAllDefectsQuery();

  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();

  const [deleteDefect] = useDeleteDefectMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (_id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to go back?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteDefect(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Defect is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Defect is safe :)",
            "info"
          );
        }
      });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Vehicle</span>,
      selector: (row: any) => row.vehicle,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row?.date!,
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
          case "Level 1":
            return <span className="badge bg-success"> {cell.level} </span>;
          case "Level 2":
            return <span className="badge bg-info"> {cell.level} </span>;
          case "Level 3":
            return <span className="badge bg-primary"> {cell.level} </span>;
          case "Level 4":
            return <span className="badge bg-warning"> {cell.level} </span>;
          case "Level 5":
            return <span className="badge bg-danger"> {cell.level} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Issue</span>,
      selector: (row: any) => row.issue,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (cell: any) => {
        switch (cell.defectStatus) {
          case "New":
            return (
              <span className="badge bg-danger"> {cell.defectStatus} </span>
            );
          case "Work Shop":
            return <span className="badge bg-info"> {cell.defectStatus} </span>;
          case "Confirmed":
            return (
              <span className="badge bg-success"> {cell.defectStatus} </span>
            );
          default:
            return (
              <span className="badge bg-secondary"> {cell.defectStatus} </span>
            );
        }
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Notes</span>,
      selector: (row: any) => row.note,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-info edit-item-btn"
                state={row}
                onClick={() => setShowDetails(!showDetails)}
              >
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="/edit-defect"
                className="badge badge-soft-success edit-item-btn"
                state={row}
              >
                <i className="ri-edit-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(row._id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const navigate = useNavigate();

  function tog_AddNewDefect() {
    navigate("/new-vehicle-defect");
  }

  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const defectLocation = useLocation();

  // This function is triggered when the select Vehicle
  const handleSelectVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedVehicle(value);
  };

  // This function is triggered when the select Status
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredDefects = () => {
    let filteredJobs = AllDefects;

    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        (job: any) =>
          job?.vehicle!.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.defectStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.note.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus && selectedStatus !== "all") {
      filteredJobs = filteredJobs.filter(
        (job) => job.defectStatus === selectedStatus
      );
    }

    if (selectedVehicle && selectedVehicle !== "all") {
      filteredJobs = filteredJobs.filter(
        (job) => job.vehicle === selectedVehicle
      );
    }

    return filteredJobs;
  };

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
                      name="vehicle"
                      id="vehicle"
                      onChange={handleSelectVehicle}
                    >
                      <option value="all">All Vehicles</option>
                      {AllVehicles.map((vehicle) => (
                        <option
                          value={vehicle.registration_number}
                          key={vehicle?._id!}
                        >
                          {vehicle.registration_number}
                        </option>
                      ))}
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
                      <option value="New">New</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Work Shop">Work Shop</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </Col>
                  <Col lg={3} className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={() => tog_AddNewDefect()}
                      className="add-btn"
                    >
                      <i className="bi bi-plus-circle me-1 align-middle "></i>{" "}
                      New Defect
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={columns}
                  data={getFilteredDefects()}
                  pagination
                />
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
      <Offcanvas
        show={showDetails}
        onHide={() => setShowDetails(!showDetails)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Defect Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <table>
              <tr>
                <td>
                  <h6>Vehicle : </h6>
                </td>
                <td>{defectLocation?.state?.vehicle!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Date : </h6>
                </td>
                <td>{defectLocation?.state?.date!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Level : </h6>
                </td>
                <td>{defectLocation?.state?.level!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Issue : </h6>
                </td>
                <td>{defectLocation?.state?.issue!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Time : </h6>
                </td>
                <td>{defectLocation?.state?.time!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Status : </h6>
                </td>
                <td>{defectLocation?.state?.defectStatus!}</td>
              </tr>
              <tr>
                <td>
                  <h6>Note : </h6>
                </td>
                <td>{defectLocation?.state?.note!}</td>
              </tr>
            </table>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};
export default DefectsManagement;
