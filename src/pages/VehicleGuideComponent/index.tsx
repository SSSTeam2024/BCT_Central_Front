import React, { useState } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Form,
  Tab,
  Nav,
  Image,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import {
  VehicleGuideModel,
  useGetVehicleGuidesQuery,
  useUpdateVehicleGuideMutation,
} from "features/vehicleGuideComponent/vehicleGuideSlice";

const VehicleGuideComponent = () => {
  document.title = "Vehicles Guide | Coach Hire Network";
  const { data = [] } = useGetVehicleGuidesQuery();
  const [updateVehicleGuide] = useUpdateVehicleGuideMutation();
  const { data: AllPages = [] } = useGetAllPagesQuery();

  const [selectedPage, setSelectedPage] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedParagraph, setUpdatedParagraph] = useState<string>("");
  const [editingVehicle, setEditingVehicle] = useState<{
    id: string;
    field: "title" | "content" | "image";
    value: string;
  } | null>(null);

  const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPage(value);
    setEditingId(null);
  };

  const filtredOurValuesData = data.filter(
    (ourValue) => ourValue.page.toLowerCase() === selectedPage
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
    const updatedData = filtredOurValuesData.map((item) => {
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
      const updatedData = filtredOurValuesData.map((item) => {
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

      setEditingVehicle(null); // Exit editing mode
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Vehicles Guide" pageTitle="Web Site Settings" />
          <Card>
            <Card.Header className="p-3">
              <Row className="p-3">
                <Col lg={1}>
                  <Form.Label>Pages:</Form.Label>
                </Col>
                <Col lg={4}>
                  <select className="form-select" onChange={handleSelectPage}>
                    <option value="">Select page</option>
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
              {filtredOurValuesData.length !== 0 ? (
                filtredOurValuesData.map((value) => (
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
                                      onBlur={() =>
                                        handleVehicleBlur(value._id!)
                                      }
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
                                      onBlur={() =>
                                        handleVehicleBlur(value._id!)
                                      }
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
                ))
              ) : (
                <h4 className="m-5 d-flex justify-content-center">
                  Please Select a page with Vehicles Guide Section to update it
                  !!
                </h4>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VehicleGuideComponent;
