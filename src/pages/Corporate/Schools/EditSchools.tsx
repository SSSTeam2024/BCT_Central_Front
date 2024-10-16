import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";

import { useLocation, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { School, useUpdateSchoolMutation } from "features/Schools/schools";
import Swal from "sweetalert2";

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

const EditSchool = () => {
  document.title = "Edit School | Bouden Coach Travel";

  const schoolLocation = useLocation();

  const navigate = useNavigate();

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "School Updated successfully",
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

  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [nameSchool, setNameSchool] = useState<string>(
    schoolLocation?.state?.name ?? ""
  );
  const [adr, setAdr] = useState<string>(schoolLocation?.state?.address ?? "");
  const [mail, setMail] = useState<string>(schoolLocation?.state?.email ?? "");
  const [phoneNum, setPhoneNum] = useState<string>(
    schoolLocation?.state?.phone ?? ""
  );
  const [loginSchool, setLoginSchool] = useState<string>(
    schoolLocation?.state?.login ?? ""
  );
  const [bankAccountName, setBankAccountName] = useState<string>(
    schoolLocation?.state?.bank_name ?? ""
  );
  const [accountNumber, setAccountNumber] = useState<string>(
    schoolLocation?.state?.account_number ?? ""
  );
  const [selectCategory, setSelectedCategory] = useState<string>("");
  const [selectStatus, setSelectedStatus] = useState<string>("");

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

  const [updateSchoolProfileMutation] = useUpdateSchoolMutation();

  const initialSchoolAccount = {
    _id: "",
    name: "",
    login: "",
    password: "",
    email: "",
    phone: "",
    activity: "",
    address: "",
    service_date: "",
    statusSchool: "",
    legal_status: "",
    account_name: "",
    corporateCategory: "",
    contract: "",
    sort_code: "",
    account_number: "",
    bank_name: "",
    id_creation_date: "",
    id_file: "",
    IdFileBase64String: "",
    IdFileExtension: "",
  };

  const [updateSchoolProfile, setUpdateSchoolProfile] =
    useState<School>(initialSchoolAccount);

  // Avatar
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("id_file") as HTMLFormElement)
      .files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateSchoolProfile({
        ...updateSchoolProfile,
        id_file: profileImage,
        IdFileBase64String: base64Data,
        IdFileExtension: extension,
      });
    }
  };

  const {
    _id,
    name,
    login,
    password,
    email,
    phone,
    activity,
    address,
    service_date,
    statusSchool,
    legal_status,
    account_name,
    corporateCategory,
    contract,
    sort_code,
    account_number,
    bank_name,
    id_creation_date,
    id_file,
  } = updateSchoolProfile as School;

  const onSubmitUpdateSchoolProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      updateSchoolProfile["_id"] = schoolLocation?.state?._id!;
      if (nameSchool === "") {
        updateSchoolProfile["name"] = schoolLocation?.state?.name!;
      } else {
        updateSchoolProfile["name"] = nameSchool;
      }
      if (adr === "") {
        updateSchoolProfile["address"] = schoolLocation?.state?.address!;
      } else {
        updateSchoolProfile["address"] = adr;
      }
      if (mail === "") {
        updateSchoolProfile["email"] = schoolLocation?.state?.email!;
      } else {
        updateSchoolProfile["email"] = mail;
      }
      if (phoneNum === "") {
        updateSchoolProfile["phone"] = schoolLocation?.state?.phone!;
      } else {
        updateSchoolProfile["phone"] = phoneNum;
      }
      if (loginSchool === "") {
        updateSchoolProfile["login"] = schoolLocation?.state?.login!;
      } else {
        updateSchoolProfile["login"] = loginSchool;
      }

      if (accountNumber === "") {
        updateSchoolProfile["account_number"] =
          schoolLocation?.state?.account_number!;
      } else {
        updateSchoolProfile["account_number"] = accountNumber;
      }

      if (bankAccountName === "") {
        updateSchoolProfile["bank_name"] = schoolLocation?.state?.bank_name!;
      } else {
        updateSchoolProfile["bank_name"] = bankAccountName;
      }

      if (selectCategory === "") {
        updateSchoolProfile["corporateCategory"] =
          schoolLocation?.state?.corporateCategory!;
      } else {
        updateSchoolProfile["corporateCategory"] = selectCategory;
      }

      if (selectStatus === "") {
        updateSchoolProfile["statusSchool"] =
          schoolLocation?.state?.statusSchool!;
      } else {
        updateSchoolProfile["statusSchool"] = selectStatus;
      }

      if (selectedDate === null) {
        updateSchoolProfile["service_date"] =
          schoolLocation?.state?.service_date!;
      } else {
        updateSchoolProfile["service_date"] = selectedDate?.toDateString()!;
      }

      if (!updateSchoolProfile.IdFileBase64String) {
        // If not, keep the existing profile picture
        updateSchoolProfile["id_file"] = schoolLocation?.state?.id_file!;
        // Make sure to retain the existing base64 data and extension
        updateSchoolProfile["IdFileBase64String"] =
          schoolLocation?.state?.IdFileBase64String!;
        updateSchoolProfile["IdFileExtension"] =
          schoolLocation?.state?.avatarExtension!;
      }

      updateSchoolProfileMutation(updateSchoolProfile)
        .then(() => navigate("/schools"))
        .then(() => notifySuccess());
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Form onSubmit={onSubmitUpdateSchoolProfile}>
            <Row>
              <Col lg={12}>
                <Card>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="mdi mdi-school"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">School Information</h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Body>
                      <div className="d-flex justify-content-center">
                        {updateSchoolProfile.id_file &&
                        updateSchoolProfile.IdFileBase64String ? (
                          <Image
                            src={`data:image/jpeg;base64, ${updateSchoolProfile.IdFileBase64String}`}
                            alt=""
                            className="img-thumbnail"
                            width="200"
                          />
                        ) : (
                          <Image
                            src={`${
                              process.env.REACT_APP_BASE_URL
                            }/schoolFiles/${schoolLocation?.state?.id_file!}`}
                            alt=""
                            className="img-thumbnail"
                            width="200"
                          />
                        )}
                      </div>
                      <div className="d-flex justify-content-center mt-n2">
                        <label
                          htmlFor="id_file"
                          className="mb-0"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          title="Select school logo"
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
                          name="id_file"
                          id="id_file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e)}
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
                          <Form.Label htmlFor="category">
                            Category :{" "}
                            <span className="fs-16">
                              {schoolLocation.state.corporateCategory}
                            </span>
                            <div
                              className="d-flex justify-content-start mt-n2 z-0"
                              style={{ marginLeft: "125px" }}
                            >
                              <label
                                htmlFor="category"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select School Category"
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
                              <option value="">Category</option>
                              <option value="University">University</option>
                              <option value="School">School</option>
                            </select>
                          )}
                        </div>
                      </Col>
                      {/* Service_Date  == Done */}
                      <Col lg={3}>
                        <div className="mb-3">
                          <Form.Label htmlFor="service_date">
                            Service Date :{" "}
                            <span className="fs-16">
                              {schoolLocation.state.service_date}
                            </span>
                            <div
                              className="d-flex justify-content-start mt-n2 z-0"
                              style={{ marginLeft: "210px" }}
                            >
                              <label
                                htmlFor="service_date"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select School Category"
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
                      <Col lg={2}>
                        <div className="mb-3">
                          <Form.Label htmlFor="school_status">
                            Status :{" "}
                            {schoolLocation.state.statusSchool === "Active" ? (
                              <span className="badge badge-soft-success">
                                {schoolLocation.state.statusSchool}
                              </span>
                            ) : (
                              <span className="badge badge-soft-danger">
                                {schoolLocation.state.statusSchool}
                              </span>
                            )}
                            <div
                              className="d-flex justify-content-start mt-n2 z-0"
                              style={{ marginLeft: "105px" }}
                            >
                              <label
                                htmlFor="school_status"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select School Category"
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
                          Update School
                        </Button>
                      </div>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditSchool;
