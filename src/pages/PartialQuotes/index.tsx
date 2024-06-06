import React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import {
  useDeleteVisitorMutation,
  useGetAllVisitorsQuery,
} from "features/Visitor/visitorSlice";
import Swal from "sweetalert2";

const PartialQuotes = () => {
  document.title = "Partial Quotes | Bouden Coach Travel";
  const customTableStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        border: "1px solid #ddd",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        border: "1px solid #ddd",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        border: "1px solid #ddd",
      },
    },
  };

  const { data = [] } = useGetAllVisitorsQuery();
  const filteredVisitor = data.filter((visitor) => visitor.status === "new");
  const [deleteVisitor] = useDeleteVisitorMutation();

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
          deleteVisitor(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Quote is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Canceled", "Quote is safe :)", "info");
        }
      });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Phone</span>,
      selector: (row: any) => row.phone,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Go Date</span>,
      selector: (row: any) => row.estimated_start_time,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date Back</span>,
      selector: (row: any) => row.estimated_return_start_time,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pickup</span>,
      selector: (row: any) => row.start_point?.placeName!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row.destination_point?.placeName!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      selector: (row: any) => row.enquiryDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => (
        <ul className="hstack gap-2 list-unstyled mb-0">
          <li>
            <Link to="#" className="badge badge-soft-success edit-item-btn">
              <i className="ri-edit-2-line"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="badge badge-soft-danger remove-item-btn"
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
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Partial Quotes" pageTitle="Jobs" />
          <Col lg={12}>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <Row className="g-3">
                  <Col xxl={3} lg={6}>
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
                <DataTable
                  columns={columns}
                  data={filteredVisitor}
                  pagination
                  customStyles={customTableStyles}
                />
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default PartialQuotes;
