import React, { useState, CSSProperties, useEffect, useMemo } from "react";
import { Quote, useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";

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
  selectedWeek: string;
}

const WeeklyTable: React.FC<WeekProps> = ({ selectedPeriod, selectedWeek }) => {
  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  const { data: AllVehicleType = [] } = useGetAllVehicleTypesQuery();
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();
  const activeDrivers = AllDrivers.filter(
    (driver) => driver.driverStatus === "Active"
  );
  const activeVehicles = AllVehicles.filter(
    (vehicle) => vehicle.statusVehicle === "Active"
  );

  const getTableHeaders = useMemo(() => {
    if (selectedPeriod === "Weekly") {
      const headers: string[] = [];

      const [startDateStr] = selectedWeek.split(" to ");
      const [day, month, year] = startDateStr.split("-").map(Number);

      const startOfWeek = new Date(year, month - 1, day);

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        headers.push(date.toLocaleDateString("en-GB"));
      }
      return headers;
    }
    return [];
  }, [selectedPeriod, selectedWeek]);

  const [startDateStr, endDateStr] = selectedWeek.split(" to ");

  const parseSelectedWeekDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const parseQuoteDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const startDate = parseSelectedWeekDate(startDateStr);
  const endDate = parseSelectedWeekDate(endDateStr);

  const filteredQuotes = AllQuotes.filter((quote) => {
    const quoteDate = parseQuoteDate(quote?.date!);
    return quoteDate >= startDate && quoteDate <= endDate;
  });

  const [currentView, setCurrentView] = useState("driver");

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const quotesWithoutDriver = filteredQuotes.filter(
    (quote) => quote.id_driver === null
  );

  const headers: string[] = [];
  const dailyQuoteCounts: Record<string, number> = {};

  const [day, month, year] = startDateStr.split("-").map(Number);

  const startOfWeek = new Date(Date.UTC(year, month - 1, day));

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setUTCDate(startOfWeek.getUTCDate() + i);

    const formattedDate = currentDate.toLocaleDateString("en-GB");
    headers.push(formattedDate);
    dailyQuoteCounts[formattedDate] = 0;
  }

  quotesWithoutDriver.forEach((quote) => {
    const quoteDate = parseQuoteDate(quote?.date!).toLocaleDateString("en-GB");
    if (dailyQuoteCounts[quoteDate] !== undefined) {
      dailyQuoteCounts[quoteDate] += 1;
    }
  });

  const quotesWithDriver = activeDrivers.map((driver: any) => {
    let quotesDriver = filteredQuotes.filter(
      (quote: any) => quote?.id_driver?._id! === driver?._id!
    );
    return quotesDriver;
  });

  const quotesWithoutVehicle = filteredQuotes.filter(
    (quote) => quote.id_vehicle === null
  );

  const headersVehicle: string[] = [];
  const dailyQuoteVehicleCounts: Record<string, number> = {};
  const [dayVehicle, monthVehicle, yearVehicle] = startDateStr
    .split("-")
    .map(Number);

  const startOfWeekVehicle = new Date(
    Date.UTC(yearVehicle, monthVehicle - 1, dayVehicle)
  );
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeekVehicle);
    currentDate.setUTCDate(startOfWeekVehicle.getUTCDate() + i);

    const formattedDate = currentDate.toLocaleDateString("en-GB");
    headersVehicle.push(formattedDate);
    dailyQuoteVehicleCounts[formattedDate] = 0;
  }

  quotesWithoutVehicle.forEach((quote) => {
    const quoteDate = parseQuoteDate(quote?.date!).toLocaleDateString("en-GB");
    if (dailyQuoteVehicleCounts[quoteDate] !== undefined) {
      dailyQuoteVehicleCounts[quoteDate] += 1;
    }
  });

  const quotesWithVehicle = activeVehicles.map((vehicle: any) => {
    let quotesVehicle = filteredQuotes.filter(
      (quote: any) => quote?.id_vehicle?._id! === vehicle?._id!
    );
    return quotesVehicle;
  });

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

            {getTableHeaders.map((header, index) => (
              <th key={index} className="bg-info text-white">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentView === "driver" && (
            <>
              <tr>
                <td colSpan={3}>No Driver</td>
                {headers.map((header, index) => {
                  const quoteCount = dailyQuoteCounts[header] || 0;
                  return (
                    <td key={index}>
                      <div className="text-center">
                        <span
                          className={`fw-bold badge ${
                            quoteCount > 0 ? "bg-danger text-white" : ""
                          }`}
                        >
                          {quoteCount > 0 ? quoteCount : ""}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
              {quotesWithDriver.map((driverQuotes, driverIndex) => {
                const quoteCountByDayForDriver: Record<number, number> = {};

                for (let day = 1; day <= 7; day++) {
                  quoteCountByDayForDriver[day] = 0;
                }

                driverQuotes.forEach((quote) => {
                  const date = new Date(quote?.date!);

                  const dayNumber = date.getDate();
                  const weekNumber = Math.ceil(dayNumber / 7);

                  if (weekNumber >= 1 && weekNumber <= 4) {
                    quoteCountByDayForDriver[weekNumber] += 1;
                  }
                });

                const driver = activeDrivers[driverIndex];
                return (
                  <tr key={`driver-${driverIndex}`}>
                    <td colSpan={3}>
                      {driver?.firstname} {driver?.surname}
                    </td>
                    {Array.from({ length: 7 }, (_, colIndex) => {
                      const day = colIndex + 1;
                      const quoteCount = quoteCountByDayForDriver[day] || 0;

                      return (
                        <td key={colIndex}>
                          <div className="text-center">
                            <span className="fw-bold badge bg-warning text-white">
                              {quoteCount > 0 ? quoteCount : ""}
                            </span>
                          </div>
                        </td>
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
                const filteredVehicleTypeQuotes = filteredQuotes.filter(
                  (quote) => quote.vehicle_type === vehicleType.type
                );
                const quoteCountByDayForVehicleType: Record<number, number> =
                  {};
                for (let day = 1; day <= 7; day++) {
                  quoteCountByDayForVehicleType[day] = 0;
                }

                filteredVehicleTypeQuotes.forEach((quote) => {
                  const date = new Date(quote?.date!);
                  const dayOfWeek = date.getDay();
                  const firstDayOfWeek = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    1
                  ).getDay();
                  const adjustedDay = date.getDate() + firstDayOfWeek;
                  const weekNumber = Math.ceil(adjustedDay / 7);
                  if (weekNumber >= 1 && weekNumber <= 4) {
                    quoteCountByDayForVehicleType[dayOfWeek + 1] += 1;
                  }
                });

                return (
                  <React.Fragment key={`vehicle-${vehicleIndex}`}>
                    <tr>
                      <td colSpan={3} className="fw-bold">
                        {vehicleType?.type!}
                      </td>
                    </tr>
                    {filteredVehicleTypeQuotes.map((quote, quoteIndex) => (
                      <tr key={`quote-${vehicleIndex}-${quoteIndex}`}>
                        <td colSpan={3} className="text-center">
                          <span className="fw-medium text-info">
                            {quote.quote_ref}
                          </span>
                        </td>
                        {Array.from({ length: 7 }, (_, colIndex) => {
                          const day = colIndex + 1;
                          const quoteCount =
                            quoteCountByDayForVehicleType[day] || 0;
                          return (
                            <td>
                              <div className="text-center">
                                <span className={`badge bg-primary text-white`}>
                                  {quoteCount > 0 ? quoteCount : ""}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </>
          )}
          {currentView === "vehicle" && (
            <>
              <tr>
                <td colSpan={3}>No Vehicle</td>
                {headersVehicle.map((header, index) => {
                  const quoteCount = dailyQuoteVehicleCounts[header] || 0;
                  return (
                    <td key={index}>
                      <div className="text-center">
                        <span
                          className={`fw-bold badge ${
                            quoteCount > 0 ? "bg-danger text-white" : ""
                          }`}
                        >
                          {quoteCount > 0 ? quoteCount : ""}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
              {quotesWithVehicle.map((vehicleQuotes, vehicleIndex) => {
                const quoteCountByDayForVehicle: Record<number, number> = {};

                for (let day = 1; day <= 7; day++) {
                  quoteCountByDayForVehicle[day] = 0;
                }

                vehicleQuotes.forEach((quote) => {
                  const date = new Date(quote?.date!);

                  const dayNumber = date.getDate();
                  const weekNumber = Math.ceil(dayNumber / 7);

                  if (weekNumber >= 1 && weekNumber <= 4) {
                    quoteCountByDayForVehicle[weekNumber] += 1;
                  }
                });

                const vehicle = activeVehicles[vehicleIndex];
                return (
                  <tr key={`vehicle-${vehicleIndex}`}>
                    <td colSpan={3}>{vehicle?.registration_number!}</td>
                    {Array.from({ length: 7 }, (_, colIndex) => {
                      const day = colIndex + 1;
                      const quoteCount = quoteCountByDayForVehicle[day] || 0;

                      return (
                        <td key={colIndex}>
                          <div className="text-center">
                            <span className="fw-bold badge bg-warning text-white">
                              {quoteCount > 0 ? quoteCount : ""}
                            </span>
                          </div>
                        </td>
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

export default WeeklyTable;
