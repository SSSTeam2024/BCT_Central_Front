import React, { useState } from "react";
import { Accordion, Container, Card, Col, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import CompanyData from "pages/Settings/CompanyData";
import VehicleTypes from "pages/Settings/VehicleTypes";
import JourneyTypes from "pages/Settings/JourneyType";
import LuggageTypes from "pages/Settings/LuggageTypes";
import MileageBands from "pages/Settings/MileageBands";
import HourlyBands from "pages/Settings/HourlyBands";
import WaitingBands from "pages/Settings/WaitingBands";
import SingleJourneys from "pages/Settings/SingleJourneys";
import PricingCalendar from "pages/Settings/PricingCalendar";
import PricingPostalCodes from "pages/Settings/RegionalPricings";
import SourcesSetting from "pages/Settings/SourcesSetting";
import BaseToBase from "pages/Settings/BaseToBase";
import VehicleExtra from "pages/Settings/VehicleExtra";
import SupplierRoutingRule from "pages/Settings/SupplierRoutingRule";

const UserManual = () => {
  document.title = "User Manual | Coach Hire Network";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="User Manual" pageTitle="Help" />
          <Card>
            <Card.Header className="border-0">
              <h3>User Manual</h3>
            </Card.Header>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default UserManual;
