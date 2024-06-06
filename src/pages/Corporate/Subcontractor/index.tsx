import React, { useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  useBlockAffiliateMutation,
  useDeleteAffiliateMutation,
  useGetAllAffiliatesQuery,
  useRefuseAffiliateMutation,
  useUpdateAffiliateStatusMutation,
} from "features/Affiliate/affiliateSlice";
import Swal from "sweetalert2";

const Subcontractors = () => {
  document.title = "Affiliates | Bouden Coach Travel";
  const { data: AllAffiliates = [] } = useGetAllAffiliatesQuery();
  const [deleteVisitor] = useDeleteAffiliateMutation();
  const date = new Date();
  let randomstring = Math.random().toString(36).slice(0, 8);
  let affiliateLocation = useLocation();
  const [modal_AffiliateStatus, setModalAffiliateStatus] =
    useState<boolean>(false);
  const tog_ModalAffiliateStatus = () => {
    setModalAffiliateStatus(!modal_AffiliateStatus);
  };
  const [changeStatusMutation] = useUpdateAffiliateStatusMutation();
  const handleUpdate = async () => {
    changeStatusMutation({
      id: affiliateLocation?.state?._id!,
      login: affiliateLocation?.state?.name!,
      password: randomstring,
      service_date: date.toDateString(),
    }).then(() => setModalAffiliateStatus(!modal_AffiliateStatus));
  };

  const [refuseAffiliateMutation] = useRefuseAffiliateMutation();
  const handleRefuseAffiliate = async () => {
    refuseAffiliateMutation({
      id_aff: affiliateLocation?.state?._id!,
    }).then(() => setModalAffiliateStatus(!modal_AffiliateStatus));
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const [blockAffiliateMutation] = useBlockAffiliateMutation();
  const handleBlock = (id: any) => {
    blockAffiliateMutation({
      id_Affiliate: id,
    });
  };

  const AlertConfirm = async (id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are You Sure?",
        text: "You won't be able to go back !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, block it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          handleBlock(id);
          swalWithBootstrapButtons.fire(
            "Blocked !",
            "The Affiliate has been blocked.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "The Affiliate is safe :)",
            "info"
          );
        }
      });
  };

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
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteVisitor(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Affiliate is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Affiliate is safe :)",
            "info"
          );
        }
      });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Phone</span>,
      selector: (row: any) => row.phone,
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">Address</span>,
      selector: (row: any) => row.address,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Number of Fleet</span>,
      selector: (row: any) =>
        row?.fleetNumber === undefined ? (
          <span className="font-weight-meduim text-danger">No Number</span>
        ) : (
          <span>{row?.fleetNumber!}</span>
        ),
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">License Expiry</span>,
      selector: (row: any) => {
        const targetDate = new Date(row?.id_creation_date!);
        return date.getTime() >= targetDate.getTime() ? (
          <span className="text-danger">{row?.id_creation_date!}</span>
        ) : (
          <span>{row?.id_creation_date!}</span>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Insurance Expiry</span>,
      selector: (row: any) => {
        const targetDate = new Date(row?.insurance_date!);
        return date.getTime() >= targetDate.getTime() ? (
          <span className="text-danger">{row?.insurance_date!}</span>
        ) : (
          <span>{row?.insurance_date!}</span>
        );
      },
      sortable: true,
      width: "140px",
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (cell: any) => {
        switch (cell.statusAffiliate) {
          case "Pending":
            return (
              <span className="badge bg-warning"> {cell.statusAffiliate} </span>
            );
          case "Accepted":
            return (
              <span className="badge bg-info"> {cell.statusAffiliate} </span>
            );
          default:
            return (
              <span className="badge bg-dark"> {cell.statusAffiliate} </span>
            );
        }
      },
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      selector: (row: any) => row.enquiryDate,
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => (
        <ul className="hstack gap-2 list-unstyled mb-0">
          <li>
            <Link
              to="/affilaite_details"
              className="badge badge-soft-info edit-item-btn  fs-16"
              state={row}
            >
              <i className="ri-eye-line"></i>
            </Link>
          </li>
          {row.statusAffiliate === "Accepted" ? (
            <span className="badge badge-soft-dark edit-item-btn  fs-16">
              <i className="ri-check-double-line"></i>
            </span>
          ) : (
            <li>
              <Link
                to="#"
                className="badge badge-soft-secondary edit-item-btn fs-16"
                state={row}
                onClick={() => tog_ModalAffiliateStatus()}
              >
                <i className="ri-check-line"></i>
              </Link>
            </li>
          )}
          {(date.getTime() >= new Date(row?.id_creation_date!).getTime() ||
            date.getTime() >= new Date(row?.insurance_date!).getTime()) &&
          row.statusAffiliate! === "Accepted" ? (
            <li>
              <button
                title="Block Affiliate"
                type="button"
                className="btn btn-soft-warning btn-icon fs-10"
                onClick={() => AlertConfirm(row._id)}
              >
                <i className="ri-user-unfollow-line fs-20"></i>
              </button>
            </li>
          ) : (
            <li>
              <button
                title="New Quote"
                type="button"
                className="btn btn-soft-warning btn-icon fs-10"
                disabled
              >
                <i className="ri-user-unfollow-line fs-20"></i>
              </button>
            </li>
          )}
          <li>
            <Link
              to="#"
              className="badge badge-soft-success edit-item-btn  fs-16"
            >
              <i className="ri-edit-2-line"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="badge badge-soft-danger remove-item-btn  fs-16"
              onClick={() => AlertDelete(row?._id!)}
            >
              <i className="ri-delete-bin-2-line"></i>
            </Link>
          </li>
        </ul>
      ),
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Affiliates" pageTitle="Contacts" />
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
              <div className="table-responsive table-card">
                <DataTable columns={columns} data={AllAffiliates} pagination />
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
        {/* Modal To Assign Driver */}
        <Modal
          className="fade zoomIn"
          size="lg"
          show={modal_AffiliateStatus}
          onHide={() => {
            tog_ModalAffiliateStatus();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h4 className="modal-title" id="exampleModalLabel">
              Affiliate
            </h4>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Name</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.name!}</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Phone</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.phone!}</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Address</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.address!}</h6>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Area of Coverage</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.coverageArea?.placeName!}</h6>
                </div>
              </Col>
            </Row> */}
            {/* <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Coverage Zone</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.coverageDistance!} miles</h6>
                </div>
              </Col>
            </Row> */}
            {/* <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Fleet Number</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.fleetNumber!}</h6>
                </div>
              </Col>
            </Row> */}
            {/* <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Vehicles</h5>
                </div>
              </Col>
            </Row> */}
            <Row>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-soft-danger"
                    data-bs-dismiss="modal"
                    onClick={() => handleRefuseAffiliate()}
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Refuse
                  </Button>
                  <Button
                    className="btn-soft-success"
                    id="add-btn"
                    type="submit"
                    onClick={() => handleUpdate()}
                  >
                    <i className="ri-check-line align-bottom me-1"></i> Accept
                  </Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Subcontractors;
