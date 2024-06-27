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
import Flatpickr from "react-flatpickr";
import SimpleBar from "simplebar-react";
// Import Contry Data
import country from "Common/country";
import Swal from "sweetalert2";
import { useAddNewTeamMutation } from "features/Team/teamSlice";
import { useNavigate } from "react-router-dom";

function convertToBase64(
  file: File
): Promise<{ base64Data: string; extension: string }> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      // const base64Data = base64String.split(",")[1]; // Extract only the Base64 data
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

const AddNewTeam = () => {
  document.title = "Create Team | Bouden Coach Travel";
  const navigate = useNavigate();
  const [seletedCountry1, setseletedCountry1] = useState<any>({});

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Team Member is created successfully",
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
  // DateOfBirth
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState<Date | null>(
    null
  );
  const handleDateChangeOfBirth = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDateOfBirth(selectedDates[0]);
  };

  // LegalCard
  const [selectedLegalCard, setSelectedLegalCard] = useState<Date | null>(null);
  const handleDateChangeLegalCard = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedLegalCard(selectedDates[0]);
  };

  // ServiceDate
  const [selectedDateOfService, setSelectedDateOfService] =
    useState<Date | null>(null);
  const handleDateChangeOfService = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDateOfService(selectedDates[0]);
  };

  const [selectedGender, setSelectedGender] = useState<string>("");
  // This function is triggered when the select gender
  const handleSelectGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGender(value);
  };

  const [selectedCivilStatus, setSelectedCivilStatus] = useState<string>("");
  // This function is triggered when the select CivilStatus
  const handleSelectCivilStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedCivilStatus(value);
  };

  const [selectedStatus, setSelectedStatus] = useState<string>("");
  // This function is triggered when the select Status
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>("");
  // This function is triggered when the select AccessLevel
  const handleSelectAccessLevel = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedAccessLevel(value);
  };

  const [selectedContractType, setSelectedContractType] = useState<string>("");
  // This function is triggered when the select ContractType
  const handleSelectContractType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedContractType(value);
  };

  const [createTeam] = useAddNewTeamMutation();

  const initialTeam = {
    firstName: "",
    lastName: "",
    birth_date: "",
    nationality: "",
    gender: "",
    login: "",
    address: "",
    password: "",
    marital_status: "",
    number_of_childs: "",
    legal_card: "",
    id_card_date: "",
    email: "",
    phone: "",
    service_date: "",
    statusTeam: "",
    id_file: "",
    access_level: "",
    sort_code: "",
    account_name: "",
    account_number: "",
    bank_name: "",
    contract_type: "",
    salary: "",
    IdFileBase64String: "",
    IdFileExtension: "",
    avatar: "",
    avatarExtension: "",
    avatarBase64String: "",
  };

  const [team, setTeam] = useState(initialTeam);

  const {
    firstName,
    lastName,
    birth_date,
    nationality,
    gender,
    login,
    address,
    password,
    marital_status,
    number_of_childs,
    legal_card,
    id_card_date,
    email,
    phone,
    service_date,
    statusTeam,
    id_file,
    access_level,
    contract_type,
    sort_code,
    account_name,
    account_number,
    bank_name,
    salary,
    IdFileBase64String,
    IdFileExtension,
    avatar,
    avatarExtension,
    avatarBase64String,
  } = team;

  const onChangeTeam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // Legal Card
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("IdFileBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const leagalCard = base64Data + "." + extension;
      setTeam({
        ...team,
        id_file: leagalCard,
        IdFileBase64String: base64Data,
        IdFileExtension: extension,
      });
    }
  };

  // Avatar
  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("avatarBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const leagalCard = base64Data + "." + extension;
      setTeam({
        ...team,
        avatar: leagalCard,
        avatarBase64String: base64Data,
        avatarExtension: extension,
      });
    }
  };

  const onSubmitTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      team["birth_date"] = selectedDateOfBirth?.toDateString()!;
      team["nationality"] = seletedCountry1?.countryName!;
      team["gender"] = selectedGender;
      team["marital_status"] = selectedCivilStatus;
      team["id_card_date"] = selectedLegalCard?.toDateString()!;
      team["service_date"] = selectedDateOfService?.toDateString()!;
      team["statusTeam"] = selectedStatus;
      team["access_level"] = selectedAccessLevel;
      team["contract_type"] = selectedContractType;
      createTeam(team)
        .then(() => notifySuccess())
        .then(() => navigate("/team"));
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumb title="Create Vehicle" pageTitle="Vehicles" /> */}
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                          <i className="ri-group-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1">
                        Member of Staff Information
                      </h5>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <Form className="tablelist-form" onSubmit={onSubmitTeam}>
                      <Row>
                        <div className="text-center mb-3">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute top-50 start-50 translate-middle">
                              <label
                                htmlFor="avatarBase64String"
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
                                name="avatarBase64String"
                                id="avatarBase64String"
                                accept="image/*"
                                onChange={(e) => handleAvatarUpload(e)}
                                style={{ width: "210px", height: "120px" }}
                              />
                            </div>
                            <div className="avatar-lg">
                              <div className="avatar-title bg-light rounded-3">
                                <img
                                  src={`data:image/jpeg;base64, ${team.avatarBase64String}`}
                                  alt={team.firstName}
                                  id="avatarBase64String"
                                  className="avatar-xl h-auto rounded-3 object-fit-cover"
                                  style={{
                                    width: "210px",
                                    height: "120px",
                                    zIndex: 5000,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Row>
                      <Row>
                        <Row>
                          {/* First Name  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="firstName">
                                First Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter first name"
                                onChange={onChangeTeam}
                                value={team.firstName}
                              />
                            </div>
                          </Col>
                          {/* Last Name == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="lastName">
                                Last Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter last name"
                                onChange={onChangeTeam}
                                value={team.lastName}
                              />
                            </div>
                          </Col>
                          {/* Birth_Date  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="dateBirth">
                                Birth Date
                              </Form.Label>
                              <Flatpickr
                                className="form-control flatpickr-input"
                                placeholder="Select Date"
                                options={{
                                  dateFormat: "d M, Y",
                                }}
                                id="dateBirth"
                                name="dateBirth"
                                onChange={handleDateChangeOfBirth}
                              />
                            </div>
                          </Col>
                          {/* Address  == Done */}
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="address">Address</Form.Label>
                              <Form.Control
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Enter address"
                                onChange={onChangeTeam}
                                value={team.address}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Email  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="email">Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter email"
                                onChange={onChangeTeam}
                                value={team.email}
                              />
                            </div>
                          </Col>
                          {/* Phone  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="phone">Phone</Form.Label>
                              <Form.Control
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Enter phone"
                                onChange={onChangeTeam}
                                value={team.phone}
                              />
                            </div>
                          </Col>
                          {/*  Nationaity == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="nationality">
                                Nationality
                              </Form.Label>
                              <Dropdown>
                                <Dropdown.Toggle
                                  as="input"
                                  style={{
                                    backgroundImage: `url(${
                                      seletedCountry1.flagImg &&
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
                                    {(country || []).map(
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
                          {/* Gender  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <label htmlFor="gender" className="form-label">
                                Gender
                              </label>
                              <select
                                className="form-select text-muted"
                                name="gender"
                                id="gender"
                                onChange={handleSelectGender}
                              >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </Col>
                          {/* Civil_Status  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="marital_status">
                                Civil Status
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="marital_status"
                                id="marital_status"
                                onChange={handleSelectCivilStatus}
                              >
                                <option value="">Status</option>
                                <option value="Married">Married</option>
                                <option value="Single">Single</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                              </select>
                            </div>
                          </Col>
                          {/* Number of childs  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <label
                                htmlFor="number_of_childs"
                                className="form-label"
                              >
                                Number of childs
                              </label>
                              <Form.Control
                                type="text"
                                name="number_of_childs"
                                id="number_of_childs"
                                placeholder="Enter number of childs"
                                onChange={onChangeTeam}
                                value={team.number_of_childs}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ri-profile-line"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">Legal Card</h5>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="legal_card"
                                    className="form-label"
                                  >
                                    Number
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="legal_card"
                                    name="legal_card"
                                    placeholder="Enter number"
                                    onChange={onChangeTeam}
                                    value={team.legal_card}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="legal_card_date">
                                    Date
                                  </Form.Label>
                                  <Flatpickr
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    id="legal_card_date"
                                    name="legal_card_date"
                                    onChange={handleDateChangeLegalCard}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="IdFileBase64String"
                                    className="form-label"
                                  >
                                    File
                                  </label>
                                  <Form.Control
                                    type="file"
                                    id="IdFileBase64String"
                                    name="IdFileBase64String"
                                    placeholder="Enter number"
                                    className="text-muted"
                                    onChange={handleFileUpload}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ri-profile-line"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">Payment</h5>
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
                                    name="bank_name"
                                    placeholder="Enter bank name"
                                    onChange={onChangeTeam}
                                    value={team.bank_name}
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
                                    name="account_number"
                                    placeholder="Enter account_number"
                                    onChange={onChangeTeam}
                                    value={team.account_number}
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
                                    name="account_name"
                                    placeholder="Enter account_name"
                                    onChange={onChangeTeam}
                                    value={team.account_name}
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
                                    type="password"
                                    id="sort_code"
                                    name="sort_code"
                                    placeholder="Enter sort_code"
                                    onChange={onChangeTeam}
                                    value={team.sort_code}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ri-briefcase-line"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">Work</h5>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col lg={2}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="service_date">
                                    Service Date
                                  </Form.Label>
                                  <Flatpickr
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    id="service_date"
                                    name="service_date"
                                    onChange={handleDateChangeOfService}
                                  />
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="statusTeam"
                                    className="form-label"
                                  >
                                    Status
                                  </label>
                                  <select
                                    className="form-select text-muted"
                                    name="statusTeam"
                                    id="statusTeam"
                                    onChange={handleSelectStatus}
                                  >
                                    <option value="">Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Annual vacation">
                                      Annual vacation
                                    </option>
                                    <option value="Exceptional vacation">
                                      Exceptional vacation
                                    </option>
                                  </select>
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="access_level"
                                    className="form-label"
                                  >
                                    Access Level
                                  </label>
                                  <select
                                    className="form-select text-muted"
                                    name="access_level"
                                    id="access_level"
                                    onChange={handleSelectAccessLevel}
                                  >
                                    <option value="">Access</option>
                                    <option value="Full">Full</option>
                                    <option value="Visitor Jobs">
                                      Visitor Jobs
                                    </option>
                                    <option value="Corporate Jobs">
                                      Corporate Jobs
                                    </option>
                                  </select>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="contract_type"
                                    className="form-label"
                                  >
                                    Contract Type
                                  </label>
                                  <select
                                    className="form-select text-muted"
                                    name="contract_type"
                                    id="contract_type"
                                    onChange={handleSelectContractType}
                                  >
                                    <option value="">Contract</option>
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                                    <option value="Part Time">Part Time</option>
                                  </select>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="salary"
                                    className="form-label"
                                  >
                                    Salary
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    placeholder="Enter salary"
                                    onChange={onChangeTeam}
                                    value={team.salary}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ri-profile-line"></i>
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
                                  <label htmlFor="login" className="form-label">
                                    Login
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="login"
                                    name="login"
                                    placeholder="Enter number"
                                    onChange={onChangeTeam}
                                    value={team.login}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="password"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <Form.Control
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter number"
                                    onChange={onChangeTeam}
                                    value={team.password}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            <Button
                              variant="primary"
                              id="add-btn"
                              type="submit"
                            >
                              Add Team
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

export default AddNewTeam;
