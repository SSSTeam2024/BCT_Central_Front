import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Modal,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Swal from "sweetalert2";
import { Team, useUpdateTeamMutation } from "features/Team/teamSlice";
import Flatpickr from "react-flatpickr";
import SimpleBar from "simplebar-react";
import country from "Common/country";

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

const EditTeam = () => {
  document.title = "Edit Team Member | Coach Hire Network";
  const LocationTeam = useLocation();
  if (pdfjs.GlobalWorkerOptions) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }

  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }

  const navigate = useNavigate();

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Team Member Account Updated successfully",
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
  const [numPages, setNumPages] = useState<number | null>(null);
  const [showGender, setShowGender] = useState<boolean>(false);
  const [showCivilStatus, setShowCivilStatus] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [showAccessLevel, setShowAccessLevel] = useState<boolean>(false);
  const [showContractType, setShowContractType] = useState<boolean>(false);
  const [showJoiningDate, setShowJoiningDate] = useState<boolean>(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState<Date | null>(null);
  const [selectedLegalCardDate, setSelectedLegalCardDate] =
    useState<Date | null>(null);

  const [selectedJoiningDate, setSelectedJoiningDate] = useState<Date | null>(
    null
  );

  const [first_name, setFirstName] = useState<string>(
    LocationTeam?.state?.firstName ?? ""
  );
  const [last_name, setLastName] = useState<string>(
    LocationTeam?.state?.lastName ?? ""
  );
  const [adr, setAdr] = useState<string>(LocationTeam?.state?.address ?? "");
  const [mail, setMail] = useState<string>(LocationTeam?.state?.email ?? "");
  const [phoneNum, setPhoneNum] = useState<string>(
    LocationTeam?.state?.phone ?? ""
  );
  const [legalCardNum, setLegalCardNum] = useState<string>(
    LocationTeam?.state?.legal_card ?? ""
  );
  const [childNum, setChildNum] = useState<string>(
    LocationTeam?.state?.number_of_childs ?? ""
  );
  const [teamSalary, setTeamSalary] = useState<string>(
    LocationTeam?.state?.salary ?? ""
  );
  const [loginSchool, setLoginSchool] = useState<string>(
    LocationTeam?.state?.login ?? ""
  );
  const [bankAccountName, setBankAccountName] = useState<string>(
    LocationTeam?.state?.account_name ?? ""
  );
  const [accountNumber, setAccountNumber] = useState<string>(
    LocationTeam?.state?.account_number ?? ""
  );
  const [bankName, setBankName] = useState<string>(
    LocationTeam?.state?.bank_name ?? ""
  );
  const [sortCode, setSortCode] = useState<string>(
    LocationTeam?.state?.sort_code ?? ""
  );
  const [selectGender, setSelectedGender] = useState<string>("");
  const [selectCivilStatus, setSelectedCivilStatus] = useState<string>("");
  const [showNationality, setShowNationality] = useState<boolean>(false);
  const [showDateLegalCard, setShowDateLegalCard] = useState<boolean>(false);
  const [selectAccessLevel, setSelectedAccessLevel] = useState<string>("");
  const [selectContractType, setSelectedContractType] = useState<string>("");
  const [selectStatus, setSelectedStatus] = useState<string>("");
  const [modal_LegalCard, setmodal_LegalCard] = useState<boolean>(false);
  const [seletedCountry1, setseletedCountry1] = useState<any>({});

  function tog_LegalCard() {
    setmodal_LegalCard(!modal_LegalCard);
  }

  // This function is triggered when the select Gender
  const handleSelectContractType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedContractType(value);
  };

  // This function is triggered when the select Gender
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  // This function is triggered when the select Gender
  const handleSelectGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGender(value);
  };

  // This function is triggered when the select Gender
  const handleSelectAccessLevel = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedAccessLevel(value);
  };

  // This function is triggered when the select Civil Status
  const handleSelectCivilStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedCivilStatus(value);
  };

  const handleLoginSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginSchool(e.target.value);
  };

  const handleSortCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortCode(e.target.value);
  };

  const handleTeamSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamSalary(e.target.value);
  };

  const handleNumberOfChild = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildNum(e.target.value);
  };

  const handleBankName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankName(e.target.value);
  };

  const handleBankAccountName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankAccountName(e.target.value);
  };

  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

  const handleLegalCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLegalCardNum(e.target.value);
  };

  const handleAdr = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAdr(e.target.value);
  };

  const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handlePhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNum(e.target.value);
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleBirthDateChange = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedBirthDate(selectedDates[0]);
  };

  const handleLegalCardDateChange = (selectedDates: Date[]) => {
    setSelectedLegalCardDate(selectedDates[0]);
  };

  const handleServiceDateChange = (selectedDates: Date[]) => {
    setSelectedJoiningDate(selectedDates[0]);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const [updateTeamProfileMutation] = useUpdateTeamMutation();

  const initialTeamAccount = {
    _id: "",
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
    bank_name: "",
    account_number: "",
    account_name: "",
    sort_code: "",
    contract_type: "",
    salary: "",
    IdFileBase64String: "",
    IdFileExtension: "",
    avatar: "",
    avatarBase64String: "",
    avatarExtension: "",
  };

  const [updateCompanyProfile, setUpdateCompanyProfile] =
    useState<Team>(initialTeamAccount);

  // Avatar
  const handleFileUploadavatar = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("avatarBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateCompanyProfile({
        ...updateCompanyProfile,
        avatar: profileImage,
        avatarBase64String: base64Data,
        avatarExtension: extension,
      });
    }
  };

  // Legal File
  const handleFileUploadLegalFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("IdFileBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateCompanyProfile({
        ...updateCompanyProfile,
        id_file: profileImage,
        IdFileBase64String: base64Data,
        IdFileExtension: extension,
      });
    }
  };

  const {
    _id,
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
    bank_name,
    account_number,
    account_name,
    sort_code,
    contract_type,
    salary,
    IdFileBase64String,
    IdFileExtension,
    avatar,
    avatarBase64String,
    avatarExtension,
  } = updateCompanyProfile as Team;

  const onSubmitUpdateTeamProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      updateCompanyProfile["_id"] = LocationTeam?.state?._id!;
      if (first_name === "") {
        updateCompanyProfile["firstName"] = LocationTeam?.state?.firstName!;
      } else {
        updateCompanyProfile["firstName"] = first_name;
      }
      if (last_name === "") {
        updateCompanyProfile["lastName"] = LocationTeam?.state?.lastName!;
      } else {
        updateCompanyProfile["lastName"] = last_name;
      }
      if (adr === "") {
        updateCompanyProfile["address"] = LocationTeam?.state?.address!;
      } else {
        updateCompanyProfile["address"] = adr;
      }
      if (mail === "") {
        updateCompanyProfile["email"] = LocationTeam?.state?.email!;
      } else {
        updateCompanyProfile["email"] = mail;
      }
      if (selectedBirthDate === null) {
        updateCompanyProfile["birth_date"] = LocationTeam?.state?.birth_date!;
      } else {
        updateCompanyProfile["birth_date"] = selectedBirthDate?.toDateString()!;
      }
      if (phoneNum === "") {
        updateCompanyProfile["phone"] = LocationTeam?.state?.phone!;
      } else {
        updateCompanyProfile["phone"] = phoneNum;
      }
      if (loginSchool === "") {
        updateCompanyProfile["login"] = LocationTeam?.state?.login!;
      } else {
        updateCompanyProfile["login"] = loginSchool;
      }
      if (childNum === "") {
        updateCompanyProfile["number_of_childs"] =
          LocationTeam?.state?.number_of_childs!;
      } else {
        updateCompanyProfile["number_of_childs"] = childNum;
      }
      if (accountNumber === "") {
        updateCompanyProfile["account_number"] =
          LocationTeam?.state?.account_number!;
      } else {
        updateCompanyProfile["account_number"] = accountNumber;
      }

      if (sortCode === "") {
        updateCompanyProfile["sort_code"] = LocationTeam?.state?.sort_code!;
      } else {
        updateCompanyProfile["sort_code"] = sortCode;
      }

      if (legalCardNum === "") {
        updateCompanyProfile["legal_card"] = LocationTeam?.state?.legal_card!;
      } else {
        updateCompanyProfile["legal_card"] = legalCardNum;
      }

      if (bankName === "") {
        updateCompanyProfile["bank_name"] = LocationTeam?.state?.bank_name!;
      } else {
        updateCompanyProfile["bank_name"] = bankName;
      }

      if (bankAccountName === "") {
        updateCompanyProfile["account_name"] =
          LocationTeam?.state?.account_name!;
      } else {
        updateCompanyProfile["account_name"] = bankAccountName;
      }

      if (selectGender === "") {
        updateCompanyProfile["gender"] = LocationTeam?.state?.gender!;
      } else {
        updateCompanyProfile["gender"] = selectGender;
      }

      if (selectCivilStatus === "") {
        updateCompanyProfile["marital_status"] =
          LocationTeam?.state?.marital_status!;
      } else {
        updateCompanyProfile["marital_status"] = selectCivilStatus;
      }

      if (seletedCountry1 === null) {
        updateCompanyProfile["nationality"] = LocationTeam?.state?.nationality!;
      } else {
        updateCompanyProfile["nationality"] = seletedCountry1?.countryName!;
      }

      if (selectedLegalCardDate === null) {
        updateCompanyProfile["id_card_date"] =
          LocationTeam?.state?.id_card_date!;
      } else {
        updateCompanyProfile["id_card_date"] =
          selectedLegalCardDate?.toDateString()!;
      }

      if (selectedJoiningDate === null) {
        updateCompanyProfile["service_date"] =
          LocationTeam?.state?.service_date!;
      } else {
        updateCompanyProfile["service_date"] =
          selectedJoiningDate?.toDateString()!;
      }

      if (selectAccessLevel === "") {
        updateCompanyProfile["access_level"] =
          LocationTeam?.state?.access_level!;
      } else {
        updateCompanyProfile["access_level"] = selectAccessLevel;
      }

      if (selectContractType === "") {
        updateCompanyProfile["contract_type"] =
          LocationTeam?.state?.contract_type!;
      } else {
        updateCompanyProfile["contract_type"] = selectContractType;
      }

      if (teamSalary === "") {
        updateCompanyProfile["salary"] = LocationTeam?.state?.salary!;
      } else {
        updateCompanyProfile["salary"] = teamSalary;
      }

      if (selectStatus === "") {
        updateCompanyProfile["statusTeam"] = LocationTeam?.state?.statusTeam!;
      } else {
        updateCompanyProfile["statusTeam"] = selectStatus;
      }

      if (!updateCompanyProfile.avatarBase64String) {
        // If not, keep the existing profile picture
        updateCompanyProfile["avatar"] = LocationTeam?.state?.avatar!;
        // Make sure to retain the existing base64 data and extension
        updateCompanyProfile["avatarBase64String"] =
          LocationTeam?.state?.avatarBase64String!;
        updateCompanyProfile["avatarExtension"] =
          LocationTeam?.state?.avatarExtension!;
      }

      if (!updateCompanyProfile.IdFileBase64String) {
        // If not, keep the existing profile picture
        updateCompanyProfile["id_file"] = LocationTeam?.state?.id_file!;
        // Make sure to retain the existing base64 data and extension
        updateCompanyProfile["IdFileBase64String"] =
          LocationTeam?.state?.IdFileBase64String!;
        updateCompanyProfile["IdFileExtension"] =
          LocationTeam?.state?.IdFileExtension!;
      }

      updateTeamProfileMutation(updateCompanyProfile)
        .then(() => navigate("/team"))
        .then(() => notifySuccess());
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Col xl={12}>
            <Card>
              <Form onSubmit={onSubmitUpdateTeamProfile}>
                <div className="d-flex align-items-center p-2">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">
                      {LocationTeam.state.firstName}{" "}
                      {LocationTeam.state.lastName}
                    </h5>
                  </div>
                </div>
                <hr className="my-2 text-muted" />
                <Card.Body>
                  <Row>
                    <Tab.Container defaultActiveKey="custom-v-pills-home">
                      <Col lg={3}>
                        <Nav
                          variant="pills"
                          className="flex-column nav-pills-tab custom-verti-nav-pills text-center"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <Nav.Link eventKey="custom-v-pills-home">
                            <i className="ri-user-2-line d-block fs-20 mb-1"></i>{" "}
                            Profile
                          </Nav.Link>
                          <Nav.Link eventKey="custom-v-pills-profile">
                            <i className="ri-file-copy-2-line d-block fs-20 mb-1"></i>{" "}
                            Documents
                          </Nav.Link>
                          <Nav.Link eventKey="custom-v-pills-work">
                            <i className="ri-suitcase-line d-block fs-20 mb-1"></i>{" "}
                            Work
                          </Nav.Link>
                          <Nav.Link eventKey="custom-v-pills-messages">
                            <i className="ri-bank-line d-block fs-20 mb-1"></i>{" "}
                            Bank Details
                          </Nav.Link>
                        </Nav>
                      </Col>
                      <Col lg={9}>
                        <Tab.Content className="text-muted mt-3 mt-lg-0">
                          <Tab.Pane eventKey="custom-v-pills-home">
                            <div>
                              <Card.Body>
                                <div className="d-flex justify-content-center">
                                  {updateCompanyProfile.avatar &&
                                  updateCompanyProfile.avatarBase64String ? (
                                    <Image
                                      src={`data:image/jpeg;base64, ${updateCompanyProfile.avatarBase64String}`}
                                      alt=""
                                      className="avatar-xl rounded-circle p-1 bg-body mt-n3"
                                    />
                                  ) : (
                                    <Image
                                      src={`${process.env.REACT_APP_BASE_URL}/teamFiles/avatarImages/${LocationTeam.state.avatar}`}
                                      alt=""
                                      className="avatar-lg rounded-circle p-1 bg-body mt-n3"
                                    />
                                  )}
                                </div>
                                <div
                                  className="d-flex justify-content-center mt-n4"
                                  style={{ marginLeft: "90px" }}
                                >
                                  <label
                                    htmlFor="avatarBase64String"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select team avatar"
                                  >
                                    <span className="avatar-xs d-inline-block">
                                      <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                        <i className="bi bi-pen"></i>
                                      </span>
                                    </span>
                                  </label>
                                  <input
                                    className="form-control d-none"
                                    type="file"
                                    name="avatarBase64String"
                                    id="avatarBase64String"
                                    accept="image/*"
                                    onChange={(e) => handleFileUploadavatar(e)}
                                    style={{ width: "210px", height: "120px" }}
                                  />
                                </div>
                              </Card.Body>
                              <Row className="g-3">
                                <Col sm={6}>
                                  <label
                                    htmlFor="firstName"
                                    className="form-label"
                                  >
                                    First name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={first_name}
                                    onChange={handleFirstName}
                                  />
                                </Col>

                                <Col sm={6}>
                                  <label
                                    htmlFor="lastName"
                                    className="form-label"
                                  >
                                    Last name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={last_name}
                                    onChange={handleLastName}
                                  />
                                </Col>

                                <div className="col-12">
                                  <label
                                    htmlFor="address"
                                    className="form-label"
                                  >
                                    Address
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="address"
                                      value={adr}
                                      onChange={handleAdr}
                                    />
                                  </div>
                                </div>

                                <div className="col-12">
                                  <label htmlFor="email" className="form-label">
                                    Email{" "}
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={mail}
                                    onChange={handleMail}
                                  />
                                </div>
                                <div className="col-12">
                                  <label
                                    htmlFor="dateBirth"
                                    className="form-label"
                                  >
                                    Date of Birth :{" "}
                                    <span className="fs-16">
                                      {LocationTeam.state.birth_date}
                                    </span>
                                    <div
                                      className="d-flex justify-content-start mt-n3"
                                      style={{ marginLeft: "215px" }}
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
                                          onClick={() => setShowDate(!showDate)}
                                        >
                                          <span className="text-success cursor-pointer">
                                            <i className="bi bi-pen fs-14"></i>
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                  </label>
                                  {showDate && (
                                    <Flatpickr
                                      className="form-control flatpickr-input"
                                      placeholder="Select Date"
                                      options={{
                                        dateFormat: "d M, Y",
                                      }}
                                      onChange={handleBirthDateChange}
                                    />
                                  )}
                                </div>
                                <div className="col-12">
                                  <label htmlFor="phone" className="form-label">
                                    Mobile / Phone No.{" "}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    value={phoneNum}
                                    onChange={handlePhoneNum}
                                  />
                                </div>
                                <div className="col-12">
                                  <label
                                    htmlFor="gender"
                                    className="form-label"
                                  >
                                    Gender :{" "}
                                    <span className="text-dark fs-16">
                                      {LocationTeam.state.gender}
                                    </span>
                                    <div
                                      className="d-flex justify-content-start mt-n3"
                                      style={{ marginLeft: "110px" }}
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
                                          onClick={() =>
                                            setShowGender(!showGender)
                                          }
                                        >
                                          <span className="avatar-title bg-white text-success cursor-pointer">
                                            <i className="bi bi-pen fs-14"></i>
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                  </label>
                                  {showGender && (
                                    <select
                                      className="form-select text-muted"
                                      name="choices-single-default"
                                      id="statusSelect"
                                      onChange={handleSelectGender}
                                    >
                                      <option value="">Select</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  )}
                                </div>
                                <div className="col-12">
                                  <label
                                    htmlFor="civil_status"
                                    className="form-label"
                                  >
                                    Civil Status :{" "}
                                    <span className="text-dark fs-16">
                                      {LocationTeam.state.marital_status}
                                    </span>
                                    <div
                                      className="d-flex justify-content-start mt-n3"
                                      style={{ marginLeft: "150px" }}
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
                                          onClick={() =>
                                            setShowCivilStatus(!showCivilStatus)
                                          }
                                        >
                                          <span className="avatar-title bg-white text-success cursor-pointer">
                                            <i className="bi bi-pen fs-14"></i>
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                  </label>
                                  {showCivilStatus && (
                                    <select
                                      className="form-select text-muted"
                                      name="choices-single-default"
                                      id="statusSelect"
                                      onChange={handleSelectCivilStatus}
                                    >
                                      <option value="">Select</option>
                                      <option value="Married">Married</option>
                                      <option value="Single">Single</option>
                                      <option value="Divorced">Divorced</option>
                                      <option value="Widowed">Widowed</option>
                                    </select>
                                  )}
                                </div>
                                <div className="col-12">
                                  <label
                                    htmlFor="number_of_childs"
                                    className="form-label"
                                  >
                                    Number of Child
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="number_of_childs"
                                    value={childNum}
                                    onChange={handleNumberOfChild}
                                  />
                                </div>
                                <div className="col-12">
                                  <label
                                    htmlFor="nationality"
                                    className="form-label"
                                  >
                                    Nationality :{" "}
                                    <span className="text-dark fs-16">
                                      {LocationTeam.state.nationality}
                                    </span>
                                    <div
                                      className="d-flex justify-content-start mt-n3"
                                      style={{ marginLeft: "155px" }}
                                    >
                                      <label
                                        htmlFor="id_file"
                                        className="mb-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Select company logo"
                                      >
                                        <span
                                          className="d-inline-block"
                                          onClick={() =>
                                            setShowNationality(!showNationality)
                                          }
                                        >
                                          <span className="text-success cursor-pointer">
                                            <i className="bi bi-pen fs-14"></i>
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                  </label>
                                  {showNationality && (
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
                                        defaultValue={
                                          seletedCountry1.countryName
                                        }
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
                                  )}
                                </div>
                              </Row>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="custom-v-pills-profile">
                            <div>
                              <h5>Document</h5>
                            </div>

                            <div>
                              <Row className="g-3">
                                <div>
                                  <label
                                    className="form-label"
                                    htmlFor="des-info-description-input"
                                  >
                                    Legal Card Number
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="supplierName-field"
                                    value={legalCardNum}
                                    onChange={handleLegalCardNumber}
                                  />
                                </div>
                                <div>
                                  <label
                                    className="form-label"
                                    htmlFor="des-info-description-input"
                                  >
                                    Legal Card Expiry :{" "}
                                    <span className="text-dark fs-16">
                                      {LocationTeam.state.id_card_date}
                                    </span>
                                    <div
                                      className="d-flex justify-content-start mt-n3"
                                      style={{ marginLeft: "240px" }}
                                    >
                                      <label
                                        htmlFor="id_file"
                                        className="mb-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Select company logo"
                                      >
                                        <span
                                          className="d-inline-block"
                                          onClick={() =>
                                            setShowDateLegalCard(
                                              !showDateLegalCard
                                            )
                                          }
                                        >
                                          <span className="text-success cursor-pointer">
                                            <i className="bi bi-pen fs-14"></i>
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                  </label>
                                  {showDateLegalCard && (
                                    <Flatpickr
                                      className="form-control flatpickr-input"
                                      placeholder="Select Date"
                                      options={{
                                        dateFormat: "d M, Y",
                                      }}
                                      onChange={handleLegalCardDateChange}
                                    />
                                  )}
                                </div>
                                <Row className="mt-2">
                                  <div className="text-center hstack gap-5">
                                    <Button
                                      variant="soft-danger"
                                      className="btn-label"
                                      onClick={() => {
                                        tog_AddShippingModals();
                                      }}
                                    >
                                      <i className="bi bi-filetype-pdf label-icon align-middle fs-24 me-2"></i>
                                      Legal Card
                                    </Button>
                                  </div>
                                  <div
                                    className="d-flex justify-content-start mt-n3"
                                    style={{ marginLeft: "135px" }}
                                  >
                                    <label
                                      htmlFor="IdFileBase64String"
                                      className="mb-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="right"
                                      title="Select team Legal Card"
                                    >
                                      <span className="avatar-xs d-inline-block">
                                        <span className="avatar-title bg-white text-success cursor-pointer">
                                          <i className="bi bi-pen fs-14"></i>
                                        </span>
                                      </span>
                                    </label>
                                    <input
                                      className="form-control d-none"
                                      type="file"
                                      name="IdFileBase64String"
                                      id="IdFileBase64String"
                                      accept=".pdf"
                                      onChange={(e) =>
                                        handleFileUploadLegalFile(e)
                                      }
                                      style={{
                                        width: "210px",
                                        height: "120px",
                                      }}
                                    />
                                  </div>
                                </Row>
                              </Row>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="custom-v-pills-work">
                            <div>
                              <h5>Work</h5>
                            </div>
                            <div>
                              <Row className="gy-3">
                                <Col md={12}>
                                  <label
                                    htmlFor="cc-name"
                                    className="form-label"
                                  >
                                    Login
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="cc-name"
                                    value={loginSchool}
                                    onChange={handleLoginSchool}
                                  />
                                </Col>

                                <Col md={5}>
                                  <label
                                    htmlFor="cc-number"
                                    className="form-label"
                                  >
                                    Joining Date:{" "}
                                    <span className="fs-16">
                                      {LocationTeam.state.service_date}
                                    </span>
                                    <div
                                      className="d-flex justify-content-start mt-n3"
                                      style={{ marginLeft: "215px" }}
                                    >
                                      <label
                                        htmlFor="id_file"
                                        className="mb-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Select Joining Date"
                                      >
                                        <span
                                          className="avatar-xs d-inline-block"
                                          onClick={() =>
                                            setShowJoiningDate(!showJoiningDate)
                                          }
                                        >
                                          <span className="text-success cursor-pointer">
                                            <i className="bi bi-pen fs-14"></i>
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                  </label>
                                  {showJoiningDate && (
                                    <Flatpickr
                                      className="form-control flatpickr-input"
                                      placeholder="Select Date"
                                      options={{
                                        dateFormat: "d M, Y",
                                      }}
                                      onChange={handleServiceDateChange}
                                    />
                                  )}
                                </Col>
                                <Col md={4}>
                                  <Form.Label
                                    htmlFor="cc-expiration"
                                    className="form-label"
                                  >
                                    Access Level :{" "}
                                    <span className="fs-16">
                                      {LocationTeam.state.access_level}
                                    </span>
                                    <div
                                      className="d-flex justify-content-start mt-n2 z-0"
                                      style={{ marginLeft: "125px" }}
                                    >
                                      <label
                                        htmlFor="Activity"
                                        className="mb-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Select Access Level"
                                      >
                                        <span
                                          onClick={() =>
                                            setShowAccessLevel(!showAccessLevel)
                                          }
                                        >
                                          <span className="text-success cursor-pointer">
                                            <i className="bi bi-pen fs-14"></i>
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                  </Form.Label>
                                  {showAccessLevel && (
                                    <select
                                      className="form-select text-muted"
                                      name="choices-single-default"
                                      id="statusSelect"
                                      onChange={handleSelectAccessLevel}
                                    >
                                      <option value="">Select</option>
                                      <option value="Full">Full</option>
                                      <option value="Visitor Jobs">
                                        Visitor Jobs
                                      </option>
                                      <option value="Corporate Jobs">
                                        Corporate Jobs
                                      </option>
                                    </select>
                                  )}
                                </Col>
                                <Col md={3}>
                                  <Form.Label
                                    htmlFor="cc-cvv"
                                    className="form-label"
                                  >
                                    Contract Type:{" "}
                                    <span className="fs-16">
                                      {LocationTeam.state.contract_type}
                                    </span>
                                    <div
                                      className="d-flex justify-content-start mt-n2 z-0"
                                      style={{ marginLeft: "125px" }}
                                    >
                                      <label
                                        htmlFor="Activity"
                                        className="mb-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Select Access Level"
                                      >
                                        <span
                                          onClick={() =>
                                            setShowContractType(
                                              !showContractType
                                            )
                                          }
                                        >
                                          <span className="text-success cursor-pointer">
                                            <i className="bi bi-pen fs-14"></i>
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                  </Form.Label>
                                  {showContractType && (
                                    <select
                                      className="form-select text-muted"
                                      name="choices-single-default"
                                      id="statusSelect"
                                      onChange={handleSelectContractType}
                                    >
                                      <option value="">Select</option>
                                      <option value="CDI">CDI</option>
                                      <option value="CDD">CDD</option>
                                      <option value="Part Time">
                                        Part Time
                                      </option>
                                    </select>
                                  )}
                                </Col>
                              </Row>
                              <Row className="gy-3">
                                <Col md={6}>
                                  <label
                                    htmlFor="cc-name"
                                    className="form-label"
                                  >
                                    Salary
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="cc-name"
                                    value={teamSalary}
                                    onChange={handleTeamSalary}
                                  />
                                </Col>
                                <Col md={3}>
                                  <Form.Label
                                    htmlFor="cc-cvv"
                                    className="form-label"
                                  >
                                    Status:{" "}
                                    <span className="fs-16">
                                      {LocationTeam.state.statusTeam}
                                    </span>
                                    <div
                                      className="d-flex justify-content-start mt-n2 z-0"
                                      style={{ marginLeft: "125px" }}
                                    >
                                      <label
                                        htmlFor="Activity"
                                        className="mb-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Select Access Level"
                                      >
                                        <span
                                          onClick={() =>
                                            setShowStatus(!showStatus)
                                          }
                                        >
                                          <span className="text-success cursor-pointer">
                                            <i className="bi bi-pen fs-14"></i>
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                  </Form.Label>
                                  {showStatus && (
                                    <select
                                      className="form-select text-muted"
                                      name="choices-single-default"
                                      id="statusSelect"
                                      onChange={handleSelectStatus}
                                    >
                                      <option value="">Select</option>
                                      <option value="Active">Active</option>
                                      <option value="Inactive">Inactive</option>
                                      <option value="Annual vacation">
                                        Annual vacation
                                      </option>
                                      <option value="Exceptional vacation">
                                        Exceptional vacation
                                      </option>
                                    </select>
                                  )}
                                </Col>
                              </Row>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="custom-v-pills-messages">
                            <div>
                              <h5>Bank Details</h5>
                            </div>
                            <div>
                              <Row className="gy-3">
                                <div className="mt-2">
                                  <label
                                    className="form-label"
                                    htmlFor="des-info-description-input"
                                  >
                                    Bank Name
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="supplierName-field"
                                    placeholder="Enter bank name"
                                    value={bankName}
                                    onChange={handleBankName}
                                  />
                                </div>
                                <div className="mt-2">
                                  <label
                                    className="form-label"
                                    htmlFor="des-info-description-input"
                                  >
                                    Account Name
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="supplierName-field"
                                    value={bankAccountName}
                                    onChange={handleBankAccountName}
                                  />
                                </div>
                                <div className="mt-2">
                                  <label
                                    className="form-label"
                                    htmlFor="des-info-description-input"
                                  >
                                    Account Number
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="supplierName-field"
                                    value={accountNumber}
                                    onChange={handleAccountNumber}
                                  />
                                </div>
                                <div className="mt-2">
                                  <label
                                    className="form-label"
                                    htmlFor="des-info-description-input"
                                  >
                                    Sort Code
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="supplierName-field"
                                    value={sortCode}
                                    onChange={handleSortCode}
                                  />
                                </div>
                              </Row>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Tab.Container>
                  </Row>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="d-flex justify-content-center btn btn-info btn-label"
                  >
                    <i className="ri-check-fill label-icon align-middle fs-16 me-2"></i>{" "}
                    Apply
                  </button>
                </Card.Footer>
              </Form>
            </Card>
          </Col>
          <Modal
            className="fade zoomIn"
            size="xl"
            show={modal_AddShippingModals}
            onHide={() => {
              tog_AddShippingModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Legal Card
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <div
                id="alert-error-msg"
                className="d-none alert alert-danger py-2"
              ></div>
              <div>
                <Document
                  file={`${process.env.REACT_APP_BASE_URL}/teamFiles/idsFiles/${LocationTeam.state.id_file}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={1} />
                </Document>
              </div>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditTeam;
