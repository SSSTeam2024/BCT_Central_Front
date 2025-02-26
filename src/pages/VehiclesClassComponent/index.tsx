import React, { useState, useEffect } from "react";
import { Row, Card, Col, Form, Dropdown } from "react-bootstrap";
import {
  useGetVehicleClassQuery,
  useUpdateVehicleClassMutation,
  VehiclesClassModel,
} from "features/VehicleClassComponent/vehicleClassSlice";
import {
  useGetAboutUsComponentsQuery,
  useUpdateAboutUsMutation,
} from "features/AboutUsComponent/aboutUsSlice";
import {
  useGetAllOurMissionsQuery,
  useUpdateOurMissionMutation,
} from "features/OurMissionsComponent/ourMissionsSlice";
import {
  useGetOurValueQuery,
  useUpdateOurValuesMutation,
} from "features/OurValuesComponent/ourValuesSlice";
import {
  useGetOfferServiceQuery,
  useUpdateOfferServiceMutation,
} from "features/OffreServicesComponent/offreServicesSlice";
import {
  useGetVehicleGuidesQuery,
  useUpdateVehicleGuideMutation,
} from "features/vehicleGuideComponent/vehicleGuideSlice";
import {
  useGetTermsConditionsQuery,
  useUpdateTermConditionMutation,
} from "features/TermsConditionsComponent/termsCoditionSlice";
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
import {
  useGetBlock1sQuery,
  useUpdateBlock1Mutation,
} from "features/block1Component/block1Slice";

interface VehicleClasseProps {
  selectedPage: string;
}

const VehiclesClassComponent: React.FC<VehicleClasseProps> = ({
  selectedPage,
}) => {
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data: AllVehicleGuide = [] } = useGetVehicleGuidesQuery();
  const { data = [] } = useGetVehicleClassQuery();
  const { data: AllTermsConditions = [] } = useGetTermsConditionsQuery();
  const { data: AllOnTheRoad = [] } = useGetAllOnTheRoadQuery();
  const { data: AllFleet = [] } = useGetAllFleetQuery();
  const { data: AllInThePress = [] } = useGetAllInThePressQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllBlock1 = [] } = useGetBlock1sQuery();

  const [updatedBlock1] = useUpdateBlock1Mutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();
  const [updateFleetComponent] = useUpdateFleetMutation();
  const [updatedInThePress] = useUpdateInThePressMutation();
  const [updateVehicleGuide] = useUpdateVehicleGuideMutation();
  const [updateVehicleClasse, { isLoading }] = useUpdateVehicleClassMutation();
  const [updateTermCondition] = useUpdateTermConditionMutation();
  const [updateOnTheRoad] = useUpdateOnTheRoadMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingParagraphId, setEditingParargraphId] = useState<string | null>(
    null
  );

  const [updatedParagraph, setUpdatedParagraph] = useState<string>("");
  const [updatedBigTitle, setUpdatedBigTitle] = useState<string>("");
  const [vehicleTypes, setVehicleTypes] = useState<
    {
      title: string;
      link: string;
      icon: string;
      display: string;
      editing?: boolean;
    }[]
  >([]);

  const filtredVehicleGuideData = AllVehicleGuide.filter(
    (vehicleGuide) => vehicleGuide?.page!.toLowerCase() === selectedPage
  );

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

  const filtredVehicleClassesData = data.filter(
    (vehicleClasse) => vehicleClasse.page === selectedPage
  );

  const filtredOnTheRoad = AllOnTheRoad.filter(
    (onTheRoad) => onTheRoad.page === selectedPage
  );

  const filtredFleet = AllFleet.filter((fleet) => fleet.page === selectedPage);

  const filtredInThePressData = AllInThePress.filter(
    (inThePress) => inThePress.page === selectedPage
  );

  const handleCheckboxChange = async (index: number, checked: boolean) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index] = {
      ...updatedVehicleTypes[index],
      display: checked ? "1" : "0",
    };
    setVehicleTypes(updatedVehicleTypes);

    const vehicleClass = filtredVehicleClassesData.find((vc) =>
      vc.vehicleTypes.some((_, idx) => idx === index)
    );

    if (vehicleClass) {
      try {
        await updateVehicleClasse({
          _id: vehicleClass._id,
          vehicleTypes: updatedVehicleTypes,
        }).unwrap();
        console.log("Vehicle class updated successfully");
      } catch (error) {
        console.error("Error updating vehicle class:", error);
      }
    }
  };

  const handleEditClick = (id: string, paragraph: string) => {
    setEditingParargraphId(id);
    setUpdatedParagraph(paragraph);
  };

  const handleEditBigTitle = (id: string, big_title: string) => {
    setEditingId(id);
    setUpdatedBigTitle(big_title);
  };

  const handleParagraphChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdatedParagraph(event.target.value);
  };

  const handleBigTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedBigTitle(event.target.value);
  };

  const handleBlur = (id: string, big_title: string) => {
    const vehicleClass = data.find((vc) => vc._id === id);
    updateVehicleClasse({
      _id: id,
      paragraph: updatedParagraph,
      bigTitle: big_title,
      page: selectedPage,
      vehicleTypes: vehicleClass?.vehicleTypes || [],
    });
    setEditingId(null);
    setEditingParargraphId(null);
  };

  const handleBigTitleBlur = (id: string, paragraph: string) => {
    const vehicleClass = data.find((vc) => vc._id === id);
    updateVehicleClasse({
      _id: id,
      paragraph: paragraph,
      bigTitle: updatedBigTitle,
      page: selectedPage,
      vehicleTypes: vehicleClass?.vehicleTypes || [],
    });
    setEditingId(null);
    setEditingParargraphId(null);
  };

  const handleEditTitleClick = (typeIndex: number) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[typeIndex] = {
      ...updatedVehicleTypes[typeIndex],
      editing: true,
    };
    setVehicleTypes(updatedVehicleTypes);
  };

  const handleTitleChange = (vehicleClassIndex: number, newTitle: string) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[vehicleClassIndex] = {
      ...updatedVehicleTypes[vehicleClassIndex],
      title: newTitle,
    };
    setVehicleTypes(updatedVehicleTypes);
  };

  const handleTitleBlur = async (vehicleClassIndex: number) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[vehicleClassIndex] = {
      ...updatedVehicleTypes[vehicleClassIndex],
      editing: false,
    };
    setVehicleTypes(updatedVehicleTypes);

    const vehicleClass = filtredVehicleClassesData.find((vc) =>
      vc.vehicleTypes.some((_, index) => index === vehicleClassIndex)
    );

    if (vehicleClass) {
      try {
        await updateVehicleClasse({
          _id: vehicleClass._id,
          vehicleTypes: updatedVehicleTypes,
        }).unwrap();
        console.log("Vehicle class updated successfully");
      } catch (error) {
        console.error("Error updating vehicle class:", error);
      }
    }
  };

  const handleUpdateOrder = async (
    offer: VehiclesClassModel,
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
        updateVehicleClasse({ ...offer, order: selectedOrder })
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

  useEffect(() => {
    if (filtredVehicleClassesData.length > 0 && vehicleTypes.length === 0) {
      setVehicleTypes(
        filtredVehicleClassesData[0].vehicleTypes.map((vt) => ({
          ...vt,
          editing: false,
        }))
      );
    }
  }, [filtredVehicleClassesData]);

  return (
    <React.Fragment>
      <Row className="border-bottom">
        <Col lg={1} className="p-4">
          <input
            type="checkbox"
            checked={filtredVehicleClassesData[0]?.display === "1"}
            onChange={(e) =>
              updateVehicleClasse({
                ...filtredVehicleClassesData[0],
                display: e.target.checked ? "1" : "0",
              })
            }
          />
        </Col>

        <Col lg={10} className="p-4">
          {filtredVehicleClassesData.map((vehicleClasse) => (
            <>
              <Row>
                <div className="d-flex justify-content-center hstack gap-3">
                  {editingId === vehicleClasse._id ? (
                    <input
                      type="text"
                      value={updatedBigTitle}
                      onChange={handleBigTitleChange}
                      onBlur={() =>
                        handleBigTitleBlur(
                          vehicleClasse?._id!,
                          vehicleClasse?.paragraph!
                        )
                      }
                      autoFocus
                      className="form-control w-50"
                    />
                  ) : (
                    <>
                      <h2>{vehicleClasse.bigTitle}</h2>
                      <i
                        style={{
                          cursor: "pointer",
                        }}
                        className="ri-pencil-line fs-18"
                        onClick={() =>
                          handleEditBigTitle(
                            vehicleClasse?._id!,
                            vehicleClasse?.bigTitle!
                          )
                        }
                      ></i>
                    </>
                  )}
                </div>

                <div className="hstack gap-3 mb-3">
                  {editingParagraphId === vehicleClasse._id ? (
                    <textarea
                      value={updatedParagraph}
                      onChange={handleParagraphChange}
                      onBlur={() =>
                        handleBlur(vehicleClasse._id!, vehicleClasse?.bigTitle!)
                      }
                      autoFocus
                      className="form-control"
                    />
                  ) : (
                    <>
                      <p>{vehicleClasse.paragraph}</p>
                      <i
                        style={{
                          cursor: "pointer",
                        }}
                        className="ri-pencil-line fs-18"
                        onClick={() =>
                          handleEditClick(
                            vehicleClasse._id!,
                            vehicleClasse?.paragraph!
                          )
                        }
                      ></i>
                    </>
                  )}
                </div>
              </Row>
              <Row>
                <div className="d-flex justify-content-center p-2 text-danger">
                  <div className="hstack gap-1 align-middle">
                    {vehicleTypes.map((vt, index) => (
                      <Col lg={3} key={index}>
                        <Card className="border-danger">
                          <Form.Check
                            type="checkbox"
                            className="m-2"
                            checked={vt.display === "1"}
                            onChange={(e) =>
                              handleCheckboxChange(index, e.target.checked)
                            }
                          />
                          <div className="d-flex justify-content-center p-2 text-danger">
                            <div className="hstack gap-1 align-middle">
                              {vt.editing ? (
                                <input
                                  type="text"
                                  value={vt.title}
                                  onChange={(e) =>
                                    handleTitleChange(index, e.target.value)
                                  }
                                  onBlur={() => handleTitleBlur(index)}
                                  className="form-control"
                                  style={{ width: "auto" }}
                                />
                              ) : (
                                <>
                                  <span>{vt.title}</span>
                                  <i
                                    className="bi bi-pencil-fill ms-2 text-dark"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleEditTitleClick(index)}
                                  ></i>
                                </>
                              )}
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </div>
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
                      {filtredVehicleClassesData[0]?.order!}
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
                                  filtredVehicleClassesData[0],
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
export default VehiclesClassComponent;
