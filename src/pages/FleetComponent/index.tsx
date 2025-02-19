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

interface FleetProps {
  selectedPage: string;
}

const FleetComponent: React.FC<FleetProps> = ({ selectedPage }) => {
  const { data: AllFleet = [] } = useGetAllFleetQuery();
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();
  const { data: AllInThePress = [] } = useGetAllInThePressQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllVehicleGuide = [] } = useGetVehicleGuidesQuery();
  const { data: AllVehicleClasse = [] } = useGetVehicleClassQuery();
  const { data: AllTermsConditions = [] } = useGetTermsConditionsQuery();
  const { data: AllOnTheRoad = [] } = useGetAllOnTheRoadQuery();
  const { data: AllBlock1 = [] } = useGetBlock1sQuery();

  const [updateFleetComponent, { isLoading }] = useUpdateFleetMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();
  const [updatedBlock1] = useUpdateBlock1Mutation();
  const [updatedInThePress] = useUpdateInThePressMutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateVehicleGuide] = useUpdateVehicleGuideMutation();
  const [updateVehicleClasse] = useUpdateVehicleClassMutation();
  const [updateTermCondition] = useUpdateTermConditionMutation();
  const [updateOnTheRoad] = useUpdateOnTheRoadMutation();

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

  const filtredInThePressData = AllInThePress.filter(
    (inThePress) => inThePress.page === selectedPage
  );
  const filtredVehicleGuideData = AllVehicleGuide.filter(
    (vehicleGuide) => vehicleGuide.page.toLowerCase() === selectedPage
  );

  const filteredServices = AllOfferServices.filter(
    (service) => service.associatedPage === selectedPage
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
        updateFleetComponent({ ...fleet, order: selectedOrder })
      );

      if (valueToSwap) {
        updatePromises.push(
          updateOurValues({ ...valueToSwap, order: fleet.order })
        );
      }
      if (block1ToSwap) {
        updatePromises.push(
          updatedBlock1({ ...block1ToSwap, order: fleet.order })
        );
      }
      if (termsToSwap) {
        updatePromises.push(
          updateTermCondition({ ...termsToSwap, order: fleet.order })
        );
      }
      if (onTheRoadToSwap) {
        updatePromises.push(
          updateOnTheRoad({ ...onTheRoadToSwap, order: fleet.order })
        );
      }
      if (aboutToSwap) {
        updatePromises.push(
          updateAboutUs({ ...aboutToSwap, order: fleet.order })
        );
      }
      if (vehicleClasseToSwap) {
        updatePromises.push(
          updateVehicleClasse({ ...vehicleClasseToSwap, order: fleet.order })
        );
      }
      if (vehicleGuideToSwap) {
        updatePromises.push(
          updateVehicleGuide({ ...vehicleGuideToSwap, order: fleet.order })
        );
      }
      if (inThePressToSwap) {
        updatePromises.push(
          updatedInThePress({ ...inThePressToSwap, order: fleet.order })
        );
      }
      if (offerServiceToSwap) {
        updatePromises.push(
          updateOfferServices({ ...offerServiceToSwap, order: fleet.order })
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
