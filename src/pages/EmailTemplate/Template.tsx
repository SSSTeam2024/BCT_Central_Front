import React, { useState } from "react";
import { Button, Card, Col, Modal, Offcanvas, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  useAddNewEmailMutation,
  useDeleteEmailMutation,
  useUpdateEmailTemplateMutation,
} from "features/Emails/emailSlice";
import Swal from "sweetalert2";
import { useGetAllShortCodesQuery } from "features/ShortCode/shortCodeSlice";

const Template = ({ emails }: any) => {
  const { data: shortCodeList = [] } = useGetAllShortCodesQuery();
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [modal_updateEmailTemplate, setModalUpdateEmailTemplate] =
    useState<boolean>(false);
  const [deleteEmailTemplate] = useDeleteEmailMutation();
  const emailDetailsLocation = useLocation();
  const emailUpdateLocation = useLocation();
  const [updateEmailTemplateMutation] = useUpdateEmailTemplateMutation();
  const [title, setTitle] = useState<string>("");
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const [emailBody, setEmailBody] = useState<string>("");
  const handleEmailBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailBody(e.target.value);
  };
  const tog_ModalEmailTemplate = () => {
    setModalUpdateEmailTemplate(!modal_updateEmailTemplate);
  };
  const handleUpdate = () => {
    updateEmailTemplateMutation({
      _id: emailUpdateLocation?.state?._id!,
      name: title === "" ? emailUpdateLocation?.state?.name! : title,
      body: emailBody === "" ? emailUpdateLocation?.state?.body! : emailBody,
    }).then(() => navigate("/email-templates"));
  };

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Email Template is created successfully",
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
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteEmailTemplate(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Email Template is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Email Template is safe :)",
            "info"
          );
        }
      });
  };

  const [createEmailTemplate] = useAddNewEmailMutation();

  const initialEmailTemplate = {
    name: "",
    body: "",
  };

  const [emailTemplate, setEmailTemplate] = useState(initialEmailTemplate);

  const { name, body } = emailTemplate;

  const onChangeEmailTemplate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmailTemplate((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitEmailTemplate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createEmailTemplate(emailTemplate)
        .then(() => notifySuccess())
        .then(() => setShow(false));
    } catch (error) {
      notifyError(error);
    }
  };

  const onShortCodeButtonClick = (code: string) => {
    setEmailTemplate((prevState) => ({
      ...prevState,
      body: prevState.body + code,
    }));
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Title</span>,
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Body</span>,
      selector: (row: any) => row.body,
      sortable: true,
      width: "700px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => (
        <ul className="hstack gap-2 list-unstyled mb-0">
          <li>
            <Link
              to="#"
              className="badge badge-soft-info edit-item-btn fs-14"
              state={row}
              onClick={() => setShowDetails(!showDetails)}
            >
              <i className="ri-eye-line"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="badge badge-soft-success edit-item-btn fs-14"
              state={row}
              onClick={() => tog_ModalEmailTemplate()}
            >
              <i className="ri-edit-2-line"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="badge badge-soft-danger edit-item-btn fs-14"
              onClick={() => AlertDelete(row?._id!)}
            >
              <i className="ri-delete-bin-2-line"></i>
            </Link>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Row className="align-items-center mb-4">
        <Card>
          <Card.Header>
            <Col xxl={3} lg={4} sm={9}>
              <div className="search-box mb-3 mb-sm-0">
                <input
                  type="text"
                  className="form-control"
                  id="searchInputList"
                  autoComplete="off"
                  placeholder="Search template..."
                />
                <i className="ri-search-line search-icon"></i>
              </div>
            </Col>
            <Col sm={3} className="justify-content-end col-lg-3 ms-auto">
              <Button
                variant="success"
                onClick={() => setShow(true)}
                className="w-100 btn-sm"
              >
                <i className="mdi mdi-email-plus-outline me-1 align-middle"></i>{" "}
                Add Canned Message
              </Button>
            </Col>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive table-card">
              <DataTable columns={columns} data={emails} pagination />
            </div>
          </Card.Body>
        </Card>
      </Row>

      {/* Add New Email Template Modal */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        id="createModal"
        className="zoomIn border-0"
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18">New Email Template</h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form className="create-form" onSubmit={onSubmitEmailTemplate}>
            <input type="hidden" id="id-field" />
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>

            <Row>
              <Col lg={12}>
                {shortCodeList.map((code) => (
                  <Button
                    className="m-2"
                    onClick={() => onShortCodeButtonClick(code.text)}
                  >
                    {code.name}
                  </Button>
                ))}
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={emailTemplate.name}
                    onChange={onChangeEmailTemplate}
                    placeholder="Enter Title"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="body" className="form-label">
                    Message Content
                  </label>
                  <textarea
                    className="form-control"
                    id="body"
                    name="body"
                    value={emailTemplate.body}
                    onChange={onChangeEmailTemplate}
                    rows={3}
                  ></textarea>
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="ghost-danger"
                    className="btn btn-ghost-danger"
                    onClick={() => setShow(false)}
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    id="addNew"
                    className="btn btn-primary"
                  >
                    Add Template
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>

      {/* Add Update Email Template Modal */}
      <Modal
        show={modal_updateEmailTemplate}
        onHide={() => tog_ModalEmailTemplate()}
        id="createModal"
        className="zoomIn border-0"
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18">Update email template</h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form className="create-form">
            <input type="hidden" id="id-field" />
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>

            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleTitle}
                    placeholder="Enter Title"
                    defaultValue={emailUpdateLocation?.state?.name!}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="body" className="form-label">
                    Body
                  </label>
                  <textarea
                    className="form-control"
                    id="body"
                    name="body"
                    onChange={handleEmailBody}
                    defaultValue={emailUpdateLocation?.state?.body!}
                    rows={3}
                  ></textarea>
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="ghost-danger"
                    className="btn btn-ghost-danger"
                    onClick={() => setShow(false)}
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    id="addNew"
                    className="btn btn-primary"
                    onClick={handleUpdate}
                  >
                    Update Template
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>

      <Offcanvas
        show={showDetails}
        onHide={() => setShowDetails(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {emailDetailsLocation?.state?.name!}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h6 className="fs-14 mb-3">Body</h6>
          <p>{emailDetailsLocation?.state?.body!}</p>
        </Offcanvas.Body>
        <div className="p-3 border-top">
          <Row>
            <Col sm={6}>
              <div data-bs-dismiss="offcanvas">
                <Button
                  variant="danger"
                  type="button"
                  className="btn btn-danger w-100 remove-list"
                  data-bs-toggle="modal"
                  data-bs-target="#delteModal"
                  data-remove-id="12"
                  onClick={() =>
                    AlertDelete(emailDetailsLocation?.state?._id!).finally(() =>
                      setShowDetails(!showDetails)
                    )
                  }
                >
                  <i className="ri-delete-bin-line me-1 align-bottom"></i>{" "}
                  Delete
                </Button>
              </div>
            </Col>
            <Col sm={6}>
              <Button
                variant="secondary"
                type="button"
                className="w-100 edit-list"
                data-bs-dismiss="offcanvas"
                data-edit-id="12"
                onClick={() => {
                  tog_ModalEmailTemplate();
                  setShowDetails(!showDetails);
                }}
              >
                <i className="ri-pencil-line me-1 align-bottom"></i> Edit
              </Button>
            </Col>
          </Row>
        </div>
      </Offcanvas>
    </React.Fragment>
  );
};

export default Template;
