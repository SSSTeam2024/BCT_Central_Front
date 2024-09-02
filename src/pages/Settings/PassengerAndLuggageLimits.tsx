import React, { useEffect, useState } from "react";
import { Row, Card, Col, Modal, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";

import { Link, useLocation } from "react-router-dom";
import { useGetAllJourneyQuery } from "features/Journeys/journeySlice";
import Swal from "sweetalert2";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import {
  useAddNewPassengerAndLuggageMutation,
  useDeletePassengerAndLuggageMutation,
  useGetAllPassengerAndLuggagesQuery,
  useUpdatePassengerAndLuggageMutation,
} from "features/PassengerAndLuggageLimits/passengerAndLuggageSlice";
import { useGetAllLuggageQuery } from "features/luggage/luggageSlice";

const PassengerAndLuggageLimits = () => {
  const { data: AllLuggages = [] } = useGetAllLuggageQuery();
  const { data: AllVehicleTypes = [] } = useGetAllVehicleTypesQuery();
  const { data: AllPassengerLuggageLimit = [] } =
    useGetAllPassengerAndLuggagesQuery();

  const [selectvehicleType, setSelectedVehicleType] = useState<string>("");
  // This function is triggered when the select Ownership
  const handleSelectvehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleType(value);
  };

  const [selectJourney, setSelectedJourney] = useState<string>("");
  // This function is triggered when the select select Journey
  const handleSelectJourney = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedJourney(value);
  };

  const notifySuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Passenger & Luggage Limit is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyUpdateSuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Passenger & Luggage Limit is updated successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyError = (err: any) => {
    Swal.fire({
      position: "top-right",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [deletePassengerAndLuggage] = useDeletePassengerAndLuggageMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (_id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to go back?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletePassengerAndLuggage(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Passenger & Luggage Limit is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Passenger & Luggage Limit is safe :)",
            "info"
          );
        }
      });
  };

  const [modal_AddPassengerLuggageLimit, setmodal_AddPassengerLuggageLimit] =
    useState<boolean>(false);
  function tog_AddPassengerLuggageLimit() {
    setmodal_AddPassengerLuggageLimit(!modal_AddPassengerLuggageLimit);
  }

  const [
    modal_UpdatePassengerLuggageLimit,
    setmodal_UpdatePassengerLuggageLimit,
  ] = useState<boolean>(false);
  function tog_UpdatePassengerLuggageLimit() {
    setmodal_UpdatePassengerLuggageLimit(!modal_UpdatePassengerLuggageLimit);
  }

  const [createPassengerLuggageLimit] = useAddNewPassengerAndLuggageMutation();

  const [updatePassengerLuggageLimit] = useUpdatePassengerAndLuggageMutation();

  const initialPassengerLuggageLimit = {
    vehicle_type: {
      _id: "",
    },
    max_passengers: "",
    max_luggage: {
      _id: "",
    },
  };

  const [passengerLuggageLimit, setPassengerLuggageLimit] = useState(
    initialPassengerLuggageLimit
  );

  const { vehicle_type, max_passengers, max_luggage } = passengerLuggageLimit;

  const onChangePassengerLuggageLimit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassengerLuggageLimit((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitPassengerLuggageLimit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      passengerLuggageLimit["max_luggage"]._id = selectJourney;
      passengerLuggageLimit["vehicle_type"]._id = selectvehicleType;
      createPassengerLuggageLimit(passengerLuggageLimit)
        .then(() => notifySuccess())
        .then(() => setPassengerLuggageLimit(initialPassengerLuggageLimit));
    } catch (error) {
      notifyError(error);
    }
  };

  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [passNdluggage_id, setPassNdluggageId] = useState<string>("");
  const [passNdluggage_pax, setPassNdluggagePax] = useState<string>("");
  const [selectedLuggage, setSelectedLuggage] = useState<string>("");
  const passNdluggageLocation = useLocation();

  useEffect(() => {
    if (passNdluggageLocation?.state) {
      setPassNdluggageId(passNdluggageLocation.state._id || "");
      setSelectedVehicle(passNdluggageLocation.state.vehicle_type._id || "");
      setSelectedLuggage(passNdluggageLocation.state.max_luggage._id || "");
      setPassNdluggagePax(passNdluggageLocation.state.max_passengers || "");
    }
  }, [passNdluggageLocation]);

  const handleSelectVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedVehicle(value);
  };

  const handleLuggage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLuggage(value);
  };

  const handlePax = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassNdluggagePax(e.target.value);
  };

  const [showVehicle, setShowVehicle] = useState<boolean>(false);
  const [showLuggage, setShowLuggage] = useState<boolean>(false);

  const onSubmitUpdatePassengerLuggageLimit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const passengerLuggageLimit = {
        _id: passNdluggage_id || passNdluggageLocation.state._id,
        vehicle_type:
          selectedVehicle || passNdluggageLocation.state.vehicle_type._id,
        max_luggage:
          selectedLuggage || passNdluggageLocation.state.max_luggage._id,
        max_passengers:
          passNdluggage_pax || passNdluggageLocation.state.max_passengers,
      };
      updatePassengerLuggageLimit(passengerLuggageLimit)
        .then(() => notifyUpdateSuccess())
        .then(() => setPassengerLuggageLimit(initialPassengerLuggageLimit))
        .then(() => setShowVehicle(!showVehicle))
        .then(() => setShowLuggage(!showLuggage));
    } catch (error) {
      notifyError(error);
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Vehicle</span>,
      selector: (row: any) => row?.vehicle_type?.type!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Passengers</span>,
      selector: (row: any) => row.max_passengers,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Max Luggage</span>,
      selector: (row: any) => row.max_luggage.description,
      sortable: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      cell: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-success edit-item-btn"
                state={row}
                onClick={tog_UpdatePassengerLuggageLimit}
              >
                <i
                  className="ri-edit-2-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.2em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn">
                <i
                  className="ri-delete-bin-2-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.2em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={() => AlertDelete(row._id)}
                ></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredPassNdLuggage = () => {
    let filteredPassNdLuggage = AllPassengerLuggageLimit;
    if (searchTerm) {
      filteredPassNdLuggage = filteredPassNdLuggage.filter(
        (passNdLuggage: any) =>
          (passNdLuggage?.vehicle_type?.type! &&
            passNdLuggage?.vehicle_type
              ?.type!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (passNdLuggage?.max_luggage?.description! &&
            passNdLuggage?.max_luggage
              ?.description!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (passNdLuggage?.max_passengers! &&
            passNdLuggage
              ?.max_passengers!.toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }
    return filteredPassNdLuggage;
  };

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card id="shipmentsList">
          <Card.Header className="border-bottom-dashed">
            <Row className="g-3">
              <Col xxl={3} lg={6}>
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Search for something..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </Col>
              <Col lg={7}></Col>
              <Col>
                <div
                  className="btn-group btn-group-sm mt-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => tog_AddPassengerLuggageLimit()}
                  >
                    <i
                      className="ri-add-fill align-middle"
                      style={{
                        transition: "transform 0.3s ease-in-out",
                        cursor: "pointer",
                        fontSize: "1.5em",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.3)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    ></i>{" "}
                    <span>New Passenger & Luggage Limit</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={getFilteredPassNdLuggage()}
              pagination
            />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade"
        id="createModal"
        show={modal_AddPassengerLuggageLimit}
        onHide={() => {
          tog_AddPassengerLuggageLimit();
        }}
        centered
      >
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5" id="createModalLabel">
            New Passenger & Luggage Limit
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="create-form"
            onSubmit={onSubmitPassengerLuggageLimit}
          >
            <input type="hidden" id="id-field" />
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>

            <Row>
              <Col lg={12} className="d-flex justify-content-center">
                <div className="mb-3">
                  <Form.Label htmlFor="vehicle_type">Vehicle Type</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="vehicle_type"
                    id="vehicle_type"
                    onChange={handleSelectvehicleType}
                  >
                    <option value="">Type</option>
                    {AllVehicleTypes.map((vehicleType) => (
                      <option value={vehicleType?._id!} key={vehicleType?._id!}>
                        {vehicleType.type}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="max_passengers">Passenger</Form.Label>
                  <Form.Control
                    type="text"
                    name="max_passengers"
                    id="max_passengers"
                    placeholder="Enter Limit"
                    onChange={onChangePassengerLuggageLimit}
                    value={passengerLuggageLimit.max_passengers}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="d-flex justify-content-center">
                <div className="mb-3">
                  <Form.Label htmlFor="max_luggage">Max Luggage</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="max_luggage"
                    id="max_luggage"
                    onChange={handleSelectJourney}
                  >
                    <option value="">Luggage</option>
                    {AllLuggages.map((luggages) => (
                      <option value={luggages?._id!} key={luggages?._id!}>
                        {luggages.description}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="hstack gap-2 justify-content-end">
                <Button
                  variant="light"
                  onClick={() => {
                    tog_AddPassengerLuggageLimit();
                    setPassengerLuggageLimit(initialPassengerLuggageLimit);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    tog_AddPassengerLuggageLimit();
                  }}
                  type="submit"
                  variant="success"
                  id="addNew"
                >
                  Add
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        className="fade"
        id="updateModal"
        show={modal_UpdatePassengerLuggageLimit}
        onHide={() => {
          tog_UpdatePassengerLuggageLimit();
        }}
        centered
      >
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5" id="createModalLabel">
            Update Passenger & Luggage Limit
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="create-form"
            onSubmit={onSubmitUpdatePassengerLuggageLimit}
          >
            <Row>
              <Col>
                <div className="mb-3">
                  <Form.Label htmlFor="vehicle_type">
                    Vehicle Type :{" "}
                    <span className="fs-16">
                      {passNdluggageLocation?.state?.vehicle_type?.type!}
                    </span>
                    <div
                      className="d-flex justify-content-start mt-n3"
                      style={{ marginLeft: "260px" }}
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
                          onClick={() => setShowVehicle(!showVehicle)}
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
                      name="vehicle_type"
                      id="vehicle_type"
                      onChange={handleSelectVehicle}
                    >
                      <option value="">Type</option>
                      {AllVehicleTypes.map((vehicleType) => (
                        <option
                          value={vehicleType?._id!}
                          key={vehicleType?._id!}
                        >
                          {vehicleType.type}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="max_passengers">Passenger </Form.Label>
                  <Form.Control
                    type="text"
                    name="max_passengers"
                    id="max_passengers"
                    placeholder="Enter Limit"
                    onChange={handlePax}
                    value={passNdluggage_pax}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="max_luggage">
                    Max Luggage :{" "}
                    <span className="fs-16">
                      {passNdluggageLocation?.state?.max_luggage?.description!}
                    </span>
                    <div
                      className="d-flex justify-content-start mt-n3"
                      style={{ marginLeft: "280px" }}
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
                          onClick={() => setShowLuggage(!showLuggage)}
                        >
                          <span className="avatar-title bg-white text-success cursor-pointer">
                            <i className="bi bi-pen fs-14"></i>
                          </span>
                        </span>
                      </label>
                    </div>
                  </Form.Label>
                  {showLuggage && (
                    <select
                      className="form-select text-muted"
                      name="max_luggage"
                      id="max_luggage"
                      onChange={handleLuggage}
                    >
                      <option value="">Luggage</option>
                      {AllLuggages.map((luggages) => (
                        <option value={luggages?._id!} key={luggages?._id!}>
                          {luggages.description}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <div className="hstack gap-2 justify-content-end">
                <Button
                  variant="light"
                  onClick={() => {
                    tog_UpdatePassengerLuggageLimit();
                    setPassengerLuggageLimit(initialPassengerLuggageLimit);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    tog_UpdatePassengerLuggageLimit();
                  }}
                  type="submit"
                  variant="success"
                  id="addNew"
                >
                  Update
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default PassengerAndLuggageLimits;
