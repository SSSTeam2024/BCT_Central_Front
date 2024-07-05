import React, { useState } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  useGetAllVehiclesQuery,
  useGetVehicleByIDQuery,
} from "features/Vehicles/vehicleSlice";
import Swal from "sweetalert2";
import { useAddVehicleToQuoteMutation } from "features/Quotes/quoteSlice";
import { boolean } from "yup";
interface VehicleProps {
  modal_AssignVehicle: boolean;
  setModal_AssignVehicle: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalAssignVehicle: React.FC<VehicleProps> = ({
  modal_AssignVehicle,
  setModal_AssignVehicle,
}) => {
  const locationQuote = useLocation();
  const navigate = useNavigate();
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();
  let filterdVehicles = AllVehicles.filter(
    (vehicle) => vehicle.statusVehicle === "Active"
  );
  let journeyOne = [];
  let journeyTwo: any[] = [];
  if (locationQuote?.state?.type! === "One way") {
    journeyOne.push(locationQuote!.state!);
  } else {
    journeyTwo.push(
      {
        estimated_start_time: locationQuote?.state?.estimated_start_time!,
        estimated_return_start_time:
          locationQuote?.state?.estimated_return_start_time!,
        destination_point: locationQuote?.state?.destination_point!,
        start_point: locationQuote?.state?.start_point!,
      },
      {
        estimated_start_time:
          locationQuote?.state?.estimated_return_start_time!,
        estimated_return_start_time:
          locationQuote?.state?.estimated_start_time!,
        destination_point: locationQuote?.state?.start_point!,
        start_point: locationQuote?.state?.destination_point!,
      }
    );
  }

  const [selectVehicle, setSelectedVehicle] = useState<string>("");
  // This function is triggered when the select Vehicle
  const handleSelectVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedVehicle(value);
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Journey</span>,
      selector: (row: any, index: number) => <span>Journey {index + 1}</span>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.estimated_start_time,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pickup</span>,
      selector: (row: any) => row?.start_point?.placeName!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row?.destination_point?.placeName!,
      sortable: true,
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) =>
        row.id_vehicle?.registration_number! === undefined ? (
          <span>No Vehicle</span>
        ) : (
          <span>{row.id_vehicle?.registration_number!}</span>
        ),
      sortable: true,
    },
    {
      name: (
        <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>
      ),
      selector: (row: any) =>
        row!.id_driver! === undefined ? (
          <span>No Driver</span>
        ) : (
          <span>
            {row!.id_driver?.firstname!} {row!.id_driver?.surname!}
          </span>
        ),
      sortable: true,
    },
  ];

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Assign Vehicle Done successfully",
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

  let { data: oneVehicle } = useGetVehicleByIDQuery(selectVehicle);

  const [assignVehicleToQuoteMutation] = useAddVehicleToQuoteMutation();

  const initialAssignVehicleToQuote = {
    quote_id: "",
    id_vehicle: "",
  };

  const [assignvehicleToDriver, setAssignVehicleToQuote] = useState(
    initialAssignVehicleToQuote
  );

  const { quote_id, id_vehicle } = assignvehicleToDriver;

  const onChangeAssignVehicleToQuote = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAssignVehicleToQuote((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitAssignVehicleToQuote = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      assignvehicleToDriver["quote_id"] = locationQuote.state?._id!;
      assignvehicleToDriver["id_vehicle"] = selectVehicle;

      assignVehicleToQuoteMutation(assignvehicleToDriver)
        .then(() => notifySuccess())
        .then(() => navigate("/bookings"))
        .then(() => setModal_AssignVehicle(modal_AssignVehicle));
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <>
      <Modal.Header className="px-4 pt-4" closeButton>
        <h5 className="modal-title fs-18" id="exampleModalLabel">
          Assign Vehicle
        </h5>
      </Modal.Header>
      <Card>
        {/* <Card.Header>
        <div className="d-flex align-items-center p-1">
          <div className="flex-shrink-0 me-3">
            <div className="avatar-sm">
              <div className="avatar-title rounded-circle bg-light text-primary fs-24">
                <i className="mdi mdi-map-marker-path"></i>
              </div>
            </div>
          </div>
          <div className="flex-grow-1">
            <h4 className="mb-1">Journey</h4>
          </div>
        </div>
        {locationQuote?.state?.type! === "One way" ? (
          <DataTable columns={columns} data={journeyOne} />
        ) : (
          <DataTable columns={columns} data={journeyTwo} />
        )}
      </Card.Header> */}
        <Card.Header>
          <div className="d-flex align-items-center p-1">
            <div className="flex-shrink-0 me-3">
              <div className="avatar-sm">
                <div className="avatar-title rounded-circle bg-light text-primary fs-24">
                  <i className="mdi mdi-car-sports"></i>
                </div>
              </div>
            </div>
            <div className="flex-grow-1">
              <h4 className="mb-1">Choose Vehicle</h4>
            </div>
          </div>
          <Form
            className="tablelist-form"
            onSubmit={onSubmitAssignVehicleToQuote}
          >
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <select
                    className="form-select text-muted"
                    name="vehicle"
                    id="vehicle"
                    onChange={handleSelectVehicle}
                  >
                    <option value="">Select</option>
                    {filterdVehicles.map((vehicle) => (
                      <option value={`${vehicle._id}`} key={vehicle?._id!}>
                        {vehicle.registration_number}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              {selectVehicle && (
                <>
                  <Row className="mb-2">
                    <Col lg={6}>
                      <div>
                        <Form.Label>Vehicle Ref</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          defaultValue={oneVehicle?.registration_number!}
                        />
                      </div>
                      <div className="mt-2">
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          defaultValue={oneVehicle?.type!}
                        />
                      </div>
                      <div className="mt-2">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          defaultValue={oneVehicle?.model!}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div>
                        <Form.Label>Mot Expiry</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          defaultValue={oneVehicle?.mot_expiry!}
                          className="text-danger"
                        />
                      </div>
                      <div className="mt-2">
                        <Form.Label>Tax Expiry</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          defaultValue={oneVehicle?.tax_expiry!}
                          className="text-danger"
                        />
                      </div>
                      <div className="mt-2">
                        <Form.Label>Insurance Expiry</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          defaultValue={oneVehicle?.insurance_expiry!}
                          className="text-danger"
                        />
                      </div>
                    </Col>
                  </Row>
                </>
              )}
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    // onClick={() => {
                    //   tog_AddMileage();
                    // }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    id="add-btn"
                    type="submit"
                    onClick={() => setModal_AssignVehicle(!modal_AssignVehicle)}
                  >
                    Assign Vehicle
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Header>
      </Card>
    </>
  );
};
export default ModalAssignVehicle;
