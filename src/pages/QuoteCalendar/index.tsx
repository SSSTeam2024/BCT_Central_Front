import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./QuoteCalendar.css";

import { Quote, useGetAllQuoteQuery } from "features/Quotes/quoteSlice";

const QuoteCalendar = () => {
  document.title = "Calendar | Bouden Coach Travel";

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();

  const [pickUp_date, setPickUp_date] = useState<Date | null>(null);
  const [dropOff_date, setDropOff_date] = useState<Date | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const handleCircleClick = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    const classes = AllQuotes.reduce((acc: string[], quote: Quote) => {
      if (quote.date === formattedDate) {
        switch (quote.progress) {
          case "New":
            acc.push("quote-day-new");
            break;
          case "Booked":
            acc.push("quote-day-booked");
            break;
          case "Completed":
            acc.push("quote-day-confirmed");
            break;
          case "Cancel":
            acc.push("quote-day-cancel");
            break;
          case "Deleted":
            acc.push("quote-day-deleted");
            break;
          case "Accepted":
            acc.push("quote-day-accepted");
            break;
          case "On Route":
            acc.push("quote-day-onroute");
            break;
          case "On site":
            acc.push("quote-day-onsite");
            break;
          case "Picked Up":
            acc.push("quote-day-pickedup");
            break;
        }
      }
      return acc;
    }, []);

    if (classes.length > 0) {
      return classes.join(" ");
    }

    if (date < pickUp_date! || date > dropOff_date!) {
      return null;
    }

    return null;
  };

  const tileContent = ({ date }: { date: Date }) => {
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    const quote = AllQuotes.find(
      (quote: Quote) => quote.date === formattedDate
    );
    console.log(quote);
    if (quote) {
      return (
        <div
          // className={`quote-circle ${quote.progress}`}
          onClick={() => handleCircleClick(quote)}
        />
      );
    }

    return null;
  };
  console.log(selectedQuote);
  const tileDisabled = ({ date }: { date: Date }) => {
    return date < pickUp_date! || date > dropOff_date!;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Card>
            <Row>
              <Col lg={11}>
                <div className="d-flex justify-content-center w-100 h-100 p-3">
                  <Calendar
                    tileClassName={tileClassName}
                    tileContent={tileContent}
                    tileDisabled={tileDisabled}
                  />
                </div>
              </Col>
              <Col lg={1}>
                <div className="table-responsive">
                  <table className="table table-sm table-borderless align-middle description-table">
                    <tbody>
                      <tr>
                        <td>
                          <p className="legend-container">
                            <span className="legend bg-day-new"></span>
                            New
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="legend-container">
                            <span className="legend bg-day-booked"></span>
                            Booking
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p className="legend-container">
                            <span className="legend bg-day-onsite"></span>On
                            Site
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="legend-container">
                            <span className="legend bg-day-onroute"></span>On
                            Route
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="legend-container">
                            <span className="legend bg-day-pickedup"></span>
                            Picked Up
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="legend-container">
                            <span className="legend bg-day-completed"></span>
                            Completed
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="legend-container">
                            <span className="legend bg-day-cancel"></span>
                            Cancelled
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <Row>
              {selectedQuote && (
                <div className="quote-details">
                  <h3>Quote Details</h3>
                  <p>Date: {selectedQuote.date}</p>
                  <p>Progress: {selectedQuote.progress}</p>
                  <p>Other details: {selectedQuote.date}</p>
                </div>
              )}
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default QuoteCalendar;
