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
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import {
  useAddNewExtraMutation,
  useGetAllExtrasQuery,
} from "features/VehicleExtraLuxury/extraSlice";
import { useAddNewVehicleMutation } from "features/Vehicles/vehicleSlice";
import Dropzone from "react-dropzone";

const AddNewVehicle = () => {
  document.title = "Create Vehicle | Bouden Coach Travel";

  const [selectedColor, setSelectedColor] = useState<string>("#ffffff");

  const { data: AllExtraOptions = [] } = useGetAllExtrasQuery();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = event.currentTarget.selectedOptions;

    const newColors = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      newColors.push(selectedOptions[i].value);
    }

    setSelectedValues(newColors);
  };

  // Registration Date
  const [selectedRegistrationDate, setSelectedRegistrationDate] =
    useState<Date | null>(null);
  const handleRegistrationDateChange = (selectedDates: Date[]) => {
    setSelectedRegistrationDate(selectedDates[0]);
  };

  // Purchase Date
  const [selectedPurchaseDate, setSelectedPurchaseDate] = useState<Date | null>(
    null
  );
  const handlePurchaseDateChange = (selectedDates: Date[]) => {
    setSelectedPurchaseDate(selectedDates[0]);
  };

  // Sale Date
  const [selectedSaleDate, setSelectedSaleDate] = useState<Date | null>(null);
  const handleSaleDateChange = (selectedDates: Date[]) => {
    setSelectedSaleDate(selectedDates[0]);
  };

  // MOT Expiry
  const [selectedMOTExpiry, setSelectedMOTExpiry] = useState<Date | null>(null);
  const handleMOTExpiryChange = (selectedDates: Date[]) => {
    setSelectedMOTExpiry(selectedDates[0]);
  };

  // Tax Expiry
  const [selectedTaxExpiry, setSelectedTaxExpiry] = useState<Date | null>(null);
  const handleTaxExpiryChange = (selectedDates: Date[]) => {
    setSelectedTaxExpiry(selectedDates[0]);
  };

  // Insurance Expiry
  const [selectedInsuranceExpiry, setSelectedInsuranceExpiry] =
    useState<Date | null>(null);
  const handleInsuranceExpiryChange = (selectedDates: Date[]) => {
    setSelectedInsuranceExpiry(selectedDates[0]);
  };

  // Insurance Due
  const [selectedInsuranceDue, setSelectedInsuranceDue] = useState<Date | null>(
    null
  );
  const handleInsuranceDueChange = (selectedDates: Date[]) => {
    setSelectedInsuranceDue(selectedDates[0]);
  };

  // Service Due
  const [selectedServiceDue, setSelectedServiceDue] = useState<Date | null>(
    null
  );
  const handleServiceDueChange = (selectedDates: Date[]) => {
    setSelectedServiceDue(selectedDates[0]);
  };

  // Tacho Calibration Due
  const [selectedTachoCalibrationDue, setSelectedTachoCalibrationDue] =
    useState<Date | null>(null);
  const handleTachoCalibrationDueChange = (selectedDates: Date[]) => {
    setSelectedTachoCalibrationDue(selectedDates[0]);
  };

  // COIF Certificate Date
  const [selectedCOIFCertificateDate, setSelectedCOIFCertificateDate] =
    useState<Date | null>(null);
  const handleCOIFCertificateDateChange = (selectedDates: Date[]) => {
    setSelectedCOIFCertificateDate(selectedDates[0]);
  };

  // HP Start Date
  const [selectedHPStartDate, setSelectedHPStartDate] = useState<Date | null>(
    null
  );
  const handleHPStartDateChange = (selectedDates: Date[]) => {
    setSelectedHPStartDate(selectedDates[0]);
  };

  // HP End Date
  const [selectedHPEndDate, setSelectedHPEndDate] = useState<Date | null>(null);
  const handleHPEndDateChange = (selectedDates: Date[]) => {
    setSelectedHPEndDate(selectedDates[0]);
  };

  const [selectedModel, setSelectedModel] = useState<string>("");
  // This function is triggered when the select Model
  const handleSelectModel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedModel(value);
  };

  const [selectedVehicleType, setSelectedVehicletype] = useState<string>("");
  // This function is triggered when the select Vehicle Type
  const handleSelectVehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicletype(value);
  };

  const [selectedMaxPassenger, setSelectedMaxPassenger] = useState<string>("");
  // This function is triggered when the select Max Passenger
  const handleSelectMaxPassenger = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedMaxPassenger(value);
  };

  const [selectedDepotName, setSelectedDepotName] = useState<string>("");
  // This function is triggered when the select Max Passenger
  const handleSelectDepotName = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedDepotName(value);
  };

  const [selectedStatus, setSelectedStatus] = useState<string>("");
  // This function is triggered when the select Max Passenger
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  const [selectedFuelType, setSelectedFuelType] = useState<string>("");
  // This function is triggered when the select Max Passenger
  const handleSelectFuelType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedFuelType(value);
  };

  const [selectedSpeedLimit, setSelectedSpeedLimit] = useState<string>("");
  // This function is triggered when the select Max Passenger
  const handleSelectSpeedLimit = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedSpeedLimit(value);
  };

  const [selectInsuranceType, setSelectedInsuranceType] = useState<string>("");
  // This function is triggered when the select Insurance Type
  const handleSelectInsuranceType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedInsuranceType(value);
  };

  const [selectOwnership, setSelectedOwnership] = useState<string>("");
  // This function is triggered when the select Ownership
  const handleSelectOwnership = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedOwnership(value);
  };

  const navigate = useNavigate();
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Vehicle is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyExtraOption = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Extra Option is created successfully",
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

  const notifyErrorExtraOption = (err: any) => {
    Swal.fire({
      position: "top-right",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

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

  const [modal_AddExtra, setmodal_AddExtra] = useState<boolean>(false);
  function tog_AddExtra() {
    setmodal_AddExtra(!modal_AddExtra);
  }

  const [createExtra] = useAddNewExtraMutation();
  const initialExtraOption = {
    name: "",
  };

  const [extraOption, setExtraOption] = useState(initialExtraOption);

  const { name } = extraOption;

  const onChangeExtraOption = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExtraOption((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitExtraOption = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createExtra(extraOption)
        .then(() => setExtraOption(initialExtraOption))
        .then(() => notifyExtraOption())
        .then(() => setmodal_AddExtra(!modal_AddExtra));
    } catch (error) {
      notifyErrorExtraOption(error);
    }
  };

  const [createVehicle] = useAddNewVehicleMutation();

  const initialVehicle = {
    registration_number: "",
    model: "",
    color: "",
    type: "",
    max_passengers: "",
    fleet_number: "",
    engine_number: "",
    sale_date: "",
    purchase_price: "",
    purchase_date: "",
    depot_name: "",
    registration_date: "",
    mileage: "",
    statusVehicle: "",
    manufacturer: "",
    engine_size: "",
    fuel_type: "",
    speed_limit: "",
    insurance_type: "",
    insurance_policy_number: "",
    ownership: "",
    owner_name: "",
    note: "",
    extra: [""],
    vehicle_images_base64_string: [],
    vehicle_images_extension: [],
    vehicle_images: [],
    mot_expiry: "",
    mot_file_base64_string: "",
    mot_file_extension: "",
    tax_expiry: "",
    tax_file_base64_string: "",
    tax_file_extension: "",
    insurance_file_base64_string: "",
    insurance_file_extension: "",
    inspection_due: "",
    service_due: "",
    tacho_calibration_due: "",
    coif_certificate_number: "",
    coif_certificate_date: "",
    hp_start_date: "",
    hp_end_date: "",
    hp_reference_no: "",
    monthly_repayment_amount: "",
    hp_company: "",
    mot_file: "",
    tax_file: "",
    insurance_file: "",
    insurance_expiry: "",
  };

  const [vehicle, setVehicle] = useState(initialVehicle);

  const {
    registration_number,
    model,
    color,
    type,
    max_passengers,
    fleet_number,
    engine_number,
    sale_date,
    purchase_price,
    purchase_date,
    depot_name,
    registration_date,
    mileage,
    statusVehicle,
    manufacturer,
    engine_size,
    fuel_type,
    speed_limit,
    insurance_type,
    insurance_policy_number,
    ownership,
    owner_name,
    note,
    extra,
    vehicle_images_base64_string,
    vehicle_images_extension,
    vehicle_images,
    mot_expiry,
    mot_file_base64_string,
    mot_file_extension,
    tax_expiry,
    tax_file_base64_string,
    tax_file_extension,
    insurance_file_base64_string,
    insurance_file_extension,
    inspection_due,
    service_due,
    tacho_calibration_due,
    coif_certificate_number,
    coif_certificate_date,
    hp_start_date,
    hp_end_date,
    hp_reference_no,
    monthly_repayment_amount,
    hp_company,
    mot_file,
    tax_file,
    insurance_file,
    insurance_expiry,
  } = vehicle;

  const onChangeVehicle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVehicle((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // Mot File
  const handleVehicleImagesUpload = async (files: File[]) => {
    const base64Images = await Promise.all(
      files.map(async (file: File) => {
        const { base64Data, extension } = await convertToBase64(file);
        return {
          base64Data,
          extension,
          fileName: file.name,
        };
      })
    );

    setVehicle((prevState: any) => ({
      ...prevState,
      vehicle_images: base64Images.map(
        (img) => `data:image/${img.extension};base64,${img.base64Data}`
      ),
      vehicle_images_base64_string: base64Images.map((img) => img.base64Data),
      vehicle_images_extension: base64Images.map((img) => img.extension),
    }));
  };

  const handleDeleteFile = (indexToRemove: number) => {
    setVehicle((prevData) => {
      const newGallery = prevData.vehicle_images?.filter(
        (_, index) => index !== indexToRemove
      );
      const newGalleryBase64Strings =
        prevData.vehicle_images_base64_string?.filter(
          (_, index) => index !== indexToRemove
        );
      const newGalleryExtension = prevData.vehicle_images_extension?.filter(
        (_, index) => index !== indexToRemove
      );

      return {
        ...prevData,
        vehicle_images: newGallery,
        vehicle_images_base64_string: newGalleryBase64Strings,
        vehicle_images_extension: newGalleryExtension,
      };
    });
  };

  // Mot File
  const handleMotFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("mot_file_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const motfile = base64Data + "." + extension;
      console.log(motfile);
      setVehicle({
        ...vehicle,
        mot_file: motfile,
        mot_file_base64_string: base64Data,
        mot_file_extension: extension,
      });
    }
  };

  // Tax File
  const handleFileTaxFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("tax_file_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const taxfile = base64Data + "." + extension;
      console.log(taxfile);
      setVehicle({
        ...vehicle,
        tax_file: taxfile,
        tax_file_base64_string: base64Data,
        tax_file_extension: extension,
      });
    }
  };

  // insurance_file_base64_string
  const handleFileInsurance = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("insurance_file_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const insurancefile = base64Data + "." + extension;
      console.log(insurancefile);
      setVehicle({
        ...vehicle,
        insurance_file: insurancefile,
        insurance_file_base64_string: base64Data,
        insurance_file_extension: extension,
      });
    }
  };

  const onSubmitVehicle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      vehicle["registration_date"] = selectedRegistrationDate!.toDateString();
      vehicle["purchase_date"] = selectedPurchaseDate!.toDateString();
      vehicle["sale_date"] = selectedSaleDate!.toDateString();
      vehicle["mot_expiry"] = selectedMOTExpiry!.toDateString();
      vehicle["tax_expiry"] = selectedTaxExpiry!.toDateString();
      vehicle["insurance_expiry"] = selectedInsuranceExpiry!.toDateString();
      vehicle["inspection_due"] = selectedInsuranceDue!.toDateString();
      vehicle["service_due"] = selectedServiceDue!.toDateString();
      vehicle["tacho_calibration_due"] =
        selectedTachoCalibrationDue!.toDateString();
      vehicle["coif_certificate_date"] =
        selectedCOIFCertificateDate!.toDateString();
      vehicle["hp_start_date"] = selectedHPStartDate!.toDateString();
      vehicle["hp_end_date"] = selectedHPEndDate!.toDateString();
      vehicle["model"] = selectedModel;
      vehicle["type"] = selectedVehicleType;
      vehicle["max_passengers"] = selectedMaxPassenger;
      vehicle["depot_name"] = selectedDepotName;
      vehicle["statusVehicle"] = selectedStatus;
      vehicle["fuel_type"] = selectedFuelType;
      vehicle["speed_limit"] = selectedSpeedLimit;
      vehicle["insurance_type"] = selectInsuranceType;
      vehicle["ownership"] = selectOwnership;
      vehicle["extra"] = selectedValues;
      createVehicle(vehicle)
        .then(() => setVehicle(initialVehicle))
        .then(() => notifySuccess())
        .then(() => navigate("/vehicles"));
    } catch (error) {
      notifyError(error);
    }
  };

  const { data = [] } = useGetAllVehicleTypesQuery();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Card>
              <Card.Body>
                <Form onSubmit={onSubmitVehicle}>
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
                                  <Row>
                                    <Row className="mb-2">
                                      <Col
                                        lg={12}
                                        className="d-flex justify-content-center mb-3"
                                      >
                                        <Form.Label htmlFor="vehicle_images_base64_string">
                                          Vehicle Images
                                        </Form.Label>
                                      </Col>
                                      <Col lg={12}>
                                        <Dropzone
                                          onDrop={(acceptedFiles) =>
                                            handleVehicleImagesUpload(
                                              acceptedFiles
                                            )
                                          }
                                        >
                                          {({
                                            getRootProps,
                                            getInputProps,
                                          }) => (
                                            <div
                                              className="dropzone dz-clickable text-center"
                                              {...getRootProps()}
                                            >
                                              <div className="dz-message needsclick">
                                                <div className="mb-3">
                                                  <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                                </div>
                                                <h5>
                                                  Drop photos here or click to
                                                  upload.
                                                </h5>
                                              </div>
                                              <input {...getInputProps()} />
                                            </div>
                                          )}
                                        </Dropzone>
                                        <div className="mt-3">
                                          {vehicle.vehicle_images?.map(
                                            (image, index) => (
                                              <div
                                                key={index}
                                                className="image-preview"
                                              >
                                                <img
                                                  src={image}
                                                  alt={`Image ${index + 1}`}
                                                  className="img-thumbnail"
                                                />
                                                <Button
                                                  variant="danger"
                                                  size="sm"
                                                  onClick={() =>
                                                    handleDeleteFile(index)
                                                  }
                                                >
                                                  Delete
                                                </Button>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      {/* Vehicle reg  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="registration_number">
                                            Vehicle reg
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            id="registration_number"
                                            placeholder="Enter vehicle registration number"
                                            name="registration_number"
                                            onChange={onChangeVehicle}
                                            value={vehicle.registration_number}
                                          />
                                        </div>
                                      </Col>
                                      {/* Vehicle make/model  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="model">
                                            Vehicle make/model
                                          </Form.Label>
                                          <select
                                            className="form-select text-muted"
                                            name="model"
                                            id="model"
                                            onChange={handleSelectModel}
                                          >
                                            <option value="">Model</option>
                                            <option value="Tesla">Tesla</option>
                                            <option value="BMW">BMW</option>
                                            <option value="Ford">Ford</option>
                                            <option value="Porsche">
                                              Porsche
                                            </option>
                                            <option value="Bentley">
                                              Bentley
                                            </option>
                                            <option value="Toyota">
                                              Toyota
                                            </option>
                                            <option value="Audi">Audi</option>
                                            <option value="Jeep">Jeep</option>
                                            <option value="Jaguar">
                                              Jaguar
                                            </option>
                                            <option value="Rolls-Royce">
                                              Rolls-Royce
                                            </option>
                                            <option value="Mercedes-Benz">
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
                                          <Form.Label htmlFor="color">
                                            Vehicle color
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            id="color"
                                            placeholder="Enter vehicle color"
                                            name="color"
                                            onChange={onChangeVehicle}
                                            value={vehicle.color}
                                          />
                                        </div>
                                      </Col>
                                      {/* <Col lg={6}> <HexColorPicker color={selectedColor} onChange={handleColorChange} /> */}
                                      {/* </Col> */}
                                    </Row>
                                    <Row>
                                      {/* Vehicle_Type  == Done */}
                                      <Col lg={12}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="type">
                                            Vehicle Type
                                          </Form.Label>
                                          <select
                                            className="form-select text-muted"
                                            name="type"
                                            id="type"
                                            onChange={handleSelectVehicleType}
                                          >
                                            <option value="">Type</option>
                                            {data.map((vehicleType) => (
                                              <option
                                                value={`${vehicleType.type}`}
                                              >
                                                {vehicleType.type}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      {/*Max_Passenger  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="max_passengers">
                                            Max Passenger
                                          </Form.Label>
                                          <select
                                            className="form-select text-muted"
                                            name="max_passengers"
                                            id="max_passengers"
                                            onChange={handleSelectMaxPassenger}
                                          >
                                            <option value="">Select</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
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
                                          <Form.Label htmlFor="fleet_number">
                                            Fleet Number
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            id="fleet_number"
                                            name="fleet_number"
                                            // placeholder="Enter serial number"
                                            onChange={onChangeVehicle}
                                            value={vehicle.fleet_number}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      {/* Engine_number == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="engine_number">
                                            Engine number
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            id="engine_number"
                                            name="engine_number"
                                            // placeholder="Enter serial number"
                                            onChange={onChangeVehicle}
                                            value={vehicle.engine_number}
                                          />
                                        </div>
                                      </Col>
                                      {/* Mileage / KM == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="mileage">
                                            Mileage / KM
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            id="mileage"
                                            name="mileage"
                                            // placeholder="Enter serial number"
                                            onChange={onChangeVehicle}
                                            value={vehicle.mileage}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      {/* Registration_Date  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="registration_date">
                                            Registration Date
                                          </Form.Label>
                                          <Flatpickr
                                            className="form-control flatpickr-input"
                                            value={selectedRegistrationDate!}
                                            onChange={
                                              handleRegistrationDateChange
                                            }
                                            placeholder="Select Date"
                                            options={{
                                              dateFormat: "d M, Y",
                                            }}
                                            id="registration_date"
                                            name="registration_date"
                                          />
                                        </div>
                                      </Col>
                                      {/* Depot_name  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="depot_name">
                                            Depot name
                                          </Form.Label>
                                          <select
                                            className="form-select text-muted"
                                            name="depot_name"
                                            id="depot_name"
                                            onChange={handleSelectDepotName}
                                          >
                                            <option value="">
                                              Select Depot
                                            </option>
                                            <option
                                              value="Brimingham, West Midlands B35
                                              7BT, UK"
                                            >
                                              Brimingham, West Midlands B35 7BT,
                                              UK
                                            </option>
                                          </select>
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      {/* Purchase_date  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="purchase_date">
                                            Purchase Date
                                          </Form.Label>
                                          <Flatpickr
                                            value={selectedPurchaseDate!}
                                            onChange={handlePurchaseDateChange}
                                            className="form-control flatpickr-input"
                                            placeholder="Select Date"
                                            options={{
                                              dateFormat: "d M, Y",
                                            }}
                                            id="purchase_date"
                                            name="purchase_date"
                                          />
                                        </div>
                                      </Col>
                                      {/* Purchase_price  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="purchase_price">
                                            Purchase Price
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            id="purchase_price"
                                            name="purchase_price"
                                            // placeholder="Enter serial number"
                                            onChange={onChangeVehicle}
                                            value={vehicle.purchase_price}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </Row>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col lg={6}>
                            <Card>
                              <Card.Body>
                                <div className="mb-3">
                                  <Row>
                                    <Row>
                                      {/* Sale_date  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="sale_date">
                                            Sale Date
                                          </Form.Label>
                                          <Flatpickr
                                            value={selectedSaleDate!}
                                            onChange={handleSaleDateChange}
                                            className="form-control flatpickr-input"
                                            placeholder="Select Date"
                                            options={{
                                              dateFormat: "d M, Y",
                                            }}
                                            id="sale_date"
                                            name="sale_date"
                                          />
                                        </div>
                                      </Col>
                                      {/* Status  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="statusVehicle">
                                            Status
                                          </Form.Label>
                                          <select
                                            className="form-select text-muted"
                                            name="statusVehicle"
                                            id="statusVehicle"
                                            onChange={handleSelectStatus}
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
                                    <Row>
                                      {/* Manufacturer  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            htmlFor="manufacturer"
                                            className="form-label"
                                          >
                                            Manufacturer
                                          </label>
                                          <Form.Control
                                            type="text"
                                            id="manufacturer"
                                            name="manufacturer"
                                            // placeholder="Enter owner name"
                                            onChange={onChangeVehicle}
                                            value={vehicle.manufacturer}
                                          />
                                        </div>
                                      </Col>
                                      {/* Engine_Size  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            htmlFor="engine_size"
                                            className="form-label"
                                          >
                                            Engine Size
                                          </label>
                                          <Form.Control
                                            type="text"
                                            id="engine_size"
                                            name="engine_size"
                                            // placeholder="Enter owner name"
                                            onChange={onChangeVehicle}
                                            value={vehicle.engine_size}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      {/* Fuel_Type  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            htmlFor="fuel_type"
                                            className="form-label"
                                          >
                                            Fuel Type
                                          </label>
                                          <select
                                            className="form-select text-muted"
                                            name="fuel_type"
                                            id="fuel_type"
                                            onChange={handleSelectFuelType}
                                          >
                                            <option value="">Type</option>
                                            <option value="Diesel">
                                              Diesel
                                            </option>
                                            <option value="Gazoile">
                                              Gazoile
                                            </option>
                                            <option value="Hybrid">
                                              Hybrid
                                            </option>
                                            <option value="Full Electric">
                                              Full Electric
                                            </option>
                                          </select>
                                        </div>
                                      </Col>
                                      {/* Speed_Limit  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            htmlFor="speed_limit"
                                            className="form-label"
                                          >
                                            Speed Limit
                                          </label>
                                          <select
                                            className="form-select text-muted"
                                            name="speed_limit"
                                            id="speed_limit"
                                            onChange={handleSelectSpeedLimit}
                                          >
                                            <option value="">Limit</option>
                                            <option value="60mph">60mph</option>
                                            <option value="100mph">
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
                                            htmlFor="insurance_type"
                                            className="form-label"
                                          >
                                            Insurance type
                                          </label>
                                          <select
                                            className="form-select text-muted"
                                            name="insurance_type"
                                            id="insurance_type"
                                            onChange={handleSelectInsuranceType}
                                          >
                                            <option value="">Select</option>
                                            <option value="Fully comprehensive">
                                              Fully comprehensive
                                            </option>
                                            <option value="Third party">
                                              Third party
                                            </option>
                                            <option value="Third party, fire and theft">
                                              Third party, fire and theft
                                            </option>
                                          </select>
                                        </div>
                                      </Col>
                                      {/* Insurance_policy_number  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            htmlFor="insurance_policy_number"
                                            className="form-label"
                                          >
                                            Insurance Policy Number
                                          </label>
                                          <Form.Control
                                            type="text"
                                            id="insurance_policy_number"
                                            name="insurance_policy_number"
                                            onChange={onChangeVehicle}
                                            value={
                                              vehicle.insurance_policy_number
                                            }
                                            // placeholder="Enter owner name"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      {/*  Ownership  == Done */}
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ownership"
                                            className="form-label"
                                          >
                                            Ownership
                                          </label>
                                          <select
                                            className="form-select text-muted"
                                            name="ownership"
                                            id="ownership"
                                            onChange={handleSelectOwnership}
                                          >
                                            <option value="">Owner</option>
                                            <option value="Owned">Owned</option>
                                            <option value="Rented">
                                              Rented
                                            </option>
                                          </select>
                                        </div>
                                      </Col>
                                      {/* Owner  == Done */}
                                      {selectOwnership &&
                                      selectOwnership === "Owned" ? (
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="owner_name"
                                              className="form-label"
                                            >
                                              Owner Name
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="owner_name"
                                              name="owner_name"
                                              // onChange={onChangeVehicle}
                                              value="Bouden Travel Ltd"
                                              // placeholder="Enter owner name"
                                            />{" "}
                                          </div>
                                        </Col>
                                      ) : (
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="owner_name"
                                              className="form-label"
                                            >
                                              Owner Name
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="owner_name"
                                              name="owner_name"
                                              onChange={onChangeVehicle}
                                              value={vehicle.owner_name}
                                              // placeholder="Enter owner name"
                                            />
                                          </div>
                                        </Col>
                                      )}
                                    </Row>
                                    <Row>
                                      {/* Note  == Done */}
                                      <Col lg={12}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="note">
                                            Note
                                          </Form.Label>
                                          <div>
                                            <textarea
                                              className="form-control"
                                              id="note"
                                              name="note"
                                              rows={3}
                                              onChange={onChangeVehicle}
                                              value={vehicle.note}
                                            ></textarea>
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      {/* Extra  == Done */}
                                      <Col lg={3}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="name">
                                            Extra
                                          </Form.Label>
                                        </div>
                                      </Col>
                                      <Col lg={9}>
                                        <div className="input-group gap-2 mb-3">
                                          <select
                                            multiple
                                            size={5}
                                            onChange={handleSelectChange}
                                            className="select"
                                          >
                                            {AllExtraOptions.map((extras) => (
                                              <option value={`${extras.name}`}>
                                                {extras.name}
                                              </option>
                                            ))}
                                          </select>
                                          <button
                                            className="btn btn-darken-success"
                                            type="button"
                                            id="extra-addon2"
                                            onClick={() => tog_AddExtra()}
                                            style={{
                                              height: "38px",
                                              borderRadius: "4px",
                                            }}
                                          >
                                            <span className="mdi mdi-plus"></span>
                                          </button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </Row>
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
                                  <Row>
                                    <Col lg={6}>
                                      <table>
                                        {/* MOT Expiry  == Done */}
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="mot_expiry">
                                              MOT Expiry
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Flatpickr
                                              value={selectedMOTExpiry!}
                                              onChange={handleMOTExpiryChange}
                                              className="form-control flatpickr-input mb-2"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                              id="mot_expiry"
                                              name="mot_expiry"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>{""}</td>
                                          <td>
                                            <input
                                              className="form-control mb-2"
                                              type="file"
                                              id="mot_file_base64_string"
                                              onChange={(e) =>
                                                handleMotFileUpload(e)
                                              }
                                            />
                                          </td>
                                        </tr>
                                        {/* Tax Expiry  == Done */}
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="tax_expiry">
                                              Tax Expiry
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Flatpickr
                                              value={selectedTaxExpiry!}
                                              onChange={handleTaxExpiryChange}
                                              className="form-control flatpickr-input mb-2"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                              id="tax_expiry"
                                              name="tax_expiry"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>{""}</td>
                                          <td>
                                            <input
                                              className="form-control mb-2"
                                              type="file"
                                              id="tax_file_base64_string"
                                              onChange={(e) =>
                                                handleFileTaxFile(e)
                                              }
                                            />
                                          </td>
                                        </tr>
                                        {/* Insurance Expiry == Done */}
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="insurance_expiry">
                                              Insurance Expiry
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Flatpickr
                                              value={selectedInsuranceExpiry!}
                                              onChange={
                                                handleInsuranceExpiryChange
                                              }
                                              className="form-control flatpickr-input mb-2"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                              id="insurance_expiry"
                                              name="insurance_expiry"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>{""}</td>
                                          <td>
                                            <input
                                              className="form-control mb-2"
                                              type="file"
                                              id="insurance_file_base64_string"
                                              onChange={(e) =>
                                                handleFileInsurance(e)
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="inspection_due">
                                              Insurance Due
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Flatpickr
                                              value={selectedInsuranceDue!}
                                              onChange={
                                                handleInsuranceDueChange
                                              }
                                              className="form-control flatpickr-input mb-2"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                              id="inspection_due"
                                              name="inspection_due"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="service_due">
                                              Service Due
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Flatpickr
                                              value={selectedServiceDue!}
                                              onChange={handleServiceDueChange}
                                              className="form-control flatpickr-input mb-2"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                              id="service_due"
                                              name="service_due"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="tacho_calibration_due">
                                              Tacho Calibration Due
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Flatpickr
                                              value={
                                                selectedTachoCalibrationDue!
                                              }
                                              onChange={
                                                handleTachoCalibrationDueChange
                                              }
                                              className="form-control flatpickr-input mb-2"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                              id="tacho_calibration_due"
                                              name="tacho_calibration_due"
                                            />
                                          </td>
                                        </tr>
                                      </table>
                                    </Col>
                                    <Col lg={6}>
                                      <table>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="coif_certificate_number">
                                              COIF Certificate Number
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Form.Control
                                              type="text"
                                              id="coif_certificate_number"
                                              className="form-control mb-2"
                                              // placeholder="Enter owner name"
                                              name="coif_certificate_number"
                                              onChange={onChangeVehicle}
                                              value={
                                                vehicle.coif_certificate_number
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="coif_certificate_date">
                                              COIF Certificate Date
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Flatpickr
                                              value={
                                                selectedCOIFCertificateDate!
                                              }
                                              onChange={
                                                handleCOIFCertificateDateChange
                                              }
                                              className="form-control flatpickr-input mb-2"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                              id="coif_certificate_date"
                                              name="coif_certificate_date"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="hp_start_date">
                                              HP Start Date
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Flatpickr
                                              value={selectedHPStartDate!}
                                              onChange={handleHPStartDateChange}
                                              className="form-control flatpickr-input mb-2"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                              id="hp_start_date"
                                              name="hp_start_date"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="hp_end_date">
                                              HP End Date
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Flatpickr
                                              value={selectedHPEndDate!}
                                              onChange={handleHPEndDateChange}
                                              className="form-control flatpickr-input mb-2"
                                              placeholder="Select Date"
                                              options={{
                                                dateFormat: "d M, Y",
                                              }}
                                              id="hp_end_date"
                                              name="hp_end_date"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="hp_reference_no">
                                              HP Reference No
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Form.Control
                                              type="text"
                                              id="hp_reference_no"
                                              className="form-control mb-2"
                                              name="hp_reference_no"
                                              // placeholder="Enter owner name"
                                              onChange={onChangeVehicle}
                                              value={vehicle.hp_reference_no}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="monthly_repayment_amount">
                                              Monthly Repayment amount
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Form.Control
                                              type="number"
                                              className="form-control mb-2"
                                              id="monthly_repayment_amount"
                                              placeholder="£"
                                              name="monthly_repayment_amount"
                                              onChange={onChangeVehicle}
                                              value={
                                                vehicle.monthly_repayment_amount
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <Form.Label htmlFor="hp_company">
                                              HP Company
                                            </Form.Label>
                                          </td>
                                          <td>
                                            <Form.Control
                                              type="text"
                                              id="hp_company"
                                              className="form-control"
                                              name="hp_company"
                                              // placeholder="Enter owner name"
                                              onChange={onChangeVehicle}
                                              value={vehicle.hp_company}
                                            />
                                          </td>
                                        </tr>
                                      </table>
                                    </Col>
                                  </Row>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                  <Card.Footer className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="d-flex justify-content-center btn btn-success btn-label"
                    >
                      <i className="ri-add-line label-icon align-middle fs-16 me-2"></i>{" "}
                      Add Vehicle
                    </button>
                  </Card.Footer>
                </Form>
              </Card.Body>
            </Card>
          </Row>
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
              <Form className="tablelist-form" onSubmit={onSubmitExtraOption}>
                <input type="hidden" id="id-field" />
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label htmlFor="name">Extra Name</Form.Label>
                      <Form.Control
                        autoFocus
                        type="text"
                        id="name"
                        name="name"
                        // placeholder="Enter Limit"
                        onChange={onChangeExtraOption}
                        value={extraOption.name}
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
                      <Button variant="primary" id="add-btn" type="submit">
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

export default AddNewVehicle;
