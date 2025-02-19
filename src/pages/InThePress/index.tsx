import React, { useState } from "react";
import {
  Container,
  Dropdown,
  Form,
  Row,
  Card,
  Col,
  Button,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import {
  InThePressModel,
  useGetAllInThePressQuery,
  useUpdateInThePressMutation,
} from "features/InThePressComponent/inThePressSlice";
import img5 from "assets/images/about-us.jpg";
import { useGetVehicleGuidesQuery } from "features/vehicleGuideComponent/vehicleGuideSlice";
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

interface FleetProps {
  selectedPage: string;
}

const InThePress: React.FC<FleetProps> = ({ selectedPage }) => {
  const { data: AllInThePress = [] } = useGetAllInThePressQuery();
  const { data = [] } = useGetVehicleGuidesQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: AllOurMissions = [] } = useGetAllOurMissionsQuery();
  const { data: AllValues = [] } = useGetOurValueQuery();

  const [updatedInThePress, { isLoading }] = useUpdateInThePressMutation();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();
  const [updateOurValues] = useUpdateOurValuesMutation();
  const [updateOurMission] = useUpdateOurMissionMutation();

  const filtredInThePressData = AllInThePress.filter(
    (inThePress) => inThePress.page === selectedPage
  );
  const filtredVehicleGuideData = data.filter(
    (ourValue) => ourValue.page.toLowerCase() === selectedPage
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
    offer: InThePressModel,
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
      // const offerServiceToSwap: any = filteredServices.find(
      //   (item) => item.order === selectedOrder
      // );

      const updatePromises = [];

      updatePromises.push(
        updatedInThePress({ ...offer, order: selectedOrder })
      );

      if (valueToSwap) {
        updatePromises.push(
          updateOurValues({ ...valueToSwap, order: offer.order })
        );
      }

      if (valueToSwap) {
        updatePromises.push(
          updateOurValues({ ...valueToSwap, order: offer.order })
        );
      }

      if (offerServiceToSwap) {
        updatePromises.push(
          updateOfferServices({ ...offerServiceToSwap, order: offer.order })
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
      <div className=" border-bottom p-4">
        <Row>
          <Col lg={1}>
            <input
              type="checkbox"
              checked={filtredInThePressData[0]?.display === "1"}
              onChange={(e) =>
                updatedInThePress({
                  ...filtredInThePressData[0],
                  display: e.target.checked ? "1" : "0",
                })
              }
            />
          </Col>

          <Col lg={10}>
            {filtredInThePressData.map((inThePress) => (
              <div className="vstack gap-2">
                <div className="hstack gap-2 d-flex justify-content-center">
                  <h2 className="text-center">{inThePress.title}</h2>
                  <i className="ph ph-pencil"></i>
                </div>
                <div className="hstack gap-2 d-flex justify-content-center">
                  <p className="text-center">{inThePress.paragraph}</p>
                  <i className="ph ph-pencil"></i>
                </div>
                <Row>
                  {inThePress.news.map((press: any) => (
                    <Col lg={6}>
                      <Card>
                        <img
                          className="card-img-top img-fluid w-25"
                          src={`${process.env.REACT_APP_BASE_URL}/inThePressFiles/${press?.image}`}
                          alt="Card img cap"
                        />
                        <Card.Body>
                          <div className="hstack gap-2 mb-2">
                            <span className="fw-bold">{press?.by!}</span>{" "}
                            <i className="ph ph-pencil"></i>/{" "}
                            <span className="fw-medium text-muted">
                              {press?.date!}
                            </span>
                            <i className="ph ph-pencil"></i>
                          </div>
                          <div className="hstack gap-2">
                            <h4 className="card-title mb-2">{press?.title!}</h4>
                            <i className="ph ph-pencil"></i>
                          </div>
                          <div className="hstack gap-2">
                            <p className="card-text text-muted">
                              {" "}
                              {press?.content!}
                            </p>
                            <i className="ph ph-pencil"></i>
                          </div>
                          {/* <p className="card-text">
                                Last updated 3 mins ago
                              </p> */}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
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
                        {filtredInThePressData[0]?.order!}
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
                                    filtredInThePressData[0],
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
export default InThePress;
