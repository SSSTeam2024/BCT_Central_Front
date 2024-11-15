import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

interface PopupDetailsProps {
  selectedQuote: any | null;
  onClose: () => void;
}

const PopupDetails: React.FC<PopupDetailsProps> = ({
  selectedQuote,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      id="popup-container"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        width: "360px",
        maxWidth: "90%",
      }}
      ref={popupRef}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        &times;
      </button>
      <h4 style={{ marginBottom: "15px", color: "#333" }}>Quote Information</h4>
      <Row className="border-bottom mb-2">
        <Col className="text-center">
          <p style={{ color: "#555" }}>
            Quote:{" "}
            <span className="fw-bold">
              {selectedQuote.quote_ref || "No details available"}
            </span>
          </p>
        </Col>
      </Row>
      <Row className="border-bottom mb-2">
        <Col>
          <Row>
            <Col>
              <span className="fw-bold">Pickup Time:</span>
            </Col>
            <Col>
              <span className="fw-medium">{selectedQuote.pickup_time}</span>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <span className="fw-bold">DropOff Time:</span>
            </Col>
            <Col>
              <span className="fw-medium">{selectedQuote.dropoff_time}</span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="border-bottom mb-2">
        <Col>
          <Row>
            <Col>
              <span className="fw-bold">Collection:</span>
            </Col>
            <Col>
              <span className="fw-medium">
                {" "}
                {selectedQuote.start_point.placeName}
              </span>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              {" "}
              <span className="fw-bold">Destination:</span>
            </Col>
            <Col>
              <span className="fw-medium">
                {selectedQuote.destination_point.placeName}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <span className="fw-bold">Customer Name:</span>
        </Col>
        <Col lg={6}>
          <span className="fw-medium">{selectedQuote.id_visitor.name}</span>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <span className="fw-bold">Customer Phone:</span>
        </Col>
        <Col lg={6}>
          <span className="fw-medium">{selectedQuote.id_visitor.phone}</span>
        </Col>
      </Row>
      <Row>
        <Col lg={5}>
          <span className="fw-bold">Customer Email:</span>
        </Col>
        <Col lg={7}>
          <span className="fw-medium">{selectedQuote.id_visitor.email}</span>
        </Col>
      </Row>
    </div>
  );
};

export default PopupDetails;
