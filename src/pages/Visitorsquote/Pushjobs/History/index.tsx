import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import HistoryTable from "./historyTable";

const History = () => {
  document.title = "Push Job History | Coach Hire Network";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Push Job History" pageTitle="Push Jobs" />
          <HistoryTable />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default History;
