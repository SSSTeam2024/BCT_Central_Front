import React, { useEffect, useRef, useState } from "react";

import {
  useAddNewAboutUsComponentMutation,
  useGetAboutUsComponentsQuery,
} from "features/AboutUsComponent/aboutUsSlice";
import { useGetFooterListsQuery } from "features/FooterList/footerListSlice";
import { useGetFooterSocialsQuery } from "features/FooterSocial/footerSocialSlice";
import { useGetAllHeadersQuery } from "features/header/headerSlice";
import {
  useCreateMutation,
  useLazyGenerateQuery,
} from "features/htmlPage/htmlPageSlice";
import { useGetMenusQuery } from "features/menu/menuSlice";
import {
  useAddServiceOfferMutation,
  useGetOfferServiceQuery,
} from "features/OffreServicesComponent/offreServicesSlice";
import {
  useCreateOurValueMutation,
  useGetOurValueQuery,
} from "features/OurValuesComponent/ourValuesSlice";
import { useAddNewPageMutation } from "features/pageCollection/pageSlice";

import { Container, Row, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "Common/BreadCrumb";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import driverAnimation from "assets/images/Animation - 1740559457964.json";
import {
  useAddNewOurMissionMutation,
  useGetAllOurMissionsQuery,
} from "features/OurMissionsComponent/ourMissionsSlice";
import {
  useAddNewTermConditionMutation,
  useGetTermsConditionsQuery,
} from "features/TermsConditionsComponent/termsCoditionSlice";
import {
  useAddVehicleGuideMutation,
  useGetVehicleGuidesQuery,
} from "features/vehicleGuideComponent/vehicleGuideSlice";
import {
  useAddVehicleClasseMutation,
  useGetVehicleClassQuery,
} from "features/VehicleClassComponent/vehicleClassSlice";
import {
  useAddNewInThePressMutation,
  useGetAllInThePressQuery,
} from "features/InThePressComponent/inThePressSlice";
import {
  useAddNewBlock1ComponentMutation,
  useGetBlock1sQuery,
} from "features/block1Component/block1Slice";
import {
  useAddOnTheRoadMutation,
  useGetAllOnTheRoadQuery,
} from "features/OnTheRoadComponent/onTheRoadSlice";
import {
  useAddNewFleetComponentMutation,
  useGetAllFleetQuery,
} from "features/FleetComponent/fleetSlice";

const HtmlPage = () => {
  document.title = "WebSite New Page | Coach Hire Network";

  const lottieRef3 = useRef<LottieRefCurrentProps>(null);

  const { data: AllFooterLists = [] } = useGetFooterListsQuery();
  const { data: AllFooterSocial = [] } = useGetFooterSocialsQuery();
  const { data: AllMenu = [] } = useGetMenusQuery();
  const { data: AllHeader = [] } = useGetAllHeadersQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllOurValues = [] } = useGetOurValueQuery();
  const { data: AllAboutUs = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllTermsConditions = [] } = useGetTermsConditionsQuery();
  const { data: AllVehicleGuide = [] } = useGetVehicleGuidesQuery();
  const { data: AllVehicleClasses = [] } = useGetVehicleClassQuery();
  const { data: AllInThePress = [] } = useGetAllInThePressQuery();
  const { data: AllServicesBlock1 = [] } = useGetBlock1sQuery();
  const { data: AllOnTheRoad = [] } = useGetAllOnTheRoadQuery();
  const { data: AllFleet = [] } = useGetAllFleetQuery();

  const [listFooter, setListFooter] = useState<any[]>([]);
  const [newPage, { isLoading }] = useAddNewPageMutation();
  const [createNewServiceOffer] = useAddServiceOfferMutation();
  const [createNewOurValue] = useCreateOurValueMutation();
  const [createNewAboutUs] = useAddNewAboutUsComponentMutation();
  const [createNewOurMission] = useAddNewOurMissionMutation();
  const [createNewTermCondition] = useAddNewTermConditionMutation();
  const [createNewVehicleGuide] = useAddVehicleGuideMutation();
  const [createNewVehicleClasse] = useAddVehicleClasseMutation();
  const [createNewInThePress] = useAddNewInThePressMutation();
  const [createNewBlock1] = useAddNewBlock1ComponentMutation();
  const [createNewFleetComponent] = useAddNewFleetComponentMutation();
  const [createNewOnTheRoadComponent] = useAddOnTheRoadMutation();

  const navigate = useNavigate();
  type CheckboxKey =
    | "aboutUs"
    | "ourValues"
    | "servicesOffer"
    | "ourMissions"
    | "terms"
    | "vehicleGuide"
    | "vehicleClasse"
    | "inThePress"
    | "serviceBlock1"
    | "fleet"
    | "onTheRoad";

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Page is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<CheckboxKey[]>(
    []
  );
  const [createHtmlPage] = useCreateMutation();
  useEffect(() => {
    const footerArr = AllFooterLists.map((footer) => footer?._id!);
    setListFooter(footerArr);
  }, [AllFooterLists]);

  const handleCheckboxChange = (value: CheckboxKey) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const selectedIds: Record<CheckboxKey, string | undefined> = {
    aboutUs: AllAboutUs[0]?._id,
    ourValues: AllOurValues[0]?._id,
    servicesOffer: AllOfferServices[0]?._id!,
    ourMissions: AllOurMissions[0]?._id!,
    terms: AllTermsConditions[0]?._id!,
    vehicleGuide: AllVehicleGuide[0]?._id!,
    vehicleClasse: AllVehicleClasses[0]?._id!,
    inThePress: AllInThePress[0]?._id,
    serviceBlock1: AllServicesBlock1[0]?._id!,
    fleet: AllInThePress[0]?._id,
    onTheRoad: AllServicesBlock1[0]?._id!,
  };
  const initialHtmlPage = {
    name: "",
    link: "",
    quoteForm: "",
    header: "",
    menu: "",
    aboutUs: "",
    ourValues: "",
    offerServices: "",
    ourMissions: "",
    terms: "",
    vehicleGuide: "",
    vehicleClasse: "",
    inThePress: "",
    serviceBlock1: "",
    footerList: [""],
    socialMedia: "",
    fleet: "",
    onTheRoad: "",
  };
  const [htmlPage, setHtmlPage] = useState(initialHtmlPage);
  const {
    name,
    link,
    quoteForm,
    header,
    menu,
    aboutUs,
    ourValues,
    offerServices,
    ourMissions,
    terms,
    vehicleGuide,
    vehicleClasse,
    inThePress,
    serviceBlock1,
    footerList,
    socialMedia,
    fleet,
    onTheRoad,
  } = htmlPage;

  const handleQuoteFromCheckboxChange = (e: any) => {
    const { checked } = e.target;
    setHtmlPage((prevState) => ({
      ...prevState,
      quoteForm: checked ? "1" : "0",
    }));
  };

  const onChangeHtmlPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHtmlPage((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const [triggerGenerateHtmlPage] = useLazyGenerateQuery();

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

  const initialAboutUs = {
    page: "",
    display: "",
    newImage: "",
    order: "",
    typeComponent: "",
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

  const onSubmitHtmlPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const sanitizedLink = htmlPage.link.replace(/\s+/g, "-");

      const firstFleet = AllFleet[0];

      const updatedFleet = {
        ...fleetComponent,
        page: `${sanitizedLink}.html`,
        grids: firstFleet.grids.map((grid: any) => ({
          image: grid.image,
          title: grid.title,
          details: grid.details,
        })),
        display: "1",
        order: "10",
        typeComponent: "fleetComponent",
        newImage: "no",
      };

      const firstOnTheRoad = AllOnTheRoad[0];

      const updatedOnTheRoad = {
        ...onTheRoadComponent,
        page: `${sanitizedLink}.html`,
        grids: firstOnTheRoad.grids.map((grid: any) => ({
          date: grid.date,
          category: grid.category,
          image: grid.image,
          title: grid.title,
          details: grid.details,
          newImage: "no",
        })),
        display: "1",
        order: "11",
        typeComponent: "onTheRoadComponent",
      };

      const firstValueOfferService = AllOfferServices[0];

      const updatedOfferService = {
        ...offerServiceComponent,
        associatedPage: `${sanitizedLink}.html`,
        display: "1",
        littleTitle: {
          ...offerServiceComponent.littleTitle,
          name: firstValueOfferService.littleTitle?.name || "",
          display: "1",
        },
        bigTitle: {
          ...offerServiceComponent.bigTitle,
          name: firstValueOfferService.bigTitle?.name || "",
          display: "1",
        },
        cards: firstValueOfferService.cards.map((card: any) => ({
          title: card.title || "",
          display: "1",
          content: card.content || "",
          icon: card.icon || "",
          image: card.image || "",
        })),
        order: "3",
        typeComponent: "offerService",
      };

      const firstValue = AllOurValues[0];

      const updatedOurValue = {
        ...ourValueComponent,
        page: `${sanitizedLink}.html`,
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
        order: "2",
        typeComponent: "ourValues",
      };

      aboutUsComponent["page"] = `${sanitizedLink}.html`;
      aboutUsComponent["display"] = "1";
      aboutUsComponent["newImage"] = "no";
      aboutUsComponent["image"].display = "1";
      aboutUsComponent["image"].path = AllAboutUs[0].image.path;
      aboutUsComponent["littleTitle"].name = AllAboutUs[0].littleTitle.name;
      aboutUsComponent["littleTitle"].display = "1";
      aboutUsComponent["bigTitle"].name = AllAboutUs[0].bigTitle.name;
      aboutUsComponent["bigTitle"].display = "1";
      aboutUsComponent["paragraph"].content = AllAboutUs[0].paragraph.content;
      aboutUsComponent["paragraph"].display = "1";
      aboutUsComponent["button"].label = AllAboutUs[0].button.label;
      aboutUsComponent["button"].display = "1";
      aboutUsComponent["button"].link = AllAboutUs[0].button.link;
      aboutUsComponent["order"] = "1";
      aboutUsComponent["typeComponent"] = "aboutUs";

      const newMission = {
        page: `${sanitizedLink}.html`,
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
        order: "4",
      };

      setOurMissionComponent((prevState) => ({
        ...prevState,
        missions: [newMission],
      }));

      termConditionComponent["page"] = `${sanitizedLink}.html`;
      termConditionComponent["order"] = "5";
      termConditionComponent["typeComponent"] = "termsCondition";
      termConditionComponent["display"] = "1";
      termConditionComponent["bigTitle"].content =
        AllTermsConditions[0].bigTitle.content;
      termConditionComponent["bigTitle"].display = "1";
      termConditionComponent["paragraph"].content =
        AllTermsConditions[0].paragraph.content;
      termConditionComponent["paragraph"].display = "1";

      const firstVehicleGuide = AllVehicleGuide[0];

      const updatedVehicleGuide = {
        ...vehicleGuideComponent,
        page: `${sanitizedLink}.html`,
        display: "1",
        paragraph: firstVehicleGuide.paragraph,
        vehicleType: firstVehicleGuide.vehicleType.map((card: any) => ({
          title: card.title || "",
          display: "1",
          content: card.content || "",
          image: card.image || "",
        })),
        order: "6",
        typeComponent: "vehicleGuide",
      };

      const firstClasse = AllVehicleClasses[0];

      const updatedVehicleClasse = {
        ...vehicleClasseComponent,
        page: `${sanitizedLink}.html`,
        display: "1",
        paragraph: firstClasse.paragraph,
        bigTitle: firstClasse.bigTitle,
        vehicleTypes: firstClasse.vehicleTypes.map((card: any) => ({
          title: card.title || "",
          display: "1",
          link: card.link || "",
          icon: card.icon || "",
        })),
        order: "7",
        typeComponent: "vehicleClasse",
      };

      const firstInThePress = AllInThePress[0];

      const updatedInThePress = {
        ...inThePressComponent,
        page: `${sanitizedLink}.html`,
        display: "1",
        paragraph: firstInThePress.paragraph,
        title: firstInThePress.title,
        news: firstInThePress.news.map((card: any) => ({
          title: card.title || "",
          date: card.date || "",
          by: card.by || "",
          content: card.content || "",
          image: card.image || "",
          display: "1",
        })),
        order: "8",
        typeComponent: "inThePress",
        newImage: "no",
      };

      const firstBlock1 = AllServicesBlock1[0];

      const updatedBlock1 = {
        ...block1Component,
        image: {
          path: firstBlock1.image.path,
          display: "1",
        },
        page: `${sanitizedLink}.html`,
        littleTitle: {
          name: firstBlock1.littleTitle.name,
          display: "1",
        },
        bigTitle: {
          name: firstBlock1.bigTitle.name,
          display: "1",
        },
        subTitle: {
          name: firstBlock1.subTitle.name,
          display: "1",
        },
        tabs: firstBlock1.tabs.map((tab: any) => ({
          title: tab.title,
          icon: tab.icon,
          content: tab.content,
        })),
        order: "9",
        typeComponent: "block1",
        display: "1",
        newImage: "no",
      };
      let createdServiceOffer: any;
      if (selectedCheckboxes.includes("servicesOffer")) {
        createdServiceOffer = await createNewServiceOffer(
          updatedOfferService
        ).unwrap();
      }
      let createdOurValues: any;
      if (selectedCheckboxes.includes("ourValues")) {
        createdOurValues = await createNewOurValue(updatedOurValue).unwrap();
      }
      let createdAboutUs: any;
      if (selectedCheckboxes.includes("aboutUs")) {
        createdAboutUs = await createNewAboutUs(aboutUsComponent).unwrap();
      }
      let createdOurMissions: any;
      if (selectedCheckboxes.includes("ourMissions")) {
        createdOurMissions = await createNewOurMission({
          missions: [newMission],
        });
      }
      let createTermsConditions: any;
      if (selectedCheckboxes.includes("terms")) {
        createTermsConditions = await createNewTermCondition(
          termConditionComponent
        );
      }
      let createVehickeGuide: any;
      if (selectedCheckboxes.includes("vehicleGuide")) {
        createVehickeGuide = await createNewVehicleGuide(updatedVehicleGuide);
      }
      let createVehickeClasse: any;
      if (selectedCheckboxes.includes("vehicleClasse")) {
        createVehickeClasse = await createNewVehicleClasse(
          updatedVehicleClasse
        );
      }
      let createInThePress: any;
      if (selectedCheckboxes.includes("inThePress")) {
        createInThePress = await createNewInThePress(updatedInThePress);
      }
      let createBlock1: any;
      if (selectedCheckboxes.includes("serviceBlock1")) {
        createBlock1 = await createNewBlock1(updatedBlock1);
      }

      let createFleet: any;
      if (selectedCheckboxes.includes("fleet")) {
        createFleet = await createNewFleetComponent(updatedFleet);
      }
      let createOnTheRoad: any;
      if (selectedCheckboxes.includes("onTheRoad")) {
        createOnTheRoad = await createNewOnTheRoadComponent(updatedOnTheRoad);
      }
      const htmlPageForm = {
        ...htmlPage,
        header: AllHeader[0]?._id!,
        menu: AllMenu[0]?._id!,
        socialMedia: AllFooterSocial[0]?._id!,
        footerList: listFooter,

        aboutUs: selectedCheckboxes.includes("aboutUs")
          ? createdAboutUs?._id!
          : null,
        ourValues: selectedCheckboxes.includes("ourValues")
          ? createdOurValues?._id!
          : null,
        offerServices: selectedCheckboxes.includes("servicesOffer")
          ? createdServiceOffer?._id!
          : null,
        ourMissions: selectedCheckboxes.includes("ourMissions")
          ? createdOurMissions?._id!
          : null,
        terms: selectedCheckboxes.includes("terms")
          ? createTermsConditions?._id!
          : null,
        vehicleGuide: selectedCheckboxes.includes("vehicleGuide")
          ? createVehickeGuide?._id!
          : null,
        vehicleClasse: selectedCheckboxes.includes("vehicleClasse")
          ? createVehickeClasse?._id!
          : null,
        inThePress: selectedCheckboxes.includes("inThePress")
          ? createInThePress?._id!
          : null,
        serviceBlock1: selectedCheckboxes.includes("serviceBlock1")
          ? createBlock1?._id!
          : null,
        fleet: selectedCheckboxes.includes("fleet") ? createFleet?._id! : null,
        onTheRoad: selectedCheckboxes.includes("onTheRoad")
          ? createOnTheRoad?._id!
          : null,
      };

      const createdHtmlPage = await createHtmlPage(htmlPageForm).unwrap();

      if (createdHtmlPage?._id) {
        await triggerGenerateHtmlPage(createdHtmlPage._id).unwrap();
        await newPage({
          label: htmlPageForm.name,
          link: `${sanitizedLink}.html`,
        }).unwrap();
        notifySuccess();
      } else {
        throw new Error("Failed to retrieve the created HTML page ID.");
      }
      setHtmlPage(initialHtmlPage);
    } catch (error) {
      notifySuccess();
      navigate("/website-pages");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="New Page" pageTitle="WebSite Settings" />
          <Col lg={12}>
            <Card className="p-3">
              <Card.Body>
                <form onSubmit={onSubmitHtmlPage}>
                  <Row>
                    <Col lg={4}>
                      <div className="vstack gap-4">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={htmlPage.name}
                          onChange={onChangeHtmlPage}
                          placeholder="Page Name"
                          className="form-control"
                        />
                        <input
                          type="text"
                          id="link"
                          name="link"
                          value={htmlPage.link}
                          onChange={onChangeHtmlPage}
                          placeholder="Page Link"
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      {/* Quote Form */}
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="quoteForm"
                          checked={htmlPage.quoteForm === "1"}
                          onChange={handleQuoteFromCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="quoteForm">
                          Quote Form
                        </label>
                      </div>
                      {/* About Us */}
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="aboutUs"
                          checked={selectedCheckboxes.includes("aboutUs")}
                          onChange={() => handleCheckboxChange("aboutUs")}
                        />
                        <label className="form-check-label" htmlFor="aboutUs">
                          Left Single Image
                        </label>
                      </div>
                      {/* Our Values */}
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="ourValues"
                          checked={selectedCheckboxes.includes("ourValues")}
                          onChange={() => handleCheckboxChange("ourValues")}
                        />
                        <label className="form-check-label" htmlFor="ourValues">
                          Tabs Bordered
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="servicesOffer"
                          checked={selectedCheckboxes.includes("servicesOffer")}
                          onChange={() => handleCheckboxChange("servicesOffer")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="servicesOffer"
                        >
                          Card Alignment
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="ourMissions"
                          checked={selectedCheckboxes.includes("ourMissions")}
                          onChange={() => handleCheckboxChange("ourMissions")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="ourMissions"
                        >
                          Article
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="terms"
                          checked={selectedCheckboxes.includes("terms")}
                          onChange={() => handleCheckboxChange("terms")}
                        />
                        <label className="form-check-label" htmlFor="terms">
                          Simple Paragraph
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="vehicleGuide"
                          checked={selectedCheckboxes.includes("vehicleGuide")}
                          onChange={() => handleCheckboxChange("vehicleGuide")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="vehicleGuide"
                        >
                          Vertical Nav Tabs
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inThePress"
                          checked={selectedCheckboxes.includes("inThePress")}
                          onChange={() => handleCheckboxChange("inThePress")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inThePress"
                        >
                          Card Image Overlays
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="vehicleClasse"
                          checked={selectedCheckboxes.includes("vehicleClasse")}
                          onChange={() => handleCheckboxChange("vehicleClasse")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="vehicleClasse"
                        >
                          Card Border Color
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="serviceBlock1"
                          checked={selectedCheckboxes.includes("serviceBlock1")}
                          onChange={() => handleCheckboxChange("serviceBlock1")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="serviceBlock1"
                        >
                          Grid With Background
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="fleet"
                          checked={selectedCheckboxes.includes("fleet")}
                          onChange={() => handleCheckboxChange("fleet")}
                        />
                        <label className="form-check-label" htmlFor="fleet">
                          Image Grid
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="onTheRoad"
                          checked={selectedCheckboxes.includes("onTheRoad")}
                          onChange={() => handleCheckboxChange("onTheRoad")}
                        />
                        <label className="form-check-label" htmlFor="onTheRoad">
                          Grid Full Width
                        </label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <Lottie
                        lottieRef={lottieRef3}
                        onComplete={() => {
                          lottieRef3.current?.goToAndPlay(5, true);
                        }}
                        animationData={driverAnimation}
                        loop={false}
                        style={{ width: 380 }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {isLoading ? (
                      <div className="d-flex justify-content-end mt-3">
                        <button
                          type="button"
                          className="btn btn-info btn-load"
                          disabled
                        >
                          <span className="d-flex align-items-center">
                            <span className="flex-grow-1 me-2">Loading...</span>
                            <span
                              className="spinner-grow flex-shrink-0"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </span>
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-info">
                          <span className="icon-on">Create</span>
                        </button>
                      </div>
                    )}
                  </Row>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default HtmlPage;
