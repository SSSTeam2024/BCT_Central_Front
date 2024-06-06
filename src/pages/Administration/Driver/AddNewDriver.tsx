import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import SimpleBar from "simplebar-react";
import Swal from "sweetalert2";
import { Document, Page } from 'react-pdf';
// Import Contry Data
import countryData from "Common/country";
import { useAddNewDriverMutation } from "features/Driver/driverSlice";

const AddNewDriver = () => {
  document.title = "Create Driver | Bouden Coach Travel";

  const navigate = useNavigate();
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Driver is created successfully",
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

  // Date of birth
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDate(selectedDates[0]);
  };

  // Driving License Expiry Date
  const [selectedDateDrivingLicense, setSelectedDateDrivingLicense] =
    useState<Date | null>(null);
  const handleDateChangeDrivingLicense = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDateDrivingLicense(selectedDates[0]);
  };
  // DQC Expiry Date
  const [selectedDateDQC, setSelectedDateDQC] = useState<Date | null>(null);
  const handleDateChangeDQC = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDateDQC(selectedDates[0]);
  };
  // DBS Issue Date
  const [selectedDateDBSIssue, setSelectedDateDBSIssue] = useState<Date | null>(
    null
  );
  const handleDateChangeDBSIssue = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDateDBSIssue(selectedDates[0]);
  };
  // DBS Badge Date
  const [selectedDateDBSBadge, setSelectedDateDBSBadge] = useState<Date | null>(
    null
  );
  const handleDateChangeDBSBadge = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDateDBSBadge(selectedDates[0]);
  };
  // PVC Expiry
  const [selectedDatePVC, setSelectedDatePVC] = useState<Date | null>(null);
  const handleDateChangePVC = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDatePVC(selectedDates[0]);
  };

  // Join DAte
  const [selectedJoinDate, setSelectedJoinDate] = useState<Date | null>(null);
  const handleDateChangeJoinDate = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedJoinDate(selectedDates[0]);
  };


  // Country Change States
  const [seletedCountry1, setseletedCountry1] = useState<any>({});

  function convertToBase64(
    file: File
  ): Promise<{ base64Data: string; extension: string }> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const [, base64Data] = base64String.split(","); // Extract only the Base64 data
        const extension = file.name.split(".").pop() ?? ""; // Get the file extension
        resolve({ base64Data, extension });
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  }

  const [selectDriverStatus, setSelectedDriverStatus] = useState<string>("");
  // This function is triggered when the select Ownership
  const handleSelectDriverStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedDriverStatus(value);
  };

  const [createDriver] = useAddNewDriverMutation();

  const initialDriver = {
    username: "",
    password: "",
    email: "",
    profile_image_base64_string: "",
    profile_image_extension: "",
    profile_image: "",
    firstname: "",
    surname: "",
    birthdate: "",
    joindate: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",
    language: "",
    nationality: "",
    phonenumber: "",
    emergency_contact: "",
    bank_name: "",
    account_name: "",
    account_number: "",
    sort_code: "",
    driver_license_base64_string: "",
    driver_license_extension: "",
    driving_license_expiry: "",
    dqc_base64_string: "",
    dqc_extension: "",
    dqc_expiry: "",
    dbscheck_base64_string: "",
    dbscheck_extension: "",
    dbs_issue_date: "",
    dbs_badge_date: "",
    pvc_expiry: "",
    contract_base64_string: "",
    contract_extension: "",
    deposti_held: "",
    notes: "",
    driver_license: "",
    dqc: "",
    contract: "",
    dbscheck: "",
    driverStatus: ""
  };

  const [driver, setDriver] = useState(initialDriver);

  const {
    username,
    password,
    email,
    profile_image_base64_string,
    profile_image_extension,
    firstname,
    surname,
    birthdate,
    joindate,
    address,
    city,
    state,
    country,
    postalcode,
    language,
    nationality,
    phonenumber,
    emergency_contact,
    bank_name,
    account_name,
    account_number,
    sort_code,
    driver_license_base64_string,
    driver_license_extension,
    driving_license_expiry,
    dqc_base64_string,
    dqc_extension,
    dqc_expiry,
    dbscheck_base64_string,
    dbscheck_extension,
    dbs_issue_date,
    dbs_badge_date,
    pvc_expiry,
    contract_base64_string,
    contract_extension,
    deposti_held,
    notes,
    driver_license,
    dqc,
    dbscheck,
    contract,
    driverStatus
  } = driver;

  const onChangeDriver = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriver((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // Avatar
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("profile_image_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setDriver({
        ...driver,
        profile_image: profileImage,
        profile_image_base64_string: base64Data,
        profile_image_extension: extension,
      });
    }
  };

  // Driving License
  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (
      document.getElementById("driver_license_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const driverlicense = base64Data + "." + extension;
      setDriver({
        ...driver,
        driver_license: driverlicense,
        driver_license_base64_string: base64Data,
        driver_license_extension: extension,
      });
    }
  };

  // DQC
  const handleFileDQC = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (
      document.getElementById("dqc_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const DQC = base64Data + "." + extension;
      setDriver({
        ...driver,
        dqc: DQC,
        dqc_base64_string: base64Data,
        dqc_extension: extension,
      });
    }
  };

  // DBS
  const handleFileDBS = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (
      document.getElementById("dbscheck_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const DBS = base64Data + "." + extension;
      setDriver({
        ...driver,
        dbscheck: DBS,
        dbscheck_base64_string: base64Data,
        dbscheck_extension: extension,
      });
    }
  };

  // PVC
  const handleFilePVC = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (
      document.getElementById("contract_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const PVC = base64Data + "." + extension;
      setDriver({
        ...driver,
        contract: PVC,
        contract_base64_string: base64Data,
        contract_extension: extension,
      });
    }
  };

  const onSubmitDriver = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      driver["birthdate"] = selectedDate!.toDateString();
      driver["dbs_badge_date"] = selectedDateDBSBadge!.toDateString();
      driver["dbs_issue_date"] = selectedDateDBSIssue!.toDateString();
      driver["dqc_expiry"] = selectedDateDQC!.toDateString();
      driver["driving_license_expiry"] = selectedDateDrivingLicense!.toDateString();
      driver["pvc_expiry"] = selectedDatePVC!.toDateString();
      driver["nationality"] = seletedCountry1.countryName;
      driver["driverStatus"] = selectDriverStatus;
      driver["joindate"] = selectedJoinDate!.toDateString();
      createDriver(driver)
        .then(() => setDriver(initialDriver))
        .then(() => notifySuccess())
        .then(() => navigate("/driver"));
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                          <i className="bx bx-user"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1">Driver Information</h5>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <Form className="tablelist-form" onSubmit={onSubmitDriver}>
                      <Row>
                        <Row>
                          <div className="text-center mb-3">
                            <div className="position-relative d-inline-block">
                              <div className="position-absolute top-50 start-50 translate-middle">
                                <label
                                  htmlFor="profile_image_base64_string"
                                  className="mb-0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  title="Select company logo"
                                // style={{width: "0px"}}
                                >
                                  <span className="avatar-xs d-inline-block">
                                    <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                      <i className="ri-image-fill"></i>
                                    </span>
                                  </span>
                                </label>
                                <input
                                  className="form-control d-none"
                                  type="file"
                                  name="profile_image_base64_string"
                                  id="profile_image_base64_string"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e)}
                                  style={{ width: "210px", height: "120px" }}
                                />
                              </div>
                              <div className="avatar-lg">
                                <div className="avatar-title bg-light rounded-3">
                                  <img
                                    src={`data:image/jpeg;base64, ${driver.profile_image_base64_string}`}
                                    alt={driver.username}
                                    id="profile_image_base64_string"
                                    className="avatar-xl h-auto rounded-3 object-fit-cover"
                                    style={{ width: "210px", height: "120px", zIndex: 5000 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Row>
                        <Row>
                          {/* First Name  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="firstname">
                                First Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="firstname"
                                placeholder="Enter first name"
                                onChange={onChangeDriver}
                                value={driver.firstname}
                              />
                            </div>
                          </Col>
                          {/* Last Name == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="surname">
                                Last Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="surname"
                                placeholder="Enter last name"
                                onChange={onChangeDriver}
                                value={driver.surname}
                              />
                            </div>
                          </Col>
                          {/* Birth_Date  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="birthdate">
                                Birth Date
                              </Form.Label>
                              <Flatpickr
                                value={selectedDate!}
                                onChange={handleDateChange}
                                className="form-control flatpickr-input"
                                placeholder="Select Date"
                                options={{
                                  dateFormat: "d M, Y",
                                }}
                                id="birthdate"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Email  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="email">Email</Form.Label>
                              <Form.Control
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                onChange={onChangeDriver}
                                value={driver.email}
                              />
                            </div>
                          </Col>
                          {/* Phone  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="phonenumber">
                                Phone
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="phonenumber"
                                placeholder="Enter phone"
                                onChange={onChangeDriver}
                                value={driver.phonenumber}
                              />
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="emergency_contact">
                                Emergency Contact
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="emergency_contact"
                                placeholder="Enter emergency contact"
                                onChange={onChangeDriver}
                                value={driver.emergency_contact}
                              />
                            </div>
                          </Col>
                          {/*  Nationaity == Not Yet */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="nationality">
                                Nationality
                              </Form.Label>
                              <Dropdown>
                                <Dropdown.Toggle
                                  as="input"
                                  style={{
                                    backgroundImage: `url(${seletedCountry1.flagImg &&
                                      seletedCountry1.flagImg
                                      })`,
                                  }}
                                  className="form-control rounded-end flag-input form-select"
                                  placeholder="Select country"
                                  readOnly
                                  defaultValue={seletedCountry1.countryName}
                                ></Dropdown.Toggle>
                                <Dropdown.Menu
                                  as="ul"
                                  className="list-unstyled w-100 dropdown-menu-list mb-0"
                                >
                                  <SimpleBar
                                    style={{ maxHeight: "220px" }}
                                    className="px-3"
                                  >
                                    {(countryData || []).map(
                                      (item: any, key: number) => (
                                        <Dropdown.Item
                                          as="li"
                                          onClick={() =>
                                            setseletedCountry1(item)
                                          }
                                          key={key}
                                          className="dropdown-item d-flex"
                                        >
                                          <div className="flex-shrink-0 me-2">
                                            <Image
                                              src={item.flagImg}
                                              alt="country flag"
                                              className="options-flagimg"
                                              height="20"
                                            />
                                          </div>
                                          <div className="flex-grow-1">
                                            <div className="d-flex">
                                              <div className="country-name me-1">
                                                {item.countryName}
                                              </div>
                                              <span className="countrylist-codeno text-muted">
                                                {item.countryCode}
                                              </span>
                                            </div>
                                          </div>
                                        </Dropdown.Item>
                                      )
                                    )}
                                  </SimpleBar>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Address  == Done */}
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="address">Address</Form.Label>
                              <Form.Control
                                type="text"
                                id="address"
                                placeholder="Enter address"
                                onChange={onChangeDriver}
                                value={driver.address}
                              />
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="city">City</Form.Label>
                              <Form.Control
                                type="text"
                                id="city"
                                placeholder="Enter City"
                                onChange={onChangeDriver}
                                value={driver.city}
                              />
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="state">State</Form.Label>
                              <Form.Control
                                type="text"
                                id="state"
                                placeholder="Enter State"
                                onChange={onChangeDriver}
                                value={driver.state}
                              />
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="country">Country</Form.Label>
                              <Form.Control
                                type="text"
                                id="country"
                                placeholder="Enter Country"
                                onChange={onChangeDriver}
                                value={driver.country}
                              />
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="postalcode">
                                Postal Code
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="postalcode"
                                placeholder="Enter Postal Code"
                                onChange={onChangeDriver}
                                value={driver.postalcode}
                              />
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="language">
                                Language
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="language"
                                placeholder="Enter Language"
                                onChange={onChangeDriver}
                                value={driver.language}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="bx bx-id-card"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">
                                  Bank Informations{" "}
                                </h5>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="bank_name"
                                    className="form-label"
                                  >
                                    Bank Name
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="bank_name"
                                    placeholder="Enter Bank Name"
                                    name="bank_name"
                                    onChange={onChangeDriver}
                                    value={driver.bank_name}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="account_name"
                                    className="form-label"
                                  >
                                    Account Name
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="account_name"
                                    placeholder="Enter Account Name"
                                    name="account_name"
                                    onChange={onChangeDriver}
                                    value={driver.account_name}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="account_number"
                                    className="form-label"
                                  >
                                    Account Number
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="account_number"
                                    placeholder="Enter Account Number"
                                    name="account_number"
                                    onChange={onChangeDriver}
                                    value={driver.account_number}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="sort_code"
                                    className="form-label"
                                  >
                                    Sort Code
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="sort_code"
                                    placeholder="Enter Sort Code"
                                    name="sort_code"
                                    onChange={onChangeDriver}
                                    value={driver.sort_code}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="bx bx-id-card"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">Driving License </h5>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="driving_license_expiry">
                                    Driving License Expiry Date
                                  </Form.Label>
                                  <Flatpickr
                                    value={selectedDateDrivingLicense!}
                                    onChange={handleDateChangeDrivingLicense}
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    id="driving_license_expiry"
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="driver_license_base64_string"
                                    className="form-label"
                                  >
                                    File
                                  </label>
                                  <Form.Control
                                    name="driver_license_base64_string"
                                     onChange={handleFile}
                                    type="file"
                                    id="driver_license_base64_string"
                                    accept=".pdf"
                                    placeholder="Choose File"
                                    className="text-muted"
                                  />
                                  {/* <Document file={driver.driver_license}>
                                    <Page pageNumber={1} />
                                  </Document> */}
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="bx bx-id-card"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">DQC </h5>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="dqc_expiry">
                                    DQC Expiry Date
                                  </Form.Label>
                                  <Flatpickr
                                    value={selectedDateDQC!}
                                    onChange={handleDateChangeDQC}
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    id="dqc_expiry"
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="dqc_base64_string"
                                    className="form-label"
                                  >
                                    File
                                  </label>
                                  <Form.Control
                                    name="dqc_base64_string"
                                     onChange={handleFileDQC}
                                    type="file"
                                    id="dqc_base64_string"
                                    accept=".pdf"
                                    placeholder="Choose File"
                                    className="text-muted"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="bx bx-id-card"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">DBS </h5>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="dbs_issue_date">
                                    DBS Issue Date
                                  </Form.Label>
                                  <Flatpickr
                                    value={selectedDateDBSIssue!}
                                    onChange={handleDateChangeDBSIssue}
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    id="dbs_issue_date"
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="dbs_badge_date">
                                    DBS Badge Date
                                  </Form.Label>
                                  <Flatpickr
                                    value={selectedDateDBSBadge!}
                                    onChange={handleDateChangeDBSBadge}
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    id="dbs_badge_date"
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="dbscheck_base64_string"
                                    className="form-label"
                                  >
                                    File
                                  </label>
                                   <Form.Control
                                    name="dbscheck_base64_string"
                                     onChange={handleFileDBS}
                                    type="file"
                                    id="dbscheck_base64_string"
                                    accept=".pdf"
                                    placeholder="Choose File"
                                    className="text-muted"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="bx bx-id-card"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">PVC</h5>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="pvc_expiry">
                                    PVC Expiry
                                  </Form.Label>
                                  <Flatpickr
                                    value={selectedDatePVC!}
                                    onChange={handleDateChangePVC}
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    id="pvc_expiry"
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="contract_base64_string"
                                    className="form-label"
                                  >
                                    PVC File
                                  </label>
                                  <Form.Control
                                    name="contract_base64_string"
                                     onChange={handleFilePVC}
                                    type="file"
                                    id="contract_base64_string"
                                    accept=".pdf"
                                    placeholder="Choose File"
                                    className="text-muted"
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="deposti_held">
                                    Deposit Held
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    id="deposti_held"
                                    placeholder="Enter Deposti Held"
                                    name="deposti_held"
                                    onChange={onChangeDriver}
                                    value={driver.deposti_held}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="notes">Notes</Form.Label>
                                  <Form.Control
                                    type="text"
                                    id="notes"
                                    placeholder="Enter notes"
                                    name="notes"
                                    onChange={onChangeDriver}
                                    value={driver.notes}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="bx bx-id-card"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">Account</h5>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="driverStatus">Status</Form.Label>
                                  <select
                                    className="form-select text-muted"
                                    name="driverStatus"
                                    id="driverStatus"
                                    onChange={handleSelectDriverStatus}
                                  >
                                    <option value="">Status</option>
                                    <option value="Active">
                                      Active
                                    </option>
                                    <option value="Inactive">
                                      Inactive
                                    </option>
                                    <option value="onVacation">
                                      On Vacation
                                    </option>
                                    <option value="onRoad">
                                      On Road
                                    </option>
                                  </select>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="joindate">
                                    Joining Date
                                  </Form.Label>
                                  <Flatpickr
                                    value={selectedJoinDate!}
                                    onChange={handleDateChangeJoinDate}
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    id="joindate"
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="username">Username</Form.Label>
                                  <Form.Control
                                    type="text"
                                    id="username"
                                    placeholder="Enter username"
                                    name="username"
                                    onChange={onChangeDriver}
                                    value={driver.username}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="password">Password</Form.Label>
                                  <Form.Control
                                    type="password"
                                    id="password"
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={onChangeDriver}
                                    value={driver.password}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            <Button
                              type="submit"
                              variant="primary"
                              id="add-btn"
                            >
                              Add Driver
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddNewDriver;
