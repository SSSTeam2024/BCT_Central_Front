import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import avtar1 from "assets/images/users/avatar-1.jpg";
import { useDeleteTeamMutation } from "features/Team/teamSlice";
import Swal from "sweetalert2";

const TeamTable = ({ team }: any) => {
  const noresult: any = useRef();
  const teamList: any = useRef();
  const [brandList, setBrandList] = useState([]);
  const [show, setShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = brandList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(brandList.length / itemsPerPage);

  useEffect(() => {
    setBrandList(team);
    setItemsPerPage(15);
  }, [team]);

  const handleSearchClick = (event: any) => {
    setCurrentPage(1);
    let inputVal = event.toLowerCase();

    const filterItems = (arr: any, query: any) => {
      return arr.filter((el: any) => {
        return el.brandName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    };

    let filterData = filterItems(team, inputVal);
    setBrandList(filterData);
    if (filterData.length === 0) {
      noresult.current.style.display = "block";
      teamList.current.style.display = "none";
    } else {
      noresult.current.style.display = "none";
      // teamList.current.style.display = "block";
    }
  };

  const navigate = useNavigate();

  function tog_AddTeam() {
    navigate("/new-team");
  }

  const [deleteTeam] = useDeleteTeamMutation();

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
        text: "ou won't be able to go back?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteTeam(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Team Member is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Team Member is safe :)",
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
              onChange={(e: any) => handleSearchClick(e.target.value)}
              type="text"
              className="form-control"
              id="searchInputList"
              autoComplete="off"
              placeholder="Search teams..."
            />
            <i className="ri-search-line search-icon"></i>
          </div>
        </Col>
        <Col sm={3} className="col-lg-auto ms-auto">
          <Button
            variant="success"
            onClick={() => tog_AddTeam()}
            className="w-100 btn-sm"
          >
            <i className="mdi mdi-account-multiple-plus me-1 align-middle fs-22"></i>{" "}
            Add Team
          </Button>
        </Col>
      </Row>

      <Row
        className="d-flex justify-content-center row-cols-xxl-5 row-cols-lg-4 row-cols-sm-2 row-cols-1 gap-5"
        id="brand-list"
        ref={teamList}
      >
        {(paginatedData || []).map((item: any, key: number) => (
          <Col key={key}>
            <Card>
              <Link
                className="page-link"
                to={`/team-details/${item.firstName}`}
                state={item}
              >
                <Card.Header>
                  <div className="d-flex justify-content-between">
                    <h6 className="card-title mb-0">
                      {item.firstName} {item.lastName}
                    </h6>
                    {item.statusTeam === "Active" ? (
                      <span className="badge badge-soft-success text-uppercase">
                        Active
                      </span>
                    ) : item.statusTeam === "Inactive" ? (
                      <span className="badge badge-soft-danger text-uppercase">
                        Inactive
                      </span>
                    ) : item.statusTeam === "Annual vacation" ? (
                      <span className="badge badge-soft-warning text-uppercase">
                        Annual vacation
                      </span>
                    ) : (
                      <span className="badge badge-soft-info text-uppercase">
                        {" "}
                        Exceptional vacation
                      </span>
                    )}
                  </div>
                  <span>
                    {item.access_level === "Visitor Jobs" ? (
                      <span className="badge badge-soft-info text-uppercase">
                        Visitor Jobs
                      </span>
                    ) : item.access_level === "Corporate Jobs" ? (
                      <span className="badge badge-soft-secondary text-uppercase">
                        Corporate Jobs
                      </span>
                    ) : (
                      <span className="badge badge-soft-dark text-uppercase">
                        Admin
                      </span>
                    )}
                  </span>
                </Card.Header>
                <Card.Body className="p-4 text-center">
                  <div className="mx-auto avatar-md mb-3">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/teamFiles/avatarImages/${item.avatar}`}
                      alt=""
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <h5 className="card-title mb-1">
                    {item.firstName} {item.lastName}
                  </h5>
                  <p className="text-muted mb-0">{item.email}</p>
                  <p className="text-muted mb-0">{item.phone}</p>
                </Card.Body>
              </Link>
              <Card.Footer>
                <div
                  className="btn-group btn-group-lg d-flex justify-content-center"
                  role="group"
                  aria-label="Basic example"
                >
                  {" "}
                  <Link to={`/team-details/${item.firstName}`} state={item}>
                    <button type="button" className="btn btn-outline-info">
                      <i className="ri-eye-line ri-xl"></i>
                    </button>
                  </Link>
                  <Link to="#">
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="ri-edit-2-line ri-xl"></i>
                    </button>
                  </Link>
                  <Link to="#">
                    <button type="button" className="btn btn-outline-dark">
                      <i className="ri-settings-5-line ri-xl"></i>
                    </button>
                  </Link>
                  <Link to="#" onClick={() => AlertDelete(item?._id!)}>
                    <button type="button" className="btn btn-outline-danger">
                      <i className="ri-delete-bin-5-line ri-xl" />
                    </button>
                  </Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default TeamTable;
