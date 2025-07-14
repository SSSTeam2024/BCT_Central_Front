import React, { useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import { useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import { RootState } from "../../app/store";
import { selectCurrentUser } from "features/Account/authSlice";
import { useSelector } from "react-redux";

const Payments = () => {
  document.title = "Payments | Coach Hire Network";

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();

  const user = useSelector((state: RootState) => selectCurrentUser(state));

  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const quotesPayed = AllQuotes.filter(
    (bookings) =>
      bookings.progress === "Completed" &&
      bookings?.payment_method !== "deposit" &&
      bookings?.category !== "Regular"
  );

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">ID Quote</span>,
      selector: (row: any) => row?.quote_ref!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Account</span>,
      selector: (row: any) => <span>{row?.id_visitor?.name!}</span>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pay Date</span>,
      selector: (row: any) => (
        <span>{new Date(row?.updatedAt!)?.toDateString()!}</span>
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pay Method</span>,
      selector: (row: any) => row.payment_type,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Amount</span>,
      selector: (row: any) => <span>£ {row?.total_price!}</span>,
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Notes</span>,
    //   selector: (row: any) => {
    //     row?.notes! === "" ? <span>--</span> : <span>{row?.notes!}</span>;
    //   },
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">Admin</span>,
      sortable: true,
      selector: (row: any) => <span>{user?.name!}</span>,
    },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (date: any) => {
    if (date[0]) {
      const utcDate = new Date(
        Date.UTC(date[0].getFullYear(), date[0].getMonth(), date[0].getDate())
      );
      setSelectedDate(utcDate);
    } else {
      setSelectedDate(null);
    }
  };

  const dateFilteredQuotes = selectedDate
    ? quotesPayed.filter((quote: any) => {
        const quoteDate = new Date(quote.updatedAt);
        return (
          quoteDate.getUTCFullYear() === selectedDate.getUTCFullYear() &&
          quoteDate.getUTCMonth() === selectedDate.getUTCMonth() &&
          quoteDate.getUTCDate() === selectedDate.getUTCDate()
        );
      })
    : quotesPayed;

  const filteredData = dateFilteredQuotes.filter((quote: any) => {
    if (searchTerm === "") return true;

    return (
      quote.quote_ref?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id_visitor?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      quote.payment_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.total_price?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(quote.updatedAt)
        ?.toDateString()
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Payments" pageTitle="Finance" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
                  <Col xxl={3} lg={4}>
                    <Flatpickr
                      className="form-control flatpickr-input"
                      placeholder="Select Date"
                      options={{
                        dateFormat: "d M, Y",
                      }}
                      onChange={handleDateChange}
                    />
                  </Col>
                  <Col></Col>
                  <Col xxl={3} lg={4} className="text-end">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for something..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <DataTable columns={columns} data={filteredData} pagination />
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Payments;
