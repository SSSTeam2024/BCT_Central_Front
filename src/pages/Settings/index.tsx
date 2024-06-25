import React, { useState } from "react";
import { Container, Row, Card, Col, Accordion } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";

import { Link } from "react-router-dom";
import VehicleTypes from "./VehicleTypes";
import JourneyTypes from "./JourneyType";
import LuggageTypes from "./LuggageTypes";
import MileageBands from "./MileageBands";
import HourlyBands from "./HourlyBands";
import CompanyData from "./CompanyData";
import WaitingBands from "./WaitingBands";
import SingleJourneys from "./SingleJourneys";
import PricingCalendar from "./PricingCalendar";
import PricingPostalCodes from "./PricingPostalCodes";
import SourcesSetting from "./SourcesSetting";
import BaseToBase from "./BaseToBase";
import SupplierRoutingRule from "./SupplierRoutingRule";
import VehicleExtra from "./VehicleExtra";
import PassengerAndLuggageLimits from "./PassengerAndLuggageLimits";
import LocationSettings from "./LocationSettings";
import RegionalPricings from "./RegionalPricings";
import CheckTypes from "./CheckTypes";
import Attachments from "./Attachments";
import EmailTemplates from "pages/EmailTemplate";
import ShortCode from "./ShortCode";

const SiteSettings = () => {
  document.title = "Site Settings | Bouden Coach Travel";

  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [attachmentSettings, setAttachmentSettings] = useState<boolean>(false);
  const [shortCodeSettings, setShortCodeSettings] = useState<boolean>(false);
  const [templatetSettings, setTemplateSettings] = useState<boolean>(false);
  const [locationSettings, setLocationSettings] = useState<boolean>(false);
  const [showVehicleTypes, setShowVehicleTypes] = useState<boolean>(false);
  const [showJourneyTypes, setShowJourneyTypes] = useState<boolean>(false);
  const [showLuggageTypes, setShowLuggageTypes] = useState<boolean>(false);
  const [showMileageBands, setShowMileageBands] = useState<boolean>(false);
  const [showHourlyBands, setShowHourlyBands] = useState<boolean>(false);
  const [showWaitingBands, setShowWaitingBands] = useState<boolean>(false);
  const [showCheckTypes, setShowCheckTypes] = useState<boolean>(false);
  const [showSingleJourneys, setShowSingleJourneys] = useState<boolean>(false);
  const [showPricingCalendar, setShowPricingCalendar] =
    useState<boolean>(false);
  const [showRegionalPricings, setShowRegionalPricings] =
    useState<boolean>(false);
  const [showSources, setShowSources] = useState<boolean>(false);
  const [showBasetoBase, setShowBasetoBase] = useState<boolean>(false);
  const [showVehicleExtra, setShowVehicleExtra] = useState<boolean>(false);
  const [showSupplierRoutingRule, setShowSupplierRoutingRule] =
    useState<boolean>(false);
  const [showPassengerAndLuggageLimits, setShowPassengerAndLuggageLimits] =
    useState<boolean>(false);
  const [showPricingPostalCodes, setShowPricingPostalCodes] =
    useState<boolean>(false);

  function tog_PassengerAndLuggageLimits() {
    setShowPassengerAndLuggageLimits(true);
    setShowSettings(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowVehicleTypes(false);
    setShowJourneyTypes(false);
    setShowLuggageTypes(false);
    setShowMileageBands(false);
    setShowHourlyBands(false);
    setShowWaitingBands(false);
    setShowSingleJourneys(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setShowCheckTypes(false);
  }

  function tog_EmailTemplate() {
    setTemplateSettings(true);
    setShortCodeSettings(false);
    setShowPassengerAndLuggageLimits(false);
    setShowSettings(false);
    setAttachmentSettings(false);
    setShowVehicleTypes(false);
    setShowJourneyTypes(false);
    setShowLuggageTypes(false);
    setShowMileageBands(false);
    setShowHourlyBands(false);
    setShowWaitingBands(false);
    setShowSingleJourneys(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setShowCheckTypes(false);
  }

  function tog_ShowSettings() {
    setShowSettings(true);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowVehicleTypes(false);
    setShowJourneyTypes(false);
    setShowLuggageTypes(false);
    setShowMileageBands(false);
    setShowHourlyBands(false);
    setShowWaitingBands(false);
    setShowSingleJourneys(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
    setShowCheckTypes(false);
  }

  function tog_ShowVehiclesTypes() {
    setShowSettings(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowVehicleTypes(true);
    setShowJourneyTypes(false);
    setShowLuggageTypes(false);
    setShowMileageBands(false);
    setShowHourlyBands(false);
    setShowWaitingBands(false);
    setShowSingleJourneys(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
    setShowCheckTypes(false);
  }

  function tog_ShowJourneyTypes() {
    setShowJourneyTypes(true);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowLuggageTypes(false);
    setShowMileageBands(false);
    setShowHourlyBands(false);
    setShowWaitingBands(false);
    setShowSingleJourneys(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
    setShowCheckTypes(false);
  }

  function tog_ShowLuggageTypes() {
    setShowLuggageTypes(true);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowMileageBands(false);
    setShowHourlyBands(false);
    setShowWaitingBands(false);
    setShowSingleJourneys(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setShowCheckTypes(false);
    setTemplateSettings(false);
  }
  function tog_ShowMileageBands() {
    setShowMileageBands(true);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowHourlyBands(false);
    setShowWaitingBands(false);
    setShowSingleJourneys(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setShowCheckTypes(false);
    setTemplateSettings(false);
  }

  function tog_ShowHourlyBands() {
    setShowHourlyBands(true);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowWaitingBands(false);
    setShowSingleJourneys(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
    setShowCheckTypes(false);
  }

  function tog_ShowWaitingBands() {
    setShowWaitingBands(true);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowSingleJourneys(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
    setShowCheckTypes(false);
  }

  function tog_ShowSingleJourneys() {
    setShowSingleJourneys(true);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowPricingCalendar(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
    setShowCheckTypes(false);
  }

  function tog_ShowPricingCalendar() {
    setShowPricingCalendar(true);
    setShowCheckTypes(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowRegionalPricings(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
  }

  function tog_ShowRegionalPricings() {
    setShowRegionalPricings(true);
    setShowCheckTypes(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowSources(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
  }

  function tog_ShowSources() {
    setShowSources(true);
    setShowCheckTypes(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowRegionalPricings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowBasetoBase(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
  }

  function tog_ShowBasetoBase() {
    setShowBasetoBase(true);
    setShowCheckTypes(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowSources(false);
    setShowRegionalPricings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowVehicleExtra(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
  }

  function tog_ShowVehicleExtra() {
    setShowVehicleExtra(true);
    setShowCheckTypes(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowBasetoBase(false);
    setShowSources(false);
    setShowRegionalPricings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowSupplierRoutingRule(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
  }

  function tog_ShowSupplierRoutingRule() {
    setShowSupplierRoutingRule(true);
    setShowCheckTypes(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowVehicleExtra(false);
    setShowBasetoBase(false);
    setShowSources(false);
    setShowRegionalPricings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
  }

  function tog_ShowLocations() {
    setShowSupplierRoutingRule(false);
    setShowCheckTypes(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowVehicleExtra(false);
    setShowBasetoBase(false);
    setShowSources(false);
    setShowRegionalPricings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(true);
    setShowPricingPostalCodes(false);
    setTemplateSettings(false);
  }

  function tog_ShowPricingPostalCodes() {
    setShowSupplierRoutingRule(false);
    setShowCheckTypes(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowVehicleExtra(false);
    setShowBasetoBase(false);
    setShowSources(false);
    setShowRegionalPricings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(true);
    setTemplateSettings(false);
  }

  function tog_ShowCheckTypes() {
    setShowSupplierRoutingRule(false);
    setShortCodeSettings(false);
    setAttachmentSettings(false);
    setShowVehicleExtra(false);
    setShowBasetoBase(false);
    setShowSources(false);
    setShowRegionalPricings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setShowCheckTypes(true);
    setTemplateSettings(false);
  }

  function tog_ShowAttachmentSettings() {
    setShowSupplierRoutingRule(false);
    setShortCodeSettings(false);
    setAttachmentSettings(true);
    setShowVehicleExtra(false);
    setShowBasetoBase(false);
    setShowSources(false);
    setShowRegionalPricings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setShowCheckTypes(false);
    setTemplateSettings(false);
  }

  function tog_ShowShortCodeSettings() {
    setShowSupplierRoutingRule(false);
    setShortCodeSettings(true);
    setAttachmentSettings(false);
    setShowVehicleExtra(false);
    setShowBasetoBase(false);
    setShowSources(false);
    setShowRegionalPricings(false);
    setShowPricingCalendar(false);
    setShowSingleJourneys(false);
    setShowWaitingBands(false);
    setShowHourlyBands(false);
    setShowMileageBands(false);
    setShowLuggageTypes(false);
    setShowJourneyTypes(false);
    setShowSettings(false);
    setShowVehicleTypes(false);
    setShowPassengerAndLuggageLimits(false);
    setLocationSettings(false);
    setShowPricingPostalCodes(false);
    setShowCheckTypes(false);
    setTemplateSettings(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="General Settings" pageTitle="Management" />
          <Card>
            <Card.Header className="border-0">
              <Row>
                <Col xl={3} lg={4}>
                  <Card className="overflow-hidden">
                    <Accordion
                      flush
                      defaultActiveKey="2"
                      className="filter-accordion"
                    >
                      <Accordion.Item eventKey="2">
                        <Accordion defaultActiveKey="2">
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>
                              <span className="text-muted text-uppercase fs-13">
                                Site Options
                              </span>
                            </Accordion.Header>
                            <Accordion.Body className="text-body pt-1">
                              <Link
                                to="#"
                                onClick={() => {
                                  tog_ShowSettings();
                                }}
                                className="text-dark"
                              >
                                <i
                                  className="ph ph-sliders align-middle"
                                  style={{
                                    transition: "transform 0.3s ease-in-out",
                                    cursor: "pointer",
                                    fontSize: "1.6em",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform =
                                      "scale(1.3)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform =
                                      "scale(1)")
                                  }
                                ></i>{" "}
                                <span className="fw-bold">Settings</span>
                              </Link>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion defaultActiveKey="1">
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>
                              <span className="text-muted text-uppercase fs-13">
                                Vehicle Options
                              </span>
                            </Accordion.Header>
                            <Accordion.Body className="text-body pt-1">
                              <ul className="list-unstyled">
                                {showVehicleTypes &&
                                showVehicleTypes === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowVehiclesTypes();
                                      }}
                                    >
                                      <i
                                        className="ph ph-car-simple align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Vehicle Types
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowVehiclesTypes();
                                      }}
                                    >
                                      <i
                                        className="ph ph-car-simple align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Vehicle Types
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showJourneyTypes &&
                                showJourneyTypes === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowJourneyTypes();
                                      }}
                                    >
                                      <i
                                        className="ph ph-hand-waving align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Journey Types
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowJourneyTypes();
                                      }}
                                    >
                                      <i
                                        className="ph ph-hand-waving align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Journey Types
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showLuggageTypes === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowLuggageTypes();
                                      }}
                                    >
                                      <i
                                        className="ph ph-backpack align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Luggage Types
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowLuggageTypes();
                                      }}
                                    >
                                      <i
                                        className="ph ph-backpack align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Luggage Types
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showPassengerAndLuggageLimits === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_PassengerAndLuggageLimits();
                                      }}
                                    >
                                      <i
                                        className="ph ph-users-three align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Passenger & Luggage Limits
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_PassengerAndLuggageLimits();
                                      }}
                                    >
                                      <i
                                        className="ph ph-users-three align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Passenger & Luggage Limits
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showMileageBands === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowMileageBands();
                                      }}
                                    >
                                      <i
                                        className="ph ph-ruler align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Mileage Bands
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowMileageBands();
                                      }}
                                    >
                                      <i
                                        className="ph ph-ruler align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Mileage Bands
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showHourlyBands === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowHourlyBands();
                                      }}
                                    >
                                      <i
                                        className="ph ph-clock align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Hourly Bands
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowHourlyBands();
                                      }}
                                    >
                                      <i
                                        className="ph ph-clock align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Hourly Bands
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showWaitingBands === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowWaitingBands();
                                      }}
                                    >
                                      <i
                                        className="ph ph-hourglass-medium align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Waiting Bands
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowWaitingBands();
                                      }}
                                    >
                                      <i
                                        className="ph ph-hourglass-medium align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Waiting Bands
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showSingleJourneys === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowSingleJourneys();
                                      }}
                                    >
                                      <i
                                        className="ph ph-circle-notch align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Single Froce Journeys
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowSingleJourneys();
                                      }}
                                    >
                                      <i
                                        className="ph ph-circle-notch align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Single Froce Journeys
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showPricingCalendar &&
                                showPricingCalendar === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowPricingCalendar();
                                      }}
                                    >
                                      <i
                                        className="ph ph-calendar-blank align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Pricing Calendar
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowPricingCalendar();
                                      }}
                                    >
                                      <i
                                        className="ph ph-calendar-blank align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Pricing Calendar
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showRegionalPricings &&
                                showRegionalPricings === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowRegionalPricings();
                                      }}
                                    >
                                      <i
                                        className="ph ph-signpost align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Regional Pricing
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowRegionalPricings();
                                      }}
                                    >
                                      <i
                                        className="ph ph-signpost align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Regional Pricing
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showPricingPostalCodes &&
                                showPricingPostalCodes === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowPricingPostalCodes();
                                      }}
                                    >
                                      <i
                                        className="ph ph-package align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Pricing Postal Code
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowPricingPostalCodes();
                                      }}
                                    >
                                      <i
                                        className="ph ph-package align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Pricing Postal Code
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showSources && showSources === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowSources();
                                      }}
                                    >
                                      <i
                                        className="ph ph-info align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">Sources</span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowSources();
                                      }}
                                    >
                                      <i
                                        className="ph ph-info align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">Sources</span>
                                    </Link>
                                  </li>
                                )}

                                {showBasetoBase && showBasetoBase === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowBasetoBase();
                                      }}
                                    >
                                      <i
                                        className="ph ph-house-line align-middle fs-16"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Base to Base
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowBasetoBase();
                                      }}
                                    >
                                      <i
                                        className="ph ph-house-line align-middle fs-16"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Base to Base
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {showVehicleExtra &&
                                showVehicleExtra === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowVehicleExtra();
                                      }}
                                    >
                                      <i
                                        className="ph ph-wrench align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Vehicle Extra
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowVehicleExtra();
                                      }}
                                    >
                                      <i
                                        className="ph ph-wrench align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Vehicle Extra
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {locationSettings &&
                                locationSettings === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowLocations();
                                      }}
                                    >
                                      <i
                                        className="ph ph-map-pin-line"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">Locations</span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowLocations();
                                      }}
                                    >
                                      <i
                                        className="ph ph-map-pin-line"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">Locations</span>
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Item>
                      <Accordion.Item eventKey="0">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              <span className="text-muted text-uppercase fs-13">
                                Affiliate Options
                              </span>
                            </Accordion.Header>
                            <Accordion.Body className="text-body pt-1">
                              <Link
                                className="text-dark"
                                to="#"
                                onClick={() => {
                                  tog_ShowSupplierRoutingRule();
                                }}
                              >
                                <i
                                  className="ph ph-path align-middle"
                                  style={{
                                    transition: "transform 0.3s ease-in-out",
                                    cursor: "pointer",
                                    fontSize: "1.6em",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform =
                                      "scale(1.3)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform =
                                      "scale(1)")
                                  }
                                ></i>{" "}
                                <span className="fw-bold">
                                  Supplier Routing Rule
                                </span>
                              </Link>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion defaultActiveKey="3">
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>
                              <span className="text-muted text-uppercase fs-13">
                                Check List Options
                              </span>
                            </Accordion.Header>
                            <Accordion.Body className="text-body pt-1">
                              <Link
                                className="text-dark"
                                to="#"
                                onClick={() => {
                                  tog_ShowCheckTypes();
                                }}
                              >
                                <i
                                  className="ph ph-check-circle align-middle"
                                  style={{
                                    transition: "transform 0.3s ease-in-out",
                                    cursor: "pointer",
                                    fontSize: "1.6em",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform =
                                      "scale(1.3)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform =
                                      "scale(1)")
                                  }
                                ></i>{" "}
                                <span className="fw-bold">Check Types</span>
                              </Link>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4">
                        <Accordion defaultActiveKey="3">
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>
                              <span className="text-dark fw-bold text-uppercase fs-13">
                                Email Config
                              </span>
                            </Accordion.Header>
                            <Accordion.Body className="text-body pt-1">
                              <ul className="list-unstyled">
                                {templatetSettings &&
                                templatetSettings === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_EmailTemplate();
                                      }}
                                    >
                                      <i
                                        className="ph ph-envelope align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Canned Messages
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_EmailTemplate();
                                      }}
                                    >
                                      <i
                                        className="ph ph-envelope align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Canned Messages
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {attachmentSettings &&
                                attachmentSettings === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowAttachmentSettings();
                                      }}
                                    >
                                      <i
                                        className="ph ph-paperclip align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Attachments
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowAttachmentSettings();
                                      }}
                                    >
                                      <i
                                        className="ph ph-paperclip align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Attachments
                                      </span>
                                    </Link>
                                  </li>
                                )}
                                {shortCodeSettings &&
                                shortCodeSettings === true ? (
                                  <li className="mb-1 bg-warning">
                                    <Link
                                      className="text-white fs-16"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowShortCodeSettings();
                                      }}
                                    >
                                      <i
                                        className="ph ph-brackets-square align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Short Codes
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="mb-1">
                                    <Link
                                      className="text-dark d-flex"
                                      to="#"
                                      onClick={() => {
                                        tog_ShowShortCodeSettings();
                                      }}
                                    >
                                      <i
                                        className="ph ph-brackets-square  align-middle"
                                        style={{
                                          transition:
                                            "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          fontSize: "1.6em",
                                        }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.transform =
                                            "scale(1)")
                                        }
                                      ></i>{" "}
                                      <span className="fw-bold">
                                        Short Codes
                                      </span>
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Item>
                    </Accordion>
                  </Card>
                </Col>
                <Col xl={9} lg={8}>
                  {showSettings && <CompanyData />}
                  {showVehicleTypes && <VehicleTypes />}
                  {showJourneyTypes && <JourneyTypes />}
                  {showLuggageTypes && <LuggageTypes />}
                  {showPassengerAndLuggageLimits && (
                    <PassengerAndLuggageLimits />
                  )}
                  {showMileageBands && <MileageBands />}
                  {showHourlyBands && <HourlyBands />}
                  {showWaitingBands && <WaitingBands />}
                  {showSingleJourneys && <SingleJourneys />}
                  {showPricingCalendar && <PricingCalendar />}
                  {showRegionalPricings && <RegionalPricings />}
                  {showSources && <SourcesSetting />}
                  {showBasetoBase && <BaseToBase />}
                  {showVehicleExtra && <VehicleExtra />}
                  {showSupplierRoutingRule && <SupplierRoutingRule />}
                  {locationSettings && <LocationSettings />}
                  {showPricingPostalCodes && <PricingPostalCodes />}
                  {showCheckTypes && <CheckTypes />}
                  {attachmentSettings && <Attachments />}
                  {templatetSettings && <EmailTemplates />}
                  {shortCodeSettings && <ShortCode />}
                </Col>
              </Row>
            </Card.Header>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default SiteSettings;
