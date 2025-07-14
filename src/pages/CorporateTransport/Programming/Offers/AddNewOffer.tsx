import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { useGetAllSchoolsQuery } from "features/Schools/schools";
import { useGetAllCompanyQuery } from "features/Company/companySlice";
import { useGetAllContractsQuery } from "features/contract/contractSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import Swal from "sweetalert2";
import {
  OffersModel,
  useAddNewOfferMutation,
} from "features/offers/offerSlice";

const AddNewOffer = () => {
  document.title = "Create New Offer | Coach Hire Network";

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Offer is created successfully",
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

  const navigate = useNavigate();
  const { data: allSchools = [] } = useGetAllSchoolsQuery();
  const { data: allCompanies = [] } = useGetAllCompanyQuery();
  const { data: allContracts = [] } = useGetAllContractsQuery();
  const { data: allVehicles = [] } = useGetAllVehiclesQuery();
  const { data: allDrivers = [] } = useGetAllDriverQuery();

  const [createNewOffer] = useAddNewOfferMutation();
  const [selectedClientType, setSelectedClientType] = useState<string>("");
  const [selectedClientName, setSelectedClientName] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [selectedContract, setSelectedContract] = useState<string>("");
  const [listOfContracts, setListOfContracts] = useState<any[]>([]);
  const [originAutocomplete, setOriginAutocomplete] = useState<any>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] =
    useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [origin_name, setOriginName] = useState<any>();
  const [destination_name, setDestinationName] = useState<any>();
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const originRef = useRef<any>(null);
  const destinationRef = useRef<any>(null);

  const today = new Date();
  // const filtredVehicles = allVehicles.filter((vehicle)=>

  // )

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API!,
    libraries: ["places"],
  });

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClientType(event.target.value);
  };

  const contractHandler = (event: any) => {
    setSelectedContract(event.target.value);
  };

  const driverHandler = (event: any) => {
    setSelectedDriver(event.target.value);
  };

  const vehicleHandler = (event: any) => {
    setSelectedVehicle(event.target.value);
  };

  const handleSelectedClientName = (e: any) => {
    let filtredContracts: any[] = [];

    const value = e.target.value;
    setSelectedClientName(value);
    if (selectedClientType === "School") {
      filtredContracts = allContracts.filter(
        (contract) => contract?.idSchool === value
      );
      setListOfContracts(filtredContracts);
    } else {
      filtredContracts = allContracts.filter(
        (contract) => contract?.idCompany! === value
      );
      setListOfContracts(filtredContracts);
    }
  };

  const initialOffer: OffersModel = {
    name: "",
    school_id: null,
    company_id: null,
    contract_id: null,
    vehicle_id: "",
    driver_id: "",
    pick_up: "",
    destination: "",
    cost: "",
    offer_number: "",
  };

  const [offerData, setOfferData] = useState(initialOffer);

  const onChangeOffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  function onPlaceOriginChanged() {
    if (originAutocomplete != null) {
      const place = originAutocomplete.getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        offerData["pick_up"] = name!;
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  function onPlaceDestionationChanged() {
    if (destinationAutocomplete != null) {
      const place = destinationAutocomplete.getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        offerData["destination"] = name!;
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text !");
    }
  }

  function onLoadOrigin(autocomplete: any) {
    autocomplete.setComponentRestrictions({
      country: ["uk"],
    });
    setOriginAutocomplete(autocomplete);
  }

  function onLoadDestionation(autocomplete: any) {
    autocomplete.setComponentRestrictions({
      country: ["uk"],
    });
    setDestinationAutocomplete(autocomplete);
  }

  const handleLocationButtonClick = () => {
    setSelectedLocation(origin_name);
  };

  const handleLocationButtonClickDest = () => {
    setSelectedDestination(destination_name);
  };

  const onSubmitOffer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      offerData["driver_id"] = selectedDriver;
      offerData["vehicle_id"] = selectedVehicle;
      offerData["contract_id"] = selectedContract;
      if (selectedClientType === "School") {
        offerData["school_id"] = selectedClientName;
      } else {
        offerData["company_id"] = selectedClientName;
      }

      createNewOffer(offerData)
        .then(() => notifySuccess())
        .then(() => setOfferData(initialOffer))
        .then(() => navigate("/offers"));
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="New Offer" pageTitle="Suggested Routes" />
          <Row className="d-flex justify-content-center m-1">
            <Col lg={10}>
              <Form onSubmit={onSubmitOffer}>
                <Card>
                  <Card.Body>
                    <Row className="d-flex align-items-center m-4">
                      <Col lg={2}>
                        <Form.Label htmlFor="name" className="fs-16">
                          Name
                        </Form.Label>
                      </Col>
                      <Col lg={6}>
                        <Form.Control
                          type="text"
                          id="name"
                          onChange={onChangeOffer}
                        />
                      </Col>
                    </Row>
                    <Row className="d-flex align-items-center m-2">
                      <Col lg={2}>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onChange={radioHandler}
                            value="School"
                          />
                          <Form.Label
                            className="form-check-label fs-17"
                            htmlFor="flexRadioDefault1"
                          >
                            School
                          </Form.Label>
                        </div>
                      </Col>
                      <Col lg={2}>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onChange={radioHandler}
                            value="Company"
                          />
                          <Form.Label
                            className="form-check-label fs-17"
                            htmlFor="flexRadioDefault1"
                          >
                            Company
                          </Form.Label>
                        </div>
                      </Col>

                      {selectedClientType === "School" && (
                        <>
                          <Col lg={2} className="text-end">
                            <Form.Label htmlFor="school_id">
                              Client Name
                            </Form.Label>
                          </Col>
                          <Col lg={6}>
                            <select
                              className="form-select text-muted"
                              name="school_id"
                              id="school_id"
                              onChange={handleSelectedClientName}
                            >
                              <option value="">Select</option>
                              {allSchools.map((school) => (
                                <option
                                  value={`${school?._id!}`}
                                  key={school?._id!}
                                >
                                  {school.name}
                                </option>
                              ))}
                            </select>
                          </Col>
                        </>
                      )}
                      {selectedClientType === "Company" && (
                        <>
                          <Col lg={2} className="text-end">
                            <Form.Label htmlFor="company_id">
                              Client Name
                            </Form.Label>
                          </Col>
                          <Col lg={6}>
                            <select
                              className="form-select text-muted"
                              name="company_id"
                              id="company_id"
                              onChange={handleSelectedClientName}
                            >
                              <option value="">Select</option>
                              {allCompanies.map((company) => (
                                <option
                                  value={`${company?._id!}`}
                                  key={company?._id!}
                                >
                                  {company.name}
                                </option>
                              ))}
                            </select>
                          </Col>
                        </>
                      )}
                    </Row>
                    <Row className="d-flex align-items-center m-4">
                      <Col lg={2}>
                        <Form.Label htmlFor="contract_id" className="fs-16">
                          Contract
                        </Form.Label>
                      </Col>
                      <Col lg={6}>
                        <select
                          className="form-select"
                          onChange={contractHandler}
                        >
                          <option value="">Select</option>
                          {listOfContracts.map((contract: any) => (
                            <option value={contract?._id!} key={contract?._id!}>
                              {contract?.contractName!}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                    <Row className="d-flex align-items-center m-4">
                      <Col lg={2}>
                        <Form.Label htmlFor="vehicle_id" className="fs-16">
                          Vehicle
                        </Form.Label>
                      </Col>
                      <Col lg={6}>
                        <select
                          className="form-select"
                          onChange={vehicleHandler}
                        >
                          <option value="">Select</option>
                          {allVehicles.map((vehicle: any) => (
                            <option value={vehicle?._id!} key={vehicle?._id!}>
                              {vehicle?.registration_number!}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                    <Row className="d-flex align-items-center m-4">
                      <Col lg={2}>
                        <Form.Label htmlFor="driver_id" className="fs-16">
                          Driver
                        </Form.Label>
                      </Col>
                      <Col lg={6}>
                        <select
                          className="form-select"
                          onChange={driverHandler}
                        >
                          <option value="">Select</option>
                          {allDrivers.map((driver: any) => (
                            <option value={driver?._id!} key={driver?._id!}>
                              {driver?.firstname!} {driver?.surname!}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                    {isLoaded && (
                      <Row className="d-flex align-items-center m-4">
                        <Col lg={2}>
                          <Form.Label htmlFor="pick_up" className="fs-16">
                            PickUp
                          </Form.Label>
                        </Col>
                        <Col lg={4}>
                          <Autocomplete
                            onPlaceChanged={onPlaceOriginChanged}
                            onLoad={onLoadOrigin}
                          >
                            <Form.Control
                              type="text"
                              placeholder="Origin"
                              ref={originRef}
                              id="pick_up"
                              onClick={() => {
                                handleLocationButtonClick();
                                if (origin_name) {
                                  map?.panTo(origin_name);
                                  map?.setZoom(15);
                                }
                              }}
                              onChange={onChangeOffer}
                            />
                          </Autocomplete>
                        </Col>
                        <Col lg={2} className="text-end">
                          <Form.Label htmlFor="destiantion" className="fs-16">
                            Destination
                          </Form.Label>
                        </Col>
                        <Col lg={4}>
                          <Autocomplete
                            onPlaceChanged={onPlaceDestionationChanged}
                            onLoad={onLoadDestionation}
                          >
                            <Form.Control
                              type="text"
                              placeholder="Destination"
                              ref={destinationRef}
                              id="destination"
                              onClick={() => {
                                handleLocationButtonClickDest();
                                if (destination_name) {
                                  map?.panTo(destination_name);
                                  map?.setZoom(15);
                                }
                              }}
                              onChange={onChangeOffer}
                            />
                          </Autocomplete>
                        </Col>
                      </Row>
                    )}
                    <Row className="d-flex align-items-center m-4">
                      <Col lg={2}>
                        <Form.Label htmlFor="cost" className="fs-16">
                          Cost
                        </Form.Label>
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          id="cost"
                          onChange={onChangeOffer}
                        />
                      </Col>
                      <Col lg={2} className="text-end">
                        <Form.Label htmlFor="offer_number" className="fs-16">
                          Number
                        </Form.Label>
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          id="offer_number"
                          onChange={onChangeOffer}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                          <Button variant="primary" id="add-btn" type="submit">
                            Apply
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddNewOffer;
