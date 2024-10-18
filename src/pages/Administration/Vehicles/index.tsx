import React, { useMemo, useRef, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";

import {
  Vehicle,
  useDeleteVehicleMutation,
  useGetAllVehiclesQuery,
} from "features/Vehicles/vehicleSlice";
import Swal from "sweetalert2";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import driverAnimation from "../../../assets/images/Animation-1708949536607.json";

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

const Vehicles = () => {
  document.title = "Vehicles | Coach Hire Network";

  const { data = [], isLoading } = useGetAllVehiclesQuery();
  const navigate = useNavigate();

  function tog_AddNewVehicle() {
    navigate("/new-vehicle");
  }
  const lottieRef3 = useRef<LottieRefCurrentProps>(null);

  const [deleteVehicle] = useDeleteVehicleMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDeleteVehicle = async (_id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are You Sure?",
        text: "You won't be able to go back !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteVehicle(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "The Vehicle has been removed.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "The Vehicle is safe :)",
            "info"
          );
        }
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Registration Number",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: Vehicle) => {
          return (
            <Link
              to={`/vehicle-details/${cellProps.registration_number}`}
              className="fw-medium link-primary"
              state={cellProps}
            >
              {cellProps.registration_number}
            </Link>
          );
        },
      },
      {
        Header: "Model",
        accessor: "model",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Service Date",
        accessor: "registration_date",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Size",
        accessor: "max_passengers",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Category",
        accessor: "type",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Mileage",
        accessor: "mileage",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Ownership",
        accessor: "ownership",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Status",
        accessor: (cellProps: any) => {
          switch (cellProps.statusVehicle) {
            case "Active":
              return (
                <span className="badge bg-success-subtle text-success text-uppercase">
                  {" "}
                  {cellProps.statusVehicle}
                </span>
              );
            case "Inactive":
              return (
                <span className="badge bg-warning-subtle text-warning text-uppercase">
                  {" "}
                  {cellProps.statusVehicle}
                </span>
              );
            default:
              return (
                <span className="badge bg-danger-subtle text-danger text-uppercase">
                  {" "}
                  {cellProps.statusVehicle}
                </span>
              );
          }
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: Vehicle) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link
                  to={`/edit-vehicle/${cellProps.registration_number}`}
                  className="badge badge-soft-success edit-item-btn"
                  state={cellProps}
                >
                  <i className="ri-edit-2-line"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="badge badge-soft-danger remove-item-btn"
                  onClick={() => AlertDeleteVehicle(cellProps?._id!)}
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

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredVehicles = () => {
    let filteredVehicles = data;
    if (searchTerm) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle: any) =>
          vehicle?.registration_number
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.max_passengers
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          vehicle.fleet_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          vehicle.mileage.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.engine_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          vehicle.ownership.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredVehicles;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Vehicles" pageTitle="Management" />
          <Card id="shipmentsList">
            <Card.Header className="border-bottom-dashed">
              <Row className="g-3">
                <Col xxl={3} lg={6}>
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
                <Col className="col-xxl-auto col-sm-auto ms-auto">
                  <Button
                    variant="success"
                    onClick={() => tog_AddNewVehicle()}
                    className="add-btn"
                  >
                    <i className="bx bx-car align-middle fs-22"></i> Add Vehicle
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {isLoading ? (
                <Row>
                  <Col lg={12} className="d-flex justify-content-center">
                    <Lottie
                      lottieRef={lottieRef3}
                      onComplete={() => {
                        lottieRef3.current?.goToAndPlay(5, true);
                      }}
                      animationData={driverAnimation}
                      loop={false}
                      style={{ width: 300 }}
                    />
                  </Col>
                  <Col lg={12} className="d-flex justify-content-center">
                    <h2>Loading...</h2>
                  </Col>
                </Row>
              ) : (
                <div className="table-responsive table-card">
                  <TableContainer
                    columns={columns || []}
                    data={getFilteredVehicles() || []}
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
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Vehicles;
