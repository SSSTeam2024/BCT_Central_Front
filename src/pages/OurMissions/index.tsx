import React, { useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";

import {
  OurMissionCollection,
  useGetAllOurMissionsQuery,
  useUpdateOurMissionMutation,
} from "features/OurMissionsComponent/ourMissionsSlice";
import {
  useGetAboutUsComponentsQuery,
  useUpdateAboutUsMutation,
} from "features/AboutUsComponent/aboutUsSlice";
import {
  useGetOurValueQuery,
  useUpdateOurValuesMutation,
} from "features/OurValuesComponent/ourValuesSlice";
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

type MissionField = { name: string; display: string };

interface Mission {
  littleTitle: MissionField;
  bigTitle: MissionField;
  content: MissionField;
  page: string;
}

interface MissionGroup {
  missions: Mission[];
}

interface OurMissionsProps {
  filtredOurMissionsData: any[];
  selectedPage: string;
}

const OurMissions: React.FC<OurMissionsProps> = ({
  filtredOurMissionsData,
  selectedPage,
}) => {
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data: AllFleet = [] } = useGetAllFleetQuery();
  const { data: AllInThePress = [] } = useGetAllInThePressQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllVehicleGuide = [] } = useGetVehicleGuidesQuery();
  const { data: AllVehicleClasse = [] } = useGetVehicleClassQuery();
  const { data: AllTermsConditions = [] } = useGetTermsConditionsQuery();
  const { data: AllOnTheRoad = [] } = useGetAllOnTheRoadQuery();
  const { data: AllBlock1 = [] } = useGetBlock1sQuery();

  const [updateOurMissionMutation, { isLoading }] =
    useUpdateOurMissionMutation();

  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateFleetComponent] = useUpdateFleetMutation();
  const [updatedInThePress] = useUpdateInThePressMutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateVehicleGuide] = useUpdateVehicleGuideMutation();
  const [updateVehicleClasse] = useUpdateVehicleClassMutation();
  const [updateTermCondition] = useUpdateTermConditionMutation();
  const [updateOnTheRoad] = useUpdateOnTheRoadMutation();
  const [updatedBlock1] = useUpdateBlock1Mutation();

  const filtredAboutUsData = aboutUsData.filter(
    (aboutUs) => aboutUs.page === selectedPage
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
    (vehicleGuide) => vehicleGuide?.page!.toLowerCase() === selectedPage
  );

  const filteredServices = AllOfferServices.filter(
    (service) => service.associatedPage === selectedPage
  );

  const [isEditing, setIsEditing] = useState<{
    [pageLink: string]: {
      [missionIndex: number]: { [field: string]: boolean };
    };
  }>({});

  const [updatedValues, setUpdatedValues] = useState<{
    [pageLink: string]: { [missionIndex: number]: { [field: string]: string } };
  }>({});

  const handleCheckboxToggle = (
    allMissionsIndex: number,
    missionIndex: number,
    titleType: "littleTitle" | "bigTitle"
  ) => {
    const currentDisplay =
      AllOurMissions[allMissionsIndex].missions[missionIndex]?.[titleType]
        .display || "0";
    const newDisplay = currentDisplay === "0" ? "1" : "0";

    updateOurMissionMutation({
      ...AllOurMissions[allMissionsIndex],
      missions: AllOurMissions[allMissionsIndex].missions.map((mission, idx) =>
        idx === missionIndex
          ? {
              ...mission,
              [titleType]: {
                ...mission[titleType],
                display: newDisplay,
              },
            }
          : mission
      ),
    });
  };

  const handleEditIconClick = (
    pageLink: string,
    missionIndex: number,
    field: "littleTitle" | "bigTitle" | "content"
  ) => {
    const parentMission = AllOurMissions.find((m) =>
      m.missions.some((mission) => mission.page === pageLink)
    );

    if (!parentMission) return;

    const mission = parentMission.missions[missionIndex];
    if (!mission) return;

    const fieldValue =
      field === "content" ? mission[field] : mission[field]?.name || "";

    setIsEditing((prev) => ({
      ...prev,
      [pageLink]: {
        ...prev[pageLink],
        [missionIndex]: {
          ...prev[pageLink]?.[missionIndex],
          [field]: true,
        },
      },
    }));

    setUpdatedValues((prev) => ({
      ...prev,
      [pageLink]: {
        ...prev[pageLink],
        [missionIndex]: {
          ...prev[pageLink]?.[missionIndex],
          [field]: fieldValue,
        },
      },
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    pageLink: string,
    missionIndex: number,
    field: "littleTitle" | "bigTitle" | "content"
  ) => {
    const value = e.target.value;

    setUpdatedValues((prev) => ({
      ...prev,
      [pageLink]: {
        ...prev[pageLink],
        [missionIndex]: {
          ...prev[pageLink]?.[missionIndex],
          [field]: value,
        },
      },
    }));
  };

  const handleInputBlur = (
    pageLink: string,
    missionIndex: number,
    field: "littleTitle" | "bigTitle" | "content"
  ) => {
    console.log(
      "handleInputBlur triggered for:",
      pageLink,
      missionIndex,
      field
    );

    const parentMissionIndex = AllOurMissions.findIndex((m) =>
      m.missions.some((mission) => mission.page === pageLink)
    );

    if (parentMissionIndex === -1) {
      console.error("Parent mission not found!");
      return;
    }

    const parentMission = AllOurMissions[parentMissionIndex];
    const currentMission = parentMission.missions[missionIndex];

    if (!currentMission) {
      console.error("Mission not found at the given index.");
      return;
    }

    const updatedMissions = parentMission.missions.map((mission, idx) => {
      if (idx === missionIndex) {
        if (field === "content") {
          return {
            ...mission,
            content:
              updatedValues[pageLink]?.[missionIndex]?.content ||
              mission.content,
          };
        }

        return {
          ...mission,
          [field]: {
            ...mission[field],
            name:
              updatedValues[pageLink]?.[missionIndex]?.[field] ||
              mission[field].name,
          },
        };
      }
      return mission;
    });

    const updatedCollection = {
      ...parentMission,
      missions: updatedMissions,
    };

    updateOurMissionMutation(updatedCollection);

    setIsEditing((prev) => ({
      ...prev,
      [pageLink]: {
        ...prev[pageLink],
        [missionIndex]: {
          ...prev[pageLink]?.[missionIndex],
          [field]: false,
        },
      },
    }));
  };

  const handleUpdateOrder = async (
    about: any,
    selectedOrder: string,
    parentId: string
  ) => {
    if (!about?._id || !parentId) {
      console.error("About object, its _id, or parentId is undefined");
      return;
    }

    try {
      const aboutToSwap = filtredAboutUsData.find(
        (item) => item.order === selectedOrder
      );
      const valueToSwap = filtredOurValuesData.find(
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
      let about_ref = { ...about };
      about_ref.order = selectedOrder;

      updatePromises.push(
        updateOurMissionMutation({
          _id: parentId,
          missions: [about_ref] /* filtredOurMissionsData.map((mission) =>
            mission.order === selectedOrder
              ? { ...mission, order: about.order }
              : mission
          ) */,
        })
      );

      // console.log("about_ref", about_ref);
      // // let missions = filtredOurMissionsData.map((mission) =>
      // //   mission.order === selectedOrder
      // //     ? { ...mission, order: selectedOrder }
      // //     : mission
      // // );
      // console.log("about", about);

      if (aboutToSwap) {
        updatePromises.push(
          updateAboutUs({ ...aboutToSwap, order: about.order })
        );
      }
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
            checked={filtredOurMissionsData[0]?.display! === "1"}
            onChange={(e) => {
              const parentMissionCollection = AllOurMissions.find(
                (collection) =>
                  collection.missions.some(
                    (mission: any) =>
                      mission?._id! === filtredOurMissionsData[0]?._id
                  )
              );

              if (!parentMissionCollection) {
                console.error("Parent document not found!");
                return;
              }

              const updatedMissions = parentMissionCollection.missions.map(
                (mission: any) =>
                  mission._id === filtredOurMissionsData[0]?._id
                    ? { ...mission, display: e.target.checked ? "1" : "0" }
                    : mission
              );

              updateOurMissionMutation({
                _id: parentMissionCollection._id,
                missions: updatedMissions,
              });
            }}
          />
        </Col>
        <Col>
          {filtredOurMissionsData.map((mission, missionIndex) => {
            const allMissionsIndex = AllOurMissions.findIndex((m) =>
              m.missions.some((item) => item === mission)
            );

            const parentMissionIndex =
              allMissionsIndex !== -1
                ? AllOurMissions[allMissionsIndex].missions.findIndex(
                    (item) => item === mission
                  )
                : -1;
            if (parentMissionIndex === -1) {
              return null;
            }
            return (
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
                            {mission?.order!}
                          </span>
                          <span className="visually-hidden">
                            unread messages
                          </span>
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
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                                (num) => (
                                  <li key={num}>
                                    <button
                                      className="dropdown-item"
                                      onClick={() =>
                                        handleUpdateOrder(
                                          mission,
                                          num.toString(),
                                          AllOurMissions[allMissionsIndex]?._id!
                                        )
                                      }
                                    >
                                      {num}
                                    </button>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div
                  key={`${mission.page}-${parentMissionIndex}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="hstack gap-3 m-3"
                  >
                    <input
                      type="checkbox"
                      checked={mission?.littleTitle.display === "1"}
                      onChange={() =>
                        handleCheckboxToggle(
                          allMissionsIndex,
                          parentMissionIndex,
                          "littleTitle"
                        )
                      }
                    />
                    {isEditing[mission.page]?.[parentMissionIndex]
                      ?.littleTitle ? (
                      <input
                        type="text"
                        value={
                          updatedValues[mission.page]?.[parentMissionIndex]
                            ?.littleTitle || mission.littleTitle.name
                        }
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            mission.page,
                            parentMissionIndex,
                            "littleTitle"
                          )
                        }
                        onBlur={() =>
                          handleInputBlur(
                            mission.page,
                            parentMissionIndex,
                            "littleTitle"
                          )
                        }
                        className="form-control w-50"
                      />
                    ) : (
                      <span
                        style={{
                          textTransform: "uppercase",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#CD2528",
                        }}
                        className="justify-content-center"
                      >
                        {mission?.littleTitle.name}
                      </span>
                    )}
                    <i
                      className="ri-pencil-line"
                      style={{
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                      onClick={() =>
                        handleEditIconClick(
                          mission.page,
                          parentMissionIndex,
                          "littleTitle"
                        )
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="hstack gap-3 m-3"
                  >
                    <input
                      type="checkbox"
                      checked={mission?.bigTitle.display === "1"}
                      onChange={() =>
                        handleCheckboxToggle(
                          allMissionsIndex,
                          parentMissionIndex,
                          "bigTitle"
                        )
                      }
                    />
                    {isEditing[mission.page]?.[parentMissionIndex]?.bigTitle ? (
                      <input
                        type="text"
                        value={
                          updatedValues[mission.page]?.[parentMissionIndex]
                            ?.bigTitle || mission.bigTitle.name
                        }
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            mission.page,
                            parentMissionIndex,
                            "bigTitle"
                          )
                        }
                        onBlur={() =>
                          handleInputBlur(
                            mission.page,
                            parentMissionIndex,
                            "bigTitle"
                          )
                        }
                        className="form-control w-50"
                      />
                    ) : (
                      <span
                        style={{
                          textTransform: "uppercase",
                          fontSize: "18px",
                          fontWeight: 800,
                          color: "#000",
                        }}
                        className="justify-content-center"
                      >
                        {mission?.bigTitle.name}
                      </span>
                    )}
                    <i
                      className="ri-pencil-line"
                      style={{
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                      onClick={() =>
                        handleEditIconClick(
                          mission.page,
                          parentMissionIndex,
                          "bigTitle"
                        )
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="hstack gap-3 m-3"
                  >
                    {isEditing[mission.page]?.[parentMissionIndex]?.content ? (
                      <textarea
                        rows={3}
                        value={
                          updatedValues[mission.page]?.[parentMissionIndex]
                            ?.content || mission.content
                        }
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            mission.page,
                            parentMissionIndex,
                            "content"
                          )
                        }
                        onBlur={() =>
                          handleInputBlur(
                            mission.page,
                            parentMissionIndex,
                            "content"
                          )
                        }
                        className="form-control"
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#000",
                        }}
                        className="justify-content-center"
                      >
                        {mission?.content?.slice(0, 176)}...
                      </span>
                    )}
                    <i
                      className="ri-pencil-line"
                      style={{
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                      onClick={() =>
                        handleEditIconClick(
                          mission.page,
                          parentMissionIndex,
                          "content"
                        )
                      }
                    />
                  </div>
                </div>
              </>
            );
          })}
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default OurMissions;
