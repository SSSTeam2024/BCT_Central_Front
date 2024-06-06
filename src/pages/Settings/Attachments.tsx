import React, { useState } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  useAddNewAttachmentMutation,
  useDeleteAttachmentMutation,
  useGetAllAttachmentsQuery,
} from "features/Attachments/attachmentSlice";
import Swal from "sweetalert2";

const Attachments = () => {
  const [modal_AddJouney, setmodal_AddJouney] = useState<boolean>(false);
  function tog_AddJouney() {
    setmodal_AddJouney(!modal_AddJouney);
  }
  const { data: AllAttachments = [] } = useGetAllAttachmentsQuery();
  function convertToBase64(
    file: File
  ): Promise<{ base64Data: string; extension: string }> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const [, base64Data] = base64String.split(","); // Extract only the Base64 data
        const extension = file.name.split(".").pop() ?? ""; // Get the file extension
        resolve({ base64Data, extension });
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  }

  const [createAttachment] = useAddNewAttachmentMutation();

  const initialAttachment = {
    name: "",
    attachment_base64_string: "",
    attachment_extension: "",
    attachment: "",
  };

  const [attachmentData, setAttachmentData] = useState(initialAttachment);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("profile_image_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setAttachmentData({
        ...attachmentData,
        attachment: profileImage,
        attachment_base64_string: base64Data,
        attachment_extension: extension,
      });
    }
  };

  const { name, attachment_base64_string, attachment_extension, attachment } =
    attachmentData;

  const onChangeAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachmentData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const [deleteAttachment] = useDeleteAttachmentMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (_id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to go back !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteAttachment(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Attachment is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Attachment is safe :)",
            "info"
          );
        }
      });
  };

  const handleDownload = (attachment: string) => {
    const [base64Data, extension] = attachment.split(".");
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${base64Data}`;
    link.download = attachment;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      cell: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-info edit-item-btn"
                onClick={() => handleDownload(row.attachment)}
              >
                <i
                  className="ri-download-2-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.2em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(row._id)}
              >
                <i
                  className="ri-delete-bin-2-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.2em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];
  const onSubmitAttachment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createAttachment(attachmentData);
      //   navigate("/pending-quotes");
      //   notifySuccess();
    } catch (error) {
      //   notifyError(error);
    }
  };
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card id="shipmentsList">
          <Card.Header className="border-bottom-dashed">
            <Row className="g-3">
              <Col xxl={3} lg={6}>
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Search for something..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </Col>
              <Col lg={7}></Col>
              <Col>
                <div
                  className="btn-group btn-group-sm mt-2"
                  role="group"
                  aria-label="Basic example"
                  onClick={tog_AddJouney}
                >
                  <button type="button" className="btn btn-primary">
                    <i
                      className="ri-add-fill align-middle"
                      style={{
                        transition: "transform 0.3s ease-in-out",
                        cursor: "pointer",
                        fontSize: "1.5em",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.3)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    ></i>{" "}
                    <span>Add New Attachment</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable columns={columns} data={AllAttachments} pagination />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade"
        id="createModal"
        show={modal_AddJouney}
        onHide={() => {
          tog_AddJouney();
        }}
        centered
      >
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5" id="createModalLabel">
            New Attachment
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Form className="create-form" onSubmit={onSubmitAttachment}>
            <input type="hidden" id="id-field" />
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <Row className="mb-4">
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-center mb-3">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    className="w-100"
                    onChange={onChangeAttachment}
                    value={attachmentData.name}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Row>
                <div className="text-center mb-3">
                  <div className="position-relative d-inline-block">
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <label
                        htmlFor="profile_image_base64_string"
                        className="mb-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="Select company logo"
                        // style={{width: "0px"}}
                      >
                        <span className="avatar-xs d-inline-block">
                          <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                            <i className="ri-image-fill"></i>
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-control d-none"
                        type="file"
                        name="profile_image_base64_string"
                        id="profile_image_base64_string"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e)}
                        style={{ width: "210px", height: "120px" }}
                      />
                    </div>
                    <div className="avatar-lg">
                      <div className="avatar-title bg-light rounded-3">
                        <img
                          src={`data:image/jpeg;base64, ${attachmentData.attachment_base64_string}`}
                          alt=""
                          id="profile_image_base64_string"
                          className="avatar-xl h-auto rounded-3 object-fit-cover"
                          style={{
                            width: "210px",
                            height: "120px",
                            zIndex: 5000,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </Row>
            <Row>
              <div className="hstack gap-2 justify-content-end">
                <Button
                  variant="light"
                  onClick={() => {
                    tog_AddJouney();
                    setAttachmentData(initialAttachment);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    tog_AddJouney();
                  }}
                  type="submit"
                  variant="success"
                  id="addNew"
                >
                  Add
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default Attachments;
