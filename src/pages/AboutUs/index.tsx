import React, { useEffect, useState } from "react";
import { Row, Col, Image, Dropdown } from "react-bootstrap";
import {
  AboutUsModel,
  useGetAboutUsComponentsQuery,
  useUpdateAboutUsMutation,
} from "features/AboutUsComponent/aboutUsSlice";
import "./styles.css";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import {
  useGetOurValueQuery,
  useUpdateOurValuesMutation,
} from "features/OurValuesComponent/ourValuesSlice";
import {
  useGetAllOurMissionsQuery,
  useUpdateOurMissionMutation,
} from "features/OurMissionsComponent/ourMissionsSlice";
import {
  useGetAllFleetQuery,
  useUpdateFleetMutation,
} from "features/FleetComponent/fleetSlice";
import {
  useGetAllInThePressQuery,
  useUpdateInThePressMutation,
} from "features/InThePressComponent/inThePressSlice";
import {
  useGetOfferServiceQuery,
  useUpdateOfferServiceMutation,
} from "features/OffreServicesComponent/offreServicesSlice";
import {
  useGetVehicleGuidesQuery,
  useUpdateVehicleGuideMutation,
} from "features/vehicleGuideComponent/vehicleGuideSlice";
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
import {
  useGetBlock1sQuery,
  useUpdateBlock1Mutation,
} from "features/block1Component/block1Slice";

interface AboutUsModelInterface {
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
  paragraph: {
    content: string;
    display: string;
  };
  button: {
    label: string;
    display: string;
    link: string;
  };
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

interface AboutUsProps {
  selectedPage: string;
}

const AboutUs: React.FC<AboutUsProps> = ({ selectedPage }) => {
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();

  const { data: allPages = [] } = useGetAllPagesQuery();
  const { data: AllFleet = [] } = useGetAllFleetQuery();
  const { data: AllInThePress = [] } = useGetAllInThePressQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllVehicleGuide = [] } = useGetVehicleGuidesQuery();
  const { data: AllVehicleClasse = [] } = useGetVehicleClassQuery();
  const { data: AllTermsConditions = [] } = useGetTermsConditionsQuery();
  const { data: AllOnTheRoad = [] } = useGetAllOnTheRoadQuery();
  const { data: AllBlock1 = [] } = useGetBlock1sQuery();

  const [updateAboutUs, { isLoading }] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();

  const [updateFleetComponent] = useUpdateFleetMutation();
  const [updatedInThePress] = useUpdateInThePressMutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateVehicleGuide] = useUpdateVehicleGuideMutation();
  const [updateVehicleClasse] = useUpdateVehicleClassMutation();
  const [updateTermCondition] = useUpdateTermConditionMutation();
  const [updateOnTheRoad] = useUpdateOnTheRoadMutation();
  const [updatedBlock1] = useUpdateBlock1Mutation();

  const [localDisplay, setLocalDisplay] = useState<string | undefined>(
    undefined
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

  const filtredBlock1Data = AllBlock1.filter(
    (block1) => block1.page === selectedPage
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
    (vehicleGuide) => vehicleGuide.page.toLowerCase() === selectedPage
  );

  const filteredServices = AllOfferServices.filter(
    (service) => service.associatedPage === selectedPage
  );

  // console.log("filtredOurMissionsData", filtredOurMissionsData);
  useEffect(() => {
    if (filtredAboutUsData[0]?.image?.display) {
      setLocalDisplay(filtredAboutUsData[0].image.display);
    }
  }, [filtredAboutUsData]);

  const [editingField, setEditingField] = useState<{
    id: string;
    field: string | null;
  }>({ id: "", field: null });
  const [editedValue, setEditedValue] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCheckboxChange = (
    about: AboutUsModel,
    field: keyof AboutUsModelInterface,
    value: boolean
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "display" in about[field]!
    ) {
      const updatedData: AboutUsModel = {
        ...about,
        [field]: {
          ...about[field],
          display: value ? "1" : "0",
        },
      };

      updateAboutUs(updatedData)
        .unwrap()
        .then(() => {
          console.log("Update successful");
        })
        .catch((error) => {
          console.error("Update failed:", error);
        });
    } else {
      console.warn("Invalid field or format for update");
    }
  };

  const handleEditStart = (id: string, field: string, value: string) => {
    setEditingField({ id, field });
    setEditedValue(value);
  };

  const handleEditSave = (
    about: AboutUsModel,
    field: keyof AboutUsModelInterface
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "name" in about[field]!
    ) {
      const updatedData = {
        ...about,
        [field]: {
          ...about[field],
          name: editedValue,
        },
      };
      updateAboutUs(updatedData);
      setEditingField({ id: "", field: null });
    }
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "content" in about[field]!
    ) {
      const updatedData = {
        ...about,
        [field]: {
          ...about[field],
          content: editedValue,
        },
      };
      updateAboutUs(updatedData);
      setEditingField({ id: "", field: null });
    }
    if (field === "button") {
      const [label, link] = editedValue.split("|");
      const updatedData = {
        ...about,
        [field]: {
          ...about[field],
          label,
          link,
        },
      };
      updateAboutUs(updatedData);
      setEditingField({ id: "", field: null });
    }
  };

  const handleCheckboxChangeWithLocalUpdate = (
    about: AboutUsModel,
    field: keyof AboutUsModelInterface,
    value: boolean
  ) => {
    setLocalDisplay(value ? "1" : "0");
    handleCheckboxChange(about, field, value);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    about: AboutUsModel,
    field: keyof AboutUsModel
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
      updateAboutUs(updatedData);
      setEditingField({ id: "", field: null });
    }
  };

  const handleUpdateOrder = async (
    about: AboutUsModel,
    selectedOrder: string
  ) => {
    if (!about?._id) return;

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

      updatePromises.push(updateAboutUs({ ...about, order: selectedOrder }));

      if (valueToSwap) {
        updatePromises.push(
          updateOurValues({ ...valueToSwap, order: about.order })
        );
      }
      if (block1ToSwap) {
        updatePromises.push(
          updatedBlock1({ ...block1ToSwap, order: about.order })
        );
      }
      if (termsToSwap) {
        updatePromises.push(
          updateTermCondition({ ...termsToSwap, order: about.order })
        );
      }
      if (onTheRoadToSwap) {
        updatePromises.push(
          updateOnTheRoad({ ...onTheRoadToSwap, order: about.order })
        );
      }
      if (fleetToSwap) {
        updatePromises.push(
          updateFleetComponent({ ...fleetToSwap, order: about.order })
        );
      }
      if (vehicleClasseToSwap) {
        updatePromises.push(
          updateVehicleClasse({ ...vehicleClasseToSwap, order: about.order })
        );
      }
      if (vehicleGuideToSwap) {
        updatePromises.push(
          updateVehicleGuide({ ...vehicleGuideToSwap, order: about.order })
        );
      }
      if (inThePressToSwap) {
        updatePromises.push(
          updatedInThePress({ ...inThePressToSwap, order: about.order })
        );
      }
      if (offerServiceToSwap) {
        updatePromises.push(
          updateOfferServices({ ...offerServiceToSwap, order: about.order })
        );
      }
      if (missionToSwap) {
        updatePromises.push(
          updateOurMission({
            _id: missionToSwap.parentId,
            missions: filtredOurMissionsData.map((mission) =>
              mission.order === selectedOrder
                ? { ...mission, order: about.order }
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
      <Row className="p-4 border-bottom">
        <Col lg={1}>
          <input
            type="checkbox"
            checked={filtredAboutUsData[0]?.display === "1"}
            onChange={(e) =>
              updateAboutUs({
                ...filtredAboutUsData[0],
                display: e.target.checked ? "1" : "0",
              })
            }
          />
        </Col>
        <Col lg={11}>
          {filtredAboutUsData.map((about) => (
            <>
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
                          {about?.order!}
                        </span>
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu-xs dropdown-menu-end p-0"
                      aria-labelledby="page-header-notifications-dropdown"
                    >
                      <div
                        className="py-2 ps-2"
                        id="notificationItemsTabContent"
                      >
                        {isLoading ? (
                          <span>Loading ...</span>
                        ) : (
                          <ul className="list-unstyled">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                              <li key={num}>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleUpdateOrder(about, num.toString())
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
              <div className="hstack gap-2">
                <input
                  style={{
                    marginBottom: "10px",
                    marginTop: "-8px",
                  }}
                  type="checkbox"
                  checked={localDisplay === "1"}
                  onChange={(e) =>
                    handleCheckboxChangeWithLocalUpdate(
                      about,
                      "image",
                      e.target.checked
                    )
                  }
                />
                <div className="vstack gap-2">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Preview"
                      className="rounded"
                      width="320"
                    />
                  ) : (
                    <Image
                      src={`${process.env.REACT_APP_BASE_URL}/aboutUs/${about?.image.path}`}
                      alt=""
                      className="rounded"
                      width="320"
                    />
                  )}
                  <div className="d-flex justify-content-center mt-n2">
                    <label
                      htmlFor={`image_${about?.image.path}`}
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
                      name={`image_${about?.image.path}`}
                      id={`image_${about?.image.path}`}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, about, "image")}
                      style={{ width: "210px", height: "120px" }}
                    />
                  </div>
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
                    <input
                      style={{
                        marginBottom: "10px",
                        marginTop: "-8px",
                      }}
                      type="checkbox"
                      checked={about.littleTitle.display === "1"}
                      onChange={(e) =>
                        handleCheckboxChange(
                          about,
                          "littleTitle",
                          e.target.checked
                        )
                      }
                    />
                    {editingField.id === about._id &&
                    editingField.field === "littleTitle" ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editedValue}
                        autoFocus
                        onChange={(e) => setEditedValue(e.target.value)}
                        onBlur={() => handleEditSave(about, "littleTitle")}
                      />
                    ) : (
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
                        {about.littleTitle.name}
                      </span>
                    )}
                    <i
                      className="bi bi-pencil"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                      onClick={() =>
                        handleEditStart(
                          about._id as string,
                          "littleTitle",
                          about.littleTitle.name
                        )
                      }
                    ></i>
                  </div>
                  <div className="hstack gap-2">
                    <input
                      type="checkbox"
                      checked={about.bigTitle.display === "1"}
                      onChange={(e) =>
                        handleCheckboxChange(
                          about,
                          "bigTitle",
                          e.target.checked
                        )
                      }
                    />
                    {editingField.id === about._id &&
                    editingField.field === "bigTitle" ? (
                      <input
                        className="form-control"
                        type="text"
                        autoFocus
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        onBlur={() => handleEditSave(about, "bigTitle")}
                      />
                    ) : (
                      <h2 className="h2-with-after">{about.bigTitle.name}</h2>
                    )}
                    <i
                      className="bi bi-pencil"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                      onClick={() =>
                        handleEditStart(
                          about._id as string,
                          "bigTitle",
                          about.bigTitle.name
                        )
                      }
                    ></i>
                  </div>
                  <div className="hstack gap-2">
                    <input
                      type="checkbox"
                      checked={about.paragraph.display === "1"}
                      onChange={(e) =>
                        handleCheckboxChange(
                          about,
                          "paragraph",
                          e.target.checked
                        )
                      }
                    />
                    {editingField.id === about._id &&
                    editingField.field === "paragraph" ? (
                      <textarea
                        className="form-control"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        onBlur={() => {
                          if (editedValue.trim() !== "") {
                            handleEditSave(about, "paragraph");
                          } else {
                            setEditingField({ id: "", field: null });
                          }
                        }}
                      />
                    ) : (
                      <span>{about.paragraph.content.slice(0, 178)}...</span>
                    )}
                    <i
                      className="bi bi-pencil"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                      onClick={() =>
                        handleEditStart(
                          about._id as string,
                          "paragraph",
                          about.paragraph.content
                        )
                      }
                    />
                  </div>
                  <div className="hstack gap-2">
                    <input
                      type="checkbox"
                      checked={about.button.display === "1"}
                      onChange={(e) =>
                        handleCheckboxChange(about, "button", e.target.checked)
                      }
                    />
                    {editingField.id === about._id &&
                    editingField.field === "button" ? (
                      <select
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        onBlur={() => handleEditSave(about, "button")}
                        className="form-control w-25"
                      >
                        {allPages.map((page) => (
                          <option
                            value={`${page.label}|${page.link}`}
                            key={page?._id!}
                          >
                            {page.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        type="button"
                        style={{ width: "100px" }}
                        className="btn btn-danger btn-animation"
                        data-text={`${about.button.label}`}
                      >
                        <span>{about.button.label}</span>
                      </button>
                    )}
                    <i
                      className="bi bi-pencil"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                      onClick={() =>
                        handleEditStart(
                          about._id as string,
                          "button",
                          `${about.button.label}|${about.button.link}`
                        )
                      }
                    ></i>
                  </div>
                  {/* <button
                      type="button"
                      style={{ width: "100px" }}
                      className="btn btn-danger btn-animation"
                      data-text={`${about.button.label}`}
                    >
                      <span>{about.button.label}</span>
                    </button> */}
                </div>
              </div>
            </>
          ))}
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default AboutUs;
