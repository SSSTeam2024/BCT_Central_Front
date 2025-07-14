import React from "react";
import { Container, Card, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { useGetAllQuoteQuery } from "features/Quotes/quoteSlice";

const Outstanding = () => {
  document.title = "Outstanding | Coach Hire Network";

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();

  const quotesNotPaid = AllQuotes.filter(
    (bookings) =>
      bookings.progress === "Booked" &&
      bookings?.payment_method === undefined &&
      bookings?.category !== "Regular"
  );

  const quotesHalfPaid = AllQuotes.filter(
    (bookings) =>
      bookings.progress === "Booked" &&
      bookings?.payment_method === "deposit" &&
      bookings?.category !== "Regular"
  );

  const columnsNotPaid = [
    {
      name: <span className="font-weight-bold fs-13">Quote</span>,
      selector: (row: any) => row?.quote_ref!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Passenger</span>,
      selector: (row: any) => row?.id_visitor?.name!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => <span>£ {row?.total_price!}</span>,
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">Due</span>,
      selector: (row: any) => <span>£ {row?.total_price!}</span>,
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">Due Date</span>,
      selector: (row: any) => new Date(row?.updatedAt!)?.toDateString()!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Outward Date</span>,
      selector: (row: any) => new Date(row?.createdAt!)?.toDateString()!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Invoice Sent Date</span>,
      sortable: true,
      selector: (row: any) => new Date(row?.updatedAt!)?.toDateString()!,
    },
  ];

  const columnsHalfPaid = [
    {
      name: <span className="font-weight-bold fs-13">Quote</span>,
      selector: (row: any) => row?.quote_ref!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Passenger</span>,
      selector: (row: any) => row?.id_visitor?.name!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => <span>£ {row?.total_price!}</span>,
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">Due</span>,
      selector: (row: any) => (
        <span>
          £ {Number(row?.total_price!) - Number(row?.deposit_amount!)}
        </span>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">Due Date</span>,
      selector: (row: any) => new Date(row?.updatedAt!)?.toDateString()!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Outward Date</span>,
      selector: (row: any) => new Date(row?.createdAt!)?.toDateString()!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Invoice Sent Date</span>,
      sortable: true,
      selector: (row: any) => new Date(row?.updatedAt!)?.toDateString()!,
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Outstanding" pageTitle="Finance" />
          <Col lg={12}>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-sm">
                      <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                        <i className="mdi mdi-currency-usd-off"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">Booked but not paid</h5>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={columnsNotPaid}
                  data={quotesNotPaid}
                  pagination
                />
              </Card.Body>
            </Card>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-sm">
                      <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                        <i className="mdi mdi-fraction-one-half"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">Part paid</h5>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={columnsHalfPaid}
                  data={quotesHalfPaid}
                  pagination
                />
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Outstanding;
