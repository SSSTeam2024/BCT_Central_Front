import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import avatar1 from "assets/images/users/avatar-1.jpg";
import img4 from "assets/images/small/img-4.jpg";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

const bookmarkProduct = (e: any) => {
  const ele = e.target.closest("button");
  if (ele.classList.contains("active")) {
    ele.classList.remove("active");
  } else {
    ele.classList.add("active");
  }
};

const LoadingContainer = () => <div>Loading...</div>;

const SubcontractorDetails = (props: any) => {
  document.title = "Affiliate Details | Bouden Coach Travel";
  const LocationSubContractor = useLocation();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Card className="border-0 shadow-none mb-0">
                    <Card.Body className="pt-0">
                      <Row className="justify-content-between gy-4">
                        <Col
                          xl={3}
                          md={5}
                          className="order-last order-lg-first"
                        >
                          <div className="text-end text-lg-start">
                            <p className="text-muted fw-medium mb-2">Region</p>
                            <ul className="list-inline mb-4">
                              <li className="list-inline-item">
                                <span className="badge badge-soft-info">
                                  {LocationSubContractor.state.supplier}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="text-end text-lg-start">
                            <p className="text-muted fw-medium mb-2">Type</p>
                            <ul className="list-inline mb-4">
                              <li className="list-inline-item">
                                <span>{LocationSubContractor.state.type}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="text-end text-lg-start">
                            <p className="text-muted fw-medium mb-2">
                              Joining Date
                            </p>
                            <ul className="list-inline mb-4">
                              <li className="list-inline-item">
                                <span>
                                  {LocationSubContractor.state.joiningDate}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="text-end text-lg-start">
                            <p className="text-muted fw-medium mb-2">
                              Emails sent
                            </p>
                            <ul className="list-inline mb-4">
                              <li className="list-inline-item">
                                <span>22</span>
                              </li>
                            </ul>
                          </div>
                          <div className="text-end text-lg-start">
                            <p className="text-muted fw-medium mb-2">
                              Bids sent
                            </p>
                            <ul className="list-inline mb-4">
                              <li className="list-inline-item">
                                <span>42</span>
                              </li>
                            </ul>
                          </div>
                          <div className="text-end text-lg-start">
                            <p className="text-muted fw-medium mb-2">
                              Bids received
                            </p>
                            <ul className="list-inline mb-4">
                              <li className="list-inline-item">
                                <span>2</span>
                              </li>
                            </ul>
                          </div>
                          <div className="text-end text-lg-start">
                            <p className="text-muted fw-medium mb-2">
                              Vehicles
                            </p>
                            <ul className="d-flex gap-2 flex-wrap list-unstyled mb-0 justify-content-end justify-content-lg-start">
                              <li>
                                <span className="badge badge-soft-dark">
                                  {LocationSubContractor.state.vehicles}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </Col>
                        <Col xl={5} md={7} className="text-end">
                          <h5 className="fs-17">
                            {LocationSubContractor.state.orderId}
                          </h5>
                          {LocationSubContractor.state.order_date ===
                          "Active" ? (
                            <span className="badge badge-soft-success text-uppercase">
                              Active
                            </span>
                          ) : (
                            <span className="badge badge-soft-danger text-uppercase">
                              Inactive
                            </span>
                          )}

                          <div className="mb-3 text-muted">
                            <i className="bi bi-geo-alt"></i>{" "}
                            {LocationSubContractor.state.shipment_no}
                          </div>
                          <p>{LocationSubContractor.state.location}</p>
                          <p>{LocationSubContractor.state.customer_name}</p>
                          <div className="mb-3 text-muted">
                            <i className="bi bi-globe"></i>{" "}
                            {LocationSubContractor.state.website}
                          </div>

                          <div
                            id="gmaps-types"
                            className="gmaps mt-2"
                            style={{ position: "relative" }}
                          >
                            <Map
                              google={props.google}
                              zoom={13}
                              style={{ height: "110%", width: "100%" }}
                              initialCenter={{
                                lat: 52.5244734,
                                lng: -1.9857876,
                              }}
                            >
                              <Marker
                                position={{
                                  lat: 52.5471571,
                                  lng: -1.9042587,
                                }}
                              />
                            </Map>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
  LoadingContainer: LoadingContainer,
  v: "3",
})(SubcontractorDetails);
