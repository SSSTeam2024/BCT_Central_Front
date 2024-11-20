import React, { useState } from "react";
import { useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";

interface MonthlyProps {
  selectedPeriod: string;
  selectedMonth: string;
}
const MonthlyTable: React.FC<MonthlyProps> = ({
  selectedPeriod,
  selectedMonth,
}) => {
  document.title = "Calendar | Coach Hire Network";

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const { data: AllVehicleType = [] } = useGetAllVehicleTypesQuery();
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();
  const { data: AllDrivers = [] } = useGetAllDriverQuery();

  const activeDrivers = AllDrivers.filter(
    (driver) => driver.driverStatus === "Active"
  );

  const activeVehicles = AllVehicles.filter(
    (vehicle) => vehicle.statusVehicle === "Active"
  );
  const monthMapping = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const [selectedMonthName, selectedYear] = selectedMonth.split(" ");
  const selectedMonthNumber =
    monthMapping[selectedMonthName as keyof typeof monthMapping];

  const getDaysInMonth = (month: any, year: any) => {
    return new Date(year, month, 0).getDate();
  };

  const monthNumber = parseInt(selectedMonthNumber, 10);

  const numberOfDays = getDaysInMonth(monthNumber, parseInt(selectedYear, 10));

  const filteredQuotes = AllQuotes.filter((quote) => {
    const [quoteYear, quoteMonth] = quote?.date?.split("-")!;
    return quoteYear === selectedYear && quoteMonth === selectedMonthNumber;
  });

  const [currentView, setCurrentView] = useState("driver");
  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const getTableHeaders = () => {
    if (selectedPeriod === "Monthly" && selectedMonth) {
      const [selectedMonthName, selectedYear] = selectedMonth.split(" ");
      const monthMapping = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };

      const monthNumber =
        monthMapping[selectedMonthName as keyof typeof monthMapping];
      const yearNumber = parseInt(selectedYear, 10);

      const daysInMonth = new Date(yearNumber, monthNumber + 1, 0).getDate();
      const headers = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(yearNumber, monthNumber, day);
        headers.push(date.toLocaleDateString("en-GB"));
      }

      return headers;
    }

    return [];
  };

  const quotesWithoutDriver = filteredQuotes.filter(
    (quote) => quote.id_driver === null
  );

  const quoteCountByDay: Record<number, number> = {};

  for (let day = 1; day <= numberOfDays; day++) {
    quoteCountByDay[day] = 0;
  }

  quotesWithoutDriver.forEach((quote) => {
    const [quoteYear, quoteMonth, quoteDay] = quote?.date?.split("-")!;
    const dayNumber = parseInt(quoteDay, 10);
    if (dayNumber) {
      quoteCountByDay[dayNumber] += 1;
    }
  });

  const quoteWithoutCountByDay: Record<number, number> = {};

  const quotesWithoutVehicle = filteredQuotes.filter(
    (quote) => quote.id_vehicle === null
  );

  for (let day = 1; day <= numberOfDays; day++) {
    quoteWithoutCountByDay[day] = 0;
  }

  quotesWithoutVehicle.forEach((quote) => {
    const [quoteYear, quoteMonth, quoteDay] = quote?.date?.split("-")!;
    const dayNumber = parseInt(quoteDay, 10);
    if (dayNumber) {
      quoteWithoutCountByDay[dayNumber] += 1;
    }
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
              <tr>
                <td colSpan={3}>No Driver</td>
                {Array.from({ length: numberOfDays }, (_, colIndex) => {
                  const day = colIndex + 1;
                  const quoteCount = quoteCountByDay[day] || 0;
                  return (
                    <td key={colIndex}>
                      <div className="text-center">
                        <span className="fw-bold badge bg-danger text-white">
                          {quoteCount > 0 ? quoteCount : ""}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
              {activeDrivers.map((driver, driverIndex) => {
                const driverQuotes = filteredQuotes.filter((quote) => {
                  const driverId =
                    typeof quote?.id_driver === "string"
                      ? quote?.id_driver
                      : (quote?.id_driver as { _id: string })?._id! || "";

                  return driverId === driver._id;
                });

                const quoteCountByDayForDriver: Record<number, number> = {};

                for (let day = 1; day <= numberOfDays; day++) {
                  quoteCountByDayForDriver[day] = 0;
                }

                driverQuotes.forEach((quote) => {
                  const [quoteYear, quoteMonth, quoteDay] =
                    quote?.date?.split("-")!;
                  const dayNumber = parseInt(quoteDay, 10);
                  if (dayNumber) {
                    quoteCountByDayForDriver[dayNumber] += 1;
                  }
                });

                return (
                  <tr key={`driver-${driverIndex}`}>
                    <td colSpan={3}>
                      {driver?.firstname!} {driver?.surname!}
                    </td>
                    {Array.from({ length: numberOfDays }, (_, colIndex) => {
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
                const quoteCountByDay: { [key: number]: number } = {};
                filteredVehicleTypeQuotes.forEach((quote) => {
                  const [year, month, day] = quote?.date!.split("-");
                  const dayNumber = parseInt(day, 10);
                  quoteCountByDay[dayNumber] =
                    (quoteCountByDay[dayNumber] || 0) + 1;
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
                        {Array.from({ length: numberOfDays }, (_, colIndex) => {
                          const day = colIndex + 1;
                          const quoteDay = parseInt(
                            quote?.date!.split("-")[2],
                            10
                          );
                          return (
                            <td key={colIndex}>
                              <div className="text-center">
                                <span className="badge bg-danger text-white">
                                  {quoteDay === day ? 1 : ""}
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
                {Array.from({ length: numberOfDays }, (_, colIndex) => {
                  const day = colIndex + 1;
                  const quoteCount = quoteWithoutCountByDay[day] || 0;
                  return (
                    <td key={colIndex}>
                      <div className="text-center">
                        <span className="fw-bold badge bg-danger text-white">
                          {quoteCount > 0 ? quoteCount : ""}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
              {activeVehicles.map((vehicle, vehicleIndex) => {
                const vehicleQuotes = filteredQuotes.filter((quote) => {
                  const vehicleId =
                    typeof quote?.id_vehicle === "string"
                      ? quote?.id_vehicle
                      : (quote?.id_vehicle as { _id: string })?._id! || "";

                  return vehicleId === vehicle._id;
                });

                const quoteCountByDayForVehicle: Record<number, number> = {};

                for (let day = 1; day <= numberOfDays; day++) {
                  quoteCountByDayForVehicle[day] = 0;
                }

                vehicleQuotes.forEach((quote) => {
                  const [quoteYear, quoteMonth, quoteDay] =
                    quote?.date?.split("-")!;
                  const dayNumber = parseInt(quoteDay, 10);
                  if (dayNumber) {
                    quoteCountByDayForVehicle[dayNumber] += 1;
                  }
                });

                return (
                  <tr key={`vehicle-${vehicleIndex}`}>
                    <td colSpan={3}>{vehicle?.registration_number!}</td>
                    {Array.from({ length: numberOfDays }, (_, colIndex) => {
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

export default MonthlyTable;
