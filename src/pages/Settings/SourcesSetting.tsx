import React, { useEffect, useState } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useLocation } from "react-router-dom";
import {
  useAddNewSourceMutation,
  useDeleteSourceMutation,
  useGetAllSourcesQuery,
  useUpdateSourcesMutation,
} from "features/Sources/sourcesSlice";
import Swal from "sweetalert2";

const SourcesSetting = () => {
  const { data: AllSources = [] } = useGetAllSourcesQuery();

  const notifySuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Source is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyUpdateSuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Source is updated successfully",
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

  const [deleteSource] = useDeleteSourceMutation();

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
          deleteSource(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Source is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Source is safe :)",
            "info"
          );
        }
      });
  };

  const [createSource] = useAddNewSourceMutation();
  const [updateSource] = useUpdateSourcesMutation();
  const initialSource = {
    name: "",
  };

  const [source, setSource] = useState(initialSource);

  const { name } = source;

  const onChangeSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSource((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitSource = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createSource(source)
        .then(() => notifySuccess())
        .then(() => setSource(initialSource));
    } catch (error) {
      notifyError(error);
    }
  };

  const [sourceName, setSourceName] = useState<string>("");
  const [sourceId, setSourceId] = useState<string>("");
  const sourceLocation = useLocation();

  useEffect(() => {
    if (sourceLocation?.state) {
      setSourceId(sourceLocation.state._id || "");
      setSourceName(sourceLocation.state.name || "");
    }
  }, [sourceLocation]);

  const handleName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSourceName(e.target.value);
  };

  const onSubmitUpdatedSource = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const source = {
        _id: sourceId || sourceLocation.state._id,
        name: sourceName || sourceLocation.state.name,
      };
      updateSource(source)
        .then(() => notifyUpdateSuccess())
        .then(() => setSource(initialSource));
    } catch (error) {
      notifyError(error);
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">How Know</span>,
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-success edit-item-btn"
                state={row}
                onClick={tog_UpdateSource}
              >
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

  const [modal_AddSource, setmodal_AddSource] = useState<boolean>(false);
  function tog_AddSource() {
    setmodal_AddSource(!modal_AddSource);
  }

  const [modal_UpdateSource, setmodal_UpdateSource] = useState<boolean>(false);
  function tog_UpdateSource() {
    setmodal_UpdateSource(!modal_UpdateSource);
  }

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredSources = () => {
    let filteredSources = AllSources;
    if (searchTerm) {
      filteredSources = filteredSources.filter(
        (source: any) =>
          source?.name! &&
          source?.name!.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filteredSources;
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
                    onClick={() => tog_AddSource()}
                  >
                    <i className="ri-add-fill align-middle"></i>{" "}
                    <span>New Source</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={getFilteredSources()}
              pagination
            />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="sm"
        show={modal_AddSource}
        onHide={() => {
          tog_AddSource();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            New Source
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitSource}>
            <input type="hidden" id="id-field" />
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="name">How Know</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    onChange={onChangeSource}
                    value={source.name}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddSource();
                      setSource(initialSource);
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
                      tog_AddSource();
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
      <Modal
        className="fade zoomIn"
        size="sm"
        show={modal_UpdateSource}
        onHide={() => {
          tog_UpdateSource();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Update Source
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitUpdatedSource}>
            <input type="hidden" id="id-field" />
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="name">How Know</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleName}
                    value={sourceName}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_UpdateSource();
                      setSource(initialSource);
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
                      tog_UpdateSource();
                    }}
                  >
                    Update
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
export default SourcesSetting;
