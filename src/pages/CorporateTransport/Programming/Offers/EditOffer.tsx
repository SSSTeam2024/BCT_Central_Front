import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useLocation } from "react-router-dom";
import { useGetAllSchoolsQuery } from "features/Schools/schools";
import { useGetAllCompanyQuery } from "features/Company/companySlice";
import { useGetAllContractsQuery } from "features/contract/contractSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import Swal from "sweetalert2";
import { useUpdateOfferMutation } from "features/offers/offerSlice";

const EidtOffer = () => {
  document.title = "Edit Offer | Coach Hire Network";

  const { data: allSchools = [] } = useGetAllSchoolsQuery();
  const { data: allCompanies = [] } = useGetAllCompanyQuery();
  const { data: allContracts = [] } = useGetAllContractsQuery();
  const { data: allVehicles = [] } = useGetAllVehiclesQuery();
  const { data: allDrivers = [] } = useGetAllDriverQuery();

  const location = useLocation();
  const offerDetails = location.state;
  const [offerName, setOfferName] = useState(offerDetails.name);
  const [offerCost, setOfferCost] = useState(offerDetails.cost);
  const [offerPickup, setOfferPickup] = useState(offerDetails.pick_up);
  const [offerDest, setOfferDest] = useState(offerDetails.destination);
  const [offerNumber, setOfferNumber] = useState(offerDetails.offer_number);
  const [idSchool, setIdSchool] = useState(offerDetails?.school_id?._id!);
  const [idCompany, setIdCompany] = useState(offerDetails?.company_id?._id!);
  const [idVehicle, setIdVehicle] = useState(offerDetails?.vehicle_id?._id!);
  const [idDriver, setIdDriver] = useState(offerDetails?.driver_id?._id!);
  const [idContract, setIdContract] = useState(offerDetails?.contract_id?._id!);
  const [selectedOption, setSelectedOption] = useState("");

  const notifySuccess = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const [updateOffer] = useUpdateOfferMutation();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API!,
    libraries: ["places"],
  });

  useEffect(() => {
    if (offerDetails?.school_id !== null) {
      setSelectedOption("School");
    } else if (offerDetails?.company_id !== null) {
      setSelectedOption("Company");
    }
  }, [offerDetails]);

  const filteredContracts = allContracts.filter((contract: any) => {
    if (idSchool) {
      return contract?.idSchool! === idSchool;
    } else if (idCompany) {
      return contract?.idCompany! === idCompany;
    }
    return false;
  });

  const handleBlur = () => {
    const updatedFields: string[] = [];

    if (offerName !== offerDetails.name) {
      updatedFields.push("Offer name");
    }
    if (offerCost !== offerDetails.cost) {
      updatedFields.push("Offer cost");
    }
    if (offerPickup !== offerDetails.pick_up) {
      updatedFields.push("Pick-up location");
    }
    if (offerDest !== offerDetails.destination) {
      updatedFields.push("Destination");
    }
    if (idSchool !== offerDetails?.school_id?._id) {
      updatedFields.push("School");
    }
    if (offerNumber !== offerDetails.offer_number) {
      updatedFields.push("Offer number");
    }
    if (idVehicle !== offerDetails?.vehicle_id?._id) {
      updatedFields.push("Vehicle");
    }
    if (idCompany !== offerDetails?.company_id?._id) {
      updatedFields.push("Company");
    }
    if (idDriver !== offerDetails?.driver_id?._id) {
      updatedFields.push("Driver");
    }
    if (idContract !== offerDetails?.contract_id?._id) {
      updatedFields.push("Contract");
    }

    if (updatedFields.length > 0) {
      updateOffer({
        _id: offerDetails?._id!,
        name: offerName,
        cost: offerCost,
        school_id: idSchool,
        company_id: idCompany,
        contract_id: idContract,
        vehicle_id: idVehicle,
        driver_id: idDriver,
        pick_up: offerPickup,
        destination: offerDest,
        offer_number: offerNumber,
      }).then(() => {
        Swal.fire({
          icon: "success",
          title: "Offer Updated Successfully",
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          width: "300px",
        });
      });
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Edit Offer" pageTitle="Suggested Routes" />
          <Row className="d-flex justify-content-center m-1">
            <Col lg={10}>
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
                        value={offerName}
                        onChange={(e) => setOfferName(e.target.value)}
                        onBlur={handleBlur}
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
                          id="flexRadioSchool"
                          value="School"
                          checked={selectedOption === "School"}
                          disabled={selectedOption !== "School"}
                          readOnly
                        />
                        <Form.Label
                          className="form-check-label fs-17"
                          htmlFor="flexRadioSchool"
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
                          id="flexRadioCompany"
                          value="Company"
                          checked={selectedOption === "Company"}
                          disabled={selectedOption !== "Company"}
                          readOnly
                        />
                        <Form.Label
                          className="form-check-label fs-17"
                          htmlFor="flexRadioCompany"
                        >
                          Company
                        </Form.Label>
                      </div>
                    </Col>
                    {offerDetails?.school_id! !== null && (
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
                            value={idSchool}
                            onChange={(e) => setIdSchool(e.target.value)}
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
                    {offerDetails?.company_id! !== null && (
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
                            value={idCompany}
                            onChange={(e) => setIdCompany(e.target.value)}
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
                        onChange={(e) => setIdContract(e.target.value)}
                        value={idContract}
                      >
                        <option value="">Select</option>
                        {filteredContracts.map((contract: any) => (
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
                        onChange={(e) => setIdVehicle(e.target.value)}
                        value={idVehicle}
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
                        onChange={(e) => setIdDriver(e.target.value)}
                        value={idDriver}
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
                        <Form.Label htmlFor="pickup" className="fs-16">
                          PickUp
                        </Form.Label>
                      </Col>
                      <Col lg={4}>
                        <Autocomplete
                        // onPlaceChanged={onPlaceOriginChanged}
                        // onLoad={onLoadOrigin}
                        >
                          <Form.Control
                            type="text"
                            placeholder="Origin"
                            // ref={originRef}
                            id="pick_up"
                            value={offerPickup}
                            // onClick={() => {
                            //   handleLocationButtonClick();
                            //   if (origin_name) {
                            //     map?.panTo(origin_name);
                            //     map?.setZoom(15);
                            //   }
                            // }}
                            // onChange={onChangeProgramms}
                            readOnly
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
                        // onPlaceChanged={onPlaceOriginChanged}
                        // onLoad={onLoadOrigin}
                        >
                          <Form.Control
                            type="text"
                            placeholder="Origin"
                            // ref={originRef}
                            id="destination"
                            value={offerDest}
                            // onClick={() => {
                            //   handleLocationButtonClick();
                            //   if (origin_name) {
                            //     map?.panTo(origin_name);
                            //     map?.setZoom(15);
                            //   }
                            // }}
                            // onChange={onChangeProgramms}
                            readOnly
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
                        value={offerCost}
                        onChange={(e) => setOfferCost(e.target.value)}
                        onBlur={handleBlur}
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
                        value={offerNumber}
                        onChange={(e) => setOfferNumber(e.target.value)}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EidtOffer;
