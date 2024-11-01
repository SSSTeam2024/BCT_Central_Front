import React, { useRef, useState } from "react";
import { Container, Row, Card, Col, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteEmailSentMutation,
  useGetAllSentEmailsQuery,
} from "features/emailSent/emailSentSlice";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import emailAnimation from "../../assets/images/Animation - 1717169436713.json";
import { useGetVisitorByEmailQuery } from "features/Visitor/visitorSlice";
import { useGetQuotesByReferenceQuery } from "features/Quotes/quoteSlice";
const EmailsSent = () => {
  document.title = "Emails Sent | Coach Hire Network";
  const lottieRef3 = useRef<LottieRefCurrentProps>(null);
  const { data: AllSentEmails = [], isLoading } = useGetAllSentEmailsQuery();
  const location = useLocation();
  const emailLocation = location.state;
  const quoteID = emailLocation?.quoteID;
  const { data: quotesByReference = [] } = useGetQuotesByReferenceQuery(
    quoteID,
    { skip: !quoteID, refetchOnMountOrArgChange: true }
  );

  const [deleteEmailSent] = useDeleteEmailSentMutation();

  const [modal_EmailDetails, setmodal_EmailDetails] = useState<boolean>(false);
  function tog_EmailDetails() {
    setmodal_EmailDetails(!modal_EmailDetails);
  }

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
        text: "You won't be able to go back !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteEmailSent(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Email Sent is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Email Sent is safe :)",
            "info"
          );
        }
      });
  };
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => {
        const createdAtTime = new Date(row.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <div>
            <span className="fw-medium">{row.date}</span> at{" "}
            <span className="fw-medium">{createdAtTime}</span>
          </div>
        );
      },
      sortable: true,
      width: "220px",
    },
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (row: any) =>
        row?.quoteID === null ? "------" : <span>{row?.quoteID}</span>,
      sortable: true,
      width: "220px",
    },
    {
      name: <span className="font-weight-bold fs-13">Subject</span>,
      selector: (row: any) => (
        <span>
          <b>{row.subjectEmail}</b>
        </span>
      ),
      sortable: true,
      width: "260px",
    },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row: any) => row.from,
      sortable: true,
      width: "260px",
    },
    {
      name: <span className="font-weight-bold fs-13">To</span>,
      selector: (row: any) => row.to,
      sortable: true,
      width: "260px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-3 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-info edit-item-btn"
                onClick={tog_EmailDetails}
                state={row}
              >
                <i className="ri-eye-line"></i>
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

  const createdAtTime = new Date(emailLocation?.createdAt!).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  const { data: oneVisitor } = useGetVisitorByEmailQuery(emailLocation?.to!!);
  let newBody = emailLocation?.emailBody!;

  if (location.state !== null) {
    if (emailLocation?.emailBody!.includes("[name]")) {
      newBody = newBody.replace("[name]", oneVisitor?.name!);
    }

    if (emailLocation?.emailBody!.includes("[customername]")) {
      newBody = newBody.replace("[customername]", oneVisitor?.name!);
    }

    if (emailLocation?.emailBody!.includes("[drivername]")) {
      newBody = newBody.replace(
        "[drivername]",
        `${quotesByReference[0].id_driver.firstname} ${quotesByReference[0].id_driver.surname}`
      );
    }
    if (emailLocation?.emailBody!.includes("[quote_num]")) {
      newBody = newBody.replace("[quote_num]", emailLocation?.quoteID!);
    }

    if (emailLocation?.emailBody!.includes("[Driver's Name]")) {
      newBody = newBody.replace(
        "[Driver's Name]",
        `${quotesByReference[0]?.id_driver?.firstname!} ${quotesByReference[0]
          ?.id_driver?.surname!}`
      );
    }
    if (emailLocation?.emailBody!.includes("[Driver's Contact Number]")) {
      newBody = newBody.replace(
        "[Driver's Contact Number]",
        quotesByReference[0]?.id_driver?.phonenumber!
      );
    }
  }

  if (emailLocation?.emailBody!.includes("[Website_phone]")) {
    newBody = newBody.replace("[Website_phone]", "+44 800 112 3770 ");
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Emails Sent" pageTitle="Messages" />
          <Col lg={12}>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <Row className="g-2">
                  <Col lg={8} className="d-flex">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for something..."
                      />
                      <i className="ri-search-line search-icon"></i>
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
                        animationData={emailAnimation}
                        loop={false}
                        style={{ width: 300 }}
                      />
                    </Col>
                  </Row>
                ) : (
                  <DataTable
                    columns={columns}
                    data={AllSentEmails}
                    pagination
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
      <Modal
        className="fade zoomIn"
        size="lg"
        show={modal_EmailDetails}
        onHide={() => {
          tog_EmailDetails();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Email Details
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Card>
            <Card.Header>
              <span className="fw-bold fs-18">
                {emailLocation?.subjectEmail!}
              </span>
            </Card.Header>
            <Card.Body>
              <Row className="mb-2">
                <Col lg={3}>
                  <Form.Label>Subject</Form.Label>
                </Col>
                <Col>
                  <span>{emailLocation?.subjectEmail!}</span>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg={3}>
                  <Form.Label>Date</Form.Label>
                </Col>
                <Col>
                  <span>{emailLocation?.date!}</span> at{" "}
                  <span>{createdAtTime}</span>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg={3}>
                  <Form.Label>From</Form.Label>
                </Col>
                <Col>
                  <span>{emailLocation?.from!}</span>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg={3}>
                  <Form.Label>To</Form.Label>
                </Col>
                <Col>
                  <span>{emailLocation?.to!}</span>
                </Col>
              </Row>
              {emailLocation?.quoteID! === null ? (
                <Row className="mb-2">
                  <div className="d-flex justify-content-center text-danger fs-19">
                    This email is not assigned to any quote!
                  </div>
                </Row>
              ) : (
                <Row className="mb-2">
                  <Col lg={3}>
                    <Form.Label>Quote ID</Form.Label>
                  </Col>
                  <Col>
                    <span>{emailLocation?.quoteID!}</span>
                  </Col>
                </Row>
              )}
              <Row className="mb-2">
                <Col lg={3}>
                  <Form.Label>Body</Form.Label>
                </Col>
                <Col>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: newBody,
                    }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default EmailsSent;
