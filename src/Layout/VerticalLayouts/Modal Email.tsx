import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import {
  useDeleteEmailQueueMutation,
  useDeleteMultipleEmailQueuesMutation,
  useGetAllEmailQueuesQuery,
} from "features/EmailQueue/emailQueueSlice";
import {
  useSendAllQueueEmailsMutation,
  useSendNewEmailMutation,
} from "features/Emails/emailSlice";
import { useAddNewEmailSentMutation } from "features/emailSent/emailSentSlice";
import { useGetQuoteByIdQuery } from "features/Quotes/quoteSlice";
import axios from "axios";

interface ChildProps {
  setmodal_Email: React.Dispatch<React.SetStateAction<boolean>>;
  modal_Email: boolean;
}

const ModalEmail: React.FC<ChildProps> = ({ setmodal_Email, modal_Email }) => {
  const navigate = useNavigate();

  const { data: AllEmailQueue = [] } = useGetAllEmailQueuesQuery();

  const [deleteEmailQueue] = useDeleteEmailQueueMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Email Queue is sent successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyDeleteWithSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Email Queue is clear",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyError = (err: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };
  const AlertDelete = async (_id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to go back?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, clear it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteEmailQueue(_id);
          swalWithBootstrapButtons.fire(
            "Cleared!",
            "Email is cleared.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Canceled", "Email is safe :)", "info");
        }
      });
  };

  const [sendNewEmailMutation] = useSendNewEmailMutation();
  const initialSendNewEmailData = {
    newEmail: "",
    subject: "",
    body: "",
    file: "",
    sender: "",
    name: "",
  };

  const currentDate = new Date();

  const [saveEmailSentMutation] = useAddNewEmailSentMutation();

  const [sendNewEmail, setSendNewEmail] = useState(initialSendNewEmailData);
  const [allEmailQueue, setAllEmailQueue] = useState<any[]>([]);
  const { newEmail, subject, body, file, sender, name } = sendNewEmail;

  const onSubmitSendNewEmail = async (queue: any) => {
    try {
      let id = "";
      if (queue.quote_Id !== undefined) {
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/api/quote/getQuoteById/${queue.quote_Id}`
          )
          .then(async (res: any) => {
            id = res.quote_ref;

            const emailData = {
              newEmail: queue.newEmail!,
              subject: queue.subject,
              body: queue.body,
              file: queue.file,
              sender: queue.sender,
              name: queue.name,
              quote_Id: queue.quote_Id,
            };
            console.log(emailData);
            await sendNewEmailMutation(emailData);

            await saveEmailSentMutation({
              date: currentDate.toDateString(),
              subjectEmail: queue.subject,
              from: queue.sender,
              to: queue.newEmail!,
              quoteID: id,
            });
            await deleteEmailQueue(queue?._id!);
            notifySuccess();
            setmodal_Email(!modal_Email);
          });
      } else {
        id = "";

        const emailData = {
          newEmail: queue.newEmail!,
          subject: queue.subject,
          body: queue.body,
          file: queue.file,
          sender: queue.sender,
          name: queue.name,
          quote_Id: queue.quote_Id,
        };
        console.log(emailData);
        await sendNewEmailMutation(emailData);

        await saveEmailSentMutation({
          date: currentDate.toDateString(),
          subjectEmail: queue.subject,
          from: queue.sender,
          to: queue.newEmail!,
          quoteID: id,
        });
        await deleteEmailQueue(queue?._id!);
        notifySuccess();
        setmodal_Email(!modal_Email);
      }
    } catch (error) {
      notifyError(error);
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (row: any) => row?.quoteID!,
      sortable: true,
      width: "180px",
    },
    {
      name: <span className="font-weight-bold fs-13">Subject</span>,
      selector: (row: any) => (
        <span>
          <b>{row?.subject!}</b>
        </span>
      ),
      sortable: true,
      width: "240px",
    },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row: any) => row?.sender!,
      sortable: true,
      width: "240px",
    },
    {
      name: <span className="font-weight-bold fs-13">To</span>,
      selector: (row: any) => row?.newEmail!,
      sortable: true,
      width: "240px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-3 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-info edit-item-btn"
                onClick={() => onSubmitSendNewEmail(row)}
              >
                <i className="ri-send-plane-fill align-middle"></i> Send Now
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(row._id)}
              >
                <i className="ri-close-fill align-middle"></i> Clear
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const [sendAllQueueEmailsMutation] = useSendAllQueueEmailsMutation();
  const onSubmitSendAllEmails = async (
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (e) {
      e.preventDefault();
    }
    try {
      await sendAllQueueEmailsMutation({});
      setmodal_Email(!modal_Email);
      notifySuccess();
      navigate("/emails-sent");
    } catch (error) {
      notifyError(error);
    }
  };

  let arrToDelete: string[] = [];
  const [deleteMultipleEmailQueuesMutation] =
    useDeleteMultipleEmailQueuesMutation();

  AllEmailQueue.forEach((element: any) => {
    arrToDelete.push(element._id!);
  });

  const onSubmitToDeleteAllQueue = async (
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (e) {
      e.preventDefault();
    }
    try {
      await deleteMultipleEmailQueuesMutation({ ids: arrToDelete });
      notifyDeleteWithSuccess();
      setmodal_Email(!modal_Email);
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <div className="col-xxl-12 col-lg-12">
          <div className="card card-height-100">
            <DataTable columns={columns} data={AllEmailQueue} pagination />
          </div>
          <div>
            <Link
              to="#"
              className="link-danger fw-medium float-start mb-2"
              onClick={onSubmitSendAllEmails}
            >
              <span className="badge badge-label bg-primary fs-14">
                Send Queue Now
              </span>
            </Link>
            <Link
              to="#"
              className="link-danger fw-medium float-end mb-2"
              onClick={onSubmitToDeleteAllQueue}
            >
              <span className="badge badge-label bg-danger fs-14">
                Clear Queue
              </span>
            </Link>
          </div>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default ModalEmail;
