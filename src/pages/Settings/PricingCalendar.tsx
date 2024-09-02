import React, { useEffect, useState } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Flatpickr from "react-flatpickr";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Offcanvas } from "react-bootstrap";
import moment from "moment";
import {
  useAddNewPricingCalendarMutation,
  useDeletePricingCalendarMutation,
  useGetAllPricingCalendarsQuery,
} from "features/PricingCalendar/pricingCalendar";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import { School, useGetAllSchoolsQuery } from "features/Schools/schools";
import { Company, useGetAllCompanyQuery } from "features/Company/companySlice";
import { Visitor, useGetAllVisitorsQuery } from "features/Visitor/visitorSlice";

function convertTime12to24(time12h: string) {
  const momentTime = moment(time12h, "h:mmA");
  const convertedTime = momentTime.format("HH:mmA");
  return convertedTime;
}

interface Account {
  _id: string;
  name: string;
}

const PricingCalendar = () => {
  const { data: AllPricingCalendars = [] } = useGetAllPricingCalendarsQuery();
  const { data: AllVehicleTypes = [] } = useGetAllVehicleTypesQuery();
  const { data: AllSchools = [] } = useGetAllSchoolsQuery();
  const { data: AllCompanies = [] } = useGetAllCompanyQuery();
  const { data: AllVisitors = [] } = useGetAllVisitorsQuery();

  const [selectedAccoun, setSelectedAccoun] = useState<string>("");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedAllVehicles, setSelectedAllVehicles] = useState<string[]>([]);
  const AllAccounts = [...AllSchools, ...AllCompanies, ...AllVisitors];
  const AllVehicleAccounts = [...AllVehicleTypes];

  const pricingCalendarLocation = useLocation();

  const [showPriority, setShowPriority] = useState<boolean>(false);
  const [showVehicle, setShowVehicle] = useState<boolean>(false);

  const handleSelectAccoun = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedAccoun(value);
    if (value === "All") {
      const allAccountIds = AllAccounts.reduce((acc: string[], account) => {
        if (account._id) {
          acc.push(account.name);
        }
        return acc;
      }, []);
      setSelectedAccounts(allAccountIds);
    } else {
      setSelectedAccounts([]);
    }
  };

  const handleSelectVehicleAccounts = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicle(value);
    if (value === "All") {
      const allVehicleAccountIds = AllVehicleAccounts.reduce(
        (acc: string[], account) => {
          if (account._id) {
            acc.push(account.type);
          }
          return acc;
        },
        []
      );
      setSelectedAllVehicles(allVehicleAccountIds);
    } else {
      setSelectedAllVehicles([]);
    }
  };

  const [createNewPricingCalendar] = useAddNewPricingCalendarMutation();
  const [updatePricingCalendar] = useAddNewPricingCalendarMutation();
  const [deletePricingCalendar] = useDeletePricingCalendarMutation();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = event.currentTarget.selectedOptions;

    const newColors = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      newColors.push(selectedOptions[i].value);
    }

    setSelectedValues(newColors);
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  // Start Date
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const handleStartDateChange = (selectedDates: Date[]) => {
    setSelectedStartDate(selectedDates[0]);
  };

  let day = selectedStartDate?.toLocaleDateString("en-GB")!.slice(0, 2);
  let month = selectedStartDate?.toLocaleDateString("en-GB")!.slice(3, 5);
  let year = selectedStartDate?.toLocaleDateString("en-GB")!.slice(6, 10);
  let dateStart = day + "-" + month + "-" + year;

  // Start Time
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
  };

  const convertedStartTime = convertTime12to24(
    moment(selectedTime).format("h:mmA")
  );
  let period_start = dateStart + " " + convertedStartTime;

  // End Date
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const handleEndDateChange = (selectedDates: Date[]) => {
    setSelectedEndDate(selectedDates[0]);
  };

  let dayEnd = selectedEndDate?.toLocaleDateString("en-GB")!.slice(0, 2);
  let monthEnd = selectedEndDate?.toLocaleDateString("en-GB")!.slice(3, 5);
  let yearEnd = selectedEndDate?.toLocaleDateString("en-GB")!.slice(6, 10);
  let dateEnd = dayEnd + "-" + monthEnd + "-" + yearEnd;

  // End Time
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const handleEndTimeChange = (time: Date | null) => {
    setSelectedEndTime(time);
  };
  const convertedTime = convertTime12to24(
    moment(selectedEndTime).format("h:mmA")
  );
  let period_end = dateEnd + " " + convertedTime;

  const [selectAccount, setSelectedAccount] = useState<string>("");
  // This function is triggered when the select Account
  const handleSelectAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedAccount(value);
  };

  const [selectVehicleType, setSelectedVehicleType] = useState<string>("");
  // This function is triggered when the select Vehicle Type
  const handleSelectvehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleType(value);
  };

  const [selectPriority, setSelectedPriority] = useState<string>("");
  // This function is triggered when the select Priority
  const handleSelectPriority = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedPriority(value);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (_id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to go back?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletePricingCalendar(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Pricing Calendar is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Pricing Calendar is safe :)",
            "info"
          );
        }
      });
  };

  const notifySuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Pricing Calendar is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyUpdateSuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Pricing Calendar is updated successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyError = (err: any) => {
    Swal.fire({
      position: "top-right",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  let initialPricingCalendar = {
    name: "",
    vehicle_type: "65f2abc3be15210ec80102ab",
    uplift: "",
    days: [""],
    endTime: "",
    endDate: "",
    startTime: "",
    startDate: "",
    accountSchool: "65d72046ff0a4dc1c331ba5e",
    accountPassenger: "65ca12ee28c195acf02e2e47",
    exclusive: "",
    priority: "",
    accountCompany: "65d7368aff0a4dc1c331ba9e",
    endPeriod: "",
    startPeriod: "",
    allAccounts: [""],
    allVehicles: [""],
  };

  const [pricingCalendar, setPricingCalendar] = useState(
    initialPricingCalendar
  );

  let {
    name,
    vehicle_type,
    uplift,
    days,
    endTime,
    endDate,
    startTime,
    startDate,
    accountSchool,
    accountPassenger,
    exclusive,
    priority,
    accountCompany,
    endPeriod,
    startPeriod,
    allAccounts,
    allVehicles,
  } = pricingCalendar;

  const onChangePricingCalendar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricingCalendar((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitPricingCalendar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedVehicle === "All") {
        pricingCalendar["allVehicles"] = selectedAllVehicles;
      } else {
        pricingCalendar["vehicle_type"] = selectedVehicle;
      }
      pricingCalendar["priority"] = selectPriority;
      if (selectedAccoun === "School or University") {
        pricingCalendar["accountSchool"] = selectAccount;
      } else if (selectedAccoun === "Company") {
        pricingCalendar["accountCompany"] = selectAccount;
      } else if (selectedAccoun === "Passenger") {
        pricingCalendar["accountPassenger"] = selectAccount;
      } else {
        pricingCalendar["allAccounts"] = selectedAccounts;
      }
      pricingCalendar["startDate"] = dateStart;
      pricingCalendar["endDate"] = dateEnd;
      pricingCalendar["startTime"] = moment(selectedTime).format("h:mm:ss a");
      pricingCalendar["endTime"] = moment(selectedEndTime).format("h:mm:ss a");
      pricingCalendar["days"] = selectedValues;
      pricingCalendar["startPeriod"] = period_start;
      pricingCalendar["endPeriod"] = period_end;
      if (isChecked) {
        pricingCalendar["exclusive"] = "Exclusive";
      } else {
        pricingCalendar["exclusive"] = "Not Exclusive";
      }
      createNewPricingCalendar(pricingCalendar)
        .then(() => notifySuccess())
        .then(() => setPricingCalendar(initialPricingCalendar));
    } catch (error) {
      notifyError(error);
    }
  };

  const [calendarName, setCalendarName] = useState<string>("");
  const [calendarUplift, setCalendarUplift] = useState<string>("");
  const [calendarId, setCalendarId] = useState<string>("");

  useEffect(() => {
    if (pricingCalendarLocation?.state) {
      setCalendarId(pricingCalendarLocation.state._id || "");
      setCalendarName(pricingCalendarLocation.state.name || "");
      setCalendarUplift(pricingCalendarLocation.state.uplift || "");
    }
  }, [pricingCalendarLocation]);

  const handleCalendarName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCalendarName(e.target.value);
  };

  const handleCalendarUplift = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCalendarUplift(e.target.value);
  };

  const onSubmitUpdatePricingCalendar = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      updatePricingCalendar(pricingCalendar)
        .then(() => notifySuccess())
        .then(() => setPricingCalendar(initialPricingCalendar));
    } catch (error) {
      notifyError(error);
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Priority</span>,
      selector: (row: any) => row.priority,
      sortable: true,
      width: "74px",
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.name,
      sortable: true,
      width: "142px",
    },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row: any) => {
        return (
          <div>
            <span className="fw-bold">{row.startDate} </span>
            <span>at</span>
            <span className="fw-bold"> {row.startTime} </span>
          </div>
        );
      },
      sortable: true,
      width: "220px",
    },
    {
      name: <span className="font-weight-bold fs-13">To</span>,
      selector: (row: any) => {
        return (
          <div>
            <span className="fw-bold"> {row.endDate} </span>
            <span>at</span>
            <span className="fw-bold"> {row.endTime}</span>
          </div>
        );
      },
      sortable: true,
      width: "220px",
    },
    {
      name: <span className="font-weight-bold fs-13">Days</span>,
      selector: (row: any) => {
        return (
          <ul className="list-unstyled mb-0">
            {row.days.map((day: any, index: number) => (
              <li key={index}>{day}</li>
            ))}
          </ul>
        );
      },
      sortable: true,
      width: "120px",
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicles</span>,
      selector: (row: any) => row.vehicle_type?.type!,
      sortable: true,
      width: "180px",
    },
    {
      name: <span className="font-weight-bold fs-13">Uplift</span>,
      selector: (row: any) => row.uplift + "%",
      sortable: true,
      width: "75px",
    },
    {
      name: <span className="font-weight-bold fs-13">Exclusive</span>,
      selector: (row: any) => row.exclusive,
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      width: "140px",
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0" key={row?._id!}>
            <li onClick={toggleRightCanvas}>
              <Link
                to="#"
                className="badge badge-soft-info edit-item-btn"
                state={row}
              >
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-success edit-item-btn"
                state={row}
                onClick={tog_UpdateCalendar}
              >
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(row?._id!)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const [modal_AddCalendar, setmodal_AddCalendar] = useState<boolean>(false);
  function tog_AddCalendar() {
    setmodal_AddCalendar(!modal_AddCalendar);
  }

  const [modal_UpdateCalendar, setmodal_UpdateCalendar] =
    useState<boolean>(false);
  function tog_UpdateCalendar() {
    setmodal_UpdateCalendar(!modal_UpdateCalendar);
  }

  const [isRight, setIsRight] = useState(false);

  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredForceJourney = () => {
    let filteredForceJourney = AllPricingCalendars;
    if (searchTerm) {
      filteredForceJourney = filteredForceJourney.filter(
        (forceJourney: any) =>
          (forceJourney?.car?.type! &&
            forceJourney?.car
              ?.type!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (forceJourney?.miles! &&
            forceJourney
              ?.miles!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (forceJourney?.percentage! &&
            forceJourney
              ?.percentage!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (forceJourney?.hours_wait! &&
            forceJourney
              ?.hours_wait!.toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }
    return filteredForceJourney;
  };

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card id="shipmentsList">
          <Card.Header className="border-bottom-dashed">
            <Row className="g-3">
              <Col xxl={3} lg={6}>
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Search for something..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </Col>
              <Col lg={7}></Col>
              <Col>
                <div
                  className="btn-group btn-group-sm mt-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => tog_AddCalendar()}
                  >
                    <i
                      className="ri-calendar-event-line align-middle"
                      style={{ fontSize: "21px" }}
                    ></i>{" "}
                    <span className="fs-13">New Pricing Calendar</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={AllPricingCalendars}
              pagination
            />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="lg"
        show={modal_AddCalendar}
        onHide={() => {
          tog_AddCalendar();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Add New Pricing Calendar
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitPricingCalendar}>
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    onChange={onChangePricingCalendar}
                    value={pricingCalendar.name}
                  />
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Form.Label htmlFor="priority">Priority</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="priority"
                    id="priority"
                    onChange={handleSelectPriority}
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
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
                  </select>
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field">
                    Exclusive
                  </Form.Label>
                  <div className="form-check m-2">
                    <Form.Control
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck1"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Form.Label htmlFor="account">Account Type</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="account"
                    id="account"
                    onChange={handleSelectAccoun}
                  >
                    <option value="">Select</option>
                    <option value="School or University">
                      School or University
                    </option>
                    <option value="Company">Company</option>
                    <option value="Passenger">Passenger</option>
                    <option value="All">All</option>
                  </select>
                </div>
              </Col>
              {selectedAccoun === "School or University" && (
                <Col lg={8}>
                  <div className="mb-3">
                    <Form.Label htmlFor="customerName-field">
                      Account
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="choices-single-default"
                      id="statusSelect"
                      onChange={handleSelectAccount}
                    >
                      <option value="">Select</option>
                      {AllSchools.map((schools) => (
                        <option value={schools?._id!} key={schools?._id!}>
                          {schools.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              )}
              {selectedAccoun === "Company" && (
                <Col lg={8}>
                  <div className="mb-3">
                    <Form.Label htmlFor="customerName-field">
                      Account
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="choices-single-default"
                      id="statusSelect"
                      onChange={handleSelectAccount}
                    >
                      <option value="Brit Coaches Ltd">Select</option>
                      {AllCompanies.map((companies) => (
                        <option value={companies?._id!} key={companies?._id!}>
                          {companies.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              )}
              {selectedAccoun === "Passenger" && (
                <Col lg={8}>
                  <div className="mb-3">
                    <Form.Label htmlFor="customerName-field">
                      Account
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="choices-single-default"
                      id="statusSelect"
                      onChange={handleSelectAccount}
                    >
                      <option value="Brit Coaches Ltd">Select</option>
                      {AllVisitors.map((visitors) => (
                        <option value={visitors?._id!} key={visitors?._id!}>
                          {visitors.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              )}
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="startDate"></Form.Label>
                  <Flatpickr
                    className="form-control flatpickr-input"
                    placeholder="Start Date"
                    onChange={handleStartDateChange}
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    id="startDate"
                    name="startDate"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field"></Form.Label>
                  <div>
                    <DatePicker
                      selected={selectedTime}
                      onChange={handleTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                      placeholderText="Select a start time"
                      className="form-control flatpickr-input"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="endDate"></Form.Label>
                  <Flatpickr
                    className="form-control flatpickr-input"
                    placeholder="End Date"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    onChange={handleEndDateChange}
                    id="endDate"
                    name="endDate"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field"></Form.Label>
                  <div>
                    <DatePicker
                      selected={selectedEndTime}
                      onChange={handleEndTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                      placeholderText="Select an end time"
                      className="form-control flatpickr-input"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field">Days</Form.Label>
                  <div>
                    <select
                      multiple
                      size={5}
                      onChange={handleSelectChange}
                      className="form-control"
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="uplift">Uplift</Form.Label>
                  <Form.Control
                    type="text"
                    id="uplift"
                    name="uplift"
                    onChange={onChangePricingCalendar}
                    value={pricingCalendar.uplift}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">Vehicle</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="choices-single-default"
                    id="statusSelect"
                    onChange={handleSelectVehicleAccounts}
                  >
                    <option value="">Type</option>
                    <option value="All">All</option>
                    {AllVehicleTypes.map((vehicleType) => (
                      <option value={vehicleType?._id!} key={vehicleType?._id!}>
                        {vehicleType.type}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddCalendar();
                      setPricingCalendar(initialPricingCalendar);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    id="add-btn"
                    type="submit"
                    onClick={() => {
                      tog_AddCalendar();
                    }}
                  >
                    Add
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      <Offcanvas show={isRight} onHide={toggleRightCanvas} placement="end">
        <Offcanvas.Header className="border-bottom" closeButton>
          <Offcanvas.Title id="offcanvasRightLabel">
            {pricingCalendarLocation.state?.name}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 overflow-hidden">
          <div data-simplebar style={{ height: "calc(100vh - 112px)" }}>
            <div className="acitivity-timeline p-4">
              <div className="acitivity-item d-flex">
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Priority</h6>
                  <p className="text-muted mb-1">
                    {pricingCalendarLocation.state?.priority}
                  </p>
                </div>
              </div>
              <div className="acitivity-item py-2 d-flex">
                <div className="flex-shrink-0">
                  <div className="avatar-xs acitivity-avatar">
                    <div className="avatar-title bg-info-subtle text-info">
                      <i className="ri-line-chart-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Uplift</h6>
                  <p className="text-muted mb-1">
                    {pricingCalendarLocation.state?.uplift} %
                  </p>
                </div>
              </div>
              <div className="acitivity-item d-flex">
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Exclusive</h6>
                  {pricingCalendarLocation.state?.exclusive === "Exclusive" ? (
                    <span className="badge bg-primary-subtle text-primary align-middle">
                      Yes
                    </span>
                  ) : (
                    <span className="badge bg-warning-subtle text-warning align-middle">
                      No
                    </span>
                  )}
                </div>
              </div>
              <div className="acitivity-item py-2 d-flex">
                <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                  <div className="avatar-title bg-success-subtle text-success">
                    <i className="ri-time-line"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">From</h6>
                  <p className="text-muted mb-1">
                    {pricingCalendarLocation.state?.startDate} at{" "}
                    {pricingCalendarLocation.state?.startTime}
                  </p>
                </div>
              </div>
              <div className="acitivity-item py-2 d-flex">
                <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                  <div className="avatar-title bg-secondary-subtle text-success">
                    <i className="ri-time-line"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">To</h6>
                  <p className="text-muted mb-1">
                    {pricingCalendarLocation.state?.endDate} at{" "}
                    {pricingCalendarLocation.state?.endTime}
                  </p>
                </div>
              </div>
              <div className="acitivity-item py-2 d-flex">
                <div className="flex-shrink-0">
                  <div className="avatar-xs acitivity-avatar">
                    <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                      <i className="ri-car-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Vehicles </h6>
                  {pricingCalendarLocation.state?.allVehicles.length === 0 ? (
                    <p className="text-muted mb-1">
                      {pricingCalendarLocation.state?.vehicle_type?.type!}
                    </p>
                  ) : (
                    <span className="badge bg-info-subtle text-info align-middle">
                      All
                    </span>
                  )}
                </div>
              </div>
              <div className="acitivity-item py-2 d-flex">
                <div className="flex-shrink-0">
                  <div className="avatar-xs acitivity-avatar">
                    <div className="avatar-title bg-info-subtle text-info">
                      <i className="ri-list-check"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Account</h6>
                  {pricingCalendarLocation.state?.allAccounts.length !== 1 ? (
                    <span className="badge bg-primary-subtle text-primary align-middle">
                      All
                    </span>
                  ) : selectedAccoun === "School or University" ? (
                    <span className="badge bg-primary-subtle text-primary align-middle">
                      {pricingCalendarLocation.state?.accountSchool?.name!}
                    </span>
                  ) : selectedAccoun === "Company" ? (
                    <span className="badge bg-primary-subtle text-primary align-middle">
                      {pricingCalendarLocation.state?.accountCompany?.name!}
                    </span>
                  ) : (
                    <span className="badge bg-primary-subtle text-primary align-middle">
                      {pricingCalendarLocation?.state?.accountPassenger?.name!}
                    </span>
                  )}
                </div>
              </div>
              <div className="acitivity-item py-2 d-flex">
                <div className="flex-shrink-0">
                  <div className="avatar-xs acitivity-avatar">
                    <div className="avatar-title bg-white text-dark">
                      <i className="ri-list-check"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Days</h6>
                  <ul>
                    {pricingCalendarLocation.state?.days.map(
                      (day: any, index: number) => (
                        <li key={index}>
                          <small className="mb-0 text-muted">{day}</small>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        className="fade zoomIn"
        size="lg"
        show={modal_UpdateCalendar}
        onHide={() => {
          tog_UpdateCalendar();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Update Pricing Calendar
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form
            className="tablelist-form"
            onSubmit={onSubmitUpdatePricingCalendar}
          >
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleCalendarName}
                    value={calendarName}
                  />
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Form.Label htmlFor="priority">
                    Priority :{" "}
                    <span className="fs-16">
                      {pricingCalendarLocation?.state?.priority!}
                    </span>
                    <div
                      className="d-flex justify-content-start mt-n3"
                      style={{ marginLeft: "80px" }}
                    >
                      <label
                        htmlFor="id_file"
                        className="mb-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="Select company logo"
                      >
                        <span
                          className="avatar-xs d-inline-block"
                          onClick={() => setShowPriority(!showPriority)}
                        >
                          <span className="avatar-title bg-white text-success cursor-pointer">
                            <i className="bi bi-pen fs-14"></i>
                          </span>
                        </span>
                      </label>
                    </div>
                  </Form.Label>
                  {showPriority && (
                    <select
                      className="form-select text-muted"
                      name="priority"
                      id="priority"
                      onChange={handleSelectPriority}
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
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
                    </select>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field">
                    Exclusive
                  </Form.Label>
                  <div className="form-check m-2">
                    <Form.Control
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck1"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Form.Label htmlFor="account">Account Type</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="account"
                    id="account"
                    onChange={handleSelectAccoun}
                  >
                    <option value="">Select</option>
                    <option value="School or University">
                      School or University
                    </option>
                    <option value="Company">Company</option>
                    <option value="Passenger">Passenger</option>
                    <option value="All">All</option>
                  </select>
                </div>
              </Col>
              {selectedAccoun === "School or University" && (
                <Col lg={8}>
                  <div className="mb-3">
                    <Form.Label htmlFor="customerName-field">
                      Account
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="choices-single-default"
                      id="statusSelect"
                      onChange={handleSelectAccount}
                    >
                      <option value="Brit Coaches Ltd">Select</option>
                      {AllSchools.map((schools) => (
                        <option value={schools?._id!} key={schools?._id!}>
                          {schools.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              )}
              {selectedAccoun === "Company" && (
                <Col lg={8}>
                  <div className="mb-3">
                    <Form.Label htmlFor="customerName-field">
                      Account
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="choices-single-default"
                      id="statusSelect"
                      onChange={handleSelectAccount}
                    >
                      <option value="Brit Coaches Ltd">Select</option>
                      {AllCompanies.map((companies) => (
                        <option value={companies?._id!} key={companies?._id!}>
                          {companies.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              )}
              {selectedAccoun === "Passenger" && (
                <Col lg={8}>
                  <div className="mb-3">
                    <Form.Label htmlFor="customerName-field">
                      Account
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="choices-single-default"
                      id="statusSelect"
                      onChange={handleSelectAccount}
                    >
                      <option value="Brit Coaches Ltd">Select</option>
                      {AllVisitors.map((visitors) => (
                        <option value={visitors?._id!} key={visitors?._id!}>
                          {visitors.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              )}
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="startDate"></Form.Label>
                  <Flatpickr
                    className="form-control flatpickr-input"
                    placeholder="Start Date"
                    onChange={handleStartDateChange}
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    id="startDate"
                    name="startDate"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field"></Form.Label>
                  <div>
                    <DatePicker
                      selected={selectedTime}
                      onChange={handleTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                      placeholderText="Select a start time"
                      className="form-control flatpickr-input"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="endDate"></Form.Label>
                  <Flatpickr
                    className="form-control flatpickr-input"
                    placeholder="End Date"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    onChange={handleEndDateChange}
                    id="endDate"
                    name="endDate"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field"></Form.Label>
                  <div>
                    <DatePicker
                      selected={selectedEndTime}
                      onChange={handleEndTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                      placeholderText="Select a end time"
                      className="form-control flatpickr-input"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="customerName-field">Days</Form.Label>
                  <div>
                    <select
                      multiple
                      size={5}
                      onChange={handleSelectChange}
                      className="form-control"
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="uplift">Uplift</Form.Label>
                  <Form.Control
                    type="text"
                    id="uplift"
                    name="uplift"
                    onChange={handleCalendarUplift}
                    value={calendarUplift}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">Vehicle</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="choices-single-default"
                    id="statusSelect"
                    onChange={handleSelectVehicleAccounts}
                  >
                    <option value="">Type</option>
                    <option value="All">All</option>
                    {AllVehicleTypes.map((vehicleType) => (
                      <option value={vehicleType?._id!} key={vehicleType?._id!}>
                        {vehicleType.type}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_UpdateCalendar();
                      setPricingCalendar(initialPricingCalendar);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    id="add-btn"
                    type="submit"
                    onClick={() => {
                      tog_UpdateCalendar();
                    }}
                  >
                    Update
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default PricingCalendar;
