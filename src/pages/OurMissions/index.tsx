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

const OurMissions = () => {
  document.title = "Web Site Our Missions | Coach Hire Network";
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllPages = [] } = useGetAllPagesQuery();
  const [updateOurMissionMutation] = useUpdateOurMissionMutation();
  const [expandedPages, setExpandedPages] = useState<any[]>([]);

  const togglePage = (pageLink: any) => {
    setExpandedPages((prev) =>
      prev.includes(pageLink)
        ? prev.filter((link) => link !== pageLink)
        : [...prev, pageLink]
    );
  };

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

  console.log("updated values", updatedValues);
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
            // Update the content directly since it's a string
            return {
              ...mission,
              content:
                updatedValues[pageLink]?.[missionIndex]?.content ||
                mission.content,
            };
          }

          // Handle littleTitle and bigTitle (objects with name)
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

    console.log("updatedMission", updatedMission);

    const updatedCollection = {
      ...AllOurMissions[parentMissionIndex],
      missions: updatedMission,
    };

    // Trigger the mutation
    updateOurMissionMutation(updatedCollection);

    // Reset the editing state
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
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title="Web Site Our Missions"
            pageTitle="WebSite Setting"
          />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <div>
                  <ul>
                    {AllPages.map((page) => {
                      const missionsForPage = AllOurMissions.flatMap(
                        (mission) =>
                          mission.missions.filter((m) => m.page === page.link)
                      );
                      const isExpanded = expandedPages.includes(page.link);
                      return (
                        <li key={page.label}>
                          <strong
                            className="text-primary text-opacity-75 mb-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => togglePage(page.link)}
                          >
                            Page: {page.label}
                          </strong>
                          {isExpanded && (
                            <Row>
                              {missionsForPage.length > 0 ? (
                                missionsForPage.map((mission, missionIndex) => {
                                  const allMissionsIndex =
                                    AllOurMissions.findIndex((m) =>
                                      m.missions.some(
                                        (item) => item === mission
                                      )
                                    );

                                  const parentMissionIndex =
                                    allMissionsIndex !== -1
                                      ? AllOurMissions[
                                          allMissionsIndex
                                        ].missions.findIndex(
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
                                          checked={
                                            mission?.littleTitle.display === "1"
                                          }
                                          onChange={() =>
                                            handleCheckboxToggle(
                                              allMissionsIndex,
                                              parentMissionIndex,
                                              "littleTitle"
                                            )
                                          }
                                        />
                                        {isEditing[page.link]?.[
                                          parentMissionIndex
                                        ]?.littleTitle ? (
                                          <input
                                            type="text"
                                            value={
                                              updatedValues[page.link]?.[
                                                parentMissionIndex
                                              ]?.littleTitle ||
                                              mission.littleTitle.name
                                            }
                                            onChange={(e) =>
                                              handleInputChange(
                                                e,
                                                page.link,
                                                parentMissionIndex,
                                                "littleTitle"
                                              )
                                            }
                                            onBlur={() =>
                                              handleInputBlur(
                                                page.link,
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
                                          checked={
                                            mission?.bigTitle.display === "1"
                                          }
                                          onChange={() =>
                                            handleCheckboxToggle(
                                              allMissionsIndex,
                                              parentMissionIndex,
                                              "bigTitle"
                                            )
                                          }
                                        />
                                        {isEditing[page.link]?.[
                                          parentMissionIndex
                                        ]?.bigTitle ? (
                                          <input
                                            type="text"
                                            value={
                                              updatedValues[page.link]?.[
                                                parentMissionIndex
                                              ]?.bigTitle ||
                                              mission.bigTitle.name
                                            }
                                            onChange={(e) =>
                                              handleInputChange(
                                                e,
                                                page.link,
                                                parentMissionIndex,
                                                "bigTitle"
                                              )
                                            }
                                            onBlur={() =>
                                              handleInputBlur(
                                                page.link,
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
                                        {isEditing[page.link]?.[
                                          parentMissionIndex
                                        ]?.content ? (
                                          <input
                                            type="text"
                                            value={
                                              updatedValues[page.link]?.[
                                                parentMissionIndex
                                              ]?.content || mission.content
                                            }
                                            onChange={(e) =>
                                              handleInputChange(
                                                e,
                                                page.link,
                                                parentMissionIndex,
                                                "content"
                                              )
                                            }
                                            onBlur={() =>
                                              handleInputBlur(
                                                page.link,
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
                                            {mission?.content}
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
                                })
                              ) : (
                                <li>No missions available for this page</li>
                              )}
                            </Row>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default OurMissions;
