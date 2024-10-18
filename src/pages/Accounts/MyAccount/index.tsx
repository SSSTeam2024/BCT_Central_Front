import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import Profile from "./Profile";

const MyAccount = () => {
  document.title = "Team | Coach Hire Network";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Team" pageTitle="Administration" />
          <h1>Team</h1>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyAccount;
