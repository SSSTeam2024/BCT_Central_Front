import React, { useMemo, useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { Quote, useGetAllQuoteQuery } from "features/Quotes/quoteSlice";

const AgedDebtors = () => {
  document.title = "Aged Debtors | Coach Hire Network";

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();

  const quotesAgedDebtors = AllQuotes.filter(
    (bookings) =>
      bookings.progress === "Completed" &&
      bookings?.payment_method === "deposit" &&
      bookings?.category !== "Regular"
  );

  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  const now = new Date();

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Account</span>,
      selector: (row: any) => <span>{row?.id_visitor?.name!}</span>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      selector: (row: any) => <span>£ {row.total_price}</span>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row: any) => {
        return (
          <span
            className="mdi mdi-email-outline"
            title={`${row?.id_visitor?.email!}`}
          ></span>
        );
      },
      sortable: true,
      width: "78px",
    },
    {
      name: <span className="font-weight-bold fs-13">Phone</span>,
      selector: (row: any) => {
        return (
          <span
            className="mdi mdi-phone-in-talk-outline"
            title={`${row?.id_visitor?.phone!}`}
          ></span>
        );
      },
      sortable: true,
      width: "85px",
    },
    {
      name: <span className="font-weight-bold fs-13">Credit Limit</span>,
      selector: (row: any) => <span>£ {row.deposit_amount}</span>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">VAT</span>,
      sortable: true,
      selector: (row: any) => <span>£ {Number(row.manual_cost) * 0.2}</span>,
      width: "78px",
    },
    {
      name: <span className="font-weight-bold fs-13">0-30 days</span>,
      sortable: true,
      selector: (row: any) => {
        const updatedDate = new Date(row.updatedAt ?? "");
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const inRange = updatedDate >= thirtyDaysAgo && updatedDate <= today;

        return inRange ? (
          <span>£ {Number(row.total_price) - Number(row.deposit_amount)}</span>
        ) : (
          <span>--</span>
        );
      },
    },
    {
      name: <span className="font-weight-bold fs-13">31-60 days</span>,
      sortable: true,
      selector: (row: any) => {
        const updatedDate = new Date(row.updatedAt ?? "");
        const today = new Date();

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(today.getDate() - 60);

        const inRange =
          updatedDate >= sixtyDaysAgo && updatedDate < thirtyDaysAgo;

        return inRange ? (
          <span>£ {Number(row.total_price) - Number(row.deposit_amount)}</span>
        ) : (
          <span>--</span>
        );
      },
    },
    {
      name: <span className="font-weight-bold fs-13">61-90 days</span>,
      sortable: true,
      selector: (row: any) => {
        const updatedDate = new Date(row.updatedAt ?? "");
        const today = new Date();

        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(today.getDate() - 60);

        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);

        const inRange =
          updatedDate >= ninetyDaysAgo && updatedDate < sixtyDaysAgo;

        return inRange ? (
          <span>£ {Number(row.total_price) - Number(row.deposit_amount)}</span>
        ) : (
          <span>--</span>
        );
      },
    },
    {
      name: <span className="font-weight-bold fs-13">90+ days</span>,
      sortable: true,
      selector: (row: any) => {
        const updatedDate = new Date(row.updatedAt ?? "");
        const today = new Date();

        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);

        const inRange = updatedDate < ninetyDaysAgo;

        return inRange ? (
          <span>£ {Number(row.total_price) - Number(row.deposit_amount)}</span>
        ) : (
          <span>--</span>
        );
      },
    },
  ];

  const filteredQuotes = useMemo(() => {
    if (!selectedRange) return quotesAgedDebtors;

    const getDateBeforeDays = (days: number) =>
      new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return quotesAgedDebtors.filter((quote) => {
      const updatedAt = new Date(quote.updatedAt || "");

      if (selectedRange === "30") {
        return updatedAt >= getDateBeforeDays(30) && updatedAt <= now;
      } else if (selectedRange === "60") {
        return (
          updatedAt >= getDateBeforeDays(60) &&
          updatedAt < getDateBeforeDays(30)
        );
      } else if (selectedRange === "90") {
        return (
          updatedAt >= getDateBeforeDays(90) &&
          updatedAt < getDateBeforeDays(60)
        );
      } else if (selectedRange === "90plus") {
        return updatedAt < getDateBeforeDays(90);
      }

      return true;
    });
  }, [selectedRange, quotesAgedDebtors]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Aged Debtors" pageTitle="Finance" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
                  <Col className="d-flex align-items-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        checked={selectedRange === "30"}
                        onChange={() =>
                          setSelectedRange(selectedRange === "30" ? null : "30")
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        30 days
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        checked={selectedRange === "60"}
                        onChange={() =>
                          setSelectedRange(selectedRange === "60" ? null : "60")
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox2"
                      >
                        60 days
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        checked={selectedRange === "90"}
                        onChange={() =>
                          setSelectedRange(selectedRange === "90" ? null : "90")
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox3"
                      >
                        90 days
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox4"
                        checked={selectedRange === "90plus"}
                        onChange={() =>
                          setSelectedRange(
                            selectedRange === "90plus" ? null : "90plus"
                          )
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox3"
                      >
                        90+ days
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox3"
                      >
                        Overdue
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox3"
                      >
                        Over credit limit
                      </label>
                    </div>
                    <div className="d-flex gap-1 mb-2">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm fs-10"
                      >
                        Email Statement
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm fs-10"
                      >
                        Print Statement
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm fs-10"
                      >
                        <i className="ph ph-copy"></i> Print Summary
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm fs-10"
                      >
                        Export
                      </button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card id="shipmentsList">
              <Card.Body>
                <DataTable columns={columns} data={filteredQuotes} pagination />
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default AgedDebtors;
