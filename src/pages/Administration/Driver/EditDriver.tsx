import React, { useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Row,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import countryData from "Common/country";
import SimpleBar from "simplebar-react";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Swal from "sweetalert2";
import { Driver, useUpdateDriverMutation } from "features/Driver/driverSlice";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

const EditDriver = () => {
  document.title = "Edit Driver | Coach Hire Network";
  const driverLocation = useLocation();
  const [numPages, setNumPages] = useState<number | null>(null);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const [modal_DrivingLicenseFile, setmodal_DrivingLicenseFile] =
    useState<boolean>(false);
  function tog_DrivingLicenseFileModal() {
    setmodal_DrivingLicenseFile(!modal_DrivingLicenseFile);
  }

  const [modal_DQCFile, setmodal_DQCFile] = useState<boolean>(false);
  function tog_DQCFileModal() {
    setmodal_DQCFile(!modal_DQCFile);
  }

  const [modal_DBSFile, setmodal_DBSFile] = useState<boolean>(false);
  function tog_DBSFileModal() {
    setmodal_DBSFile(!modal_DBSFile);
  }

  const [modal_PVCFile, setmodal_PVCFile] = useState<boolean>(false);
  function tog_PVCFileModal() {
    setmodal_PVCFile(!modal_PVCFile);
  }

  const [seletedCountry1, setseletedCountry1] = useState<any>({});
  const [first_name, setFirstName] = useState<string>(
    driverLocation?.state?.firstname ?? ""
  );
  const [last_name, setLastName] = useState<string>(
    driverLocation?.state?.surname ?? ""
  );
  const [selectedBirthDate, setSelectedBirthDate] = useState<Date | null>(null);
  const [showDateOfBirth, setShowDateOfBirth] = useState<boolean>(false);

  const [emailDriver, setEmailDriver] = useState<string>(
    driverLocation?.state?.email ?? ""
  );
  const [phoneDriver, setPhoneDriver] = useState<string>(
    driverLocation?.state?.phonenumber ?? ""
  );
  const [emergencyContact, setEmergencyContact] = useState<string>(
    driverLocation?.state?.emergency_contact ?? ""
  );
  const [driverAddress, setDriverAddress] = useState<string>(
    driverLocation?.state?.address ?? ""
  );

  const [driverCity, setDriverCity] = useState<string>(
    driverLocation?.state?.city ?? ""
  );

  const [driverState, setDriverState] = useState<string>(
    driverLocation?.state?.state ?? ""
  );
  const [driverCountry, setDriverCountry] = useState<string>(
    driverLocation?.state?.country ?? ""
  );
  const [driverPostalCode, setDriverPostalCode] = useState<string>(
    driverLocation?.state?.postalcode ?? ""
  );
  const [driverLanguage, setDriverLanguage] = useState<string>(
    driverLocation?.state?.language ?? ""
  );

  const [bankName, setBankName] = useState<string>(
    driverLocation?.state?.bank_name ?? ""
  );

  const [bankAccountName, setBankAccountName] = useState<string>(
    driverLocation?.state?.account_name ?? ""
  );

  const [accountNumber, setAccountNumber] = useState<string>(
    driverLocation?.state?.account_number ?? ""
  );

  const [
    selectedDrivingLicenseExpiryDate,
    setSelectedDrivingLicenseExpiryDate,
  ] = useState<Date | null>(null);

  const [selectedDQCExpiryDate, setSelectedDQCExpiryDate] =
    useState<Date | null>(null);

  const [selectedDbsIssueDate, setSelectedDbsIssueDate] = useState<Date | null>(
    null
  );

  const [selectedDbsBadgeDate, setSelectedDbsBadgeDate] = useState<Date | null>(
    null
  );

  const [selectedPVCDate, setSelectedPVCDate] = useState<Date | null>(null);

  const [depostiHeld, setDepostiHeld] = useState<string>(
    driverLocation?.state?.deposti_held ?? ""
  );

  const [driverNotes, setDriverNotes] = useState<string>(
    driverLocation?.state?.notes ?? ""
  );

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [selectedJoiningDate, setSelectedJoiningDate] = useState<Date | null>(
    null
  );

  const [userName, setUserName] = useState<string>(
    driverLocation?.state?.username ?? ""
  );

  const [showNationality, setShowNationality] = useState<boolean>(false);

  const [showDrivingLicenseExpiryDate, setShowDrivingLicenseExpiryDate] =
    useState<boolean>(false);

  const [showDQCExpiryDate, setShowDQCExpiryDate] = useState<boolean>(false);

  const [showDbsIssueDate, setShowDbsIssueDate] = useState<boolean>(false);

  const [showDbsBadgeDate, setShowDbsBadgeDate] = useState<boolean>(false);

  const [showPVCDate, setShowPVCDate] = useState<boolean>(false);

  const [showStatus, setShowStatus] = useState<boolean>(false);

  const [showJoiningDate, setShowJoiningDate] = useState<boolean>(false);

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleBirthDateChange = (selectedDates: Date[]) => {
    setSelectedBirthDate(selectedDates[0]);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailDriver(e.target.value);
  };
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneDriver(e.target.value);
  };
  const handleEmergencyContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmergencyContact(e.target.value);
  };
  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverAddress(e.target.value);
  };
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverCity(e.target.value);
  };
  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverState(e.target.value);
  };
  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverCountry(e.target.value);
  };
  const handlePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverPostalCode(e.target.value);
  };
  const handleLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverLanguage(e.target.value);
  };
  const handleBankName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankName(e.target.value);
  };
  const handleBankAccountName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankAccountName(e.target.value);
  };
  const handleBankAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };
  const handleDrivingLicenseExpiryDateChange = (selectedDates: Date[]) => {
    setSelectedDrivingLicenseExpiryDate(selectedDates[0]);
  };
  const handleDQCDateChange = (selectedDates: Date[]) => {
    setSelectedDQCExpiryDate(selectedDates[0]);
  };
  const handleDbsIssueDateChange = (selectedDates: Date[]) => {
    setSelectedDbsIssueDate(selectedDates[0]);
  };
  const handleDbsBadgeDateChange = (selectedDates: Date[]) => {
    setSelectedDbsBadgeDate(selectedDates[0]);
  };
  const handlePVCDateChange = (selectedDates: Date[]) => {
    setSelectedPVCDate(selectedDates[0]);
  };
  const handleDepostiHeld = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepostiHeld(e.target.value);
  };
  const handleNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverNotes(e.target.value);
  };
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };
  const handleJoiningDateChange = (selectedDates: Date[]) => {
    setSelectedJoiningDate(selectedDates[0]);
  };
  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const navigate = useNavigate();

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Driver Account Updated successfully",
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

  const [updateDriverProfileMutation] = useUpdateDriverMutation();

  const initialDriverAccount = {
    _id: "",
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
    driverStatus: "",
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
    dbscheck: "",
    contract: "",
  };

  const [updateDriverProfile, setUpdateDriverProfile] =
    useState<Driver>(initialDriverAccount);

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
      setUpdateDriverProfile({
        ...updateDriverProfile,
        profile_image: profileImage,
        profile_image_base64_string: base64Data,
        profile_image_extension: extension,
      });
    }
  };

  // driver_license
  const handleFileUploadDriverLicense = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("driver_license_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateDriverProfile({
        ...updateDriverProfile,
        driver_license: profileImage,
        driver_license_base64_string: base64Data,
        driver_license_extension: extension,
      });
    }
  };

  // contract
  const handleFileUploadContract = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("contract_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateDriverProfile({
        ...updateDriverProfile,
        contract: profileImage,
        contract_base64_string: base64Data,
        contract_extension: extension,
      });
    }
  };

  // dqc
  const handleFileUploadDqc = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("dqc_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateDriverProfile({
        ...updateDriverProfile,
        dqc: profileImage,
        dqc_base64_string: base64Data,
        dqc_extension: extension,
      });
    }
  };

  // dbscheck
  const handleFileUploadDbscheck = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("dbscheck_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateDriverProfile({
        ...updateDriverProfile,
        dbscheck: profileImage,
        dbscheck_base64_string: base64Data,
        dbscheck_extension: extension,
      });
    }
  };

  const {
    _id,
    username,
    password,
    email,
    profile_image_base64_string,
    profile_image_extension,
    profile_image,
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
    driverStatus,
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
  } = updateDriverProfile as Driver;

  const onSubmitUpdateDriverProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      updateDriverProfile["_id"] = driverLocation?.state?._id!;
      if (first_name === "") {
        updateDriverProfile["firstname"] = driverLocation?.state?.firstname!;
      } else {
        updateDriverProfile["firstname"] = first_name;
      }
      if (last_name === "") {
        updateDriverProfile["surname"] = driverLocation?.state?.surname!;
      } else {
        updateDriverProfile["surname"] = last_name;
      }
      if (emailDriver === "") {
        updateDriverProfile["email"] = driverLocation?.state?.email!;
      } else {
        updateDriverProfile["email"] = emailDriver;
      }
      if (phoneDriver === "") {
        updateDriverProfile["phonenumber"] =
          driverLocation?.state?.phonenumber!;
      } else {
        updateDriverProfile["phonenumber"] = phoneDriver;
      }
      if (emergencyContact === "") {
        updateDriverProfile["emergency_contact"] =
          driverLocation?.state?.emergency_contact!;
      } else {
        updateDriverProfile["emergency_contact"] = emergencyContact;
      }
      if (driverAddress === "") {
        updateDriverProfile["address"] = driverLocation?.state?.address!;
      } else {
        updateDriverProfile["address"] = driverAddress;
      }
      if (driverCity === "") {
        updateDriverProfile["city"] = driverLocation?.state?.city!;
      } else {
        updateDriverProfile["city"] = driverCity;
      }
      if (driverState === "") {
        updateDriverProfile["state"] = driverLocation?.state?.state!;
      } else {
        updateDriverProfile["state"] = driverState;
      }
      if (driverCountry === "") {
        updateDriverProfile["country"] = driverLocation?.state?.country!;
      } else {
        updateDriverProfile["country"] = driverCountry;
      }
      if (driverPostalCode === "") {
        updateDriverProfile["postalcode"] = driverLocation?.state?.postalcode!;
      } else {
        updateDriverProfile["postalcode"] = driverPostalCode;
      }
      if (driverLanguage === "") {
        updateDriverProfile["language"] = driverLocation?.state?.language!;
      } else {
        updateDriverProfile["language"] = driverLanguage;
      }
      if (bankName === "") {
        updateDriverProfile["bank_name"] = driverLocation?.state?.bank_name!;
      } else {
        updateDriverProfile["bank_name"] = bankName;
      }
      if (bankAccountName === "") {
        updateDriverProfile["account_name"] =
          driverLocation?.state?.account_name!;
      } else {
        updateDriverProfile["account_name"] = bankAccountName;
      }
      if (accountNumber === "") {
        updateDriverProfile["account_number"] =
          driverLocation?.state?.account_number!;
      } else {
        updateDriverProfile["account_number"] = accountNumber;
      }
      if (depostiHeld === "") {
        updateDriverProfile["deposti_held"] =
          driverLocation?.state?.deposti_held!;
      } else {
        updateDriverProfile["deposti_held"] = depostiHeld;
      }
      if (driverNotes === "") {
        updateDriverProfile["notes"] = driverLocation?.state?.notes!;
      } else {
        updateDriverProfile["notes"] = driverNotes;
      }
      if (userName === "") {
        updateDriverProfile["username"] = driverLocation?.state?.username!;
      } else {
        updateDriverProfile["username"] = userName;
      }
      if (selectedStatus === "") {
        updateDriverProfile["driverStatus"] =
          driverLocation?.state?.driverStatus!;
      } else {
        updateDriverProfile["driverStatus"] = selectedStatus;
      }
      if (selectedBirthDate === null) {
        updateDriverProfile["birthdate"] = driverLocation?.state?.birthdate!;
      } else {
        updateDriverProfile["birthdate"] = selectedBirthDate?.toDateString()!;
      }
      if (selectedDrivingLicenseExpiryDate === null) {
        updateDriverProfile["driving_license_expiry"] =
          driverLocation?.state?.driving_license_expiry!;
      } else {
        updateDriverProfile["driving_license_expiry"] =
          selectedDrivingLicenseExpiryDate?.toDateString()!;
      }
      if (selectedDQCExpiryDate === null) {
        updateDriverProfile["dqc_expiry"] = driverLocation?.state?.dqc_expiry!;
      } else {
        updateDriverProfile["dqc_expiry"] =
          selectedDQCExpiryDate?.toDateString()!;
      }
      if (selectedDbsIssueDate === null) {
        updateDriverProfile["dbs_issue_date"] =
          driverLocation?.state?.dbs_issue_date!;
      } else {
        updateDriverProfile["dbs_issue_date"] =
          selectedDbsIssueDate?.toDateString()!;
      }

      if (selectedDbsBadgeDate === null) {
        updateDriverProfile["dbs_badge_date"] =
          driverLocation?.state?.dbs_badge_date!;
      } else {
        updateDriverProfile["dbs_badge_date"] =
          selectedDbsBadgeDate?.toDateString()!;
      }

      if (selectedPVCDate === null) {
        updateDriverProfile["pvc_expiry"] = driverLocation?.state?.pvc_expiry!;
      } else {
        updateDriverProfile["pvc_expiry"] = selectedPVCDate?.toDateString()!;
      }

      if (selectedJoiningDate === null) {
        updateDriverProfile["joindate"] = driverLocation?.state?.joindate!;
      } else {
        updateDriverProfile["joindate"] = selectedJoiningDate?.toDateString()!;
      }

      if (seletedCountry1 === null) {
        updateDriverProfile["nationality"] =
          driverLocation?.state?.nationality!;
      } else {
        updateDriverProfile["nationality"] = seletedCountry1?.countryName!;
      }

      if (!updateDriverProfile.profile_image_base64_string) {
        updateDriverProfile["profile_image"] =
          driverLocation?.state?.profile_image!;
        updateDriverProfile["profile_image_base64_string"] =
          driverLocation?.state?.profile_image_base64_string!;
        updateDriverProfile["profile_image_extension"] =
          driverLocation?.state?.profile_image_extension!;
      }

      if (!updateDriverProfile.driver_license_base64_string) {
        updateDriverProfile["driver_license"] =
          driverLocation?.state?.driver_license!;
        updateDriverProfile["driver_license_base64_string"] =
          driverLocation?.state?.driver_license_base64_string!;
        updateDriverProfile["driver_license_extension"] =
          driverLocation?.state?.driver_license_extension!;
      }

      if (!updateDriverProfile.contract_base64_string) {
        updateDriverProfile["contract"] = driverLocation?.state?.contract!;
        updateDriverProfile["contract_base64_string"] =
          driverLocation?.state?.contract_base64_string!;
        updateDriverProfile["contract_extension"] =
          driverLocation?.state?.contract_extension!;
      }

      if (!updateDriverProfile.dqc_base64_string) {
        updateDriverProfile["dqc"] = driverLocation?.state?.dqc!;
        updateDriverProfile["dqc_base64_string"] =
          driverLocation?.state?.dqc_base64_string!;
        updateDriverProfile["dqc_extension"] =
          driverLocation?.state?.dqc_extension!;
      }

      if (!updateDriverProfile.dbscheck_base64_string) {
        updateDriverProfile["dbscheck"] = driverLocation?.state?.dbscheck!;
        updateDriverProfile["dbscheck_base64_string"] =
          driverLocation?.state?.dbscheck_base64_string!;
        updateDriverProfile["dbscheck_extension"] =
          driverLocation?.state?.dbscheck_extension!;
      }
      updateDriverProfileMutation(updateDriverProfile)
        .then(() => navigate("/driver"))
        .then(() => notifySuccess());
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Card className="p-3">
            <Form onSubmit={onSubmitUpdateDriverProfile}>
              {/* Avatar ===  Done*/}
              <Row className="mb-2">
                <div className="d-flex justify-content-center">
                  {updateDriverProfile.profile_image &&
                  updateDriverProfile.profile_image_base64_string ? (
                    <Image
                      src={`data:image/jpeg;base64, ${updateDriverProfile.profile_image_base64_string}`}
                      alt=""
                      className="avatar-xl rounded-circle p-1 bg-body mt-n3"
                    />
                  ) : (
                    <Image
                      src={`${
                        process.env.REACT_APP_BASE_URL
                      }/driverFiles/profileImages/${driverLocation?.state
                        ?.profile_image!}`}
                      alt=""
                      className="avatar-xl rounded-circle p-1 bg-body mt-n3"
                    />
                  )}
                </div>
                <div
                  className="d-flex justify-content-center mt-n4"
                  style={{ marginLeft: "60px" }}
                >
                  <label
                    htmlFor="profile_image_base64_string"
                    className="mb-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Select driver image"
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
                    name="profile_image_base64_string"
                    id="profile_image_base64_string"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                    style={{ width: "210px", height: "120px" }}
                  />
                </div>
              </Row>
              {/* First Name , Last Name, BirthDate === Done */}
              <Row className="mb-4">
                {/* First Name  == Done */}
                <Col lg={4}>
                  <div className="mt-1">
                    <Form.Label htmlFor="firstname">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="firstname"
                      value={first_name}
                      onChange={handleFirstName}
                    />
                  </div>
                </Col>
                {/* Last Name == Done */}
                <Col lg={4}>
                  <div className="mt-1">
                    <Form.Label htmlFor="surname">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="surname"
                      value={last_name}
                      onChange={handleLastName}
                    />
                  </div>
                </Col>
                {/* Birth_Date  == Done */}
                <Col lg={4}>
                  <div>
                    <Form.Label htmlFor="birthdate">
                      Birth Date :{" "}
                      <span className="text-dark fs-14">
                        {driverLocation.state.birthdate}
                      </span>
                      <div
                        className="d-flex justify-content-start mt-n3"
                        style={{ marginLeft: "180px" }}
                      >
                        <label
                          htmlFor="id_file"
                          className="mb-0"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          title="Select Birth Date"
                        >
                          <span
                            className="d-inline-block"
                            onClick={() => setShowDateOfBirth(!showDateOfBirth)}
                          >
                            <span className="text-success cursor-pointer">
                              <i className="bi bi-pen fs-14"></i>
                            </span>
                          </span>
                        </label>
                      </div>
                    </Form.Label>
                    {showDateOfBirth && (
                      <Flatpickr
                        className="form-control flatpickr-input"
                        placeholder="Select Date"
                        options={{
                          dateFormat: "d M, Y",
                        }}
                        id="birthdate"
                        onChange={handleBirthDateChange}
                      />
                    )}
                  </div>
                </Col>
              </Row>
              {/* Email , Phone, Emergency Contact, Nationality === Done*/}
              <Row className="mb-4">
                {/* Email  == Done */}
                <Col lg={3}>
                  <div className="mt-1">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      value={emailDriver}
                      onChange={handleEmail}
                    />
                  </div>
                </Col>
                {/* Phone  == Done */}
                <Col lg={3}>
                  <div className="mt-1">
                    <Form.Label htmlFor="phonenumber">Phone</Form.Label>
                    <Form.Control
                      type="text"
                      id="phonenumber"
                      value={phoneDriver}
                      onChange={handlePhone}
                    />
                  </div>
                </Col>
                {/* Emergency Contact  == Done */}
                <Col lg={3}>
                  <div className="mt-1">
                    <Form.Label htmlFor="emergency_contact">
                      Emergency Contact
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="emergency_contact"
                      value={emergencyContact}
                      onChange={handleEmergencyContact}
                    />
                  </div>
                </Col>
                {/*  Nationaity == Done */}
                <Col lg={3}>
                  <div>
                    <Form.Label htmlFor="nationality">
                      Nationality :{" "}
                      <span className="text-dark fs-14">
                        {driverLocation.state.nationality}
                      </span>
                      <div
                        className="d-flex justify-content-start mt-n3"
                        style={{ marginLeft: "190px" }}
                      >
                        <label
                          htmlFor="id_file"
                          className="mb-0"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          title="Select Birth Date"
                        >
                          <span
                            className="d-inline-block"
                            onClick={() => setShowNationality(!showNationality)}
                          >
                            <span className="text-success cursor-pointer">
                              <i className="bi bi-pen fs-14"></i>
                            </span>
                          </span>
                        </label>
                      </div>
                    </Form.Label>
                    {showNationality && (
                      <Dropdown>
                        <Dropdown.Toggle
                          as="input"
                          style={{
                            backgroundImage: `url(${
                              seletedCountry1.flagImg && seletedCountry1.flagImg
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
                                  onClick={() => setseletedCountry1(item)}
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
                </Col>
              </Row>
              {/* Address , City, State, Country, PostalCode, Language === Done*/}
              <Row className="mb-4">
                {/* Address  == Done */}
                <Col lg={2}>
                  <div>
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={driverAddress}
                      onChange={handleAddress}
                    />
                  </div>
                </Col>
                {/* City  == Done */}
                <Col lg={2}>
                  <div>
                    <Form.Label htmlFor="city">City</Form.Label>
                    <Form.Control
                      type="text"
                      id="city"
                      value={driverCity}
                      onChange={handleCity}
                    />
                  </div>
                </Col>
                {/* State  == Done */}
                <Col lg={2}>
                  <div>
                    <Form.Label htmlFor="state">State</Form.Label>
                    <Form.Control
                      type="text"
                      id="state"
                      value={driverState}
                      onChange={handleState}
                    />
                  </div>
                </Col>
                {/* Country  == Done */}
                <Col lg={2}>
                  <div>
                    <Form.Label htmlFor="country">Country</Form.Label>
                    <Form.Control
                      type="text"
                      id="country"
                      placeholder="Enter Country"
                      value={driverCountry}
                      onChange={handleCountry}
                    />
                  </div>
                </Col>
                {/* Postal Code  == Done */}
                <Col lg={2}>
                  <div>
                    <Form.Label htmlFor="postalcode">Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      id="postalcode"
                      value={driverPostalCode}
                      onChange={handlePostalCode}
                    />
                  </div>
                </Col>
                {/* Language  == Done */}
                <Col lg={2}>
                  <div>
                    <Form.Label htmlFor="language">Language</Form.Label>
                    <Form.Control
                      type="text"
                      id="language"
                      value={driverLanguage}
                      onChange={handleLanguage}
                    />
                  </div>
                </Col>
              </Row>
              {/* Bank Infos === Done*/}
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
                      <h5 className="card-title">Bank Informations </h5>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-4">
                    {/* Bank Name === Done*/}
                    <Col lg={3}>
                      <div>
                        <label htmlFor="bank_name" className="form-label">
                          Bank Name
                        </label>
                        <Form.Control
                          type="text"
                          id="bank_name"
                          name="bank_name"
                          value={bankName}
                          onChange={handleBankName}
                        />
                      </div>
                    </Col>
                    {/* Account Name === Done*/}
                    <Col lg={3}>
                      <div>
                        <label htmlFor="account_name" className="form-label">
                          Account Name
                        </label>
                        <Form.Control
                          type="text"
                          id="account_name"
                          name="account_name"
                          value={bankAccountName}
                          onChange={handleBankAccountName}
                        />
                      </div>
                    </Col>
                    {/* Account Number === Done*/}
                    <Col lg={3}>
                      <div>
                        <label htmlFor="account_number" className="form-label">
                          Account Number
                        </label>
                        <Form.Control
                          type="text"
                          id="account_number"
                          name="account_number"
                          value={accountNumber}
                          onChange={handleBankAccountNumber}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
              {/* Driving License === Done*/}
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
                    <Col lg={6}>
                      <div>
                        <Form.Label htmlFor="driving_license_expiry">
                          Driving License Expiry Date :{" "}
                          <span className="text-dark fs-14">
                            {driverLocation.state.driving_license_expiry}
                          </span>
                          <div
                            className="d-flex justify-content-start mt-n3"
                            style={{ marginLeft: "300px" }}
                          >
                            <label
                              htmlFor="id_file"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Birth Date"
                            >
                              <span
                                className="d-inline-block"
                                onClick={() =>
                                  setShowDrivingLicenseExpiryDate(
                                    !showDrivingLicenseExpiryDate
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
                        {showDrivingLicenseExpiryDate && (
                          <Flatpickr
                            className="form-control flatpickr-input"
                            placeholder="Select Date"
                            options={{
                              dateFormat: "d M, Y",
                            }}
                            id="driving_license_expiry"
                            onChange={handleDrivingLicenseExpiryDateChange}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div>
                        <Form.Label
                          htmlFor="driver_license_base64_string"
                          className="form-label"
                        >
                          File
                        </Form.Label>
                        <br />
                        <Button
                          variant="soft-danger"
                          onClick={() => {
                            tog_DrivingLicenseFileModal();
                          }}
                        >
                          <i className="bi bi-filetype-pdf align-middle fs-22"></i>
                        </Button>
                        <div
                          className="d-flex justify-content-start mt-n2"
                          style={{ marginLeft: "50px" }}
                        >
                          <label
                            htmlFor="driver_license_base64_string"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select Driving License"
                          >
                            <span className="d-inline-block">
                              <span className="text-success cursor-pointer">
                                <i className="bi bi-pen fs-14"></i>
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            name="driver_license_base64_string"
                            id="driver_license_base64_string"
                            accept=".pdf"
                            onChange={(e) => handleFileUploadDriverLicense(e)}
                            style={{
                              width: "210px",
                              height: "120px",
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
              {/* DQC === Done*/}
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
                      <h5 className="card-title">DQC</h5>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col lg={4}>
                      <div>
                        <Form.Label htmlFor="dqc_expiry">
                          DQC Expiry Date :{" "}
                          <span className="text-dark fs-14">
                            {driverLocation.state.dqc_expiry}
                          </span>
                          <div
                            className="d-flex justify-content-start mt-n3"
                            style={{ marginLeft: "230px" }}
                          >
                            <label
                              htmlFor="id_file"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Birth Date"
                            >
                              <span
                                className="d-inline-block"
                                onClick={() =>
                                  setShowDQCExpiryDate(!showDQCExpiryDate)
                                }
                              >
                                <span className="text-success cursor-pointer">
                                  <i className="bi bi-pen fs-14"></i>
                                </span>
                              </span>
                            </label>
                          </div>
                        </Form.Label>
                        {showDQCExpiryDate && (
                          <Flatpickr
                            className="form-control flatpickr-input"
                            placeholder="Select Date"
                            options={{
                              dateFormat: "d M, Y",
                            }}
                            id="dqc_expiry"
                            onChange={handleDQCDateChange}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div>
                        <Form.Label
                          htmlFor="dqc_base64_string"
                          className="form-label"
                        >
                          File
                        </Form.Label>
                        <br />
                        <Button
                          variant="soft-danger"
                          onClick={() => {
                            tog_DQCFileModal();
                          }}
                        >
                          <i className="bi bi-filetype-pdf align-middle fs-22"></i>
                        </Button>
                        <div
                          className="d-flex justify-content-start mt-n2"
                          style={{ marginLeft: "50px" }}
                        >
                          <label
                            htmlFor="dqc_base64_string"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select Driving License"
                          >
                            <span className="d-inline-block">
                              <span className="text-success cursor-pointer">
                                <i className="bi bi-pen fs-14"></i>
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            name="dqc_base64_string"
                            id="dqc_base64_string"
                            accept=".pdf"
                            onChange={(e) => handleFileUploadDqc(e)}
                            style={{
                              width: "210px",
                              height: "120px",
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
              {/* DBS === Done */}
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
                      <h5 className="card-title">DBS</h5>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col lg={4}>
                      <div>
                        <Form.Label htmlFor="dbs_issue_date">
                          DBS Issue Date :{" "}
                          <span className="text-dark fs-14">
                            {driverLocation.state.dbs_issue_date}
                          </span>
                          <div
                            className="d-flex justify-content-start mt-n3"
                            style={{ marginLeft: "218px" }}
                          >
                            <label
                              htmlFor="id_file"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select DBS Issue Date"
                            >
                              <span
                                className="d-inline-block"
                                onClick={() =>
                                  setShowDbsIssueDate(!showDbsIssueDate)
                                }
                              >
                                <span className="text-success cursor-pointer">
                                  <i className="bi bi-pen fs-14"></i>
                                </span>
                              </span>
                            </label>
                          </div>
                        </Form.Label>
                        {showDbsIssueDate && (
                          <Flatpickr
                            className="form-control flatpickr-input"
                            placeholder="Select Date"
                            options={{
                              dateFormat: "d M, Y",
                            }}
                            id="dbs_issue_date"
                            onChange={handleDbsIssueDateChange}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div>
                        <Form.Label htmlFor="dbs_badge_date">
                          DBS Badge Date :{" "}
                          <span className="text-dark fs-14">
                            {driverLocation.state.dbs_badge_date}
                          </span>
                          <div
                            className="d-flex justify-content-start mt-n3"
                            style={{ marginLeft: "220px" }}
                          >
                            <label
                              htmlFor="id_file"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select DBS Badge Date"
                            >
                              <span
                                className="d-inline-block"
                                onClick={() =>
                                  setShowDbsBadgeDate(!showDbsBadgeDate)
                                }
                              >
                                <span className="text-success cursor-pointer">
                                  <i className="bi bi-pen fs-14"></i>
                                </span>
                              </span>
                            </label>
                          </div>
                        </Form.Label>
                        {showDbsBadgeDate && (
                          <Flatpickr
                            className="form-control flatpickr-input"
                            placeholder="Select Date"
                            options={{
                              dateFormat: "d M, Y",
                            }}
                            id="dbs_badge_date"
                            onChange={handleDbsBadgeDateChange}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div>
                        <Form.Label
                          htmlFor="dbscheck_base64_string"
                          className="form-label"
                        >
                          File
                        </Form.Label>
                        <br />
                        <Button
                          variant="soft-danger"
                          onClick={() => {
                            tog_DBSFileModal();
                          }}
                        >
                          <i className="bi bi-filetype-pdf align-middle fs-22"></i>
                        </Button>
                        <div
                          className="d-flex justify-content-start mt-n2"
                          style={{ marginLeft: "50px" }}
                        >
                          <label
                            htmlFor="dbscheck_base64_string"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select Driving License"
                          >
                            <span className="d-inline-block">
                              <span className="text-success cursor-pointer">
                                <i className="bi bi-pen fs-14"></i>
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            name="dbscheck_base64_string"
                            id="dbscheck_base64_string"
                            accept=".pdf"
                            onChange={(e) => handleFileUploadDbscheck(e)}
                            style={{
                              width: "210px",
                              height: "120px",
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
              {/* PVC === Done */}
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
                    <Col lg={4}>
                      <div>
                        <Form.Label htmlFor="pvc_expiry">
                          PVC Expiry :{" "}
                          <span className="text-dark fs-14">
                            {driverLocation.state.pvc_expiry}
                          </span>
                          <div
                            className="d-flex justify-content-start mt-n3"
                            style={{ marginLeft: "185px" }}
                          >
                            <label
                              htmlFor="id_file"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select PVC Expiry"
                            >
                              <span
                                className="d-inline-block"
                                onClick={() => setShowPVCDate(!showPVCDate)}
                              >
                                <span className="text-success cursor-pointer">
                                  <i className="bi bi-pen fs-14"></i>
                                </span>
                              </span>
                            </label>
                          </div>
                        </Form.Label>
                        {showPVCDate && (
                          <Flatpickr
                            className="form-control flatpickr-input"
                            placeholder="Select Date"
                            options={{
                              dateFormat: "d M, Y",
                            }}
                            id="pvc_expiry"
                            onChange={handlePVCDateChange}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg={2}>
                      <div>
                        <Form.Label
                          htmlFor="contract_base64_string"
                          className="form-label"
                        >
                          PVC File
                        </Form.Label>
                        <br />
                        <Button
                          variant="soft-danger"
                          onClick={() => {
                            tog_PVCFileModal();
                          }}
                        >
                          <i className="bi bi-filetype-pdf align-middle fs-22"></i>
                        </Button>
                        <div
                          className="d-flex justify-content-start mt-n2"
                          style={{ marginLeft: "50px" }}
                        >
                          <label
                            htmlFor="contract_base64_string"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select PVC File"
                          >
                            <span className="d-inline-block">
                              <span className="text-success cursor-pointer">
                                <i className="bi bi-pen fs-14"></i>
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            name="contract_base64_string"
                            id="contract_base64_string"
                            accept=".pdf"
                            onChange={(e) => handleFileUploadContract(e)}
                            style={{
                              width: "210px",
                              height: "120px",
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div>
                        <Form.Label htmlFor="deposti_held">
                          Deposit Held
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="deposti_held"
                          name="deposti_held"
                          value={depostiHeld}
                          onChange={handleDepostiHeld}
                        />
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div className="mb-3">
                        <Form.Label htmlFor="notes">Notes</Form.Label>
                        <Form.Control
                          type="text"
                          id="notes"
                          name="notes"
                          value={driverNotes}
                          onChange={handleNotes}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
              {/* Account === Done*/}
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
                      <div>
                        <Form.Label htmlFor="driverStatus">
                          Status :{" "}
                          {driverLocation.state.driverStatus === "Active" ? (
                            <p className="badge bg-success">Active</p>
                          ) : driverLocation.state.driverStatus ===
                            "Inactive" ? (
                            <p className="badge bg-danger">Inactive</p>
                          ) : driverLocation.state.driverStatus === "onRoad" ? (
                            <p className="badge bg-info">On Road</p>
                          ) : (
                            <p className="badge bg-warning">On Vacation</p>
                          )}
                          <div
                            className="d-flex justify-content-start mt-n4"
                            style={{ marginLeft: "110px" }}
                          >
                            <label
                              htmlFor="id_file"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Driver Status"
                            >
                              <span
                                className="d-inline-block"
                                onClick={() => setShowStatus(!showStatus)}
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
                            name="driverStatus"
                            id="driverStatus"
                            onChange={handleSelectStatus}
                          >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="onVacation">On Vacation</option>
                            <option value="onRoad">On Road</option>
                          </select>
                        )}
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div>
                        <Form.Label htmlFor="joindate">
                          Joining Date :{" "}
                          <span className="text-dark fs-14">
                            {driverLocation.state.joindate}
                          </span>
                          <div
                            className="d-flex justify-content-start mt-n3"
                            style={{ marginLeft: "200px" }}
                          >
                            <label
                              htmlFor="id_file"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Birth Date"
                            >
                              <span
                                className="d-inline-block"
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
                        </Form.Label>
                        {showJoiningDate && (
                          <Flatpickr
                            className="form-control flatpickr-input"
                            placeholder="Select Date"
                            options={{
                              dateFormat: "d M, Y",
                            }}
                            id="joindate"
                            onChange={handleJoiningDateChange}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div>
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control
                          type="text"
                          id="username"
                          name="username"
                          value={userName}
                          onChange={handleUserName}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button type="submit" variant="primary" id="add-btn">
                    Update Driver
                  </Button>
                </div>
              </Col>
            </Form>
          </Card>
        </Container>
      </div>
      {/* Driving License */}
      <Modal
        className="fade zoomIn"
        size="xl"
        show={modal_DrivingLicenseFile}
        onHide={() => {
          tog_DrivingLicenseFileModal();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Driving License
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <div>
            <Document
              file={`${process.env.REACT_APP_BASE_URL}/driverFiles/licenseFiles/${driverLocation.state.driver_license}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        </Modal.Body>
      </Modal>
      {/* DQC File */}
      <Modal
        className="fade zoomIn"
        size="xl"
        show={modal_DQCFile}
        onHide={() => {
          tog_DQCFileModal();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            DQC
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <div>
            <Document
              file={`${process.env.REACT_APP_BASE_URL}/driverFiles/dqcFiles/${driverLocation.state.dqc}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        </Modal.Body>
      </Modal>
      {/* DBS File */}
      <Modal
        className="fade zoomIn"
        size="xl"
        show={modal_DBSFile}
        onHide={() => {
          tog_DBSFileModal();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            DBS
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <div>
            <Document
              file={`${process.env.REACT_APP_BASE_URL}/driverFiles/dbsCheckFiles/${driverLocation.state.dbscheck}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        </Modal.Body>
      </Modal>
      {/* PVC File */}
      <Modal
        className="fade zoomIn"
        size="xl"
        show={modal_PVCFile}
        onHide={() => {
          tog_PVCFileModal();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            PVC
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <div>
            <Document
              file={`${process.env.REACT_APP_BASE_URL}/driverFiles/contractFiles/${driverLocation.state.contract}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default EditDriver;
