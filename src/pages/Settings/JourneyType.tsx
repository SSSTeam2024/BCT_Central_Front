import React, { useEffect, useState } from "react";
import { Row, Card, Col, Modal, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";

import { Link, useLocation } from "react-router-dom";
import {
  useAddNewJourneyMutation,
  useDeleteJourneyMutation,
  useGetAllJourneyQuery,
  useUpdateJourneyMutation,
} from "features/Journeys/journeySlice";
import Swal from "sweetalert2";

const JourneyTypes = () => {
  const { data = [] } = useGetAllJourneyQuery();

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Journey is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyUpdateSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Journey is updated successfully",
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

  const [deleteVehicleType] = useDeleteJourneyMutation();

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
            "Journey is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Journey is safe :)",
            "info"
          );
        }
      });
  };

  const [modal_AddJouney, setmodal_AddJouney] = useState<boolean>(false);
  function tog_AddJouney() {
    setmodal_AddJouney(!modal_AddJouney);
  }

  const [modal_UpdateJouney, setmodal_UpdateJouney] = useState<boolean>(false);
  function tog_UpdateJouney() {
    setmodal_UpdateJouney(!modal_UpdateJouney);
  }

  const [createJourney] = useAddNewJourneyMutation();
  const [updateJourney] = useUpdateJourneyMutation();

  const initialJourney = {
    type: "",
  };

  const [journey, setJourney] = useState(initialJourney);

  const { type } = journey;

  const onChangeJourney = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJourney((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitJourney = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createJourney(journey).then(() => notifySuccess());
    } catch (error) {
      notifyError(error);
    }
  };

  const [journey_type, setJourneyType] = useState<string>("");
  const [journey_id, setJourneyId] = useState<string>("");
  const journeyLocation = useLocation();

  useEffect(() => {
    if (journeyLocation?.state) {
      setJourneyId(journeyLocation.state._id || "");
      setJourneyType(journeyLocation.state.type || "");
    }
  }, [journeyLocation]);

  const handleType = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJourneyType(e.target.value);
  };

  const onSubmitUpdateJourney = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const journey = {
        _id: journey_id || journeyLocation.state._id,
        type: journey_type || journeyLocation.state.type,
      };
      updateJourney(journey)
        .then(() => notifyUpdateSuccess())
        .then(() => setJourney(initialJourney));
    } catch (error) {
      notifyError(error);
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Journey Type</span>,
      selector: (row: any) => row.type,
      sortable: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      cell: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-success edit-item-btn"
                state={row}
                onClick={tog_UpdateJouney}
              >
                <i
                  className="ri-edit-2-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.2em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn">
                <i
                  className="ri-delete-bin-2-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.2em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={() => AlertDelete(row._id)}
                ></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredJourneyType = () => {
    let filteredJourney = data;
    if (searchTerm) {
      filteredJourney = filteredJourney.filter(
        (journey: any) =>
          journey?.type &&
          journey.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filteredJourney;
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
                    value={searchTerm}
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
                    onClick={() => tog_AddJouney()}
                  >
                    <i
                      className="ri-add-fill align-middle"
                      style={{
                        transition: "transform 0.3s ease-in-out",
                        cursor: "pointer",
                        fontSize: "1.5em",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.3)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    ></i>{" "}
                    <span>Add New Journey</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={getFilteredJourneyType()}
              pagination
            />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade"
        id="createModal"
        show={modal_AddJouney}
        onHide={() => {
          tog_AddJouney();
        }}
        centered
      >
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5" id="createModalLabel">
            Add Journey
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Form className="create-form" onSubmit={onSubmitJourney}>
            <input type="hidden" id="id-field" />
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>

            <Row>
              <Col lg={12} className="d-flex justify-content-center">
                <div className="mb-3">
                  <Form.Label htmlFor="type">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="type"
                    onChange={onChangeJourney}
                    value={journey.type}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <div className="hstack gap-2 justify-content-end">
                <Button
                  variant="light"
                  onClick={() => {
                    tog_AddJouney();
                    setJourney(initialJourney);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    tog_AddJouney();
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
      <Modal
        className="fade"
        id="createModal"
        show={modal_UpdateJouney}
        onHide={() => {
          tog_UpdateJouney();
        }}
        centered
      >
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5" id="createModalLabel">
            Update Journey
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Form className="create-form" onSubmit={onSubmitUpdateJourney}>
            <input type="hidden" id="id-field" />
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>

            <Row>
              <Col lg={12} className="d-flex justify-content-center">
                <div className="mb-3">
                  <Form.Label htmlFor="type">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="type"
                    onChange={handleType}
                    value={journey_type}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <div className="hstack gap-2 justify-content-end">
                <Button
                  variant="light"
                  onClick={() => {
                    tog_UpdateJouney();
                    setJourney(initialJourney);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    tog_UpdateJouney();
                  }}
                  type="submit"
                  variant="success"
                  id="addNew"
                >
                  Update
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default JourneyTypes;
