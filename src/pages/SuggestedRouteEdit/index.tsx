import React from "react";
import { Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useLocation } from "react-router-dom";
import ProgramName from "./ProgramName";

const SuggestedRouteEdit = () => {
  document.title = "Edit Suggested Route | Coach Hire Network";
  const location = useLocation();
  const program_details = location.state;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Edit Suggested Route"
            pageTitle="Suggested Routes"
          />
          <Row>
            <ProgramName details={program_details} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SuggestedRouteEdit;
