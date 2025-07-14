import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, InputGroup, Row } from "react-bootstrap";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Flatpickr from "react-flatpickr";
import { useEditProgramMutation } from "features/Programs/programSlice";
import ProgramName from "./ProgramName";
import JourneyGroups from "./JourneyGroups";

interface Option {
  value: string;
  label: string;
}

interface ProgramRunDatesProps {
  runDatesLocation: any;
}

const ProgramRunDates: React.FC<ProgramRunDatesProps> = ({
  runDatesLocation,
}) => {
  const [step, setStep] = useState<string>("dates");

  const goToDates = (step: string) => {
    setStep(step);
  };

  const days_of_the_week: Option[] = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];
  const location = useLocation();
  // const runDatesLocation = location.state;

  console.log("runDatesLocation", runDatesLocation);
  const [updateJourney] = useEditProgramMutation();

  const [journey_pickup_date, setJourneyPickupDate] = useState<Date | null>(
    runDatesLocation?.pickUp_date
      ? new Date(runDatesLocation.pickUp_date)
      : null
  );

  const [exceptDays, setExceptDays] = useState<string[]>(
    runDatesLocation?.exceptDays || []
  );

  const [freeDays, setFreeDays] = useState<Date[]>(
    runDatesLocation?.freeDays_date
      ? runDatesLocation.freeDays_date.map(
          (dateStr: string) => new Date(dateStr)
        )
      : []
  );

  const [journey_dropoff_date, setJourneyDropoffDate] = useState<Date | null>(
    runDatesLocation?.droppOff_date
      ? new Date(runDatesLocation.droppOff_date)
      : null
  );

  const handleFreeDaysBlur = () => {
    const originalDates = (runDatesLocation?.freeDays_date || []).sort();
    const selectedDates = freeDays
      .map((date) => date.toLocaleDateString("en-CA"))
      .sort();

    const datesChanged =
      originalDates.length !== selectedDates.length ||
      originalDates.some((date: any, i: any) => date !== selectedDates[i]);

    if (datesChanged) {
      const workDates = getWorkDates();
      updateJourney({
        id: runDatesLocation._id,
        updatedProgram: {
          ...runDatesLocation,
          freeDays_date: selectedDates,
          workDates,
        },
      });
    }
  };

  const handleExceptDaysBlur = async () => {
    const originalExceptDays = (runDatesLocation?.exceptDays || []).sort();
    const currentExceptDays = [...exceptDays].sort();
    const changed =
      originalExceptDays.length !== currentExceptDays.length ||
      originalExceptDays.some(
        (day: any, i: any) => day !== currentExceptDays[i]
      );

    if (changed) {
      const workDates = getWorkDates();
      try {
        const response = await updateJourney({
          id: runDatesLocation._id,
          updatedProgram: {
            ...runDatesLocation,
            exceptDays: currentExceptDays,
            workDates,
          },
        });
        console.log("Mutation response:", response);
      } catch (error) {
        console.error("Error in mutation:", error);
      }
    } else {
      console.log("No change detected, skipping API request.");
    }
  };

  const getWorkDates = () => {
    let workDates = [];

    let startDate = journey_pickup_date;
    let endDate = journey_dropoff_date;

    if (startDate && endDate && endDate >= startDate) {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        if (
          !freeDays.find(
            (freeDay) => freeDay.toDateString() === currentDate.toDateString()
          )
        ) {
          if (
            !exceptDays.includes(
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

  return (
    <>
      {step === "dates" && (
        <div>
          <Row>
            <Col lg={5}>
              <InputGroup>Start Date</InputGroup>
              <div className="mb-3">
                <Flatpickr
                  value={journey_pickup_date!}
                  className="form-control flatpickr-input"
                  id="pickUp_date"
                  placeholder="Select Date"
                  options={{
                    dateFormat: "d M, Y",
                    onChange: (selectedDates: Date[]) => {
                      const selectedDate = selectedDates[0];
                      setJourneyPickupDate(selectedDate);

                      const originalDate = new Date(
                        runDatesLocation.pickUp_date
                      );

                      if (selectedDate.getTime() !== originalDate.getTime()) {
                        const formattedPickupDate =
                          selectedDate.toLocaleDateString("en-CA");
                        const workDates = getWorkDates();
                        updateJourney({
                          id: runDatesLocation._id,
                          updatedProgram: {
                            ...runDatesLocation,
                            pickUp_date: formattedPickupDate,
                            workDates,
                          },
                        });
                      }
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
                value={journey_dropoff_date!}
                className="form-control flatpickr-input"
                id="dropOff_date"
                placeholder="Select Date"
                options={{
                  dateFormat: "d M, Y",
                  onChange: (selectedDates: Date[]) => {
                    const selectedDate = selectedDates[0];

                    setJourneyDropoffDate(selectedDate);

                    const originalDate = new Date(
                      runDatesLocation.droppOff_date
                    );

                    if (selectedDate.getTime() !== originalDate.getTime()) {
                      const formattedDropOffDate =
                        selectedDate.toLocaleDateString("en-CA");
                      const workDates = getWorkDates();
                      updateJourney({
                        id: runDatesLocation._id,
                        updatedProgram: {
                          ...runDatesLocation,
                          droppOff_date: formattedDropOffDate,
                          workDates,
                        },
                      });
                    }
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
                className="form-control flatpickr-input"
                id="free_date"
                placeholder="Select Date"
                options={{
                  dateFormat: "d M, Y",
                  mode: "multiple",
                }}
                value={freeDays}
                onChange={(selectedDates: Date[]) => {
                  setFreeDays(selectedDates);
                }}
                onClose={handleFreeDaysBlur}
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
                <div onBlur={handleExceptDaysBlur} tabIndex={0}>
                  <DualListBox
                    options={days_of_the_week}
                    selected={exceptDays}
                    onChange={(selected: string[]) => {
                      setExceptDays(selected);
                    }}
                    icons={{
                      moveLeft: (
                        <span className="mdi mdi-chevron-left" key="left" />
                      ),
                      moveAllLeft: (
                        <span
                          className="mdi mdi-chevron-double-left"
                          key="allLeft"
                        />
                      ),
                      moveRight: (
                        <span className="bi bi-chevron-right" key="right" />
                      ),
                      moveAllRight: (
                        <span
                          className="mdi mdi-chevron-double-right"
                          key="allRight"
                        />
                      ),
                      moveDown: (
                        <span className="mdi mdi-chevron-down" key="down" />
                      ),
                      moveUp: <span className="mdi mdi-chevron-up" key="up" />,
                      moveTop: (
                        <span className="mdi mdi-chevron-double-up" key="top" />
                      ),
                      moveBottom: (
                        <span
                          className="mdi mdi-chevron-double-down"
                          key="bottom"
                        />
                      ),
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <div className="d-flex align-items-start gap-3 mt-3 mb-3">
            <Link
              to="#"
              state={runDatesLocation}
              className="btn btn-light btn-label previestab"
              onClick={() => goToDates("name")}
            >
              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
              Back to Journey
            </Link>
            <Link
              to="#"
              className="btn btn-success btn-label right ms-auto nexttab nexttab"
              onClick={() => goToDates("groups")}
              state={runDatesLocation}
            >
              <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
              Add Groups
            </Link>
          </div>
        </div>
      )}
      {step === "name" && <ProgramName details={runDatesLocation} />}
      {step === "groups" && <JourneyGroups />}
    </>
  );
};
export default ProgramRunDates;
