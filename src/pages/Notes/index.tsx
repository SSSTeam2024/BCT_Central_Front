import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";

const Notes = () => {
  document.title = "Notes | Coach Hire Network";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Notes" pageTitle="Dashboard" />
          <h1>Notes</h1>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Notes;
