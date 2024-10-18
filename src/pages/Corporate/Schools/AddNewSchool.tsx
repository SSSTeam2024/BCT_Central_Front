import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddNewSchoolMutation } from "features/Schools/schools";
import Flatpickr from "react-flatpickr";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

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

const AddNewSchool = () => {
  document.title = "Create School | Coach Hire Network";

  // DateOfBirth
  const [selectedJoiningDate, setSelectedJoiningDate] = useState<Date | null>(
    null
  );
  const handleDateJoining = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedJoiningDate(selectedDates[0]);
  };

  const navigate = useNavigate();
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "School Account is created successfully",
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

  const [currentDate, setCurrentDate] = useState(getDate());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // This function is triggered when the select Model
  const handleSelectCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const [selectedStatus, setSelectedStatus] = useState<string>("");
  // This function is triggered when the select Model
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  const [createSchool] = useAddNewSchoolMutation();

  const initialSchool = {
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

  const [school, setSchool] = useState(initialSchool);

  const {
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
    IdFileBase64String,
    IdFileExtension,
  } = school;

  // Avatar
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("IdFileBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const logoImage = base64Data + "." + extension;
      console.log(logoImage);
      setSchool({
        ...school,
        id_file: logoImage,
        IdFileBase64String: base64Data,
        IdFileExtension: extension,
      });
    }
  };

  const onChangeSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchool((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitSchool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      school["corporateCategory"] = selectedCategory;
      school["statusSchool"] = selectedStatus;
      school["service_date"] = selectedJoiningDate?.toDateString()!;
      createSchool(school)
        .then(() => notifySuccess())
        .then(() => navigate("/schools"));
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
                  <div className="mb-3">
                    <Form className="tablelist-form" onSubmit={onSubmitSchool}>
                      <Row>
                        <Row className="border-bottom mb-3">
                          <div className="text-center mb-3">
                            <div className="position-relative d-inline-block mb-2">
                              <div className="position-absolute top-100 start-100 translate-middle">
                                <label
                                  htmlFor="IdFileBase64String"
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
                                  name="IdFileBase64String"
                                  id="IdFileBase64String"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e)}
                                />
                              </div>
                              <div className="avatar-lg">
                                <div className="avatar-title bg-light rounded-3">
                                  <img
                                    src={`data:image/jpeg;base64, ${school.IdFileBase64String}`}
                                    alt={school.name}
                                    id="IdFileBase64String"
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
                                name="name"
                                placeholder="Enter school name"
                                onChange={onChangeSchool}
                                value={school.name}
                              />
                            </div>
                          </Col>
                          {/* Email  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="email">Email</Form.Label>
                              <Form.Control
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={onChangeSchool}
                                value={school.email}
                              />
                            </div>
                          </Col>
                          {/* Phone  == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="phone">Phone</Form.Label>
                              <Form.Control
                                type="text"
                                id="phone"
                                placeholder="Enter phone"
                                onChange={onChangeSchool}
                                value={school.phone}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Address == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="address">Address</Form.Label>
                              <Form.Control
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter address"
                                onChange={onChangeSchool}
                                value={school.address}
                              />
                            </div>
                          </Col>
                          {/* Category  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="corporateCategory">
                                Category
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="corporateCategory"
                                id="corporateCategory"
                                onChange={handleSelectCategory}
                              >
                                <option value="">Category</option>
                                <option value="University">University</option>
                                <option value="School">School</option>
                              </select>
                            </div>
                          </Col>
                          {/* Service_Date  == Done */}
                          {/* <Col lg={3}>
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
                                />
                              </div>
                            </Col> */}
                          {/* Status  == Done */}
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="statusSchool">
                                Status
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="statusSchool"
                                id="statusSchool"
                                onChange={handleSelectStatus}
                              >
                                <option value="">Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
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
                                  <Form.Label htmlFor="account_number">
                                    Bank Account Number
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    id="account_number"
                                    placeholder="Enter Bank Account Number"
                                    name="account_number"
                                    onChange={onChangeSchool}
                                    value={school.account_number}
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
                                    id="bank_name"
                                    placeholder="Enter Bank Name"
                                    name="bank_name"
                                    onChange={onChangeSchool}
                                    value={school.bank_name}
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
                                    placeholder="Enter Bank Name"
                                    name="account_name"
                                    onChange={onChangeSchool}
                                    value={school.account_name}
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
                                    onChange={onChangeSchool}
                                    value={school.sort_code}
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
                                    onChange={handleDateJoining}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label htmlFor="login" className="form-label">
                                    Login
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="login"
                                    placeholder="Enter Login"
                                    name="login"
                                    onChange={onChangeSchool}
                                    value={school.login}
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
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={onChangeSchool}
                                    value={school.password}
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
                              Add School
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

export default AddNewSchool;
