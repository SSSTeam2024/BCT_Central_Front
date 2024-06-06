import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddAssignDriverMutation } from "features/Quotes/quoteSlice";
import Swal from "sweetalert2";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";

const NewQuoteBook = () => {
  document.title = "Assign Driver and Vehicle | Bouden Coach Travel";
  const quoteLocation = useLocation();
  const navigate = useNavigate();
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Assign Done successfully",
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

  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();

  const result = AllVehicles.filter(
    (vehicle) => vehicle.statusVehicle === "Active"
  );

  const resultDriver = AllDrivers.filter(
    (driver) => driver.driverStatus === "Active"
  );

  const [assignedVehicle, setAssignedVehicle] = useState<string>("");
  // This function is triggered when the select Model
  const handleAssignVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setAssignedVehicle(value);
  };

  const [assignedDriver, setAssignedDriver] = useState<string>("");
  // This function is triggered when the select Model
  const handleAssignDriver = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setAssignedDriver(value);
  };

  const [assignDriverMutation] = useAddAssignDriverMutation();

  const initialAssignDriver = {
    quote_id: "",
    manual_cost: "",
    id_visitor: "",
    id_driver: "",
    id_vehicle: "",
  };

  const [assignDriver, setAssignDriverVehicle] = useState(initialAssignDriver);

  const { quote_id, manual_cost, id_visitor, id_driver, id_vehicle } =
    assignDriver;

  const onChangeAssignDriver = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignDriverVehicle((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitAssignDriver = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      assignDriver["quote_id"] = quoteLocation.state?._id!;
      assignDriver["id_visitor"] = quoteLocation.state?.id_visitor!;
      assignDriver["id_driver"] = assignedDriver;
      assignDriver["id_vehicle"] = assignedVehicle;
      assignDriver["manual_cost"] = quoteLocation.state?.manual_cost!;
      assignDriverMutation(assignDriver)
        .then(() => notifySuccess())
        .then(() => navigate("/bookings"));
    } catch (error) {
      notifyError(error);
    }
  };

  const AlertConfirm = async (handleHideSelect: () => void) => {
    Swal.fire({
      title: "Submit your password",
      input: "password",
      html: `
      <p class="text-muted">This job is <b class="text-danger">not paid</b> yet.
      To assign a driver please enter a valid password.</p>
  `,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: "btn btn-secondary",
        cancelButton: "btn btn-danger",
      },
      preConfirm: async (password) => {
        try {
          // Check if the password is correct (you need to implement this)
          const isPasswordCorrect = "12345"; // Replace this with your actual password validation logic

          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          // Enable select options
          handleHideSelect();

          // Return an empty object to indicate success
          return {};
        } catch (error: any) {
          Swal.showValidationMessage(`Error: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const [selectHide, setSelectHide] = useState(false);

  const handleHideSelect = () => {
    setSelectHide(true);
  };

  // Add a state to manage whether the select options should be enabled
  const [selectEnabled, setSelectEnabled] = useState(false);

  const handleEnableSelect = () => {
    setSelectEnabled(true);
  };

  const AlertOverrideAssignVehicle = async (
    handleEnableSelectVehicle: () => void
  ) => {
    Swal.fire({
      title: "Submit your password",
      input: "password",
      html: `
      <p class="text-muted">This job is <b class="text-danger">not paid</b> yet.
      To assign a driver please enter your password.</p>
  `,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: "btn btn-secondary",
        cancelButton: "btn btn-danger",
      },
      preConfirm: async (password) => {
        try {
          // Check if the password is correct (you need to implement this)
          const isPasswordCorrect = "12345"; // Replace this with your actual password validation logic

          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          // Enable select options
          handleEnableSelectVehicle();

          // Return an empty object to indicate success
          return {};
        } catch (error: any) {
          Swal.showValidationMessage(`Error: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  // Add a state to manage whether the select options should be enabled
  const [selectEnabledVehicle, setSelectEnabledVehicle] = useState(false);

  const handleEnableSelectVehicle = () => {
    setSelectEnabledVehicle(true);
  };

  const [changeColor, setChangeColor] = useState<boolean>(false);

  // function for handleClick
  const handleClick = () => {
    setChangeColor(!changeColor);
  };

  const [changeColorAC, setChangeColorAC] = useState<boolean>(false);

  // function for handleClick AC
  const handleClickAC = () => {
    setChangeColorAC(!changeColorAC);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Form onSubmit={onSubmitAssignDriver}>
              <Row>
                <Col lg={8}>
                  <Card>
                    <div className="d-flex align-items-center p-2">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-dark fs-20">
                            <i className="ph ph-file-plus"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Assign</h5>
                      </div>
                      <div className="hstack gap-2 justify-content-end">
                        <Button
                          variant="success"
                          id="add-btn"
                          className="btn-sm"
                          type="submit"
                        >
                          Save & Send
                        </Button>
                        <Button
                          variant="info"
                          id="add-btn"
                          className="btn-sm"
                          type="submit"
                        >
                          Quick Save
                        </Button>
                      </div>
                    </div>
                    <Card.Header>
                      <div className="d-flex align-items-center p-1">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                              <i className="ph ph-user-square"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">Customer</h5>
                        </div>
                      </div>
                      <Row>
                        {/* Email == Done */}
                        <Col lg={5}>
                          <div className="mb-3">
                            <Form.Label htmlFor="supplierName-field">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              id="supplierName-field"
                              placeholder="Enter email"
                              defaultValue={
                                quoteLocation.state.id_visitor?.email!
                              }
                            />
                          </div>
                        </Col>
                        {/* Phone  == Done */}
                        <Col lg={3}>
                          <div className="mb-3">
                            <Form.Label htmlFor="supplierName-field">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="supplierName-field"
                              placeholder="Enter phone number"
                              defaultValue={
                                quoteLocation.state.id_visitor?.phone!
                              }
                            />
                          </div>
                        </Col>
                        {/* Name  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="customerName-field">
                              Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="customerName-field"
                              placeholder="Enter full name"
                              defaultValue={
                                quoteLocation.state.id_visitor?.name!
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        <Row>
                          <Card.Header>
                            <div className="d-flex align-items-center p-1">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-bus"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h4 className="mb-1">Transport</h4>
                              </div>
                            </div>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <h5>Passengers number</h5>
                                  <label
                                    htmlFor="passengers_number"
                                    className="form-label fs-16"
                                  >
                                    {quoteLocation.state.passengers_number}
                                  </label>
                                </div>
                              </Col>
                              {/* Vehicle Type  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <h5>Vehicle Type</h5>
                                  <label
                                    htmlFor="vehicle_type"
                                    className="form-label"
                                  >
                                    {quoteLocation.state.vehicle_type}
                                  </label>
                                </div>
                              </Col>
                              {/* Luggage Details  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <h5>Luggage Details</h5>
                                  <label
                                    htmlFor="luggage_details"
                                    className="form-label"
                                  >
                                    {quoteLocation.state.luggage_details}
                                  </label>
                                </div>
                              </Col>
                              {/* Journey Type  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <h5>Journey Type</h5>
                                  <label
                                    htmlFor="journey_type"
                                    className="form-label"
                                  >
                                    {quoteLocation.state.journey_type}
                                  </label>
                                </div>
                              </Col>
                            </Row>
                          </Card.Header>
                        </Row>
                      </div>
                      <div className="mb-3">
                        <Row>
                          <Card.Header>
                            <div className="d-flex align-items-center p-1">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-currency-gbp"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1 hstack gap-2">
                                <h5 className="card-title mb-1">Price</h5>
                                <span className="badge bg-danger">
                                  {/* {quoteLocation.state.status} */}
                                  Unpaid
                                </span>
                              </div>
                            </div>
                            <Row>
                              {/* Vehicle Price  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label htmlFor="price" className="form-label">
                                    Vehicle Price
                                  </label>
                                  <h5>£ {quoteLocation.state.manual_cost}</h5>
                                </div>
                              </Col>
                              {/* Total Price  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label htmlFor="price" className="form-label">
                                    Total Price
                                  </label>
                                  <h5>£ {quoteLocation.state.total_price}</h5>
                                </div>
                              </Col>
                              {/* Deposit %  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Deposit %
                                  </Form.Label>
                                  <h5>
                                    {quoteLocation.state.deposit_percentage} %
                                  </h5>
                                </div>
                              </Col>
                              {/* Deposit Amount  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Deposit Amount
                                  </Form.Label>
                                  <h5>
                                    £ {quoteLocation.state.deposit_amount}
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </Card.Header>
                        </Row>
                      </div>
                      {quoteLocation.state.deposit_amount <
                      quoteLocation.state.total_price ? (
                        <Row className="d-flex justify-content-center">
                          <Col lg={6}>
                            <div
                              className="alert alert-warning alert-modern alert-dismissible fade show"
                              role="alert"
                              hidden={selectHide}
                            >
                              <i className="ri-alert-line icons"></i>{" "}
                              <strong>Warning</strong> -{" "}
                              <div className="d-flex align-items-center">
                                <p className="text-muted m-1 mt-2">
                                  This job is{" "}
                                  <strong className="text-dark">unpaid</strong>{" "}
                                  yet. To assign a driver please enter your
                                  password.
                                </p>
                                <span
                                  className="badge rounded-pill text-bg-warning m-1 fs-20 pe-auto"
                                  onClick={() => AlertConfirm(handleHideSelect)}
                                >
                                  <i className="mdi mdi-account-tie"></i>
                                  OVERRIDE
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        <div className="mb-3">
                          <Row>
                            <Col lg={6}>
                              <Card.Header>
                                <div className="d-flex align-items-center p-1">
                                  <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm">
                                      <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                        <i className="ph ph-user"></i>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h5 className="card-title mb-1">Driver</h5>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <select
                                    className="form-select text-muted"
                                    name="driver"
                                    id="driver"
                                    onChange={handleAssignDriver}
                                  >
                                    <option value="">Driver Name</option>
                                    {resultDriver.map((drivers) => (
                                      <option value={drivers._id}>
                                        {drivers.firstname}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Card.Header>
                            </Col>
                            <Col lg={6}>
                              <Card.Header>
                                <div className="d-flex align-items-center p-1">
                                  <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm">
                                      <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                        <i className="ph ph-car"></i>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h5 className="card-title mb-1">Vehicle</h5>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <select
                                    className="form-select text-muted"
                                    name="vehicle"
                                    id="vehicle"
                                    onChange={handleAssignVehicle}
                                  >
                                    <option value="">Vehicle Ref</option>
                                    {result.map((vehicles) => (
                                      <option value={vehicles._id}>
                                        {vehicles.registration_number}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Card.Header>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </Card.Body>
                    {selectHide ? (
                      <Row>
                        <Col lg={6}>
                          <Card.Header>
                            <div className="d-flex align-items-center p-1">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-user"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title mb-1">Driver</h5>
                              </div>
                            </div>
                            <div className="mb-3">
                              <select
                                className="form-select text-muted"
                                name="driver"
                                id="driver"
                                onChange={handleAssignDriver}
                              >
                                <option value="">Driver Name</option>
                                {resultDriver.map((drivers) => (
                                  <option value={drivers._id}>
                                    {drivers.firstname}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Card.Header>
                        </Col>
                        <Col lg={6}>
                          <Card.Header>
                            <div className="d-flex align-items-center p-1">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-car"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title mb-1">Vehicle</h5>
                              </div>
                            </div>
                            <div className="mb-3">
                              <select
                                className="form-select text-muted"
                                name="vehicle"
                                id="vehicle"
                                onChange={handleAssignVehicle}
                              >
                                <option value="">Vehicle Ref</option>
                                {result.map((vehicles) => (
                                  <option value={vehicles._id}>
                                    {vehicles.registration_number}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Card.Header>
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <div>
                      <Row>
                        <Col lg={12} className="p-3">
                          <div className="hstack gap-2 justify-content-end">
                            <Button
                              variant="success"
                              id="add-btn"
                              className="btn-sm"
                              type="submit"
                            >
                              Save & Send
                            </Button>
                            <Button
                              variant="info"
                              id="add-btn"
                              className="btn-sm"
                              type="submit"
                            >
                              Quick Save
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card>
                    <Card.Header>
                      <div className="d-flex align-items-center p-1">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                              <i className="ph ph-map-trifold"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">Trip Details</h5>
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col lg={12}>
                          <h6>Pickup date</h6>
                          <Form.Label>
                            {quoteLocation.state.estimated_start_time}
                          </Form.Label>
                        </Col>
                        <Col lg={12}>
                          <h6>Collection Address</h6>
                          <Form.Label>
                            {quoteLocation.state.start_point?.placeName!}
                          </Form.Label>
                        </Col>
                        <Col lg={12}>
                          <h6>Destination Address</h6>
                          <Form.Label>
                            {quoteLocation.state.destination_point?.placeName!}
                          </Form.Label>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Form>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NewQuoteBook;
