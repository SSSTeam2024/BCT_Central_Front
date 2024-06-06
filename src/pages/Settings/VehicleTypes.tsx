import React, { useState } from "react";
import {
  Form,
  Row,
  Card,
  Col,
  Modal,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useAddNewVehicleTypeMutation, useDeleteVehicleTypeMutation, useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";

const VehicleTypes = () => {
  const { data = [] } = useGetAllVehicleTypesQuery()
  
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Vehicle Type is created successfully",
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

  const [deleteVehicleType] = useDeleteVehicleTypeMutation();

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
          deleteVehicleType(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Vehicle Type is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Vehicle Type is safe :)",
            "info"
          );
        }
      });
  };

  const [createVehicletype] = useAddNewVehicleTypeMutation()

  const initialVehicleType = {
    type: "",
    base_change: "",
    coverage_mile: ""
  };

  const [vehicleType, setVehicleType] = useState(initialVehicleType);

  const {
    type,
    base_change,
    coverage_mile
  } = vehicleType;

  const onChangeVehicleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleType((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitVehicleType = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createVehicletype(vehicleType).then(() => setVehicleType(initialVehicleType));
      notifySuccess();
    } catch (error) {
      notifyError(error)
    }
  };

  const [modal_AddVehicleTypeModals, setmodal_AddVehicleTypeModals] =
    useState<boolean>(false);
  function tog_AddVehicleTypeModals() {
    setmodal_AddVehicleTypeModals(!modal_AddVehicleTypeModals);
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Vehicle</span>,
      selector: (row: any) => row.type,
      sortable: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Base Charge</span>,
      selector: (row: any) => row.base_change,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Coverage Miles</span>,
      selector: (row: any) => row.coverage_mile,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      cell: (cellProps: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            {/* <li>
              <Link to="#" className="badge badge-soft-primary edit-item-btn" style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer', fontSize: '1.1em' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
                <i className="ri-eye-line"></i>
              </Link>
            </li> */}
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn" style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer', fontSize: '1.1em' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn" style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer', fontSize: '1.1em' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} onClick={()=>AlertDelete(cellProps._id)}>
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

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
                  <button type="button" className="btn btn-primary"  onClick={() => tog_AddVehicleTypeModals()}>
                    <i className="ri-roadster-line align-middle" style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer', fontSize: '1.5em' }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}></i>{" "}
                    <span>Add New Type</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable columns={columns} data={data} pagination />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        id="createModal"
        size="sm"
        show={modal_AddVehicleTypeModals}
        onHide={() => {
          tog_AddVehicleTypeModals();
        }}
        centered
      >
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5" id="createModalLabel">
            Add Vehicle Type
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Form className="create-form" onSubmit={onSubmitVehicleType}>
            <input type="hidden" id="id-field" />
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>

            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="type">
                    Type
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="type"
                    onChange={onChangeVehicleType}
                    value={vehicleType.type}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="base_change">Base Charge</Form.Label>
                  <Form.Control
                    type="text"
                    id="base_change"
                    onChange={onChangeVehicleType}
                    value={vehicleType.base_change}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="coverage_mile">Coverage Miles</Form.Label>
                  <Form.Control
                    type="text"
                    id="coverage_mile"
                    name="coverage_mile"
                    onChange={onChangeVehicleType}
                    value={vehicleType.coverage_mile}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <div className="hstack gap-2 justify-content-end">
                <Button
                  variant="light"
                  onClick={() => {
                    tog_AddVehicleTypeModals();
                    setVehicleType(initialVehicleType);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    tog_AddVehicleTypeModals();
                  }}
                  type="submit"
                  variant="success"
                  id="addNew"
                >
                  Add
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default VehicleTypes;
