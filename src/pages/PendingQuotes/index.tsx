import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Modal,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Quote,
  useDeleteQuoteMutation,
  useGetAllQuoteQuery,
  useSurveyAffilaitesMutation,
} from "features/Quotes/quoteSlice";
import Swal from "sweetalert2";
import { useGetAllAffiliatesQuery } from "features/Affiliate/affiliateSlice";
import Select from "react-select";
import SimpleBar from "simplebar-react";

interface Column {
  name: JSX.Element;
  selector: (cell: Quote | any) => JSX.Element | any;
  sortable: boolean;
  width?: string;
}

const PendingQuotes = () => {
  document.title = "Pending Quotes | Bouden Coach Travel";

  const whiteListLocation = useLocation();

  //  Internally, customStyles will deep merges your customStyles with the default styling.
  const customTableStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        border: "1px solid #ddd",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        border: "1px solid #ddd",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        border: "1px solid #ddd",
      },
    },
  };

  const customStyles = {
    multiValue: (styles: any, { data }: any) => {
      return {
        ...styles,
        backgroundColor: "#4b93ff",
      };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      backgroundColor: "#4b93ff",
      color: "white",
      //    borderRadius: "50px"
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: "white",
      backgroundColor: "#4b93ff",
      ":hover": {
        backgroundColor: "#4b93ff",
        color: "white",
      },
    }),
  };

  const [showAffiliates, setShowAffiliates] = useState<boolean>(false);

  // From Date
  // Inside your functional component
  const [selectedFromDate, setSelectedFromDate] = useState<string>(() => {
    // Get current date
    const currentDate = new Date();
    // Format it to match your dateFormat option
    const formattedDate = currentDate.toISOString().split("T")[0];
    // Return the formatted date as the default value
    return formattedDate;
  });

  const handleFromDateChange = (selectedDates: Date[]) => {
    const formattedDate = selectedDates[0].toISOString().split("T")[0];
    setSelectedFromDate(formattedDate);
  };

  // To Date
  // const [selectedToDate, setSelectedToDate] = useState<Date | null>(newDate);
  const [selectedToDate, setSelectedToDate] = useState<string>(() => {
    // Get current date
    const currentDate = new Date();
    // Format it to match your dateFormat option
    currentDate.setDate(currentDate.getDate() + 15);
    const formattedDate = currentDate.toISOString().split("T")[0];
    // Return the formatted date as the default value
    return formattedDate;
  });
  const handleToDateChange = (selectedDates: Date[]) => {
    const formattedDate = selectedDates[0].toISOString().split("T")[0];
    setSelectedToDate(formattedDate);
  };

  // Log selectedFromDate whenever it changes
  useEffect(() => {
    console.log(selectedFromDate);
  }, [selectedFromDate]);

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const result = AllQuotes.filter((bookings) => bookings.progress === "New");
  const filteredResult = result.filter(
    (quotes) =>
      quotes.date === selectedFromDate &&
      quotes?.dropoff_date! <= selectedToDate
  );

  const [modal_QuoteInfo, setmodal_QuoteInfo] = useState<boolean>(false);

  function tog_QuoteInfo() {
    setmodal_QuoteInfo(!modal_QuoteInfo);
  }

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const handleChange = ({ selectedRows }: { selectedRows: Quote }) => {
    setIsChecked(!isChecked);
    setSelectedRow(selectedRows);
  };

  const columns: Column[] = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (cell: Quote) => {
        return (
          <span>
            <Link to={`/new-quote/${cell?._id!}`} state={cell}>
              <span className="text-dark">
                QT{cell?._id?.substring(18, 24)}
              </span>
            </Link>{" "}
            <i className="ph ph-eye" onClick={() => tog_QuoteInfo()}></i>
          </span>
        );
      },
      sortable: true,
      width: "220px",
    },
    {
      name: (
        <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>
      ),
      selector: (row: any) => "No Driver",
      sortable: true,
      // width: "88px",
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle Type</span>,
      selector: (row: any) => row.vehicle_type,
      sortable: true,
      // width: "160px",
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) => "No Vehicle",
      sortable: true,
      width: "95px",
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => (
        <span>
          <b>{row.date}</b> at <b>{row.pickup_time}</b>
        </span>
      ),
      sortable: true,
      width: "157px",
    },
    {
      name: <span className="font-weight-bold fs-13">Pax</span>,
      selector: (row: any) => row.passengers_number,
      sortable: true,
      width: "60px",
    },
    {
      name: <span className="font-weight-bold fs-13">Pick Up</span>,
      selector: (row: any) => row.start_point?.placeName!,
      sortable: true,
      width: "270px",
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row.destination_point?.placeName!,
      sortable: true,
      width: "270px",
    },
    {
      name: <span className="font-weight-bold fs-13">Progress</span>,
      selector: (cell: any) => {
        switch (cell.progress) {
          case "New":
            return <span className="badge bg-danger"> {cell.progress} </span>;
          case "Accepted":
            return <span className="badge bg-danger"> New </span>;
          case "Cancel":
            return <span className="badge bg-dark"> {cell.progress} </span>;
          case "Created":
            return <span className="badge bg-info"> {cell.progress} </span>;
          default:
            return <span className="badge bg-danger"> {cell.progress} </span>;
        }
      },
      sortable: true,
      width: "88px",
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row: any) => <span className="badge bg-danger"> New </span>,
      sortable: true,
      width: "80px",
    },
    {
      name: <span className="font-weight-bold fs-13">Passenger Name</span>,
      selector: (row: any) => row.id_visitor?.name!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <span
            className="mdi mdi-phone-in-talk-outline d-flex align-items-center"
            title={cell.id_visitor?.phone!}
          ></span>
        );
      },
      width: "72px",
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <span
            className="mdi mdi-email-outline d-flex align-items-center"
            title={cell.id_visitor?.email!}
          ></span>
        );
      },
      width: "70px",
    },
    {
      name: <span className="font-weight-bold fs-13">Arrival Date</span>,
      selector: (row: any) => (
        <span>
          <b>{row.dropoff_date}</b> at <b>{row.dropoff_time}</b>
        </span>
      ),
      sortable: true,
      width: "157px",
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) =>
        row?.manual_cost! === undefined ? (
          <span>No Price</span>
        ) : (
          <span>
            £ <b>{row?.manual_cost!}</b>
          </span>
        ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Balance</span>,
      selector: (row: any) => "No Balance",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Contract</span>,
      selector: (row: any) => "No Contract",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      selector: (row: Quote) => {
        const date = new Date(row.createdAt);
        return <span>{date.toDateString()}</span>;
      },
      sortable: true,
      width: "157px",
    },
    {
      name: <span className="font-weight-bold fs-13">Affiliate</span>,
      selector: (row: any) => (
        <Link
          to="#"
          onClick={() => setShowAffiliates(!showAffiliates)}
          state={row}
        >
          {row?.white_list?.length}
        </Link>
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Callback</span>,
      selector: (row: any) => "No Callback",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Payment Status</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.PaymentStatus) {
          case "Not Paid":
            return (
              <span className="badge bg-danger"> {cell.PaymentStatus} </span>
            );
          case "Medium":
            return (
              <span className="badge bg-info"> {cell.PaymentStatus} </span>
            );
          case "Low":
            return (
              <span className="badge bg-success"> {cell.PaymentStatus} </span>
            );
          default:
            return <span className="badge bg-warning"> Not Paid </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Account Name</span>,
      selector: (row: any) => row.id_visitor?.name!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Notes</span>,
      selector: (row: any) => {
        return row.notes !== "" ? <span>{row.notes}</span> : "No Notes";
      },
      sortable: true,
    },
  ];

  const optionColumnsTable = [
    { value: "Quote ID", label: "Quote ID" },
    { value: "Go Date", label: "Go Date" },
    { value: "Pax", label: "Pax" },
    { value: "Group", label: "Group" },
    { value: "Pick Up", label: "Pick Up" },
    { value: "Destination", label: "Destination" },
    { value: "Progress", label: "Progress" },
    { value: "Status", label: "Status" },
    { value: "Price", label: "Price" },
  ];

  // State to store the selected option values
  const [selectedColumnValues, setSelectedColumnValues] = useState<any[]>([]);

  // Event handler to handle changes in selected options
  const handleSelectValueColumnChange = (selectedOption: any) => {
    // Extract values from selected options and update state
    const values = selectedOption.map((option: any) => option.value);
    setSelectedColumnValues(values);
  };

  // Filter out columns based on selected options
  const filteredColumns = columns.filter(
    (column: Column) =>
      !selectedColumnValues.includes(column.name.props.children) // Ensure props.children is string
  );

  const [deleteQuote] = useDeleteQuoteMutation();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async () => {
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
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteQuote(selectedRow[0]._id);
          setIsChecked(!isChecked);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Quote is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Canceled", "Quote is safe :)", "info");
        }
      });
  };

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Assign Done successfully",
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

  const navigate = useNavigate();
  const [modal_SurveyAffiliate, setModalSurveyAffiliate] =
    useState<boolean>(false);
  const tog_ModalSurveyAffiliate = () => {
    setModalSurveyAffiliate(!modal_SurveyAffiliate);
  };
  const { data: AllAffiliates = [] } = useGetAllAffiliatesQuery();
  const completeAffiliate = AllAffiliates.filter(
    (affiliates) => affiliates.statusAffiliate === "Accepted"
  );
  const options = completeAffiliate.map((affiliate) => ({
    value: affiliate?._id!,
    label: affiliate.name,
  }));

  // State to store the selected option values
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  // Event handler to handle changes in selected options
  const handleSelectValueChange = (selectedOption: any) => {
    let whiteList: any[] = [];

    // Extract values from selected options and update state
    const values = selectedOption.map((option: any) =>
      whiteList.push({
        id: option.value,
        noteAcceptJob: "",
        price: "",
        jobStatus: "",
      })
    );
    setSelectedValues(whiteList);
  };

  const [surveyAffiliate] = useSurveyAffilaitesMutation();

  const initialSurveyJob = {
    id_Quote: "",
    white_list: [""],
  };

  const [surveyAffiliateToQuote, setSurveyAffiliateToQuote] =
    useState(initialSurveyJob);

  const { id_Quote, white_list } = surveyAffiliateToQuote;

  const onChangeSurveyAffiliate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyAffiliateToQuote((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitSurveyAffiliate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      surveyAffiliateToQuote["id_Quote"] = selectedRow[0]!._id;
      surveyAffiliateToQuote["white_list"] = selectedValues;
      await surveyAffiliate(surveyAffiliateToQuote);
      navigate("/pending-quotes");
      notifySuccess();
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Pending Quotes" pageTitle="Jobs" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
                  <Col lg={4}>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={optionColumnsTable}
                      styles={customStyles}
                      onChange={handleSelectValueColumnChange} // Set the onChange event handler
                    />
                  </Col>
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All</option>
                      <option value="Today">Today</option>
                      <option value="Yesterday">Yesterday</option>
                      <option value="Last 7 Days">Last 7 Days</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option defaultValue="This Month">This Month</option>
                      <option value="Last Month">Last Month</option>
                    </select>
                  </Col>
                  <Col lg={2}>
                    <Flatpickr
                      className="form-control flatpickr-input"
                      placeholder={selectedFromDate}
                      options={{
                        dateFormat: "d M, Y",
                      }}
                      defaultValue={selectedFromDate}
                      onChange={handleFromDateChange}
                    />
                  </Col>
                  <Col lg={2}>
                    <Flatpickr
                      className="form-control flatpickr-input"
                      placeholder={selectedToDate}
                      options={{
                        dateFormat: "d M, Y",
                      }}
                      defaultValue={selectedToDate}
                      onChange={handleToDateChange}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <Row className="g-2">
                  <Col lg={2} className="d-flex justify-content-center">
                    {isChecked ? (
                      <ul className="hstack gap-2 list-unstyled mb-0">
                        <li>
                          <Link
                            to="#"
                            className="badge badge-soft-secondary remove-item-btn fs-16"
                            state={selectedRow}
                            onClick={() => tog_ModalSurveyAffiliate()}
                          >
                            <i className="bi bi-send-check fs-18"></i> Push Job
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="badge badge-soft-danger edit-item-btn fs-16"
                            onClick={() => AlertDelete()}
                          >
                            <i className="bi bi-trash-fill fs-20"></i> Delete
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col lg={8} className="d-flex justify-content-center">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for something..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col lg={2} className="d-flex justify-content-end">
                    <div
                      className="btn-group btn-group-sm mt-2"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn btn-outline-dark">
                        Excel
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        PDF
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        Print
                      </button>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={filteredColumns}
                  data={result}
                  selectableRows
                  onSelectedRowsChange={handleChange}
                  pagination
                  customStyles={customTableStyles}
                />
              </Card.Body>
            </Card>
          </Col>
        </Container>
        <Modal
          className="fade zoomIn"
          size="lg"
          show={modal_SurveyAffiliate}
          onHide={() => {
            tog_ModalSurveyAffiliate();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Push Job
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <Form className="tablelist-form" onSubmit={onSubmitSurveyAffiliate}>
              <Row>
                <Col lg={12} className="d-flex justify-content-center">
                  <div className="mb-3">
                    <Col lg={12}>
                      <Form.Label htmlFor="vehicle_type">Affiliate</Form.Label>
                    </Col>
                    <Col lg={12}>
                      <small className="text-muted">
                        You can choose one or many affiliates.
                      </small>
                    </Col>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Select
                          closeMenuOnSelect={false}
                          // defaultValue={[options[1]]}
                          isMulti
                          options={options}
                          styles={customStyles}
                          onChange={handleSelectValueChange} // Set the onChange event handler
                        />
                      </div>
                    </Col>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      className="btn-soft-danger"
                      onClick={() => {
                        tog_ModalSurveyAffiliate();
                      }}
                      data-bs-dismiss="modal"
                    >
                      <i className="ri-close-line align-bottom me-1"></i> Close
                    </Button>
                    <Button
                      className="btn-soft-info"
                      id="add-btn"
                      type="submit"
                      onClick={() => {
                        tog_ModalSurveyAffiliate();
                      }}
                    >
                      <i className="ri-send-plane-line align-bottom me-1"></i>
                      Push
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
        <Offcanvas
          show={showAffiliates}
          onHide={() => setShowAffiliates(!showAffiliates)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Affiliates Details</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="mt-3">
              {whiteListLocation?.state?.white_list?.map(
                (affiliate: any, index: number) => (
                  <SimpleBar>
                    <div
                      className="p-3 border-bottom border-bottom-dashed"
                      key={index}
                    >
                      <table>
                        <tr>
                          <td>
                            <h6>Price :</h6>{" "}
                          </td>
                          <td>
                            <span className="badge bg-info">
                              £ {affiliate?.price!}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Name :</h6>{" "}
                          </td>
                          <td>
                            <i>{affiliate?.id?.name!}</i>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Phone : </h6>
                          </td>
                          <td>
                            <i>{affiliate?.id?.phone}</i>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Email : </h6>
                          </td>
                          <td>
                            <i>{affiliate?.id?.email}</i>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Area of Coverage: </h6>
                          </td>
                          <td>
                            <ul>
                              {affiliate?.id?.coverageArea!.map(
                                (area: any, index: number) => (
                                  <li key={index}>{area?.placeName!}</li>
                                )
                              )}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Fleet: </h6>
                          </td>
                          <td>
                            <ul>
                              {affiliate?.id?.vehicles!.map(
                                (vehicle: any, index: number) => (
                                  <li key={index}>{vehicle?.type!}</li>
                                )
                              )}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          {affiliate?.noteAcceptJob! === undefined ||
                          affiliate?.noteAcceptJob! === "" ? (
                            ""
                          ) : (
                            <div className="alert alert-warning" role="alert">
                              <b>{affiliate?.noteAcceptJob!}</b>
                            </div>
                          )}
                        </tr>
                      </table>
                    </div>
                  </SimpleBar>
                )
              )}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </React.Fragment>
  );
};
export default PendingQuotes;
