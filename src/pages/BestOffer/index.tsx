import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Image,
  Tab,
  Nav,
  Form,
  Dropdown,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import {
  useAddTabToOurValueMutation,
  useGetOurValueQuery,
  useUpdateOurValuesMutation,
} from "features/OurValuesComponent/ourValuesSlice";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import {
  BestOfferModel,
  useAddTabToBestOfferMutation,
  useGetBestOffersQuery,
  useUpdateBestOfferMutation,
} from "features/bestOfferComponent/bestOfferSlice";
import { useGetVehicleGuidesQuery } from "features/vehicleGuideComponent/vehicleGuideSlice";
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
import { useUpdateBlock1Mutation } from "features/block1Component/block1Slice";

export interface BestOfferModelInterface {
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
  liltleSubTitle: {
    name: string;
    display: string;
  };
  tabs: {
    title: string;
    display: string;
    content: string;
    buttonLabel: string;
    buttonLink: string;
    buttonDisplay: string;
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

interface BestOfferProps {
  selectedPage: string;
}

const BestOffer: React.FC<BestOfferProps> = ({ selectedPage }) => {
  const { data = [] } = useGetBestOffersQuery();
  const { data: AllVehicleGuides = [] } = useGetVehicleGuidesQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data: AllInThePress = [] } = useGetAllInThePressQuery();
  const [updateBestOffer, { isLoading }] = useUpdateBestOfferMutation();
  const [updatedInThePress] = useUpdateInThePressMutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();
  const [updatedBlock1] = useUpdateBlock1Mutation();
  const { data: AllPages = [] } = useGetAllPagesQuery();

  const filtredBestOfferData = data.filter(
    (ourValue) => ourValue.page === selectedPage
  );

  const filtredBlock1Data = data.filter(
    (block1) => block1.page === selectedPage
  );

  const filtredInThePressData = AllInThePress.filter(
    (inThePress) => inThePress.page === selectedPage
  );
  const filtredVehicleGuideData = AllVehicleGuides.filter(
    (vehicleGuide) => vehicleGuide?.page!.toLowerCase() === selectedPage
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
    about: BestOfferModel,
    field: keyof BestOfferModelInterface,
    value: boolean
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "display" in about[field]
    ) {
      const updatedData: BestOfferModel = {
        ...about,
        [field]: {
          ...about[field],
          display: value ? "1" : "0",
        },
      };

      updateBestOffer(updatedData)
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
    about: BestOfferModel,
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
    updateBestOffer(updatedData)
      .unwrap()
      .then(() => console.log("Checkbox update successful"))
      .catch((error) => console.error("Checkbox update failed:", error));
  };

  const handleEditStart = (id: string, field: string, value: string) => {
    setEditingField({ id, field });
    setEditedValue(value);
  };

  const handleEditSave = (
    about: BestOfferModel,
    field: keyof BestOfferModelInterface,
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

    updateBestOffer(updatedData)
      .unwrap()
      .then(() => setEditingField({ id: "", field: null }))
      .catch((error) => console.error("Update failed:", error));
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    about: BestOfferModel,
    field: keyof BestOfferModelInterface
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
      console.log("updated data", updatedData);
      setPreviewImage(`data:image/${extension};base64,${base64Data}`);
      updateBestOffer(updatedData);
      setEditingField({ id: "", field: null });
    }
  };

  const handleSelectChange = (
    about: BestOfferModel,
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

      updateBestOffer(updatedData)
        .unwrap()
        .then(() => console.log("Button update successful"))
        .catch((error) => console.error("Button update failed:", error));
    }
  };

  const handleEditSaveField = (
    about: BestOfferModel,
    field: keyof BestOfferModelInterface,
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

      updateBestOffer(updatedData)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTabToOurValue({
        _id: filtredOurValuesData[0]?._id!,
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
    offer: BestOfferModel,
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
      const offerServiceToSwap: any = filteredServices.find(
        (item) => item.order === selectedOrder
      );
      // const offerServiceToSwap: any = filteredServices.find(
      //   (item) => item.order === selectedOrder
      // );

      const updatePromises = [];

      updatePromises.push(updateBestOffer({ ...offer, order: selectedOrder }));

      if (aboutToSwap) {
        updatePromises.push(
          updateAboutUs({ ...aboutToSwap, order: offer.order })
        );
      }

      if (valueToSwap) {
        updatePromises.push(
          updateOurValues({ ...valueToSwap, order: offer.order })
        );
      }

      if (offerServiceToSwap) {
        updatePromises.push(
          updateOfferServices({ ...offerServiceToSwap, order: offer.order })
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
      {filtredBestOfferData.map((value) => (
        <Row className="p-4">
          <Col lg={1} className="p-4">
            <input
              type="checkbox"
              checked={filtredBestOfferData[0]?.display! === "1"}
              onChange={(e) =>
                updateBestOffer({
                  ...filtredBestOfferData[0],
                  display: e.target.checked ? "1" : "0",
                })
              }
            />
          </Col>
          <Col lg={10}>
            <Row className="d-flex justify-content-center p-4">
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
                      handleCheckboxChange(value, "bigTitle", e.target.checked)
                    }
                  />
                  {editingField.id === value._id &&
                  editingField.field === "bigTitle" ? (
                    <input
                      type="text"
                      className="form-control"
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
              <Col lg={3} className="d-flex justify-content-end p-4">
                <div className="hstack gap-2">
                  <div className="vstack gap-2">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Preview"
                        className="rounded"
                        width="260"
                      />
                    ) : (
                      <Image
                        src={`${process.env.REACT_APP_BASE_URL}/BestOffer/${value?.image.path}`}
                        alt=""
                        className="rounded"
                        width="260"
                      />
                    )}
                    <div className="mt-n3" style={{ marginLeft: "130px" }}>
                      <label
                        htmlFor={`image_${value?.image.path}_best_offer`}
                        className="mb-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="Select image"
                      >
                        <span className="avatar-xs d-inline-block">
                          <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                            <i className="bi bi-pen"></i>
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-control d-none"
                        type="file"
                        name={`image_${value?.image.path}_best_offer`}
                        id={`image_${value?.image.path}_best_offer`}
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, value, "image")}
                        style={{ width: "210px", height: "120px" }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <Card className="border-0">
                  <Card.Body>
                    <Tab.Container defaultActiveKey={value.tabs[0]?.title}>
                      <Nav
                        as="ul"
                        variant="tabs"
                        className="nav-tabs-custom nav-success nav-justified mb-3"
                      >
                        {value.tabs.map((tab, index) => (
                          <Nav.Item as="li" key={index}>
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="me-2"
                                checked={tab.display === "1"}
                                onChange={(e) =>
                                  handleTabCheckboxChange(
                                    value,
                                    index,
                                    e.target.checked,
                                    "display"
                                  )
                                }
                              />
                              {editingField.id === value._id &&
                              editingField.field === `title-${index}` ? (
                                <input
                                  type="text"
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
                                <Nav.Link
                                  eventKey={tab.title}
                                  className="d-flex align-items-center"
                                >
                                  {tab.title}
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
                                </Nav.Link>
                              )}
                            </div>
                          </Nav.Item>
                        ))}
                      </Nav>
                      <Tab.Content className="text-muted">
                        {value.tabs.map((tab, index) => (
                          <Tab.Pane eventKey={tab.title} key={index}>
                            <div className="d-flex">
                              <div className="flex-grow-1 ms-2">
                                {editingField.id === value._id &&
                                editingField.field === `content-${index}` ? (
                                  <textarea
                                    value={editedValue}
                                    className="form-control"
                                    onChange={(e) =>
                                      setEditedValue(e.target.value)
                                    }
                                    onBlur={() =>
                                      handleEditSave(
                                        value,
                                        "tabs",
                                        index,
                                        "content",
                                        editedValue
                                      )
                                    }
                                    autoFocus
                                  />
                                ) : (
                                  <div className="d-flex align-items-center">
                                    {tab.content}
                                    <button
                                      className="btn btn-link p-0 ms-2"
                                      onClick={() =>
                                        handleEditStart(
                                          value?._id!,
                                          `content-${index}`,
                                          tab.content
                                        )
                                      }
                                    >
                                      <i className="bi bi-pencil"></i>
                                    </button>
                                  </div>
                                )}
                                <div className="mt-2 d-flex align-items-center">
                                  <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={tab.buttonDisplay === "1"}
                                    onChange={(e) =>
                                      handleTabCheckboxChange(
                                        value,
                                        index,
                                        e.target.checked,
                                        "buttonDisplay"
                                      )
                                    }
                                  />
                                  {editingField.id === value._id &&
                                  editingField.field === `button-${index}` ? (
                                    <>
                                      <div className="form-check form-radio-secondary mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="formradiocolor1"
                                          id="formradioRight1"
                                          value="From Our Pages"
                                          checked={
                                            selectedOption === "From Our Pages"
                                          }
                                          onChange={handleRadioChange}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formradioRight1"
                                        >
                                          From Our Pages
                                        </label>
                                      </div>

                                      <div className="form-check form-radio-secondary mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="formradiocolor1"
                                          id="formradioRight2"
                                          value="External Link"
                                          checked={
                                            selectedOption === "External Link"
                                          }
                                          onChange={handleRadioChange}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formradioRight2"
                                        >
                                          External Link
                                        </label>
                                      </div>
                                      {selectedOption === "From Our Pages" && (
                                        <select
                                          className="form-select form-select-sm"
                                          value={tab.buttonLink}
                                          onChange={(e) =>
                                            handleSelectChange(
                                              value,
                                              index,
                                              e.target.value
                                            )
                                          }
                                          onBlur={() =>
                                            setEditingField({
                                              id: "",
                                              field: null,
                                            })
                                          }
                                        >
                                          {AllPages.map((page) => (
                                            <option
                                              key={page.link}
                                              value={page.link}
                                            >
                                              {page.label}
                                            </option>
                                          ))}
                                        </select>
                                      )}
                                      {selectedOption === "External Link" && (
                                        <div className="hstack gap-3">
                                          <input
                                            type="text"
                                            name="buttonLabel"
                                            className="form-control"
                                            placeholder="Button Label"
                                            value={formData.buttonLabel}
                                            onChange={handleChange}
                                          />
                                          <input
                                            type="text"
                                            name="buttonLink"
                                            className="form-control"
                                            placeholder="Button Link"
                                            value={formData.buttonLink}
                                            onChange={handleChange}
                                            onBlur={handleBlur} // Trigger validation and formatting on blur
                                          />
                                          {errorMessage && (
                                            <p
                                              style={{
                                                color: "red",
                                                marginTop: "8px",
                                              }}
                                            >
                                              {errorMessage}
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <Link
                                        to={tab.buttonLink}
                                        className="btn btn-sm btn-soft-danger"
                                      >
                                        {tab.buttonLabel}
                                      </Link>
                                      <button
                                        className="btn btn-link p-0 ms-2"
                                        onClick={() =>
                                          handleEditStart(
                                            value?._id!,
                                            `button-${index}`,
                                            tab.buttonLink
                                          )
                                        }
                                      >
                                        <i className="bi bi-pencil"></i>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                        ))}
                      </Tab.Content>
                    </Tab.Container>
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={() => setAddNewTabForm(!addNewTabForm)}
                    >
                      <span className="icon-on">
                        <i className="ri-add-line align-bottom"></i> New Tab
                      </span>
                    </button>
                    {addNewTabForm && (
                      <form onSubmit={handleSubmit}>
                        <h5 className="mt-2">Add New Item </h5>
                        <div className="hstack gap-3">
                          <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <textarea
                            name="content"
                            placeholder="Content"
                            value={formData.content}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>

                        <div className="form-check form-radio-secondary mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="formradiocolor1"
                            id="formradioRight1"
                            value="From Our Pages"
                            checked={selectedOption === "From Our Pages"}
                            onChange={handleRadioChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formradioRight1"
                          >
                            From Our Pages
                          </label>
                        </div>

                        <div className="form-check form-radio-secondary mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="formradiocolor1"
                            id="formradioRight2"
                            value="External Link"
                            checked={selectedOption === "External Link"}
                            onChange={handleRadioChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formradioRight2"
                          >
                            External Link
                          </label>
                        </div>
                        {selectedOption === "From Our Pages" && (
                          <select
                            name="buttonLabel"
                            className="form-control mt-2"
                            onChange={(e) => {
                              const selectedPage = AllPages.find(
                                (page) => page.label === e.target.value
                              );
                              if (selectedPage) {
                                setFormData({
                                  ...formData,
                                  buttonLabel: selectedPage.label,
                                  buttonLink: selectedPage.link,
                                  buttonDisplay: "1",
                                });
                              }
                            }}
                          >
                            <option value="">Select a Page</option>
                            {AllPages.map((page) => (
                              <option key={page.label} value={page.label}>
                                {page.label}
                              </option>
                            ))}
                          </select>
                        )}
                        {selectedOption === "External Link" && (
                          <div className="hstack gap-3">
                            <input
                              type="text"
                              name="buttonLabel"
                              className="form-control"
                              placeholder="Button Label"
                              value={formData.buttonLabel}
                              onChange={handleChange}
                            />
                            <input
                              type="text"
                              name="buttonLink"
                              className="form-control"
                              placeholder="Button Link"
                              value={formData.buttonLink}
                              onChange={handleChange}
                              onBlur={handleBlur} // Trigger validation and formatting on blur
                            />
                            {errorMessage && (
                              <p
                                style={{
                                  color: "red",
                                  marginTop: "8px",
                                }}
                              >
                                {errorMessage}
                              </p>
                            )}
                          </div>
                        )}
                        <button type="submit" className="btn btn-success mt-3">
                          <i className="ri-add-line align-center"></i>
                        </button>
                      </form>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
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
                        {value?.order!}
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
      ))}
    </React.Fragment>
  );
};
export default BestOffer;
