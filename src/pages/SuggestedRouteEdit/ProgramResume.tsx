import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import ProgramOptions from "./ProgramOptions";

interface Option {
  value: string;
  label: string;
}

const options1: Option[] = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const ProgramResume = () => {
  const location = useLocation();
  const progResume = location.state;

  const [step, setStep] = useState<string>("resume");

  const goToDates = (step: string) => {
    setStep(step);
  };

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Program updated successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const createDateFromStrings = (YyyyMmDd: string, HhMmSs: string) => {
    let date = new Date(YyyyMmDd + ", " + HhMmSs);
    return date;
  };
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  console.log("progResume?.freeDays_date!", progResume?.freeDays_date!);
  const tileClassName = ({ date }: any) => {
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const dayOfWeek = date.getDay();
    if (date < progResume.pickUp_date! || date > progResume.dropOff_date!) {
      return null;
    }
    let testDays = [];
    if (Array.isArray(progResume?.freeDays_date!)) {
      for (let freeDay of progResume?.freeDays_date!) {
        let day = createDateFromStrings(freeDay, "00:00:00");

        let year = day.getFullYear();
        let month = day.getMonth() + 1;
        let d = day.getDate().toLocaleString();

        let free_day = String(year) + "-" + String(month) + "-" + String(d);
        testDays.push(free_day);
      }
    } else {
      console.warn("freeDays_date is not an array or is undefined.");
    }
    if (testDays.includes(formattedDate)) {
      return "free-day";
    }
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    if (
      selectedDays.includes(options1[adjustedIndex].value) ||
      progResume.exceptDays!.includes(options1[adjustedIndex].value)
    ) {
      return "selected-day";
    }

    return null;
  };

  const tileDisabled = ({ date }: any) => {
    return date < progResume.pickUp_date! || date > progResume.dropOff_date!;
  };

  return (
    <>
      {step === "resume" && (
        <div>
          <Row className="d-flex resume-title">
            <span className="title"> Journey Name: </span>{" "}
            <span className="title-value">{progResume?.programName}</span>
          </Row>
          <Row className="mb-4">
            <Col lg={5}>
              <Row className="mb-2">
                <Col>
                  <h5>Client</h5>
                </Col>
                <Col>
                  {progResume.school_id !== null && (
                    <h6>{progResume?.school_id?.name!}</h6>
                  )}
                  {progResume.company_id !== null && (
                    <h6>{progResume?.company_id?.name!}</h6>
                  )}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <h5>Start Point</h5>
                </Col>
                <Col>
                  <h6>{progResume?.origin_point.placeName}</h6>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <h5>Destination Point</h5>
                </Col>
                <Col>
                  <h6>{progResume?.destination_point.placeName}</h6>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <h5>Stops</h5>
                </Col>
                <Col>
                  <ul className="list-group">
                    {progResume?.stops.map((stop: any) => (
                      <li className="list-group-item">
                        <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>{" "}
                        {stop.address.placeName}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <h5>Pickup Date</h5>
                </Col>
                <Col>
                  <span className="fw-medium fs-16">
                    {progResume?.pickUp_date}
                  </span>{" "}
                  at{" "}
                  <span className="fw-medium fs-16">
                    {progResume?.pickUp_Time}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Dropoff Date</h5>
                </Col>
                <Col>
                  <span className="fw-medium fs-16">
                    {progResume?.droppOff_date}
                  </span>{" "}
                  at{" "}
                  <span className="fw-medium fs-16">
                    {progResume?.dropOff_time}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col lg={5}>
              <Row className="mb-2">
                <Col>
                  <h5>Passengers Number</h5>
                </Col>
                <Col>
                  <span className="fw-medium fs-16">
                    {progResume?.recommanded_capacity}
                  </span>{" "}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <h5>Invoice Frequency</h5>
                </Col>
                <Col>
                  <span className="fw-medium fs-16">
                    {progResume?.invoiceFrequency}
                  </span>{" "}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <h5>Within Payment days</h5>
                </Col>
                <Col>
                  <span className="fw-medium fs-16">
                    {progResume?.within_payment_days}
                  </span>{" "}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <h5>Price</h5>
                </Col>
                <Col>
                  <span className="fw-medium fs-16">
                    £ {progResume?.total_price!}
                  </span>{" "}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Suggested Route Notes</h5>
                </Col>
                <Col>
                  {progResume?.notes !== "" ? (
                    <span className="fs-15">{progResume?.notes}</span>
                  ) : (
                    <span className="fs-15">--</span>
                  )}
                </Col>
              </Row>
            </Col>
            <Col lg={2}>
              <Row>
                <Col>
                  <p className="legend-container">
                    <span className="legend working_days_bg"></span>
                    Working days{" "}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="legend-container">
                    <span className="legend bg-now-day"></span>Current day
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="legend-container">
                    <span className="legend bg-except-day"></span>Excepted days{" "}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="legend-container">
                    <span className="legend bg-free-day"></span>Free days
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} className="d-flex justify-content-center">
              <div className="calender-container">
                <Calendar
                  tileClassName={tileClassName}
                  tileDisabled={tileDisabled}
                />
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-between mt-2 mb-3">
            <Link
              to="#"
              className="btn btn-light btn-label previestab"
              // state={progResume}
              onClick={() => goToDates("options")}
            >
              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
              Back to Extra
            </Link>

            <Button
              variant="success"
              className="w-sm"
              onClick={() => {
                notify();
                navigate("/list-of-program");
              }}
            >
              Update
            </Button>
          </div>
        </div>
      )}
      {step === "options" && <ProgramOptions extraLocation={progResume} />}
    </>
  );
};
export default ProgramResume;
