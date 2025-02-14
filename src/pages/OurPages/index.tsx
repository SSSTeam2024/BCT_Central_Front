import React, { useState } from "react";
import { Card, Col, Image, Nav, Row, Tab } from "react-bootstrap";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import SimpleBar from "simplebar-react";
import {
  useAddNewAboutUsComponentMutation,
  useGetAboutUsComponentsQuery,
} from "features/AboutUsComponent/aboutUsSlice";
import {
  useAddNewOurMissionMutation,
  useGetAllOurMissionsQuery,
} from "features/OurMissionsComponent/ourMissionsSlice";
import {
  useCreateOurValueMutation,
  useGetOurValueQuery,
} from "features/OurValuesComponent/ourValuesSlice";
import {
  useAddServiceOfferMutation,
  useGetOfferServiceQuery,
} from "features/OffreServicesComponent/offreServicesSlice";
import { useGetBestOffersQuery } from "features/bestOfferComponent/bestOfferSlice";
import BestOffer from "pages/BestOffer";
import OfferServices from "pages/OfferServices";
import OurValues from "pages/OurValues";
import OurMissions from "pages/OurMissions";
import AboutUs from "pages/AboutUs";
import {
  useAddNewTermConditionMutation,
  useGetTermsConditionsQuery,
} from "features/TermsConditionsComponent/termsCoditionSlice";
import TermsConditions from "pages/TermsConditions";
import { useGetVehicleClassQuery } from "features/VehicleClassComponent/vehicleClassSlice";
import VehiclesClassComponent from "pages/VehiclesClassComponent";
import { useGetVehicleGuidesQuery } from "features/vehicleGuideComponent/vehicleGuideSlice";
import VehicleGuideComponent from "pages/VehicleGuideComponent";
import { useGetAllFleetQuery } from "features/FleetComponent/fleetSlice";
import FleetComponent from "pages/FleetComponent";
import { useGetAllInThePressQuery } from "features/InThePressComponent/inThePressSlice";
import InThePress from "pages/InThePress";

const OurPages = () => {
  document.title = "Web Site Our Pages | Coach Hire Network";

  const { data: AllPages = [] } = useGetAllPagesQuery();
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllBestOffers = [] } = useGetBestOffersQuery();
  const { data: AllTermsConditions = [] } = useGetTermsConditionsQuery();
  const { data: AllVehicleClasses = [] } = useGetVehicleClassQuery();
  const { data: AllVehicleGuide = [] } = useGetVehicleGuidesQuery();
  const { data: AllFleet = [] } = useGetAllFleetQuery();
  const { data: AllInThePress = [] } = useGetAllInThePressQuery();

  const [createNewAboutUs] = useAddNewAboutUsComponentMutation();
  const [createNewOurMission] = useAddNewOurMissionMutation();
  const [createNewOurValue] = useCreateOurValueMutation();
  const [createNewServiceOffer] = useAddServiceOfferMutation();
  const [createNewTermCondition] = useAddNewTermConditionMutation();

  const [selectedPage, setSelectedPage] = useState<string>("about.html");
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<string>("");

  const handleSelectedComponent = (e: any) => {
    const value = e.target.value;
    setSelectedComponent(value);
  };
  const handleSelectedOrder = (e: any) => {
    const value = e.target.value;
    setSelectedOrder(value);
  };
  const [newSection, setNewSection] = useState<boolean>(false);

  const filtredAboutUsData = aboutUsData.filter(
    (aboutUs) => aboutUs.page === selectedPage
  );

  const filtredInThePressData = AllInThePress.filter(
    (inThePress) => inThePress.page === selectedPage
  );

  const filtredVehicleGuideData = AllVehicleGuide.filter(
    (vehicleGuide) => vehicleGuide.page === selectedPage
  );

  const filtredOurMissionsData = AllOurMissions.flatMap((missionCollection) =>
    missionCollection.missions.filter(
      (mission) => mission.page === selectedPage
    )
  );

  const filtredOurValuesData = AllValues.filter(
    (ourValue) => ourValue.page === selectedPage
  );

  const filtredOfferServicesData = AllOfferServices.filter(
    (ourValue) => ourValue.associatedPage === selectedPage
  );

  const filtredBestOfferData = AllBestOffers.filter(
    (ourValue) => ourValue.page === selectedPage
  );

  const filtredTermsConditionData = AllTermsConditions.filter(
    (term) => term.page === selectedPage
  );

  const filtredVehiclesClassesData = AllVehicleClasses.filter(
    (vehicleClasse) => vehicleClasse.page === selectedPage
  );

  const filtredFleet = AllFleet.filter((fleet) => fleet.page === selectedPage);

  const initialAboutUs = {
    page: "",
    display: "",
    newImage: "",
    image: {
      path: "",
      display: "",
    },
    image_extension: "",
    littleTitle: {
      name: "",
      display: "",
    },
    bigTitle: {
      name: "",
      display: "",
    },
    paragraph: {
      content: "",
      display: "",
    },
    button: {
      label: "",
      display: "",
      link: "",
    },
  };

  const [aboutUsComponent, setAboutUsComponent] = useState(initialAboutUs);

  const { page, image, littleTitle, bigTitle, paragraph, button } =
    aboutUsComponent;

  const onSubmitAboutUs = (e: any) => {
    aboutUsComponent["page"] = selectedPage;
    aboutUsComponent["display"] = "1";
    aboutUsComponent["newImage"] = "no";
    aboutUsComponent["image"].display = "1";
    aboutUsComponent["image"].path = aboutUsData[0].image.path;
    aboutUsComponent["littleTitle"].name = aboutUsData[0].littleTitle.name;
    aboutUsComponent["littleTitle"].display = "1";
    aboutUsComponent["bigTitle"].name = aboutUsData[0].bigTitle.name;
    aboutUsComponent["bigTitle"].display = "1";
    aboutUsComponent["paragraph"].content = aboutUsData[0].paragraph.content;
    aboutUsComponent["paragraph"].display = "1";
    aboutUsComponent["button"].label = aboutUsData[0].button.label;
    aboutUsComponent["button"].display = "1";
    aboutUsComponent["button"].link = aboutUsData[0].button.link;
    e.preventDefault();
    try {
      createNewAboutUs(aboutUsComponent);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const initialOurMission = {
    missions: [
      {
        page: "",
        display: "",
        littleTitle: {
          name: "",
          display: "",
        },
        bigTitle: {
          name: "",
          display: "",
        },
        content: "",
        typeComponent: "",
        order: "",
      },
    ],
  };

  const [ourMissionComponent, setOurMissionComponent] =
    useState(initialOurMission);

  const { missions } = ourMissionComponent;

  const onSubmitOurMission = (e: any) => {
    e.preventDefault();

    if (!AllOurMissions || AllOurMissions.length === 0) {
      console.log("No data available for submission");
      return;
    }

    const newMission = {
      page: selectedPage,
      display: "1",
      littleTitle: {
        name: "Title",
        display: "1",
      },
      bigTitle: {
        name: "This is for the subTitle",
        display: "1",
      },
      content: "This a paragraph ...",
      typeComponent: "ourMissions",
      order: selectedOrder,
    };

    setOurMissionComponent((prevState) => ({
      ...prevState,
      missions: [newMission],
    }));

    try {
      createNewOurMission({ missions: [newMission] });
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.log("Error submitting mission:", error);
    }
  };

  const initialOurValue = {
    image: {
      path: "",
      display: "",
    },
    newImage: "",
    page: "",
    display: "",
    littleTitle: {
      name: "",
      display: "",
    },
    bigTitle: {
      name: "",
      display: "",
    },
    subTitle: {
      name: "",
      display: "",
    },
    tabs: [
      {
        title: "",
        display: "",
        content: "",
        buttonLabel: "",
        buttonLink: "",
        buttonDisplay: "",
      },
    ],
  };

  const [ourValueComponent, setOurValueComponent] = useState(initialOurValue);

  const onSubmitOurValue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!AllValues.length) {
      console.error("No values found in AllValues");
      return;
    }

    const firstValue = AllValues[0];

    const updatedOurValue = {
      ...ourValueComponent,
      page: selectedPage,
      display: "1",
      newImage: "no",
      image: {
        ...ourValueComponent.image,
        display: "1",
        path: firstValue.image?.path || "",
      },
      littleTitle: {
        ...ourValueComponent.littleTitle,
        name: firstValue.littleTitle?.name || "",
        display: "1",
      },
      bigTitle: {
        ...ourValueComponent.bigTitle,
        name: firstValue.bigTitle?.name || "",
        display: "1",
      },
      subTitle: {
        ...ourValueComponent.subTitle,
        name: firstValue.subTitle?.name || "",
        display: "1",
      },
      tabs: firstValue.tabs.map((tab: any) => ({
        title: tab.title || "",
        display: "1",
        content: tab.content || "",
        buttonLabel: tab.buttonLabel || "",
        buttonLink: tab.buttonLink || "",
        buttonDisplay: "1",
      })),
    };

    try {
      createNewOurValue(updatedOurValue);
      setOurValueComponent(initialOurValue);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.error("Error submitting value:", error);
    }
  };

  const initialServiceOffer = {
    littleTitle: {
      name: "",
      display: "",
    },
    bigTitle: {
      name: "",
      display: "",
    },
    cards: [
      {
        title: "",
        display: "",
        content: "",
        icon: "",
        image: "",
        newImage: "no",
        image_base64: "",
        image_extension: "",
      },
    ],
    associatedPage: "",
    display: "",
  };

  const [offerServiceComponent, setOfferServiceComponent] =
    useState(initialServiceOffer);

  const onSubmitOfferService = (e: React.FormEvent) => {
    e.preventDefault();

    if (!AllOfferServices.length) {
      console.error("No values found in AllOfferServices");
      return;
    }

    const firstValue = AllOfferServices[0];

    const updatedOfferService = {
      ...offerServiceComponent,
      associatedPage: selectedPage,
      display: "1",
      littleTitle: {
        ...offerServiceComponent.littleTitle,
        name: firstValue.littleTitle?.name || "",
        display: "1",
      },
      bigTitle: {
        ...offerServiceComponent.bigTitle,
        name: firstValue.bigTitle?.name || "",
        display: "1",
      },
      cards: firstValue.cards.map((card: any) => ({
        title: card.title || "",
        display: "1",
        content: card.content || "",
        icon: card.icon || "",
        image: card.image || "",
      })),
    };

    try {
      createNewServiceOffer(updatedOfferService);
      setOfferServiceComponent(initialServiceOffer);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.error("Error submitting value:", error);
    }
  };

  const initialTermCondition = {
    page: "",
    display: "",
    bigTitle: {
      content: "",
      display: "",
    },
    paragraph: {
      content: "",
      display: "",
    },
  };

  const [termConditionComponent, setTermConditionComponent] =
    useState(initialTermCondition);

  // const { page, image, littleTitle, bigTitle, paragraph, button } =
  //   aboutUsComponent;

  const onSubmitTermCondition = (e: any) => {
    termConditionComponent["page"] = selectedPage;
    termConditionComponent["display"] = "1";
    termConditionComponent["bigTitle"].content =
      AllTermsConditions[0].bigTitle.content;
    termConditionComponent["bigTitle"].display = "1";
    termConditionComponent["paragraph"].content =
      aboutUsData[0].paragraph.content;
    termConditionComponent["paragraph"].display = "1";
    e.preventDefault();
    try {
      createNewTermCondition(termConditionComponent);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <React.Fragment>
      <Card className="p-4 mt-5">
        <Row>
          <Col lg={2}>
            <Card>
              <SimpleBar
                autoHide={false}
                data-simplebar-track="dark"
                className="overflow-auto mb-4"
                style={{ height: "781px" }}
              >
                <ul className="list-group">
                  {AllPages.map((page) => (
                    <li
                      key={page?._id!}
                      className={`list-group-item cursor-pointer ${
                        selectedPage === page.link
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedPage(page.link)}
                      style={{ cursor: "pointer" }}
                    >
                      {page.label}
                    </li>
                  ))}
                </ul>
              </SimpleBar>
            </Card>
          </Col>
          <Col lg={10}>
            <SimpleBar
              autoHide={false}
              data-simplebar-track="primary"
              className="overflow-auto mb-4"
              style={{ height: "740px" }}
            >
              <Card>
                {filtredAboutUsData.length !== 0 && (
                  <AboutUs selectedPage={selectedPage} />
                )}
                {filtredOurMissionsData.length !== 0 && (
                  <OurMissions
                    filtredOurMissionsData={filtredOurMissionsData}
                    selectedPage={selectedPage}
                  />
                )}
                {filtredOurValuesData.length !== 0 && (
                  <OurValues selectedPage={selectedPage} />
                )}
                {filtredOfferServicesData.length !== 0 && (
                  <OfferServices selectedPage={selectedPage} />
                )}
                {filtredBestOfferData.length !== 0 && (
                  <BestOffer selectedPage={selectedPage} />
                )}
                {filtredTermsConditionData.length !== 0 && (
                  <TermsConditions selectedPage={selectedPage} />
                )}
                {filtredVehiclesClassesData.length !== 0 && (
                  <VehiclesClassComponent selectedPage={selectedPage} />
                )}
                {filtredVehicleGuideData.length !== 0 && (
                  <VehicleGuideComponent selectedPage={selectedPage} />
                )}
                {filtredFleet.length !== 0 && (
                  <FleetComponent selectedPage={selectedPage} />
                )}
                {filtredFleet.length !== 0 && (
                  <FleetComponent selectedPage={selectedPage} />
                )}
                {filtredInThePressData.length !== 0 && (
                  <InThePress selectedPage={selectedPage} />
                )}
              </Card>
            </SimpleBar>
            <Row className="d-flex justify-content-end">
              <Col lg={4}>
                <div className="vstack gap-3">
                  {newSection && (
                    <Row>
                      <Col>
                        {selectedComponent !== "" && (
                          <select
                            className="form-select"
                            onChange={handleSelectedOrder}
                          >
                            <option value="">Choose ...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        )}
                      </Col>
                      <Col lg={6}>
                        <select
                          className="form-select"
                          onChange={handleSelectedComponent}
                        >
                          <option value="">Choose ...</option>
                          <option value="KnowMoreAboutUs">
                            Left Single Image
                          </option>
                          <option value="OurValues">Tabs Bordered</option>
                          <option value="OurMissions">Article</option>
                          <option value="ServicesOfferd">Card Alignment</option>
                          {/* <option value="VehicleTypes">
                            Vertical Nav Tabs
                          </option>
                          <option value="VehicleClasses">
                            Card Border Color
                          </option> */}
                          <option value="TermsCondition">
                            Simple Paragraph
                          </option>
                        </select>
                      </Col>
                    </Row>
                  )}
                </div>
              </Col>
              <Col lg={2}>
                <div>
                  <button
                    type="button"
                    className="btn btn-info btn-label"
                    onClick={() => setNewSection(!newSection)}
                    disabled={selectedPage === ""}
                  >
                    <i className="ri-add-fill label-icon align-middle fs-16 me-2"></i>{" "}
                    New Section
                  </button>
                </div>
              </Col>
              <Col lg={2}>
                <div>
                  <button
                    type="button"
                    className="btn btn-warning btn-label"
                    onClick={() => {
                      if (selectedPage) {
                        window.open(
                          `http://www.coachhirenetwork.co.uk/${selectedPage}`,
                          "_blank"
                        );
                      }
                    }}
                    disabled={selectedPage === ""}
                  >
                    <i className="ri-eye-2-line label-icon align-middle fs-16 me-2"></i>
                    Live Demo
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              {selectedComponent === "KnowMoreAboutUs" &&
                selectedOrder !== "" && (
                  <div className="vstack gap-1 mb-2">
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
                          <span>
                            {aboutUsData[0]?.paragraph?.content.slice(0, 180)}
                            ...
                          </span>
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
                    <button
                      type="button"
                      className="btn btn-info w-xs btn-sm mb-2"
                      onClick={onSubmitAboutUs}
                    >
                      <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                      Add The Component to this Page
                    </button>
                  </div>
                )}
              {selectedComponent === "OurMissions" && selectedOrder !== "" && (
                <div className="vstack gap-2 p-4">
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
                    <span>
                      {AllOurMissions[0].missions[0].content.slice(0, 210)}
                      ...
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-info w-xs"
                    onClick={onSubmitOurMission}
                  >
                    <i className="ri-add-fill align-middle fs-16 me-2"></i> Add
                    The Component to this Page
                  </button>
                </div>
              )}
              {selectedComponent === "OurValues" && selectedOrder !== "" && (
                <div className="vstack gap-2 p-4">
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
                          {AllValues[0].littleTitle.name}
                        </span>
                      </div>
                      <div className="hstack gap-2 justify-content-center">
                        <h2 className="h2-with-after">
                          {AllValues[0].bigTitle.name}
                        </h2>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <Col lg={3} className="d-flex justify-content-end">
                      <div className="hstack gap-2">
                        <div className="vstack gap-2">
                          <Image
                            src={`${process.env.REACT_APP_BASE_URL}/ourValue/${AllValues[0]?.image.path}`}
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
                            defaultActiveKey={AllValues[0].tabs[0]?.title}
                          >
                            <Nav
                              as="ul"
                              variant="tabs"
                              className="nav-tabs-custom nav-success nav-justified mb-3"
                            >
                              {AllValues[0].tabs.map((tab, index) => (
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
                              {AllValues[0].tabs.map((tab, index) => (
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

                  <button
                    type="button"
                    className="btn btn-info w-xs"
                    onClick={onSubmitOurValue}
                  >
                    <i className="ri-add-fill align-middle fs-16 me-2"></i> Add
                    The Component to this Page
                  </button>
                </div>
              )}
              {selectedComponent === "ServicesOfferd" &&
                selectedOrder !== "" && (
                  <div className="vstack gap-2 p-4">
                    <Row className="d-flex justify-content-center">
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
                            {AllOfferServices[0].littleTitle.name}
                          </span>
                        </div>
                        <div className="hstack gap-2 justify-content-center">
                          <h2 className="h2-with-after">
                            {AllOfferServices[0].bigTitle.name}
                          </h2>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      {AllOfferServices[0].cards.map((card, index) => (
                        <Col>
                          <Card
                            className="single-service"
                            key={index}
                            style={{
                              backgroundImage: `url(${card.image})`,
                            }}
                          >
                            <div className="d-flex justify-content-center hstack gap-2">
                              <i className={`${card.icon} icon`}></i>
                            </div>

                            <div className="hstack gap-2 d-flex justify-content-center">
                              <h5>{card.title}</h5>
                            </div>

                            <div className="hstack gap-2 d-flex justify-content-center">
                              <p>{card.content}</p>
                            </div>

                            <div className="vstack gap-3" key={index}>
                              <h6>Font Image</h6>
                              <div className="vstack gap-2">
                                <Image
                                  src={`${process.env.REACT_APP_BASE_URL}/offerService/${card?.image}`}
                                  alt=""
                                  className="rounded"
                                  width="160"
                                />
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    <button
                      type="button"
                      className="btn btn-info w-xs"
                      onClick={onSubmitOfferService}
                    >
                      <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                      Add The Component to this Page
                    </button>
                  </div>
                )}
              {selectedComponent === "TermsCondition" && (
                <div className="vstack gap-2 p-4">
                  <h3>{AllTermsConditions[0]?.bigTitle?.content!}</h3>
                  <p>
                    {AllTermsConditions[0]?.paragraph?.content?.slice(0, 177)}
                    ...
                  </p>
                  <button
                    type="button"
                    className="btn btn-info w-xs"
                    onClick={onSubmitTermCondition}
                  >
                    <i className="ri-add-fill align-middle fs-16 me-2"></i> Add
                    The Component to this Page
                  </button>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default OurPages;
