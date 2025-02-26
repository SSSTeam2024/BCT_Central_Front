import React, { useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import {
  useGetAboutUsComponentsQuery,
  useUpdateAboutUsMutation,
} from "features/AboutUsComponent/aboutUsSlice";
import {
  TermConditionModel,
  useGetTermsConditionsQuery,
  useUpdateTermConditionMutation,
} from "features/TermsConditionsComponent/termsCoditionSlice";
import {
  useGetOurValueQuery,
  useUpdateOurValuesMutation,
} from "features/OurValuesComponent/ourValuesSlice";
import {
  useGetAllOurMissionsQuery,
  useUpdateOurMissionMutation,
} from "features/OurMissionsComponent/ourMissionsSlice";
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
  useGetAllOnTheRoadQuery,
  useUpdateOnTheRoadMutation,
} from "features/OnTheRoadComponent/onTheRoadSlice";
import {
  useGetAllFleetQuery,
  useUpdateFleetMutation,
} from "features/FleetComponent/fleetSlice";
import {
  useGetAllInThePressQuery,
  useUpdateInThePressMutation,
} from "features/InThePressComponent/inThePressSlice";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import {
  useGetBlock1sQuery,
  useUpdateBlock1Mutation,
} from "features/block1Component/block1Slice";

interface TermsConditionsModelInterface {
  bigTitle: {
    content: string;
    display: string;
  };
  paragraph: {
    content: string;
    display: string;
  };
}

interface TermsConditionProps {
  selectedPage: string;
}

const TermsConditions: React.FC<TermsConditionProps> = ({ selectedPage }) => {
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
  const { data: AllBlock1 = [] } = useGetBlock1sQuery();

  const [updatedBlock1] = useUpdateBlock1Mutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();
  const [updateFleetComponent] = useUpdateFleetMutation();
  const [updatedInThePress] = useUpdateInThePressMutation();
  const [updateVehicleGuide] = useUpdateVehicleGuideMutation();
  const [updateVehicleClasse] = useUpdateVehicleClassMutation();
  const [updateTermCondition, { isLoading }] = useUpdateTermConditionMutation();
  const [updateOnTheRoad] = useUpdateOnTheRoadMutation();

  const filtredBlock1Data = AllBlock1.filter(
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

  const [editingField, setEditingField] = useState<{
    id: string;
    field: string | null;
  }>({ id: "", field: null });
  const [editedValue, setEditedValue] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCheckboxChange = (
    about: TermConditionModel,
    field: keyof TermsConditionsModelInterface,
    value: boolean
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "display" in about[field]!
    ) {
      const updatedData: TermConditionModel = {
        ...about,
        [field]: {
          ...about[field],
          display: value ? "1" : "0",
        },
      };

      updateTermCondition(updatedData)
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
    about: TermConditionModel,
    field: keyof TermsConditionsModelInterface
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
      updateTermCondition(updatedData);
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
      updateTermCondition(updatedData);
      setEditingField({ id: "", field: null });
    }
  };

  const handleUpdateOrder = async (
    offer: TermConditionModel,
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

      updatePromises.push(
        updateTermCondition({ ...offer, order: selectedOrder })
      );

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
      {filtredTermsConditionData.map((term) => (
        <Row className="border-bottom p-4">
          <Col lg={1}>
            <input
              type="checkbox"
              checked={term?.display === "1"}
              onChange={(e) =>
                updateTermCondition({
                  ...term,
                  display: e.target.checked ? "1" : "0",
                })
              }
            />
          </Col>
          <Col lg={10}>
            <div className="hstack gap-2">
              <div className="vstack gap-3">
                <div className="hstack gap-2">
                  <input
                    type="checkbox"
                    checked={term.bigTitle.display === "1"}
                    onChange={(e) =>
                      handleCheckboxChange(term, "bigTitle", e.target.checked)
                    }
                  />
                  {editingField.id === term._id &&
                  editingField.field === "bigTitle" ? (
                    <input
                      className="form-control"
                      type="text"
                      autoFocus
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      onBlur={() => handleEditSave(term, "bigTitle")}
                    />
                  ) : (
                    <h3>{term.bigTitle.content}</h3>
                  )}
                  <i
                    className="bi bi-pencil"
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                    onClick={() =>
                      handleEditStart(
                        term._id as string,
                        "bigTitle",
                        term.bigTitle.content
                      )
                    }
                  ></i>
                </div>
                <div className="hstack gap-2">
                  <input
                    type="checkbox"
                    checked={term.paragraph.display === "1"}
                    onChange={(e) =>
                      handleCheckboxChange(term, "paragraph", e.target.checked)
                    }
                  />
                  {editingField.id === term._id &&
                  editingField.field === "paragraph" ? (
                    <textarea
                      className="form-control"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      onBlur={() => {
                        if (editedValue.trim() !== "") {
                          handleEditSave(term, "paragraph");
                        } else {
                          setEditingField({ id: "", field: null });
                        }
                      }}
                    />
                  ) : (
                    <span>{term.paragraph.content.slice(0, 178)}...</span>
                  )}
                  <i
                    className="bi bi-pencil"
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                    onClick={() =>
                      handleEditStart(
                        term._id as string,
                        "paragraph",
                        term.paragraph.content
                      )
                    }
                  />
                </div>
              </div>
            </div>
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
                      <span className="notification-badge">{term?.order!}</span>
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
                                  handleUpdateOrder(term, num.toString())
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
export default TermsConditions;
