import React, { useState } from "react";
import {
  Row,
  Card,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CompanyName from "./CompanyName";
import AddressSetting from "./AddressSetting";
import CompanyColor from "./CompanyColor";
import PrincingInfo from "./PricingInfo";
import InvoiceLogo from "./InvoiceLogo";
import NotificationSetting from "./NotificationSetting";
import BCCOptional from "./BCCOptional";

const CompanyData = () => {
  const [modal_QuoteInfo, setmodal_QuoteInfo] = useState<boolean>(false);
  function tog_QuoteInfo() {
    setmodal_QuoteInfo(!modal_QuoteInfo);
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Car Type</span>,
      selector: (row: any) => row.carType,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Limit</span>,
      selector: (row: any) => row.Limit,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => row.Price,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      cell: () => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link to="#" className="badge badge-soft-primary edit-item-btn">
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn">
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];
  const data = [
    {
      carType: "10-16 Seat Standard Minibus",
      Limit: "8 hours",
      Price: "£ 5.00",
    },
    {
      carType: "10-16 Seat Standard Minibus",
      Limit: "15 hours",
      Price: "£ 10.00",
    },
    {
      carType: "10-16 Seat Executive Minibus",
      Limit: "8 hours",
      Price: "£ 5.00",
    },
    {
      carType: "10-16 Seat Executive Minibus",
      Limit: "15 hours",
      Price: "£ 10.00",
    },
    {
      carType: "17-24 Seat Standard Midi Coach",
      Limit: "8 hours",
      Price: "£ 6.00",
    },
    {
      carType: "17-24 Seat Standard Midi Coach",
      Limit: "15 hours",
      Price: "£ 12.00",
    },
    {
      carType: "17-24 Seat Executive Midi Coach",
      Limit: "8 hours",
      Price: "£ 6.00",
    },
    {
      carType: "17-24 Seat Executive Midi Coach",
      Limit: "15 hours",
      Price: "£ 12.00",
    },
    {
      carType: "17-24 Seat Luxury Midi Coach",
      Limit: "6 hours",
      Price: "£ 12.00",
    },
    {
      carType: "29 Seat Standard Midi Coach",
      Limit: "8 hours",
      Price: "£ 7.00",
    },
  ];

  const [modal_AddMileage, setmodal_AddMileage] = useState<boolean>(false);
  function tog_AddMileage() {
    setmodal_AddMileage(!modal_AddMileage);
  }

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card id="shipmentsList">
          <Card.Body>
            <Row>
              <Col lg={6}>
                <Card>
                  <Card.Header>Company name</Card.Header>
                  <Card.Body>
                    <CompanyName />
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>Address</Card.Header>
                  <Card.Body>
                    <AddressSetting />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Card>
                  <Card.Header>Company Color</Card.Header>
                  <Card.Body>
                    <CompanyColor />
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>Pricing Info</Card.Header>
                  <Card.Body>
                    <PrincingInfo />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Card>
                  <Card.Header>Invoice Logo</Card.Header>
                  <Card.Body>
                    <InvoiceLogo />
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>Notification</Card.Header>
                  <Card.Body>
                    <NotificationSetting />
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>BCC Optional</Card.Header>
                  <Card.Body>
                    <BCCOptional />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};
export default CompanyData;
