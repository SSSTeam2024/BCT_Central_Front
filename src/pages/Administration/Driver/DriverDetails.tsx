import React, { useState } from "react";
import { Button, Card, Col, Row, Table, Modal } from "react-bootstrap";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import { useLocation } from "react-router-dom";

import "@react-pdf-viewer/core/lib/styles/index.css";

// Set the workerSrc to point to the pdf.worker.js file
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const DriverDetails = () => {
  const driverLocation = useLocation();

  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }

  const [modal_DQCModal, setmodal_DQCModal] = useState<boolean>(false);
  function tog_DQCModal() {
    setmodal_DQCModal(!modal_DQCModal);
  }

  const [modal_DBSModals, setmodal_DBSModals] = useState<boolean>(false);
  function tog_DBSModals() {
    setmodal_DBSModals(!modal_DBSModals);
  }

  const [modal_PVCModals, setmodal_PVCModals] = useState<boolean>(false);
  function tog_PVCModals() {
    setmodal_PVCModals(!modal_PVCModals);
  }

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPdf, setShowPdf] = useState(false);

  const openModal = () => setShowPdf(true);
  const closeModal = () => setShowPdf(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleClick = () => {
    setShowPdf(true);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Card.Body>
          {/* <Tab.Container defaultActiveKey="arrow-profile"> */}
          {/* <Nav as="ul" justify variant="pills" className="arrow-navtabs nav-success bg-light mb-4">
                <Nav.Item as="li" style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Nav.Link eventKey="arrow-profile"  >
                    <span className="d-block d-sm"><i className="bi bi-person-bounding-box"></i></span>
                    <span className="d-none d-lg-block">Profile</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="arrow-trips">
                    <span className="d-block d-sm"><i className="bi bi-bus-front-fill"></i></span>
                    <span className="d-none d-sm-block">Attendance</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="arrow-attendance">
                    <span className="d-block d-sm"><i className="bi bi-exclamation-circle-fill"></i></span>
                    <span className="d-none d-sm-block">Complains</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="arrow-payment">
                    <span className="d-block d-sm"><i className="bi bi-cash-stack"></i></span>
                    <span className="d-none d-sm-block">Payment</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav> */}
          {/* <Tab.Content className="text-muted"> */}
          {/* <Tab.Pane eventKey="arrow-profile"> */}
          <Card.Body>
            <Row>
              <div className="hstack gap-0">
                <Col lg={3}>
                  <div
                    className="profile-user-img position-relative"
                    style={{ width: "400px" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/driverFiles/profileImages/${driverLocation.state.profile_image}`}
                      alt=""
                      className="rounded cover"
                    />
                    {/* <span className="position-absolute top-0 start-100 translate-middle badge border border-3 border-white rounded-circle bg-success p-1 mt-1 me-1"><span className="visually-hidden">unread messages</span></span> */}
                  </div>
                </Col>
                <Col lg={9}>
                  <div className="d-flex border-bottom border-bottom-dashed mb-0 mt-10 mt-lg-4">
                    <div className="flex-grow-5 mb-2">
                      <h4>
                        {driverLocation.state.firstname}{" "}
                        {driverLocation.state.surname}
                      </h4>
                      {driverLocation.state.driverStatus === "Active" ? (
                        <span className="badge bg-success">Active</span>
                      ) : driverLocation.state.driverStatus === "Inactive" ? (
                        <span className="badge bg-danger">Inactive</span>
                      ) : driverLocation.state.driverStatus === "onRoad" ? (
                        <span className="badge bg-info">On Road</span>
                      ) : (
                        <span className="badge bg-warning">On Vacation</span>
                      )}
                    </div>
                  </div>
                  <Row className="mt-3 g-4">
                    <Col lg={6}>
                      <div className="table-responsive">
                        <Table className=" mb-0">
                          <tbody>
                            <tr>
                              <td className="fw-bold">Email:</td>
                              <td className="fw-medium">
                                {driverLocation.state.email}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Mobile:</td>
                              <td className="fw-medium">
                                {driverLocation.state.phonenumber}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Address:</td>
                              <td className="fw-medium">
                                {driverLocation.state.address}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Birth date:</td>
                              <td className="fw-medium">
                                {driverLocation.state.birthdate}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Language:</td>
                              <td className="fw-medium">
                                {driverLocation.state.language}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Nationality:</td>
                              <td className="fw-medium">
                                {driverLocation.state.nationality}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Username:</td>
                              <td className="fw-medium">
                                {driverLocation.state.username}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="table-responsive g-4">
                        <Table className=" mb-0">
                          <tbody>
                            <tr>
                              <td className="fw-bold">
                                Driving License Expiry:
                              </td>
                              <td className="fw-medium">
                                {driverLocation.state.driving_license_expiry}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">DQC Expiry:</td>
                              <td className="fw-medium">
                                {driverLocation.state.dqc_expiry}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">DBS Issue Date:</td>
                              <td className="fw-medium">
                                {driverLocation.state.dbs_issue_date}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">DBS Badge Date:</td>
                              <td className="fw-medium">
                                {driverLocation.state.dbs_badge_date}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">PVC Expiry:</td>
                              <td className="fw-medium">
                                {driverLocation.state.pvc_expiry}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Deposit Held:</td>
                              <td className="fw-medium">
                                {driverLocation.state.deposti_held}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
            <Row className="mt-3 g-3 mb-3">
              <Col lg={3}></Col>
              <Col lg={3}>
                <div className="table-responsive g-0">
                  <Table className=" mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Bank Account Number:</td>
                        <td className="fw-medium">
                          {driverLocation.state.account_number}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col lg={3}>
                <div className="table-responsive g-0">
                  <Table className=" mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Bank Account Name:</td>
                        <td className="fw-medium">
                          {driverLocation.state.account_name}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col lg={3}>
                <div className="table-responsive g-1">
                  <Table className=" mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Bank Name</td>
                        <td className="fw-medium">
                          {driverLocation.state.bank_name}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Row className="mt-3 g-3 mb-3">
              <Col lg={3}></Col>
              <Col lg={3}>
                <div className="table-responsive g-0">
                  <Table className=" mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Joining Date:</td>
                        <td className="fw-medium">
                          {driverLocation.state.joindate}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col lg={3}>
                <div className="table-responsive g-1">
                  <Table className=" mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Total Trips:</td>
                        <td className="fw-medium">75 trip</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="text-center hstack gap-5">
                <Button
                  variant="soft-danger"
                  className="btn-label"
                  onClick={() => {
                    tog_AddShippingModals();
                  }}
                >
                  <i className="bi bi-filetype-pdf label-icon align-middle fs-24 me-2"></i>{" "}
                  Driving License
                </Button>
                <Button
                  variant="soft-danger"
                  className="btn-label"
                  onClick={() => {
                    tog_DQCModal();
                  }}
                >
                  <i className="bi bi-filetype-pdf label-icon align-middle fs-24 me-2"></i>{" "}
                  DQC
                </Button>
                <Button
                  variant="soft-danger"
                  className="btn-label"
                  onClick={() => {
                    tog_DBSModals();
                  }}
                >
                  <i className="bi bi-filetype-pdf label-icon align-middle fs-24 me-2"></i>{" "}
                  DBS
                </Button>
                <Button
                  variant="soft-danger"
                  className="btn-label"
                  onClick={() => {
                    tog_PVCModals();
                  }}
                >
                  <i className="bi bi-filetype-pdf label-icon align-middle fs-24 me-2"></i>{" "}
                  PVC
                </Button>
              </div>
            </Row>
          </Card.Body>
        </Card.Body>
        <Modal
          className="fade zoomIn"
          size="xl"
          show={modal_AddShippingModals}
          onHide={() => {
            tog_AddShippingModals();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Driving License
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <div>
              <Document
                file={`${process.env.REACT_APP_BASE_URL}/driverFiles/licenseFiles/${driverLocation.state.driver_license}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={1} />
              </Document>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          className="fade zoomIn"
          size="xl"
          show={modal_DQCModal}
          onHide={() => {
            tog_DQCModal();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              DQC
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <div>
              <Document
                file={`${process.env.REACT_APP_BASE_URL}/driverFiles/dqcFiles/${driverLocation.state.dqc}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={1} />
              </Document>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          className="fade zoomIn"
          size="xl"
          show={modal_DBSModals}
          onHide={() => {
            tog_DBSModals();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              DBS
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <div>
              <Document
                file={`${process.env.REACT_APP_BASE_URL}/driverFiles/dbsCheckFiles/${driverLocation.state.dbscheck}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={1} />
              </Document>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          className="fade zoomIn"
          size="xl"
          show={modal_PVCModals}
          onHide={() => {
            tog_PVCModals();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              PVC
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <div>
              <Document
                file={`${process.env.REACT_APP_BASE_URL}/driverFiles/contractFiles/${driverLocation.state.contract}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={1} />
              </Document>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default DriverDetails;
