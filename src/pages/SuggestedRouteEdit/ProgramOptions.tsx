import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useGetAllJourneyQuery } from "features/Journeys/journeySlice";
import { useEditProgramMutation } from "features/Programs/programSlice";
import JourneyGroups from "./JourneyGroups";
import ProgramResume from "./ProgramResume";

interface ProgramExtraProps {
  extraLocation: any;
}

// const ProgramOptions = () => {
const ProgramOptions: React.FC<ProgramExtraProps> = ({ extraLocation }) => {
  const [step, setStep] = useState<string>("options");

  const goToDates = (step: string) => {
    setStep(step);
  };

  const { data: AllJourneys = [] } = useGetAllJourneyQuery();

  const vehicle_extra = [
    { value: "ForHandicap", label: "For Handicap" },
    { value: "Wifi", label: "Wifi" },
    { value: "WC", label: "WC" },
    { value: "AC", label: "AC" },
  ];
  // const location = useLocation();
  // const extraLocation = location.state;
  console.log("extraLocation", extraLocation);
  const [updateJourney] = useEditProgramMutation();

  const [selectedJourney, setSelectedJourney] = useState<string>(
    extraLocation?.journeyType!
  );
  const [progNotes, setProgNotes] = useState<string>(extraLocation?.notes!);
  const [paymentDays, setPaymentDays] = useState<string>(
    extraLocation?.within_payment_days!
  );
  const [invoice, setInvoice] = useState<string>(
    extraLocation?.invoiceFrequency!
  );
  const [selected_extra, setSelectedExtra] = useState<string[]>(
    extraLocation?.extra!
  );

  const [updatedProg, setUpdatedProg] = useState<any>();

  useEffect(() => {
    if (extraLocation && extraLocation.extra) {
      setSelectedExtra(extraLocation.extra);
    }
  }, [extraLocation]);

  const totalUnitPrice = extraLocation?.employees_groups?.reduce(
    (sum: any, group: any) => {
      return sum + parseFloat(group.unit_price || 0);
    },
    0
  );

  const totalPrice = totalUnitPrice * (extraLocation?.workDates?.length || 0);

  const handleBlur = async () => {
    const originalExtra = (extraLocation?.extra || []).sort();
    const currentExtra = [...selected_extra].sort();

    const changed =
      originalExtra.length !== currentExtra.length ||
      originalExtra.some((extra: any, i: any) => extra !== currentExtra[i]);

    const shouldUpdate =
      progNotes !== extraLocation?.notes ||
      paymentDays !== extraLocation?.within_payment_days ||
      selectedJourney !== extraLocation?.journeyType ||
      invoice !== extraLocation?.invoiceFrequency ||
      changed;

    if (shouldUpdate) {
      const updatedJourney = {
        ...extraLocation,
        notes: progNotes,
        within_payment_days: paymentDays,
        journeyType: selectedJourney,
        invoiceFrequency: invoice,
        extra: currentExtra,
        total_price: totalPrice,
      };

      await updateJourney({
        id: extraLocation._id,
        updatedProgram: updatedJourney,
      });

      setUpdatedProg(updatedJourney);
    }
  };

  return (
    <>
      {step === "options" && (
        <>
          <div>
            <Row className="mb-3 mt-4">
              <Col lg={3}>
                <div className="hstack gap-3 mb-2">
                  <Form.Label htmlFor="unit_price" className="fs-17">
                    Working Days
                  </Form.Label>
                  <span className="badge bg-dark-subtle text-dark fs-14 mt-2">
                    {extraLocation?.workDates?.length!} days
                  </span>
                </div>
              </Col>
              <Col lg={3}>
                <div className="hstack gap-3 mb-2">
                  <Form.Label htmlFor="prices" className="fs-17">
                    Total Price
                  </Form.Label>
                  <span className="badge bg-dark-subtle text-dark fs-14 mt-2">
                    £ {totalPrice.toFixed(2)}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label htmlFor="selectedJourney">Journey Type</Form.Label>
                <select
                  className="form-select text-muted"
                  name="selectedJourney"
                  id="selectedJourney"
                  value={selectedJourney}
                  onChange={(e) => setSelectedJourney(e.target.value)}
                  onBlur={handleBlur}
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
            <Col lg={3}>
              <div className="mb-2">
                <Form.Label htmlFor="invoice">Invoice Frequency</Form.Label>
                <select
                  className="form-select text-muted"
                  name="invoice"
                  id="invoice"
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  onBlur={handleBlur}
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
                <Form.Label htmlFor={`paymentDays-${extraLocation?._id!}`}>
                  Within Payment Days
                </Form.Label>
                <Form.Control
                  type="text"
                  name={`paymentDays-${extraLocation?._id!}`}
                  id={`paymentDays-${extraLocation?._id!}`}
                  value={paymentDays}
                  onChange={(e) => setPaymentDays(e.target.value)}
                  onBlur={handleBlur}
                />
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col lg={6}>
              <div>
                <Form.Label htmlFor="VertiExtraInput">
                  <p>
                    Extra{" "}
                    <small className="text-muted">
                      ( Slide the selected option to the right )
                    </small>
                  </p>
                </Form.Label>
                <div onBlur={handleBlur} tabIndex={0}>
                  <DualListBox
                    options={vehicle_extra}
                    selected={selected_extra}
                    onChange={(e: any) => setSelectedExtra(e)}
                    icons={{
                      moveLeft: (
                        <span className="mdi mdi-chevron-left" key="key" />
                      ),
                      moveAllLeft: [
                        <span
                          className="mdi mdi-chevron-double-left"
                          key="key"
                        />,
                      ],
                      moveRight: (
                        <span>
                          <i className="ri-arrow-drop-right-line"></i>
                        </span>
                      ),
                      moveAllRight: [
                        <span
                          className="mdi mdi-chevron-double-right"
                          key="key"
                        />,
                      ],
                      moveDown: (
                        <span className="mdi mdi-chevron-down" key="key" />
                      ),
                      moveUp: <span className="mdi mdi-chevron-up" key="key" />,
                      moveTop: (
                        <span className="mdi mdi-chevron-double-up" key="key" />
                      ),
                      moveBottom: (
                        <span
                          className="mdi mdi-chevron-double-down"
                          key="key"
                        />
                      ),
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <Form.Label
                  htmlFor={`progNotes-${extraLocation?._id!}`}
                  className="mb-3"
                >
                  Notes
                </Form.Label>
                <textarea
                  className="form-control mt-2"
                  name={`progNotes-${extraLocation?._id!}`}
                  rows={5}
                  id={`progNotes-${extraLocation?._id!}`}
                  value={progNotes}
                  onChange={(e) => setProgNotes(e.target.value)}
                  onBlur={handleBlur}
                ></textarea>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="d-flex align-items-start gap-3">
              <Link
                to="#"
                className="btn btn-light btn-label previestab"
                onClick={() => goToDates("groups")}
                state={extraLocation}
              >
                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                Back to Groups
              </Link>

              <Link
                to="#"
                className="btn btn-success btn-label right ms-auto nexttab nexttab"
                state={updatedProg}
                onClick={() => goToDates("resume")}
              >
                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                Go To Resume
              </Link>
            </div>
          </Row>
        </>
      )}
      {step === "groups" && <JourneyGroups />}
      {step === "resume" && <ProgramResume />}
    </>
  );
};
export default ProgramOptions;
