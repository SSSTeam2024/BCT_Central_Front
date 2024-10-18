import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetAllComplainsQuery } from "features/Complains/complainsSlice";

const paragraphStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  display: "-webkit-box",
};
const Claims = () => {
  document.title = "Complains | Coach Hire Network";

  const { data: allComplains = [] } = useGetAllComplainsQuery();

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

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredHourBand = () => {
    let filteredHourBand = allComplains;
    if (searchTerm) {
      filteredHourBand = filteredHourBand.filter(
        (hourBand: any) =>
          (hourBand?.name! &&
            hourBand?.name!.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (hourBand?.body! &&
            hourBand?.body!.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return filteredHourBand;
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
                    >
                      <option value="all">All Status</option>
                      <option value="Answered">Answered</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            {allComplains.map((complain) => (
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
                        {complain.status}
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
                              <td className="fw-bold">Title</td>
                              <td className="fw-medium">{complain.subject}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Description</td>
                              <td className="fw-medium">
                                {complain.description}
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
                  <Card.Footer className="p-1">
                    <p className="d-flex justify-content-end">
                      {complain.complainDate}
                    </p>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claims;
