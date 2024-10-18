import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";
import { useAddNewDefectMutation } from "features/Defects/defectSlice";

const AddNewDefect = () => {
  document.title = "New Defect | Coach Hire Network";

  const navigate = useNavigate();
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Defect is created successfully",
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

  const [createDefect] = useAddNewDefectMutation();

  const initialDefect = {
    vehicle: "",
    time: "",
    level: "",
    issue: "",
    defectStatus: "",
    note: "",
    date: "",
  };

  const [defect, setDefect] = useState(initialDefect);

  const { vehicle, time, level, issue, defectStatus, note, date } = defect;

  const onChangeDefect = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDefect((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitDefect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      defect["issue"] = selectIssue;
      defect["level"] = selectLevel;
      defect["defectStatus"] = selectDefectStatus;
      defect["vehicle"] = selectVehicle;
      defect["date"] = currentDate.toDateString();
      createDefect(defect)
        .then(() => setDefect(initialDefect))
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
                              <Form.Label htmlFor="vehicle">Vehicle</Form.Label>
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
                            </div>
                          </Col>
                          {/* Level == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="level">Level</Form.Label>
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
                                placeholder="Enter email"
                                onChange={onChangeDefect}
                                value={defect.time}
                              />
                            </div>
                          </Col>
                          {/* Issue  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="issue">Issue</Form.Label>
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
                                <option value="Overheating">Overheating</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="defectStatus">
                                Status
                              </Form.Label>
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
                                  onChange={onChangeDefect}
                                  value={defect.note}
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
                              Add Defect
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

export default AddNewDefect;
