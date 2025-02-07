import React, { useState } from "react";
import { Card, Col, Container, Image, Nav, Row, Tab } from "react-bootstrap";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import BreadCrumb from "Common/BreadCrumb";
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
import { useGetOfferServiceQuery } from "features/OffreServicesComponent/offreServicesSlice";
import { useGetBestOffersQuery } from "features/bestOfferComponent/bestOfferSlice";
import BestOffer from "pages/BestOffer";
import OfferServices from "pages/OfferServices";
import OurValues from "pages/OurValues";
import OurMissions from "pages/OurMissions";
import AboutUs from "pages/AboutUs";

const OurPages = () => {
  document.title = "Web Site Our Pages | Coach Hire Network";

  const { data: AllPages = [] } = useGetAllPagesQuery();
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllBestOffers = [] } = useGetBestOffersQuery();
  const [createNewAboutUs] = useAddNewAboutUsComponentMutation();
  const [createNewOurMission] = useAddNewOurMissionMutation();
  const [createNewOurValue] = useCreateOurValueMutation();

  const [selectedPage, setSelectedPage] = useState<string>("");
  const [selectedComponent, setSelectedComponent] = useState<string>("");

  const handleSelectedComponent = (e: any) => {
    const value = e.target.value;
    setSelectedComponent(value);
  };
  const [newSection, setNewSection] = useState<boolean>(false);

  const filtredAboutUsData = aboutUsData.filter(
    (aboutUs) => aboutUs.page === selectedPage
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
        name: AllOurMissions[0]?.missions[0]?.littleTitle?.name || "",
        display: AllOurMissions[0]?.missions[0]?.littleTitle?.display || "",
      },
      bigTitle: {
        name: AllOurMissions[0]?.missions[0]?.bigTitle?.name || "",
        display: AllOurMissions[0]?.missions[0]?.bigTitle?.display || "",
      },
      content: AllOurMissions[0]?.missions[0]?.content || "",
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

    // Create a new state object to avoid direct mutation
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
      setOurValueComponent(initialOurValue); // Reset state after submission
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.error("Error submitting value:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Our Pages" pageTitle="Web Site Settings" />
          <Card className="p-3">
            <Row>
              <Col lg={2}>
                <Card>
                  <SimpleBar
                    autoHide={false}
                    data-simplebar-track="dark"
                    className="overflow-auto mb-4"
                    style={{ height: "650px" }}
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
                  style={{ height: "650px" }}
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
                  </Card>
                </SimpleBar>

                <div className="d-flex justify-content-end">
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
                <div className="vstack gap-3">
                  {newSection && (
                    <Row className="mt-2">
                      <Col lg={4}>
                        <select
                          className="form-select"
                          onChange={handleSelectedComponent}
                        >
                          <option value="">Choose ...</option>
                          <option value="KnowMoreAboutUs">
                            Know More About Us
                          </option>
                          <option value="OurValues">Our Values</option>
                          <option value="OurMissions">Our Missions</option>
                          <option value="ServicesOfferd">Service Offers</option>
                          <option value="VehicleTypes">Vehicle Types</option>
                          <option value="VehicleClasses">
                            Vehicle Classes
                          </option>
                        </select>
                      </Col>
                    </Row>
                  )}
                  <hr />
                  {selectedComponent === "KnowMoreAboutUs" && (
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
                      <button
                        type="button"
                        className="btn btn-info w-xs"
                        onClick={onSubmitAboutUs}
                      >
                        <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                        Add The Component to this Page
                      </button>
                    </div>
                  )}
                  {selectedComponent === "OurMissions" && (
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
                        <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                        Add The Component to this Page
                      </button>
                    </div>
                  )}
                  {selectedComponent === "OurValues" && (
                    <div className="vstack gap-2 p-4">
                      <h3>OurValues Component</h3>
                      <button
                        type="button"
                        className="btn btn-info w-xs"
                        onClick={onSubmitOurValue}
                      >
                        <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                        Add The Component to this Page
                      </button>
                    </div>
                  )}
                  {/* {selectedPage && selectedComponent && (
                    <button
                      type="button"
                      className="btn btn-info btn-label"
                      onClick={onSubmitAboutUs}
                    >
                      <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                      Add The Component to this Page
                    </button>
                  )} */}
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OurPages;
