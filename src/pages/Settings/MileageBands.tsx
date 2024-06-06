import React, { useState } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddNewMileageBandMutation,
  useDeleteMileageBandMutation,
  useGetAllMileageBandsQuery,
} from "features/MileageBand/mileageSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";

const MileageBands = () => {
  const { data: AlllVehicleType = [] } = useGetAllVehicleTypesQuery();

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
      title: "Mileage Bands is created successfully",
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

  const [deleteMileageBands] = useDeleteMileageBandMutation();

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
          deleteMileageBands(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Mileage Band is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Mileage Band Type is safe :)",
            "info"
          );
        }
      });
  };

  const { data: AllMileage = [] } = useGetAllMileageBandsQuery();

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Car Type</span>,
      selector: (row: any) => row.vehicle_type?.type!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Limit</span>,
      selector: (row: any) => row.mileage_limit,
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

      cell: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link to="#" className="badge badge-soft-primary edit-item-btn">
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(row._id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];
  const [modal_AddMileage, setmodal_AddMileage] = useState<boolean>(false);
  function tog_AddMileage() {
    setmodal_AddMileage(!modal_AddMileage);
  }

  const [createMileageBands] = useAddNewMileageBandMutation();

  const initialMileageBands = {
    vehicle_type:{
      _id: "",
      type: "",
      base_change: ""
    },
    mileage_limit: "",
    price: "",
  };

  const [mileageBands, setMileageBands] = useState(initialMileageBands);

  const { vehicle_type, mileage_limit, price } = mileageBands;

  const onChangeMileageBands = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMileageBands((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitMileageBands = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mileageBands["vehicle_type"]._id = selectvehicleType
      createMileageBands(mileageBands).then(() =>
        setMileageBands(initialMileageBands)
      );
      notifySuccess();
    } catch (error) {
      notifyError(error);
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
                    <span>Add New Mileage Bands</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable columns={columns} data={AllMileage} pagination />
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
            Add New Mileage Bands
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitMileageBands}>
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
                    {AlllVehicleType.map((vehicleType) => (
                      <option value={vehicleType?._id!} key={vehicleType?._id!}>
                        {vehicleType.type}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="mileage_limit">Limit</Form.Label>
                  <Form.Control
                    type="text"
                    id="mileage_limit"
                    name="mileage_limit"
                    placeholder="Enter Limit"
                    onChange={onChangeMileageBands}
                    value={mileageBands.mileage_limit}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="price">Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    id="price"
                    placeholder="£ 0.00"
                    onChange={onChangeMileageBands}
                    value={mileageBands.price}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddMileage();
                      setMileageBands(initialMileageBands);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button variant="primary" id="add-btn" type="submit" onClick={() => {
                    tog_AddMileage();
                  }}>
                    Add New Mileage Band
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
export default MileageBands;
