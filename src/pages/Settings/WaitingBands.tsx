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
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import { useAddNewWaitingBandMutation, useDeleteWaitingBandMutation, useGetAllWaitingBandsQuery } from "features/WaitingBands/waitingSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const WaitingBands = () => {
  
  const [deleteWaitingBand] = useDeleteWaitingBandMutation();
  const { data: AllWaitingBands = [] } = useGetAllWaitingBandsQuery()

  const { data: AlllVehicleType = [] } = useGetAllVehicleTypesQuery()

  const [createWaitingBand] = useAddNewWaitingBandMutation();

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
          deleteWaitingBand(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Waiting Band is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Waiting Band is safe :)",
            "info"
          );
        }
      });
  };


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
 
  const [selectvehicleType, setSelectedVehicleType] = useState<string>("");
  // This function is triggered when the select Ownership
  const handleSelectvehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleType(value);
  };

  const notifySuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Waiting Band is created successfully",
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



  const initialWaitingBand = {
    vehicle_type: "",
    hours_limit: "",
    price: "",
  };

  const [waitingBand, setWaitingBand] = useState(initialWaitingBand);

  const { vehicle_type, hours_limit, price } = waitingBand;

  const onChangeWaitingBand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaitingBand((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitWaitingBand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      waitingBand["vehicle_type"] = selectvehicleType
      createWaitingBand(waitingBand).then(() =>
      setWaitingBand(initialWaitingBand)
      );
      notifySuccess();
    } catch (error) {
      notifyError(error);
    }
  };

  const [modal_AddWaiting, setmodal_AddWaiting] = useState<boolean>(false);
  function tog_AddWaiting() {
    setmodal_AddWaiting(!modal_AddWaiting);
  }

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
                    onClick={() => tog_AddWaiting()}
                  >
                    <i className="ri-pin-distance-line align-middle"></i>{" "}
                    <span>Add New Waiting Bands</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable columns={columns} data={AllWaitingBands} pagination />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="sm"
        show={modal_AddWaiting}
        onHide={() => {
          tog_AddWaiting();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Add New Waiting Bands
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitWaitingBand}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="supplierName-field">Vehicle</Form.Label>
                  <select
                    className="form-select text-muted"
                    name="choices-single-default"
                    id="statusSelect"
                    onChange={handleSelectvehicleType}
                  >
                    <option value="">Type</option>
                    {AlllVehicleType.map((vehicleType)=>(
                       <option value={vehicleType?._id!} key={vehicleType?._id!}>{vehicleType.type}</option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="hours_limit">
                    Hours Limit
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="hours_limit"
                    id="hours_limit"
                    placeholder="Enter Limit"
                    onChange={onChangeWaitingBand}
                    value={waitingBand.hours_limit}
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
                    onChange={onChangeWaitingBand}
                    value={waitingBand.price}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddWaiting();
                      setWaitingBand(initialWaitingBand);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button variant="primary" id="add-btn" type="submit" onClick={() => {
                    tog_AddWaiting();
                  }}>
                    Add New Waiting Band
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
export default WaitingBands;
