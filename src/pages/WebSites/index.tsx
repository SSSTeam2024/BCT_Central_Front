import React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useGetAllHeadersQuery } from "features/header/headerSlice";
import { useGetMenusQuery } from "features/menu/menuSlice";
import { useGetOurValueQuery } from "features/OurValuesComponent/ourValuesSlice";
import { useGetOfferServiceQuery } from "features/OffreServicesComponent/offreServicesSlice";

const WebSites = () => {
  document.title = "Web Site Settings | Coach Hire Network";
  const { data = [] } = useGetAllHeadersQuery();
  const { data: AllMenu = [] } = useGetMenusQuery();
  const { data: AllOurValues = [] } = useGetOurValueQuery();
  const { data: AllOffers = [] } = useGetOfferServiceQuery();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Web Site Settings" pageTitle="Management" />
          <Col lg={12}>
            <Card>
              <Card.Header className="border-0">
                <Row>
                  <Col className="text-end">
                    <Link
                      type="button"
                      to="/website-page"
                      className="btn btn-primary"
                      // onClick={() => setAddNewCardForm(!addNewCardForm)}
                    >
                      <span className="icon-on">
                        <i className="ri-add-line align-bottom"></i> New Page
                      </span>
                    </Link>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xxl={3}>
                    <Card className="border card-border-primary">
                      <Card.Header>
                        <Link
                          to="/website-header"
                          className="link-primary fw-medium float-end"
                          state={data[0]}
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title mb-0">Header</h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-success">
                      <Card.Header>
                        <Link
                          to="/website-menu"
                          className="link-success fw-medium float-end"
                          state={AllMenu[0]}
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title mb-0">Menu</h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-info">
                      <Card.Header>
                        <Link
                          to="/website-footer-list"
                          className="link-info fw-medium float-end"
                          state={AllMenu[0]}
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title mb-0">Footer List</h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-secondary">
                      <Card.Header>
                        <Link
                          to="/website-social-media"
                          className="link-secondary fw-medium float-end"
                          state={AllMenu[0]}
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title text-secondary text-opacity-25 mb-0">
                          Social Media
                        </h6>
                      </Card.Header>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xxl={3}>
                    <Card className="border card-border-dark">
                      <Card.Header>
                        <Link
                          to="/website-about-us"
                          className="link-dark fw-medium float-end"
                          state={AllMenu[0]}
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title mb-0">About Us</h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-danger">
                      <Card.Header>
                        <Link
                          to="/website-our-values"
                          className="link-danger fw-medium float-end"
                          state={AllOurValues[0]}
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title mb-0">Our Values</h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-warning">
                      <Card.Header>
                        <Link
                          to="/website-services-offer"
                          className="link-warning fw-medium float-end"
                          state={AllOffers[0]}
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title mb-0">Services Offer</h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-primary">
                      <Card.Header>
                        <Link
                          to="/website-our-missions"
                          className="link-primary fw-medium float-end "
                          state={AllOffers[0]}
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title text-primary text-opacity-50 mb-0">
                          Our Missions
                        </h6>
                      </Card.Header>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xxl={3}>
                    <Card className="border card-border-secondary">
                      <Card.Header>
                        <Link
                          to="/website-why-choose-us"
                          className="link-secondary fw-medium float-end"
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title text-secondary text-opacity-50 mb-0">
                          Why Choose Us
                        </h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-info">
                      <Card.Header>
                        <Link
                          to="/website-services-block-1"
                          className="link-info fw-medium float-end"
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title text-info text-opacity-50 mb-0">
                          Services Block 1
                        </h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-success">
                      <Card.Header>
                        <Link
                          to="/website-vehicles-guide"
                          className="link-success fw-medium float-end"
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title text-success text-opacity-50 mb-0">
                          Vehicle Guide
                        </h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-danger">
                      <Card.Header>
                        <Link
                          to="/website-vehicle-classes"
                          className="link-danger fw-medium float-end"
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title text-danger text-opacity-50 mb-0">
                          Vehicle Classes
                        </h6>
                      </Card.Header>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xxl={3}>
                    <Card className="border card-border-warning">
                      <Card.Header>
                        <Link
                          to="/website-fleet"
                          className="link-warning fw-medium float-end"
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title text-warning text-opacity-50 mb-0">
                          Fleet
                        </h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-dark">
                      <Card.Header>
                        <Link
                          to="/website-on-the-road"
                          className="link-dark fw-medium float-end"
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title text-dark text-opacity-50 mb-0">
                          On The Road
                        </h6>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xxl={3}>
                    <Card className="border card-border-secondary">
                      <Card.Header>
                        <Link
                          to="/website-in-the-press"
                          className="link-secondary fw-medium float-end"
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </Link>
                        <h6 className="card-title text-secondary text-opacity-75 mb-0">
                          In The Press
                        </h6>
                      </Card.Header>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default WebSites;
