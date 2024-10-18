import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";

const AddNewTripModel = () => {
  document.title = "Create New Trip Model | Coach Hire Network";

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
  const [selected, setSelected] = useState("");
  const handleOwner = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ownerName = e.target.value;
    setSelected(await ownerName);
  };

  const [changeColor, setChangeColor] = useState<boolean>(false);

  // function for handleClick
  const handleClick = () => {
    setChangeColor(!changeColor);
  };
  const tripModelLocation = useLocation();
  return (
    <React.Fragment>
      <Form className="tablelist-form">
        <input type="hidden" id="id-field" />
        <Row>
          <Col lg={12}>
            <div className="mb-3">
              <Form.Label htmlFor="customerName-field">Corporate</Form.Label>
              <select
                className="form-select text-muted"
                name="choices-single-default"
                id="statusSelect"
                required
              >
                <option value="">All Corporate</option>
                <option value="Small" selected>
                  CITY ROAD PRIMARY SCHOOL
                </option>
                <option value="Medium">Denstone College</option>
                <option value="Large">ZEELO PROLOGIS</option>
              </select>
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Form.Label htmlFor="orderDate-field">Handled By</Form.Label>
              <select
                className="form-select text-muted"
                name="choices-single-default"
                id="statusSelect"
                required
                onChange={handleOwner}
              >
                <option value="">Select</option>
                <option value="Bouden" selected>
                  Bouden
                </option>
                <option value="Affiliate">Affiliate</option>
              </select>
            </div>
          </Col>
          {selected === "Affiliate" ? (
            <Col lg={4}>
              <div className="mb-3">
                <Form.Label htmlFor="supplierName-field">Affiliates</Form.Label>
                <select
                  className="form-select text-muted"
                  name="choices-single-default"
                  id="statusSelect"
                  required
                  onChange={handleOwner}
                >
                  <option value="">All Affiliates</option>
                  <option value="Brit Coaches Ltd">Brit Coaches Ltd</option>
                  <option value="Dorset Mini Coach">Dorset Mini Coach</option>
                  <option value="Brit Coaches Ltd">HOUSEM MORSI</option>
                  <option value="Dorset Mini Coach">
                    Top line travel- Amjad
                  </option>
                </select>
              </div>
            </Col>
          ) : (
            ""
          )}
          {selected === "Affiliate" ? (
            ""
          ) : (
            <Col lg={4}>
              <div className="mb-3">
                <Form.Label htmlFor="supplierName-field">Driver</Form.Label>
                <select
                  className="form-select text-muted"
                  name="choices-single-default"
                  id="statusSelect"
                  required
                  onChange={handleOwner}
                >
                  <option value="">All Drivers</option>
                  <option value="Brit Coaches Ltd" selected>
                    Wadi Hussain
                  </option>
                  <option value="Dorset Mini Coach">Amar Bashir</option>
                  <option value="Brit Coaches Ltd">Ahmed Zeeshan</option>
                  <option value="Dorset Mini Coach">Raghban Ali</option>
                </select>
              </div>
            </Col>
          )}
          {selected === "Affiliate" ? (
            ""
          ) : (
            <Col lg={4}>
              <div className="mb-3">
                <Form.Label htmlFor="supplierName-field">Vehicle</Form.Label>
                <select
                  className="form-select text-muted"
                  name="choices-single-default"
                  id="statusSelect"
                  required
                  onChange={handleOwner}
                >
                  <option value="">All Vehicles</option>
                  <option value="Brit Coaches Ltd">Standard Saloon Car</option>
                  <option value="Dorset Mini Coach" selected>
                    Executive Saloon Car
                  </option>
                  <option value="Brit Coaches Ltd">VIP Saloon Car</option>
                  <option value="Dorset Mini Coach">Standard 6 Seat MPV</option>
                  <option value="Dorset Mini Coach">
                    Executive 6 Seat MPV
                  </option>
                  <option value="Dorset Mini Coach">
                    10-16 Seat Standard Minibus
                  </option>
                </select>
              </div>
            </Col>
          )}
        </Row>
        <Row>
          <Col lg={4}>
            <div className="mb-3">
              <Form.Label htmlFor="supplierName-field">
                Customer Name
              </Form.Label>
              <Form.Control
                type="text"
                id="customerName-field"
                defaultValue={tripModelLocation.state.srNo}
                required
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Form.Label htmlFor="supplierName-field">
                Customer Email
              </Form.Label>
              <Form.Control
                type="email"
                id="customerName-field"
                defaultValue={tripModelLocation.state.srNo}
                required
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <button
                onClick={handleClick}
                type="button"
                className={`btn btn-darken-light custom-toggle text-dark btn-sm ${
                  changeColor === false
                    ? "btn-darken-light"
                    : "btn-darken-light"
                }`}
                data-bs-toggle="button"
              >
                <span className="icon-on">
                  <i
                    className={`${
                      changeColor === false
                        ? "mdi mdi-cog-counterclockwise align-bottom me-1"
                        : "mdi mdi-robot align-bottom me-1"
                    }`}
                  ></i>
                  {changeColor === false ? "Manual" : "Automatic"}
                </span>
              </button>
              {changeColor === false ? (
                <Form.Control
                  type="email"
                  id="customerName-field"
                  defaultValue={tripModelLocation.state.srNo}
                  required
                />
              ) : (
                <Form.Control
                  type="email"
                  id="customerName-field"
                  defaultValue={520}
                  required
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <div className="hstack gap-2 justify-content-end">
              <Button variant="primary" id="add-btn">
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default AddNewTripModel;
