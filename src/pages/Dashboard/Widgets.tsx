import { useGetAllCompanyQuery } from "features/Company/companySlice";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import { useGetAllSchoolsQuery } from "features/Schools/schools";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CountUp from "react-countup";

interface WidgetsProps {
  id: number;
  name: string;
  amount: number;
  decimal?: number;
  perstange?: string;
  badgeColor: string;
  icon: string;
  iconColor: string;
}
const Widgets = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setSelectedFilter(newFilter);
  };
  let { data: AllQuotes = [] } = useGetAllQuoteQuery();
  let bookedQutesNumber = AllQuotes.filter(
    (quotes) => quotes.status === "Booked"
  );
  let { data: allDrivers = [] } = useGetAllDriverQuery();
  let activeDrivers = allDrivers.filter(
    (drivers) => drivers.driverStatus === "Active"
  );
  let { data: allVehicles = [] } = useGetAllVehiclesQuery();
  let activeVehicles = allVehicles.filter(
    (vehicles) => vehicles.statusVehicle === "Active"
  );
  let { data: allSchools = [] } = useGetAllSchoolsQuery();
  let { data: allCompanies = [] } = useGetAllCompanyQuery();
  const widgetsData: Array<WidgetsProps> = [
    {
      id: 1,
      name: "Pending Quotes",
      amount: 48998000,
      decimal: 2,
      perstange: `${AllQuotes.length}`,
      badgeColor: "success",
      icon: "ph ph-clock",
      iconColor: "secondary",
    },
    {
      id: 2,
      name: "Booking Jobs",
      amount: 24285500,
      decimal: 2,
      perstange: `${bookedQutesNumber.length}`,
      badgeColor: "success",
      icon: "ph ph-book",
      iconColor: "info",
    },
    {
      id: 3,
      name: "Completed Jobs",
      amount: 14285500,
      decimal: 2,
      perstange: "4",
      badgeColor: "success",
      icon: "ph ph-checks",
      iconColor: "success",
    },
    {
      id: 4,
      name: "Unpaid Jobs",
      amount: 10285500,
      decimal: 2,
      perstange: "2",
      badgeColor: "success",
      icon: "ph ph-currency-gbp",
      iconColor: "danger",
    },
    // {
    //   id: 6,
    //   name: "Active Drivers",
    //   amount: 2,
    //  perstange: `${activeDrivers.length}`,
    //   badgeColor: "success",
    //   icon: "ph-sketch-logo",
    //   iconColor: "danger",
    // },
    // {
    //   id: 7,
    //   name: "Active Vehicles",
    //   amount: 15,
    //   badgeColor: "success",
    //   icon: "ph-sketch-logo",
    //   iconColor: "danger",
    // },
    // {
    //   id: 8,
    //   name: "Schools Account",
    //   amount: 15,
    //   badgeColor: "success",
    //   icon: "ph-sketch-logo",
    //   iconColor: "danger",
    // },
    // {
    //   id: 9,
    //   name: "Companies Account",
    //   amount: 15,
    //   badgeColor: "success",
    //   icon: "ph-sketch-logo",
    //   iconColor: "danger",
    // },
  ];
  return (
    <React.Fragment>
      {(widgetsData || []).map((item: any, key: number) => (
        <Col key={key}>
          <Card className="card-animate">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div
                  className={"vr rounded bg-" + item.iconColor + " opacity-50"}
                  style={{ width: "4px" }}
                ></div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted fs-14 text-truncate">
                    {item.name}
                  </p>
                  <h4 className="fs-22 fw-semibold mb-3">
                    {item.decimal ? "£" : ""}
                    <span className="counter-value" data-target="98851.35">
                      <CountUp
                        start={0}
                        end={item.amount}
                        separator=","
                        decimals={item.decimal && 2}
                      />
                    </span>
                  </h4>
                  <div className="d-flex align-items-center gap-2">
                    <p
                      className={
                        "badge badge-soft-" + item.badgeColor + " mb-0 fs-14"
                      }
                    >
                      {item.perstange}
                    </p>
                    <p className="text-muted mb-0">in last 30 days</p>
                  </div>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span
                    className={
                      "avatar-title bg-" +
                      item.iconColor +
                      "-subtle text-" +
                      item.iconColor +
                      " rounded fs-3"
                    }
                  >
                    <i className={item.icon}></i>
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
      <Col>
      <Card className="shadow-sm border-0 overflow-hidden card-animate">
        <div className="position-absolute end-0 start-0 top-0 z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            // Xmlns:Xlink="http://www.w3.org/1999/xlink"
            width="400"
            height="250"
            preserveAspectRatio="none"
            viewBox="0 0 400 250"
          >
            <g mask='url("#SvgjsMask1530")' fill="none">
              <path
                d="M209 112L130 191"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M324 10L149 185"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M333 35L508 -140"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M282 58L131 209"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M290 16L410 -104"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M216 186L328 74"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M255 53L176 132"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M339 191L519 11"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M95 151L185 61"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M249 16L342 -77"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M129 230L286 73"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M80 216L3 293"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
            </g>
            <defs>
              <mask id="SvgjsMask1530">
                <rect width="400" height="250" fill="#ffffff"></rect>
              </mask>
              <linearGradient
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
                id="SvgjsLinearGradient1531"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
              <linearGradient
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
                id="SvgjsLinearGradient1532"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Card.Body className="p-4 z-1 position-relative">
          <div className="d-flex align-items-center gap-3">
            <div className="flex-shrink-0 avatar-sm">
              <div className="avatar-title bg-dark text-white fs-2 rounded">
                <i className="ph ph-wallet"></i>
              </div>
            </div>
            <div>
              <h4 className="fs-22 fw-semibold mb-1">
                <CountUp start={0} end={72285500} duration={1} decimal="2"  prefix="£"/>
              </h4>
              <p className="mb-0 fw-medium text-uppercase fs-14">
              TOTAL QUOTE AMOUNT
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
      </Col>
     <Col>
     <Card className="shadow-sm border-0 overflow-hidden card-animate">
        <div className="position-absolute end-0 start-0 top-0 z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            // Xmlns:Xlink="http://www.w3.org/1999/xlink"
            width="400"
            height="250"
            preserveAspectRatio="none"
            viewBox="0 0 400 250"
          >
            <g mask='url("#SvgjsMask1530")' fill="none">
              <path
                d="M209 112L130 191"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M324 10L149 185"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M333 35L508 -140"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M282 58L131 209"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M290 16L410 -104"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M216 186L328 74"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M255 53L176 132"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M339 191L519 11"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M95 151L185 61"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M249 16L342 -77"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M129 230L286 73"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M80 216L3 293"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
            </g>
            <defs>
              <mask id="SvgjsMask1530">
                <rect width="400" height="250" fill="#ffffff"></rect>
              </mask>
              <linearGradient
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
                id="SvgjsLinearGradient1531"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
              <linearGradient
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
                id="SvgjsLinearGradient1532"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Card.Body className="p-4 z-1 position-relative">
          <div className="d-flex align-items-center gap-3">
            <div className="flex-shrink-0 avatar-sm">
              <div className="avatar-title bg-warning text-white fs-2 rounded">
                <i className="ph ph-user"></i>
              </div>
            </div>
            <div>
              <h4 className="fs-22 fw-semibold mb-1">
                <CountUp start={0} end={activeDrivers.length} duration={1} /> /{" "}
                <CountUp start={0} end={allDrivers.length} duration={1} />
              </h4>
              <p className="mb-0 fw-medium text-uppercase fs-14">
                Active Drivers
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
     </Col>
      <Col>
      <Card className="shadow-sm border-0 overflow-hidden card-animate">
        <div className="position-absolute end-0 start-0 top-0 z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            // Xmlns:Xlink="http://www.w3.org/1999/xlink"
            width="400"
            height="250"
            preserveAspectRatio="none"
            viewBox="0 0 400 250"
          >
            <g mask='url("#SvgjsMask1530")' fill="none">
              <path
                d="M209 112L130 191"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M324 10L149 185"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M333 35L508 -140"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M282 58L131 209"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M290 16L410 -104"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M216 186L328 74"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M255 53L176 132"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M339 191L519 11"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M95 151L185 61"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M249 16L342 -77"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M129 230L286 73"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M80 216L3 293"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
            </g>
            <defs>
              <mask id="SvgjsMask1530">
                <rect width="400" height="250" fill="#ffffff"></rect>
              </mask>
              <linearGradient
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
                id="SvgjsLinearGradient1531"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
              <linearGradient
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
                id="SvgjsLinearGradient1532"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Card.Body className="p-4 z-1 position-relative">
          <div className="d-flex align-items-center gap-3">
            <div className="flex-shrink-0 avatar-sm">
              <div className="avatar-title bg-info text-white fs-2 rounded">
                <i className="ph ph-car"></i>
              </div>
            </div>
            <div>
              <h4 className="fs-22 fw-semibold mb-1">
                <CountUp start={0} end={activeVehicles.length} duration={1} /> /{" "}
                <CountUp start={0} end={allVehicles.length} duration={1} />
              </h4>
              <p className="mb-0 fw-medium text-uppercase fs-14">
                Active Vehicles
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
      </Col>
      <Col>
      <Card className="shadow-sm border-0 overflow-hidden card-animate">
        <div className="position-absolute end-0 start-0 top-0 z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            // Xmlns:Xlink="http://www.w3.org/1999/xlink"
            width="400"
            height="250"
            preserveAspectRatio="none"
            viewBox="0 0 400 250"
          >
            <g mask='url("#SvgjsMask1530")' fill="none">
              <path
                d="M209 112L130 191"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M324 10L149 185"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M333 35L508 -140"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M282 58L131 209"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M290 16L410 -104"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M216 186L328 74"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M255 53L176 132"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M339 191L519 11"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M95 151L185 61"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M249 16L342 -77"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M129 230L286 73"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M80 216L3 293"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
            </g>
            <defs>
              <mask id="SvgjsMask1530">
                <rect width="400" height="250" fill="#ffffff"></rect>
              </mask>
              <linearGradient
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
                id="SvgjsLinearGradient1531"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
              <linearGradient
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
                id="SvgjsLinearGradient1532"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Card.Body className="p-4 z-1 position-relative">
          <div className="d-flex align-items-center gap-3">
            <div className="flex-shrink-0 avatar-sm">
              <div className="avatar-title bg-secondary text-white fs-2 rounded">
                <i className="ph ph-graduation-cap"></i>
              </div>
            </div>
            <div>
              <h4 className="fs-22 fw-semibold mb-1">
                <CountUp start={0} end={allSchools.length} duration={1} />
              </h4>
              <p className="mb-0 fw-medium text-uppercase fs-14">
                Schools Account
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
      </Col>
     <Col>
     <Card className="shadow-sm border-0 overflow-hidden card-animate">
        <div className="position-absolute end-0 start-0 top-0 z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            // Xmlns:Xlink="http://www.w3.org/1999/xlink"
            width="400"
            height="250"
            preserveAspectRatio="none"
            viewBox="0 0 400 250"
          >
            <g mask='url("#SvgjsMask1530")' fill="none">
              <path
                d="M209 112L130 191"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M324 10L149 185"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M333 35L508 -140"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M282 58L131 209"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M290 16L410 -104"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M216 186L328 74"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M255 53L176 132"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M339 191L519 11"
                strokeWidth="8"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M95 151L185 61"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M249 16L342 -77"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1532)"
                strokeLinecap="round"
                className="TopRight"
              ></path>
              <path
                d="M129 230L286 73"
                strokeWidth="10"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
              <path
                d="M80 216L3 293"
                strokeWidth="6"
                stroke="url(#SvgjsLinearGradient1531)"
                strokeLinecap="round"
                className="BottomLeft"
              ></path>
            </g>
            <defs>
              <mask id="SvgjsMask1530">
                <rect width="400" height="250" fill="#ffffff"></rect>
              </mask>
              <linearGradient
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
                id="SvgjsLinearGradient1531"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
              <linearGradient
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
                id="SvgjsLinearGradient1532"
              >
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0)"
                  offset="0"
                ></stop>
                <stop
                  stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                  offset="1"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Card.Body className="p-4 z-1 position-relative">
          <div className="d-flex align-items-center gap-3">
            <div className="flex-shrink-0 avatar-sm">
              <div className="avatar-title bg-primary text-white fs-2 rounded">
                <i className="ph ph-factory"></i>
              </div>
            </div>
            <div>
              <h4 className="fs-22 fw-semibold mb-1">
                <CountUp start={0} end={allCompanies.length} duration={1} />
              </h4>
              <p className="mb-0 fw-medium text-uppercase fs-14">
                Companies Account
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
     </Col>
     
    </React.Fragment>
  );
};

export default Widgets;
