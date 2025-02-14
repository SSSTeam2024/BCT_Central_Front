import React, { useState } from "react";
import { Container, Card, Col, Row, Form } from "react-bootstrap";
import { useGetAllFleetQuery } from "features/FleetComponent/fleetSlice";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import { Link } from "react-router-dom";

interface FleetProps {
  selectedPage: string;
}

const FleetComponent: React.FC<FleetProps> = ({ selectedPage }) => {
  const { data: AllFleet = [] } = useGetAllFleetQuery();
  const { data: AllPages = [] } = useGetAllPagesQuery();

  const filtredFleet = AllFleet.filter((fleet) => fleet.page === selectedPage);

  return (
    <React.Fragment>
      <div className="p-4">
        {filtredFleet.length !== 0 ? (
          filtredFleet.map((fleet) => (
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
                      <div className="hstack gap-2">
                        <p className="card-text">{grid.details}</p>
                        <i className="ri-pencil-line align-middle fs-17"></i>
                      </div>
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
          ))
        ) : (
          <Row>
            <Col className="d-flex justify-content-center p-5">
              <h4>Please Select a page with fleet section to update it !!</h4>
            </Col>
          </Row>
        )}
      </div>
    </React.Fragment>
  );
};
export default FleetComponent;
