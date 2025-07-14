import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import CompanyName from "./CompanyName";
import AddressSetting from "./AddressSetting";
import CompanyColor from "./CompanyColor";
import PrincingInfo from "./PricingInfo";
import InvoiceLogo from "./InvoiceLogo";
import NotificationSetting from "./NotificationSetting";
import BCCOptional from "./BCCOptional";
import { useGetAllAppsQuery } from "features/generalSettings/generalSettingsSlice";

const CompanyData = () => {
  const { data = [] } = useGetAllAppsQuery();

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <Row className="d-flex align-items-center">
                    <Col lg={2}>
                      <span className="badge bg-light rounded-5 text-dark">
                        <i className="ph ph-identification-badge fs-24"></i>
                      </span>
                    </Col>
                    <Col>
                      <h4>Company name</h4>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {data.map((app) => (
                    <CompanyName key={app._id} app={app} />
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <Row className="d-flex align-items-center">
                    <Col lg={2}>
                      <span className="badge bg-light rounded-5 text-dark">
                        <i className="ph ph-map-pin-line fs-24"></i>
                      </span>
                    </Col>
                    <Col>
                      <h4>Address</h4>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {data.map((app) => (
                    <AddressSetting key={app._id} app={app} />
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <Row className="d-flex align-items-center">
                    <Col lg={2}>
                      <span className="badge bg-light rounded-5 text-dark">
                        <i className="ph ph-palette fs-24"></i>
                      </span>
                    </Col>
                    <Col>
                      <h4>Company Color</h4>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {data.map((app) => (
                    <CompanyColor key={app._id} app={app} />
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <Row className="d-flex align-items-center">
                    <Col lg={2}>
                      <span className="badge bg-light rounded-5 text-dark">
                        <i className="ph ph-money fs-24"></i>
                      </span>
                    </Col>
                    <Col>
                      <h4>Pricing Info</h4>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {data.map((app) => (
                    <PrincingInfo key={app._id} app={app} />
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <Row className="d-flex align-items-center">
                    <Col lg={2}>
                      <span className="badge bg-light rounded-5 text-dark">
                        <i className="ph ph-image-square fs-24"></i>
                      </span>
                    </Col>
                    <Col>
                      <h4>Invoice Logo</h4>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {data.map((app) => (
                    <InvoiceLogo key={app._id} app={app} />
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <Row className="d-flex align-items-center">
                    <Col lg={2}>
                      <span className="badge bg-light rounded-5 text-dark">
                        <i className="ph ph-bell-ringing fs-24"></i>
                      </span>
                    </Col>
                    <Col>
                      <h4>Notification</h4>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {data.map((app) => (
                    <NotificationSetting key={app._id} app={app} />
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <Row className="d-flex align-items-center">
                    <Col lg={2}>
                      <span className="badge bg-light rounded-5 text-dark">
                        <i className="ph ph-envelope fs-24"></i>
                      </span>
                    </Col>
                    <Col>
                      <h4>BCC Optional</h4>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {data.map((app) => (
                    <BCCOptional key={app._id} app={app} />
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};
export default CompanyData;
