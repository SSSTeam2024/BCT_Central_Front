import React from "react";
import { Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import DriverTable from "./DriverTable";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";

const Driver = () => {
  document.title = "Drivers | Coach Hire Network";

  const { data = [] } = useGetAllDriverQuery();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Driver" pageTitle="Accounts" />
          <Row>
            <DriverTable driver={data} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Driver;
