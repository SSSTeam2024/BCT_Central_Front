import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import TableContainer from "Common/TableContainer";
import { shipments } from "Common/data";
import Swal from "sweetalert2";

const paragraphStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  display: "-webkit-box",
};
const Claims = () => {
  document.title = "Claims | Bouden Coach Travel";

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const deleteClaim = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, archive it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Archived!",
            text: "Your file has been archived.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your claim is safe :)",
            icon: "error",
          });
        }
      });
  };

  const answerClaims = async () => {
    await Swal.fire({
      title: "Submit your reply",
      input: "textarea",
      inputAttributes: {
        autocapitalize: "off",
      },
      inputPlaceholder: "Type your message here...",
      showCancelButton: true,
      confirmButtonText: `
    Send <i class="ri-send-plane-fill"></i>
  `,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState<boolean>(false);

  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeight !== ref.current.clientHeight
      );
    }
  }, []);
  return (
    // Quote ID Issue Title Travel Date Customer Name Customer Email Customer Phone Driver Status Loss Date
    //
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Claims" pageTitle="Feedback&Claims" />
          <Row>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
                  <Col xxl={2} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All Categories</option>
                    </select>
                  </Col>
                  <Col xxl={2} lg={6}>
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="">Status</option>
                      <option value="Pickups">Answered</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </Col>
                  <Col xxl={2} lg={6}>
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="">Driver</option>
                      <option value="Pickups">Ali yahia</option>
                      <option value="Pending">Andrew</option>
                      <option value="Pending">Louai Ibraheem Almasri</option>
                      <option value="Pending">Shane</option>
                    </select>
                  </Col>
                  <Col xxl={3}></Col>
                  <Col>
                    <div
                      className="d-flex gap-2"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Button variant="light" className="add-btn text-dark">
                        <i className="ph ph-export me-1 align-middle"></i>{" "}
                        Export
                      </Button>

                      <Button variant="light" className="add-btn text-dark">
                        <i className="ph ph-plus me-1 align-middle"></i> Add
                        Category
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <div className="col-12">
              <Row>
                <Col xxl={4}>
                  <Card>
                    <Card.Header>
                      <Link
                        to="#"
                        className="link-danger fw-medium float-end"
                        onClick={deleteClaim}
                      >
                        Archive
                      </Link>
                      <h5 className="card-title mb-0">
                        Ifor Jones{" "}
                        <span className="badge bg-success align-middle fs-10">
                          Answered
                        </span>
                      </h5>
                      <h6 className="text-muted mt-1">
                        ifor.jones@pioneergroup.org.uk
                      </h6>
                      <h6 className="text-muted mt-1">0741309670</h6>
                    </Card.Header>
                    <Card.Body>
                      <p
                        className="card-text d-flex"
                        style={isOpen ? undefined : paragraphStyles}
                        ref={ref}
                      >
                        <div className="table-responsive">
                          <Table className="table-borderless table-sm mb-0">
                            <tbody>
                              <tr>
                                <td className="fw-bold">Quote</td>
                                <td className="fw-medium">20013</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Title</td>
                                <td className="fw-medium">
                                  coach didnt turn up
                                </td>
                              </tr>
                              <tr className="fw-bold">
                                <td>Travel Date:</td>
                                <td className="fw-medium">31 Mar 2017 10:30</td>
                              </tr>
                              <tr className="fw-bold">
                                <td>Driver:</td>
                                <td className="fw-medium">Andrew</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </p>
                      <div className="text-end">
                        {showReadMoreButton && (
                          <Link
                            to="#"
                            className="link-dark fw-medium"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            {isOpen ? (
                              <i className="ri-arrow-up-s-line align-middle"></i>
                            ) : (
                              <i className="ri-arrow-down-s-line align-middle"></i>
                            )}
                          </Link>
                        )}
                      </div>
                    </Card.Body>
                    <Card.Footer className="p-0">
                      <p className="d-flex justify-content-end">19 Jun 2017</p>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col xxl={4}>
                  <Card>
                    <Card.Header>
                      <Link
                        to="#"
                        className="link-danger fw-medium float-end"
                        onClick={deleteClaim}
                      >
                        Archive
                      </Link>
                      <h5 className="card-title mb-0">
                        Pam Badham{" "}
                        <span className="badge bg-success align-middle fs-10">
                          Answered
                        </span>
                      </h5>
                      <h6 className="text-muted mt-1">
                        p.badham@tyler-parkes.co.uk
                      </h6>
                      <h6 className="text-muted mt-1">01217445511</h6>
                    </Card.Header>
                    <Card.Body>
                      <p
                        className="card-text d-flex"
                        style={isOpen ? undefined : paragraphStyles}
                        ref={ref}
                      >
                        <div className="table-responsive">
                          <Table className="table-borderless table-sm mb-0">
                            <tbody>
                              <tr>
                                <td className="fw-bold">Quote</td>
                                <td className="fw-medium">21719</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Title</td>
                                <td className="fw-medium">
                                  Driver was late due to traffic
                                </td>
                              </tr>
                              <tr className="fw-bold">
                                <td>Travel Date:</td>
                                <td className="fw-medium">17 May 2017 12:30</td>
                              </tr>
                              <tr className="fw-bold">
                                <td>Driver:</td>
                                <td className="fw-medium">Andrew</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </p>
                      <div className="text-end">
                        {showReadMoreButton && (
                          <Link
                            to="#"
                            className="link-dark fw-medium"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            {isOpen ? (
                              <i className="ri-arrow-up-s-line align-middle"></i>
                            ) : (
                              <i className="ri-arrow-down-s-line align-middle"></i>
                            )}
                          </Link>
                        )}
                      </div>
                    </Card.Body>
                    <Card.Footer className="p-0">
                      <p className="d-flex justify-content-end">17 May 2017</p>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col xxl={4}>
                  <Card>
                    <Card.Header>
                      <Link
                        to="#"
                        className="link-danger fw-medium float-end"
                        onClick={deleteClaim}
                      >
                        Archive
                      </Link>
                      <h5 className="card-title mb-0">
                        Shanice Edwards{" "}
                        <span className="badge bg-success align-middle fs-10">
                          Answered
                        </span>
                      </h5>
                      <h6 className="text-muted mt-1">shan.bb@hotmail.co.uk</h6>
                      <h6 className="text-muted mt-1">07535805677</h6>
                    </Card.Header>
                    <Card.Body>
                      <p
                        className="card-text d-flex"
                        style={isOpen ? undefined : paragraphStyles}
                        ref={ref}
                      >
                        <div className="table-responsive">
                          <Table className="table-borderless table-sm mb-0">
                            <tbody>
                              <tr>
                                <td className="fw-bold">Quote</td>
                                <td className="fw-medium">22739</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Title</td>
                                <td className="fw-medium">
                                  Vehicle drove to the wrong place.
                                </td>
                              </tr>
                              <tr className="fw-bold">
                                <td>Travel Date:</td>
                                <td className="fw-medium">30 May 2017 08:30</td>
                              </tr>
                              <tr className="fw-bold">
                                <td>Driver:</td>
                                <td className="fw-medium">spare</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </p>
                      <div className="text-end">
                        {showReadMoreButton && (
                          <Link
                            to="#"
                            className="link-dark fw-medium"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            {isOpen ? (
                              <i className="ri-arrow-up-s-line align-middle"></i>
                            ) : (
                              <i className="ri-arrow-down-s-line align-middle"></i>
                            )}
                          </Link>
                        )}
                      </div>
                    </Card.Body>
                    <Card.Footer className="p-0">
                      <p className="d-flex justify-content-end">30 May 2017</p>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </div>
          </Row>

          <Row>
            <Col xxl={4}>
              <Card>
                <Card.Header>
                  <Link
                    to="#"
                    className="link-secondary fw-medium float-end"
                    onClick={() => answerClaims()}
                  >
                    Answer
                  </Link>
                  <h5 className="card-title mb-0">
                    Zach Mclean{" "}
                    <span className="badge bg-warning align-middle fs-10">
                      Pending
                    </span>
                  </h5>
                  <h6 className="text-muted mt-1">lcfcmclean@aol.co.uk</h6>
                  <h6 className="text-muted mt-1">07973931555</h6>
                </Card.Header>
                <Card.Body>
                  <p
                    className="card-text d-flex"
                    style={isOpen ? undefined : paragraphStyles}
                    ref={ref}
                  >
                    <div className="table-responsive">
                      <Table className="table-borderless table-sm mb-0">
                        <tbody>
                          <tr>
                            <td className="fw-bold">Quote</td>
                            <td className="fw-medium">22829</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Title</td>
                            <td className="fw-medium">
                              payment was made to late.
                            </td>
                          </tr>
                          <tr className="fw-bold">
                            <td>Travel Date:</td>
                            <td className="fw-medium">9 Jun 2017 04:00</td>
                          </tr>
                          <tr className="fw-bold">
                            <td>Driver:</td>
                            <td className="fw-medium">No Driver</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </p>
                  <div className="text-end">
                    {showReadMoreButton && (
                      <Link
                        to="#"
                        className="link-dark fw-medium"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {isOpen ? (
                          <i className="ri-arrow-up-s-line align-middle"></i>
                        ) : (
                          <i className="ri-arrow-down-s-line align-middle"></i>
                        )}
                      </Link>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer className="p-0">
                  <p className="d-flex justify-content-end">14 Jun 2017</p>
                </Card.Footer>
              </Card>
            </Col>
            <Col xxl={4}>
              <Card>
                <Card.Header>
                  <Link
                    to="#"
                    className="link-secondary fw-medium float-end"
                    onClick={() => answerClaims()}
                  >
                    Answer
                  </Link>
                  <h5 className="card-title mb-0">
                    Kieron{" "}
                    <span className="badge bg-warning align-middle fs-10">
                      Pending
                    </span>
                  </h5>
                  <h6 className="text-muted mt-1">kieron@lighthouse12.com</h6>
                  <h6 className="text-muted mt-1">07713069556</h6>
                </Card.Header>
                <Card.Body>
                  <p
                    className="card-text d-flex"
                    style={isOpen ? undefined : paragraphStyles}
                    ref={ref}
                  >
                    <div className="table-responsive">
                      <Table className="table-borderless table-sm mb-0">
                        <tbody>
                          <tr>
                            <td className="fw-bold">Quote</td>
                            <td className="fw-medium">25500</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Title</td>
                            <td className="fw-medium">
                              Arrival an hour later than scheduled
                            </td>
                          </tr>
                          <tr className="fw-bold">
                            <td>Travel Date:</td>
                            <td className="fw-medium">12 Aug 2017 09:00</td>
                          </tr>
                          <tr className="fw-bold">
                            <td>Driver:</td>
                            <td className="fw-medium">Sing And Kaur Ltd </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </p>
                  <div className="text-end">
                    {showReadMoreButton && (
                      <Link
                        to="#"
                        className="link-dark fw-medium"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {isOpen ? (
                          <i className="ri-arrow-up-s-line align-middle"></i>
                        ) : (
                          <i className="ri-arrow-down-s-line align-middle"></i>
                        )}
                      </Link>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer className="p-0">
                  <p className="d-flex justify-content-end">12 Aug 2017</p>
                </Card.Footer>
              </Card>
            </Col>
            <Col xxl={4}>
              <Card>
                <Card.Header>
                  <Link
                    to="#"
                    className="link-danger fw-medium float-end"
                    onClick={deleteClaim}
                  >
                    Archive
                  </Link>
                  <h5 className="card-title mb-0">
                    Lesley Harding{" "}
                    <span className="badge bg-success align-middle fs-10">
                      Answered
                    </span>
                  </h5>
                  <h6 className="text-muted mt-1">harding63@hotmail.com</h6>
                  <h6 className="text-muted mt-1">07491880111</h6>
                </Card.Header>
                <Card.Body>
                  <p
                    className="card-text d-flex"
                    style={isOpen ? undefined : paragraphStyles}
                    ref={ref}
                  >
                    <div className="table-responsive">
                      <Table className="table-borderless table-sm mb-0">
                        <tbody>
                          <tr>
                            <td className="fw-bold">Quote</td>
                            <td className="fw-medium">72236</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Title</td>
                            <td className="fw-medium">
                              Driver rude and falling asleep at wheel
                            </td>
                          </tr>
                          <tr className="fw-bold">
                            <td>Travel Date:</td>
                            <td className="fw-medium">24 Sep 2022 12:00</td>
                          </tr>
                          <tr className="fw-bold">
                            <td>Driver:</td>
                            <td className="fw-medium">
                              Louai Ibraheem Almasri
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </p>
                  <div className="text-end">
                    {showReadMoreButton && (
                      <Link
                        to="#"
                        className="link-dark fw-medium"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {isOpen ? (
                          <i className="ri-arrow-up-s-line align-middle"></i>
                        ) : (
                          <i className="ri-arrow-down-s-line align-middle"></i>
                        )}
                      </Link>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer className="p-0">
                  <p className="d-flex justify-content-end">26 Sep 2022</p>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claims;
