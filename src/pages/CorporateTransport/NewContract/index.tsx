import React, { useState } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteContractMutation,
  useGetAllContractsQuery,
  useUpdateContractStatusToApprovedMutation,
} from "features/contract/contractSlice";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";

const NewContract = () => {
  document.title = "Contract | Bouden Coach Travel";
  const { data: AllContracts = [] } = useGetAllContractsQuery();
  const navigate = useNavigate();

  const [modal_UpdateContractStatus, setmodal_UpdateContractStatus] =
    useState<boolean>(false);
  function tog_ModalToUpdateContractStatus() {
    setmodal_UpdateContractStatus(!modal_UpdateContractStatus);
  }

  // Effective Date
  const [selectedEffectiveDate, setSelectedEffectiveDate] =
    useState<Date | null>(null);
  const handleEffectiveDateChange = (selectedDates: Date[]) => {
    setSelectedEffectiveDate(selectedDates[0]);
  };

  function tog_AddContract() {
    navigate("/new-contract");
  }
  const [updateContractStatusMutation] =
    useUpdateContractStatusToApprovedMutation();
  const [deleteContract] = useDeleteContractMutation();

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
        text: "You won't be able to go back?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteContract(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Contract is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Contract is safe :)",
            "info"
          );
        }
      });
  };

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Contract Status is updated successfully",
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

  const contractLocation = useLocation();

  const initialUpdateContractStatus = {
    contract_id: "",
    effectiveDate: "",
  };

  const [updateContractStatusToContract, setUpdateContractStatusToContract] =
    useState(initialUpdateContractStatus);

  const { contract_id, effectiveDate } = updateContractStatusToContract;

  const onChangeUpdateContractStatus = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateContractStatusToContract((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitUpdateContractStatusToApproved = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      console.log(contractLocation.state?._id!);
      updateContractStatusToContract["contract_id"] =
        contractLocation.state?._id!;
      updateContractStatusToContract["effectiveDate"] =
        selectedEffectiveDate!.toDateString();
      updateContractStatusMutation(updateContractStatusToContract)
        .then(() => navigate("/contract"))
        .then(() => notifySuccess());
    } catch (error) {
      notifyError(error);
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Contract Ref</span>,
      selector: (row: any) => row.contractRef,
      sortable: true,
      width: "140px",
    },
    {
      name: <span className="font-weight-bold fs-13">Contract Name</span>,
      selector: (row: any) => row.contractName,
      sortable: true,
      width: "300px",
    },
    {
      name: <span className="font-weight-bold fs-13">Customer</span>,
      selector: (row: any) => row.accountName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row: any) => {
        return (
          <div>
            <span>
              <strong>{row?.idProgram?.pickUp_date!}</strong>
            </span>{" "}
            <span>at</span>{" "}
            <span>
              <strong>{row!.idProgram?.pickUp_Time!}</strong>
            </span>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">To</span>,
      selector: (row: any) => {
        return (
          <div>
            <span>
              <strong>{row?.idProgram?.droppOff_date!}</strong>
            </span>{" "}
            <span>at</span>{" "}
            <span>
              <strong>{row?.idProgram?.dropOff_time!}</strong>
            </span>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => "£ " + row.prices,
      sortable: true,
      width: "160px",
    },
    {
      name: <span className="font-weight-bold fs-13">Invoice Frequency</span>,
      selector: (cell: any) => {
        switch (cell.invoiceFrequency) {
          case "Weekly":
            return (
              <span className="badge bg-primary">{cell.invoiceFrequency}</span>
            );
          case "Bi Weekly":
            return (
              <span className="badge bg-info"> {cell.invoiceFrequency} </span>
            );
          case "Daily":
            return (
              <span className="badge bg-success">
                {" "}
                {cell.invoiceFrequency}{" "}
              </span>
            );
          case "Third Weekly":
            return (
              <span className="badge bg-secondary">
                {" "}
                {cell.invoiceFrequency}{" "}
              </span>
            );
          case "Monthly":
            return (
              <span className="badge bg-dark"> {cell.invoiceFrequency} </span>
            );
          default:
            return (
              <span className="badge bg-primary">{cell.invoiceFrequency}</span>
            );
        }
      },
      sortable: true,
      width: "160px",
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (cell: any) => {
        switch (cell.contractStatus) {
          case "Pending":
            return (
              <span className="badge bg-warning"> {cell.contractStatus} </span>
            );
          case "Approved":
            return (
              <span className="badge bg-info"> {cell.contractStatus} </span>
            );
          default:
            return (
              <span className="badge bg-warning"> {cell.contractStatus} </span>
            );
        }
      },
      sortable: true,
      width: "98px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to={`/contract/${row?.contractName!}`}
                className="badge badge-soft-primary edit-item-btn"
                state={row}
              >
                <i
                  className="ri-eye-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.6em",
                  }}
                ></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-dark edit-item-btn"
                state={row}
                onClick={() => tog_ModalToUpdateContractStatus()}
              >
                <i
                  className="mdi mdi-update"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.6em",
                  }}
                ></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i
                  className="ri-edit-2-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.6em",
                  }}
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
                    fontSize: "1.6em",
                  }}
                ></i>
              </Link>
            </li>
          </ul>
        );
      },
      width: "200px",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Contract" pageTitle="Finance" />
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
                  <Col
                    sm={9}
                    className="d-flex col-lg-auto justify-content-end"
                  >
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">Select</option>
                      <option value="Today">Extra Personnel</option>
                      <option value="Yesterday">CHB</option>
                    </select>
                  </Col>
                  <Col className="col-xxl-auto col-sm-auto ms-auto">
                    <Button
                      variant="success"
                      onClick={() => tog_AddContract()}
                      className="add-btn"
                    >
                      <i className="ph ph-file-plus me-1 align-middle"></i> Add
                      Contract
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable columns={columns} data={AllContracts} pagination />
              </Card.Body>
            </Card>
          </Col>
        </Container>
        <Modal
          className="fade zoomIn"
          size="sm"
          show={modal_UpdateContractStatus}
          onHide={() => {
            tog_ModalToUpdateContractStatus();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Add Effective Date To Contract n°{" "}
              {contractLocation.state?.contractRef!}
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form
              className="tablelist-form"
              onSubmit={onSubmitUpdateContractStatusToApproved}
            >
              <Row>
                <Col lg={12}>
                  <div className="mb-3">
                    <Form.Label htmlFor="registration_date">
                      Effective Date
                    </Form.Label>
                    <Flatpickr
                      className="form-control flatpickr-input"
                      value={selectedEffectiveDate!}
                      onChange={handleEffectiveDateChange}
                      placeholder="Select Date"
                      options={{
                        dateFormat: "d M, Y",
                      }}
                      id="registration_date"
                      name="registration_date"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      className="btn-soft-danger"
                      onClick={() => {
                        tog_ModalToUpdateContractStatus();
                      }}
                      data-bs-dismiss="modal"
                    >
                      <i className="ri-close-line align-bottom me-1"></i> Close
                    </Button>
                    <Button
                      className="btn-soft-primary"
                      type="submit"
                      onClick={() => {
                        tog_ModalToUpdateContractStatus();
                      }}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default NewContract;
