import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Widgets from "./Widgets";

const Dashboard = () => {
  document.title = "Dashboard | Bouden Coach Travel";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xxl={12} lg={6} className="order-first">
              <Row className="row-cols-xxl-4 row-cols-1">
                <Widgets />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
