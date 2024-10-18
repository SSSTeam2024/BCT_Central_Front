import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation } from "react-router-dom";

import productImg1 from "../../../../assets/images/products/img-1.png";
import productImg2 from "../../../../assets/images/products/img-2.png";
import productImg3 from "../../../../assets/images/products/img-3.png";
import productImg5 from "../../../../assets/images/products/img-5.png";

const TripModelDetails = () => {
  document.title = "Trip Model Details | Coach Hire Network";

  const LocationTripModel = useLocation();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Trip Model Details" pageTitle="Management" />
          <Col xxl={12} lg={12}>
            <Card>
              <Card.Header>
                <h6 className="card-title mb-0">
                  Offer{" "}
                  <span className="text-secondary">
                    {LocationTripModel.state.srNo}
                  </span>
                </h6>
              </Card.Header>
              <Card.Body>
                <h6 className="card-title">What planning process needs ?</h6>
                <p className="card-text text-muted mb-0">
                  Intrinsically incubate intuitive opportunities and real-time
                  potentialities for change for interoperable meta-services
                  itself or distract the viewer's attention from the layout.
                </p>
              </Card.Body>
              <div className="card-footer">
                <Link to="#" className="link-success float-end">
                  Payment Now{" "}
                  <i className="ri-arrow-right-s-line align-middle ms-1 lh-1"></i>
                </Link>
                <p className="text-muted mb-0">5 days Left</p>
              </div>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TripModelDetails;
