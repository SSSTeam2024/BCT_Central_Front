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
import { useGetAllInThePressQuery } from "features/InThePressComponent/inThePressSlice";
import img5 from "assets/images/about-us.jpg";

const InThePress = () => {
  document.title = " In The Press | Coach Hire Network";

  const { data: AllInThePress = [] } = useGetAllInThePressQuery();

  //   const { data: AllPages = [] } = useGetAllPagesQuery();

  //   const [selectedPage, setSelectedPage] = useState<string>("");

  //   const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const value = event.target.value;
  //     setSelectedPage(value);
  //   };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="In The Press" pageTitle="Web Site Settings" />
          <Col lg={12}>
            <Card>
              {/* <Card.Header>
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
              </Card.Header> */}
              <Card.Body>
                {AllInThePress.map((inThePress) => (
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
                                <span className="fw-bold">{press.by}</span>{" "}
                                <i className="ph ph-pencil"></i>/{" "}
                                <span className="fw-medium text-muted">
                                  {press.date}
                                </span>
                                <i className="ph ph-pencil"></i>
                              </div>
                              <div className="hstack gap-2">
                                <h4 className="card-title mb-2">
                                  {press.title}
                                </h4>
                                <i className="ph ph-pencil"></i>
                              </div>
                              <div className="hstack gap-2">
                                <p className="card-text text-muted">
                                  {" "}
                                  {press.content}
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
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default InThePress;
