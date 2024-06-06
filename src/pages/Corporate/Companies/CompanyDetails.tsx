import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Document, Page } from "react-pdf";

const CompanyDetails = () => {
  document.title = "Company Details | Bouden Coach Travel";
  const LocationCompany = useLocation();

  const [numPages, setNumPages] = useState<number | null>(null);

  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row className="d-flex align-items-center">
            <Col lg={12}>
              <Card.Body style={{ width: "100%" }}>
                <Row>
                  <Col lg={3}>
                    <div className="profile-user-img position-relative">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/companyFiles/logoFiles/${LocationCompany.state.logo_file}`}
                        alt=""
                        className="rounded"
                      />
                    </div>
                  </Col>
                  <Col lg={9}>
                    <div className="d-flex border-bottom border-bottom-dashed pb-3 mb-3 mt-4 mt-lg-0">
                      <div className="flex-grow-1">
                        <h4>{LocationCompany.state.name}</h4>
                        <h6 className="text-muted">
                          {LocationCompany.state.activity}
                        </h6>
                      </div>
                    </div>
                    <Row>
                      <Col lg={6}>
                        <div className="table-responsive">
                          <Table className="table-borderless table-sm mb-0">
                            <tbody>
                              <tr>
                                <td>Address</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.address}
                                </td>
                              </tr>
                              <tr>
                                <td>Email</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.email}
                                </td>
                              </tr>
                              <tr>
                                <td>Mobile / Phone No.</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.phone}
                                </td>
                              </tr>
                              {/* <tr>
                                <td>Category</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.corporateCategory}
                                </td>
                              </tr> */}
                              <tr>
                                <td>Activity</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.activity}
                                </td>
                              </tr>
                              <tr>
                                <td>Bank Name</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.bank_name}
                                </td>
                              </tr>
                              <tr>
                                <td>Bank Account Name</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.account_name}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="table-responsive">
                          <Table className="table-borderless table-sm mb-0">
                            <tbody>
                              <tr>
                                <td>Bank Account Number</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.account_number}
                                </td>
                              </tr>
                              <tr>
                                <td>Bank Account Swift</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.sort_code}
                                </td>
                              </tr>
                              <tr>
                                <td>Status</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.statusCompany ===
                                  "Active" ? (
                                    <span className="badge badge-soft-success">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge badge-soft-danger">
                                      Inactive
                                    </span>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Joining Date</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.service_date}
                                </td>
                              </tr>
                              <tr>
                                <td>Login</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.login}
                                </td>
                              </tr>
                              {/* <tr>
                                <td>File</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.legal_file}
                                </td>
                              </tr> */}
                              {/* <tr>
                                <td>Sub-Domaine</td>
                                <td className="fw-medium">
                                  {LocationCompany.state.subDomaine}
                                </td>
                              </tr> */}
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
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
                    Legal File
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
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
                Legal File
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <div
                id="alert-error-msg"
                className="d-none alert alert-danger py-2"
              ></div>
              <div>
                <Document
                  file={`${process.env.REACT_APP_BASE_URL}/companyFiles/legalFiles/${LocationCompany.state.legal_file}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={1} />
                </Document>
              </div>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CompanyDetails;
