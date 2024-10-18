import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";

const AddNewOffer = () => {
  document.title = "Create New Offer | Coach Hire Network";

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

  const options = [
    { value: "Standard Saloon Car", label: "Standard Saloon Car" },
    { value: "Executive Saloon Car", label: "Executive Saloon Car" },
    { value: "VIP Saloon Car", label: "VIP Saloon Car" },
    { value: "Standard 6 Seat MPV", label: "Standard 6 Seat MPV" },
    { value: "Executive 6 Seat MPV", label: "Executive 6 Seat MPV" },
    {
      value: "10-16 Seat Standard Minibus",
      label: "10-16 Seat Standard Minibus",
    },
  ];
  const offerLocation = useLocation();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row className="d-flex justify-content-center mt-5">
            <Col lg={9}>
              <Card>
                <Card.Body>
                  <div className="mb-3">
                    <Form className="tablelist-form">
                      <input type="hidden" id="id-field" />
                      <Row>
                        <Row>
                          {/* Name  == Done */}
                          <Col lg={4}>
                            <div className="mb-4">
                              <Form.Label htmlFor="customerName-field">
                                Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="customerName-field"
                                defaultValue={offerLocation.state.Name}
                                required
                              />
                            </div>
                          </Col>
                          {/* Corporate == Done */}
                          <Col lg={4}>
                            <div className="mb-4">
                              <Form.Label htmlFor="supplierName-field">
                                Corporate
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="choices-single-default"
                                id="statusSelect"
                                required
                              >
                                <option value="">Select</option>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                              </select>
                            </div>
                          </Col>
                          {/* Contact  == Done */}
                          <Col lg={4}>
                            <div className="mb-4">
                              <Form.Label htmlFor="supplierName-field">
                                Contact
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="choices-single-default"
                                id="statusSelect"
                                required
                              >
                                <option value="">Select</option>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Vehicle  == Done */}
                          <Col lg={4}>
                            <div className="mb-4">
                              <Form.Label htmlFor="supplierName-field">
                                Vehicle
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="choices-single-default"
                                id="statusSelect"
                                required
                              >
                                <option value="">Select</option>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                              </select>
                            </div>
                          </Col>
                          {/* Driver  == Done */}
                          <Col lg={4}>
                            <div className="mb-4">
                              <Form.Label htmlFor="supplierName-field">
                                Driver
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="choices-single-default"
                                id="statusSelect"
                                required
                              >
                                <option value="">Select</option>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                              </select>
                            </div>
                          </Col>
                          {/* Pickup  == Done */}
                          <Col lg={4}>
                            <div className="mb-4">
                              <Form.Label htmlFor="supplierName-field">
                                Pickup
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="customerName-field"
                                defaultValue={offerLocation.state.Pickup}
                                required
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Destination  == Done */}
                          <Col lg={4}>
                            <div className="mb-4">
                              <Form.Label htmlFor="orderDate-field">
                                Destination
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="customerName-field"
                                defaultValue={offerLocation.state.Destination}
                                required
                              />
                            </div>
                          </Col>
                          {/* Cost  == Done */}
                          <Col lg={4}>
                            <div className="mb-4">
                              <Form.Label htmlFor="supplierName-field">
                                Cost
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="customerName-field"
                                defaultValue={offerLocation.state.Cost}
                                required
                              />
                            </div>
                          </Col>
                          {/* OfferNumber  == Done */}
                          <Col lg={4}>
                            <div className="mb-4">
                              <Form.Label htmlFor="supplierName-field">
                                Offer Number
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="customerName-field"
                                defaultValue={offerLocation.state.OfferNumber}
                                required
                              />
                            </div>
                          </Col>
                        </Row>
                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            <Button variant="primary" id="add-btn">
                              Apply
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

export default AddNewOffer;
