import React, { useEffect, useState } from "react";
import { Row, Card, Col, Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  useGetOurValueQuery,
  useUpdateOurValuesMutation,
} from "features/OurValuesComponent/ourValuesSlice";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import { useAddTabToBestOfferMutation } from "features/bestOfferComponent/bestOfferSlice";
import {
  Block1Model,
  useGetBlock1sQuery,
  useUpdateBlock1Mutation,
} from "features/block1Component/block1Slice";

import {
  useGetVehicleGuidesQuery,
  useUpdateVehicleGuideMutation,
} from "features/vehicleGuideComponent/vehicleGuideSlice";
import {
  useGetOfferServiceQuery,
  useUpdateOfferServiceMutation,
} from "features/OffreServicesComponent/offreServicesSlice";
import {
  useGetAboutUsComponentsQuery,
  useUpdateAboutUsMutation,
} from "features/AboutUsComponent/aboutUsSlice";
import {
  useGetAllOurMissionsQuery,
  useUpdateOurMissionMutation,
} from "features/OurMissionsComponent/ourMissionsSlice";
import {
  useGetAllInThePressQuery,
  useUpdateInThePressMutation,
} from "features/InThePressComponent/inThePressSlice";
import {
  useGetAllFleetQuery,
  useUpdateFleetMutation,
} from "features/FleetComponent/fleetSlice";
import {
  useGetVehicleClassQuery,
  useUpdateVehicleClassMutation,
} from "features/VehicleClassComponent/vehicleClassSlice";
import {
  useGetTermsConditionsQuery,
  useUpdateTermConditionMutation,
} from "features/TermsConditionsComponent/termsCoditionSlice";
import {
  useGetAllOnTheRoadQuery,
  useUpdateOnTheRoadMutation,
} from "features/OnTheRoadComponent/onTheRoadSlice";

interface Block1ModelInterface {
  image: {
    path: string;
    display: string;
  };
  littleTitle: {
    name: string;
    display: string;
  };
  bigTitle: {
    name: string;
    display: string;
  };
  subTitle: {
    name: string;
    display: string;
  };
  tabs: {
    title: string;
    icon: string;
    content: string;
  }[];
}

function convertToBase64(
  file: File
): Promise<{ base64Data: string; extension: string }> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      const [, base64Data] = base64String.split(",");
      const extension = file.name.split(".").pop() ?? "";
      resolve({ base64Data, extension });
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsDataURL(file);
  });
}

interface Block1Props {
  selectedPage: string;
}

const ServicesBlock1: React.FC<Block1Props> = ({ selectedPage }) => {
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data: AllVehicleGuide = [] } = useGetVehicleGuidesQuery();
  const { data: AllVehicleClasse = [] } = useGetVehicleClassQuery();
  const { data: AllTermsConditions = [] } = useGetTermsConditionsQuery();
  const { data: AllOnTheRoad = [] } = useGetAllOnTheRoadQuery();
  const { data: AllFleet = [] } = useGetAllFleetQuery();
  const { data: AllInThePress = [] } = useGetAllInThePressQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllPages = [] } = useGetAllPagesQuery();
  const { data = [] } = useGetBlock1sQuery();

  const [updatedBlock1, { isLoading }] = useUpdateBlock1Mutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();
  const [updateFleetComponent] = useUpdateFleetMutation();
  const [updatedInThePress] = useUpdateInThePressMutation();
  const [updateVehicleGuide] = useUpdateVehicleGuideMutation();
  const [updateVehicleClasse] = useUpdateVehicleClassMutation();
  const [updateTermCondition] = useUpdateTermConditionMutation();
  const [updateOnTheRoad] = useUpdateOnTheRoadMutation();

  const filtredBlock1Data = data.filter(
    (block1) => block1.page === selectedPage
  );

  const filteredServices = AllOfferServices.filter(
    (service) => service.associatedPage === selectedPage
  );

  const filtredAboutUsData = aboutUsData.filter(
    (aboutUs) => aboutUs.page === selectedPage
  );

  const filtredOurMissionsData = AllOurMissions.flatMap((missionCollection) =>
    missionCollection.missions
      .filter((mission) => mission.page === selectedPage)
      .map((mission) => ({
        ...mission,
        parentId: missionCollection._id,
      }))
  );

  const filtredOurValuesData = AllValues.filter(
    (ourValue) => ourValue.page === selectedPage
  );

  const filtredTermsConditionData = AllTermsConditions.filter(
    (term) => term.page === selectedPage
  );

  const filtredVehicleClassesData = AllVehicleClasse.filter(
    (vehicleClasse) => vehicleClasse.page === selectedPage
  );

  const filtredOnTheRoad = AllOnTheRoad.filter(
    (onTheRoad) => onTheRoad.page === selectedPage
  );

  const filtredFleet = AllFleet.filter((fleet) => fleet.page === selectedPage);

  const filtredInThePressData = AllInThePress.filter(
    (inThePress) => inThePress.page === selectedPage
  );
  const filtredVehicleGuideData = AllVehicleGuide.filter(
    (vehicleGuide) => vehicleGuide?.page!.toLowerCase() === selectedPage
  );

  const [localDisplay, setLocalDisplay] = useState<string | undefined>(
    undefined
  );
  const [addNewTabForm, setAddNewTabForm] = useState<boolean>(false);
  useEffect(() => {
    if (data[0]?.image?.display) {
      setLocalDisplay(data[0].image.display);
    }
  }, [data]);

  const [editingField, setEditingField] = useState<{
    id: string;
    field: string | null;
  }>({ id: "", field: null });

  const [editedValue, setEditedValue] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] =
    useState<string>("From Our Pages");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRadioChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = (
    about: Block1Model,
    field: keyof Block1ModelInterface,
    value: boolean
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "display" in about[field]
    ) {
      const updatedData: Block1Model = {
        ...about,
        [field]: {
          ...about[field],
          display: value ? "1" : "0",
        },
      };

      updatedBlock1(updatedData)
        .unwrap()
        .then(() => {
          console.log("Update successful");
        })
        .catch((error) => {
          console.error("Update failed:", error);
        });
    } else {
      console.warn(
        `Field "${field}" is not structured as expected or lacks a 'display' property`,
        about[field]
      );
    }
  };

  const handleTabCheckboxChange = (
    about: Block1Model,
    index: number,
    value: boolean,
    field: keyof (typeof about.tabs)[0]
  ) => {
    const updatedTabs = about.tabs.map((tab, i) =>
      i === index
        ? {
            ...tab,
            [field]: value ? "1" : "0",
          }
        : tab
    );

    const updatedData = { ...about, tabs: updatedTabs };
    updatedBlock1(updatedData)
      .unwrap()
      .then(() => console.log("Checkbox update successful"))
      .catch((error) => console.error("Checkbox update failed:", error));
  };

  const handleEditStart = (id: string, field: string, value: string) => {
    setEditingField({ id, field });
    setEditedValue(value);
  };

  const handleEditSave = (
    about: Block1Model,
    field: keyof Block1ModelInterface,
    index: number,
    subfield: keyof (typeof about.tabs)[0],
    value: string
  ) => {
    const updatedTabs = about.tabs.map((tab, i) =>
      i === index
        ? {
            ...tab,
            [subfield]: value,
          }
        : { ...tab }
    );

    const updatedData = { ...about, tabs: updatedTabs };

    updatedBlock1(updatedData)
      .unwrap()
      .then(() => setEditingField({ id: "", field: null }))
      .catch((error) => console.error("Update failed:", error));
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    about: Block1Model,
    field: keyof Block1ModelInterface
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const updatedData = {
        ...about,
        image_base64: base64Data,
        image_extension: extension,
        image: {
          ...about.image,
          path: `${base64Data}.${extension}`,
        },
      };
      setPreviewImage(`data:image/${extension};base64,${base64Data}`);
      updatedBlock1(updatedData);
      setEditingField({ id: "", field: null });
    }
  };

  const handleSelectChange = (
    about: Block1Model,
    index: number,
    selectedLink: string
  ) => {
    const selectedPage = AllPages.find((page) => page.link === selectedLink);

    if (selectedPage) {
      const updatedTabs = about.tabs.map((tab, i) =>
        i === index
          ? {
              ...tab,
              buttonLabel: selectedPage.label,
              buttonLink: selectedPage.link,
            }
          : tab
      );

      const updatedData = { ...about, tabs: updatedTabs };

      updatedBlock1(updatedData)
        .unwrap()
        .then(() => console.log("Button update successful"))
        .catch((error) => console.error("Button update failed:", error));
    }
  };

  const handleEditSaveField = (
    about: Block1Model,
    field: keyof Block1ModelInterface,
    value: string
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "name" in about[field]
    ) {
      const updatedData = {
        ...about,
        [field]: { ...about[field], name: value },
      };

      updatedBlock1(updatedData)
        .unwrap()
        .then(() => setEditingField({ id: "", field: null }))
        .catch((error) => console.error("Edit save failed:", error));
    } else {
      console.error("Invalid field for editing:", field);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    display: "1",
    content: "",
    buttonLabel: "",
    buttonLink: "",
    buttonDisplay: "",
  });

  const [addTabToOurValue] = useAddTabToBestOfferMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleBlur = () => {
    let link = formData.buttonLink.trim();

    const validExtensions = /\.(com|fr|uk|org|net)$/i;
    if (!validExtensions.test(link)) {
      setErrorMessage(
        "Please enter a valid link with a valid domain extension (e.g., .com, .fr, .org)."
      );
      return;
    }

    if (!/^https?:\/\/www\./.test(link)) {
      link = `https://www.${link
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")}`;
    }

    setFormData((prev) => ({
      ...prev,
      buttonLink: link,
    }));
  };

  const location = useLocation();
  const ourValues = location.state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTabToOurValue({
        _id: filtredBlock1Data[0]?._id!,
        tabData: formData,
      }).unwrap();
      alert("Tab added successfully!");
      setFormData({
        title: "",
        display: "",
        content: "",
        buttonLabel: "",
        buttonLink: "",
        buttonDisplay: "",
      });
      setAddNewTabForm(!addNewTabForm);
    } catch (error) {
      console.error("Error adding tab:", error);
      alert("Failed to add tab.");
    }
  };

  const handleUpdateOrder = async (
    offer: Block1Model,
    selectedOrder: string
  ) => {
    if (!offer?._id) return;

    try {
      const aboutToSwap = filtredAboutUsData.find(
        (item) => item.order === selectedOrder
      );
      const valueToSwap = filtredOurValuesData.find(
        (item) => item.order === selectedOrder
      );
      const missionToSwap: any = filtredOurMissionsData.find(
        (item) => item.order === selectedOrder
      );

      const fleetToSwap: any = filtredFleet.find(
        (item) => item.order === selectedOrder
      );

      const offerServiceToSwap: any = filteredServices.find(
        (item) => item.order === selectedOrder
      );

      const inThePressToSwap: any = filtredInThePressData.find(
        (item) => item.order === selectedOrder
      );

      const vehicleGuideToSwap: any = filtredVehicleGuideData.find(
        (item) => item.order === selectedOrder
      );

      const vehicleClasseToSwap: any = filtredVehicleClassesData.find(
        (item) => item.order === selectedOrder
      );

      const termsToSwap: any = filtredTermsConditionData.find(
        (item) => item.order === selectedOrder
      );

      const onTheRoadToSwap: any = filtredOnTheRoad.find(
        (item) => item.order === selectedOrder
      );

      const block1ToSwap: any = filtredBlock1Data.find(
        (item) => item.order === selectedOrder
      );

      const updatePromises = [];

      updatePromises.push(updatedBlock1({ ...offer, order: selectedOrder }));

      if (aboutToSwap) {
        updatePromises.push(
          updateAboutUs({ ...aboutToSwap, order: offer.order })
        );
      }
      if (offerServiceToSwap) {
        updatePromises.push(
          updateOfferServices({ ...offerServiceToSwap, order: offer.order })
        );
      }
      if (valueToSwap) {
        updatePromises.push(
          updateOurValues({ ...valueToSwap, order: offer.order })
        );
      }
      if (block1ToSwap) {
        updatePromises.push(
          updatedBlock1({ ...block1ToSwap, order: offer.order })
        );
      }
      if (termsToSwap) {
        updatePromises.push(
          updateTermCondition({ ...termsToSwap, order: offer.order })
        );
      }
      if (onTheRoadToSwap) {
        updatePromises.push(
          updateOnTheRoad({ ...onTheRoadToSwap, order: offer.order })
        );
      }
      if (fleetToSwap) {
        updatePromises.push(
          updateFleetComponent({ ...fleetToSwap, order: offer.order })
        );
      }
      if (vehicleClasseToSwap) {
        updatePromises.push(
          updateVehicleClasse({ ...vehicleClasseToSwap, order: offer.order })
        );
      }
      if (vehicleGuideToSwap) {
        updatePromises.push(
          updateVehicleGuide({ ...vehicleGuideToSwap, order: offer.order })
        );
      }
      if (inThePressToSwap) {
        updatePromises.push(
          updatedInThePress({ ...inThePressToSwap, order: offer.order })
        );
      }
      if (missionToSwap) {
        updatePromises.push(
          updateOurMission({
            _id: missionToSwap.parentId,
            missions: filtredOurMissionsData.map((mission) =>
              mission.order === selectedOrder
                ? { ...mission, order: offer.order }
                : mission
            ),
          })
        );
      }

      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error updating orders:", error);
    }
  };

  return (
    <React.Fragment>
      <Row className="border-bottom p-4">
        <Col lg={1}>
          <input
            type="checkbox"
            checked={filtredBlock1Data[0]?.display === "1"}
            onChange={(e) =>
              updatedBlock1({
                ...filtredBlock1Data[0],
                display: e.target.checked ? "1" : "0",
              })
            }
          />
        </Col>
        <Col lg={10}>
          {filtredBlock1Data.map((value) => (
            <>
              <Row className="d-flex justify-content-center">
                <div className="vstack gap-2">
                  <div className="hstack gap-2 justify-content-center">
                    <input
                      type="checkbox"
                      checked={value.littleTitle?.display === "1"}
                      onChange={(e) =>
                        handleCheckboxChange(
                          value,
                          "littleTitle",
                          e.target.checked
                        )
                      }
                    />
                    {editingField.id === value._id &&
                    editingField.field === "littleTitle" ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editedValue}
                        autoFocus
                        onChange={(e) => setEditedValue(e.target.value)}
                        onBlur={() =>
                          handleEditSaveField(value, "littleTitle", editedValue)
                        }
                      />
                    ) : (
                      <span
                        style={{
                          textTransform: "uppercase",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#CD2528",
                        }}
                      >
                        {value.littleTitle.name}
                      </span>
                    )}
                    <i
                      className="bi bi-pencil"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                      onClick={() =>
                        handleEditStart(
                          value._id as string,
                          "littleTitle",
                          value.littleTitle.name
                        )
                      }
                    ></i>
                  </div>
                  <div className="hstack gap-2 justify-content-center">
                    <input
                      type="checkbox"
                      checked={value.bigTitle.display === "1"}
                      onChange={(e) =>
                        handleCheckboxChange(
                          value,
                          "bigTitle",
                          e.target.checked
                        )
                      }
                    />
                    {editingField.id === value._id &&
                    editingField.field === "bigTitle" ? (
                      <input
                        type="text"
                        className="form-control mb-3"
                        value={editedValue}
                        autoFocus
                        onChange={(e) => setEditedValue(e.target.value)}
                        onBlur={() =>
                          handleEditSaveField(value, "bigTitle", editedValue)
                        }
                      />
                    ) : (
                      <h2 className="h2-with-after">{value.bigTitle.name}</h2>
                    )}
                    <i
                      className="bi bi-pencil"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                      onClick={() =>
                        handleEditStart(
                          value._id as string,
                          "bigTitle",
                          value.bigTitle.name
                        )
                      }
                    ></i>
                  </div>
                </div>
              </Row>
              <Row>
                <div className="p-3">
                  <Card
                    className="w-75"
                    style={{
                      backgroundImage: `url(${
                        process.env.REACT_APP_BASE_URL
                      }/inThePressFiles/${value?.image?.path!})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Card.Header className="bg-transparent border-0">
                      <div className="hstack gap-3">
                        <input
                          type="checkbox"
                          checked={value.subTitle.display === "1"}
                          onChange={(e) =>
                            handleCheckboxChange(
                              value,
                              "subTitle",
                              e.target.checked
                            )
                          }
                        />
                        {editingField.field === "subTitle" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedValue}
                            autoFocus
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() =>
                              handleEditSaveField(
                                value,
                                "subTitle",
                                editedValue
                              )
                            }
                          />
                        ) : (
                          <h4>{value.subTitle.name}</h4>
                        )}
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              value._id as string,
                              "subTitle",
                              value.subTitle.name
                            )
                          }
                        ></i>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <table>
                        <tbody>
                          {/* First row with the first 3 tabs */}
                          <tr>
                            {value.tabs.map((tab, index) => (
                              <td
                                key={index}
                                //   className="w-25 border-bottom border-end p-3"
                                className="border-bottom border-end"
                              >
                                <div className="vstack gap-2">
                                  {/* <i className="flaticon-stopwatch"></i> */}
                                  {editingField.id === value._id &&
                                  editingField.field === `title-${index}` ? (
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={editedValue}
                                      onChange={(e) =>
                                        setEditedValue(e.target.value)
                                      }
                                      onBlur={() =>
                                        handleEditSave(
                                          value,
                                          "tabs",
                                          index,
                                          "title",
                                          editedValue
                                        )
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    <div className="hstack gap-2">
                                      <h6>{tab.title}</h6>
                                      <button
                                        className="btn btn-link p-0 ms-2"
                                        onClick={() =>
                                          handleEditStart(
                                            value?._id!,
                                            `title-${index}`,
                                            tab.title
                                          )
                                        }
                                      >
                                        <i className="bi bi-pencil"></i>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            ))}
                          </tr>

                          {/* Second row with the next 3 tabs */}
                          {/* <tr>
                                  {value.tabs.slice(3, 6).map((tab, index) => (
                                    <td
                                      key={index}
                                      className="w-25 border-end p-3"
                                    >
                                      <div className="vstack gap-2">
                                        {editingField.id === value._id &&
                                        editingField.field ===
                                          `title-${index}` ? (
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={editedValue}
                                            onChange={(e) =>
                                              setEditedValue(e.target.value)
                                            }
                                            onBlur={() =>
                                              handleEditSave(
                                                value,
                                                "tabs",
                                                index,
                                                "title",
                                                editedValue
                                              )
                                            }
                                            autoFocus
                                          />
                                        ) : (
                                          <div className="hstack gap-2">
                                            <h6>{tab.title}</h6>
                                            <button
                                              className="btn btn-link p-0 ms-2"
                                              onClick={() =>
                                                handleEditStart(
                                                  value?._id!,
                                                  `title-${index}`,
                                                  tab.title
                                                )
                                              }
                                            >
                                              <i className="bi bi-pencil"></i>
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  ))}
                                </tr> */}
                        </tbody>
                      </table>
                    </Card.Body>
                  </Card>
                </div>
              </Row>
            </>
          ))}
        </Col>
        <Col lg={1}>
          <div className="position-relative">
            <div className="position-absolute rounded-5 top-0 end-0">
              <Dropdown
                className="topbar-head-dropdown ms-1 header-item"
                id="notificationDropdown"
              >
                <Dropdown.Toggle
                  id="notification"
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-light rounded-circle arrow-none btn-sm"
                >
                  <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-info">
                    <span className="notification-badge">
                      {filtredBlock1Data[0]?.order!}
                    </span>
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu-xs dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="py-2 ps-2" id="notificationItemsTabContent">
                    {isLoading ? (
                      <span>Loading ...</span>
                    ) : (
                      <ul className="list-unstyled">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                          <li key={num}>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                handleUpdateOrder(
                                  filtredBlock1Data[0],
                                  num.toString()
                                )
                              }
                            >
                              {num}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default ServicesBlock1;
