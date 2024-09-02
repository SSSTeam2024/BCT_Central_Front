import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";
import {
  Company,
  useUpdateCompanyMutation,
} from "features/Company/companySlice";

import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Set the workerSrc to point to the pdf.worker.js file
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

const EditCompany = () => {
  document.title = "Edit Company | Bouden Coach Travel";

  const companyLocation = useLocation();

  const navigate = useNavigate();

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Company Updated successfully",
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
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [nameSchool, setNameSchool] = useState<string>(
    companyLocation?.state?.name ?? ""
  );
  const [adr, setAdr] = useState<string>(companyLocation?.state?.address ?? "");
  const [mail, setMail] = useState<string>(companyLocation?.state?.email ?? "");
  const [phoneNum, setPhoneNum] = useState<string>(
    companyLocation?.state?.phone ?? ""
  );
  const [loginSchool, setLoginSchool] = useState<string>(
    companyLocation?.state?.login ?? ""
  );
  const [bankAccountName, setBankAccountName] = useState<string>(
    companyLocation?.state?.bank_name ?? ""
  );
  const [accountNumber, setAccountNumber] = useState<string>(
    companyLocation?.state?.account_number ?? ""
  );
  const [selectCategory, setSelectedCategory] = useState<string>("");
  const [selectStatus, setSelectedStatus] = useState<string>("");
  const [modal_LegalCard, setmodal_LegalCard] = useState<boolean>(false);

  function tog_LegalCard() {
    setmodal_LegalCard(!modal_LegalCard);
  }

  // This function is triggered when the select Category
  const handleSelectCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedCategory(value);
  };

  // This function is triggered when the select Status
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  const handleLoginSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginSchool(e.target.value);
  };

  const handleBankAccountName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankAccountName(e.target.value);
  };

  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
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

  const handleNameSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSchool(e.target.value);
  };

  const handleDateChange = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDate(selectedDates[0]);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const [updateCompanyProfileMutation] = useUpdateCompanyMutation();

  const initialCompanyAccount = {
    _id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    activity: "",
    service_date: "",
    statusCompany: "",
    account_name: "",
    sort_code: "",
    account_number: "",
    bank_name: "",
    login: "",
    password: "",
    logoBase64String: "",
    logoExtension: "",
    logo_file: "",
    legel_card_base64_string: "",
    legal_card_extension: "",
    legal_file: "",
  };

  const [updateCompanyProfile, setUpdateCompanyProfile] = useState<Company>(
    initialCompanyAccount
  );

  // Logo
  const handleFileUploadLogo = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("logoBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateCompanyProfile({
        ...updateCompanyProfile,
        logo_file: profileImage,
        logoBase64String: base64Data,
        logoExtension: extension,
      });
    }
  };

  // Legal File
  const handleFileUploadLegalFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("legel_card_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateCompanyProfile({
        ...updateCompanyProfile,
        legal_file: profileImage,
        legel_card_base64_string: base64Data,
        legal_card_extension: extension,
      });
    }
  };

  const {
    _id,
    name,
    address,
    email,
    phone,
    activity,
    service_date,
    statusCompany,
    account_name,
    sort_code,
    account_number,
    bank_name,
    login,
    password,
    logoBase64String,
    logoExtension,
    logo_file,
    legel_card_base64_string,
    legal_card_extension,
    legal_file,
  } = updateCompanyProfile as Company;

  const onSubmitUpdateCompanyProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      updateCompanyProfile["_id"] = companyLocation?.state?._id!;
      if (nameSchool === "") {
        updateCompanyProfile["name"] = companyLocation?.state?.name!;
      } else {
        updateCompanyProfile["name"] = nameSchool;
      }
      if (adr === "") {
        updateCompanyProfile["address"] = companyLocation?.state?.address!;
      } else {
        updateCompanyProfile["address"] = adr;
      }
      if (mail === "") {
        updateCompanyProfile["email"] = companyLocation?.state?.email!;
      } else {
        updateCompanyProfile["email"] = mail;
      }
      if (phoneNum === "") {
        updateCompanyProfile["phone"] = companyLocation?.state?.phone!;
      } else {
        updateCompanyProfile["phone"] = phoneNum;
      }
      if (loginSchool === "") {
        updateCompanyProfile["login"] = companyLocation?.state?.login!;
      } else {
        updateCompanyProfile["login"] = loginSchool;
      }

      if (accountNumber === "") {
        updateCompanyProfile["account_number"] =
          companyLocation?.state?.account_number!;
      } else {
        updateCompanyProfile["account_number"] = accountNumber;
      }

      if (bankAccountName === "") {
        updateCompanyProfile["bank_name"] = companyLocation?.state?.bank_name!;
      } else {
        updateCompanyProfile["bank_name"] = bankAccountName;
      }

      if (selectCategory === "") {
        updateCompanyProfile["activity"] = companyLocation?.state?.activity!;
      } else {
        updateCompanyProfile["activity"] = selectCategory;
      }

      if (selectStatus === "") {
        updateCompanyProfile["statusCompany"] =
          companyLocation?.state?.statusCompany!;
      } else {
        updateCompanyProfile["statusCompany"] = selectStatus;
      }

      if (selectedDate === null) {
        updateCompanyProfile["service_date"] =
          companyLocation?.state?.service_date!;
      } else {
        updateCompanyProfile["service_date"] = selectedDate?.toDateString()!;
      }

      if (!updateCompanyProfile.logoBase64String) {
        // If not, keep the existing profile picture
        updateCompanyProfile["logo_file"] = companyLocation?.state?.logo_file!;
        // Make sure to retain the existing base64 data and extension
        updateCompanyProfile["logoBase64String"] =
          companyLocation?.state?.logoBase64String!;
        updateCompanyProfile["logoExtension"] =
          companyLocation?.state?.logoExtension!;
      }

      if (!updateCompanyProfile.legel_card_base64_string) {
        // If not, keep the existing profile picture
        updateCompanyProfile["legal_file"] =
          companyLocation?.state?.legal_file!;
        // Make sure to retain the existing base64 data and extension
        updateCompanyProfile["legel_card_base64_string"] =
          companyLocation?.state?.legel_card_base64_string!;
        updateCompanyProfile["legal_card_extension"] =
          companyLocation?.state?.legal_card_extension!;
      }
      console.log("updateCompanyProfile", updateCompanyProfile);
      updateCompanyProfileMutation(updateCompanyProfile)
        .then(() => navigate("/companies"))
        .then(() => notifySuccess());
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Form onSubmit={onSubmitUpdateCompanyProfile}>
            <Row>
              <Col lg={12}>
                <Card>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="mdi mdi-domain"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Company Information</h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Body>
                      <div className="d-flex justify-content-center">
                        {updateCompanyProfile.logo_file &&
                        updateCompanyProfile.logoBase64String ? (
                          <Image
                            src={`data:image/jpeg;base64, ${updateCompanyProfile.logoBase64String}`}
                            alt=""
                            className="avatar-lg rounded-circle p-1 bg-body mt-n3"
                          />
                        ) : (
                          <Image
                            src={`${process.env.REACT_APP_BASE_URL}/companyFiles/logoFiles/${companyLocation.state.logo_file}`}
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
                          htmlFor="logoBase64String"
                          className="mb-0"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          title="Select company logo"
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
                          name="logoBase64String"
                          id="logoBase64String"
                          accept="image/*"
                          onChange={(e) => handleFileUploadLogo(e)}
                          style={{ width: "210px", height: "120px" }}
                        />
                      </div>
                    </Card.Body>
                    <Row>
                      {/* Name  == Done */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="name">Name</Form.Label>
                          <Form.Control
                            type="text"
                            id="name"
                            name="name"
                            value={nameSchool}
                            onChange={handleNameSchool}
                          />
                        </div>
                      </Col>
                      {/* Email  == Done */}
                      <Col lg={3}>
                        <div className="mb-3">
                          <Form.Label htmlFor="email">Email</Form.Label>
                          <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            value={mail}
                            onChange={handleMail}
                          />
                        </div>
                      </Col>
                      {/* Phone  == Done */}
                      <Col lg={2}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Phone
                          </Form.Label>
                          <Form.Control
                            type="terxt"
                            id="phone"
                            name="phone"
                            value={phoneNum}
                            onChange={handlePhoneNum}
                          />
                        </div>
                      </Col>
                      {/* Address == Done */}
                      <Col lg={3}>
                        <div className="mb-3">
                          <Form.Label htmlFor="address">Address</Form.Label>
                          <textarea
                            className="form-control"
                            id="address"
                            name="address"
                            value={adr}
                            onChange={handleAdr}
                            rows={3}
                          ></textarea>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {/* Category  == Done */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Activity :{" "}
                            <span className="fs-16">
                              {companyLocation.state.activity}
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
                                title="Select Company Activity"
                              >
                                <span
                                  onClick={() => setShowCategory(!showCategory)}
                                >
                                  <span className="text-success cursor-pointer">
                                    <i className="bi bi-pen fs-14"></i>
                                  </span>
                                </span>
                              </label>
                            </div>
                          </Form.Label>
                          {showCategory && (
                            <select
                              className="form-select text-muted"
                              name="choices-single-default"
                              id="statusSelect"
                              onChange={handleSelectCategory}
                            >
                              <option value="">Select</option>
                              <option value="Health">Health</option>
                              <option value="Industry">Industry</option>
                            </select>
                          )}
                        </div>
                      </Col>
                      {/* Service_Date  == Done */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="orderDate-field">
                            Service Date :{" "}
                            <span className="fs-16">
                              {companyLocation.state.service_date}
                            </span>
                            <div
                              className="d-flex justify-content-start mt-n2 z-0"
                              style={{ marginLeft: "205px" }}
                            >
                              <label
                                htmlFor="service_date"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select Service Date"
                              >
                                <span onClick={() => setShowDate(!showDate)}>
                                  <span className="text-success cursor-pointer">
                                    <i className="bi bi-pen fs-14"></i>
                                  </span>
                                </span>
                              </label>
                            </div>
                          </Form.Label>
                          {showDate && (
                            <Flatpickr
                              className="form-control flatpickr-input"
                              placeholder="Select Date"
                              options={{
                                dateFormat: "d M, Y",
                              }}
                              onChange={handleDateChange}
                            />
                          )}
                        </div>
                      </Col>
                      {/* Status  == Done */}
                      <Col lg={3}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Status
                            {companyLocation.state.statusCompany ===
                            "Active" ? (
                              <span className="badge badge-soft-success">
                                {companyLocation.state.statusCompany}
                              </span>
                            ) : (
                              <span className="badge badge-soft-danger">
                                {companyLocation.state.statusCompany}
                              </span>
                            )}
                            <div
                              className="d-flex justify-content-start mt-n2 z-0"
                              style={{ marginLeft: "105px" }}
                            >
                              <label
                                htmlFor="statusCompany"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select Status"
                              >
                                <span
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
                              name="choices-single-default"
                              id="statusSelectStatus"
                              onChange={handleSelectStatus}
                            >
                              <option value="">Select</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Label>File</Form.Label>
                      <div>
                        <button
                          title="Legal File"
                          type="button"
                          className="btn btn-soft-danger btn-icon d-grid"
                          onClick={() => tog_LegalCard()}
                        >
                          <i
                            className="bi bi-filetype-pdf"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </button>

                        <div
                          className="d-flex justify-content-start mt-n3"
                          style={{ marginLeft: "36px" }}
                        >
                          <label
                            htmlFor="legel_card_base64_string"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select company Legal Card"
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
                            name="legel_card_base64_string"
                            id="legel_card_base64_string"
                            accept=".pdf"
                            onChange={(e) => handleFileUploadLegalFile(e)}
                            style={{ width: "210px", height: "120px" }}
                          />
                        </div>
                      </div>
                    </Row>
                    <Col lg={12}>
                      <Card.Header>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm">
                              <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                <i className="mdi mdi-bank-plus"></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="card-title">Bank Account</h5>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col lg={3}>
                            <div className="mb-3">
                              <label
                                htmlFor="account_number"
                                className="form-label"
                              >
                                Bank Account Number
                              </label>
                              <Form.Control
                                type="text"
                                id="account_number"
                                name="account_number"
                                value={accountNumber}
                                onChange={handleAccountNumber}
                              />
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="mb-3">
                              <label htmlFor="bank_name" className="form-label">
                                Bank Name
                              </label>
                              <Form.Control
                                type="text"
                                id="bank_name"
                                name="bank_name"
                                value={bankAccountName}
                                onChange={handleBankAccountName}
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
                                <i className="mdi mdi-clipboard-account"></i>
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
                              <label
                                htmlFor="statusSelect"
                                className="form-label"
                              >
                                Login
                              </label>
                              <Form.Control
                                type="text"
                                id="login"
                                name="login"
                                value={loginSchool}
                                onChange={handleLoginSchool}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>
                    <Col lg={12}>
                      <div className="hstack gap-2 justify-content-end">
                        <Button variant="primary" id="add-btn" type="submit">
                          Update Company
                        </Button>
                      </div>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
        <Modal
          className="fade zoomIn"
          size="xl"
          show={modal_LegalCard}
          onHide={() => {
            tog_LegalCard();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              License File
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <div>
              <Document
                file={`${process.env.REACT_APP_BASE_URL}/companyFiles/legalFiles/${companyLocation.state.legal_file}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={1} />
              </Document>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default EditCompany;
