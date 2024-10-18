import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";
import { useUpdateDefectMutation } from "features/Defects/defectSlice";

const EditDefect = () => {
  document.title = "Edit Defect | Coach Hire Network";

  const navigate = useNavigate();
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Defect is updated successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyError = (err: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [showLevel, setShowLevel] = useState<boolean>(false);
  const [showVehicle, setShowVehicle] = useState<boolean>(false);
  const [showIssue, setShowIssue] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);

  const defectLocation = useLocation();

  const [defect_note, setDefectNote] = useState<string>(
    defectLocation?.state?.note ?? ""
  );

  const [defect_time, setDefectTime] = useState<string>(
    defectLocation?.state?.time ?? ""
  );

  const handleDefectNote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDefectNote(e.target.value);
  };

  const handleDefectTime = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDefectTime(e.target.value);
  };

  const [selectDefectStatus, setSelectedDefectStatus] = useState<string>("");
  // This function is triggered when the select defect status
  const handleSelectDefectStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedDefectStatus(value);
  };

  const [selectVehicle, setSelectedVehicle] = useState<string>("");
  // This function is triggered when the select Vehicle
  const handleSelectVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedVehicle(value);
  };

  const [selectIssue, setSelectedIssue] = useState<string>("");
  // This function is triggered when the select Issue
  const handleSelectIssue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedIssue(value);
  };

  const [selectLevel, setSelectedLevel] = useState<string>("");
  // This function is triggered when the select Level
  const handleSelectLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLevel(value);
  };

  const currentDate = new Date();

  const [updateDefect] = useUpdateDefectMutation();

  const initialDefect = {
    _id: "",
    vehicle: "",
    time: "",
    level: "",
    issue: "",
    defectStatus: "",
    note: "",
    date: "",
  };

  const [defect, setDefect] = useState(initialDefect);

  const { _id, vehicle, time, level, issue, defectStatus, note, date } = defect;

  const onSubmitDefect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      defect["_id"] = defectLocation?.state?._id!;
      if (selectVehicle === "") {
        defect["vehicle"] = defectLocation?.state?.vehicle!;
      } else {
        defect["vehicle"] = selectVehicle;
      }
      if (defect_time === "") {
        defect["time"] = defectLocation?.state?.time!;
      } else {
        defect["time"] = defect_time;
      }
      if (selectLevel === "") {
        defect["level"] = defectLocation?.state?.level!;
      } else {
        defect["level"] = selectLevel;
      }
      if (selectIssue === "") {
        defect["issue"] = defectLocation?.state?.issue!;
      } else {
        defect["issue"] = selectIssue;
      }
      if (selectDefectStatus === "") {
        defect["defectStatus"] = defectLocation?.state?.defectStatus!;
      } else {
        defect["defectStatus"] = selectDefectStatus;
      }
      if (defect_note === "") {
        defect["note"] = defectLocation?.state?.note!;
      } else {
        defect["note"] = defect_note;
      }
      defect["date"] = currentDate.toDateString();
      updateDefect(defect)
        .then(() => notifySuccess())
        .then(() => navigate("/defects-management"));
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <div className="mb-3">
                    <Form className="tablelist-form" onSubmit={onSubmitDefect}>
                      <Row>
                        <Row>
                          {/* Vehicle  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="vehicle">
                                Vehicle :{" "}
                                <span className="fs-16">
                                  {defectLocation.state.vehicle}
                                </span>
                                <div
                                  className="d-flex justify-content-start mt-n3"
                                  style={{ marginLeft: "170px" }}
                                >
                                  <label
                                    htmlFor="id_file"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select company logo"
                                  >
                                    <span
                                      className="avatar-xs d-inline-block"
                                      onClick={() =>
                                        setShowVehicle(!showVehicle)
                                      }
                                    >
                                      <span className="avatar-title bg-white text-success cursor-pointer">
                                        <i className="bi bi-pen fs-14"></i>
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </Form.Label>
                              {showVehicle && (
                                <select
                                  className="form-select text-muted"
                                  name="vehicle"
                                  id="vehicle"
                                  onChange={handleSelectVehicle}
                                >
                                  <option value="">Select</option>
                                  {AllVehicles.map((vehicle) => (
                                    <option
                                      value={vehicle.registration_number}
                                      key={vehicle?._id!}
                                    >
                                      {vehicle.registration_number}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </Col>
                          {/* Level == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="level">
                                Level :{" "}
                                <span className="fs-16">
                                  {defectLocation.state.level}
                                </span>
                                <div
                                  className="d-flex justify-content-start mt-n3"
                                  style={{ marginLeft: "170px" }}
                                >
                                  <label
                                    htmlFor="id_file"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select company logo"
                                  >
                                    <span
                                      className="avatar-xs d-inline-block"
                                      onClick={() => setShowLevel(!showLevel)}
                                    >
                                      <span className="avatar-title bg-white text-success cursor-pointer">
                                        <i className="bi bi-pen fs-14"></i>
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </Form.Label>
                              {showLevel && (
                                <select
                                  className="form-select text-muted"
                                  name="level"
                                  id="level"
                                  onChange={handleSelectLevel}
                                >
                                  <option value="">Select</option>
                                  <option value="Level 1">Level 1</option>
                                  <option value="Level 2">Level 2</option>
                                  <option value="Level 3">Level 3</option>
                                  <option value="Level 4">Level 4</option>
                                  <option value="Level 5">Level 5</option>
                                </select>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Time  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="time">Time</Form.Label>
                              <Form.Control
                                type="time"
                                id="time"
                                name="time"
                                onChange={handleDefectTime}
                                value={defect_time}
                              />
                            </div>
                          </Col>
                          {/* Issue  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="issue">
                                Issue :{" "}
                                <span className="fs-16">
                                  {defectLocation.state.issue}
                                </span>
                                <div
                                  className="d-flex justify-content-start mt-n3"
                                  style={{ marginLeft: "170px" }}
                                >
                                  <label
                                    htmlFor="id_file"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select company logo"
                                  >
                                    <span
                                      className="avatar-xs d-inline-block"
                                      onClick={() => setShowIssue(!showIssue)}
                                    >
                                      <span className="avatar-title bg-white text-success cursor-pointer">
                                        <i className="bi bi-pen fs-14"></i>
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </Form.Label>
                              {showIssue && (
                                <select
                                  className="form-select text-muted"
                                  data-choices
                                  data-choices-search-false
                                  name="issue"
                                  id="issue"
                                  onChange={handleSelectIssue}
                                >
                                  <option value="all">Select</option>
                                  <option value="Transmission">
                                    Transmission
                                  </option>
                                  <option value="Electrical">Electrical</option>
                                  <option value="Engine">Engine</option>
                                  <option value="Overheating">
                                    Overheating
                                  </option>
                                </select>
                              )}
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="defectStatus">
                                Status :{" "}
                                <span className="fs-16">
                                  {defectLocation.state.defectStatus ===
                                  "New" ? (
                                    <span className="badge bg-danger">
                                      {" "}
                                      {defectLocation.state.defectStatus}
                                    </span>
                                  ) : defectLocation.state.defectStatus ===
                                    "Work Shop" ? (
                                    <span className="badge bg-info">
                                      {" "}
                                      {defectLocation.state.defectStatus}
                                    </span>
                                  ) : defectLocation.state.defectStatus ===
                                    "Confirmed" ? (
                                    <span className="badge bg-success">
                                      {" "}
                                      {defectLocation.state.defectStatus}
                                    </span>
                                  ) : (
                                    <span className="badge bg-secondary">
                                      {" "}
                                      {defectLocation.state.defectStatus}{" "}
                                    </span>
                                  )}
                                </span>
                                <div
                                  className="d-flex justify-content-start mt-n3"
                                  style={{ marginLeft: "170px" }}
                                >
                                  <label
                                    htmlFor="id_file"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select company logo"
                                  >
                                    <span
                                      className="avatar-xs d-inline-block"
                                      onClick={() => setShowStatus(!showStatus)}
                                    >
                                      <span className="avatar-title bg-white text-success cursor-pointer">
                                        <i className="bi bi-pen fs-14"></i>
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </Form.Label>
                              {showStatus && (
                                <select
                                  className="form-select text-muted"
                                  data-choices
                                  data-choices-search-false
                                  name="defectStatus"
                                  id="defectStatus"
                                  onChange={handleSelectDefectStatus}
                                >
                                  <option value="all">Select</option>
                                  <option value="New">New</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Work Shop">Work Shop</option>
                                  <option value="Resolved">Resolved</option>
                                </select>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/*  Notes == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="emergency_contact">
                                Note
                              </Form.Label>
                              <div>
                                <textarea
                                  className="form-control"
                                  id="note"
                                  name="note"
                                  rows={3}
                                  onChange={handleDefectNote}
                                  value={defect_note}
                                ></textarea>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            <Button
                              type="submit"
                              variant="primary"
                              id="add-btn"
                            >
                              Edit Defect
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditDefect;
