import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetAllComplainsQuery,
  useUpdateComplainResponseMutation,
} from "features/Complains/complainsSlice";
import { Document, Page } from "react-pdf";

function convertToBase64(
  file: File
): Promise<{ base64Data: string; extension: string }> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      const [, base64Data] = base64String.split(",");
      const extension = file.name.split(".").pop() ?? "";
      resolve({ base64Data, extension });
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsDataURL(file);
  });
}

const Claims = () => {
  document.title = "Complains | Coach Hire Network";

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your response has been sent",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const { data: allComplains = [] } = useGetAllComplainsQuery();

  const filtredComplains = allComplains.filter(
    (complain) => complain?.status !== "pending" && complain?.archived === "no"
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [pdfModal, setPdfModal] = useState<boolean>(false);
  const [videoModal, setVideoModal] = useState<boolean>(false);
  const [answerModal, setAnswerModal] = useState<boolean>(false);
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedComplain, setSelectedComplain] = useState<any>();
  const [numPages, setNumPages] = useState<number | null>(null);

  const [sendResponse] = useUpdateComplainResponseMutation();

  const initialResState = {
    _id: "",
    responseMessage: "",
    id_corporate: "",
    id_student: "",
    id_parent: "",
    subject: "",
    description: "",
    complainDate: "",
    responseAuthor: "",
    responseDate: "",
    status: "",
    archived: "",
    pdf: "",
    pdfBase64String: "",
    pdfExtension: "",
    photo: "",
    photoBase64Strings: "",
    photoExtension: "",
    video: "",
    videoBase64Strings: "",
    videoExtension: "",
    createdAt: "",
    updatedAt: "",
    resPhoto: "",
    resVideo: "",
    resPhotoBase64Strings: "",
    resVideoBase64Strings: "",
    ResPhotoExtension: "",
    ResVideoExtension: "",
  };
  const [resData, setResData] = useState(initialResState);
  const onResChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleShowImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageModal(true);
  };

  const handleShowPdf = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
    setPdfModal(true);
  };

  const handleShowVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setVideoModal(true);
  };

  const handleShowAnswer = (imageUrl: string) => {
    setSelectedId(imageUrl);
    setAnswerModal(true);
  };

  const handleShowDetails = (claim: any) => {
    setSelectedComplain(claim);
    setDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModal(false);
    setSelectedComplain(null);
  };

  const handleCloseImageModal = () => {
    setImageModal(false);
    setSelectedImage(null);
  };

  const handleClosePdfModal = () => {
    setPdfModal(false);
    setSelectedPdf(null);
  };

  const handleCloseVideoModal = () => {
    setVideoModal(false);
    setSelectedVideo(null);
  };

  const handleCloseAnswerModal = () => {
    setAnswerModal(false);
    setSelectedId("");
  };

  const handleSelectClients = (e: any) => {
    setSelectedClient(e.target.value);
  };

  const handleSelectStatus = (e: any) => {
    setSelectedStatus(e.target.value);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // handle response photo upload
  const handleResPhotosUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("resPhotoBase64Strings") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const newPhotos = base64Data + "." + extension;
      setResData({
        ...resData,
        resPhoto: newPhotos,
        resPhotoBase64Strings: base64Data,
        ResPhotoExtension: extension,
      });
    }
  };
  // video upload
  const handleResVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("resVideoBase64Strings") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const newPhotos = base64Data + "." + extension;
      setResData({
        ...resData,
        resVideo: newPhotos,
        resVideoBase64Strings: base64Data,
        ResVideoExtension: extension,
      });
    }
  };

  const getFilteredComplains = () => {
    let filteredComplain = filtredComplains;

    if (selectedClient && selectedClient !== "all") {
      filteredComplain = filteredComplain.filter((claim: any) => {
        if (selectedClient === "School") {
          return claim.id_school !== null;
        } else if (selectedClient === "Company") {
          return claim.id_company !== null;
        }
        return true;
      });
    }

    if (selectedStatus && selectedStatus !== "all") {
      filteredComplain = filteredComplain.filter(
        (claim: any) => claim.status === selectedStatus
      );
    }
    return filteredComplain;
  };

  const onSubmitResponse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resData["_id"] = selectedId;

    sendResponse(resData).then(() => {
      notify();
      setAnswerModal(false);
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Complains" pageTitle="Relevance" />
          <Row>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
                  <Col lg={6}>
                    <div className="search-box mb-3 mb-sm-0">
                      <input
                        type="text"
                        className="form-control"
                        id="searchInputList"
                        autoComplete="off"
                        placeholder="Search template..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="AllClients"
                      id="AllClients"
                      onChange={handleSelectClients}
                    >
                      <option value="all">All Clients</option>
                      <option value="School">School</option>
                      <option value="Company">Company</option>
                    </select>
                  </Col>
                  <Col lg={3}>
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="AllStatus"
                      id="AllStatus"
                      onChange={handleSelectStatus}
                    >
                      <option value="all">All Status</option>
                      <option value="answered">Answered</option>
                      <option value="pushed">Pending</option>
                    </select>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            {getFilteredComplains().map((complain: any) => (
              <Col xl={4} key={complain?._id!}>
                <Card>
                  <Card.Header
                    onClick={() => handleShowDetails(complain)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="float-end fs-11">
                      {
                        new Date(complain?.createdAt!)
                          .toISOString()
                          .split("T")[0]
                      }
                    </span>
                    <h6 className="card-title mb-0">{complain?.subject!}</h6>
                  </Card.Header>
                  <Card.Body
                    className="p-4 text-center"
                    onClick={() => handleShowDetails(complain)}
                    style={{ cursor: "pointer" }}
                  >
                    {complain?.id_school !== null && (
                      <>
                        <div className="mx-auto avatar-xl">
                          <img
                            src={`${
                              process.env.REACT_APP_BASE_URL
                            }/schoolFiles/${complain?.id_school?.id_file!}`}
                            alt=""
                            className="img-fluid rounded-circle"
                          />
                        </div>
                        <h5 className="card-title mb-1">
                          {complain?.id_school?.name!}
                        </h5>
                      </>
                    )}
                    {complain?.id_company !== null && (
                      <>
                        <div className="mx-auto avatar-xl">
                          <img
                            src={`${
                              process.env.REACT_APP_BASE_URL
                            }/companyFiles/logoFiles/${complain?.id_company
                              ?.logo_file!}`}
                            alt=""
                            className="img-fluid rounded-circle"
                          />
                        </div>
                        <h5 className="card-title mb-1">
                          {complain?.id_company?.name!}
                        </h5>
                      </>
                    )}
                    <p className="text-muted mb-0">{complain?.description!}</p>
                  </Card.Body>
                  <div className="card-footer hstack">
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="lh-1 align-middle link-secondary"
                          onClick={() =>
                            handleShowImage(
                              `${
                                process.env.REACT_APP_BASE_URL
                              }/complainFiles/photos/${complain?.photo!}`
                            )
                          }
                        >
                          <i className="ri-image-2-line"></i>
                        </Link>
                      </li>
                      {!/^(\d{17})_[a-z0-9]+_complainMedia\.(?!pdf$)/i.test(
                        complain?.pdf || ""
                      ) && (
                        <li className="list-inline-item">
                          <Link
                            to="#"
                            className="lh-1 align-middle link-danger"
                            onClick={() =>
                              handleShowPdf(
                                `${
                                  process.env.REACT_APP_BASE_URL
                                }/complainFiles/pdf/${complain?.pdf!}`
                              )
                            }
                          >
                            <i className="ri-file-ppt-line"></i>
                          </Link>
                        </li>
                      )}
                      {!/^(\d{17})_[a-z0-9]+_ComplaintVideo\.(?!mp4$)/i.test(
                        complain?.video || ""
                      ) && (
                        <li className="list-inline-item">
                          <Link
                            to="#"
                            className="lh-1 align-middle link-primary"
                            onClick={() =>
                              handleShowVideo(
                                `${
                                  process.env.REACT_APP_BASE_URL
                                }/complainFiles/videos/${complain?.video!}`
                              )
                            }
                          >
                            <i className="ri-vidicon-line"></i>
                          </Link>
                        </li>
                      )}
                    </ul>
                    {complain?.status !== "answered" && (
                      <Button
                        variant="soft-warning ms-auto"
                        size="sm"
                        onClick={() => handleShowAnswer(complain?._id!)}
                      >
                        Answer
                      </Button>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {/* Image Modal */}
        <Modal
          className="fade zoomIn"
          size="lg"
          show={imageModal}
          onHide={handleCloseImageModal}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Complain Image
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            {selectedImage && (
              <Row className="mb-3">
                <Col lg={12}>
                  <Image src={selectedImage} fluid />
                </Col>
              </Row>
            )}
          </Modal.Body>
        </Modal>
        {/* Pdf Modal */}
        <Modal
          className="fade zoomIn"
          size="lg"
          show={pdfModal}
          onHide={handleClosePdfModal}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Complain Pdf File
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            {selectedPdf && selectedPdf !== "" ? (
              <div>
                <Document
                  file={`${selectedPdf}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={1} />
                </Document>
              </div>
            ) : (
              <div className="text-center p-3">
                No PDF file is available to display.
              </div>
            )}
          </Modal.Body>
        </Modal>
        {/* Video Modal */}
        <Modal
          className="fade zoomIn"
          size="lg"
          show={videoModal}
          onHide={handleCloseVideoModal}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Complain Video
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            {selectedVideo && (
              <Row className="mb-3">
                <Col lg={12}>
                  <div className="ratio ratio-16x9">
                    <iframe
                      className="rounded"
                      src={selectedVideo}
                      title="complain video"
                    ></iframe>
                  </div>
                </Col>
              </Row>
            )}
          </Modal.Body>
        </Modal>
        {/* modal response */}
        <Modal
          show={answerModal}
          onHide={handleCloseAnswerModal}
          id="createModal"
          className="zoomIn border-0"
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18">Answer the complain</h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form className="create-form" onSubmit={onSubmitResponse}>
              <Row>
                <Col lg={12}>
                  <div className="mb-3">
                    <label htmlFor="responseMessage" className="form-label">
                      Write your response here
                    </label>
                    <textarea
                      className="form-control"
                      id="responseMessage"
                      name="responseMessage"
                      value={resData.responseMessage}
                      onChange={onResChange}
                      rows={3}
                    ></textarea>
                  </div>
                </Col>
                <Row>
                  <Col lg={10}>
                    <div className="mb-3">
                      <label
                        htmlFor="resPhotoBase64Strings"
                        className="form-label"
                      >
                        Images
                      </label>
                      <Form.Control
                        name="resPhotoBase64Strings"
                        onChange={handleResPhotosUpload}
                        type="file"
                        id="resPhotoBase64Strings"
                        accept=".png, .jpeg, .jpg"
                        placeholder="Choose Images"
                        className="text-muted"
                        multiple
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={10}>
                    <div className="mb-3">
                      <label
                        htmlFor="resVideoBase64Strings"
                        className="form-label"
                      >
                        Video
                      </label>
                      <Form.Control
                        name="resVideoBase64Strings"
                        onChange={handleResVideoUpload}
                        type="file"
                        id="resVideoBase64Strings"
                        accept=".MKV, .WEBM, .M4V, .MP4, .AVI, .MOV, .MPG, .MPA, .ASF, .WMA, .MP2, M2P, MP3, DIF.Rare, .VOB"
                        placeholder="Choose Video"
                        className="text-muted"
                        multiple
                      />
                    </div>
                  </Col>
                </Row>
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      variant="ghost-danger"
                      className="btn btn-ghost-danger"
                    >
                      <i className="ri-close-line align-bottom me-1"></i> Close
                    </Button>
                    <Button
                      variant="primary"
                      id="addNew"
                      className="btn btn-primary"
                      type="submit"
                    >
                      Send
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
        {/* Detials Modal */}
        <Modal
          className="fade zoomIn"
          size="lg"
          show={detailsModal}
          onHide={handleCloseDetailsModal}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <div className="hstack gap-4">
              <h4 className="modal-title fs-18" id="exampleModalLabel">
                Complain Details
              </h4>
              <span className="badge bg-info">{selectedComplain?.status!}</span>
            </div>
          </Modal.Header>
          <Modal.Body className="p-4">
            {selectedComplain && selectedComplain?.status! === "answered" && (
              <Row className="mb-3">
                <Col lg={6}>
                  <Card>
                    <Card.Header>
                      <h5>Complain Info</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Subject : </Form.Label>
                        </Col>
                        <Col>
                          <span>{selectedComplain.subject}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Date : </Form.Label>
                        </Col>
                        <Col>
                          <span>{selectedComplain.complainDate}</span>
                        </Col>
                      </Row>
                      {selectedComplain.id_school !== null && (
                        <Row>
                          <Col lg={3}>
                            <Form.Label>By : </Form.Label>
                          </Col>
                          <Col>
                            <span>{selectedComplain.id_school.name}</span>
                          </Col>
                        </Row>
                      )}
                      {selectedComplain.id_company !== null && (
                        <Row>
                          <Col lg={3}>
                            <Form.Label>By : </Form.Label>
                          </Col>
                          <Col>
                            <span>{selectedComplain.id_company.name}</span>
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Description:</Form.Label>
                        </Col>
                        <Col>
                          <span>{selectedComplain.description}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Files :</Form.Label>
                        </Col>
                        <Col>
                          <div className="hstack gap-3">
                            <a
                              href={`${
                                process.env.REACT_APP_BASE_URL
                              }/complainFiles/photos/${selectedComplain?.photo!}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="badge bg-info">
                                <i className="ph ph-image-square fs-18"></i>
                              </span>
                            </a>
                            {!/^(\d{17})_[a-z0-9]+_complainMedia\.(?!pdf$)/i.test(
                              selectedComplain?.pdf || ""
                            ) && (
                              <a
                                href={`${
                                  process.env.REACT_APP_BASE_URL
                                }/complainFiles/pdf/${selectedComplain?.pdf!}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="badge bg-danger">
                                  <i className="ph ph-file-pdf fs-18"></i>
                                </span>
                              </a>
                            )}
                            {!/^(\d{17})_[a-z0-9]+_ComplaintVideo\.(?!mp4$)/i.test(
                              selectedComplain?.video || ""
                            ) && (
                              <a
                                href={`${
                                  process.env.REACT_APP_BASE_URL
                                }/complainFiles/videos/${selectedComplain?.video!}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="badge bg-dark">
                                  <i className="ph ph-video-camera fs-18"></i>
                                </span>
                              </a>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card>
                    <Card.Header>
                      <h5>Response Info</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Date : </Form.Label>
                        </Col>
                        <Col>
                          <span>
                            {new Date(
                              selectedComplain?.responseDate!
                            ).toDateString()}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Description:</Form.Label>
                        </Col>
                        <Col>
                          <span>{selectedComplain?.responseMessage!}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Files :</Form.Label>
                        </Col>
                        <Col>
                          <div className="hstack gap-3">
                            {!/^(\d{17})_[a-z0-9]+_ResComplainPhotos\.(?!jpg$)/i.test(
                              selectedComplain?.resPhoto || ""
                            ) && (
                              <a
                                href={`${
                                  process.env.REACT_APP_BASE_URL
                                }/complainFiles/resPhotos/${selectedComplain?.resPhoto!}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="badge bg-secondary">
                                  <i className="ph ph-image-square fs-18"></i>
                                </span>
                              </a>
                            )}
                            {!/^(\d{17})_[a-z0-9]+_ResComplaintVideo\.(?!mp4$)/i.test(
                              selectedComplain?.resVideo || ""
                            ) && (
                              <a
                                href={`${
                                  process.env.REACT_APP_BASE_URL
                                }/complainFiles/resVideos/${selectedComplain?.resVideo!}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="badge bg-warning">
                                  <i className="ph ph-video-camera fs-18"></i>
                                </span>
                              </a>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
            {selectedComplain && selectedComplain?.status! === "pushed" && (
              <Row className="mb-3">
                <Col lg={6}>
                  <Card>
                    <Card.Header>
                      <h5>Complain Info</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Subject : </Form.Label>
                        </Col>
                        <Col>
                          <span>{selectedComplain.subject}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Date : </Form.Label>
                        </Col>
                        <Col>
                          <span>{selectedComplain.complainDate}</span>
                        </Col>
                      </Row>
                      {selectedComplain.id_school !== null && (
                        <Row>
                          <Col lg={3}>
                            <Form.Label>By : </Form.Label>
                          </Col>
                          <Col>
                            <span>{selectedComplain.id_school.name}</span>
                          </Col>
                        </Row>
                      )}
                      {selectedComplain.id_company !== null && (
                        <Row>
                          <Col lg={3}>
                            <Form.Label>By : </Form.Label>
                          </Col>
                          <Col>
                            <span>{selectedComplain.id_company.name}</span>
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Description:</Form.Label>
                        </Col>
                        <Col>
                          <span>{selectedComplain.description}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3}>
                          <Form.Label>Files :</Form.Label>
                        </Col>
                        <Col>
                          <div className="hstack gap-3">
                            <a
                              href={`${
                                process.env.REACT_APP_BASE_URL
                              }/complainFiles/photos/${selectedComplain?.photo!}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="badge bg-info">
                                <i className="ph ph-image-square fs-18"></i>
                              </span>
                            </a>
                            {!/^(\d{17})_[a-z0-9]+_complainMedia\.(?!pdf$)/i.test(
                              selectedComplain?.pdf || ""
                            ) && (
                              <a
                                href={`${
                                  process.env.REACT_APP_BASE_URL
                                }/complainFiles/pdf/${selectedComplain?.pdf!}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="badge bg-danger">
                                  <i className="ph ph-file-pdf fs-18"></i>
                                </span>
                              </a>
                            )}
                            {!/^(\d{17})_[a-z0-9]+_ComplaintVideo\.(?!mp4$)/i.test(
                              selectedComplain?.video || ""
                            ) && (
                              <a
                                href={`${
                                  process.env.REACT_APP_BASE_URL
                                }/complainFiles/videos/${selectedComplain?.video!}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="badge bg-dark">
                                  <i className="ph ph-video-camera fs-18"></i>
                                </span>
                              </a>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Claims;
