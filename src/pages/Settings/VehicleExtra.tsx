import {
  useAddNewExtraMutation,
  useDeleteExtraMutation,
  useGetAllExtrasQuery,
} from "features/VehicleExtraLuxury/extraSlice";
import React, { useState, useEffect } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const VehicleExtra = () => {
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Extra is created successfully",
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

  const { data: allExtra = [] } = useGetAllExtrasQuery();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredSearchResults, setFilteredSearchResults] =
    useState<any[]>(allExtra);

  const [createExtra] = useAddNewExtraMutation();

  const initialExtra = {
    name: "",
  };

  const [extra, setExtra] = useState(initialExtra);

  const { name } = extra;

  const onChangeExtra = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtra((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitExtra = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createExtra(extra).then(() => setExtra(initialExtra));
      notifySuccess();
    } catch (error) {
      notifyError(error);
    }
  };

  const [deleteExtra] = useDeleteExtraMutation();

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
          deleteExtra(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Extra is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Canceled", "Extra is safe :)", "info");
        }
      });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Extra Name</span>,
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      cell: (cellProps: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            {/* <li>
              <Link to="#" className="badge badge-soft-primary edit-item-btn">
                <i className="ri-eye-line"></i>
              </Link>
            </li> */}
            {/* <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i className="ri-edit-2-line"></i>
              </Link>
            </li> */}
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(cellProps._id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const [modal_AddExtra, setmodal_AddExtra] = useState<boolean>(false);
  function tog_AddExtra() {
    setmodal_AddExtra(!modal_AddExtra);
  }

  useEffect(() => {
    setFilteredSearchResults(
      allExtra.filter((row) => {
        return row.name?.toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [searchQuery, allExtra]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
                    value={searchQuery}
                    onChange={handleSearchChange}
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
                    onClick={() => tog_AddExtra()}
                  >
                    <i className="ri-add-circle-line align-middle fs-16"></i>{" "}
                    <span>New Vehicle Extra</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={filteredSearchResults}
              pagination
            />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="sm"
        show={modal_AddExtra}
        onHide={() => {
          tog_AddExtra();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Add New Vehicle Extra
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitExtra}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    value={extra.name}
                    onChange={onChangeExtra}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddExtra();
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    id="add-btn"
                    onClick={() => {
                      tog_AddExtra();
                    }}
                  >
                    Add
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
export default VehicleExtra;
