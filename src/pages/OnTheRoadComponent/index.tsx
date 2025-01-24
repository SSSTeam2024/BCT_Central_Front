import React, { useState } from "react";
import { Container, Card, Col, Row, Form } from "react-bootstrap";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import { Link } from "react-router-dom";
import { useGetAllOnTheRoadQuery } from "features/OnTheRoadComponent/onTheRoadSlice";

const OnTheRoadComponent = () => {
  const { data: AllOnTheRoad = [] } = useGetAllOnTheRoadQuery();
  const { data: AllPages = [] } = useGetAllPagesQuery();

  const [selectedPage, setSelectedPage] = useState<string>("");

  const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPage(value);
  };

  const filtredFleet = AllOnTheRoad.filter(
    (onTheRoad) => onTheRoad.page === selectedPage
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Col lg={12}>
            <Card>
              <Card.Header>
                <Row>
                  <Col lg={1}>
                    <Form.Label>Page: </Form.Label>
                  </Col>
                  <Col lg={3}>
                    <select className="form-select" onChange={handleSelectPage}>
                      <option value="">Choose ...</option>
                      {AllPages.map((page) => (
                        <option value={page.link} key={page?._id!}>
                          {page.label}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                {filtredFleet.length !== 0 ? (
                  filtredFleet.map((fleet) => (
                    <Row>
                      {fleet.grids.map((grid) => (
                        <Col xl={6}>
                          <Card className="position-relative">
                            <span className="badge text-bg-danger position-absolute top-0 start-0 m-2">
                              {grid.category}
                            </span>
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/onTheRoadFiles/${grid?.image}`}
                              className="w-50"
                              //   width={200}
                              alt="..."
                            />
                            <Card.Body>
                              <div className="hstack gap-2">
                                <h5 className="card-title">{grid.title}</h5>
                                <i className="ri-pencil-line align-middle fs-17"></i>
                              </div>
                              <div className="hstack gap-2">
                                <p className="card-text text-muted">
                                  {grid.date}
                                </p>
                                <i className="ri-pencil-line align-middle fs-17"></i>
                              </div>
                              <div className="hstack gap-2">
                                <p className="card-text">{grid.details}</p>
                                <i className="ri-pencil-line align-middle fs-17"></i>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  ))
                ) : (
                  <Row>
                    <Col className="d-flex justify-content-center p-5">
                      <h4>
                        Please Select a page with fleet section to update it !!
                      </h4>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default OnTheRoadComponent;
