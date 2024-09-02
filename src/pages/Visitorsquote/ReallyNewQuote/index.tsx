import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { VectorMap } from "@south-paw/react-vector-maps";
import { numbersList } from "Common/data";
import { useGetAllPassengerAndLuggagesQuery } from "features/PassengerAndLuggageLimits/passengerAndLuggageSlice";
import { useGetAllJourneyQuery } from "features/Journeys/journeySlice";
import { useGetAllSourcesQuery } from "features/Sources/sourcesSlice";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";

interface Stop {
  placeName: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  raduis: string;
}

const ReallyNewQuote = () => {
  document.title = "Create New Quote | Bouden Coach Travel";

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
    libraries: ["places"],
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const originRef = useRef<any>(null);
  const [searchResult, setSearchResult] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [nom, setNom] = useState<any>();
  const [fatma, setFatma] = useState<any>();

  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }

  function onLoadDest(autocomplete: any) {
    setSearchDestination(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = (
        searchResult as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        const coordinates = { lat: location.lat(), lng: location.lng() };

        // programmData["programDetails"]["origin_point"].placeName = name!;
        // programmData["programDetails"]["origin_point"].coordinates =
        //   coordinates!;
        const status = place.business_status;
        const formattedAddress = place.formatted_address;
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  function onPlaceChangedDest() {
    if (searchDestination != null) {
      const place = (
        searchDestination as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        const coordinates = { lat: location.lat(), lng: location.lng() };

        // programmData["programDetails"]["destination_point"].placeName = name!;
        // programmData["programDetails"]["destination_point"].coordinates =
        //   coordinates!;
        const status = place.business_status;
        const formattedAddress = place.formatted_address;
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  const handleLocationButtonClick = () => {
    setSelectedLocation(nom);
  };

  const handleLocationButtonClickDest = () => {
    setSelectedDestination(fatma);
  };

  const { data: AllPassengerLimit = [] } = useGetAllPassengerAndLuggagesQuery();

  const { data: AllJourneys = [] } = useGetAllJourneyQuery();

  const { data: AllSources = [] } = useGetAllSourcesQuery();

  const [selected, setSelected] = useState("");
  const handlePassengerNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const passengerNumber = e.target.value;
    setSelected(passengerNumber);
  };

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const handleVehicleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicleType = e.target.value;
    setSelectedVehicle(vehicleType);
  };

  const optionVehicleTypes = AllPassengerLimit.filter(
    (item) =>
      // item.vehicle_type.type === selectedValue &&
      Number(item.max_passengers) >= Number(selected)
  );

  const optionLuggages = AllPassengerLimit.filter(
    (item) =>
      item.vehicle_type.type === selectedVehicle &&
      Number(item.max_passengers) >= Number(selected)
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumb title="Create Vehicle" pageTitle="Vehicles" /> */}
          <form
            id="createproduct-form"
            autoComplete="off"
            className="needs-validation"
            noValidate
          >
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
                      <h5 className="card-title mb-1">Create a new quote</h5>
                    </div>
                  </div>
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
                        <h5 className="card-title mb-1">Customer</h5>
                      </div>
                    </div>
                    <Row>
                      {/* Email == Done */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            id="supplierName-field"
                            placeholder="Enter email"
                            required
                          />
                        </div>
                      </Col>
                      {/* Phone  == Done */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Phone
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            placeholder="Enter phone number"
                            required
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
                            required
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {/* Mobile  == Done */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Mobile
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            placeholder="Enter mobile number"
                            required
                          />
                        </div>
                      </Col>
                      {/*  Company == Done */}
                      {/* <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Company
                            <span
                              title="If a company trip enter the name of the company"
                              className="mdi mdi-help-circle text-info"
                            ></span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            placeholder="Enter company"
                            required
                          />
                        </div>
                      </Col> */}
                      {/* External Reference  == Done*/}
                      {/* <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            External Reference
                            <span
                              title="If a customer has a reference number enter here otherwise leave blank"
                              className="mdi mdi-help-circle text-info"
                            ></span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="supplierName-field"
                            placeholder="Enter external reference"
                            required
                          />
                        </div>
                      </Col> */}
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <Form className="tablelist-form">
                        <Row>
                          <Card.Header>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-bus"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title mb-1">Transport</h5>
                              </div>
                            </div>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="statusSelect"
                                    className="form-label fs-13"
                                  >
                                    Passengers number
                                  </label>
                                  <select
                                    className="form-select text-muted"
                                    name="choices-single-default"
                                    id="statusSelect"
                                    onChange={handlePassengerNumber}
                                  >
                                    <option value="">Select</option>
                                    {numbersList.map((item) => (
                                      <option value={item.value}>
                                        {item.value}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Col>
                              {/* Vehicle Type  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="selectVehicleType"
                                    className="form-label"
                                  >
                                    Vehicle Type
                                  </label>
                                  <select
                                    className="form-select text-muted"
                                    name="selectVehicleType"
                                    id="selectVehicleType"
                                    onChange={handleVehicleType}
                                  >
                                    {selected === "" ? (
                                      <option value="">Select</option>
                                    ) : (
                                      optionVehicleTypes.map((item) => (
                                        <option
                                          value={item.vehicle_type.type}
                                          key={item?._id!}
                                        >
                                          {item.vehicle_type.type}
                                        </option>
                                      ))
                                    )}
                                  </select>
                                </div>
                              </Col>
                              {/* Luggage Details  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="selectLuggage"
                                    className="form-label"
                                  >
                                    Luggage Details
                                  </label>
                                  <select
                                    className="form-select text-muted"
                                    name="selectLuggage"
                                    id="selectLuggage"
                                    onChange={handleVehicleType}
                                  >
                                    {selected === "" ? (
                                      <option value="">Select</option>
                                    ) : (
                                      optionLuggages.map((item) => (
                                        <option
                                          value={item.max_luggage.description}
                                          key={item?._id!}
                                        >
                                          {item.max_luggage.description}
                                        </option>
                                      ))
                                    )}
                                  </select>
                                </div>
                              </Col>
                              {/* Luggage Details  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="statusSelect"
                                    className="form-label"
                                  >
                                    Journey Type
                                  </label>
                                  <select
                                    className="form-select text-muted"
                                    name="choices-single-default"
                                    id="statusSelect"
                                  >
                                    <option value="">Journey</option>
                                    {AllJourneys.map((journey) => (
                                      <option value={journey.type}>
                                        {journey.type}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Col>
                            </Row>
                          </Card.Header>
                        </Row>
                      </Form>
                    </div>
                    <div className="mb-3">
                      <Form className="tablelist-form p-2">
                        <Row>
                          {/* <Card.Header>
                            <div className="d-flex align-items-center p-1">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-currency-gbp"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title mb-1">Price</h5>
                              </div>
                            </div>
                            <Row>
                             
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Vehicle Price
                                  </Form.Label>
                                  <Form.Control
                                    type="email"
                                    id="supplierName-field"
                                    placeholder="Enter Vehicle Price"
                                    required
                                  />
                                </div>
                              </Col>
                             
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="statusSelect"
                                    className="form-label"
                                  >
                                    Total Price
                                  </label>
                                  <Form.Control
                                    type="email"
                                    id="supplierName-field"
                                    placeholder="00.00"
                                    readOnly
                                    required
                                  />
                                </div>
                              </Col>
                              
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Deposit %
                                  </Form.Label>
                                  <Form.Control
                                    type="email"
                                    id="supplierName-field"
                                    placeholder="Enter Vehicle Price"
                                    defaultValue={30}
                                    required
                                  />
                                </div>
                              </Col>
                             
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Deposit Amount
                                  </Form.Label>
                                  <Form.Control
                                    type="email"
                                    id="supplierName-field"
                                    placeholder="00.00"
                                    readOnly
                                    required
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Balance Due Date
                                  </Form.Label>
                                  <Flatpickr
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date-time"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col lg={5}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Payment Message
                                  </Form.Label>
                                  <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea5"
                                    rows={3}
                                  ></textarea>
                                </div>
                              </Col>
                            </Row>
                          </Card.Header> */}
                          <Card.Header>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-question"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title mb-1">Misc</h5>
                              </div>
                            </div>
                            <Row>
                              {/* How did you hear of us == Done */}
                              <Col lg={4}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    How did you hear of us ?
                                  </Form.Label>
                                  <select
                                    className="form-select text-muted"
                                    name="choices-single-default"
                                    id="statusSelect"
                                  >
                                    <option value="">Select</option>
                                    {AllSources.map((source) => (
                                      <option value={source.name}>
                                        {source.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Col>
                              {/* Priority  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Priority
                                  </Form.Label>
                                  <select
                                    className="form-select text-muted"
                                    name="choices-single-default"
                                    id="statusSelect"
                                  >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="4">5</option>
                                  </select>
                                </div>
                              </Col>
                              {/* Notes  == Done */}
                              <Col lg={5}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Notes
                                  </Form.Label>
                                  <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea5"
                                    rows={3}
                                  ></textarea>
                                </div>
                              </Col>
                            </Row>
                          </Card.Header>
                          <Col lg={12} className="mt-2">
                            <div className="hstack gap-2 justify-content-end">
                              <Button
                                variant="success"
                                id="add-btn"
                                className="btn-sm"
                              >
                                Save & Send
                              </Button>
                              <Button
                                variant="info"
                                id="add-btn"
                                className="btn-sm"
                              >
                                Quick Save
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
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
                        <h5 className="card-title mb-1">Trip Details</h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Form>
                        <Col lg={12}>
                          <Form.Label>Pickup date</Form.Label>
                          <Flatpickr
                            className="form-control flatpickr-input mb-2"
                            placeholder="Select Date"
                            options={{
                              dateFormat: "d M, Y",
                            }}
                          />
                        </Col>
                        <Col lg={12}>
                          <Form.Label>Pickup Time</Form.Label>
                          <Flatpickr
                            className="form-control flatpickr-input mb-2"
                            placeholder="Select Date"
                            options={{
                              dateFormat: "d M, Y",
                            }}
                          />
                        </Col>
                        <Col lg={12}>
                          <Form.Label>Collection Address</Form.Label>
                          <Autocomplete
                            onPlaceChanged={onPlaceChanged}
                            onLoad={onLoad}
                          >
                            <Form.Control
                              type="text"
                              placeholder="Origin"
                              ref={originRef}
                              id="origin"
                              onClick={() => {
                                handleLocationButtonClick();
                                if (nom) {
                                  map?.panTo(nom);
                                  map?.setZoom(15);
                                }
                              }}
                              // onChange={onChangeProgramms}
                              // required
                              className="mb-2"
                            />
                          </Autocomplete>
                        </Col>
                        <Col lg={12}>
                          <Form.Label>Destination Address</Form.Label>
                          <Form.Control
                            type="email"
                            id="supplierName-field"
                            placeholder="Enter Destination address"
                            required
                          />
                        </Col>
                      </Form>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReallyNewQuote;
