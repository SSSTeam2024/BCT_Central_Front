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
import {
  useAddVehicleClasseMutation,
  useGetVehicleClassQuery,
} from "features/VehicleClassComponent/vehicleClassSlice";
import VehiclesClassComponent from "pages/VehiclesClassComponent";
import {
  useAddVehicleGuideMutation,
  useGetVehicleGuidesQuery,
} from "features/vehicleGuideComponent/vehicleGuideSlice";
import VehicleGuideComponent from "pages/VehicleGuideComponent";
import {
  useAddNewFleetComponentMutation,
  useGetAllFleetQuery,
} from "features/FleetComponent/fleetSlice";
import FleetComponent from "pages/FleetComponent";
import {
  useAddNewInThePressMutation,
  useGetAllInThePressQuery,
} from "features/InThePressComponent/inThePressSlice";
import InThePress from "pages/InThePress";
import {
  useAddNewBlock1ComponentMutation,
  useGetBlock1sQuery,
} from "features/block1Component/block1Slice";
import ServicesBlock1 from "pages/ServicesBlock1";
import Masonry from "react-responsive-masonry";
import img1 from "assets/images/news-details-img.jpg";
import img2 from "assets/images/fun-facts-img.jpg";
import img3 from "assets/images/began-main-bg.jpg";
import img4 from "assets/images/began-bg.jpg";
import {
  useAddOnTheRoadMutation,
  useGetAllOnTheRoadQuery,
} from "features/OnTheRoadComponent/onTheRoadSlice";
import OnTheRoadComponent from "pages/OnTheRoadComponent";

const OurPages = () => {
  document.title = "WebSite Our Pages | Coach Hire Network";

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
  const { data: AllServicesBlock1 = [] } = useGetBlock1sQuery();
  const { data: AllOnTheRoad = [] } = useGetAllOnTheRoadQuery();

  const [createNewAboutUs] = useAddNewAboutUsComponentMutation();
  const [createNewOurMission] = useAddNewOurMissionMutation();
  const [createNewOurValue] = useCreateOurValueMutation();
  const [createNewServiceOffer] = useAddServiceOfferMutation();
  const [createNewTermCondition] = useAddNewTermConditionMutation();
  const [createNewVehicleGuide] = useAddVehicleGuideMutation();
  const [createNewVehicleClasse] = useAddVehicleClasseMutation();
  const [createNewInThePress] = useAddNewInThePressMutation();
  const [createNewBlock1] = useAddNewBlock1ComponentMutation();
  const [createNewFleetComponent] = useAddNewFleetComponentMutation();
  const [createNewOnTheRoadComponent] = useAddOnTheRoadMutation();

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

  const filtredBlock1Data = AllServicesBlock1.filter(
    (ourValue) => ourValue.page === selectedPage
  );

  const filtredOnTheRoad = AllOnTheRoad.filter(
    (onTheRoad) => onTheRoad.page === selectedPage
  );

  const initialAboutUs = {
    page: "",
    display: "",
    order: "",
    typeComponent: "",
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

  const {
    page,
    image,
    littleTitle,
    bigTitle,
    paragraph,
    button,
    order,
    typeComponent,
  } = aboutUsComponent;

  const onSubmitAboutUs = (e: any) => {
    aboutUsComponent["page"] = selectedPage;
    aboutUsComponent["display"] = "1";
    aboutUsComponent["order"] = selectedOrder;
    aboutUsComponent["typeComponent"] = "aboutUs";
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
    order: "",
    typeComponent: "",
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
      order: selectedOrder,
      typeComponent: "ourValues",
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
    order: "",
    typeComponent: "",
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
      order: selectedOrder,
      typeComponent: "offerService",
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
    order: "",
    typeComponent: "",
  };

  const [termConditionComponent, setTermConditionComponent] =
    useState(initialTermCondition);

  const onSubmitTermCondition = (e: any) => {
    termConditionComponent["page"] = selectedPage;
    termConditionComponent["order"] = selectedOrder;
    termConditionComponent["typeComponent"] = "termsCondition";
    termConditionComponent["display"] = "1";
    termConditionComponent["bigTitle"].content =
      AllTermsConditions[0].bigTitle.content;
    termConditionComponent["bigTitle"].display = "1";
    termConditionComponent["paragraph"].content =
      AllTermsConditions[0].paragraph.content;
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

  const initialVehicleGuide = {
    page: "",
    paragraph: "",
    vehicleType: [
      {
        title: "",
        content: "",
        image: "",
        display: "",
      },
    ],
    display: "",
    order: "",
    typeComponent: "",
  };

  const [vehicleGuideComponent, setVehicleGuideComponent] =
    useState(initialVehicleGuide);

  const onSubmitVehicleGuide = (e: React.FormEvent) => {
    e.preventDefault();

    if (!AllVehicleGuide.length) {
      console.error("No values found in AllVehicleGuide");
      return;
    }

    const firstValue = AllVehicleGuide[0];

    const updatedVehicleGuide = {
      ...vehicleGuideComponent,
      page: selectedPage,
      display: "1",
      paragraph: firstValue.paragraph,
      vehicleType: firstValue.vehicleType.map((card: any) => ({
        title: card.title || "",
        display: "1",
        content: card.content || "",
        image: card.image || "",
      })),
      order: selectedOrder,
      typeComponent: "vehicleGuide",
    };

    try {
      createNewVehicleGuide(updatedVehicleGuide);
      setVehicleGuideComponent(initialVehicleGuide);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.error("Error submitting value:", error);
    }
  };

  const initialVehicleClasse = {
    page: "",
    paragraph: "",
    bigTitle: "",
    vehicleTypes: [
      {
        title: "",
        link: "",
        icon: "",
        display: "",
      },
    ],
    display: "",
    order: "",
    typeComponent: "",
  };

  const [vehicleClasseComponent, setVehicleClasseComponent] =
    useState(initialVehicleClasse);

  const onSubmitVehicleClasse = (e: React.FormEvent) => {
    e.preventDefault();

    if (!AllVehicleClasses.length) {
      console.error("No values found in AllVehicleClasses");
      return;
    }

    const firstValue = AllVehicleClasses[0];

    const updatedVehicleClasse = {
      ...vehicleClasseComponent,
      page: selectedPage,
      display: "1",
      paragraph: firstValue.paragraph,
      bigTitle: firstValue.bigTitle,
      vehicleTypes: firstValue.vehicleTypes.map((card: any) => ({
        title: card.title || "",
        display: "1",
        link: card.link || "",
        icon: card.icon || "",
      })),
      order: selectedOrder,
      typeComponent: "vehicleClasse",
    };

    try {
      createNewVehicleClasse(updatedVehicleClasse);
      setVehicleClasseComponent(initialVehicleClasse);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.error("Error submitting value:", error);
    }
  };

  const initialInThePress = {
    page: "",
    paragraph: "",
    title: "",
    news: [
      {
        title: "",
        date: "",
        by: "",
        content: "",
        image: "",
        display: "",
      },
    ],
    display: "",
    order: "",
    typeComponent: "",
    newImage: "",
  };

  const [inThePressComponent, setInThePressComponent] =
    useState(initialInThePress);

  const onSubmitInThePress = (e: React.FormEvent) => {
    e.preventDefault();

    if (!AllInThePress.length) {
      console.error("No values found in AllInThePress");
      return;
    }

    const firstValue = AllInThePress[0];

    const updatedInThePress = {
      ...inThePressComponent,
      page: selectedPage,
      display: "1",
      paragraph: firstValue.paragraph,
      title: firstValue.title,
      news: firstValue.news.map((card: any) => ({
        title: card.title || "",
        date: card.date || "",
        by: card.by || "",
        content: card.content || "",
        image: card.image || "",
        display: "1",
      })),
      order: selectedOrder,
      typeComponent: "inThePress",
      newImage: "no",
    };
    try {
      createNewInThePress(updatedInThePress);
      setInThePressComponent(initialInThePress);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.error("Error submitting value:", error);
    }
  };

  const initialBlock1 = {
    image: {
      path: "",
      display: "",
    },
    page: "",
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
        icon: "",
        content: "",
      },
    ],
    order: "",
    typeComponent: "",
    display: "",
    newImage: "",
  };

  const [block1Component, setBlock1Component] = useState(initialBlock1);

  const onSubmitBlock1 = (e: React.FormEvent) => {
    e.preventDefault();

    if (!AllServicesBlock1.length) {
      console.error("No values found in AllServicesBlock1");
      return;
    }

    const firstValue = AllServicesBlock1[0];

    const updatedBlock1 = {
      ...block1Component,
      image: {
        path: firstValue.image.path,
        display: "1",
      },
      page: selectedPage,
      littleTitle: {
        name: firstValue.littleTitle.name,
        display: "1",
      },
      bigTitle: {
        name: firstValue.bigTitle.name,
        display: "1",
      },
      subTitle: {
        name: firstValue.subTitle.name,
        display: "1",
      },
      tabs: firstValue.tabs.map((tab: any) => ({
        title: tab.title,
        icon: tab.icon,
        content: tab.content,
      })),
      order: selectedOrder,
      typeComponent: "block1",
      display: "1",
      newImage: "no",
    };

    try {
      createNewBlock1(updatedBlock1);
      setBlock1Component(initialBlock1);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.error("Error submitting value:", error);
    }
  };

  const initialFleetComponent = {
    page: "",
    grids: [
      {
        image: "",
        title: "",
        details: "",
      },
    ],
    display: "",
    order: "",
    typeComponent: "",
    newImage: "",
  };

  const [fleetComponent, setFleetComponent] = useState(initialFleetComponent);

  const onSubmitFleet = (e: React.FormEvent) => {
    e.preventDefault();

    if (!AllFleet.length) {
      console.error("No values found in AllFleet");
      return;
    }

    const firstValue = AllFleet[0];

    const updatedFleet = {
      ...fleetComponent,
      page: selectedPage,
      grids: firstValue.grids.map((grid: any) => ({
        image: grid.image,
        title: grid.title,
        details: grid.details,
      })),
      display: "1",
      order: selectedOrder,
      typeComponent: "fleetComponent",
      newImage: "no",
    };

    try {
      createNewFleetComponent(updatedFleet);
      setFleetComponent(initialFleetComponent);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.error("Error submitting value:", error);
    }
  };

  const initialOnTheRoadComponent = {
    page: "",
    grids: [
      {
        date: "",
        category: "",
        image: "",
        title: "",
        details: "",
        newImage: "",
      },
    ],
    display: "",
    order: "",
    typeComponent: "",
  };

  const [onTheRoadComponent, setOnTheRoadComponent] = useState(
    initialOnTheRoadComponent
  );

  const onSubmitOnTheRoad = (e: React.FormEvent) => {
    e.preventDefault();

    if (!AllOnTheRoad.length) {
      console.error("No values found in AllOnTheRoad");
      return;
    }

    const firstValue = AllOnTheRoad[0];

    const updatedOnTheRoad = {
      ...onTheRoadComponent,
      page: selectedPage,
      grids: firstValue.grids.map((grid: any) => ({
        date: grid.date,
        category: grid.category,
        image: grid.image,
        title: grid.title,
        details: grid.details,
        newImage: "no",
      })),
      display: "1",
      order: selectedOrder,
      typeComponent: "onTheRoadComponent",
    };

    try {
      createNewOnTheRoadComponent(updatedOnTheRoad);
      setOnTheRoadComponent(initialOnTheRoadComponent);
      setSelectedComponent("");
      setNewSection(false);
    } catch (error) {
      console.error("Error submitting value:", error);
    }
  };
  console.log("filtredVehicleGuideData", filtredVehicleGuideData);
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
                {filtredOnTheRoad.length !== 0 && (
                  <OnTheRoadComponent selectedPage={selectedPage} />
                )}
                {filtredInThePressData.length !== 0 && (
                  <InThePress selectedPage={selectedPage} />
                )}
                {filtredBlock1Data.length !== 0 && (
                  <ServicesBlock1 selectedPage={selectedPage} />
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
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
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
                          <option value="VehicleTypes">
                            Vertical Nav Tabs
                          </option>
                          <option value="VehicleClasses">
                            Card Border Color
                          </option>
                          <option value="InThePress">
                            Card Image Overlays
                          </option>
                          <option value="ServiceBlock1">
                            Grid With Background
                          </option>
                          <option value="Fleet">Image Grid</option>
                          <option value="OnTheRoad">Grid Full Width</option>
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
                          `${process.env.REACT_APP_WEB_URL}/${selectedPage}`,
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
              {selectedComponent === "TermsCondition" &&
                selectedOrder !== "" && (
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
                      <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                      Add The Component to this Page
                    </button>
                  </div>
                )}
              {selectedComponent === "VehicleTypes" && selectedOrder !== "" && (
                <div>
                  <Row className="mb-3">
                    <div className="vstack gap-2">
                      <div className="hstack gap-2">
                        <p>{AllVehicleGuide[0].paragraph}</p>
                      </div>
                    </div>
                  </Row>
                  <Tab.Container
                    defaultActiveKey={`v-pills-${AllVehicleGuide[0].vehicleType[0]?.title
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
                          {AllVehicleGuide[0].vehicleType.map(
                            (vt: any, index: any) => (
                              <Nav.Link
                                key={index}
                                eventKey={`v-pills-${vt.title
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}`}
                                className="mb-2"
                              >
                                <div className="hstack gap-1">{vt.title}</div>
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
                          {AllVehicleGuide[0].vehicleType.map((vt, index) => (
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
                          ))}
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                  <button
                    type="button"
                    className="btn btn-info w-xs"
                    onClick={onSubmitVehicleGuide}
                  >
                    <i className="ri-add-fill align-middle fs-16 me-2"></i> Add
                    The Component to this Page
                  </button>
                </div>
              )}
              {selectedComponent === "VehicleClasses" &&
                selectedOrder !== "" && (
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
                            <div className="d-flex justify-content-center p-2 text-danger">
                              <div className="hstack gap-2 align-middle">
                                <i className={`${vt.icon} fs-18`}></i>

                                <span>{vt.title}</span>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                    <button
                      type="button"
                      className="btn btn-info w-xs"
                      onClick={onSubmitVehicleClasse}
                    >
                      <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                      Add The Component to this Page
                    </button>
                  </>
                )}
              {selectedComponent === "InThePress" && selectedOrder !== "" && (
                <div className="vstack gap-2 p-3">
                  <div className="hstack gap-2 d-flex justify-content-center">
                    <h2 className="text-center">{AllInThePress[0].title}</h2>
                  </div>
                  <div className="hstack gap-2 d-flex justify-content-center">
                    <p className="text-center">{AllInThePress[0].paragraph}</p>
                  </div>
                  <Row className="d-flex justify-content-center">
                    <Col lg={6}>
                      <Card className="p-3">
                        <Card.Header className="d-flex justify-content-center border-0">
                          <img
                            className="card-img-top img-fluid w-50"
                            src={`${process.env.REACT_APP_BASE_URL}/inThePressFiles/${AllInThePress[0].news[0]?.image}`}
                            alt="Card img cap"
                          />
                        </Card.Header>
                        <Card.Body>
                          <div className="hstack gap-2 mb-2">
                            <span className="fw-bold">
                              {AllInThePress[0].news[0].by}
                            </span>{" "}
                            <span className="fw-medium text-muted">
                              {AllInThePress[0].news[0].date}
                            </span>
                          </div>
                          <div className="hstack gap-2">
                            <h4 className="card-title mb-2">
                              {AllInThePress[0].news[0].title}
                            </h4>
                          </div>
                          <div className="hstack gap-2">
                            <p className="card-text text-muted">
                              {AllInThePress[0].news[0].content}
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <button
                    type="button"
                    className="btn btn-info w-xs"
                    onClick={onSubmitInThePress}
                  >
                    <i className="ri-add-fill align-middle fs-16 me-2"></i> Add
                    The Component to this Page
                  </button>
                </div>
              )}
              {selectedComponent === "ServiceBlock1" &&
                selectedOrder !== "" && (
                  <>
                    <Row className="d-flex justify-content-center p-3">
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
                            {AllServicesBlock1[0]?.littleTitle?.name!}
                          </span>
                        </div>
                        <div className="hstack gap-2 justify-content-center">
                          <h2 className="h2-with-after">
                            {AllServicesBlock1[0]?.bigTitle?.name!}
                          </h2>
                        </div>
                      </div>
                    </Row>
                    <Row className="p-3">
                      <div>
                        <Card className="w-75">
                          <Card.Header className="bg-transparent border-0">
                            <div className="hstack gap-3">
                              <h4>{AllServicesBlock1[0]?.subTitle?.name!}</h4>
                            </div>
                          </Card.Header>
                          <Card.Body
                            style={{
                              backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/Block1/${AllServicesBlock1[0]?.image.path})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <Row>
                              {AllServicesBlock1[0].tabs.map((tab, index) => (
                                <Col
                                  lg={4}
                                  key={index}
                                  className="border-bottom border-end"
                                >
                                  <div className="vstack gap-2">
                                    <div className="hstack gap-2">
                                      <h6>{tab.title}</h6>
                                    </div>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Card.Body>
                        </Card>
                      </div>
                    </Row>
                    <Row>
                      <button
                        type="button"
                        className="btn btn-info w-xs"
                        onClick={onSubmitBlock1}
                      >
                        <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                        Add The Component to this Page
                      </button>
                    </Row>
                  </>
                )}
              {selectedComponent === "Fleet" && selectedOrder !== "" && (
                <>
                  <Masonry className="my-masonry-grid_column me-3">
                    {AllFleet.map((fleet: any) =>
                      fleet.grids.map((grid: any) => (
                        <Col className="p-2">
                          <div>
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/fleetFiles/${grid?.image}`}
                              className="card-img-top w-50 p-2"
                              alt="..."
                            />
                            <div>
                              <h5 className="card-title mb-1">{grid?.title}</h5>
                            </div>
                          </div>
                        </Col>
                      ))
                    )}
                  </Masonry>
                  <Row>
                    <button
                      type="button"
                      className="btn btn-info w-xs"
                      onClick={onSubmitFleet}
                    >
                      <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                      Add The Component to this Page
                    </button>
                  </Row>
                </>
              )}
              {selectedComponent === "OnTheRoad" && selectedOrder !== "" && (
                <>
                  <Row>
                    <Col>
                      <img
                        src={img1}
                        className="card-img-top w-75 p-2"
                        alt="..."
                      />
                    </Col>
                    <Col>
                      <img
                        src={img1}
                        className="card-img-top w-75 p-2"
                        alt="..."
                      />
                    </Col>
                    <Col>
                      <img
                        src={img3}
                        className="card-img-top w-75 p-2"
                        alt="..."
                      />
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col>
                      <img
                        src={img2}
                        className="card-img-top w-75 p-2"
                        alt="..."
                      />
                    </Col>
                    <Col>
                      <img
                        src={img2}
                        className="card-img-top w-75 p-2"
                        alt="..."
                      />
                    </Col>
                    <Col>
                      <img
                        src={img4}
                        className="card-img-top w-100 p-2"
                        alt="..."
                      />
                    </Col>
                  </Row> */}
                  <Row>
                    <button
                      type="button"
                      className="btn btn-info w-xs"
                      onClick={onSubmitOnTheRoad}
                    >
                      <i className="ri-add-fill align-middle fs-16 me-2"></i>{" "}
                      Add The Component to this Page
                    </button>
                  </Row>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default OurPages;
