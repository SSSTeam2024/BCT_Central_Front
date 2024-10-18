import React, { useMemo } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import {
  School,
  useDeleteSchoolMutation,
  useGetAllSchoolsQuery,
} from "features/Schools/schools";
import Swal from "sweetalert2";

const Schools = () => {
  document.title = "Schools | Coach Hire Network";

  const navigate = useNavigate();

  function tog_AddSchool() {
    navigate("/new-school");
  }

  const { data: AllSchools = [] } = useGetAllSchoolsQuery();
  const [deleteSchool] = useDeleteSchoolMutation();
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
        text: "You won't be able to go back !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteSchool(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "School is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "School is safe :)",
            "info"
          );
        }
      });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: School) => {
          return (
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/schoolFiles/${cellProps.id_file}`}
                  alt=""
                  className="avatar-xs rounded-circle user-profile-img"
                  id="photos"
                />
              </div>
              <Link
                to={`/school-details/${cellProps.name}`}
                className="fw-medium link-primary"
                state={cellProps}
              >
                {cellProps.name}
              </Link>
            </div>
          );
        },
      },
      {
        Header: "Phone Number",
        accessor: "phone",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Address",
        accessor: "address",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Email",
        accessor: "email",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Service Date",
        accessor: "service_date",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Status",
        accessor: (cellProps: School) => {
          return cellProps.statusSchool === "Active" ? (
            <span className="badge badge-soft-success text-uppercase">
              Active
            </span>
          ) : (
            <span className="badge badge-soft-danger text-uppercase">
              Inactive
            </span>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: School) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link
                  to={`/edit-school/${cellProps.name}`}
                  state={cellProps}
                  className="badge badge-soft-success edit-item-btn"
                >
                  <i className="ri-edit-2-line"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="badge badge-soft-danger remove-item-btn"
                  onClick={() => AlertDelete(cellProps?._id!)}
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Schools" pageTitle="Accounts" />
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
                    onClick={() => tog_AddSchool()}
                    className="add-btn btn-sm"
                  >
                    <i className="ph ph-graduation-cap me-1 align-middle fs-22"></i>{" "}
                    Add School
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive table-card">
                <TableContainer
                  columns={columns || []}
                  data={AllSchools || []}
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
              <div className="noresult" style={{ display: "none" }}>
                <div className="text-center py-4">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                      <i className="bi bi-search"></i>
                    </div>
                  </div>
                  <h5 className="mt-2">Sorry! No Result Found</h5>
                  <p className="text-muted mb-0">
                    We've searched more than 150+ shipment orders We did not
                    find any shipment orders for you search.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Schools;
