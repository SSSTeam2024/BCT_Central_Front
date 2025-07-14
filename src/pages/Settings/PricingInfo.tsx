import {
  GeneralSet,
  useUpdateAppMutation,
} from "features/generalSettings/generalSettingsSlice";
import React, { useState } from "react";
import {
  Container,
  Dropdown,
  Form,
  Row,
  Card,
  Col,
  Button,
  Image,
  ListGroup,
  Modal,
} from "react-bootstrap";

interface PricingInfoProps {
  app: GeneralSet;
}

const PrincingInfo: React.FC<PricingInfoProps> = ({ app }) => {
  const [currencySymbol, setCurrencySymbol] = useState(app.currency_symbol);
  const [symbolPosition, setSymbolPosition] = useState(app.symbol_position);
  const [balanceDue, setBalanceDue] = useState(app.balance_due);
  const [defaultDepositType, setDefaultDepositType] = useState(
    app.default_deposit_type
  );
  const [defaultDepositAmount, setDefaultDepositAmount] = useState(
    app.default_deposit_amount
  );
  const [increasePricing, setIncreasePricing] = useState(app.auto_pricing_type);
  const [showJourney, setShowJourney] = useState(app.show_journey);
  const [increasePricingPrice, setIncreasePricingPrice] = useState(
    app.auto_pricing_amount
  );
  const [showJourneyPrice, setShowJourneyPrice] = useState(
    app.show_journey_price
  );
  const [updateApp] = useUpdateAppMutation();

  const handleSelecteBalanceDue = (e: any) => {
    setBalanceDue(e.target.value);
  };

  const handleBlur = () => {
    if (
      currencySymbol !== app.currency_symbol ||
      balanceDue !== app.balance_due ||
      defaultDepositAmount !== app.default_deposit_amount ||
      showJourneyPrice !== app.show_journey_price ||
      increasePricingPrice !== app.auto_pricing_amount
      // showJourney !== app.show_journey ||
      // increasePricing !== app.auto_pricing_type
    ) {
      updateApp({
        _id: app?._id!,
        ...app,
        currency_symbol: currencySymbol,
        balance_due: balanceDue,
        default_deposit_amount: defaultDepositAmount,
        show_journey_price: showJourneyPrice,
        auto_pricing_amount: increasePricingPrice,
        // auto_pricing_type: increasePricing,
        // show_journey: showJourney,
      });
    }
  };

  return (
    <React.Fragment>
      <Row>
        <table>
          <tr>
            <td>
              <Form.Label htmlFor={`currency-symbol-${app._id}`}>
                Currency Symbol
              </Form.Label>
            </td>
            <td>
              <Form.Control
                type="text"
                id={`currency-symbol-${app._id}`}
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                onBlur={handleBlur}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="hstack gap-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`symbolPosition-${app._id}`}
                  id={`symboleBefore-${app._id}`}
                  checked={symbolPosition === "Before"}
                  onChange={() => {
                    const newPosition = "Before";
                    setSymbolPosition(newPosition);
                    if (newPosition !== app.symbol_position) {
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
                        color: app.color,
                        currency_symbol: app.currency_symbol,
                        symbol_position: newPosition,
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
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`symboleBefore-${app._id}`}
                >
                  Before
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`symbolPosition-${app._id}`}
                  id={`symboleAfter-${app._id}`}
                  checked={symbolPosition === "After"}
                  onChange={() => {
                    const newPosition = "After";
                    setSymbolPosition(newPosition);
                    if (newPosition !== app.symbol_position) {
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
                        color: app.color,
                        currency_symbol: app.currency_symbol,
                        symbol_position: newPosition,
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
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`symboleAfter-${app._id}`}
                >
                  After
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <Form.Label htmlFor="balanceDue">Balance Due</Form.Label>
            </td>
            <td>
              <select
                className="form-select text-muted"
                name="balanceDue"
                id="balanceDue"
                value={balanceDue}
                onChange={handleSelecteBalanceDue}
                onBlur={handleBlur}
              >
                <option value="">Balance Due</option>
                <option value="0 days before travel">
                  0 days before travel
                </option>
                <option value="1 days before travel">
                  1 days before travel
                </option>
                <option value="2 days before travel">
                  2 days before travel
                </option>
                <option value="3 days before travel">
                  3 days before travel
                </option>
                <option value="4 days before travel">
                  4 days before travel
                </option>
                <option value="5 days before travel">
                  5 days before travel
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <Form.Label htmlFor="customerName-field">
                Default Deposit
              </Form.Label>
            </td>
            <td>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`defaultDeposit-${app._id}`}
                  id={`depositCash-${app._id}`}
                  checked={defaultDepositType === "Cash"}
                  onChange={() => {
                    const newDefaultDeposit = "Cash";
                    setDefaultDepositType(newDefaultDeposit);
                    if (newDefaultDeposit !== app.default_deposit_type) {
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
                        color: app.color,
                        currency_symbol: app.currency_symbol,
                        symbol_position: newDefaultDeposit,
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
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`depositCash-${app._id}`}
                >
                  Cash
                </label>
              </div>
            </td>
            <td>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`defaultDeposit-${app._id}`}
                  id={`depositBefore-${app._id}`}
                  checked={defaultDepositType === "Before Percent"}
                  onChange={() => {
                    const newDefaultDeposit = "Before Percent";
                    setDefaultDepositType(newDefaultDeposit);
                    if (newDefaultDeposit !== app.default_deposit_type) {
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
                        color: app.color,
                        currency_symbol: app.currency_symbol,
                        symbol_position: newDefaultDeposit,
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
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`depositBefore-${app._id}`}
                >
                  Before Percent(%)
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Form.Control
                type="text"
                id={`default-deposit-amount-${app._id}`}
                value={defaultDepositAmount}
                onChange={(e) => setDefaultDepositAmount(e.target.value)}
                onBlur={handleBlur}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Form.Label htmlFor="customerName-field">Auto Pricing</Form.Label>
            </td>
            <td>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="increasePricingCheck"
                  checked={increasePricing === "Yes"}
                  onChange={(e) =>
                    setIncreasePricing(e.target.checked ? "Yes" : "No")
                  }
                  onBlur={() => {
                    if (increasePricing !== app.auto_pricing_type) {
                      updateApp({
                        _id: app?._id!,
                        ...app,
                        auto_pricing_amount: "",
                        auto_pricing_type: increasePricing,
                      });
                    }
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="increasePricingCheck"
                >
                  Increase Pricing (%)
                </label>
              </div>
            </td>
            <td>
              {increasePricing === "Yes" && (
                <Form.Control
                  type="text"
                  id={`auto-pricing-amount-${app._id}`}
                  value={increasePricingPrice}
                  onChange={(e) => setIncreasePricingPrice(e.target.value)}
                  onBlur={handleBlur}
                />
              )}
            </td>
          </tr>

          <tr>
            <td></td>
            <td colSpan={2}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showJourneyCheck"
                  checked={showJourney === "Yes"}
                  onChange={(e) =>
                    setShowJourney(e.target.checked ? "Yes" : "No")
                  }
                  onBlur={() => {
                    if (showJourney !== app.show_journey) {
                      updateApp({
                        _id: app?._id!,
                        ...app,
                        show_journey_price: "",
                        show_journey: showJourney,
                      });
                    }
                  }}
                />
                <label className="form-check-label" htmlFor="showJourneyCheck">
                  Show Journey Price
                </label>
              </div>
            </td>
          </tr>

          {showJourney === "Yes" && (
            <tr>
              <td></td>
              <td colSpan={2}>
                <Form.Control
                  type="text"
                  id={`show-journey-price-${app._id}`}
                  value={showJourneyPrice}
                  onChange={(e) => setShowJourneyPrice(e.target.value)}
                  onBlur={handleBlur}
                />
              </td>
            </tr>
          )}
        </table>
      </Row>
    </React.Fragment>
  );
};
export default PrincingInfo;
