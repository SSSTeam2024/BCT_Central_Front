import React, { useState, CSSProperties, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Quote, useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import { format } from "date-fns";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import Flatpickr from "react-flatpickr";

interface DateFilterCardProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  selectedQuoteDate: Date | null;
  setSelectedQuoteDate: (date: Date | null) => void;
  setSelectedMonth: (string: string) => void;
  setSelectedWeek: (string: string) => void;
}

const DateFilterCard: React.FC<DateFilterCardProps> = ({
  selectedPeriod,
  setSelectedPeriod,
  selectedQuoteDate,
  setSelectedQuoteDate,
  setSelectedMonth,
  setSelectedWeek,
}) => {
  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayQuotes, setTodayQuotes] = useState<Quote[]>([]);

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

  const handlePreviousDate = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (selectedPeriod === "Daily" || selectedPeriod === "Hourly") {
        newDate.setDate(newDate.getDate() - 1);
      } else if (selectedPeriod === "Weekly") {
        newDate.setDate(newDate.getDate() - 7);
      } else if (selectedPeriod === "Monthly") {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      setSelectedQuoteDate(newDate);
      return newDate;
    });
  };

  const handleNextDate = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (selectedPeriod === "Daily" || selectedPeriod === "Hourly") {
        newDate.setDate(newDate.getDate() + 1);
      } else if (selectedPeriod === "Weekly") {
        newDate.setDate(newDate.getDate() + 7);
      } else if (selectedPeriod === "Monthly") {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      setSelectedQuoteDate(newDate);
      return newDate;
    });
  };

  const handleQuoteDateChange = (selectedDates: Date[]) => {
    const selectedDate = selectedDates[0];
    setSelectedQuoteDate(selectedDate);
    setCurrentDate(selectedDate);
  };

  const handleSelectPeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSelectedPeriod(value);
    setCurrentDate(new Date());
  };

  const getCurrentDateDisplay = () => {
    if (selectedPeriod === "Daily" || selectedPeriod === "Hourly") {
      return format(currentDate, "dd-MM-yyyy");
    } else if (selectedPeriod === "Weekly") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      setSelectedWeek(
        `${format(startOfWeek, "dd-MM-yyyy")} to ${format(
          endOfWeek,
          "dd-MM-yyyy"
        )}`
      );
      return `${format(startOfWeek, "dd-MM-yyyy")} to ${format(
        endOfWeek,
        "dd-MM-yyyy"
      )}`;
    } else if (selectedPeriod === "Monthly") {
      setSelectedMonth(format(currentDate, "MMMM yyyy"));
      return format(currentDate, "MMMM yyyy");
    }
    return "";
  };

  return (
    <Card>
      <Card.Header className="text-center">
        <Row className="align-items-center justify-content-center">
          <Col lg={3}>
            <Button
              type="button"
              className="float-end btn btn-soft-dark rounded-pill"
              onClick={handlePreviousDate}
            >
              <i className="bi bi-chevron-left"></i>
            </Button>
          </Col>
          <Col lg={6}>
            <h5 className="text-center">{getCurrentDateDisplay()}</h5>
          </Col>
          <Col lg={3}>
            <Button
              type="button"
              className="btn btn-soft-dark rounded-pill"
              onClick={handleNextDate}
            >
              <i className="bi bi-chevron-right"></i>
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Flatpickr
              className="form-control flatpickr-input"
              placeholder="Select Date"
              options={{
                dateFormat: "d M, Y",
              }}
              value={selectedQuoteDate || undefined}
              id="birthdate"
              onChange={handleQuoteDateChange}
            />
          </Col>
          <Col>
            <select
              className="form-select text-muted"
              name="driverStatus"
              id="driverStatus"
              value={selectedPeriod}
              onChange={handleSelectPeriod}
            >
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Hourly">Hourly</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DateFilterCard;
