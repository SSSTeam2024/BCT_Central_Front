import {
  GeneralSet,
  useUpdateAppMutation,
} from "features/generalSettings/generalSettingsSlice";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

interface addresSettingProps {
  app: GeneralSet;
}

const AddressSetting: React.FC<addresSettingProps> = ({ app }) => {
  const [companyAddress, setCompanyAddress] = useState(app.address);
  const [companyTel, setCompanyTel] = useState(app.tel);
  const [companyMobile, setCompanyMobile] = useState(app.mobile);
  const [salesEmail, setSalesEmail] = useState(app.sales_email);
  const [opEmail, setOpEmail] = useState(app.op_email);
  const [updateApp] = useUpdateAppMutation();

  const handleBlur = () => {
    if (
      companyAddress !== app.address ||
      companyTel !== app.tel ||
      companyMobile !== app.mobile ||
      salesEmail !== app.sales_email ||
      opEmail !== app.op_email
    ) {
      updateApp({
        _id: app?._id!,
        trading_name: app.trading_name,
        registred_name: app.registred_name,
        company_number: app.company_number,
        tax_number: app.tax_number,
        driver_app_code: app.driver_app_code,
        billing_profile: app.billing_profile,
        prefix: app.prefix,
        copy_customer_details: app.copy_customer_details,
        address: companyAddress,
        tel: companyTel,
        mobile: companyMobile,
        sales_email: salesEmail,
        op_email: opEmail,
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
                <Form.Label htmlFor={`address-${app._id}`}>Address</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`address-${app._id}`}
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor={`tel-${app._id}`}>Tel</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`tel-${app._id}`}
                  value={companyTel}
                  onChange={(e) => setCompanyTel(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor={`mobile-${app._id}`}>Mobile</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`mobile-${app._id}`}
                  value={companyMobile}
                  onChange={(e) => setCompanyMobile(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor={`sales-email-${app._id}`}>
                  Sales email
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`sales-email-${app._id}`}
                  value={salesEmail}
                  onChange={(e) => setSalesEmail(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor={`op-email-${app._id}`}>
                  Operations email
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id={`op-email-${app._id}`}
                  value={opEmail}
                  onChange={(e) => setOpEmail(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
          </table>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default AddressSetting;
