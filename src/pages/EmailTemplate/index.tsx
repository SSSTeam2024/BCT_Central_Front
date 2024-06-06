import React from "react";
import { Col } from "react-bootstrap";

import Template from "./Template";
import { useGetAllEmailQuery } from "features/Emails/emailSlice";

const EmailTemplates = () => {
  document.title = "Email Templates | Bouden Coach Travel";
  const { data: AllEmails = [] } = useGetAllEmailQuery();
  return (
    <React.Fragment>
      <Col lg={12}>
        <Template emails={AllEmails} />
      </Col>
    </React.Fragment>
  );
};

export default EmailTemplates;
