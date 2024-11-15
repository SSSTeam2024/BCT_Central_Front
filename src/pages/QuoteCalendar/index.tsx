import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Quote, useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import { format } from "date-fns";
import DailyTable from "./DailyTable";
import HourlyTable from "./HourlyTable";
import WeeklyTable from "./WeeklyTable";
import MonthlyTable from "./MonthlyTable";
import QuoteDetailsCard from "./QuoteDetailsCard";
import DateFilterCard from "./DateFilterCard";
import PopupDetails from "./PopupDetails";
import AssignCard from "./AssignCard";

const QuoteCalendar = () => {
  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayQuotes, setTodayQuotes] = useState<Quote[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [selectedQuoteDate, setSelectedQuoteDate] = useState<Date | null>(
    new Date()
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Daily");

  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const formatDateForComparison = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  useEffect(() => {
    const formattedDate = formatDateForComparison(
      selectedQuoteDate || currentDate
    );
    const filteredQuotes = AllQuotes.filter(
      (quote) => quote.date === formattedDate
    );
    setTodayQuotes(filteredQuotes);
  }, [selectedQuoteDate, currentDate, AllQuotes]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={5}>
              <QuoteDetailsCard selectedQuote={selectedQuote} />
            </Col>
            <Col lg={4}>
              <DateFilterCard
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
                selectedQuoteDate={selectedQuoteDate}
                setSelectedQuoteDate={setSelectedQuoteDate}
              />
            </Col>
            <Col>
              <AssignCard selectedQuote={selectedQuote} />
            </Col>
          </Row>
          <Row>
            <Card className="p-3">
              {selectedPeriod === "Daily" && (
                <DailyTable
                  selectedPeriod="Daily"
                  quotes={todayQuotes}
                  setSelectedQuote={(quote) => setSelectedQuote(quote)}
                  togglePopup={togglePopup}
                />
              )}
              {selectedPeriod === "Hourly" && (
                <HourlyTable
                  selectedPeriod="Hourly"
                  quotes={todayQuotes}
                  setSelectedQuote={(quote) => {
                    setSelectedQuote(quote);
                    togglePopup();
                  }}
                />
              )}
              {selectedPeriod === "Weekly" && (
                <WeeklyTable
                  selectedPeriod="Weekly"
                  quotes={todayQuotes}
                  setSelectedQuote={(quote) => setSelectedQuote(quote)}
                  togglePopup={togglePopup}
                />
              )}
              {selectedPeriod === "Monthly" && (
                <MonthlyTable
                  selectedPeriod="Monthly"
                  quotes={todayQuotes}
                  setSelectedQuote={(quote) => {
                    setSelectedQuote(quote);
                    togglePopup();
                  }}
                />
              )}
            </Card>
          </Row>
          {isPopupOpen && (
            <PopupDetails selectedQuote={selectedQuote} onClose={togglePopup} />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default QuoteCalendar;
