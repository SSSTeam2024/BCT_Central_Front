import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  OverlayTrigger,
  ProgressBar,
  Modal,
  Row,
  Tooltip,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import SimpleBar from "simplebar-react";
import { Link, useLocation } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Import Images
import productsImg31 from "../../../assets/images/products/images.jpg";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";

const VehicleDetails = () => {
  document.title = "Vehicle Details | Bouden Coach Travel";

  const LocationVehicle = useLocation();

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

  if (pdfjs.GlobalWorkerOptions) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }

  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title={LocationVehicle.state.registration_number}
            pageTitle="Vehicle"
          />
          <Row className="gx-lg-4" style={{ backgroundColor: "#ffffff" }}>
            <Col xl={4} lg={8} className="mx-auto">
              <Row className="m-5">
                <Col lg={12}></Col>
              </Row>
              <Row className="sticky-side-div m-4">
                <Col lg={12} className="mt-4">
                  <div className="bg-white rounded-4 position-relative ribbon-box overflow-hidden">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/VehicleFiles/vehicleImages/${LocationVehicle.state.vehicle_images}`}
                      // src={productsImg31}
                      alt=""
                      className="img-fluid rounded-4"
                      style={{ width: 480 }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={12} className="mt-4"></Col>
                <Col lg={12} className="mt-4">
                  <div className="text-center hstack gap-5">
                    <Button
                      variant="soft-danger"
                      className="btn-label"
                      onClick={() => {
                        tog_DQCModal();
                      }}
                    >
                      <i className="bi bi-filetype-pdf label-icon align-middle fs-24 me-2"></i>{" "}
                      Insurance
                    </Button>
                    <Button
                      variant="soft-danger"
                      className="btn-label"
                      onClick={() => {
                        tog_DBSModals();
                      }}
                    >
                      <i className="bi bi-filetype-pdf label-icon align-middle fs-24 me-2"></i>{" "}
                      MOT{" "}
                    </Button>
                    <Button
                      variant="soft-danger"
                      className="btn-label"
                      onClick={() => {
                        tog_PVCModals();
                      }}
                    >
                      <i className="bi bi-filetype-pdf label-icon align-middle fs-24 me-2"></i>{" "}
                      TAX
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl={8}>
              <div className="mt-5 mt-xl-0">
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <h4>{LocationVehicle.state.name}</h4>
                    <div className="hstack gap-3 flex-wrap">
                      <div>
                        <span className="text-body fw-medium">
                          {LocationVehicle.state.registration_number}
                        </span>
                      </div>
                      <div className="vr"></div>
                      <div className="text-muted">
                        <span className="text-body fw-medium">
                          {LocationVehicle.state.model}
                        </span>
                      </div>
                      <div className="vr"></div>
                      <div className="text-muted">
                        <span className="text-body fw-medium">
                          {LocationVehicle.state.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="top"> Edit </Tooltip>}
                    >
                      <Link
                        to={`/edit-vehicle/${LocationVehicle.state.registration_number}`}
                        className="btn btn-soft-secondary btn-icon"
                        state={LocationVehicle.state}
                      >
                        <i className="ri-pencil-fill align-bottom"></i>
                      </Link>
                    </OverlayTrigger>
                  </div>
                </div>
                {/* <Row className="mt-4">
                  <Col lg={3} sm={6} className="g-3">
                    <div className="p-2 border border-dashed rounded text-center">
                      <p className="mb-2 text-uppercase text-muted fs-13">
                        Standard Cost :
                      </p>
                      <h5 className="mb-0">$120.40</h5>
                    </div>
                  </Col>

                  <Col lg={3} sm={6} className="g-3">
                    <div className="p-2 border border-dashed rounded text-center">
                      <p className="mb-2 text-uppercase text-muted fs-13">
                        Standard Distance :
                      </p>
                      <h5 className="mb-0">2,234</h5>
                    </div>
                  </Col>

                  <Col lg={3} sm={6} className="g-3">
                    <div className="p-2 border border-dashed rounded text-center">
                      <p className="mb-2 text-uppercase text-muted fs-13">
                        Cost per km/mile :
                      </p>
                      <h5 className="mb-0">$120.40</h5>
                    </div>
                  </Col>

                  <Col lg={3} sm={6} className="g-3">
                    <div className="p-2 border border-dashed rounded text-center">
                      <p className="mb-2 text-uppercase text-muted fs-13">
                        Cost of Extra Luaggue :
                      </p>
                      <h5 className="mb-0">$60,645</h5>
                    </div>
                  </Col>
                </Row> */}

                <Row>
                  <Col xl={6}>
                    <div className=" mt-4">
                      <h5 className="fs-15 mb-2">Status :</h5>
                      <div>
                        {LocationVehicle.state.registration_number &&
                        LocationVehicle.state.statusVehicle === "Active" ? (
                          <span className="bg-success-subtle text-success fs-15 rounded-3">
                            Active
                          </span>
                        ) : (
                          <span className="bg-danger-subtle text-danger fs-15 rounded-3">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                  </Col>

                  <Col xl={6}>
                    <div className="mt-4">
                      <h5 className="fs-15 mb-3">Fuel Type :</h5>
                      <h5 className="mb-0">
                        {LocationVehicle.state.fuel_type}
                      </h5>
                    </div>
                  </Col>
                </Row>
                <h5 className="fs-15">Other Details:</h5>
                <div className="table-responsive">
                  <table className="table table-sm table-borderless align-middle description-table">
                    <tbody>
                      <tr>
                        <th>Luggage capacity</th>
                        <td>{LocationVehicle.state.fuel_type}</td>
                      </tr>
                      <tr>
                        <th>Passenger Capicity</th>
                        <td>{LocationVehicle.state.max_passengers}</td>
                      </tr>
                      <tr>
                        <th>Type</th>
                        <td>{LocationVehicle.state.type}</td>
                      </tr>
                      <tr>
                        <th>Fleet Number</th>
                        <td>{LocationVehicle.state.fleet_number}</td>
                      </tr>
                      <tr>
                        <th>Speed Limit</th>
                        <td>{LocationVehicle.state.speed_limit}</td>
                      </tr>
                      <tr>
                        <th>Ownership</th>
                        <td>{LocationVehicle.state.ownership}</td>
                      </tr>
                      <tr>
                        <th>Owner Name</th>
                        <td>{LocationVehicle.state.owner_name}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="d-flex flex-wrap gap-3 align-items-center mt-4">
                  {LocationVehicle.state.extra.map((extrass: any) => (
                    <button type="button" className="btn btn-success">
                      {/* <i className="ri-wifi-line label-icon align-middle fs-16 me-2"></i>{" "} */}
                      {extrass}
                    </button>
                  ))}
                  {/* <button type="button" className="btn btn-success btn-label">
                    <i className="ri-wifi-line label-icon align-middle fs-16 me-2"></i>{" "}
                    Wifi
                  </button>
                  <button type="button" className="btn btn-danger btn-label">
                    <i className="ri-fridge-line label-icon align-middle fs-16 me-2"></i>{" "}
                    Fridge
                  </button>
                  <button type="button" className="btn btn-success btn-label">
                    <i className="ri-tv-2-line label-icon align-middle fs-16 me-2"></i>{" "}
                    Smart Screen
                  </button>
                  <button type="button" className="btn btn-success btn-label">
                    <i className="ph ph-wind label-icon align-middle fs-16 me-2"></i>{" "}
                    A.C
                  </button> */}
                </div>
                <div>
                  <div className="d-flex flex-wrap gap-4 justify-content-between align-items-center mt-4">
                    <div className="flex-shrink-0 w-xl">
                      <h5 className="fs-15 mb-3 fw-medium">Mot Expiry</h5>
                      <h4 className="fw-bold mb-3">
                        {LocationVehicle.state.mot_expiry}
                      </h4>
                    </div>
                    <hr className="vr" />
                    <div className="flex-shrink-0 w-xl">
                      <h5 className="fs-15 mb-3 fw-medium">Tax Expiry</h5>
                      <h4 className="fw-bold mb-3">
                        {LocationVehicle.state.tax_expiry}
                      </h4>
                    </div>
                    <hr className="vr" />
                    <div className="flex-shrink-0 w-xl">
                      <h5 className="fs-15 mb-3 fw-medium">Insurance</h5>
                      <h4 className="fw-bold mb-3">
                        {LocationVehicle.state.insurance_expiry}
                      </h4>
                    </div>
                    <hr className="vr" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
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
              Insurance File
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <div>
              <Document
                file={`${process.env.REACT_APP_BASE_URL}/VehicleFiles/insuranceFiles/${LocationVehicle.state.insurance_file}`}
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
              MOT File
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <div>
              <Document
                file={`${process.env.REACT_APP_BASE_URL}/VehicleFiles/motFiles/${LocationVehicle.state.mot_file}`}
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
              TAX File
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <div>
              <Document
                file={`${process.env.REACT_APP_BASE_URL}/VehicleFiles/taxFiles/${LocationVehicle.state.tax_file}`}
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

export default VehicleDetails;
