import React from "react";
import { Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import TeamTable from "./TeamTable";
import { useGetAllTeamQuery } from "features/Team/teamSlice";

const Team = () => {
  document.title = "Teams | Bouden Coach Travel";

  const { data: AllTeams = [] } = useGetAllTeamQuery();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Team" pageTitle="Accounts" />
          <Row>
            <TeamTable team={AllTeams} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Team;
