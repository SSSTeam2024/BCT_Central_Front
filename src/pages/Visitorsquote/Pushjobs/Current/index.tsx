import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import CurrentTable from "./currentJobTable";

const Current = () => {
  document.title = "Job Push | Coach Hire Network";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Job Push" pageTitle="Jobs" />
          <CurrentTable />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Current;
