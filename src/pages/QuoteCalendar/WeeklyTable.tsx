import React, { useState, CSSProperties, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Quote, useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import { format } from "date-fns";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import Flatpickr from "react-flatpickr";

interface PopupInfo {
  colIndex: number;
  details?: Quote;
  [key: string]: any;
}

const buttonStyle: CSSProperties = {
  position: "absolute",
  top: "5px",
  right: "5px",
  background: "#F0E68C",
  color: "#000000",
  border: "none",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  fontSize: "12px",
  cursor: "pointer",
};

interface WeekProps {
  selectedPeriod: string;
  quotes: any[];
  setSelectedQuote: (quote: Quote) => void;
  togglePopup: () => void;
}

const WeeklyTable: React.FC<WeekProps> = ({
  selectedPeriod,
  quotes,
  setSelectedQuote,
  togglePopup,
}) => {
  document.title = "Calendar | Coach Hire Network";

  const getHourIndex = (time: any) => parseInt(time.split(":")[0], 10);

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayQuotes, setTodayQuotes] = useState<Quote[]>([]);
  const activeDrivers = AllDrivers.filter(
    (driver) => driver.driverStatus === "Active"
  );

  const [selectedQuoteDate, setSelectedQuoteDate] = useState<Date | null>(
    new Date()
  );

  const formatDateForComparison = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  const [currentView, setCurrentView] = useState("driver");

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };
  // Function to get the start and end dates of the current week (assuming week starts on Sunday)
  function getCurrentWeekRange() {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    );
    const lastDayOfWeek = new Date(
      currentDate.setDate(firstDayOfWeek.getDate() + 6)
    );

    // Formatting dates to 'yyyy-mm-dd' string format
    const formatDate = (date: any) => date.toISOString().split("T")[0];

    return {
      startOfWeek: formatDate(firstDayOfWeek),
      endOfWeek: formatDate(lastDayOfWeek),
    };
  }

  // Extract the current week range
  const { startOfWeek, endOfWeek } = getCurrentWeekRange();

  // Filter quotes based on their date falling within the current week
  const currentWeekQuotes = AllQuotes.filter((quote) => {
    const quoteDate = quote.date; // Assuming quote.date is in 'yyyy-mm-dd' format as a string
    return quoteDate! >= startOfWeek && quoteDate! <= endOfWeek;
  });

  console.log(currentWeekQuotes);

  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

  const closePopup = () => setPopupInfo(null);
  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return { startOfWeek, endOfWeek };
  };
  useEffect(() => {
    const { startOfWeek, endOfWeek } = getWeekRange(currentDate);
    const filteredQuotes = AllQuotes.filter((quote) => {
      const quoteDate = new Date(quote?.date!);
      return quoteDate >= startOfWeek && quoteDate <= endOfWeek;
    });
    setTodayQuotes(filteredQuotes);
  }, [selectedQuoteDate, currentDate, AllQuotes]);
  console.log("sqd", selectedQuoteDate);
  const getTableHeaders = () => {
    if (selectedPeriod === "Weekly") {
      const headers = [];
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        headers.push(date.toLocaleDateString("en-GB"));
      }
      return headers;
    }
  };

  const quotesWithoutDriver = quotes.filter(
    (quote) => quote.id_driver === null
  );

  const handleQuoteClick = (quote: any) => {
    setSelectedQuote(quote);
  };

  const handleButtonClick = (colIndex: number, quote: any) => {
    setSelectedQuote(quote);
    togglePopup();
  };

  const headers = getTableHeaders() || [];

  return (
    <div className="table-responsive">
      <table className="table table-sm table-bordered align-middle description-table">
        <thead>
          <tr>
            <th
              onClick={() => handleViewChange("driver")}
              className={
                currentView === "driver" ? "bg-dark opacity-25" : "bg-white"
              }
              style={{ cursor: "pointer" }}
            >
              <span
                className={
                  currentView === "driver"
                    ? "mdi mdi-account-tie-hat-outline fs-22 text-light"
                    : "mdi mdi-account-tie-hat-outline fs-22 text-info"
                }
              ></span>
            </th>

            <th
              onClick={() => handleViewChange("quote")}
              className={
                currentView === "quote" ? "bg-dark opacity-25" : "bg-white"
              }
            >
              <span
                className={
                  currentView === "quote"
                    ? "mdi mdi-clipboard-list-outline fs-22 text-light"
                    : "mdi mdi-clipboard-list-outline fs-22 text-info"
                }
              ></span>
            </th>

            <th
              onClick={() => handleViewChange("vehicle")}
              className={
                currentView === "vehicle" ? "bg-dark opacity-25" : "bg-white"
              }
            >
              <span
                className={
                  currentView === "vehicle"
                    ? "mdi mdi-car-estate fs-22 text-light"
                    : "mdi mdi-car-estate fs-22 text-info"
                }
              ></span>
            </th>

            {getTableHeaders()?.map((header, index) => (
              <th key={index} className="bg-info text-white">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {activeDrivers.map((driver) => (
            <tr key={driver._id}>
              <th>
                {driver.firstname} {driver.surname}
              </th>
              {headers.map((headerDate, colIndex) => {
                const quoteForDate = todayQuotes.find(
                  (quote) =>
                    new Date(quote?.date!).toLocaleDateString("en-GB") ===
                    headerDate
                );
                return (
                  <td
                    key={colIndex}
                    className="position-relative"
                    onClick={() => handleQuoteClick(quoteForDate)}
                  >
                    {quoteForDate ? (
                      <>
                        <span>{quoteForDate.quote_ref}</span>
                        <button
                          style={buttonStyle}
                          onClick={() =>
                            handleButtonClick(colIndex, quoteForDate)
                          }
                        >
                          i
                        </button>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyTable;
