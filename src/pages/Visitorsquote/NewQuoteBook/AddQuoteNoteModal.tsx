import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { RootState } from "app/store";
import { selectCurrentUser } from "features/Account/authSlice";
import { useSelector } from "react-redux";
import { useAddNotesMutation } from "features/Quotes/quoteSlice";
import { useNavigate } from "react-router-dom";
interface VehicleProps {
  modal_AddNote: boolean;
  setModal_AddNote: React.Dispatch<React.SetStateAction<boolean>>;
  quoteId: string;
}
const AddQuoteNoteModal: React.FC<VehicleProps> = ({
  modal_AddNote,
  setModal_AddNote,
  quoteId,
}) => {
  const navigate = useNavigate();
  const notifySuccessAddNote = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Note Added successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const currentDate = new Date();
  const formattedDate =
    currentDate.getFullYear() +
    "-" +
    String(currentDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(currentDate.getDate()).padStart(2, "0");

  const formattedTime =
    String(currentDate.getHours()).padStart(2, "0") +
    ":" +
    String(currentDate.getMinutes()).padStart(2, "0");

  const [addNotes] = useAddNotesMutation();
  const [note, setNote] = useState("");
  const handleAddNote = async () => {
    if (note) {
      try {
        await addNotes({
          id_quote: quoteId,
          information: {
            note,
            by: user?._id!,
            date: formattedDate,
            time: formattedTime,
          },
        });
        setNote("");
        notifySuccessAddNote();
        setModal_AddNote(!modal_AddNote);
        navigate("/bookings");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  return (
    <div>
      <div
        id="alert-error-msg"
        className="d-none alert alert-danger py-2"
      ></div>
      <Row className="mb-3">
        <Col lg={12}>
          <textarea
            className="form-control"
            id="note"
            name="note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <div className="hstack gap-2 justify-content-end">
            <Button
              className="btn-soft-danger"
              onClick={() => {
                setModal_AddNote(!modal_AddNote);
              }}
              data-bs-dismiss="modal"
            >
              <i className="ri-close-line align-bottom me-1"></i> Close
            </Button>
            <Button
              className="btn-soft-info"
              id="add-btn"
              onClick={handleAddNote}
              disabled={!note.trim()}
            >
              <i className="ri-add-line align-bottom me-1"></i> Add
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AddQuoteNoteModal;
