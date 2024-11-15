import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Flatpickr from "react-flatpickr";
import { useUpdateProgramMutation } from "features/Programs/programSlice";

interface Option {
  value: string;
  label: string;
}

interface RunDatesProps {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const ReturnToRunDates: React.FC<RunDatesProps> = ({ setActiveTab }) => {
  const days_of_the_week: Option[] = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const [updateProgram] = useUpdateProgramMutation();
  const location = useLocation();
  const runDatesLocation = location.state;
  const [pickUp_date, setPickUp_date] = useState<Date | null>(null);
  const [dropOff_date, setDropOff_date] = useState<Date | null>(null);
  const [free_date, setFree_date] = useState<Date[]>([]);
  const [excepted_dates, setExceptedDates] = useState<string[]>([]);

  const [programmData, setProgrammData] = useState({
    programDetails: {
      _id: "",
      programName: "",
      origin_point: {
        placeName: "",
        coordinates: {
          lat: 1,
          lng: 1,
        },
      },
      stops: [
        {
          id: "",
          address: {
            placeName: "",
            coordinates: {
              lat: 0,
              lng: 0,
            },
          },
          time: "",
        },
      ],
      destination_point: {
        placeName: "",
        coordinates: {
          lat: 1,
          lng: 1,
        },
      },
      pickUp_date: "",
      droppOff_date: "",
      freeDays_date: [""],
      exceptDays: [""],
      recommanded_capacity: "",
      extra: [""],
      notes: "",
      journeyType: "",
      dropOff_time: "",
      pickUp_Time: "",
      workDates: [""],
      company_id: "",
      school_id: "",
      invoiceFrequency: "",
      within_payment_days: "",
      total_price: "",
      unit_price: "",
      program_status: [
        {
          status: "",
          date_status: "",
        },
      ],
      tab_number: "",
      employees_groups: [""],
      students_groups: [""],
      groups_creation_mode: "",
    },
    groups: {
      type: "",
      groupCollection: [
        {
          groupName: "",
          program: "",
          vehicle_type: "",
          luggage_details: "",
          unit_price: "",
        },
      ],
    },
  });

  useEffect(() => {
    if (runDatesLocation) {
      const pickup = new Date(
        Date.parse(runDatesLocation?.program?.pickUp_date!)
      );
      setPickUp_date(pickup);
    }
  }, [runDatesLocation]);

  useEffect(() => {
    if (runDatesLocation) {
      // Check if freeDays_date is an array and parse each date
      const freeDatesArray = runDatesLocation?.program?.freeDays_date?.map(
        (dateString: string) => new Date(Date.parse(dateString))
      );
      setFree_date(freeDatesArray);
    }
  }, [runDatesLocation]);

  useEffect(() => {
    if (runDatesLocation) {
      const dropoff = new Date(
        Date.parse(runDatesLocation?.program?.droppOff_date!)
      );
      setDropOff_date(dropoff);
    }
  }, [runDatesLocation]);

  useEffect(() => {
    if (runDatesLocation && runDatesLocation?.program?.exceptDays!) {
      setExceptedDates(runDatesLocation?.program?.exceptDays!);
    }
  }, [runDatesLocation]);

  const handleChangePickupDate = (selectedDates: Date[]) => {
    setPickUp_date(selectedDates[0]);
  };

  const handleChangeDropoffDate = (selectedDates: Date[]) => {
    setDropOff_date(selectedDates[0]);
  };

  const handleChangeFreeDate = (selectedDates: Date[]) => {
    setFree_date(selectedDates);
  };

  const getWorkDates = () => {
    let workDates = [];

    let startDate = pickUp_date;
    let endDate = dropOff_date;

    if (startDate && endDate && endDate >= startDate) {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        if (
          !free_date.find(
            (freeDay) => freeDay.toDateString() === currentDate.toDateString()
          )
        ) {
          if (
            !excepted_dates.includes(
              currentDate.toLocaleString("en-us", { weekday: "long" })
            )
          ) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate().toLocaleString();

            let date =
              String(year) +
              "-" +
              String(month).padStart(2, "0") +
              "-" +
              String(day).padStart(2, "0");
            workDates.push(date);
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    return workDates;
  };

  const saveProgress = async (tabNumber: string, data: typeof programmData) => {
    data["programDetails"]["programName"] =
      runDatesLocation.program.programName;
    data["programDetails"]["destination_point"] =
      runDatesLocation.program.destination_point;
    data["programDetails"]["stops"] = runDatesLocation.program.stops;
    data["programDetails"]["origin_point"] =
      runDatesLocation.program.origin_point;
    data["programDetails"]["dropOff_time"] =
      runDatesLocation.program.dropOff_time;
    data["programDetails"]["pickUp_Time"] =
      runDatesLocation.program.pickUp_Time;
    if (runDatesLocation.program.company_id === null) {
      data["programDetails"]["school_id"] =
        runDatesLocation.program.school_id._id;
    }
    if (runDatesLocation.program.school_id === null) {
      data["programDetails"]["company_id"] =
        runDatesLocation.program.company_id._id;
    }
    data["programDetails"]["tab_number"] = tabNumber;
    data["programDetails"]["program_status"] =
      runDatesLocation.program.program_status;
    data["programDetails"]["stops"] = runDatesLocation.program.stops;

    const pickUpDate = pickUp_date
      ? `${pickUp_date.getFullYear()}-${String(
          pickUp_date.getMonth() + 1
        ).padStart(2, "0")}-${String(pickUp_date.getDate()).padStart(2, "0")}`
      : "";

    const dropOffDate = dropOff_date
      ? `${dropOff_date.getFullYear()}-${String(
          dropOff_date.getMonth() + 1
        ).padStart(2, "0")}-${String(dropOff_date.getDate()).padStart(2, "0")}`
      : "";

    let freeDates = [];
    for (let freeDay of free_date) {
      const year = freeDay.getFullYear();
      const month = freeDay.getMonth() + 1;
      const day = freeDay.getDate().toLocaleString();

      let date =
        String(year) +
        "-" +
        String(month).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0");

      freeDates.push(date);
    }

    data["programDetails"]["droppOff_date"] = dropOffDate;
    data["programDetails"]["pickUp_date"] = pickUpDate;
    data["programDetails"]["exceptDays"] = excepted_dates;
    data["programDetails"]["workDates"] = getWorkDates();
    data["programDetails"]["freeDays_date"] = freeDates;
    data["programDetails"]["_id"] = runDatesLocation?.program?._id!;
    await updateProgram({
      id: runDatesLocation?.program?._id!,
      updatedProgram: data,
    });
    setActiveTab(3);
  };

  return (
    <div>
      <Row>
        <div className="mt-2">
          <h5>Run Dates</h5>
        </div>
        <Col lg={5}>
          <InputGroup>Start Date</InputGroup>
          <div className="mb-3">
            <Flatpickr
              value={pickUp_date!}
              onChange={handleChangePickupDate}
              className="form-control flatpickr-input"
              id="pickUp_date"
              placeholder="Select Date"
              options={{
                dateFormat: "d M, Y",
                onChange: (selectedDates: Date[]) => {
                  setPickUp_date(selectedDates[0]);
                },
              }}
            />
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <h5>to</h5>
        </Col>
        <Col lg={5}>
          <InputGroup>End Date</InputGroup>
          <Flatpickr
            value={dropOff_date!}
            onChange={handleChangeDropoffDate}
            className="form-control flatpickr-input"
            id="dropOff_date"
            placeholder="Select Date"
            options={{
              dateFormat: "d M, Y",
              onChange: (selectedDates: Date[]) => {
                setDropOff_date(selectedDates[0]);
              },
            }}
          />
        </Col>
      </Row>
      <Row>
        <div className="mt-2">
          <h5>Free Days</h5>
        </div>
        <Col lg={5}>
          <Flatpickr
            value={free_date}
            onChange={handleChangeFreeDate}
            className="form-control flatpickr-input"
            id="free_date"
            placeholder="Select Date"
            options={{
              dateFormat: "d M, Y",
              mode: "multiple",
              onChange: (selectedDates: Date[]) => {
                setFree_date(selectedDates);
              },
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <div className="mt-2">
            <h5 className="fs-14 mb-1">Days of week not running</h5>
            <p className="text-muted">
              Slide the selected excepted days to the right
            </p>
            <DualListBox
              options={days_of_the_week}
              selected={excepted_dates}
              onChange={(e: any) => {
                setExceptedDates(e);
              }}
              icons={{
                moveLeft: <span className="mdi mdi-chevron-left" key="key" />,
                moveAllLeft: [
                  <span className="mdi mdi-chevron-double-left" key="key" />,
                ],
                moveRight: <span className="bi bi-chevron-right" key="key" />,
                moveAllRight: [
                  <span className="mdi mdi-chevron-double-right" key="key" />,
                ],
                moveDown: <span className="mdi mdi-chevron-down" key="key" />,
                moveUp: <span className="mdi mdi-chevron-up" key="key" />,
                moveTop: (
                  <span className="mdi mdi-chevron-double-up" key="key" />
                ),
                moveBottom: (
                  <span className="mdi mdi-chevron-double-down" key="key" />
                ),
              }}
            />
          </div>
        </Col>
      </Row>
      <div className="d-flex align-items-start gap-3 mt-3">
        <Button
          type="button"
          className="btn btn-light btn-label previestab"
          onClick={() => setActiveTab(6)}
        >
          <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
          Back to Journey
        </Button>
        <Link
          to="#"
          className="btn btn-success btn-label right ms-auto nexttab nexttab"
          state={{ program: programmData.programDetails }}
          onClick={() => {
            saveProgress("2", programmData);
          }}
        >
          <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
          Add Options
        </Link>
      </div>
    </div>
  );
};
export default ReturnToRunDates;
