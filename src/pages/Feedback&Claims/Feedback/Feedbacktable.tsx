import { useUpdateFeedbackMutation } from "features/FeedBack/feedBackSlice";
import React, { useState } from "react";
import { Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Feedbacktable = ({ feedbacks }: any) => {
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Answer is added successfully",
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

  const [showModal, setShowModal] = useState<boolean>(false);
  const [answerModal, setAnswerModal] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [feedbackAnswer, setFeedbackAnswer] = useState<string>("");
  const [selectBy, setSelectBy] = useState<string>("");
  const [selectStatus, setSelectStatus] = useState<string>("");

  const [updateFeedback] = useUpdateFeedbackMutation();

  const handleShowModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleAnswer = (e: any) => {
    setFeedbackAnswer(e.target.value);
  };

  const handleSelectedStatus = (e: any) => {
    setSelectStatus(e.target.value);
  };

  const handleSelectedBy = (e: any) => {
    setSelectBy(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleShowAnswerModal = (feedback: any) => {
    setSelectedFeedback(feedback);
    setAnswerModal(true);
  };

  const handleCloseAnswerModal = () => {
    setAnswerModal(false);
    setSelectedFeedback(null);
  };

  const onSubmitAnswer = (e: any) => {
    e.preventDefault();
    try {
      updateFeedback({
        answer: feedbackAnswer,
        feedback_id: selectedFeedback?._id!,
      })
        .then(() => setSelectedFeedback(null))
        .then(() => notifySuccess())
        .then(() => setAnswerModal(false));
    } catch (error) {
      notifyError(error);
    }
  };

  const getFilteredFeedbacks = () => {
    let filteredfeedbacks = feedbacks;

    if (selectBy && selectBy !== "all") {
      filteredfeedbacks = filteredfeedbacks.filter((feedback: any) => {
        if (selectBy === "Driver") {
          return feedback.driver_id !== null;
        } else if (selectBy === "Employee") {
          return feedback.employee_id !== null;
        } else if (selectBy === "Student") {
          return feedback.student_id !== null;
        }
        return true;
      });
    }

    if (selectStatus && selectStatus !== "all") {
      filteredfeedbacks = filteredfeedbacks.filter(
        (feedback: any) => feedback.status === selectStatus
      );
    }
    return filteredfeedbacks;
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <select
                className="form-select text-muted"
                data-choices
                data-choices-search-false
                name="selectBy"
                id="selectBy"
                onChange={handleSelectedBy}
              >
                <option value="all">By</option>
                <option value="Driver">Driver</option>
                <option value="Employee">Employee</option>
                <option value="Student">Student</option>
              </select>
            </Col>
            <Col>
              <select
                className="form-select text-muted"
                data-choices
                data-choices-search-false
                name="selectStatus"
                id="selectStatus"
                onChange={handleSelectedStatus}
              >
                <option value="all">Status</option>
                <option value="Pending">Pending</option>
                <option value="Answered">Answered</option>
              </select>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            {getFilteredFeedbacks().map((feedback: any) => (
              <Col xxl={4}>
                <Card
                  className={`border ${
                    feedback?.status === "Pending"
                      ? "card-border-danger"
                      : feedback?.status === "Answered"
                      ? "card-border-success"
                      : "card-border-primary"
                  }`}
                >
                  <Card.Header>
                    <span className="float-end">
                      Quote : {feedback?.quote_id?.quote_ref!}
                    </span>
                    {feedback?.employee_id! !== null && (
                      <h6 className="card-title mb-0">
                        {feedback?.employee_id?.firstName}{" "}
                        {feedback?.employee_id?.lastName}{" "}
                        <span
                          className={`badge align-middle fs-10 ${
                            feedback?.status === "Pending"
                              ? "bg-danger"
                              : feedback?.status === "Answered"
                              ? "bg-success"
                              : "bg-primary"
                          }`}
                        >
                          {feedback?.status!}
                        </span>
                      </h6>
                    )}
                    {feedback?.student_id! !== null && (
                      <h6 className="card-title mb-0">
                        {feedback?.student_id?.firstName}{" "}
                        {feedback?.student_id?.lastName}{" "}
                        <span className="badge bg-danger align-middle fs-10">
                          {feedback?.status!}
                        </span>
                      </h6>
                    )}
                    {feedback?.driver_id! !== null && (
                      <h6 className="card-title mb-0">
                        {feedback?.driver_id?.firstName}{" "}
                        {feedback?.driver_id?.lastName}{" "}
                        <span className="badge bg-danger align-middle fs-10">
                          {feedback?.status!}
                        </span>
                      </h6>
                    )}
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-3">
                      <Col lg={1}>
                        <Form.Label>Category: </Form.Label>
                      </Col>
                      <Col>
                        <p className="card-text text-muted">
                          {feedback?.category!}
                        </p>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <p className="card-text">{feedback?.description!}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span
                          className="badge bg-info align-middle fs-15"
                          onClick={() =>
                            handleShowModal(
                              `${
                                process.env.REACT_APP_BASE_URL
                              }/feedbackFiles/${feedback?.image!}`
                            )
                          }
                        >
                          <i className="ph ph-file-image"></i>
                        </span>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <Col>
                        <div className="text-start">
                          <span>
                            {
                              new Date(feedback?.createdAt)
                                .toISOString()
                                .split("T")[0]
                            }
                          </span>
                        </div>
                      </Col>
                      {feedback.status === "Pending" && (
                        <Col>
                          <div className="text-end">
                            <Link
                              to="#"
                              className="link-primary fw-medium"
                              onClick={() => handleShowAnswerModal(feedback!)}
                            >
                              Answer
                              <i className="ri-arrow-right-line align-middle"></i>
                            </Link>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      {/* Image Modal */}
      <Modal
        className="fade zoomIn"
        size="sm"
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Feedback File
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
      {/* Answer Modal */}
      <Modal
        className="fade zoomIn"
        size="lg"
        show={answerModal}
        onHide={handleCloseAnswerModal}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleAnswerModalLabel">
            Add Answer
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedFeedback && (
            <>
              <Row className="mb-3">
                <Col lg={6}>
                  <Card>
                    <Card.Header>
                      <h4>Quote Informations</h4>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Form.Label>Reference : </Form.Label>
                          <span> {selectedFeedback.quote_id.quote_ref}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>From : </Form.Label>
                          <span>
                            {" "}
                            {selectedFeedback.quote_id.start_point.placeName}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>To : </Form.Label>
                          <span>
                            {" "}
                            {
                              selectedFeedback.quote_id.destination_point
                                .placeName
                            }
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>Dropoff Date : </Form.Label>
                          <span> {selectedFeedback.quote_id.dropoff_date}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>Pickup Time : </Form.Label>
                          <span> {selectedFeedback.quote_id.pickup_time}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>Dropoff Time : </Form.Label>
                          <span> {selectedFeedback.quote_id.dropoff_time}</span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card>
                    <Card.Header>
                      <h4>Feedback Resume</h4>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Form.Label>Category : </Form.Label>
                          <span> {selectedFeedback?.category!}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>By : </Form.Label>
                          {selectedFeedback.employee_id !== null && (
                            <>
                              <span> Employee : </span>
                              <span className="fw-bold">
                                {" "}
                                {selectedFeedback.employee_id.firstName}{" "}
                                {selectedFeedback.employee_id.lastName}
                              </span>
                            </>
                          )}
                          {selectedFeedback.driver_id !== null && (
                            <>
                              <span> Driver : </span>
                              <span className="fw-bold">
                                {" "}
                                {selectedFeedback.driver_id.firstName}{" "}
                                {selectedFeedback.driver_id.lastName}
                              </span>
                            </>
                          )}
                          {selectedFeedback.student_id !== null && (
                            <>
                              <span> Student : </span>
                              <span className="fw-bold">
                                {" "}
                                {selectedFeedback.student_id.firstName}{" "}
                                {selectedFeedback.student_id.lastName}
                              </span>
                            </>
                          )}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <Form.Label>Description : </Form.Label>
                          <span> {selectedFeedback?.description!}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>Image : </Form.Label>
                        </Col>
                        <Col>
                          <Image src={selectedFeedback.image} fluid />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="d-flex align-items-center">
                <Col lg={3}>
                  <Form.Label htmlFor="feedbackAnswer">
                    Write an anwser :{" "}
                  </Form.Label>
                </Col>
                <Col>
                  <textarea
                    className="form-control"
                    id="feedbackAnswer"
                    name="feedbackAnswer"
                    rows={3}
                    onChange={handleAnswer}
                    value={feedbackAnswer}
                  ></textarea>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Card.Footer className="d-flex justify-content-center">
          <button
            type="submit"
            className="d-flex justify-content-center btn btn-success btn-label mb-2 mt-2"
            onClick={(e) => onSubmitAnswer(e)}
          >
            <i className="ri-add-line label-icon align-middle fs-16 me-2"></i>{" "}
            Answer
          </button>
        </Card.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Feedbacktable;
