import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useGetAllJourneyQuery } from "features/Journeys/journeySlice";
import { useUpdateProgramMutation } from "features/Programs/programSlice";

interface ProgramExtraProps {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const ProgramExtra: React.FC<ProgramExtraProps> = ({ setActiveTab }) => {
  const { data: AllJourneys = [] } = useGetAllJourneyQuery();
  const [updateProgram] = useUpdateProgramMutation();

  const vehicle_extra = [
    { value: "ForHandicap", label: "For Handicap" },
    { value: "Wifi", label: "Wifi" },
    { value: "WC", label: "WC" },
    { value: "AC", label: "AC" },
  ];
  const location = useLocation();
  console.log(location.state);
  const extraLocation = location?.state?.program!;
  const [selectedJourney, setSelectedJourney] = useState<string>("");
  const [selected_extra, setSelectedExtra] = useState<string[]>([]);
  const [programm_notes, setProgrammNotes] = useState<string>("");
  const [selectedInvoiceFrequency, setSelectedInvoiceFrequency] =
    useState<string>("");
  const [programm_paymentDays, setProgrammPaymentDays] = useState<string>("");

  // This function is triggered when the select Journey
  const handleSelectJourney = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedJourney(value);
  };

  const onChangeProgramNotes = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProgrammNotes(event.target.value);
  };

  const handleSelectInvoiceFrequency = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedInvoiceFrequency(value);
  };

  const onChangeProgramPaymentDays = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProgrammPaymentDays(event.target.value);
  };

  useEffect(() => {
    if (extraLocation && extraLocation.extra) {
      setSelectedExtra(extraLocation.extra);
    }
  }, [extraLocation]);

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
  console.log("selectedJourney", selectedJourney);
  const saveProgress = async (tabNumber: string, data: typeof programmData) => {
    data["programDetails"]["programName"] = extraLocation.programName;
    data["programDetails"]["destination_point"] =
      extraLocation.destination_point;
    data["programDetails"]["stops"] = extraLocation.stops;
    data["programDetails"]["origin_point"] = extraLocation.origin_point;
    data["programDetails"]["dropOff_time"] = extraLocation.dropOff_time;
    data["programDetails"]["pickUp_Time"] = extraLocation.pickUp_Time;
    if (extraLocation.company_id === null) {
      data["programDetails"]["school_id"] = extraLocation.school_id._id;
    }
    if (extraLocation.school_id === null) {
      data["programDetails"]["company_id"] = extraLocation.company_id._id;
    }
    data["programDetails"]["tab_number"] = tabNumber;
    data["programDetails"]["program_status"] = extraLocation.program_status;
    data["programDetails"]["stops"] = extraLocation.stops;

    data["programDetails"]["pickUp_date"] = extraLocation.pickUp_date;
    data["programDetails"]["droppOff_date"] = extraLocation.droppOff_date;
    data["programDetails"]["exceptDays"] = extraLocation.exceptDays;
    data["programDetails"]["freeDays_date"] = extraLocation.freeDays_date;
    data["programDetails"]["workDates"] = extraLocation.workDates;

    data["programDetails"]["recommanded_capacity"] =
      extraLocation.recommanded_capacity;
    if (extraLocation.company_id === null) {
      data["programDetails"]["students_groups"] = extraLocation.students_groups;
    }

    if (extraLocation.school_id === null) {
      data["programDetails"]["employees_groups"] =
        extraLocation.employees_groups;
    }
    data["programDetails"]["total_price"] = extraLocation.total_price;

    data["programDetails"]["_id"] = extraLocation._id!;
    data["programDetails"]["within_payment_days"] = programm_paymentDays;
    data["programDetails"]["invoiceFrequency"] = selectedInvoiceFrequency;
    data["programDetails"]["journeyType"] = selectedJourney;
    data["programDetails"]["notes"] = programm_notes;
    const filteredExtra = selected_extra.filter((item) => item !== "");
    data["programDetails"]["extra"] = filteredExtra;
    console.log("data", data);
    await updateProgram({
      id: extraLocation._id!,
      updatedProgram: data,
    });
    setActiveTab(5);
  };

  return (
    <div>
      <Row>
        <Col lg={6}>
          <div className="mb-3">
            <Form.Label htmlFor="journeyType">Journey Type</Form.Label>
            <select
              className="form-select text-muted"
              name="journeyType"
              id="journeyType"
              value={selectedJourney}
              onChange={handleSelectJourney}
            >
              <option value="">Select Journey Type</option>
              {AllJourneys.map((journeys) => (
                <option value={journeys._id} key={journeys._id}>
                  {journeys.type}
                </option>
              ))}
            </select>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <div>
            <Form.Label htmlFor="VertiExtraInput">Extra</Form.Label>
            <p className="text-muted">Slide the selected option to the right</p>
            <DualListBox
              options={vehicle_extra}
              selected={selected_extra}
              onChange={(e: any) => setSelectedExtra(e)}
              icons={{
                moveLeft: <span className="mdi mdi-chevron-left" key="key" />,
                moveAllLeft: [
                  <span className="mdi mdi-chevron-double-left" key="key" />,
                ],
                moveRight: (
                  <span>
                    <i className="ri-arrow-drop-right-line"></i>
                  </span>
                ),
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
        <Col lg={6}>
          <div>
            <Form.Label htmlFor="notes" className="mb-5">
              Notes
            </Form.Label>
            <textarea
              className="form-control"
              id="notes"
              name="notes"
              rows={5}
              placeholder="Enter your notes"
              value={programm_notes}
              onChange={onChangeProgramNotes}
            ></textarea>
          </div>
        </Col>
      </Row>
      <Row className="mt-1">
        <Row className="mt-2">
          <Col lg={3}>
            <div className="mb-2">
              <Form.Label htmlFor="unit_price">Working Days</Form.Label>
              <br />

              <span className="badge bg-dark-subtle text-dark fs-14 mt-2">
                {extraLocation?.workDates?.length!}
              </span>
            </div>
          </Col>

          <Col lg={3}>
            <div className="mb-2">
              <Form.Label htmlFor="prices">Total Price</Form.Label>
              <br />
              <span className="badge bg-dark-subtle text-dark fs-14 mt-2">
                £ {location?.state?.program?.total_price!}
              </span>
            </div>
          </Col>
        </Row>
      </Row>
      <Row className="mt-1">
        <Row>
          <Col lg={3}>
            <div className="mb-2">
              <Form.Label htmlFor="invoiceFrequency">
                Invoice Frequency
              </Form.Label>
              <select
                className="form-select text-muted"
                name="invoiceFrequency"
                id="invoiceFrequency"
                value={selectedInvoiceFrequency}
                onChange={handleSelectInvoiceFrequency}
              >
                <option value="">Select</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi Weekly">Bi Weekly</option>
                <option value="Third Weekly">Third Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </Col>
          <Col lg={3}>
            <div className="mb-2">
              <Form.Label htmlFor="within_payment_days">
                Within Payment Days
              </Form.Label>
              <Form.Control
                type="text"
                id="within_payment_days"
                name="within_payment_days"
                placeholder="1 Day"
                value={programm_paymentDays}
                onChange={onChangeProgramPaymentDays}
              />
            </div>
          </Col>
        </Row>
      </Row>
      <Row>
        <div className="d-flex align-items-start gap-3">
          <Button
            type="button"
            className="btn btn-light btn-label previestab"
            onClick={() => setActiveTab(3)}
          >
            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
            Back to Options
          </Button>

          <Link
            to="#"
            className="btn btn-success btn-label right ms-auto nexttab nexttab"
            state={{ program: programmData.programDetails }}
            onClick={() => {
              saveProgress("4", programmData);
            }}
          >
            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
            Go To Resume
          </Link>
        </div>
      </Row>
    </div>
  );
};
export default ProgramExtra;
