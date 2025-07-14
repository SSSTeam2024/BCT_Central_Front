import BreadCrumb from "Common/BreadCrumb";
import React from "react";
import { Container, Row } from "react-bootstrap";
import Feedbacktable from "./Feedbacktable";
import { useGetAllFeedBacksQuery } from "features/FeedBack/feedBackSlice";

const Feedback = () => {
  document.title = "FeedBacks | Coach Hire Network";

  const { data: feedbacks = [] } = useGetAllFeedBacksQuery();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Feedbacks" pageTitle="Releveance" />
          <Row>
            <Feedbacktable feedbacks={feedbacks} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Feedback;
