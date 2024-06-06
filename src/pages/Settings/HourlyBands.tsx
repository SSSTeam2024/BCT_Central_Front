import React, { useState } from "react";
import {
  Form,
  Row,
  Card,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useAddNewHourBandMutation, useDeleteHourBandMutation, useGetAllHourBandQuery } from "features/HourlyBand/hourlyBandSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import Swal from "sweetalert2";

const HourlyBands = () => {
  const [deleteHourlyBands] = useDeleteHourBandMutation();

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
          deleteHourlyBands(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Hourly Band is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Hourly Band Type is safe :)",
            "info"
          );
        }
      });
  };

  const { data: AllHourBand = [] } = useGetAllHourBandQuery()

  const { data: AlllVehicleType = [] } = useGetAllVehicleTypesQuery()
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Car Type</span>,
      selector: (row: any) => row.vehicle_type.type,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Limit</span>,
      selector: (row: any) => row.hours_limit,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn" onClick={()=> AlertDelete(row._id)}>
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const notifyHourBand = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Hourly Band is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyErrorHourBand = (err: any) => {
    Swal.fire({
      position: "top-right",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [modal_AddMileage, setmodal_AddMileage] = useState<boolean>(false);
  function tog_AddMileage() {
    setmodal_AddMileage(!modal_AddMileage);
  }
  const [selectvehicleType, setSelectedVehicleType] = useState<string>("");
  // This function is triggered when the select Ownership
  const handleSelectvehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleType(value);
  };

  const [createHourBand] = useAddNewHourBandMutation();
  const initialHourBand = {
    vehicle_type: "",
    hours_limit: "",
    price: "",
  };

  const [hourBand, setHourBand] = useState(initialHourBand);

  const {
    vehicle_type,
    hours_limit,
    price,
  } = hourBand;

  const onChangeHourBand = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHourBand((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitHourBand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      hourBand["vehicle_type"]=selectvehicleType
      createHourBand(hourBand)
        .then(() => setHourBand(initialHourBand))
        .then(() => notifyHourBand())
        .then(() => setmodal_AddMileage(!modal_AddMileage))
    } catch (error) {
      notifyErrorHourBand(error);
    }
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
                    onClick={() => tog_AddMileage()}
                  >
                    <i className="ri-pin-distance-line align-middle"></i>{" "}
                    <span>Add New Hourly Band</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable columns={columns} data={AllHourBand} pagination />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="sm"
        show={modal_AddMileage}
        onHide={() => {
          tog_AddMileage();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Add New Hourly Band
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitHourBand}>
            <input type="hidden" id="id-field" />
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="vehicle_type">Vehicle</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="vehicle_type"
                    id="vehicle_type"
                    onChange={handleSelectvehicleType}
                  >
                    <option value="">Type</option>
                    {AlllVehicleType.map((vehicleType) => (
                      <option value={`${vehicleType._id}`}>{vehicleType.type}</option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="hours_limit">Limit</Form.Label>
                  <Form.Control
                    type="text"
                    name="hours_limit"
                    id="hours_limit"
                    placeholder="Enter Limit"
                    onChange={onChangeHourBand}
                    value={hourBand.hours_limit}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="price">Price</Form.Label>
                  <Form.Control
                    type="text"
                    id="price"
                    name="price"
                    placeholder="£ 0.00"
                    onChange={onChangeHourBand}
                    value={hourBand.price}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddMileage();
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button variant="primary" id="add-btn" type="submit">
                    Add New Hourly Band
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
export default HourlyBands;
