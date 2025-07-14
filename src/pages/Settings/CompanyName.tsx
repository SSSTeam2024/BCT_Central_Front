import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import {
  GeneralSet,
  useUpdateAppMutation,
} from "features/generalSettings/generalSettingsSlice";

interface companyNameProps {
  app: GeneralSet;
}

const CompanyName: React.FC<companyNameProps> = ({ app }) => {
  const [tradingName, setTradingName] = useState(app.trading_name);
  const [registredName, setRegistredName] = useState(app.registred_name);
  const [companyNumber, setCompanyNumber] = useState(app.company_number);
  const [taxNumber, setTaxNumber] = useState(app.tax_number);
  const [driverAppCode, setDriverAppCode] = useState(app.driver_app_code);
  const [billingProfile, setBillingProfile] = useState(app.billing_profile);
  const [companyPrefix, setCompanyPrefix] = useState(app.prefix);
  const [updateApp] = useUpdateAppMutation();

  const handleBlur = () => {
    if (
      tradingName !== app.trading_name ||
      registredName !== app.registred_name ||
      companyNumber !== app.company_number ||
      taxNumber !== app.tax_number ||
      driverAppCode !== app.driver_app_code ||
      billingProfile !== app.billing_profile ||
      companyPrefix !== app.prefix
    ) {
      updateApp({
        _id: app?._id!,
        trading_name: tradingName,
        registred_name: registredName,
        company_number: companyNumber,
        tax_number: taxNumber,
        driver_app_code: driverAppCode,
        billing_profile: billingProfile,
        prefix: companyPrefix,
        copy_customer_details: app.copy_customer_details,
        address: app.address,
        tel: app.tel,
        mobile: app.mobile,
        sales_email: app.sales_email,
        op_email: app.op_email,
        color: app.color,
        currency_symbol: app.currency_symbol,
        symbol_position: app.symbol_position,
        balance_due: app.balance_due,
        default_deposit_type: app.default_deposit_type,
        default_deposit_amount: app.default_deposit_amount,
        auto_pricing_type: app.auto_pricing_type,
        auto_pricing_amount: app.auto_pricing_amount,
        enquiry_email: app.enquiry_email,
        booking_email: app.booking_email,
        regular_email: app.regular_email,
        mobile_sms: app.mobile_sms,
        bcc_email: app.bcc_email,
        logo: app.logo,
        show_journey_price: app.show_journey_price,
        show_journey: app.show_journey,
      });
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <table>
            <tr>
              <td>
                <Form.Label htmlFor="customerName-field">
                  Trading name
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`trading-name-${app._id}`}
                  value={tradingName}
                  onChange={(e) => setTradingName(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor="customerName-field">
                  Registered Name
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`registred-name-${app._id}`}
                  value={registredName}
                  onChange={(e) => setRegistredName(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor="customerName-field">
                  Company Number
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`company-number-${app._id}`}
                  value={companyNumber}
                  onChange={(e) => setCompanyNumber(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor="customerName-field">Tax Number</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`tax-number-${app._id}`}
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor={`driver-app-code-${app._id}`}>
                  Driver App
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`driver-app-code-${app._id}`}
                  value={driverAppCode}
                  onChange={(e) => setDriverAppCode(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor="customerName-field">
                  Billing Profile
                </Form.Label>
              </td>
              <td className="hstack gap-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`billingProfile-${app._id}`}
                    id={`billingYes-${app._id}`}
                    checked={billingProfile === "Yes"}
                    onChange={() => {
                      setBillingProfile("Yes");
                      handleBlur();
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`billingYes-${app._id}`}
                  >
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`billingProfile-${app._id}`}
                    id={`billingNo-${app._id}`}
                    checked={billingProfile === "No"}
                    onChange={() => {
                      setBillingProfile("No");
                      handleBlur();
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`billingNo-${app._id}`}
                  >
                    No
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor={`prefix-${app._id}`}>Prefix</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`prefix-${app._id}`}
                  value={driverAppCode}
                  onChange={(e) => setDriverAppCode(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="formCheck1"
                    checked
                  />
                  <label className="form-check-label" htmlFor="formCheck1">
                    Automatic copy Customer Details
                  </label>
                </div>
              </td>
            </tr>
          </table>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default CompanyName;
