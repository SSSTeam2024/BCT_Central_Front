import React, { useEffect, useState } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddNewForceSingleMutation,
  useDeleteForceSingleMutation,
  useGetAllForceSinglesQuery,
  useUpdateForceSingleMutation,
} from "features/ForceSingle/forceSingleSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";

const SingleJourneys = () => {
  const { data: allForceSingles = [] } = useGetAllForceSinglesQuery();
  const { data: AlllVehicleType = [] } = useGetAllVehicleTypesQuery();

  const [selectvehicleType, setSelectedVehicleType] = useState<string>("");
  // This function is triggered when the select Vehicle Type
  const handleSelectvehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleType(value);
  };

  const notifySuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Force Single Journey is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyUpdateSuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Force Single Journey is updated successfully",
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

  const [deleteForceSingle] = useDeleteForceSingleMutation();

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
          deleteForceSingle(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Force Single Journey is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Force Single Journey is safe :)",
            "info"
          );
        }
      });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Car Type</span>,
      selector: (row: any) => row.car.type,
      sortable: true,
      // width: "235px"
    },
    {
      name: <span className="font-weight-bold fs-13">Miles</span>,
      selector: (row: any) => row.miles,
      sortable: true,
      // width: "80px"
    },
    {
      name: <span className="font-weight-bold fs-13">Hours</span>,
      selector: (row: any) => row.hours_wait,
      sortable: true,
      // width: "80px"
    },
    {
      name: <span className="font-weight-bold fs-13">Return % When Split</span>,
      selector: (row: any) => row.percentage + " %",
      sortable: true,
      // width: "170px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      // width: "75px",
      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-success edit-item-btn"
                state={row}
                onClick={tog_UpdateForceJourney}
              >
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(row._id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const [createForceSingle] = useAddNewForceSingleMutation();
  const [updateForceSingle] = useUpdateForceSingleMutation();

  const initialForceSingle = {
    car: "",
    percentage: "",
    hours_wait: "",
    miles: "",
  };

  const [forceSingle, setForceSingle] = useState(initialForceSingle);

  const { car, percentage, hours_wait, miles } = forceSingle;

  const onChangeForceSingle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForceSingle((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitForceSingle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      forceSingle["car"] = selectvehicleType;
      createForceSingle(forceSingle).then(() =>
        setForceSingle(initialForceSingle)
      );
      notifySuccess();
    } catch (error) {
      notifyError(error);
    }
  };

  const [percentageJourney, setPercentageJourney] = useState<string>("");
  const [milesJourney, setMilesJourney] = useState<string>("");
  const [hoursWait, setHoursWait] = useState<string>("");
  const [journeyId, setJourneyId] = useState<string>("");
  const singleJourneyLocation = useLocation();

  useEffect(() => {
    if (singleJourneyLocation?.state) {
      setJourneyId(singleJourneyLocation.state._id || "");
      setPercentageJourney(singleJourneyLocation.state.percentage || "");
      setMilesJourney(singleJourneyLocation.state.miles || "");
      setHoursWait(singleJourneyLocation.state.hours_wait || "");
    }
  }, [singleJourneyLocation]);

  const handlePercentage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPercentageJourney(e.target.value);
  };

  const handleHoursWait = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHoursWait(e.target.value);
  };

  const handleMiles = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMilesJourney(e.target.value);
  };

  const [showVehicle, setShowVehicle] = useState<boolean>(false);

  const onSubmitUpdateForceSingle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const singleJouney = {
        _id: journeyId || singleJourneyLocation.state._id,
        percentage: percentageJourney || singleJourneyLocation.state.percentage,
        hours_wait: hoursWait || singleJourneyLocation.state.hours_wait,
        car: selectvehicleType || singleJourneyLocation.state.car._id,
        miles: milesJourney || singleJourneyLocation.state.miles,
      };
      updateForceSingle(singleJouney).then(() =>
        setForceSingle(initialForceSingle)
      );
      setShowVehicle(!showVehicle);
      notifyUpdateSuccess();
    } catch (error) {
      notifyError(error);
    }
  };

  const [modal_AddForceJourney, setmodal_AddForceJourney] =
    useState<boolean>(false);
  function tog_AddForceJourney() {
    setmodal_AddForceJourney(!modal_AddForceJourney);
  }

  const [modal_UpdateForceJourney, setmodal_UpdateForceJourney] =
    useState<boolean>(false);
  function tog_UpdateForceJourney() {
    setmodal_UpdateForceJourney(!modal_UpdateForceJourney);
  }

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredForceJourney = () => {
    let filteredForceJourney = allForceSingles;
    if (searchTerm) {
      filteredForceJourney = filteredForceJourney.filter(
        (forceJourney: any) =>
          (forceJourney?.car?.type! &&
            forceJourney?.car
              ?.type!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (forceJourney?.miles! &&
            forceJourney
              ?.miles!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (forceJourney?.percentage! &&
            forceJourney
              ?.percentage!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (forceJourney?.hours_wait! &&
            forceJourney
              ?.hours_wait!.toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }
    return filteredForceJourney;
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
                    onClick={() => tog_AddForceJourney()}
                  >
                    <i className="ri-add-fill align-middle"></i>{" "}
                    <span>New Force Single Journey</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={getFilteredForceJourney()}
              pagination
            />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="lg"
        show={modal_AddForceJourney}
        onHide={() => {
          tog_AddForceJourney();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            New Force Single Journey
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form className="tablelist-form" onSubmit={onSubmitForceSingle}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">Vehicle</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="choices-single-default"
                    id="statusSelect"
                    onChange={handleSelectvehicleType}
                  >
                    <option value="">Select</option>
                    {AlllVehicleType.map((vehicleType) => (
                      <option value={vehicleType?._id!} key={vehicleType?._id!}>
                        {vehicleType.type}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="miles">Miles</Form.Label>
                  <Form.Control
                    type="text"
                    id="miles"
                    name="miles"
                    placeholder="Enter Limit"
                    onChange={onChangeForceSingle}
                    value={forceSingle.miles}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="hours_wait">Hours Wait</Form.Label>
                  <Form.Control
                    type="text"
                    id="hours_wait"
                    name="hours_wait"
                    onChange={onChangeForceSingle}
                    value={forceSingle.hours_wait}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="percentage">Pourcentage</Form.Label>
                  <Form.Control
                    type="text"
                    id="percentage"
                    name="percentage"
                    onChange={onChangeForceSingle}
                    value={forceSingle.percentage}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddForceJourney();
                      setForceSingle(initialForceSingle);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    id="add-btn"
                    type="submit"
                    onClick={() => {
                      tog_AddForceJourney();
                    }}
                  >
                    Add
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        className="fade zoomIn"
        size="lg"
        show={modal_UpdateForceJourney}
        onHide={() => {
          tog_UpdateForceJourney();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Update Force Single Journey
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form className="tablelist-form" onSubmit={onSubmitUpdateForceSingle}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">
                    Vehicle :{" "}
                    <span className="fs-16">
                      {singleJourneyLocation?.state?.car?.type!}
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
                      name="choices-single-default"
                      id="statusSelect"
                      onChange={handleSelectvehicleType}
                    >
                      <option value="">Select</option>
                      {AlllVehicleType.map((vehicleType) => (
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
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="miles">Miles</Form.Label>
                  <Form.Control
                    type="text"
                    id="miles"
                    name="miles"
                    placeholder="Enter Limit"
                    onChange={handleMiles}
                    value={milesJourney}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="hours_wait">Hours Wait</Form.Label>
                  <Form.Control
                    type="text"
                    id="hours_wait"
                    name="hours_wait"
                    onChange={handleHoursWait}
                    value={hoursWait}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="percentage">Pourcentage</Form.Label>
                  <Form.Control
                    type="text"
                    id="percentage"
                    name="percentage"
                    onChange={handlePercentage}
                    value={percentageJourney}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_UpdateForceJourney();
                      setForceSingle(initialForceSingle);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    id="add-btn"
                    type="submit"
                    onClick={() => {
                      tog_UpdateForceJourney();
                    }}
                  >
                    Update
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default SingleJourneys;
