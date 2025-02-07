import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Image,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import BreadCrumb from "Common/BreadCrumb";
import { useGetOurValueQuery } from "features/OurValuesComponent/ourValuesSlice";
import { useGetAllOurMissionsQuery } from "features/OurMissionsComponent/ourMissionsSlice";
import { useGetAboutUsComponentsQuery } from "features/AboutUsComponent/aboutUsSlice";
import { useGetOfferServiceQuery } from "features/OffreServicesComponent/offreServicesSlice";
import { useGetVehicleGuidesQuery } from "features/vehicleGuideComponent/vehicleGuideSlice";
import { useGetVehicleClassQuery } from "features/VehicleClassComponent/vehicleClassSlice";
import { Link } from "react-router-dom";

const OurComponents = () => {
  document.title = "Web Site Our Components | Coach Hire Network";

  const { data = [] } = useGetOurValueQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOffers = [] } = useGetOfferServiceQuery();
  const { data: AllVehiclesGuide = [] } = useGetVehicleGuidesQuery();
  const { data: AllVehicleClasses = [] } = useGetVehicleClassQuery();

  const [selectedSection, setSelectedSection] = useState<string>("about");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Our Components" pageTitle="Web Site Settings" />
          <Card className="p-3">
            <Row>
              <Col lg={3}>
                <Card>
                  <div data-simplebar style={{ maxHeight: "215px" }}>
                    <ul className="list-group">
                      <li
                        className={`${
                          selectedSection === "about"
                            ? "list-group-item bg-light"
                            : "list-group-item"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedSection("about")}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <div className="d-flex">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-info-subtle text-info rounded">
                                  <i className="ph ph-warning-octagon"></i>
                                </div>
                              </div>
                              <div className="flex-shrink-0 ms-2">
                                <h6 className="fs-14 mb-0">Know Us More</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className={`${
                          selectedSection === "values"
                            ? "list-group-item bg-light"
                            : "list-group-item"
                        }`}
                        onClick={() => setSelectedSection("values")}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <div className="d-flex">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-success-subtle text-success rounded">
                                  <i className="ph ph-sketch-logo"></i>
                                </div>
                              </div>
                              <div className="flex-shrink-0 ms-2">
                                <h6 className="fs-14 mb-0">Our Values</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className={`${
                          selectedSection === "missions"
                            ? "list-group-item bg-light"
                            : "list-group-item"
                        }`}
                        onClick={() => setSelectedSection("missions")}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <div className="d-flex">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-primary-subtle text-primary rounded">
                                  <i className="ph ph-target"></i>
                                </div>
                              </div>
                              <div className="flex-shrink-0 ms-2">
                                <h6 className="fs-14 mb-0">Our Missions</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className={`${
                          selectedSection === "offers"
                            ? "list-group-item bg-light"
                            : "list-group-item"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedSection("offers")}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <div className="d-flex">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-secondary-subtle text-secondary rounded">
                                  <i className="ri-hand-heart-line"></i>
                                </div>
                              </div>
                              <div className="flex-shrink-0 ms-2">
                                <h6 className="fs-14 mb-0">Services Offer</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className={`${
                          selectedSection === "vehicle_types"
                            ? "list-group-item bg-light"
                            : "list-group-item"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedSection("vehicle_types")}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <div className="d-flex">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-dark-subtle text-dark rounded">
                                  <i className="ph ph-bus"></i>
                                </div>
                              </div>
                              <div className="flex-shrink-0 ms-2">
                                <h6 className="fs-14 mb-0">Vehicles Types</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className={`${
                          selectedSection === "vehicle_classes"
                            ? "list-group-item bg-light"
                            : "list-group-item"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedSection("vehicle_classes")}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <div className="d-flex">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-warning-subtle text-warning rounded">
                                  <i className="ph ph-car-simple"></i>
                                </div>
                              </div>
                              <div className="flex-shrink-0 ms-2">
                                <h6 className="fs-14 mb-0">Vehicle Classes</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Card>
              </Col>
              <Col>
                <Card>
                  {selectedSection === "about" && (
                    <div className="hstack gap-2 p-4">
                      <div className="vstack gap-2">
                        <Image
                          src={`${
                            process.env.REACT_APP_BASE_URL
                          }/aboutUs/${aboutUsData[0]?.image?.path!}`}
                          alt=""
                          className="rounded"
                          width="320"
                        />
                      </div>
                      <span
                        className="bg-danger text-white"
                        style={{
                          borderRadius: "50%",
                          fontSize: "50px",
                          lineHeight: "80px",
                        }}
                      >
                        <i className="bx bxs-quote-alt-left bx-tada"></i>
                      </span>
                      <div className="vstack gap-3">
                        <div className="hstack gap-2">
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: "13px",
                              fontWeight: 600,
                              marginBottom: "10px",
                              marginTop: "-8px",
                              color: "#CD2528",
                            }}
                          >
                            {aboutUsData[0]?.littleTitle?.name!}
                          </span>
                        </div>
                        <div className="hstack gap-2">
                          <h2 className="h2-with-after">
                            {aboutUsData[0]?.bigTitle?.name!}
                          </h2>
                        </div>
                        <div className="hstack gap-2">
                          <span>{aboutUsData[0]?.paragraph?.content!}</span>
                        </div>
                        <div className="hstack gap-2">
                          <button
                            type="button"
                            style={{ width: "100px" }}
                            className="btn btn-danger btn-animation"
                            data-text={`${aboutUsData[0]?.button?.label!}`}
                          >
                            <span>{aboutUsData[0]?.button?.label!}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedSection === "missions" && (
                    <div className="hstack gap-2 p-4">
                      <div className="vstack gap-3">
                        <div className="hstack gap-2">
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: "13px",
                              fontWeight: 600,
                              marginBottom: "10px",
                              marginTop: "-8px",
                              color: "#CD2528",
                            }}
                          >
                            {AllOurMissions[0].missions[0].littleTitle.name}
                          </span>
                        </div>
                        <div className="hstack gap-2">
                          <h2 className="h2-with-after">
                            {AllOurMissions[0].missions[0].bigTitle.name}
                          </h2>
                        </div>
                        <div className="hstack gap-2">
                          <span>{AllOurMissions[0].missions[0].content}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedSection === "values" && (
                    <>
                      <Row className="d-flex justify-content-center p-4">
                        <div className="vstack gap-2">
                          <div className="hstack gap-2 justify-content-center">
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#CD2528",
                              }}
                            >
                              {data[0].littleTitle.name}
                            </span>
                          </div>
                          <div className="hstack gap-2 justify-content-center">
                            <h2 className="h2-with-after">
                              {data[0].bigTitle.name}
                            </h2>
                          </div>
                        </div>
                      </Row>
                      <Row className="p-4 mb-3">
                        <Col lg={3} className="d-flex justify-content-end">
                          <div className="hstack gap-2">
                            <div className="vstack gap-2">
                              <Image
                                src={`${process.env.REACT_APP_BASE_URL}/ourValue/${data[0]?.image.path}`}
                                alt=""
                                className="rounded"
                                width="280"
                              />
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <Card className="border-0">
                            <Card.Body>
                              <Tab.Container
                                defaultActiveKey={data[0].tabs[0]?.title}
                              >
                                <Nav
                                  as="ul"
                                  variant="tabs"
                                  className="nav-tabs-custom nav-success nav-justified mb-3"
                                >
                                  {data[0].tabs.map((tab, index) => (
                                    <Nav.Item as="li" key={index}>
                                      <div className="d-flex align-items-center">
                                        <Nav.Link
                                          eventKey={tab.title}
                                          className="d-flex align-items-center"
                                        >
                                          {tab.title}
                                        </Nav.Link>
                                      </div>
                                    </Nav.Item>
                                  ))}
                                </Nav>
                                <Tab.Content className="text-muted">
                                  {data[0].tabs.map((tab, index) => (
                                    <Tab.Pane eventKey={tab.title} key={index}>
                                      <div className="d-flex">
                                        <div className="flex-grow-1 ms-2">
                                          <div className="d-flex align-items-center">
                                            {tab.content}
                                          </div>
                                        </div>
                                      </div>
                                    </Tab.Pane>
                                  ))}
                                </Tab.Content>
                              </Tab.Container>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </>
                  )}
                  {selectedSection === "offers" && (
                    <>
                      <Row className="d-flex justify-content-center p-2">
                        <div className="vstack gap-2">
                          <div className="hstack gap-2 justify-content-center">
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#CD2528",
                              }}
                            >
                              {AllOffers[0].littleTitle.name}
                            </span>
                          </div>
                          <div className="hstack gap-2 justify-content-center">
                            <h2 className="h2-with-after">
                              {AllOffers[0].bigTitle.name}
                            </h2>
                          </div>
                        </div>
                      </Row>
                      <Row className="p-2">
                        {AllOffers[0].cards.map((card, index) => (
                          <Col lg={4}>
                            <Card
                              className="single-service"
                              key={index}
                              style={{
                                backgroundImage: `${process.env.REACT_APP_BASE_URL}/offerService/${card?.image}`,
                              }}
                            >
                              <div className="hstack gap-2 d-flex justify-content-center">
                                <h5>{card.title}</h5>
                              </div>

                              <div className="hstack gap-2 d-flex justify-content-center">
                                <p>{card.content}</p>
                              </div>

                              <div className="vstack gap-3" key={index}>
                                <h6>Font Image</h6>

                                <Image
                                  src={`${process.env.REACT_APP_BASE_URL}/offerService/${card?.image}`}
                                  alt=""
                                  className="rounded"
                                  width="160"
                                />
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}
                  {selectedSection === "vehicle_types" && (
                    <div>
                      <Row className="mb-3">
                        <div className="vstack gap-2">
                          <div className="hstack gap-2">
                            <p>{AllVehiclesGuide[0].paragraph}</p>
                          </div>
                        </div>
                      </Row>
                      <Tab.Container
                        defaultActiveKey={`v-pills-${AllVehiclesGuide[0].vehicleType[0]?.title
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        <Row>
                          <Col md={3}>
                            <Nav
                              variant="pills"
                              className="flex-column text-center"
                              id="v-pills-tab"
                              aria-orientation="vertical"
                            >
                              {AllVehiclesGuide[0].vehicleType.map(
                                (vt: any, index: any) => (
                                  <Nav.Link
                                    key={index}
                                    eventKey={`v-pills-${vt.title
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}`}
                                    className="mb-2"
                                  >
                                    <div className="hstack gap-1">
                                      <span>{vt.title}</span>
                                    </div>
                                  </Nav.Link>
                                )
                              )}
                            </Nav>
                          </Col>
                          <Col md={9}>
                            <Tab.Content
                              className="text-muted mt-4 mt-md-0"
                              id="v-pills-tabContent"
                            >
                              {AllVehiclesGuide[0].vehicleType.map(
                                (vt, index) => (
                                  <Tab.Pane
                                    key={index}
                                    eventKey={`v-pills-${vt.title
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}`}
                                  >
                                    <div className="hstack gap-2 mb-3">
                                      <p>{vt.content}</p>
                                    </div>
                                    <div className="d-flex mb-2">
                                      <div className="flex-shrink-0">
                                        <Image
                                          src={`${process.env.REACT_APP_BASE_URL}/VehicleGuide/${vt?.image}`}
                                          alt=""
                                          width="150"
                                          className="rounded"
                                        />
                                      </div>
                                    </div>
                                  </Tab.Pane>
                                )
                              )}
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </div>
                  )}
                  {selectedSection === "vehicle_classes" && (
                    <>
                      <Row className="p-3">
                        <div className="d-flex justify-content-center hstack gap-3">
                          <h2>{AllVehicleClasses[0].bigTitle}</h2>
                        </div>

                        <div className="hstack gap-3 mb-3">
                          <p>{AllVehicleClasses[0].paragraph}</p>
                        </div>
                      </Row>
                      <Row className="p-3">
                        {AllVehicleClasses[0].vehicleTypes.map((vt, index) => (
                          <Col lg={3} key={index}>
                            <Card className="border-danger">
                              <Link
                                to={`${vt.link}`}
                                className="d-flex justify-content-center p-2 text-danger"
                              >
                                <div className="hstack gap-2 align-middle">
                                  <i className={`${vt.icon} fs-18`}></i>

                                  <span>{vt.title}</span>
                                </div>
                              </Link>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}
                </Card>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OurComponents;
