import {
  GeneralSet,
  useUpdateAppMutation,
} from "features/generalSettings/generalSettingsSlice";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

interface NotificationProps {
  app: GeneralSet;
}

const NotificationSetting: React.FC<NotificationProps> = ({ app }) => {
  const [enquiryEmail, setEnquiryEmail] = useState(app.enquiry_email);
  const [bookingEmail, setBookingEmail] = useState(app.booking_email);
  const [regularEmail, setRegularEmail] = useState(app.regular_email);
  const [mobileSms, setMobileSms] = useState(app.mobile_sms);

  const [updateApp] = useUpdateAppMutation();

  const handleBlur = () => {
    if (
      enquiryEmail !== app.enquiry_email ||
      bookingEmail !== app.booking_email ||
      regularEmail !== app.regular_email ||
      mobileSms !== app.mobile_sms
    ) {
      updateApp({
        _id: app?._id!,
        ...app,
        enquiry_email: enquiryEmail,
        booking_email: bookingEmail,
        regular_email: regularEmail,
        mobile_sms: mobileSms,
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
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck1"
                        checked
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`enquiry-email-${app._id}`}
                      >
                        Email for enquiry
                      </label>
                    </div>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      id={`enquiry-email-${app._id}`}
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
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
                      <label
                        className="form-check-label"
                        htmlFor={`booking-email-${app._id}`}
                      >
                        Email for booking
                      </label>
                    </div>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      id={`booking-email-${app._id}`}
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
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
                      <label
                        className="form-check-label"
                        htmlFor={`regular-email-${app._id}`}
                      >
                        Email for Coach Trip
                      </label>
                    </div>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      id={`regular-email-${app._id}`}
                      value={regularEmail}
                      onChange={(e) => setRegularEmail(e.target.value)}
                      onBlur={handleBlur}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Label htmlFor="customerName-field">
                      Mobile (SMS Notification)
                    </Form.Label>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      id={`mobile-sms-${app._id}`}
                      value={mobileSms}
                      onChange={(e) => setMobileSms(e.target.value)}
                      onBlur={handleBlur}
                    />
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
export default NotificationSetting;
