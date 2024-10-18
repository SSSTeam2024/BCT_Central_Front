import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddAssignDriverMutation,
  useAddNotesMutation,
  useGetQuotesByReferenceQuery,
} from "features/Quotes/quoteSlice";
import Swal from "sweetalert2";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";
import SimpleBar from "simplebar-react";
import { RootState } from "app/store";
import { selectCurrentUser } from "features/Account/authSlice";
import { useSelector } from "react-redux";

const NewQuoteBook = () => {
  document.title = "Assign Driver and Vehicle | Coach Hire Network";
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
  const { data: quotesByReference = [] } = useGetQuotesByReferenceQuery(
    quoteLocation.state.quote_ref
  );

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
          const validPassword = "123456"; // Replace this with your actual password validation logic

          if (password !== validPassword) {
            throw new Error("Invalid password");
          }

          handleHideSelect(); // Only hide the warning if the password is valid
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

  const notifySuccessAddNote = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Note Added successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };
  const [modal_AddNote, setModal_AddNote] = useState<boolean>(false);
  function tog_AddNote() {
    setModal_AddNote(!modal_AddNote);
  }

  const user = useSelector((state: RootState) => selectCurrentUser(state));

  const currentDate = new Date();
  const formattedDate =
    currentDate.getFullYear() +
    "-" +
    String(currentDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(currentDate.getDate()).padStart(2, "0");

  const formattedTime =
    String(currentDate.getHours()).padStart(2, "0") +
    ":" +
    String(currentDate.getMinutes()).padStart(2, "0");

  const [addNotes] = useAddNotesMutation();
  const [note, setNote] = useState("");
  const handleAddNote = async () => {
    if (note) {
      try {
        await addNotes({
          id_quote: quoteLocation.state?._id!,
          information: {
            note,
            by: user?._id!,
            date: formattedDate,
            time: formattedTime,
          },
        });
        setNote("");
        notifySuccessAddNote();
        tog_AddNote();
        navigate("/bookings");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Row>
              <Col lg={8}>
                <Form onSubmit={onSubmitAssignDriver}>
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
                </Form>
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
                    <Row className="mb-2">
                      <h5>Journey 01</h5>
                      <table border={1}>
                        <tr>
                          <td>Collection</td>
                          <td>Destination</td>
                          <td>Pickup Date</td>
                          <td>Pickup Time</td>
                        </tr>
                        <tr>
                          <td>
                            {quotesByReference[0]?.start_point?.placeName!}
                          </td>
                          <td>
                            {
                              quotesByReference[0]?.destination_point
                                ?.placeName!
                            }
                          </td>
                          <td>{quotesByReference[0]?.date!}</td>
                          <td>{quotesByReference[0]?.pickup_time!}</td>
                        </tr>
                      </table>
                    </Row>
                    {quotesByReference.map((quote: any) =>
                      quote?.type! === "Return" ? (
                        <Row>
                          <h5>Journey 02</h5>
                          <table border={1}>
                            <tr>
                              <td>Collection</td>
                              <td>Destination</td>
                              <td>Pickup Date</td>
                              <td>Pickup Time</td>
                            </tr>
                            <tr>
                              <td>{quote?.start_point?.placeName!}</td>
                              <td>{quote?.destination_point?.placeName!}</td>
                              <td>{quote?.date!}</td>
                              <td>{quote?.pickup_time!}</td>
                            </tr>
                          </table>
                        </Row>
                      ) : (
                        ""
                      )
                    )}
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <SimpleBar
                      autoHide={true}
                      data-simplebar-track="dark"
                      style={{ maxHeight: "436px" }}
                    >
                      {quoteLocation?.state?.information?.map((note: any) => (
                        <Card>
                          <Row className="p-1">
                            <Col>
                              <span className="fw-bold">Note: </span>
                              <span className="fw-medium">{note.note}</span>
                            </Col>
                          </Row>
                          <Row className="p-1">
                            <Col>
                              <span className="fw-bold">By: </span>
                              <span className="fw-medium">{note.by.name}</span>
                            </Col>
                          </Row>
                          <Row className="p-1">
                            <Col>
                              <span className="fw-bold">Date: </span>
                              <span className="fw-medium">
                                {note.date}
                              </span> at{" "}
                              <span className="fw-medium">{note.time}</span>
                            </Col>
                          </Row>
                        </Card>
                      ))}
                    </SimpleBar>
                  </Card.Body>
                  <Card.Footer>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        id="add-btn"
                        className="btn btn-outline-dark btn-border btn-sm text-white"
                        onClick={tog_AddNote}
                      >
                        New Note
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Row>
        </Container>
        <Modal
          className="fade zoomIn"
          size="sm"
          show={modal_AddNote}
          onHide={() => {
            tog_AddNote();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              New Note
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <Row className="mb-3">
              <Col lg={12}>
                <textarea
                  className="form-control"
                  id="note"
                  name="note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-soft-danger"
                    onClick={() => {
                      tog_AddNote();
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    className="btn-soft-info"
                    id="add-btn"
                    onClick={handleAddNote}
                    disabled={!note.trim()}
                  >
                    <i className="ri-add-line align-bottom me-1"></i> Add
                  </Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default NewQuoteBook;
