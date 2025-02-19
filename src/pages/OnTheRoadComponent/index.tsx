import React, { useState } from "react";
import { Container, Card, Col, Row, Form, Dropdown } from "react-bootstrap";
import {
  OnTheRoadModel,
  useGetAllOnTheRoadQuery,
  useUpdateOnTheRoadMutation,
} from "features/OnTheRoadComponent/onTheRoadSlice";
import {
  useGetOfferServiceQuery,
  useUpdateOfferServiceMutation,
} from "features/OffreServicesComponent/offreServicesSlice";
import {
  useGetAboutUsComponentsQuery,
  useUpdateAboutUsMutation,
} from "features/AboutUsComponent/aboutUsSlice";
import {
  useGetOurValueQuery,
  useUpdateOurValuesMutation,
} from "features/OurValuesComponent/ourValuesSlice";
import {
  useGetAllOurMissionsQuery,
  useUpdateOurMissionMutation,
} from "features/OurMissionsComponent/ourMissionsSlice";

interface OnTheRoadProps {
  selectedPage: string;
}

const OnTheRoadComponent: React.FC<OnTheRoadProps> = ({ selectedPage }) => {
  const { data: AllOnTheRoad = [] } = useGetAllOnTheRoadQuery();
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();

  const [updateOnTheRoad, { isLoading }] = useUpdateOnTheRoadMutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();

  const filtredOnTheRoad = AllOnTheRoad.filter(
    (onTheRoad) => onTheRoad.page === selectedPage
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

  const handleUpdateOrder = async (
    road: OnTheRoadModel,
    selectedOrder: string
  ) => {
    if (!road?._id) return;

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
      const offerToSwap: any = filteredServices.find(
        (item) => item.order === selectedOrder
      );

      const updatePromises = [];

      updatePromises.push(updateOnTheRoad({ ...road, order: selectedOrder }));

      if (valueToSwap) {
        updatePromises.push(
          updateOurValues({ ...valueToSwap, order: road.order })
        );
      }
      if (offerToSwap) {
        updatePromises.push(
          updateOfferServices({ ...offerToSwap, order: road.order })
        );
      }
      if (aboutToSwap) {
        updatePromises.push(
          updateAboutUs({ ...aboutToSwap, order: road.order })
        );
      }

      if (missionToSwap) {
        updatePromises.push(
          updateOurMission({
            _id: missionToSwap.parentId,
            missions: filtredOurMissionsData.map((mission) =>
              mission.order === selectedOrder
                ? { ...mission, order: road.order }
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
            checked={filtredOnTheRoad[0]?.display === "1"}
            onChange={(e) =>
              updateOnTheRoad({
                ...filtredOnTheRoad[0],
                display: e.target.checked ? "1" : "0",
              })
            }
          />
        </Col>
        <Col lg={10}>
          {filtredOnTheRoad.map((fleet) => (
            <Row>
              {fleet.grids.map((grid) => (
                <Col xl={4}>
                  {/* <Card className="position-relative"> */}
                  {/* <span className="badge text-bg-danger position-absolute top-0 start-0 m-2">
                      {grid.category}
                    </span> */}
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/onTheRoadFiles/${grid?.image}`}
                    className="w-75"
                    //   width={200}
                    alt="..."
                  />
                  {/* <Card.Body>
                      <div className="hstack gap-2">
                        <h5 className="card-title">{grid.title}</h5>
                        <i className="ri-pencil-line align-middle fs-17"></i>
                      </div>
                      <div className="hstack gap-2">
                        <p className="card-text text-muted">{grid.date}</p>
                        <i className="ri-pencil-line align-middle fs-17"></i>
                      </div>
                      <div className="hstack gap-2">
                        <p className="card-text">{grid.details}</p>
                        <i className="ri-pencil-line align-middle fs-17"></i>
                      </div>
                    </Card.Body> */}
                  {/* </Card> */}
                </Col>
              ))}
            </Row>
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
                      {filtredOnTheRoad[0]?.order!}
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
                                  filtredOnTheRoad[0],
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
export default OnTheRoadComponent;
