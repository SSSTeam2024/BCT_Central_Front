import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SketchPicker } from "react-color";
import {
  GeneralSet,
  useUpdateAppMutation,
} from "features/generalSettings/generalSettingsSlice";

interface CompanyColorProps {
  app: GeneralSet;
}

const CompanyColor: React.FC<CompanyColorProps> = ({ app }) => {
  const [companyColor, setCompanyColor] = useState(app.color);
  const [updateApp] = useUpdateAppMutation();

  const handleColorChange = (color: any) => {
    const newColor = color.hex;
    setCompanyColor(newColor);

    if (newColor !== app.color) {
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
        address: app.address,
        tel: app.tel,
        mobile: app.mobile,
        sales_email: app.sales_email,
        op_email: app.op_email,
        color: newColor,
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
          <SketchPicker color={companyColor} onChange={handleColorChange} />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default CompanyColor;
