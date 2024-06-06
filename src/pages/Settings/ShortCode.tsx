import React, { useState, useRef } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddNewShortCodeMutation,
  useDeleteShortCodeMutation,
  useGetAllShortCodesQuery,
} from "features/ShortCode/shortCodeSlice";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import codeAnimation from "../../assets/images/Animation - 1717420733523.json";

const ShortCode = () => {
  const { data = [], isLoading } = useGetAllShortCodesQuery();
  const lottieRef3 = useRef<LottieRefCurrentProps>(null);
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Short Code is created successfully",
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

  const [deleteShortCode] = useDeleteShortCodeMutation();

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
          deleteShortCode(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Short Code is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Short Code is safe :)",
            "info"
          );
        }
      });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.name,
      sortable: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Text</span>,
      selector: (row: any) => row.text,
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

  const [modal_AddShortCode, setmodal_AddShortCode] = useState<boolean>(false);
  function tog_AddShortCode() {
    setmodal_AddShortCode(!modal_AddShortCode);
  }

  const [createShortCode] = useAddNewShortCodeMutation();

  const initialShortCode = {
    name: "",
    text: "",
  };

  const [shortCode, setShortCode] = useState(initialShortCode);

  const { name, text } = shortCode;

  const onChangeShortCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortCode((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitShortCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createShortCode(shortCode)
        .then(() => notifySuccess())
        .then(() => setShortCode(initialShortCode));
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
                    onClick={() => tog_AddShortCode()}
                  >
                    <i className="ri-roadster-line align-middle"></i>{" "}
                    <span>New Short Code</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {isLoading ? (
              <Row>
                <Col lg={12} className="d-flex justify-content-center">
                  <Lottie
                    lottieRef={lottieRef3}
                    onComplete={() => {
                      lottieRef3.current?.goToAndPlay(5, true);
                    }}
                    animationData={codeAnimation}
                    loop={false}
                    style={{ width: 300 }}
                  />
                </Col>
              </Row>
            ) : (
              <DataTable columns={columns} data={data} pagination />
            )}
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="sm"
        show={modal_AddShortCode}
        onHide={() => {
          tog_AddShortCode();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            New Add Short Code
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitShortCode}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    onChange={onChangeShortCode}
                    value={shortCode.name}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="text">Text</Form.Label>
                  <Form.Control
                    type="text"
                    id="text"
                    name="text"
                    placeholder="Enter text"
                    onChange={onChangeShortCode}
                    value={shortCode.text}
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddShortCode();
                      setShortCode(initialShortCode);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    id="add-btn"
                    type="submit"
                    onClick={() => {
                      tog_AddShortCode();
                    }}
                  >
                    Add Short Code
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
export default ShortCode;
