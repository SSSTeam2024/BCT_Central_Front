import React, { useEffect, useState } from "react";
import { Container, Card, Tab } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import JourneyRoute from "./JourneyRoute";
import RunDates from "./RunDates";
import ProgramGroups from "./ProgramGroups";
import ProgramExtra from "./ProgramExtra";
import RecapPage from "./RecapPage";
import ReturnToJourneyRoute from "./ReturnToJourneyRoute";
import ReturnToRunDates from "./ReturnToRunDates";
import { useLocation } from "react-router-dom";

const AddProgramm = () => {
  document.title = "New Suggested Route | Coach Hire Network";
  const location = useLocation();
  const { nextTab } = location.state || {};
  const [activeVerticalTab, setactiveVerticalTab] = useState<number>(1);
  useEffect(() => {
    if (nextTab) {
      setactiveVerticalTab(nextTab);
    }
  }, [nextTab]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title="New Suggested Route"
            pageTitle="Suggested Routes"
          />
          <Card className="overflow-auto">
            <Card.Body className="form-steps">
              <Tab.Container activeKey={activeVerticalTab}>
                <Tab.Content>
                  <Tab.Pane eventKey="1">
                    <JourneyRoute setActiveTab={setactiveVerticalTab} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <RunDates setActiveTab={setactiveVerticalTab} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <ProgramGroups setActiveTab={setactiveVerticalTab} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="4">
                    <ProgramExtra setActiveTab={setactiveVerticalTab} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="5">
                    <RecapPage setActiveTab={setactiveVerticalTab} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="6">
                    <ReturnToJourneyRoute setActiveTab={setactiveVerticalTab} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="7">
                    <ReturnToRunDates setActiveTab={setactiveVerticalTab} />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default AddProgramm;
