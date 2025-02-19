import React, { useState } from "react";
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

interface VehicleClasseProps {
  selectedPage: string;
}

const VehiclesClassComponent: React.FC<VehicleClasseProps> = ({
  selectedPage,
}) => {
  const { data = [] } = useGetVehicleClassQuery();
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllVehicleGuides = [] } = useGetVehicleGuidesQuery();
  const [updateVehicleClasse, { isLoading }] = useUpdateVehicleClassMutation();
  const [updateVehicleGuide] = useUpdateVehicleGuideMutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingParagraphId, setEditingParargraphId] = useState<string | null>(
    null
  );
  const [updatedParagraph, setUpdatedParagraph] = useState<string>("");
  const [updatedBigTitle, setUpdatedBigTitle] = useState<string>("");
  const [vehicleTypes, setVehicleTypes] = useState<any>(null);

  const filtredVehicleClassesData = data.filter(
    (vehicleClasse) => vehicleClasse.page === selectedPage
  );

  const filteredServices = AllOfferServices.filter(
    (service) => service.associatedPage === selectedPage
  );

  const filtredAboutUsData = aboutUsData.filter(
    (aboutUs) => aboutUs.page === selectedPage
  );

  const filtredVehicleGuideData = AllVehicleGuides.filter(
    (ourValue) => ourValue.page.toLowerCase() === selectedPage
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

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].display = checked ? "1" : "0";
    setVehicleTypes(updatedVehicleTypes);
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

  const handleEditTitleClick = (index: number) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].editing = true;
    setVehicleTypes(updatedVehicleTypes);
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].title = newTitle;
    setVehicleTypes(updatedVehicleTypes);
  };

  const handleTitleBlur = (index: number) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].editing = false;
    setVehicleTypes(updatedVehicleTypes);
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
      const offerServiceToSwap: any = filteredServices.find(
        (item) => item.order === selectedOrder
      );
      const vehicleGuideToSwap: any = filtredVehicleGuideData.find(
        (item) => item.order === selectedOrder
      );
      const updatePromises = [];

      updatePromises.push(
        updateVehicleClasse({ ...offer, order: selectedOrder })
      );

      if (valueToSwap) {
        updatePromises.push(
          updateOurValues({ ...valueToSwap, order: offer.order })
        );
      }

      if (vehicleGuideToSwap) {
        updatePromises.push(
          updateVehicleGuide({ ...vehicleGuideToSwap, order: offer.order })
        );
      }

      if (offerServiceToSwap) {
        updatePromises.push(
          updateOfferServices({ ...offerServiceToSwap, order: offer.order })
        );
      }

      if (aboutToSwap) {
        updatePromises.push(
          updateAboutUs({ ...aboutToSwap, order: offer.order })
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
                          vehicleClasse._id!,
                          vehicleClasse.paragraph
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
                            vehicleClasse._id!,
                            vehicleClasse.bigTitle
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
                        handleBlur(vehicleClasse._id!, vehicleClasse.bigTitle)
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
                            vehicleClasse.paragraph
                          )
                        }
                      ></i>
                    </>
                  )}
                </div>
              </Row>
              <Row>
                {vehicleClasse.vehicleTypes.map((vt, index) => (
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
                        <div className="hstack gap-2 align-middle">
                          <i className={`${vt.icon} fs-18`}></i>
                          {vehicleTypes?.editing! ? (
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
