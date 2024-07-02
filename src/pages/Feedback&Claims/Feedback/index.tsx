import BreadCrumb from "Common/BreadCrumb";
import React from "react";
import { Container, Row } from "react-bootstrap";
import Feedbacktable from "./Feedbacktable";
import { useGetAllFeedBacksQuery } from "features/FeedBack/feedBackSlice";

const Feedback = () => {
  document.title = "FeedBacks | Bouden Coach Travel";

  const { data: reviews = [] } = useGetAllFeedBacksQuery();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Feedback" pageTitle="Feedback & Claims" />
          <Row>
            <Feedbacktable reviews={reviews} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Feedback;
