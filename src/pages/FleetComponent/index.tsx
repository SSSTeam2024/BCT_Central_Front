import React from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import {
  FleetModel,
  useGetAllFleetQuery,
  useUpdateFleetMutation,
} from "features/FleetComponent/fleetSlice";
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

interface FleetProps {
  selectedPage: string;
}

const FleetComponent: React.FC<FleetProps> = ({ selectedPage }) => {
  const { data: AllFleet = [] } = useGetAllFleetQuery();
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();

  const [updateFleetComponent, { isLoading }] = useUpdateFleetMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();

  const filtredFleet = AllFleet.filter((fleet) => fleet.page === selectedPage);

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
    fleet: FleetModel,
    selectedOrder: string
  ) => {
    if (!fleet?._id) return;

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

      const updatePromises = [];

      updatePromises.push(
        updateFleetComponent({ ...fleet, order: selectedOrder })
      );

      if (valueToSwap) {
        updatePromises.push(
          updateOurValues({ ...valueToSwap, order: fleet.order })
        );
      }

      if (aboutToSwap) {
        updatePromises.push(
          updateAboutUs({ ...aboutToSwap, order: fleet.order })
        );
      }

      if (missionToSwap) {
        updatePromises.push(
          updateOurMission({
            _id: missionToSwap.parentId,
            missions: filtredOurMissionsData.map((mission) =>
              mission.order === selectedOrder
                ? { ...mission, order: fleet.order }
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
      <div className="border-bottom p-4">
        <Row>
          <Col lg={1}>
            <input
              type="checkbox"
              checked={filtredFleet[0]?.display === "1"}
              onChange={(e) =>
                updateFleetComponent({
                  ...filtredFleet[0],
                  display: e.target.checked ? "1" : "0",
                })
              }
            />
          </Col>
          <Col lg={10}>
            {filtredFleet.map((fleet) => (
              <Row>
                {fleet.grids.map((grid) => (
                  <Col xl={4}>
                    <Card>
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/fleetFiles/${grid?.image}`}
                        className="card-img-top w-75"
                        alt="..."
                      />
                      <Card.Body>
                        <div className="hstack gap-2">
                          <h5 className="card-title">{grid.title}</h5>
                          <i className="ri-pencil-line align-middle fs-17"></i>
                        </div>
                        {/* <div className="hstack gap-2">
                        <p className="card-text">{grid.details}</p>
                        <i className="ri-pencil-line align-middle fs-17"></i>
                      </div> */}
                        {/* <Link
                        to="/website-fleet"
                        className="link-danger fw-medium text-center"
                      >
                        Read More{" "}
                        <i className="ri-arrow-right-circle-line align-middle fs-18"></i>
                      </Link> */}
                      </Card.Body>
                    </Card>
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
                        {filtredFleet[0]?.order!}
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
                                    filtredFleet[0],
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
      </div>
    </React.Fragment>
  );
};
export default FleetComponent;
