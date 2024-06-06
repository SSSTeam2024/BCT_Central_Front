import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { useLocation } from "react-router-dom";
import Select from "react-select";

const colourOptions: any = [
  { value: "Parking", label: "Parking" },
  { value: "Toll charges", label: "Toll charges" },
  { value: "Drivers accommodation", label: "Drivers accommodation" },
];

const EditVehicle = () => {
  document.title = "Edit Vehicle | Bouden Coach Travel";

  const [changeColor, setChangeColor] = useState<boolean>(false);

  // function for handleClick
  const handleClick = () => {
    setChangeColor(!changeColor);
  };

  const [changeColorAC, setChangeColorAC] = useState<boolean>(false);

  // function for handleClick AC
  const handleClickAC = () => {
    setChangeColorAC(!changeColorAC);
  };

  const [changeColorFrigo, setChangeColorFrigo] = useState<boolean>(false);

  // function for handleClick Frigo
  const handleClickFrigo = () => {
    setChangeColorFrigo(!changeColorFrigo);
  };

  const [changeColorScreen, setChangeColorScreen] = useState<boolean>(false);

  // function for handleClick Screen
  const handleClickScreen = () => {
    setChangeColorScreen(!changeColorScreen);
  };

  const [changeColorAutomatic, setChangeColorAutomatic] =
    useState<boolean>(false);

  // function for handleClick Automatic
  const handleClickAutomatic = () => {
    setChangeColorAutomatic(!changeColorAutomatic);
  };

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
  const [modal_AddExtra, setmodal_AddExtra] = useState<boolean>(false);
  function tog_AddExtra() {
    setmodal_AddExtra(!modal_AddExtra);
  }

  const LocationEdit = useLocation()

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <form
            id="createproduct-form"
            autoComplete="off"
            className="needs-validation"
            noValidate
          >
            <Row>
              <Card>
                <Card.Body>
                  <Tab.Container defaultActiveKey="home1">
                    <Nav
                      as="ul"
                      variant="pills"
                      className="nav-pills-custom nav-info nav-justified mb-3 "
                    >
                      <Nav.Item as="li">
                        <Nav.Link eventKey="home1">
                          <i className="mdi mdi-car-info fs-20 mb-1 align-middle"></i>{" "}
                          Profile
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="profile1">
                          <i className="mdi mdi-card-bulleted-outline align-middle fs-20 mb-1"></i>
                          Documents
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="home1">
                        <Row>
                          <Col lg={6}>
                            {" "}
                            <Card>
                              <Card.Body>
                                <div className="mb-3">
                                  <Form className="tablelist-form">
                                    <input type="hidden" id="id-field" />
                                    <Row>
                                      <Row>
                                        {/* Vehicle reg  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="customerName-field">
                                              Vehicle reg
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              id="customerName-field"
                                            //   placeholder="Enter vehicle name"
                                            defaultValue={LocationEdit.state.name}
                                              required
                                            />
                                          </div>
                                        </Col>
                                        {/* Vehicle make/model  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Vehicle make/model
                                            </Form.Label>
                                            <select
                                              className="form-select text-muted"
                                              name="choices-single-default"
                                              id="statusSelect"
                                              required
                                            >
                                              <option value="">Brand</option>
                                              <option value="Pickups">
                                                Tesla
                                              </option>
                                              <option value="Pending">
                                                BMW
                                              </option>
                                              <option value="Shipping">
                                                Ford
                                              </option>
                                              <option value="Pickups">
                                                Porsche
                                              </option>
                                              <option value="Pending">
                                                Bentley
                                              </option>
                                              <option value="Shipping">
                                                Toyota
                                              </option>
                                              <option value="Pickups">
                                                Audi
                                              </option>
                                              <option value="Pending">
                                                Jeep
                                              </option>
                                              <option value="Shipping">
                                                Jaguar
                                              </option>
                                              <option value="Pickups">
                                                Rolls-Royce
                                              </option>
                                              <option value="Pending" selected>
                                                Mercedes-Benz
                                              </option>
                                              <option value="Infiniti ">
                                                Infiniti
                                              </option>
                                            </select>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Vehicle_color  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Vehicle color
                                            </Form.Label>
                                            <select
                                              className="form-select text-muted"
                                              name="choices-single-default"
                                              id="statusSelect"
                                              required
                                            >
                                              <option value="">Color</option>
                                              <option value="Car">White</option>
                                              <option value="Bus" selected>Black</option>
                                              <option value="Double Height">
                                                Blue
                                              </option>
                                            </select>
                                          </div>
                                        </Col>
                                        {/* Vehicle_Type  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Vehicle Type
                                            </Form.Label>
                                            <select
                                              className="form-select text-muted"
                                              name="choices-single-default"
                                              id="statusSelect"
                                              required
                                            >
                                              <option value="">Type</option>
                                              <option value="Standard">
                                                Standard
                                              </option>
                                              <option value="Executive" selected>
                                                Executive
                                              </option>
                                              <option value="Luxury">
                                                Luxury
                                              </option>
                                            </select>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/*Max_Passenger  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Max Passenger
                                            </Form.Label>
                                            <select
                                              className="form-select text-muted"
                                              name="choices-single-default"
                                              id="statusSelect"
                                              required
                                            >
                                              <option value="">Select</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4" selected>4</option>
                                              <option value="5">5</option>
                                              <option value="6">6</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                              <option value="13">13</option>
                                              <option value="2">14</option>
                                              <option value="3">15</option>
                                              <option value="4">16</option>
                                              <option value="5">17</option>
                                              <option value="6">18</option>
                                              <option value="7">19</option>
                                              <option value="8">20</option>
                                              <option value="9">21</option>
                                              <option value="10">22</option>
                                              <option value="11">23</option>
                                              <option value="12">24</option>
                                              <option value="13">25</option>
                                              <option value="2">26</option>
                                              <option value="3">27</option>
                                              <option value="4">28</option>
                                              <option value="5">29</option>
                                              <option value="6">30</option>
                                              <option value="7">31</option>
                                              <option value="8">32</option>
                                              <option value="9">33</option>
                                              <option value="10">34</option>
                                              <option value="11">35</option>
                                              <option value="12">36</option>
                                              <option value="13">37</option>
                                              <option value="2">38</option>
                                              <option value="3">39</option>
                                              <option value="4">40</option>
                                              <option value="5">41</option>
                                              <option value="6">42</option>
                                              <option value="7">43</option>
                                              <option value="8">44</option>
                                              <option value="9">45</option>
                                              <option value="10">46</option>
                                              <option value="11">47</option>
                                              <option value="12">48</option>
                                              <option value="13">49</option>
                                            </select>
                                          </div>
                                        </Col>
                                        {/* Fleet_Number == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Fleet Number
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              id="supplierName-field"
                                              defaultValue="4"
                                              // placeholder="Enter serial number"
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Engine_number == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Engine number
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              id="supplierName-field"
                                              // placeholder="Enter serial number"
                                              required
                                            />
                                          </div>
                                        </Col>
                                        {/* Mileage / KM == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Mileage / KM
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              id="supplierName-field"
                                              // placeholder="Enter serial number"
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Registration_Date  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Registration date
                                            </Form.Label>
                                            <Flatpickr
                                              className="form-control flatpickr-input"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                            />
                                          </div>
                                        </Col>
                                        {/* Depot_name  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Depot name
                                            </Form.Label>
                                            <select
                                              className="form-select text-muted"
                                              name="choices-single-default"
                                              id="statusSelect"
                                              required
                                            >
                                              <option value="">
                                                Select depot
                                              </option>
                                              <option value="2" selected>
                                                Brimingham, West Midlands B35
                                                7BT, UK
                                              </option>
                                            </select>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Purchase_date  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Purchase Date
                                            </Form.Label>
                                            <Flatpickr
                                              className="form-control flatpickr-input"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                            />
                                          </div>
                                        </Col>
                                        {/* Purchase_price  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Purchase Price
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              id="supplierName-field"
                                              // placeholder="Enter serial number"
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Sale_date  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Sale Date
                                            </Form.Label>
                                            <Flatpickr
                                              className="form-control flatpickr-input"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                            />
                                          </div>
                                        </Col>
                                        {/* Status  == Done */}
                                        <Col lg={6}>
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
                                              <option value="Active">
                                                Active
                                              </option>
                                              <option value="Inactive">
                                                Inactive
                                              </option>
                                              <option value="Reparing Mode">
                                                Reparing Mode
                                              </option>
                                              <option value="On Road">
                                                On Road
                                              </option>
                                            </select>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Row>
                                  </Form>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col lg={6}>
                            <Card>
                              <Card.Body>
                                <div className="mb-3">
                                  <Form className="tablelist-form">
                                    <input type="hidden" id="id-field" />
                                    <Row>
                                      <Row>
                                        {/* Manufacturer  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="statusSelect"
                                              className="form-label"
                                            >
                                              Manufacturer
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="supplierName-field"
                                              // placeholder="Enter owner name"
                                              required
                                            />
                                          </div>
                                        </Col>
                                        {/* Engine_Size  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="statusSelect"
                                              className="form-label"
                                            >
                                              Engine Size
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="supplierName-field"
                                              // placeholder="Enter owner name"
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Fuel_Type  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="statusSelect"
                                              className="form-label"
                                            >
                                              Fuel Type
                                            </label>
                                            <select
                                              className="form-select text-muted"
                                              name="choices-single-default"
                                              id="statusSelect"
                                              required
                                            >
                                              <option value="">Type</option>
                                              <option value="Pickups">
                                                Diesel
                                              </option>
                                              <option value="Pending">
                                                Gazoile
                                              </option>
                                              <option value="Shipping">
                                                Hybrid
                                              </option>
                                              <option value="Delivered">
                                                Full Electric
                                              </option>
                                            </select>
                                          </div>
                                        </Col>
                                        {/* Speed_Limit  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="statusSelect"
                                              className="form-label"
                                            >
                                              Speed Limit
                                            </label>
                                            <select
                                              className="form-select text-muted"
                                              name="choices-single-default"
                                              id="statusSelect"
                                              required
                                            >
                                              <option value="">Limit</option>
                                              <option value="Pickups">
                                                60mph
                                              </option>
                                              <option value="Pending">
                                                100mph
                                              </option>
                                            </select>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/*  Insurance_type  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="statusSelect"
                                              className="form-label"
                                            >
                                              Insurance type
                                            </label>
                                            <select
                                              className="form-select text-muted"
                                              name="choices-single-default"
                                              id="statusSelect"
                                              required
                                            >
                                              <option value="">Select</option>
                                              <option value="Pickups">
                                                Fully comprehensive
                                              </option>
                                              <option value="Pending">
                                                Third party
                                              </option>
                                              <option value="Shipping">
                                                Third party, fire and theft
                                              </option>
                                            </select>
                                          </div>
                                        </Col>
                                        {/* Insurance_policy_number  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="statusSelect"
                                              className="form-label"
                                            >
                                              Insurance Policy Number
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="supplierName-field"
                                              // placeholder="Enter owner name"
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/*  Ownership  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="statusSelect"
                                              className="form-label"
                                            >
                                              Ownership
                                            </label>
                                            <select
                                              className="form-select text-muted"
                                              name="choices-single-default"
                                              id="statusSelect"
                                              required
                                            >
                                              <option value="">Owner</option>
                                              <option value="Pickups">
                                                Owned
                                              </option>
                                              <option value="Pending">
                                                Rented
                                              </option>
                                              <option value="Shipping">
                                                Leasing
                                              </option>
                                            </select>
                                          </div>
                                        </Col>
                                        {/* Owner  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="statusSelect"
                                              className="form-label"
                                            >
                                              Owner Name
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="supplierName-field"
                                              // placeholder="Enter owner name"
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Note  == Done */}
                                        <Col lg={12}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Note
                                            </Form.Label>
                                            <div>
                                              <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea5"
                                                rows={3}
                                              ></textarea>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Extra  == Done */}
                                        <Col lg={12}>
                                          <div className="input-group mb-3">
                                            <Form.Label htmlFor="supplierName-field">
                                              Extra
                                            </Form.Label>
                                            {/* <Select
                                              isMulti
                                              options={colourOptions}
                                            /> */}
                                            <div className="input-group">
                                              <input
                                                type="text"
                                                className="form-control"
                                                aria-label="Recipient's username"
                                                aria-describedby="button-addon2"
                                              />
                                              <button
                                                className="btn btn-darken-success"
                                                type="button"
                                                id="button-addon2"
                                                onClick={() => tog_AddExtra()}
                                              >
                                                <span className="mdi mdi-plus"></span>
                                              </button>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Wifi == Done*/}
                                        <Col lg={2}>
                                          <div className="mb-3">
                                            <button
                                              onClick={handleClick}
                                              type="button"
                                              className={`btn btn-darken-success custom-toggle btn-sm ${
                                                changeColor === false
                                                  ? "btn-darken-success"
                                                  : "btn-darken-danger"
                                              }`}
                                              data-bs-toggle="button"
                                            >
                                              <span className="icon-on">
                                                <i
                                                  className={`${
                                                    changeColor === false
                                                      ? "mdi mdi-wifi align-bottom me-1"
                                                      : "mdi mdi-wifi-off align-bottom me-1"
                                                  }`}
                                                ></i>
                                                {changeColor === false
                                                  ? "Wifi"
                                                  : "No Wifi"}
                                              </span>
                                            </button>
                                          </div>
                                        </Col>
                                        {/* Frigo  == Done  */}
                                        <Col lg={2}>
                                          <div className="mb-3">
                                            <button
                                              type="button"
                                              onClick={handleClickFrigo}
                                              className={`btn btn-darken-success custom-toggle btn-sm ${
                                                changeColorFrigo === false
                                                  ? "btn-darken-success"
                                                  : "btn-darken-danger"
                                              }`}
                                              data-bs-toggle="button"
                                            >
                                              <span className="icon-on">
                                                <i
                                                  className={`${
                                                    changeColorFrigo === false
                                                      ? "mdi mdi-fridge-industrial-outline align-bottom me-1"
                                                      : "mdi mdi-fridge-off-outline align-bottom me-1"
                                                  }`}
                                                ></i>
                                                {changeColorFrigo === false
                                                  ? "Fridge"
                                                  : "No Fridge"}
                                              </span>
                                            </button>
                                          </div>
                                        </Col>
                                        {/* Smart_Screen  == Done */}
                                        <Col lg={3}>
                                          <div className="mb-3">
                                            <button
                                              type="button"
                                              onClick={handleClickScreen}
                                              className={`btn btn-darken-success custom-toggle btn-sm ${
                                                changeColorScreen === false
                                                  ? "btn-darken-success"
                                                  : "btn-darken-danger"
                                              }`}
                                              data-bs-toggle="button"
                                            >
                                              <span className="icon-on">
                                                <i
                                                  className={`${
                                                    changeColorScreen === false
                                                      ? "mdi mdi-monitor align-bottom me-1"
                                                      : "mdi mdi-monitor-off align-bottom me-1"
                                                  }`}
                                                ></i>
                                                {changeColorScreen === false
                                                  ? "Smart Screen"
                                                  : "No Smart Screen"}
                                              </span>
                                            </button>
                                          </div>
                                        </Col>
                                        {/* Air_Conditionner  == Done */}
                                        <Col lg={3}>
                                          <div className="mb-3">
                                            <button
                                              type="button"
                                              onClick={handleClickAC}
                                              className={`btn btn-darken-success custom-toggle btn-sm ${
                                                changeColorAC === false
                                                  ? "btn-darken-success"
                                                  : "btn-darken-danger"
                                              }`}
                                              data-bs-toggle="button"
                                            >
                                              <span className="icon-on">
                                                <i
                                                  className={`${
                                                    changeColorAC === false
                                                      ? "mdi mdi-air-purifier align-bottom me-1"
                                                      : "mdi mdi-snowflake-off align-bottom me-1"
                                                  }`}
                                                ></i>
                                                {changeColorAC === false
                                                  ? "Air Conditioned"
                                                  : "No Air Conditioner"}
                                              </span>
                                            </button>
                                          </div>
                                        </Col>
                                        {/* Automatic  == Done */}
                                        <Col lg={2}>
                                          <div className="mb-3">
                                            <button
                                              type="button"
                                              onClick={handleClickAutomatic}
                                              className={`btn btn-darken-success custom-toggle btn-sm ${
                                                changeColorAutomatic === false
                                                  ? "btn-darken-success"
                                                  : "btn-darken-danger"
                                              }`}
                                              data-bs-toggle="button"
                                            >
                                              <span className="icon-on">
                                                <i
                                                  className={`fs-11 ${
                                                    changeColorAutomatic ===
                                                    false
                                                      ? "mdi mdi-arrow-decision-auto-outline align-bottom me-1"
                                                      : "mdi mdi-car-shift-pattern align-bottom me-1"
                                                  }`}
                                                ></i>
                                                {changeColorAutomatic === false
                                                  ? "Automatic"
                                                  : "Manual"}
                                              </span>
                                            </button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Row>
                                  </Form>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="profile1">
                        <Row>
                          <Col lg={12}>
                            <Card>
                              <Card.Body>
                                <div className="mb-3">
                                  <Form className="tablelist-form">
                                    <input type="hidden" id="id-field" />
                                    <Row>
                                      <Col lg={6}>
                                        <table>
                                          {/* MOT Expiry  == Done */}
                                          <tr>
                                            <td>
                                              <span className="fw-bold">
                                                MOT Expiry
                                              </span>
                                            </td>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control mb-2"
                                                id="exampleInputdate"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td> </td>
                                            <td>
                                              <input
                                                className="form-control mb-2"
                                                type="file"
                                                id="formFile"
                                              />
                                            </td>
                                          </tr>
                                          {/* Tax Expiry  == Done */}
                                          <tr>
                                            <td className="fw-bold">
                                              Tax Expiry
                                            </td>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control mb-2"
                                                id="exampleInputdate"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <input
                                                className="form-control mb-2"
                                                type="file"
                                                id="formFile"
                                              />
                                            </td>
                                          </tr>
                                          {/* Insurance Expiry == Done */}
                                          <tr>
                                            <td className="fw-bold">
                                              Insurance Expiry
                                            </td>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control mb-2"
                                                id="exampleInputdate"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <input
                                                className="form-control mb-2"
                                                type="file"
                                                id="formFile"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Inspection Due
                                            </td>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control mb-2"
                                                id="exampleInputdate"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Service Due
                                            </td>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control mb-2"
                                                id="exampleInputdate"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Tacho calibration Due
                                            </td>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control"
                                                id="exampleInputdate"
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </Col>
                                      <Col lg={6}>
                                        <table>
                                          <tr>
                                            <td className="fw-bold">
                                              COIF Certificate Number
                                            </td>
                                            <td>
                                              <Form.Control
                                                type="text"
                                                id="supplierName-field"
                                                className="form-control mb-2"
                                                // placeholder="Enter owner name"
                                                required
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              COIF Certificate Date
                                            </td>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control mb-2"
                                                id="exampleInputdate"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              HP Start Date
                                            </td>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control mb-2"
                                                id="exampleInputdate"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              HP End Date
                                            </td>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control mb-2"
                                                id="exampleInputdate"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              HP Reference No
                                            </td>
                                            <td>
                                              <Form.Control
                                                type="text"
                                                id="supplierName-field"
                                                className="form-control mb-2"
                                                // placeholder="Enter owner name"
                                                required
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Monthly Repayment amount
                                            </td>
                                            <td>
                                              <Form.Control
                                                type="number"
                                                className="form-control mb-2"
                                                id="supplierName-field"
                                                placeholder="£"
                                                required
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              HP Company
                                            </td>
                                            <td>
                                              <Form.Control
                                                type="text"
                                                id="supplierName-field"
                                                className="form-control"
                                                // placeholder="Enter owner name"
                                                required
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </Col>
                                    </Row>
                                  </Form>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Row>
          </form>
          <Modal
            className="fade zoomIn"
            size="sm"
            show={modal_AddExtra}
            onHide={() => {
              tog_AddExtra();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Add New Vehicle Extra
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <div
                id="alert-error-msg"
                className="d-none alert alert-danger py-2"
              ></div>
              <Form className="tablelist-form">
                <input type="hidden" id="id-field" />
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label htmlFor="customerName-field">
                        Extra Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="customerName-field"
                        // placeholder="Enter Limit"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-ghost-danger"
                        onClick={() => {
                          tog_AddExtra();
                        }}
                        data-bs-dismiss="modal"
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Close
                      </Button>
                      <Button variant="primary" id="add-btn">
                        Add
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditVehicle;
