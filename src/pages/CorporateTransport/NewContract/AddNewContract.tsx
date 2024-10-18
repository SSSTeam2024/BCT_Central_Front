import React, { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddNewContractMutation } from "features/contract/contractSlice";
import {
  Company,
  useFetchCompanyByIdQuery,
  useGetAllCompanyQuery,
} from "features/Company/companySlice";
import {
  School,
  useFetchSchoolByIdQuery,
  useGetAllSchoolsQuery,
} from "features/Schools/schools";
import { useGetAllTeamQuery } from "features/Team/teamSlice";
import {
  useFetchProgrammByIdQuery,
  useFetchProgrammsQuery,
} from "features/Programs/programSlice";
import {
  useFetchVehicleTypeByIdQuery,
  useGetAllVehicleTypesQuery,
} from "features/VehicleType/vehicleTypeSlice";
import {
  useFetchLuggageByIdQuery,
  useGetAllLuggageQuery,
} from "features/luggage/luggageSlice";
import {
  useFetchJourneyByIdQuery,
  useGetAllJourneyQuery,
} from "features/Journeys/journeySlice";
import AddContractProgramm from "pages/Programs/AddContractProgramm";

const AddNewContract = () => {
  document.title = "Create Contract | Coach Hire Network";
  const { data: AllCompany = [] } = useGetAllCompanyQuery();
  const { data: AllSchools = [] } = useGetAllSchoolsQuery();
  const { data: AllTeams = [] } = useGetAllTeamQuery();
  const { data: AllPrograms = [] } = useFetchProgrammsQuery();
  // const { data: AllVehicleTypes = [] } = useGetAllVehicleTypesQuery();
  const { data: AllLuggages = [] } = useGetAllLuggageQuery();
  const { data: AllJourneys = [] } = useGetAllJourneyQuery();

  const [selectedVehicleType, setSelectedVehicletype] = useState<string>("");
  // This function is triggered when the select Vehicle Type
  const handleSelectVehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicletype(value);
  };

  const [selectedLuggage, setSelectedLuggage] = useState<string>("");
  // This function is triggered when the select Luggage
  const handleSelectLuggage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLuggage(value);
  };

  const [selectedJourney, setSelectedJourney] = useState<string>("");
  // This function is triggered when the select Journey
  const handleSelectJourney = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedJourney(value);
  };

  const [selectedInvoiceFrequency, setSelectedInvoiceFrequency] =
    useState<string>("");
  // This function is triggered when the select Invoice Frequency
  const handleSelectInvoiceFrequency = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedInvoiceFrequency(value);
  };

  const [selectedSalesperson, setSelectedSalesperson] = useState<string>("");
  // This function is triggered when the select Salesperson
  const handleSelectSalesperson = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedSalesperson(value);
  };

  const [selectedAccount, setSelectedAccount] = useState<string>("");
  // This function is triggered when the select Account
  const handleSelectAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedAccount(value);
  };

  const [selectedProgram, setSelectedProgram] = useState<string>("");
  // This function is triggered when the select Program
  const handleSelectProgram = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedProgram(value);
  };

  const { data: OneProgram } = useFetchProgrammByIdQuery(selectedProgram);
  const { data: OneCompany } = useFetchCompanyByIdQuery(selectedAccount);
  const { data: OneSchool } = useFetchSchoolByIdQuery(selectedAccount);
  const selectedCompany = (element: Company) => element._id === selectedAccount;
  let company_exist = AllCompany.some(selectedCompany);
  const selectedSchool = (element: School) => element._id === selectedAccount;
  let school_exist = AllSchools.some(selectedSchool);
  let filteredSchoolsProg = AllPrograms.filter((program) => {
    const schoolIdObj = program?.school_id as { _id: string } | undefined;
    if (schoolIdObj) {
      return schoolIdObj._id === selectedAccount;
    }
    return false;
  });

  let filteredCompaniesProg = AllPrograms.filter((program) => {
    const schoolIdObj = program?.company_id as { _id: string } | undefined;
    if (schoolIdObj) {
      return schoolIdObj._id === selectedAccount;
    }
    return false;
  });

  const { data: OneVehicleType } = useFetchVehicleTypeByIdQuery(
    OneProgram?.programDetails?.vehiculeType
  );
  const { data: OneJourney } = useFetchJourneyByIdQuery(
    OneProgram?.programDetails?.journeyType
  );
  const { data: OneLuggageDetails } = useFetchLuggageByIdQuery(
    OneProgram?.programDetails?.luggage
  );
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Contract is created successfully",
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

  const [createNewContract] = useAddNewContractMutation();
  const navigate = useNavigate();
  const initialContract = {
    contractName: "",
    invoiceFrequency: "",
    customerNotes: "",
    staffNotes: "",
    prices: "",
    salesperson: "",
    idProgram: "",
    idAccount: "",
    vehicleType: "",
    journeyType: "",
    luggageDetails: "",
    contractStatus: "Pending",
    accountName: "",
    accountEmail: "",
    accountPhone: "",
    accountRef: "",
    unit_price: "",
  };

  const [contract, setContract] = useState(initialContract);

  const {
    contractName,
    invoiceFrequency,
    customerNotes,
    staffNotes,
    prices,
    salesperson,
    idProgram,
    idAccount,
    vehicleType,
    journeyType,
    luggageDetails,
    contractStatus,
    accountPhone,
    accountEmail,
    accountName,
    accountRef,
    unit_price,
  } = contract;

  const onChangeContract = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContract((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitContract = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      contract["idAccount"] = selectedAccount;
      contract["idProgram"] = selectedProgram;
      contract["journeyType"] = selectedJourney;
      contract["luggageDetails"] = selectedLuggage;
      contract["vehicleType"] = selectedVehicleType;
      contract["salesperson"] = selectedSalesperson;
      contract["invoiceFrequency"] = selectedInvoiceFrequency;
      if (company_exist) {
        contract["accountName"] = OneCompany?.name!;
        contract["accountEmail"] = OneCompany?.email!;
        contract["accountPhone"] = OneCompany?.phone!;
        contract["accountRef"] = OneCompany?.name!;
      }
      if (school_exist) {
        contract["accountName"] = OneSchool?.name!;
        contract["accountEmail"] = OneSchool?.email!;
        contract["accountPhone"] = OneSchool?.phone!;
        contract["accountRef"] = OneSchool?.name!;
      }

      createNewContract(contract)
        .then(() => notifySuccess())
        .then(() => navigate("/contract"));
    } catch (error) {
      notifyError(error);
    }
  };
  const [show, setShow] = useState<boolean>(false);
  const handleShowProgram = () => {
    setShow(!show);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumb title="Create Vehicle" pageTitle="Vehicles" /> */}
          <Form onSubmit={onSubmitContract}>
            <Row>
              <Col lg={8}>
                <Card>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="mdi mdi-file-sign"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">
                          Contract Information
                        </h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {/* Name  == Done */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="contractName">
                            Contract
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="contractName"
                            name="contractName"
                            placeholder="Enter contract"
                            onChange={onChangeContract}
                            value={contract.contractName}
                          />
                        </div>
                      </Col>
                      {/* Account == Done */}
                      {company_exist ? (
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountRef">
                              Account
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountRef"
                              name="accountRef"
                              placeholder="Enter account name"
                              readOnly
                              defaultValue={OneCompany?.name!}
                            />
                          </div>
                        </Col>
                      ) : school_exist ? (
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountRef">
                              Account
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountRef"
                              name="accountRef"
                              placeholder="Enter account name"
                              readOnly
                              defaultValue={OneSchool?.name!}
                            />
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                      {/* Account Id Select */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="idAccount">
                            Find Account
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="invoiceFrequency"
                            id="invoiceFrequency"
                            onChange={handleSelectAccount}
                          >
                            <option value="">Select</option>
                            {AllCompany.map((company) => (
                              <option key={company._id} value={company._id}>
                                {company.name}
                              </option>
                            ))}
                            {AllSchools.map((school) => (
                              <option key={school._id} value={school._id}>
                                {school.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                    </Row>
                    {company_exist ? (
                      <Row>
                        {/* Name  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountName">Name</Form.Label>
                            <Form.Control
                              type="text"
                              id="accountName"
                              name="accountName"
                              placeholder="Enter name"
                              defaultValue={OneCompany?.name!}
                              readOnly
                            />
                          </div>
                        </Col>
                        {/* Email  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountEmail">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountEmail"
                              name="accountEmail"
                              placeholder="Enter email"
                              defaultValue={OneCompany?.email!}
                              readOnly
                            />
                          </div>
                        </Col>
                        {/* Phone  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountPhone">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountPhone"
                              name="accountPhone"
                              placeholder="Enter phone"
                              defaultValue={OneCompany?.phone!}
                              readOnly
                            />
                          </div>
                        </Col>
                      </Row>
                    ) : school_exist ? (
                      <Row>
                        {/* Name  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountName">Name</Form.Label>
                            <Form.Control
                              type="text"
                              id="accountName"
                              name="accountName"
                              placeholder="Enter name"
                              defaultValue={OneSchool?.name!}
                              readOnly
                            />
                          </div>
                        </Col>
                        {/* Email  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountEmail">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountEmail"
                              name="accountEmail"
                              placeholder="Enter email"
                              defaultValue={OneSchool?.email!}
                              readOnly
                            />
                          </div>
                        </Col>
                        {/* Phone  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountPhone">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountPhone"
                              name="accountPhone"
                              placeholder="Enter phone"
                              defaultValue={OneSchool?.phone!}
                              readOnly
                            />
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <Row>
                        {/* Name  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountName">Name</Form.Label>
                            <Form.Control
                              type="text"
                              id="accountName"
                              name="accountName"
                              placeholder="Enter name"
                              onChange={onChangeContract}
                              value={contract.accountName}
                              readOnly
                            />
                          </div>
                        </Col>
                        {/* Email  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountEmail">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountEmail"
                              name="accountEmail"
                              placeholder="Enter email"
                              onChange={onChangeContract}
                              value={contract.accountEmail}
                              readOnly
                            />
                          </div>
                        </Col>
                        {/* Phone  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountPhone">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountPhone"
                              name="accountPhone"
                              placeholder="Enter phone"
                              onChange={onChangeContract}
                              value={contract.accountPhone}
                              readOnly
                            />
                          </div>
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="customerNotes">Notes</Form.Label>
                          <div>
                            <textarea
                              className="form-control"
                              id="customerNotes"
                              name="customerNotes"
                              placeholder="Customer see these!"
                              rows={3}
                              value={contract.customerNotes}
                              onChange={onChangeContract}
                            ></textarea>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="staffNotes">
                            Note for Staff
                          </Form.Label>
                          <div>
                            <textarea
                              className="form-control"
                              placeholder="only for staff member"
                              id="staffNotes"
                              name="staffNotes"
                              value={contract.staffNotes}
                              onChange={onChangeContract}
                              rows={3}
                            ></textarea>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="salesperson">
                            Salesperson
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="salesperson"
                            id="salesperson"
                            onChange={handleSelectSalesperson}
                          >
                            <option value="">Select</option>
                            {AllTeams.map((team) => (
                              <option key={team._id} value={team._id}>
                                {team.firstName} {team.lastName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="mdi mdi-currency-gbp"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Price</h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-2">
                          <Form.Label htmlFor="unit_price">
                            Unit Price
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="unit_price"
                            name="unit_price"
                            placeholder="00.00"
                            // value={contract.unit_price}
                            onChange={onChangeContract}
                            defaultValue={
                              OneProgram?.programDetails?.unit_price!
                            }
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-2">
                          <Form.Label htmlFor="prices">Total Price</Form.Label>
                          <Form.Control
                            type="text"
                            id="prices"
                            name="prices"
                            placeholder="00.00"
                            // value={contract.prices}
                            onChange={onChangeContract}
                            defaultValue={
                              OneProgram?.programDetails?.total_price!
                            }
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-2">
                          <Form.Label htmlFor="invoiceFrequency">
                            Invoice Frequency
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="invoiceFrequency"
                            id="invoiceFrequency"
                          >
                            <option
                              value={`${OneProgram?.programDetails?.invoiceFrequency}`}
                              selected
                            >
                              {OneProgram?.programDetails?.invoiceFrequency}
                            </option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="mdi mdi-briefcase-outline"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Job Prototype</h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={12}>
                        <Form.Label htmlFor="idProgram">Program</Form.Label>
                        <div className="input-group mb-3">
                          {filteredSchoolsProg.length === 0 &&
                          filteredCompaniesProg.length === 0 ? (
                            <>
                              <button
                                className="btn btn-success btn-label"
                                type="button"
                                id="button-addon2"
                                onClick={handleShowProgram}
                              >
                                <i className="mdi mdi-plus label-icon align-middle fs-18 me-2"></i>
                                New Program
                              </button>
                              <small className="text-danger">
                                This Account Don't have any Program. Please
                                create a New One.{" "}
                              </small>
                            </>
                          ) : filteredSchoolsProg.length !== 0 &&
                            filteredCompaniesProg.length === 0 ? (
                            <>
                              <select
                                className="form-select text-muted"
                                name="idProgram"
                                id="idProgram"
                                onChange={handleSelectProgram}
                              >
                                <option value="">Select</option>
                                {filteredSchoolsProg.map((program) => (
                                  <option
                                    key={program?._id}
                                    value={program?._id}
                                  >
                                    {program?.programName}
                                  </option>
                                ))}
                              </select>
                              <button
                                className="btn btn-success btn-label"
                                type="button"
                                id="button-addon2"
                                onClick={handleShowProgram}
                              >
                                <i className="mdi mdi-plus label-icon align-middle fs-18 me-2"></i>
                                New Program
                              </button>
                            </>
                          ) : filteredCompaniesProg.length === 0 &&
                            filteredSchoolsProg.length === 0 ? (
                            <>
                              <button
                                className="btn btn-success btn-label"
                                type="button"
                                id="button-addon2"
                                onClick={handleShowProgram}
                              >
                                <i className="mdi mdi-plus label-icon align-middle fs-18 me-2"></i>
                                New Program
                              </button>
                              <small className="text-danger">
                                This Account Don't have any Program. Please
                                create a New One.{" "}
                              </small>
                            </>
                          ) : (
                            <>
                              <select
                                className="form-select text-muted"
                                name="idProgram"
                                id="idProgram"
                                onChange={handleSelectProgram}
                              >
                                <option value="">Select</option>
                                {filteredCompaniesProg.map((program) => (
                                  <option
                                    key={program?._id}
                                    value={program?._id}
                                  >
                                    {program?.programName}
                                  </option>
                                ))}
                              </select>
                              <button
                                className="btn btn-success btn-label"
                                type="button"
                                id="button-addon2"
                                onClick={handleShowProgram}
                              >
                                <i className="mdi mdi-plus label-icon align-middle fs-18 me-2"></i>
                                New Program
                              </button>
                            </>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {/* job pattern name  == Done */}
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="customerName-field">
                            Job Pattern Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            placeholder="Enter job pattern name"
                            defaultValue={
                              OneProgram?.programDetails?.programName
                            }
                            readOnly
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="recommanded_capacity">
                            Number of passengers
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="recommanded_capacity"
                            name="recommanded_capacity"
                            placeholder="Number of passengers"
                            defaultValue={
                              OneProgram?.programDetails?.recommanded_capacity
                            }
                            readOnly
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="vehicleType">
                            Vehicle Type
                          </Form.Label>
                          <div>
                            <select
                              className="form-select text-muted"
                              name="vehicleType"
                              id="vehicleType"
                              onChange={handleSelectVehicleType}
                              defaultValue={OneVehicleType?._id!}
                            >
                              <option
                                value={`${OneVehicleType?._id!}`}
                                selected
                              >
                                {OneVehicleType?.type!}
                              </option>
                            </select>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="luggageDetails">
                            Luggage Details
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="luggageDetails"
                            id="luggageDetails"
                            onChange={handleSelectLuggage}
                            defaultValue={OneLuggageDetails?._id!}
                          >
                            <option
                              value={`${OneLuggageDetails?._id!}`}
                              selected
                            >
                              {OneLuggageDetails?.description!}
                            </option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-4">
                          <Form.Label htmlFor="journeyType">
                            Journey Type
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="journeyType"
                            id="journeyType"
                            onChange={handleSelectJourney}
                            defaultValue={OneJourney?._id!}
                          >
                            <option value={`${OneJourney?._id!}`} selected>
                              {OneJourney?.type!}
                            </option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Row className="mt-3">
                  <Col lg={11} className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <span>
                        <i className="ri-add-line align-middle"></i> Add
                        Contract
                      </span>
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          {show && (
            // <Modal
            //   className="fade modal-dialog modal-fullscreen"
            //   id="createModal"
            //   show={show}
            //   onHide={() => {
            //     handleShowProgram();
            //   }}
            //   centered
            // >
            // <div className="fade modal-dialog modal-fullscreen">
            <AddContractProgramm />
            // </div>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddNewContract;
