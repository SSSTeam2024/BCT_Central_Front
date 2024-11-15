import React from "react";
import { Card, Col, Row } from "react-bootstrap";

interface QuoteDetailsCardProps {
  selectedQuote: any | null;
}

const QuoteDetailsCard: React.FC<QuoteDetailsCardProps> = ({
  selectedQuote,
}) => {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-center">
        <span className="fw-medium">Quote Details</span>{" "}
        {selectedQuote ? (
          <span className="fw-bold">: {selectedQuote.quote_ref}</span>
        ) : (
          ""
        )}
      </Card.Header>
      <Card.Body>
        {selectedQuote ? (
          <>
            <Row>
              <Col lg={5}>Customer Name :</Col>
              <Col lg={7}>{selectedQuote.id_visitor.name}</Col>
            </Row>
            <Row>
              <Col lg={5}>Customer Email :</Col>
              <Col lg={7}>{selectedQuote.id_visitor.email}</Col>
            </Row>
            <Row>
              <Col lg={5}>Customer Phone :</Col>
              <Col lg={7}>{selectedQuote.id_visitor.phone}</Col>
            </Row>
            <Row>
              <Col lg={5}>Passenger Number :</Col>
              <Col lg={7}>{selectedQuote.passengers_number}</Col>
            </Row>
            <Row>
              <Col lg={5}>Journey Type :</Col>
              <Col lg={7}>{selectedQuote.journey_type}</Col>
            </Row>
            <Row>
              <Col lg={5}>Collection :</Col>
              <Col lg={7}>{selectedQuote.start_point.placeName}</Col>
            </Row>
            <Row>
              <Col lg={5}>Destination :</Col>
              <Col lg={7}>{selectedQuote.destination_point.placeName}</Col>
            </Row>
            <Row>
              <Col lg={5}>Luggage Details :</Col>
              <Col lg={7}>{selectedQuote.luggage_details}</Col>
            </Row>
            <Row>
              <Col lg={5}>Vechile Type :</Col>
              <Col lg={7}>{selectedQuote.vehicle_type}</Col>
            </Row>
          </>
        ) : (
          <p>Select a quote to see the details.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default QuoteDetailsCard;
