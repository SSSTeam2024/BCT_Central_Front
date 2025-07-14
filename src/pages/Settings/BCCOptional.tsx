import {
  GeneralSet,
  useUpdateAppMutation,
} from "features/generalSettings/generalSettingsSlice";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

interface BccProps {
  app: GeneralSet;
}

const BCCOptional: React.FC<BccProps> = ({ app }) => {
  const [bccEmail, setBccEmail] = useState(app.bcc_email);

  const [updateApp] = useUpdateAppMutation();

  const handleBlur = () => {
    if (bccEmail !== app.bcc_email) {
      updateApp({
        _id: app?._id!,
        ...app,
        bcc_email: bccEmail,
      });
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <div className="mb-3">
            <Row>
              <table>
                <tr>
                  <td>
                    <Form.Label htmlFor={`bcc-email-${app._id}`}>
                      BCC E-mail
                    </Form.Label>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      id={`bcc-email-${app._id}`}
                      value={bccEmail}
                      onChange={(e) => setBccEmail(e.target.value)}
                      onBlur={handleBlur}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck1"
                        checked
                      />
                      <label className="form-check-label" htmlFor="formCheck1">
                        Active
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck1"
                        checked
                      />
                      <label className="form-check-label" htmlFor="formCheck1">
                        New Quote
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck1"
                        checked
                      />
                      <label className="form-check-label" htmlFor="formCheck1">
                        Quote Sent
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck1"
                        checked
                      />
                      <label className="form-check-label" htmlFor="formCheck1">
                        Booking Confirmed
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck1"
                        checked
                      />
                      <label className="form-check-label" htmlFor="formCheck1">
                        Pending Change
                      </label>
                    </div>
                  </td>
                </tr>
              </table>
            </Row>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default BCCOptional;
