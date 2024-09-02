import React, { useEffect, useState } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useLocation } from "react-router-dom";
import {
  useAddNewHourBandMutation,
  useDeleteHourBandMutation,
  useGetAllHourBandQuery,
  useUpdateHourBandMutation,
} from "features/HourlyBand/hourlyBandSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import Swal from "sweetalert2";

const HourlyBands = () => {
  const [deleteHourlyBands] = useDeleteHourBandMutation();

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
          deleteHourlyBands(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Hourly Band is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Hourly Band Type is safe :)",
            "info"
          );
        }
      });
  };

  const { data: AllHourBand = [] } = useGetAllHourBandQuery();

  const { data: AlllVehicleType = [] } = useGetAllVehicleTypesQuery();
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Car Type</span>,
      selector: (row: any) => row.vehicle_type.type,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Limit</span>,
      selector: (row: any) => row.hours_limit,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-success edit-item-btn"
                state={row}
                onClick={tog_UpdateHourlyBand}
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

  const notifyHourBand = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Hourly Band is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyUpdateHourBand = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Hourly Band is updated successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyErrorHourBand = (err: any) => {
    Swal.fire({
      position: "top-right",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [modal_AddMileage, setmodal_AddMileage] = useState<boolean>(false);
  function tog_AddMileage() {
    setmodal_AddMileage(!modal_AddMileage);
  }

  const [modal_UpdateHourlyBand, setmodal_UpdateHourlyBand] =
    useState<boolean>(false);
  function tog_UpdateHourlyBand() {
    setmodal_UpdateHourlyBand(!modal_UpdateHourlyBand);
  }

  const [selectvehicleType, setSelectedVehicleType] = useState<string>("");
  // This function is triggered when the select Ownership
  const handleSelectvehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleType(value);
  };

  const [limit, setLimit] = useState<string>("");
  const [priceHour, setPriceHour] = useState<string>("");
  const [hourId, setHourId] = useState<string>("");
  const hourLocation = useLocation();

  useEffect(() => {
    if (hourLocation?.state) {
      setHourId(hourLocation.state._id || "");
      setPriceHour(hourLocation.state.price || "");
      setLimit(hourLocation.state.hours_limit || "");
    }
  }, [hourLocation]);

  const handleLimit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(e.target.value);
  };

  const handlePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPriceHour(e.target.value);
  };

  const [createHourBand] = useAddNewHourBandMutation();
  const [updateHourBand] = useUpdateHourBandMutation();
  const initialHourBand = {
    vehicle_type: "",
    hours_limit: "",
    price: "",
  };

  const [hourBand, setHourBand] = useState(initialHourBand);

  const { vehicle_type, hours_limit, price } = hourBand;

  const onChangeHourBand = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHourBand((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitHourBand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      hourBand["vehicle_type"] = selectvehicleType;
      createHourBand(hourBand)
        .then(() => setHourBand(initialHourBand))
        .then(() => notifyHourBand())
        .then(() => setmodal_AddMileage(!modal_AddMileage));
    } catch (error) {
      notifyErrorHourBand(error);
    }
  };

  const [showVehicle, setShowVehicle] = useState<boolean>(false);

  const onSubmitUpdateHourBand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const hourBand = {
        _id: hourId || hourLocation.state._id,
        price: priceHour || hourLocation.state.price,
        hours_limit: limit || hourLocation.state.hours_limit,
        vehicle_type: selectvehicleType || hourLocation.state.vehicle_type._id,
      };

      updateHourBand(hourBand)
        .then(() => setHourBand(initialHourBand))
        .then(() => notifyUpdateHourBand())
        .then(() => setmodal_UpdateHourlyBand(!modal_UpdateHourlyBand))
        .then(() => setShowVehicle(!showVehicle));
    } catch (error) {
      notifyErrorHourBand(error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredHourBand = () => {
    let filteredHourBand = AllHourBand;
    if (searchTerm) {
      filteredHourBand = filteredHourBand.filter(
        (hourBand: any) =>
          (hourBand?.vehicle_type?.type! &&
            hourBand?.vehicle_type
              ?.type!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (hourBand?.hours_limit! &&
            hourBand
              ?.hours_limit!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (hourBand?.price! &&
            hourBand?.price!.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return filteredHourBand;
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
                    onClick={() => tog_AddMileage()}
                  >
                    <i className="ri-pin-distance-line align-middle"></i>{" "}
                    <span>New Hourly Band</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={getFilteredHourBand()}
              pagination
            />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="sm"
        show={modal_AddMileage}
        onHide={() => {
          tog_AddMileage();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            New Hourly Band
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitHourBand}>
            <input type="hidden" id="id-field" />
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="vehicle_type">Vehicle</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="vehicle_type"
                    id="vehicle_type"
                    onChange={handleSelectvehicleType}
                  >
                    <option value="">Type</option>
                    {AlllVehicleType.map((vehicleType) => (
                      <option value={`${vehicleType._id}`}>
                        {vehicleType.type}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="hours_limit">Limit</Form.Label>
                  <Form.Control
                    type="text"
                    name="hours_limit"
                    id="hours_limit"
                    placeholder="Enter Limit"
                    onChange={onChangeHourBand}
                    value={hourBand.hours_limit}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="price">Price</Form.Label>
                  <Form.Control
                    type="text"
                    id="price"
                    name="price"
                    placeholder="£ 0.00"
                    onChange={onChangeHourBand}
                    value={hourBand.price}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddMileage();
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button variant="primary" id="add-btn" type="submit">
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
        show={modal_UpdateHourlyBand}
        onHide={() => {
          tog_UpdateHourlyBand();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Update Hourly Band
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form className="tablelist-form" onSubmit={onSubmitUpdateHourBand}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="vehicle_type">
                    Vehicle :{" "}
                    <span className="fs-16">
                      {hourLocation?.state?.vehicle_type?.type!}
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
                      onChange={handleSelectvehicleType}
                    >
                      <option value="">Type</option>
                      {AlllVehicleType.map((vehicleType) => (
                        <option value={`${vehicleType._id}`}>
                          {vehicleType.type}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="hours_limit">Limit</Form.Label>
                  <Form.Control
                    type="text"
                    name="hours_limit"
                    id="hours_limit"
                    placeholder="Enter Limit"
                    onChange={handleLimit}
                    value={limit}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="price">Price</Form.Label>
                  <Form.Control
                    type="text"
                    id="price"
                    name="price"
                    placeholder="£ 0.00"
                    onChange={handlePrice}
                    value={priceHour}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_UpdateHourlyBand();
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button variant="primary" id="add-btn" type="submit">
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
export default HourlyBands;
