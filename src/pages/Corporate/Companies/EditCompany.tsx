import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditCompany = () => {
  document.title = "Edit Company | Bouden Coach Travel";

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /* Formats the size */
  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const companyLocation = useLocation();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumb title="Create Vehicle" pageTitle="Vehicles" /> */}
          <form
            id="createproduct-form"
            autoComplete="off"
            className="needs-validation"
            noValidate
          >
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
                      <Form className="tablelist-form">
                        <input type="hidden" id="id-field" />
                        <Row>
                          <Row>
                            {/* Name  == Done */}
                            <Col lg={4}>
                              <div className="mb-3">
                                <Form.Label htmlFor="customerName-field">
                                  Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="customerName-field"
                                  placeholder="Enter company name"
                                  defaultValue={companyLocation.state.name}
                                  required
                                />
                              </div>
                            </Col>
                            {/* Email  == Done */}
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Email
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  id="supplierName-field"
                                  placeholder="Enter email"
                                  defaultValue={companyLocation.state.email}
                                  required
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
                                  id="supplierName-field"
                                  defaultValue={companyLocation.state.phone}
                                  placeholder="Enter phone"
                                  required
                                />
                              </div>
                            </Col>
                            {/* Address == Done */}
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Address
                                </Form.Label>
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea5"
                                  defaultValue={companyLocation.state.address}
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
                                  Category
                                </Form.Label>
                                <select
                                  className="form-select text-muted"
                                  name="choices-single-default"
                                  id="statusSelect"
                                  required
                                >
                                  <option value="">Category</option>
                                  <option value="Entreprise" selected>
                                    Entreprise
                                  </option>
                                  <option value="Schools">Schools</option>
                                </select>
                              </div>
                            </Col>
                            {/* Activity  == Done */}
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Activity
                                </Form.Label>
                                <select
                                  className="form-select text-muted"
                                  name="choices-single-default"
                                  id="statusSelect"
                                  required
                                >
                                  <option value="">Activity</option>
                                  <option value="Industry" selected>
                                    Industry
                                  </option>
                                  <option value="Health">Health</option>
                                  <option value="School">School</option>
                                  <option value="High Education">
                                    High Education
                                  </option>
                                </select>
                              </div>
                            </Col>
                            {/* Service_Date  == Done */}
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="orderDate-field">
                                  Service Date
                                </Form.Label>
                                <Flatpickr
                                  className="form-control flatpickr-input"
                                  placeholder="Select Date"
                                  options={{
                                    dateFormat: "d M, Y",
                                  }}
                                  defaultValue={companyLocation.state.address}
                                />
                              </div>
                            </Col>
                            {/* Status  == Done */}
                            <Col lg={2}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Status
                                </Form.Label>
                                <select
                                  className="form-select text-muted"
                                  name="choices-single-default"
                                  id="statusSelect"
                                  required
                                >
                                  <option value="">Status</option>
                                  <option value="Active" selected>
                                    Active
                                  </option>
                                  <option value="Inactive">Inactive</option>
                                </select>
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
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Bank Account Number
                                    </label>
                                    <Form.Control
                                      type="text"
                                      id="supplierName-field"
                                      placeholder="Enter Bank Account Number"
                                      required
                                      defaultValue={
                                        companyLocation.state.bankAccountNumber
                                      }
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Bank Name
                                    </label>
                                    <Form.Control
                                      type="text"
                                      id="supplierName-field"
                                      placeholder="Enter Bank Account Number"
                                      required
                                      defaultValue={
                                        companyLocation.state.bankName
                                      }
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
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Login
                                    </label>
                                    <Form.Control
                                      type="text"
                                      id="supplierName-field"
                                      placeholder="Enter Login"
                                      defaultValue={companyLocation.state.login}
                                      required
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Password
                                    </label>
                                    <Form.Control
                                      type="password"
                                      id="supplierName-field"
                                      placeholder="Enter password"
                                      defaultValue={
                                        companyLocation.state.password
                                      }
                                      required
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Url
                                    </label>
                                    <Form.Control
                                      type="text"
                                      id="supplierName-field"
                                      placeholder="Enter Url"
                                      defaultValue={
                                        companyLocation.state.subDomaine
                                      }
                                      required
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Col>
                          <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                              <Button variant="primary" id="add-btn">
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
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditCompany;
