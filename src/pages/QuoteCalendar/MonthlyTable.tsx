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

interface MonthlyProps {
  selectedPeriod: string;
  quotes: Quote[];
  setSelectedQuote: (quote: Quote) => void;
}

const MonthlyTable: React.FC<MonthlyProps> = ({
  selectedPeriod,
  quotes,
  setSelectedQuote,
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

  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

  const handleButtonClick = (colIndex: number) => {
    const quoteInfo = todayQuotes[colIndex];
    setPopupInfo({ colIndex, details: quoteInfo as Quote });
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

  const closePopup = () => setPopupInfo(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const popupElement = document.getElementById("popup-container");
      if (popupElement && !popupElement.contains(event.target)) {
        closePopup();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePopup]);

  const getTableHeaders = () => {
    if (selectedPeriod === "Hourly") {
      const headers = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 10) {
          headers.push(
            `${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`
          );
        }
      }
      return headers;
    } else if (selectedPeriod === "Weekly") {
      const headers = [];
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        headers.push(date.toLocaleDateString("en-GB"));
      }
      return headers;
    } else if (selectedPeriod === "Monthly") {
      const headers = [];
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      for (let i = 0; i < daysInMonth; i++) {
        const date = new Date(startOfMonth);
        date.setDate(startOfMonth.getDate() + i);
        headers.push(date.toLocaleDateString("en-GB"));
      }
      return headers;
    } else {
      return Array.from(
        { length: 24 },
        (_, index) => `${index.toString().padStart(2, "0")}:00`
      );
    }
  };

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

            {getTableHeaders().map((header, index) => (
              <th key={index} className="bg-info text-white">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {todayQuotes.map((quote, rowIndex) => {
            const pickupIndex = getHourIndex(quote.pickup_time);
            const dropoffIndex = getHourIndex(quote.dropoff_time);

            return (
              <tr key={rowIndex}>
                {currentView === "driver" ? (
                  <td colSpan={3}>
                    {quote.id_driver
                      ? activeDrivers.map((driver) => driver.firstname) ||
                        "No Driver"
                      : "No Driver"}
                  </td>
                ) : currentView === "quote" ? (
                  <td colSpan={3}>{quote.quote_ref || "Unallocated Job"}</td>
                ) : currentView === "vehicle" ? (
                  <td colSpan={3}>{quote.id_vehicle || "No Vehicle"}</td>
                ) : (
                  <>
                    <td>{quote.id_driver || "No Driver"}</td>
                    <td>{quote.quote_ref || "Unallocated Job"}</td>
                    <td>{quote.id_vehicle || "No Vehicle"}</td>
                  </>
                )}

                {Array.from({ length: 24 }).map((_, colIndex) => {
                  const isPickup = colIndex === pickupIndex;
                  const isDropoff = colIndex === dropoffIndex;
                  const isInRange =
                    colIndex >= pickupIndex && colIndex <= dropoffIndex;
                  return (
                    <td
                      key={colIndex}
                      style={{
                        background: isInRange
                          ? "linear-gradient(to right, #007bff, #007bff)"
                          : "transparent",
                        borderLeft: isPickup ? "2px solid #000000" : "none",
                        borderRight: isDropoff ? "2px solid #000000" : "none",
                        color: "#fff",
                        position: "relative" as React.CSSProperties["position"],
                      }}
                    >
                      {isInRange && (
                        <div className="vstack gap-3">
                          <h6
                            style={{
                              cursor: "pointer",
                              color: "#fff",
                            }}
                            onClick={() => setSelectedQuote(quote)}
                          >
                            {quote.quote_ref}
                          </h6>
                          <button
                            style={buttonStyle}
                            onClick={() => {
                              handleButtonClick(colIndex);
                              setSelectedQuote(quote);
                            }}
                          >
                            i
                          </button>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyTable;
