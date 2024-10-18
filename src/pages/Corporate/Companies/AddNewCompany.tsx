import { useAddNewCompanyMutation } from "features/Company/companySlice";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { useNavigate } from "react-router-dom";
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

const AddNewCompany = () => {
  document.title = "Create Company | Coach Hire Network";
  const navigate = useNavigate();
  const notifyCompany = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Company is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyErrorCompany = (err: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [selectedActivity, setSelectedActivity] = useState<string>("");
  // This function is triggered when the select Model
  const handleSelectActivity = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedActivity(value);
  };

  const [selectedStatusCompany, setSelectedStatusCompany] =
    useState<string>("");
  // This function is triggered when the select Model
  const handleSelectStatusCompany = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedStatusCompany(value);
  };

  // ServiceDate
  const [selectedDateOfService, setSelectedDateOfService] =
    useState<Date | null>(null);
  const handleChangeDateOfService = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDateOfService(selectedDates[0]);
  };

  const [createCompany] = useAddNewCompanyMutation();

  const initialCompany = {
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

  const [company, setCompany] = useState(initialCompany);

  const {
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
  } = company;

  // Logo
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("logoBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const logoCompany = base64Data + "." + extension;
      console.log(extension);
      setCompany({
        ...company,
        logo_file: logoCompany,
        logoBase64String: base64Data,
        logoExtension: extension,
      });
    }
  };

  // Logo
  const handleLegalFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("legel_card_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const legalCompany = base64Data + "." + extension;
      console.log(extension);
      setCompany({
        ...company,
        legal_file: legalCompany,
        legel_card_base64_string: base64Data,
        legal_card_extension: extension,
      });
    }
  };

  const onChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      company["statusCompany"] = selectedStatusCompany;
      company["activity"] = selectedActivity;
      company["service_date"] = selectedDateOfService?.toDateString()!;
      createCompany(company)
        .then(() => notifyCompany())
        .then(() => navigate("/companies"));
    } catch (error) {
      notifyErrorCompany(error);
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
                          <i className="bi bi-box-seam"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1">Company Information</h5>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <Form className="tablelist-form" onSubmit={onSubmitCompany}>
                      <Row>
                        <Row className="border-bottom mb-3">
                          <div className="text-center mb-3">
                            <div className="position-relative d-inline-block mb-2">
                              <div className="position-absolute top-100 start-100 translate-middle">
                                <label
                                  htmlFor="logoBase64String"
                                  className="mb-0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  title="Select company logo"
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
                                  name="logoBase64String"
                                  id="logoBase64String"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e)}
                                />
                              </div>
                              <div className="avatar-lg">
                                <div className="avatar-title bg-light rounded-3">
                                  <img
                                    src={`data:image/jpeg;base64, ${company.logoBase64String}`}
                                    alt={company.name}
                                    id="logoBase64String"
                                    className="avatar-xl h-auto rounded-3 object-fit-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Row>
                        <Row>
                          {/* Name  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="name">Name</Form.Label>
                              <Form.Control
                                type="text"
                                id="name"
                                placeholder="Enter vehicle name"
                                onChange={onChangeCompany}
                                value={company.name}
                                name="name"
                              />
                            </div>
                          </Col>
                          {/* Email  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="email">Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter email"
                                onChange={onChangeCompany}
                                value={company.email}
                              />
                            </div>
                          </Col>

                          {/* Phone  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="phone">Phone</Form.Label>
                              <Form.Control
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="Enter phone"
                                onChange={onChangeCompany}
                                value={company.phone}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Category  == Done */}
                          {/* <Col lg={4}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Category
                                </Form.Label>
                                <select
                                  className="form-select text-muted"
                                  name="choices-single-default"
                                  id="statusSelect"
                                  required
                                >
                                  <option value="">Category</option>
                                  <option value="Entreprise">Entreprise</option>
                                  <option value="Schools">Schools</option>
                                </select>
                              </div>
                            </Col> */}

                          {/* Address == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="address">Address</Form.Label>
                              <Form.Control
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Enter address"
                                onChange={onChangeCompany}
                                value={company.address}
                              />
                            </div>
                          </Col>
                          {/* Activity  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="activity">
                                Activity
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="activity"
                                id="activity"
                                onChange={handleSelectActivity}
                              >
                                <option value="">Activity</option>
                                <option value="Industry">Industry</option>
                                <option value="Health">Health</option>
                                <option value="School">School</option>
                                <option value="High Education">
                                  High Education
                                </option>
                              </select>
                            </div>
                          </Col>
                          {/* Status  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="statusCompany">
                                Status
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="statusCompany"
                                id="statusCompany"
                                onChange={handleSelectStatusCompany}
                              >
                                <option value="">Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                          </Col>
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
                                onChange={handleChangeDateOfService}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Legal Card == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="legel_card_base64_string">
                                Legal File
                              </Form.Label>
                              <Form.Control
                                type="file"
                                name="legel_card_base64_string"
                                id="legel_card_base64_string"
                                onChange={handleLegalFileUpload}
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
                                    <i className="bi bi-box-seam"></i>
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
                                    name="account_number"
                                    id="account_number"
                                    placeholder="Enter Bank Account Number"
                                    onChange={onChangeCompany}
                                    value={company.account_number}
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
                                    name="account_name"
                                    id="account_name"
                                    placeholder="Enter Bank Account Name"
                                    onChange={onChangeCompany}
                                    value={company.account_name}
                                  />
                                </div>
                              </Col>
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
                                    name="bank_name"
                                    id="bank_name"
                                    placeholder="Enter Bank Name"
                                    onChange={onChangeCompany}
                                    value={company.bank_name}
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
                                    name="sort_code"
                                    id="sort_code"
                                    placeholder="Enter Sort Code"
                                    onChange={onChangeCompany}
                                    value={company.sort_code}
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
                                    <i className="bi bi-box-seam"></i>
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
                                    name="login"
                                    id="login"
                                    placeholder="Enter Login"
                                    onChange={onChangeCompany}
                                    value={company.login}
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
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    onChange={onChangeCompany}
                                    value={company.password}
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
                              Add Company
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

export default AddNewCompany;
