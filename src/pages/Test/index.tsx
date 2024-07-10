import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { io } from "socket.io-client";

const Test = () => {
  document.title = "Notes | Bouden Coach Travel";

  const URL = "http://api.chercheinfo.net"; //=== 'production' ? http://57.128.184.217:3000 : 'http://localhost:8800';
  const socket = io(URL);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Socket" pageTitle="Dashboard" />
          <h1>Hello Socket</h1>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Test;
