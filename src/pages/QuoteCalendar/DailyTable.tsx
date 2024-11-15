import React, { useState, CSSProperties } from "react";
import { Quote } from "features/Quotes/quoteSlice";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";

const buttonStyle: CSSProperties = {
  position: "absolute",
  top: "5px",
  right: "5px",
  background: "#FFD700",
  color: "#000000",
  border: "2px solid #ffffff",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  fontSize: "14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow for depth
  transition: "background 0.3s ease",
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

interface DailyProps {
  selectedPeriod: string;
  quotes: any[];
  setSelectedQuote: (quote: Quote) => void;
  togglePopup: () => void;
}

const DailyTable: React.FC<DailyProps> = ({
  selectedPeriod,
  quotes,
  setSelectedQuote,
  togglePopup,
}) => {
  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  const { data: AllVehicleType = [] } = useGetAllVehicleTypesQuery();
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();
  const activeDrivers = AllDrivers.filter(
    (driver) => driver.driverStatus === "Active"
  );

  const activeVehicles = AllVehicles.filter(
    (vehicle) => vehicle.statusVehicle === "Active"
  );

  const [currentView, setCurrentView] = useState("driver");
  const getHourIndex = (time: any) => parseInt(time.split(":")[0], 10);
  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleButtonClick = (colIndex: number, quote: any) => {
    setSelectedQuote(quote);
    togglePopup();
  };

  const quotesWithoutDriver = quotes.filter(
    (quote) => quote.id_driver === null
  );
  const quotesWithoutVehicle = quotes.filter(
    (quote) => quote.id_vehicle === null
  );

  const getTableHeaders = () => {
    if (selectedPeriod === "Daily") {
      return Array.from(
        { length: 24 },
        (_, index) => `${index.toString().padStart(2, "0")}:00`
      );
    }
  };

  const handleQuoteClick = (quote: any) => {
    setSelectedQuote(quote);
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
                const pickupIndex = getHourIndex(quote.pickup_time);
                const dropoffIndex = getHourIndex(quote.dropoff_time);

                return (
                  <tr key={`no-driver-${rowIndex}`}>
                    <td colSpan={3}>No Driver</td>
                    {Array.from({ length: 24 }, (_, colIndex) => {
                      const isInRange =
                        colIndex >= pickupIndex && colIndex <= dropoffIndex;
                      return (
                        <td
                          key={colIndex}
                          style={{
                            background: isInRange
                              ? "linear-gradient(to right, #007bff, #007bff)" // Blue gradient for "No Driver"
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
                                style={{ cursor: "pointer", color: "#fff" }}
                                onClick={() => handleQuoteClick(quote)}
                              >
                                {quote.quote_ref}
                              </h6>
                              <button
                                style={buttonStyle}
                                onClick={() =>
                                  handleButtonClick(rowIndex, quote)
                                }
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
              {activeDrivers.map((driver, driverIndex) => {
                const driverQuotes = quotes.filter(
                  (quote) => quote?.id_driver?._id! === driver._id
                );

                return (
                  <tr key={`driver-${driverIndex}`}>
                    <td colSpan={3}>
                      {driver?.firstname!} {driver?.surname!}
                    </td>
                    {Array.from({ length: 24 }, (_, colIndex) => {
                      const isInRangeForAnyQuote = driverQuotes.some(
                        (quote) => {
                          const pickupIndex = getHourIndex(quote.pickup_time);
                          const dropoffIndex = getHourIndex(quote.dropoff_time);
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
                                colIndex === getHourIndex(quote.pickup_time)
                            )
                              ? "2px solid #000000"
                              : "none",
                            borderRight: driverQuotes.some(
                              (quote) =>
                                colIndex === getHourIndex(quote.dropoff_time)
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
                    {/* Row for the vehicle type */}
                    <tr>
                      <td colSpan={3}>{vehicleType?.type!}</td>
                      {Array.from({ length: 24 }, (_, colIndex) => (
                        <td
                          key={colIndex}
                          style={{ background: "transparent" }}
                        ></td>
                      ))}
                    </tr>

                    {/* Rows for each quote under the current vehicle type */}
                    {filteredQuotes.map((quote, quoteIndex) => {
                      const pickupIndex = getHourIndex(quote.pickup_time);
                      const dropoffIndex = getHourIndex(quote.dropoff_time);

                      return (
                        <tr key={`quote-${vehicleIndex}-${quoteIndex}`}>
                          <td colSpan={3}>
                            <span className="text-info">{quote.quote_ref}</span>
                          </td>
                          {Array.from({ length: 24 }, (_, colIndex) => {
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
                                      // onClick={() => {
                                      //   handleButtonClick(vehicleIndex);
                                      //   setSelectedQuote(quote);
                                      // }}
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
                const pickupIndex = getHourIndex(quote.pickup_time);
                const dropoffIndex = getHourIndex(quote.dropoff_time);

                return (
                  <tr key={rowIndex}>
                    <td colSpan={3}>No Vehicle</td>
                    {Array.from({ length: 24 }, (_, colIndex) => {
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
                                // onClick={() => {
                                //   handleButtonClick(rowIndex);
                                //   setSelectedQuote(quote);
                                // }}
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
                    {Array.from({ length: 24 }, (_, colIndex) => {
                      const isInRangeForAnyQuote = vehicleQuotes.some(
                        (quote) => {
                          const pickupIndex = getHourIndex(quote.pickup_time);
                          const dropoffIndex = getHourIndex(quote.dropoff_time);
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
                                colIndex === getHourIndex(quote.pickup_time)
                            )
                              ? "2px solid #000000"
                              : "none",
                            borderRight: vehicleQuotes.some(
                              (quote) =>
                                colIndex === getHourIndex(quote.dropoff_time)
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

export default DailyTable;
