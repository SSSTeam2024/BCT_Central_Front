import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Flatpickr from "react-flatpickr";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import { useFetchProgrammByIdQuery } from "features/Programs/programSlice";
interface RecapProps {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

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

const RecapPage: React.FC<RecapProps> = ({ setActiveTab }) => {
  const location = useLocation();
  const { data: ProgramById } = useFetchProgrammByIdQuery(
    location?.state?.program?._id!
  );

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Program created successfully",
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

  const tileClassName = ({ date }: any) => {
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const dayOfWeek = date.getDay();
    if (
      date < location?.state?.program?.pickUp_date! ||
      date > location?.state?.program?.dropOff_date!
    ) {
      return null;
    }
    let testDays = [];
    if (Array.isArray(location?.state?.program?.freeDays_date)) {
      for (let freeDay of location?.state?.program?.freeDays_date!) {
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
      location?.state?.program?.exceptDays!.includes(
        options1[adjustedIndex].value
      )
    ) {
      return "selected-day";
    }

    return null;
  };

  const tileDisabled = ({ date }: any) => {
    return (
      date < location?.state?.program?.pickUp_date! ||
      date > location?.state?.program?.dropOff_date!
    );
  };

  return (
    <div>
      <Row className="d-flex resume-title">
        <span className="title"> Journey Name: </span>{" "}
        <span className="title-value">
          {location?.state?.program?.programName}
        </span>
      </Row>
      <Row className="mb-4">
        <Col lg={5}>
          <Row className="mb-2">
            <Col>
              <h5>Client</h5>
            </Col>
            <Col>
              <h6>{location?.state?.program?.company_id}</h6>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h5>Start Point</h5>
            </Col>
            <Col>
              <h6>{location?.state?.program?.origin_point.placeName}</h6>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h5>Destination Point</h5>
            </Col>
            <Col>
              <h6>{location?.state?.program?.destination_point.placeName}</h6>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h5>Stops</h5>
            </Col>
            <Col>
              <ul className="list-group">
                {location?.state?.program?.stops.map((stop: any) => (
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
                {location?.state?.program?.pickUp_date}
              </span>{" "}
              at{" "}
              <span className="fw-medium fs-16">
                {location?.state?.program?.pickUp_Time}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Dropoff Date</h5>
            </Col>
            <Col>
              <span className="fw-medium fs-16">
                {location?.state?.program?.droppOff_date}
              </span>{" "}
              at{" "}
              <span className="fw-medium fs-16">
                {location?.state?.program?.dropOff_time}
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
                {location?.state?.program?.recommanded_capacity}
              </span>{" "}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h5>Invoice Frequency</h5>
            </Col>
            <Col>
              <span className="fw-medium fs-16">
                {location?.state?.program?.invoiceFrequency}
              </span>{" "}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h5>Within Payment days</h5>
            </Col>
            <Col>
              <span className="fw-medium fs-16">
                {location?.state?.program?.within_payment_days}
              </span>{" "}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h5>Price</h5>
            </Col>
            <Col>
              <span className="fw-medium fs-16">
                £ {location?.state?.program?.total_price}
              </span>{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Suggested Route Notes</h5>
            </Col>
            <Col>
              <span className="fs-15">{location?.state?.program?.notes}</span>{" "}
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
      <div className="d-flex justify-content-between mt-2">
        <Button
          type="button"
          className="btn btn-light btn-label previestab"
          onClick={() => setActiveTab(4)}
        >
          <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
          Back to Extra
        </Button>

        <Button
          variant="success"
          className="w-sm"
          onClick={() => {
            notify();
            navigate("/list-of-program");
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
export default RecapPage;
