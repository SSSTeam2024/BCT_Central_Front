import React, { useRef } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteEmailSentMutation,
  useGetAllSentEmailsQuery,
} from "features/emailSent/emailSentSlice";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import emailAnimation from "../../assets/images/Animation - 1717169436713.json";
const EmailsSent = () => {
  document.title = "Emails Sent | Coach Hire Network";
  const lottieRef3 = useRef<LottieRefCurrentProps>(null);
  const { data: AllSentEmails = [], isLoading } = useGetAllSentEmailsQuery();
  console.log(AllSentEmails);
  const [deleteEmailSent] = useDeleteEmailSentMutation();

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
      selector: (row: any) => row.date,
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
                // onClick={() => handleDownload(row.attachment)}
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
    </React.Fragment>
  );
};
export default EmailsSent;
