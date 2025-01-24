import React, { useState } from "react";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import {
  useGetVehicleClassQuery,
  useUpdateVehicleClassMutation,
} from "features/VehicleClassComponent/vehicleClassSlice";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";

const VehiclesClassComponent = () => {
  document.title = "Vehicle Classes | Coach Hire Network";
  const { data = [] } = useGetVehicleClassQuery();
  const { data: AllPages = [] } = useGetAllPagesQuery();
  const [updateVehicleClasse] = useUpdateVehicleClassMutation();

  const [selectedPage, setSelectedPage] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingParagraphId, setEditingParargraphId] = useState<string | null>(
    null
  );
  const [updatedParagraph, setUpdatedParagraph] = useState<string>("");
  const [updatedBigTitle, setUpdatedBigTitle] = useState<string>("");
  const [vehicleTypes, setVehicleTypes] = useState<any>(null);

  const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPage(value);
  };

  const filtredVehicleClassesData = data.filter(
    (vehicleClasse) => vehicleClasse.page === selectedPage
  );

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].display = checked ? "true" : "false";
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
    updatedVehicleTypes[index].editing = true; // Add `editing` flag to enable input
    setVehicleTypes(updatedVehicleTypes);
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].title = newTitle;
    setVehicleTypes(updatedVehicleTypes);
  };

  const handleTitleBlur = (index: number) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].editing = false; // Turn off editing mode
    setVehicleTypes(updatedVehicleTypes);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Vehicle Classes" pageTitle="Web Site Settings" />
          <Col lg={12}>
            <Card>
              <Card.Header className="border-0">
                <Row className="p-3">
                  <Col lg={1}>
                    <Form.Label>Page :</Form.Label>
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
                              handleBlur(
                                vehicleClasse._id!,
                                vehicleClasse.bigTitle
                              )
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
                            <Link
                              to={`${vt.link}`}
                              className="d-flex justify-content-center p-2 text-danger"
                            >
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
                                      onClick={() =>
                                        handleEditTitleClick(index)
                                      }
                                    ></i>
                                  </>
                                )}
                              </div>
                            </Link>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default VehiclesClassComponent;
