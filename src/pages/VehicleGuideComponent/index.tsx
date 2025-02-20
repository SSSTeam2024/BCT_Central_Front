import React, { useState } from "react";
import { Row, Col, Form, Tab, Nav, Image, Dropdown } from "react-bootstrap";
import {
  VehicleGuideModel,
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
  useGetOurValueQuery,
  useUpdateOurValuesMutation,
} from "features/OurValuesComponent/ourValuesSlice";
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

interface VehicleGuideProps {
  selectedPage: string;
}
const VehicleGuideComponent: React.FC<VehicleGuideProps> = ({
  selectedPage,
}) => {
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data = [] } = useGetVehicleGuidesQuery();
  const { data: AllVehicleClasse = [] } = useGetVehicleClassQuery();
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
  const [updateVehicleGuide, { isLoading }] = useUpdateVehicleGuideMutation();
  const [updateVehicleClasse] = useUpdateVehicleClassMutation();
  const [updateTermCondition] = useUpdateTermConditionMutation();
  const [updateOnTheRoad] = useUpdateOnTheRoadMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedParagraph, setUpdatedParagraph] = useState<string>("");
  const [editingVehicle, setEditingVehicle] = useState<{
    id: string;
    field: "title" | "content" | "image";
    value: string;
  } | null>(null);

  const filtredVehicleGuideData = data.filter(
    (ourValue) => ourValue.page.toLowerCase() === selectedPage
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

  const handleEditClick = (id: string, paragraph: string) => {
    setEditingId(id);
    setUpdatedParagraph(paragraph);
  };

  const handleParagraphChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdatedParagraph(event.target.value);
  };

  const handleBlur = (id: string) => {
    updateVehicleGuide({
      _id: id,
      paragraph: updatedParagraph,
      page: selectedPage,
      vehicleType: [], // Update as needed
    });
    setEditingId(null); // Exit editing mode
  };

  const handleCheckboxChange = (
    vehicleId: string,
    isChecked: boolean,
    parentId: string
  ) => {
    const updatedData = filtredVehicleGuideData.map((item) => {
      if (item._id === parentId) {
        return {
          ...item,
          vehicleType: item.vehicleType.map((vt) =>
            vt.title === vehicleId
              ? { ...vt, display: isChecked.toString() }
              : vt
          ),
        };
      }
      return item;
    });

    const updatedVehicleGuide = updatedData.find(
      (item) => item._id === parentId
    );

    if (updatedVehicleGuide) {
      updateVehicleGuide(updatedVehicleGuide);
    }
  };

  const handleVehicleEdit = (
    id: string,
    field: "title" | "content",
    value: string
  ) => {
    setEditingVehicle({ id, field, value });
  };

  const handleVehicleBlur = (parentId: string) => {
    if (editingVehicle) {
      const updatedData = filtredVehicleGuideData.map((item) => {
        if (item._id === parentId) {
          return {
            ...item,
            vehicleType: item.vehicleType.map((vt) =>
              vt.title === editingVehicle.id
                ? { ...vt, [editingVehicle.field]: editingVehicle.value }
                : vt
            ),
          };
        }
        return item;
      });

      const updatedVehicleGuide = updatedData.find(
        (item) => item._id === parentId
      );

      if (updatedVehicleGuide) {
        updateVehicleGuide(updatedVehicleGuide);
      }

      setEditingVehicle(null);
    }
  };

  const handleUpdateOrder = async (
    offer: VehicleGuideModel,
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
        updateVehicleGuide({ ...offer, order: selectedOrder })
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
      if (vehicleClasseToSwap) {
        updatePromises.push(
          updateVehicleClasse({ ...vehicleClasseToSwap, order: offer.order })
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
      <Row className="p-4 border-bottom">
        <Col lg={1}>
          <input
            type="checkbox"
            checked={filtredVehicleGuideData[0]?.display === "1"}
            onChange={(e) =>
              updateVehicleGuide({
                ...filtredVehicleGuideData[0],
                display: e.target.checked ? "1" : "0",
              })
            }
          />
        </Col>
        <Col lg={11}>
          {filtredVehicleGuideData.map((value) => (
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
                          {filtredVehicleGuideData[0]?.order!}
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
                                    handleUpdateOrder(
                                      filtredVehicleGuideData[0],
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
              <div key={value._id}>
                <Row className="mb-3">
                  <div className="vstack gap-2">
                    <div className="hstack gap-2">
                      {editingId === value._id ? (
                        <textarea
                          value={updatedParagraph}
                          onChange={handleParagraphChange}
                          onBlur={() => handleBlur(value._id!)}
                          autoFocus
                          className="form-control"
                        />
                      ) : (
                        <>
                          <p>{value.paragraph}</p>
                          <i
                            className="bi bi-pencil"
                            style={{
                              cursor: "pointer",
                              marginLeft: "8px",
                            }}
                            onClick={() =>
                              handleEditClick(value._id!, value.paragraph)
                            }
                          ></i>
                        </>
                      )}
                    </div>
                  </div>
                </Row>
                <Tab.Container
                  defaultActiveKey={`v-pills-${value.vehicleType[0]?.title
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
                        {value.vehicleType.map((vt: any, index: any) => (
                          <Nav.Link
                            key={index}
                            eventKey={`v-pills-${vt.title
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                            className="mb-2"
                          >
                            <div className="hstack gap-1">
                              <Form.Check
                                type="checkbox"
                                checked={vt.display === "true"}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    vt.title,
                                    e.target.checked,
                                    value._id!
                                  )
                                }
                                className="me-2"
                              />
                              {editingVehicle?.id === vt.title &&
                              editingVehicle?.field === "title" ? (
                                <input
                                  value={editingVehicle.value}
                                  onChange={(e) =>
                                    setEditingVehicle((prev) => ({
                                      ...prev!,
                                      value: e.target.value,
                                    }))
                                  }
                                  onBlur={() => handleVehicleBlur(value._id!)}
                                  autoFocus
                                  className="form-control"
                                />
                              ) : (
                                <>
                                  {vt.title}
                                  <i
                                    className="bi bi-pencil ms-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleVehicleEdit(
                                        vt.title,
                                        "title",
                                        vt.title
                                      )
                                    }
                                  ></i>
                                </>
                              )}
                            </div>
                          </Nav.Link>
                        ))}
                      </Nav>
                    </Col>
                    <Col md={9}>
                      <Tab.Content
                        className="text-muted mt-4 mt-md-0"
                        id="v-pills-tabContent"
                      >
                        {value.vehicleType.map((vt, index) => (
                          <Tab.Pane
                            key={index}
                            eventKey={`v-pills-${vt.title
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                          >
                            <div className="hstack gap-2 mb-3">
                              {editingVehicle?.id === vt.title &&
                              editingVehicle?.field === "content" ? (
                                <textarea
                                  value={editingVehicle.value}
                                  onChange={(e) =>
                                    setEditingVehicle((prev) => ({
                                      ...prev!,
                                      value: e.target.value,
                                    }))
                                  }
                                  onBlur={() => handleVehicleBlur(value._id!)}
                                  autoFocus
                                  className="form-control"
                                />
                              ) : (
                                <>
                                  <p>{vt.content}</p>
                                  <i
                                    className="bi bi-pencil ms-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleVehicleEdit(
                                        vt.title,
                                        "content",
                                        vt.content
                                      )
                                    }
                                  ></i>
                                </>
                              )}
                            </div>
                            <div className="d-flex mb-2">
                              <div className="flex-shrink-0">
                                <Image
                                  src={`${process.env.REACT_APP_BASE_URL}/VehicleGuide/${vt?.image}`}
                                  alt=""
                                  width="150"
                                  className="rounded"
                                />
                                <i
                                  className="bi bi-upload ms-2 mt-1"
                                  style={{ cursor: "pointer" }}
                                  title="Change Image"
                                ></i>
                              </div>
                            </div>
                          </Tab.Pane>
                        ))}
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </div>
            </>
          ))}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default VehicleGuideComponent;
