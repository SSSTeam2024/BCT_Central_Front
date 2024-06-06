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
import { useAddNewLuggageMutation, useDeleteLuggageMutation, useGetAllLuggageQuery } from "features/luggage/luggageSlice";
import Swal from "sweetalert2";

const LuggageTypes = () => {

const {data = [] } = useGetAllLuggageQuery()
const notifySuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Luggage is created successfully",
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

const [deleteLuggage] = useDeleteLuggageMutation();

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
        deleteLuggage(_id);
        swalWithBootstrapButtons.fire(
          "Deleted !",
          "Luggage is deleted.",
          "success"
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Canceled",
          "Luggage is safe :)",
          "info"
        );
      }
    });
};

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Size</span>,
      selector: (row: any) => row.size,
      sortable: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Luggage</span>,
      selector: (row: any) => row.description,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      cell: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn" onClick={()=>AlertDelete(row._id)}>
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const [modal_AddLuggage, setmodal_AddLuggage] = useState<boolean>(false);
  function tog_AddLuggage() {
    setmodal_AddLuggage(!modal_AddLuggage);
  }

  const [createLuggage] = useAddNewLuggageMutation();

  const initialLuggage = {
    description: "",
    size: ""
  };

  const [luggage, setLuggage] = useState(initialLuggage);

  const { description, size } = luggage;

  const onChangeLuggage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLuggage((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitLuggage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createLuggage(luggage).then(() =>
      notifySuccess()
      ).then(()=> setLuggage(initialLuggage))
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
                    onClick={() => tog_AddLuggage()}
                  >
                    <i className="ri-roadster-line align-middle"></i>{" "}
                    <span>Add New Luggage</span>
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
        size="sm"
        show={modal_AddLuggage}
        onHide={() => {
          tog_AddLuggage();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Add New Luggage Type
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitLuggage}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="size">Size</Form.Label>
                  <Form.Control
                    type="text"
                    id="size"
                    name="size"
                    placeholder="Enter size"
                    required
                    onChange={onChangeLuggage}
                    value={luggage.size}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="description">Luggage</Form.Label>
                  <Form.Control
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter luggage"
                    required
                    onChange={onChangeLuggage}
                    value={luggage.description}
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddLuggage();
                      setLuggage(initialLuggage);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button variant="primary" id="add-btn" type="submit" onClick={() => {
                    tog_AddLuggage();
                  }}>
                    Add Luggage
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
export default LuggageTypes;
