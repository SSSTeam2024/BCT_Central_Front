import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";

const OfferDetails = () => {
  document.title = "Offer Details | Coach Hire Network";

  const navigate = useNavigate();
  const location = useLocation();
  const offer_details = location.state;
  function tog_AddOffer() {
    navigate("/new-offer");
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Offer Details" pageTitle="Suggested Routes" />
          <Row className="mb-4 align-items-center">
            <Col>
              <h6 className="fs-18 mb-0">Name: {offer_details.name}</h6>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className="card bg-success bg-opacity-10 border-0">
                <div className="card-body mb-4">
                  {offer_details.school_id !== null && (
                    <div className="d-flex gap-3">
                      <div className="flex-grow-1">
                        <h6 className="fs-18 mb-3">Corporate</h6>
                        <p className="mb-1 fw-medium">
                          {offer_details?.school_id?.name!}
                        </p>
                        <p className="mb-1">
                          {offer_details?.school_id?.email!}
                        </p>
                        <p className="mb-0">
                          {offer_details?.school_id?.phone!}
                        </p>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <div className="avatar-title bg-success-subtle text-success rounded fs-3">
                          <i className="ph-graduation-cap"></i>
                        </div>
                      </div>
                    </div>
                  )}
                  {offer_details.company_id !== null && (
                    <div className="d-flex gap-3">
                      <div className="flex-grow-1">
                        <h6 className="fs-18 mb-3">Corporate</h6>
                        <p className="mb-1 fw-medium">
                          {offer_details?.company_id?.name!}
                        </p>
                        <p className="mb-1">
                          {offer_details?.company_id?.email!}
                        </p>
                        <p className="mb-0">
                          {offer_details?.company_id?.phone!}
                        </p>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <div className="avatar-title bg-success-subtle text-success rounded fs-3">
                          <i className="ph-buildings"></i>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="vstack">
                <div className="card bg-primary bg-opacity-10 border-0">
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className="flex-grow-1">
                        <h6 className="fs-18 mb-3">Pickup</h6>
                        <p className="mb-0">{offer_details?.pick_up!}</p>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <div className="avatar-title bg-primary-subtle text-primary rounded fs-3">
                          <i className="ph-map-pin"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card bg-info bg-opacity-10 border-0">
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className="flex-grow-1">
                        <h6 className="fs-18 mb-3">Destination</h6>
                        <p className="mb-0">{offer_details?.destination!}</p>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <div className="avatar-title bg-info-subtle text-info rounded fs-3">
                          <i className="ph-path"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => tog_AddOffer()}
                    className="add-btn btn-sm bg-dark bg-opacity-10 border-0 text-dark"
                  >
                    <i className="mdi mdi-bullhorn me-1 align-middle fs-22"></i>{" "}
                    Add New Offer
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xxl={12}>
              <Card>
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table align-middle table-nowrap mb-0">
                      <thead className="text-muted table-light">
                        <tr>
                          <th scope="col">Contract</th>
                          <th scope="col">Vehicle</th>
                          <th scope="col">Driver</th>
                          <th scope="col">Cost</th>
                          <th scope="col">Offer Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{offer_details?.contract_id?.contractName!}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                <img
                                  src={`${
                                    process.env.REACT_APP_BASE_URL
                                  }/VehicleFiles/vehicleImages/${offer_details
                                    ?.vehicle_id?.vehicle_images[0]!}`}
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1">
                                {
                                  offer_details?.vehicle_id
                                    ?.registration_number!
                                }
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="text-secondary">
                              {offer_details?.driver_id?.firstname}{" "}
                              {offer_details?.driver_id?.surname}
                            </span>
                          </td>

                          <td>£ {offer_details?.cost!}</td>
                          <td>{offer_details?.offer_number!}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OfferDetails;
