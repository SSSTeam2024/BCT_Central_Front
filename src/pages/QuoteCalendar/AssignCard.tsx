import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import {
  Quote,
  useAssignDriverAndVehicleToQuoteMutation,
} from "features/Quotes/quoteSlice";

import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";
import Swal from "sweetalert2";

interface PopupInfo {
  colIndex: number;
  details?: Quote;
  [key: string]: any;
}

interface AssignCardProps {
  selectedQuote: Quote;
}

const AssignCard: React.FC<AssignCardProps> = ({ selectedQuote }) => {
  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();

  const activeDrivers = AllDrivers.filter(
    (driver) => driver.driverStatus === "Active"
  );
  const activeVehicles = AllVehicles.filter(
    (vehicle) => vehicle.statusVehicle === "Active"
  );
  const [assginDriver_Vehicle] = useAssignDriverAndVehicleToQuoteMutation();

  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

  const closePopup = () => setPopupInfo(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const popupElement = document.getElementById("popup-container");
      if (popupElement && !popupElement.contains(event.target)) {
        closePopup();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePopup]);

  const notifySuccessAssignVehicleAndDrvier = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Assign Done successfully",
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

  const [selectedDriver, setSelectedDriver] = useState<string>("");

  const handleSelectDriver = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSelectedDriver(value);
  };

  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const handleSelectVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSelectedVehicle(value);
  };

  const initialAssginDriverAndVehicleToQuote = {
    quote_ID: "",
    vehicle_ID: "",
    driver_ID: "",
  };

  const [assign, setAssign] = useState(initialAssginDriverAndVehicleToQuote);

  const { quote_ID, vehicle_ID, driver_ID } = assign;

  const onSubmitAssignDriverAndVehicleToQuote = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      assign["quote_ID"] = selectedQuote?._id!;
      if (selectedDriver !== "") {
        assign["driver_ID"] = selectedDriver;
      } else {
        assign["driver_ID"] = selectedQuote.id_driver;
      }
      if (selectedVehicle === "") {
        assign["vehicle_ID"] = selectedQuote.id_vehicle;
      } else {
        assign["vehicle_ID"] = selectedVehicle;
      }

      console.log("assign", assign);
      assginDriver_Vehicle(assign).then(() =>
        notifySuccessAssignVehicleAndDrvier()
      );
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <span className="fw-bold">Assign Driver / Vehicle</span>
      </Card.Header>
      <Card.Body>
        {selectedQuote === null ? (
          <span className="text-center fw-medium">
            Select a quote to assign driver and vehicle
          </span>
        ) : (
          <Form onSubmit={onSubmitAssignDriverAndVehicleToQuote}>
            <Row className="mb-3">
              <Col>
                <select
                  className="form-select text-muted"
                  name="driverId"
                  id="driverId"
                  value={selectedDriver}
                  onChange={handleSelectDriver}
                >
                  <option value="">Select Driver</option>
                  {activeDrivers.map((driver) => (
                    <option value={driver._id} key={driver._id}>
                      {driver.firstname} {driver.surname}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <select
                  className="form-select text-muted"
                  name="vehicleId"
                  id="vehicleId"
                  value={selectedVehicle}
                  onChange={handleSelectVehicle}
                >
                  <option value="">Select Vehicle</option>
                  {activeVehicles.map((vehicle) => (
                    <option value={vehicle._id} key={vehicle._id}>
                      {vehicle.registration_number}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <button type="submit" className="btn btn-soft-primary">
                  Assign
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default AssignCard;
