import { useGetAllLocationsQuery } from "features/Location/locationSlice";
import {
  useAddNewRegionalPricingMutation,
  useDeleteRegionalPricingMutation,
  useGetAllRegionalPricingsQuery,
  useUpdateRegionalPricingMutation,
} from "features/RegionalPricing/regionalPricingSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import React, { useEffect, useState } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const RegionalPricings = () => {
  const { data: allRegionalPrcing = [] } = useGetAllRegionalPricingsQuery();
  const { data: allVehicleType = [] } = useGetAllVehicleTypesQuery();
  const { data: allLocations = [] } = useGetAllLocationsQuery();
  const [deleteRegionalPricing] = useDeleteRegionalPricingMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDeleteRegionalPricing = async (_id: any) => {
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
          deleteRegionalPricing(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Regional Pricing is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Regional Pricing is safe :)",
            "info"
          );
        }
      });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.title,
      sortable: true,
      width: "125px",
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle</span>,
      selector: (row: any) => row.type_vehicle?.type!,
      sortable: true,
      width: "160px",
    },
    {
      name: <span className="font-weight-bold fs-13">Location</span>,
      selector: (row: any) => row?.location?.start_point!.placeName!,
      sortable: true,
      width: "236px",
    },
    {
      name: <span className="font-weight-bold fs-13">Miles</span>,
      selector: (row: any) => row.miles,
      sortable: true,
      width: "70px",
    },
    {
      name: <span className="font-weight-bold fs-13">Uplift</span>,
      selector: (row: any) => <span>{row.uplift} %</span>,
      sortable: true,
      width: "70px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            {/* <li>
              <Link to="#" className="badge badge-soft-primary edit-item-btn">
                <i className="ri-eye-line"></i>
              </Link>
            </li> */}
            <li>
              <Link
                to="#"
                className="badge badge-soft-success edit-item-btn"
                state={row}
                onClick={tog_UpdateRegional}
              >
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDeleteRegionalPricing(row?._id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
      width: "92px",
    },
  ];

  const [modal_AddRegional, setmodal_AddRegional] = useState<boolean>(false);
  function tog_AddRegional() {
    setmodal_AddRegional(!modal_AddRegional);
  }

  const [modal_UpdateRegional, setmodal_UpdateRegional] =
    useState<boolean>(false);
  function tog_UpdateRegional() {
    setmodal_UpdateRegional(!modal_UpdateRegional);
  }

  const notifySuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Regional Pricing is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyUpdateSuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Regional Pricing is updated successfully",
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

  const [addNewRegionalPricing] = useAddNewRegionalPricingMutation();
  const [updateRegionalPricing] = useUpdateRegionalPricingMutation();

  const [selectVehicleType, setSelectVehicleType] = useState<string>("");
  // This function is triggered when the select Vehicle Type
  const handleSelectedVehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectVehicleType(value);
  };

  const [selectLocation, setSelectLocation] = useState<string>("");
  // This function is triggered when the select Location
  const handleSelectedLocation = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectLocation(value);
  };
  const initialWaitingBand = {
    title: "",
    type_vehicle: "",
    miles: "",
    location: "",
    uplift: "",
  };
  const [regionalPricingData, setRegionalPricingData] =
    useState(initialWaitingBand);

  const onChangeRegionalPricing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionalPricingData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitRegionalPricing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      regionalPricingData["type_vehicle"] = selectVehicleType;
      regionalPricingData["location"] = selectLocation;
      addNewRegionalPricing(regionalPricingData)
        .then(() => setRegionalPricingData(initialWaitingBand))
        .then(() => notifySuccess());
    } catch (error) {
      notifyError(error);
    }
  };

  const [pricingTitle, setPricingTitle] = useState<string>("");
  const [pricingMiles, setpricingMiles] = useState<string>("");
  const [pricingUplift, setpricingUplift] = useState<string>("");
  const [pricingId, setPricingId] = useState<string>("");
  const pricingLocation = useLocation();

  useEffect(() => {
    if (pricingLocation?.state) {
      setPricingId(pricingLocation.state._id || "");
      setPricingTitle(pricingLocation.state.title || "");
      setpricingMiles(pricingLocation.state.miles || "");
      setpricingUplift(pricingLocation.state.uplift || "");
    }
  }, [pricingLocation]);

  const handleTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPricingTitle(e.target.value);
  };

  const handleUplift = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setpricingUplift(e.target.value);
  };

  const handleMiles = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setpricingMiles(e.target.value);
  };

  const [showVehicle, setShowVehicle] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);

  const onSubmitUpdateRegionalPricing = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const regionalPricing = {
        _id: pricingId || pricingLocation.state._id,
        title: pricingTitle || pricingLocation.state.title,
        uplift: pricingUplift || pricingLocation.state.uplift,
        type_vehicle:
          selectVehicleType || pricingLocation.state.type_vehicle._id,
        location: selectLocation || pricingLocation.state.location._id,
        miles: pricingMiles || pricingLocation.state.miles,
      };
      updateRegionalPricing(regionalPricing)
        .then(() => setRegionalPricingData(initialWaitingBand))
        .then(() => notifyUpdateSuccess());
      setShowLocation(!showLocation);
      setShowVehicle(!showVehicle);
    } catch (error) {
      notifyError(error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredRegionalPricing = () => {
    let filteredRegionalPricing = allRegionalPrcing;
    if (searchTerm) {
      filteredRegionalPricing = filteredRegionalPricing.filter(
        (regionalPricing: any) =>
          (regionalPricing?.type_vehicle?.type! &&
            regionalPricing?.type_vehicle
              ?.type!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (regionalPricing?.miles! &&
            regionalPricing
              ?.miles!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (regionalPricing?.title! &&
            regionalPricing
              ?.title!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (regionalPricing?.uplift! &&
            regionalPricing
              ?.uplift!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (regionalPricing?.location?.start_point?.placeName! &&
            regionalPricing?.location?.start_point
              ?.placeName!.toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }
    return filteredRegionalPricing;
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
                    onClick={() => tog_AddRegional()}
                  >
                    <i className="ri-add-fill align-middle"></i>{" "}
                    <span>New Regional Pricing</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={getFilteredRegionalPricing()}
              pagination
            />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="lg"
        show={modal_AddRegional}
        onHide={() => {
          tog_AddRegional();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            New Regional Pricing
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form className="tablelist-form" onSubmit={onSubmitRegionalPricing}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="title">Title</Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    // placeholder="Enter Limit"
                    name="title"
                    onChange={onChangeRegionalPricing}
                    value={regionalPricingData.title}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="type_vehicle">Vehicle</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="type_vehicle"
                    id="type_vehicle"
                    onChange={handleSelectedVehicleType}
                  >
                    <option value="">Type</option>
                    {allVehicleType.map((vehicleType) => (
                      <option key={vehicleType?._id!} value={vehicleType?._id!}>
                        {vehicleType?.type!}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="location">Location</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="location"
                    id="location"
                    onChange={handleSelectedLocation}
                  >
                    <option value="">Select</option>
                    {allLocations.map((locations) => (
                      <option key={locations?._id!} value={locations?._id!}>
                        {locations.start_point.placeName}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="uplift">Uplift</Form.Label>
                  <Form.Control
                    type="text"
                    id="uplift"
                    name="uplift"
                    onChange={onChangeRegionalPricing}
                    value={regionalPricingData.uplift}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="miles">Miles</Form.Label>
                  <Form.Control
                    type="text"
                    id="miles"
                    name="miles"
                    onChange={onChangeRegionalPricing}
                    value={regionalPricingData.miles}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddRegional();
                      setRegionalPricingData(initialWaitingBand);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    id="add-btn"
                    onClick={() => {
                      tog_AddRegional();
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
        show={modal_UpdateRegional}
        onHide={() => {
          tog_UpdateRegional();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Update Regional Pricing
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form
            className="tablelist-form"
            onSubmit={onSubmitUpdateRegionalPricing}
          >
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="title">Title</Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleTitle}
                    value={pricingTitle}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="type_vehicle">
                    Vehicle :{" "}
                    <span className="fs-16">
                      {pricingLocation?.state?.type_vehicle?.type!}
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
                      name="type_vehicle"
                      id="type_vehicle"
                      onChange={handleSelectedVehicleType}
                    >
                      <option value="">Type</option>
                      {allVehicleType.map((vehicleType) => (
                        <option
                          key={vehicleType?._id!}
                          value={vehicleType?._id!}
                        >
                          {vehicleType?.type!}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="location">
                    Location :{" "}
                    <span className="fs-16">
                      {
                        pricingLocation?.state?.location?.start_point
                          ?.placeName!
                      }
                    </span>
                    <div
                      className="d-flex justify-content-start mt-n3"
                      style={{ marginLeft: "400px" }}
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
                          onClick={() => setShowLocation(!showLocation)}
                        >
                          <span className="avatar-title bg-white text-success cursor-pointer">
                            <i className="bi bi-pen fs-14"></i>
                          </span>
                        </span>
                      </label>
                    </div>
                  </Form.Label>
                  {showLocation && (
                    <select
                      className="form-select text-muted"
                      name="location"
                      id="location"
                      onChange={handleSelectedLocation}
                    >
                      <option value="">Select</option>
                      {allLocations.map((locations) => (
                        <option key={locations?._id!} value={locations?._id!}>
                          {locations.start_point.placeName}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="uplift">Uplift</Form.Label>
                  <Form.Control
                    type="text"
                    id="uplift"
                    name="uplift"
                    onChange={handleUplift}
                    value={pricingUplift}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="miles">Miles</Form.Label>
                  <Form.Control
                    type="text"
                    id="miles"
                    name="miles"
                    onChange={handleMiles}
                    value={pricingMiles}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_UpdateRegional();
                      setRegionalPricingData(initialWaitingBand);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    id="add-btn"
                    onClick={() => {
                      tog_UpdateRegional();
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
export default RegionalPricings;
