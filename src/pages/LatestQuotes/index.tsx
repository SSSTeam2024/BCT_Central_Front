import React, { useState } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import {
  Quote,
  useGetAllQuoteQuery,
  useSurveyAffilaitesMutation,
  useUpdateProgressMutation,
} from "features/Quotes/quoteSlice";
import Swal from "sweetalert2";
import { useGetAllAffiliatesQuery } from "features/Affiliate/affiliateSlice";
import Select from "react-select";

// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

interface Column {
  name: JSX.Element;
  selector: (cell: Quote | any) => JSX.Element | any;
  sortable: boolean;
  width?: string;
}

const LatestQuotes = () => {
  document.title = "Latest Quotes | Bouden Coach Travel";

  const customTableStyles = {
    rows: {
      style: {
        minHeight: "72px",
        border: "1px solid #ddd",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        border: "1px solid #ddd",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        border: "1px solid #ddd",
      },
    },
  };

  const customStyles = {
    control: (styles: any, { isFocused }: any) => ({
      ...styles,
      minHeight: "41px",
      borderColor: isFocused ? "#4b93ff" : "#e9ebec",
      boxShadow: isFocused ? "0 0 0 1px #4b93ff" : styles.boxShadow,
      ":hover": {
        borderColor: "#4b93ff",
      },
    }),
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

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();

  const result = AllQuotes.filter(
    (bookings) =>
      bookings.progress === "New" &&
      bookings?.type! === "One way" &&
      bookings.manual_cost === undefined &&
      bookings?.white_list!.length === 0
  );

  const [updateQuoteProgress] = useUpdateProgressMutation();

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
          <Link to={`/new-quote/${cell?.quote_ref!}`} state={cell}>
            <span className="text-info">
              <u>{cell?.quote_ref!}</u>
            </span>
          </Link>
        );
      },
      sortable: true,
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
      selector: (row: any) => <span>No Affiliate</span>,
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
    { value: "Vehicle Type", label: "Vehicle Type" },
    { value: "Date", label: "Date" },
    { value: "Pax", label: "Pax" },
    { value: "Pick Up", label: "Pick Up" },
    { value: "Destination", label: "Destination" },
    { value: "Progress", label: "Progress" },
    { value: "Status", label: "Status" },
    { value: "Price", label: "Price" },
    { value: "Passenger Name", label: "Passenger Name" },
    { value: "Arrival Date", label: "Arrival Date" },
    { value: "Mobile", label: "Mobile" },
    { value: "Email", label: "Email" },
    { value: "Enquiry Date", label: "Enquiry Date" },
    { value: "Account Name", label: "Account Name" },
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
          updateQuoteProgress({
            quote_id: selectedRow[0]._id,
            progress: "Deleted",
          });
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
      navigate("/job-share");
      notifySuccess();
    } catch (error) {
      notifyError(error);
    }
  };

  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  // This function is triggered when the select Period
  const handleSelectPeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPeriod(value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredJobs = () => {
    let filteredJobs = result;

    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        (job: any) =>
          job?.quote_ref!.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.start_point.placeName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          job.destination_point.placeName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          job.id_visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedPeriod && selectedPeriod !== "all") {
      const now = new Date();
      const filterByDate = (jobDate: any) => {
        const date = new Date(jobDate);
        switch (selectedPeriod) {
          case "Today":
            return date.toDateString() === now.toDateString();
          case "Yesterday":
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            return date.toDateString() === yesterday.toDateString();
          case "Last 7 Days":
            const lastWeek = new Date(now);
            lastWeek.setDate(now.getDate() - 7);
            return date >= lastWeek && now >= date;
          case "Last 30 Days":
            const lastMonth = new Date(now);
            lastMonth.setDate(now.getDate() - 30);
            return date >= lastMonth && now >= date;
          case "This Month":
            return (
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear()
            );
          case "Last Month":
            const lastMonthStart = new Date(
              now.getFullYear(),
              now.getMonth() - 1,
              1
            );
            const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
            return date >= lastMonthStart && date <= lastMonthEnd;
          default:
            return true;
        }
      };
      filteredJobs = filteredJobs.filter((job) => filterByDate(job.date));
    }

    return filteredJobs;
  };

  // const columnsPdf = filteredColumns;
  // const data = getFilteredJobs().reverse();

  // const exportPDF = () => {
  //   const doc = new jsPDF();
  //   const tableColumn = columnsPdf.map((col) => col.name.props.children);
  //   const tableRows = data.map((row) =>
  //     columnsPdf.map((col) => {
  //       const value = col.selector(row);
  //       if (React.isValidElement(value)) {
  //         // Type assertion to React.ReactElement to access props
  //         const element = value as React.ReactElement;
  //         return element.props.children || "";
  //       }
  //       return value !== null && value !== undefined ? value.toString() : "";
  //     })
  //   );

  //   doc.autoTable({
  //     head: [tableColumn],
  //     body: tableRows,
  //   });

  //   doc.save("table.pdf");
  // };

  // const exportExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   XLSX.writeFile(workbook, "Latest Quotes.xlsx");
  // };

  // const printTable = () => {
  //   window.print();
  // };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Latest Quotes" pageTitle="Jobs" />
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
                      onChange={handleSelectValueColumnChange}
                      placeholder="Filter Columns"
                    />
                  </Col>
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                      onChange={handleSelectPeriod}
                    >
                      <option value="all">All Days</option>
                      <option value="Today">Today</option>
                      <option value="Yesterday">Yesterday</option>
                      <option value="Last 7 Days">Last 7 Days</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option defaultValue="This Month">This Month</option>
                      <option value="Last Month">Last Month</option>
                    </select>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="border-bottom-dashed">
                <Row>
                  <Col lg={6} className="mb-2">
                    {isChecked && (
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
                    )}
                  </Col>
                  <Col lg={6} className="d-flex justify-content-end">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for something..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  {/* <Col lg={1}>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={exportPDF}
                    >
                      <i className="bi bi-filetype-pdf fs-20"></i>
                    </button>
                  </Col>
                  <Col lg={1}>
                    <button
                      type="button"
                      className="btn btn-darken-success btn-sm"
                      onClick={exportExcel}
                    >
                      <i className="bi bi-file-earmark-excel fs-20"></i>
                    </button>
                  </Col>
                  <Col lg={1}>
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={printTable}
                    >
                      <i className="bi bi-printer fs-20"></i>
                    </button>
                  </Col> */}
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={filteredColumns}
                  data={getFilteredJobs().reverse()}
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
      </div>
    </React.Fragment>
  );
};
export default LatestQuotes;
