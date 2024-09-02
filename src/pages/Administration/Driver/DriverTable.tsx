import React, { useEffect, useRef, useState, useMemo } from "react";
import { Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { Driver, useDeleteDriverMutation } from "features/Driver/driverSlice";

const DriverTable = ({ driver }: any) => {
  const noresult = useRef<HTMLDivElement>(null);
  const teamList = useRef();
  const [brandList, setBrandList] = useState([]);
  const lottieRef3 = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredDriver = useMemo(() => {
    let filteredDrivers = driver;

    if (searchTerm) {
      filteredDrivers = filteredDrivers.filter(
        (driver: any) =>
          driver?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver?.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver?.phonenumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredDrivers;
  }, [driver, searchTerm]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = getFilteredDriver.slice(startIndex, endIndex);
  const totalPages = Math.ceil(getFilteredDriver.length / itemsPerPage);

  useEffect(() => {
    setBrandList(getFilteredDriver);
    setItemsPerPage(15);
  }, [getFilteredDriver]);

  const navigate = useNavigate();

  function tog_AddDriver() {
    navigate("/new-driver");
  }
  const [deleteDriver] = useDeleteDriverMutation();

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
          deleteDriver(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Driver is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Driver is safe :)",
            "info"
          );
        }
      });
  };

  return (
    <React.Fragment>
      <Row className="align-items-center mb-4">
        <Col xxl={3} lg={4} sm={9}>
          <div className="search-box mb-3 mb-sm-0">
            <input
              type="text"
              className="form-control"
              id="searchInputList"
              autoComplete="off"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <i className="ri-search-line search-icon"></i>
          </div>
        </Col>
        <Col sm={3} className="col-lg-auto ms-auto">
          <Button
            variant="success"
            onClick={() => tog_AddDriver()}
            className="w-100 btn-sm"
          >
            <i className="mdi mdi-account-plus me-1 align-middle fs-22"></i> Add
            Driver
          </Button>
        </Col>
      </Row>
      <Row
        className="d-flex justify-content-center row-cols-xxl-5 row-cols-lg-4 row-cols-sm-2 row-cols-1 gap-5"
        id="brand-list"
        ref={teamList}
      >
        {(paginatedData || []).map((item: Driver, key: number) => (
          <Card className="card brand-widget card-animate p-2" key={key}>
            <Link
              className="page-link"
              to={`/driver-details/${item.firstname}`}
              state={item}
            >
              <Card.Body>
                <div className="d-flex mb-4 align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={`${process.env.REACT_APP_BASE_URL}/driverFiles/profileImages/${item.profile_image}`}
                      alt={item.firstname}
                      className="avatar-lg rounded-circle"
                      id="profile_image"
                    />
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h4 className="card-title mb-1">
                      {item.firstname} {item.surname}
                    </h4>
                    <span>
                      <i className="mdi mdi-phone align-middle"></i>
                      {item.phonenumber}
                    </span>
                  </div>
                  {item.driverStatus === "Active" ? (
                    <p className="badge bg-success">Active</p>
                  ) : item.driverStatus === "Inactive" ? (
                    <p className="badge bg-danger">Inactive</p>
                  ) : item.driverStatus === "onRoad" ? (
                    <p className="badge bg-info">On Road</p>
                  ) : (
                    <p className="badge bg-warning">On Vacation</p>
                  )}
                </div>
                <div className="mb-3">
                  <span>
                    <i className="mdi mdi-email align-middle"></i> {item.email}
                  </span>
                </div>
                <div>
                  <p>
                    <b>Driving Licence: </b>
                    <span className="fw-meduim">
                      {item.driving_license_expiry}
                    </span>
                  </p>
                </div>
                <div className="mt-0">
                  <p>
                    <b>DQC:</b> {item.dqc_expiry}
                  </p>
                </div>
              </Card.Body>
            </Link>
            <Card.Footer className="p-2">
              <div
                className="btn-group btn-group-lg d-flex justify-content-center"
                role="group"
                aria-label="Basic example"
              >
                {" "}
                <Link to={`/driver-details/${item.firstname}`} state={item}>
                  <button type="button" className="btn btn-outline-info">
                    <i className="ri-eye-line ri-xl"></i>
                  </button>
                </Link>
                <Link to={`/edit-driver/${item.firstname}`} state={item}>
                  <button type="button" className="btn btn-outline-secondary">
                    <i className="ri-edit-2-line ri-xl"></i>
                  </button>
                </Link>
                {/* <Link to="#">
                  <button type="button" className="btn btn-outline-dark">
                    <i className="ri-settings-5-line ri-xl"></i>
                  </button>
                </Link> */}
                <Link to="#" onClick={() => AlertDelete(item?._id!)}>
                  <button type="button" className="btn btn-outline-danger">
                    <i className="ri-delete-bin-5-line ri-xl" />
                  </button>
                </Link>
              </div>
            </Card.Footer>
          </Card>
        ))}
      </Row>
      <div
        id="noresult"
        className=""
        ref={noresult}
        style={{ display: "none" }}
      >
        <div className="text-center py-4">
          <div className="avatar-md mx-auto mb-4">
            <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
              <i className="bi bi-search"></i>
            </div>
          </div>
          <h5 className="mt-2">Sorry! No Result Found</h5>
        </div>
      </div>
      <Row className="mb-4" id="pagination-element" style={{ display: "flex" }}>
        <Col lg={12}>
          <div className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
            <div
              className="page-item"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <Link to="#" className="page-link" id="page-prev">
                <i className="mdi mdi-chevron-left"></i>
              </Link>
            </div>
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              const isActive = pageNumber === currentPage;
              return (
                <span
                  id="page-num"
                  className="pagination"
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  <div className={isActive ? "page-item active" : "page-item"}>
                    <Link className="page-link clickPageNumber" to="#">
                      {" "}
                      {pageNumber}
                    </Link>
                  </div>
                </span>
              );
            })}
            <div
              className="page-item"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <Link to="#" className="page-link" id="page-next">
                <i className="mdi mdi-chevron-right"></i>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DriverTable;
