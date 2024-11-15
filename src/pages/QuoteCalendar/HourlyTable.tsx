import React, { useState, CSSProperties, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Quote, useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import { format } from "date-fns";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";

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

const quoteRefStyle: CSSProperties = {
  cursor: "pointer",
  color: "#FFD700", // Match the color with the button for consistency
  fontWeight: "bold",
  fontSize: "14px",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Add text shadow for better readability
  transition: "color 0.3s ease",
};

const containerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  position: "relative",
};

interface HourlyProps {
  selectedPeriod: string;
  quotes: any[];
  setSelectedQuote: (quote: Quote) => void;
}

const HourlyTable: React.FC<HourlyProps> = ({
  selectedPeriod,
  quotes,
  setSelectedQuote,
}) => {
  document.title = "Calendar | Coach Hire Network";

  const getHourIndex = (time: any) => parseInt(time.split(":")[0], 10);

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  const { data: AllVehicleType = [] } = useGetAllVehicleTypesQuery();
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
    }
  };
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();

  const activeVehicles = AllVehicles.filter(
    (vehicle) => vehicle.statusVehicle === "Active"
  );

  const quotesWithoutDriver = quotes.filter(
    (quote) => quote.id_driver === null
  );

  const quotesWithoutVehicle = quotes.filter(
    (quote) => quote.id_vehicle === null
  );

  const getMinuteIndex = (time: any) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 6 + Math.floor(minute / 10);
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
            {getTableHeaders()?.map((header, index) => (
              <th key={index} className="bg-info text-white">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentView === "driver" && (
            <>
              {quotesWithoutDriver.map((quote, rowIndex) => {
                const pickupIndex = getMinuteIndex(quote.pickup_time);
                const dropoffIndex = getMinuteIndex(quote.dropoff_time);

                return (
                  <tr key={`no-driver-${rowIndex}`}>
                    <td colSpan={3}>No Driver</td>
                    {Array.from({ length: 144 }, (_, colIndex) => {
                      const isInRange =
                        colIndex >= pickupIndex && colIndex <= dropoffIndex;
                      return (
                        <td
                          key={colIndex}
                          style={{
                            background: isInRange
                              ? "linear-gradient(to right, #007bff, #007bff)"
                              : "transparent",
                            borderLeft:
                              colIndex === pickupIndex
                                ? "2px solid #000000"
                                : "none",
                            borderRight:
                              colIndex === dropoffIndex
                                ? "2px solid #000000"
                                : "none",
                            color: "#fff",
                            position: "relative",
                          }}
                        >
                          {isInRange && colIndex === pickupIndex && (
                            <Row>
                              <Col>
                                <h6
                                  style={{ cursor: "pointer", color: "#fff" }}
                                  onClick={() => setSelectedQuote(quote)}
                                >
                                  {quote.quote_ref}
                                </h6>
                              </Col>
                              <Col className="d-flex justify-content-end">
                                <button
                                  style={buttonStyle}
                                  onClick={() => {
                                    handleButtonClick(rowIndex);
                                    setSelectedQuote(quote);
                                  }}
                                >
                                  i
                                </button>
                              </Col>
                            </Row>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {activeDrivers.map((driver, driverIndex) => {
                const driverQuotes = quotes.filter(
                  (quote) => quote?.id_driver?._id === driver._id
                );

                return (
                  <tr key={`driver-${driverIndex}`}>
                    <td colSpan={3}>
                      {driver?.firstname} {driver?.surname}
                    </td>
                    {Array.from({ length: 144 }, (_, colIndex) => {
                      const isInRangeForAnyQuote = driverQuotes.some(
                        (quote) => {
                          const pickupIndex = getMinuteIndex(quote.pickup_time);
                          const dropoffIndex = getMinuteIndex(
                            quote.dropoff_time
                          );
                          return (
                            colIndex >= pickupIndex && colIndex <= dropoffIndex
                          );
                        }
                      );

                      return (
                        <td
                          key={colIndex}
                          style={{
                            background: isInRangeForAnyQuote
                              ? "linear-gradient(to right, #ff5733, #ff5733)"
                              : "transparent",
                            borderLeft: driverQuotes.some(
                              (quote) =>
                                colIndex === getMinuteIndex(quote.pickup_time)
                            )
                              ? "2px solid #000000"
                              : "none",
                            borderRight: driverQuotes.some(
                              (quote) =>
                                colIndex === getMinuteIndex(quote.dropoff_time)
                            )
                              ? "2px solid #000000"
                              : "none",
                            color: "#fff",
                          }}
                        ></td>
                      );
                    })}
                  </tr>
                );
              })}
            </>
          )}
          {currentView === "quote" && (
            <>
              {AllVehicleType.map((vehicleType, vehicleIndex) => {
                const filteredQuotes = quotes.filter(
                  (quote) => quote.vehicle_type === vehicleType.type
                );

                return (
                  <React.Fragment key={`vehicle-${vehicleIndex}`}>
                    <tr>
                      <td colSpan={3}>{vehicleType?.type!}</td>
                      {Array.from({ length: 144 }, (_, colIndex) => (
                        <td
                          key={colIndex}
                          style={{ background: "transparent" }}
                        ></td>
                      ))}
                    </tr>
                    {filteredQuotes.map((quote, quoteIndex) => {
                      const pickupIndex = getMinuteIndex(quote.pickup_time);
                      const dropoffIndex = getMinuteIndex(quote.dropoff_time);

                      return (
                        <tr key={`quote-${vehicleIndex}-${quoteIndex}`}>
                          <td colSpan={3}>
                            <span className="text-info">{quote.quote_ref}</span>
                          </td>
                          {Array.from({ length: 144 }, (_, colIndex) => {
                            const isInRange =
                              colIndex >= pickupIndex &&
                              colIndex <= dropoffIndex;
                            return (
                              <td
                                key={colIndex}
                                style={{
                                  background: isInRange
                                    ? "linear-gradient(to right, #007bff, #007bff)"
                                    : "transparent",
                                  borderLeft:
                                    colIndex === pickupIndex
                                      ? "2px solid #000000"
                                      : "none",
                                  borderRight:
                                    colIndex === dropoffIndex
                                      ? "2px solid #000000"
                                      : "none",
                                  color: "#fff",
                                  position: "relative",
                                }}
                              >
                                {isInRange && colIndex === pickupIndex && (
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
                                        handleButtonClick(vehicleIndex);
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
                  </React.Fragment>
                );
              })}
            </>
          )}
          {currentView === "vehicle" && (
            <>
              {quotesWithoutVehicle.map((quote, rowIndex) => {
                const pickupIndex = getMinuteIndex(quote.pickup_time);
                const dropoffIndex = getMinuteIndex(quote.dropoff_time);
                return (
                  <tr key={rowIndex}>
                    <td colSpan={3}>No Vehicle</td>
                    {Array.from({ length: 144 }, (_, colIndex) => {
                      const isInRange =
                        colIndex >= pickupIndex && colIndex <= dropoffIndex;
                      return (
                        <td
                          key={colIndex}
                          style={{
                            background: isInRange
                              ? "linear-gradient(to right, #007bff, #007bff)"
                              : "transparent",
                            borderLeft:
                              colIndex === pickupIndex
                                ? "2px solid #000000"
                                : "none",
                            borderRight:
                              colIndex === dropoffIndex
                                ? "2px solid #000000"
                                : "none",
                            color: "#fff",
                            position: "relative",
                          }}
                        >
                          {isInRange && colIndex === pickupIndex && (
                            <div style={containerStyle}>
                              <h6
                                style={quoteRefStyle}
                                onClick={() => setSelectedQuote(quote)}
                                title={`Quote Reference: ${quote.quote_ref}`}
                              >
                                {quote.quote_ref}
                              </h6>
                              <button
                                style={buttonStyle}
                                onClick={() => {
                                  handleButtonClick(rowIndex);
                                  setSelectedQuote(quote);
                                }}
                                title="More Info"
                              >
                                ℹ️
                              </button>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {activeVehicles.map((vehicle, vehicleIndex) => {
                const vehicleQuotes = quotes.filter(
                  (quote) => quote?.id_vehicle?._id! === vehicle._id
                );

                return (
                  <tr key={`vehicle-${vehicleIndex}`}>
                    <td colSpan={3}>{vehicle?.registration_number!}</td>
                    {Array.from({ length: 144 }, (_, colIndex) => {
                      const isInRangeForAnyQuote = vehicleQuotes.some(
                        (quote) => {
                          const pickupIndex = getMinuteIndex(quote.pickup_time);
                          const dropoffIndex = getMinuteIndex(
                            quote.dropoff_time
                          );
                          return (
                            colIndex >= pickupIndex && colIndex <= dropoffIndex
                          );
                        }
                      );

                      return (
                        <td
                          key={colIndex}
                          style={{
                            background: isInRangeForAnyQuote
                              ? "linear-gradient(to right, #28a745, #28a745)" // Green gradient for vehicle range
                              : "transparent",
                            borderLeft: vehicleQuotes.some(
                              (quote) =>
                                colIndex === getMinuteIndex(quote.pickup_time)
                            )
                              ? "2px solid #000000"
                              : "none",
                            borderRight: vehicleQuotes.some(
                              (quote) =>
                                colIndex === getMinuteIndex(quote.dropoff_time)
                            )
                              ? "2px solid #000000"
                              : "none",
                            color: "#fff",
                          }}
                        ></td>
                      );
                    })}
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HourlyTable;
