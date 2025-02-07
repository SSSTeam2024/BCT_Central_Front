import React, { useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import {
  useGetAllOurMissionsQuery,
  useUpdateOurMissionMutation,
} from "features/OurMissionsComponent/ourMissionsSlice";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";

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
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const [updateOurMissionMutation] = useUpdateOurMissionMutation();

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
    const mission = AllOurMissions.flatMap((m) => m.missions).find(
      (m) => m.page === pageLink
    );

    console.log("mission!!", mission);
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
    e: React.ChangeEvent<HTMLInputElement>,
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
    const parentMissionIndex = AllOurMissions.findIndex((m) =>
      m.missions.some((mission) => mission.page === pageLink)
    );

    if (parentMissionIndex === -1) return;

    const currentMission =
      AllOurMissions[parentMissionIndex].missions[missionIndex];

    if (!currentMission) {
      console.error("Mission not found at the given index.");
      return;
    }

    const updatedMission = AllOurMissions[parentMissionIndex].missions.map(
      (mission, idx) => {
        if (idx === missionIndex) {
          if (field === "content") {
            return {
              ...mission,
              content:
                updatedValues[pageLink]?.[missionIndex]?.content ||
                mission.content,
            };
          }

          const fieldValue = mission[field];
          if (
            typeof fieldValue === "object" &&
            fieldValue !== null &&
            "name" in fieldValue
          ) {
            return {
              ...mission,
              [field]: {
                ...fieldValue,
                name:
                  updatedValues[pageLink]?.[missionIndex]?.[field] ||
                  fieldValue.name,
              },
            };
          }
        }
        return mission;
      }
    );

    const updatedCollection = {
      ...AllOurMissions[parentMissionIndex],
      missions: updatedMission,
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
                  {isEditing[mission.link]?.[parentMissionIndex]
                    ?.littleTitle ? (
                    <input
                      type="text"
                      value={
                        updatedValues[mission.link]?.[parentMissionIndex]
                          ?.littleTitle || mission.littleTitle.name
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          mission.link,
                          parentMissionIndex,
                          "littleTitle"
                        )
                      }
                      onBlur={() =>
                        handleInputBlur(
                          mission.link,
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
                  {isEditing[mission.link]?.[parentMissionIndex]?.bigTitle ? (
                    <input
                      type="text"
                      value={
                        updatedValues[mission.link]?.[parentMissionIndex]
                          ?.bigTitle || mission.bigTitle.name
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          mission.link,
                          parentMissionIndex,
                          "bigTitle"
                        )
                      }
                      onBlur={() =>
                        handleInputBlur(
                          mission.link,
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
                  {isEditing[mission.link]?.[parentMissionIndex]?.content ? (
                    <input
                      type="text"
                      value={
                        updatedValues[mission.link]?.[parentMissionIndex]
                          ?.content || mission.content
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          mission.link,
                          parentMissionIndex,
                          "content"
                        )
                      }
                      onBlur={() =>
                        handleInputBlur(
                          mission.link,
                          parentMissionIndex,
                          "content"
                        )
                      }
                      className="form-control w-50"
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
            );
          })}
        </Col>
      </Row>
      {/* )}
                    </li>
                  );
                })}
              </ul>
            </div> */}
    </React.Fragment>
  );
};
export default OurMissions;
