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
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Quote,
  useGetAllQuoteQuery,
  useUpdateProgressMutation,
} from "features/Quotes/quoteSlice";
import Swal from "sweetalert2";
import Select from "react-select";
import SimpleBar from "simplebar-react";

interface Column {
  name: JSX.Element;
  selector: (cell: Quote | any) => JSX.Element | any;
  sortable: boolean;
  width?: string;
}

const JobShare = () => {
  document.title = "Job Share | Bouden Coach Travel";

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

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

  const [showAffiliates, setShowAffiliates] = useState<boolean>(false);
  const [selectedColumnValues, setSelectedColumnValues] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const whiteListLocation = useLocation();
  const [updateQuoteProgress] = useUpdateProgressMutation();
  const { data: AllQuotes = [] } = useGetAllQuoteQuery();

  const result = AllQuotes.filter(
    (bookings) =>
      bookings.progress === "New" && bookings.white_list?.length !== 0
  );

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
      width: "150px",
    },
    {
      name: (
        <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>
      ),
      selector: (row: any) => "No Driver",
      sortable: true,
      width: "88px",
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle Type</span>,
      selector: (row: any) => row.vehicle_type,
      sortable: true,
      width: "200px",
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
            return <span className="badge bg-success"> {cell.progress} </span>;
          case "Cancel":
            return <span className="badge bg-dark"> {cell.progress} </span>;
          case "Created":
            return <span className="badge bg-info"> {cell.progress} </span>;
          case "Pending":
            return <span className="badge bg-warning"> {cell.progress} </span>;
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
      width: "80px",
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

  const handleSelectValueColumnChange = (selectedOption: any) => {
    const values = selectedOption.map((option: any) => option.value);
    setSelectedColumnValues(values);
  };

  const filteredColumns = columns.filter(
    (column: Column) =>
      !selectedColumnValues.includes(column.name.props.children)
  );

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

  // This function is triggered when the select Period
  const handleSelectPeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPeriod(value);
  };

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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Job Share" pageTitle="Jobs" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
                  <Col lg={6}>
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
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={filteredColumns}
                  data={getFilteredJobs()}
                  selectableRows
                  onSelectedRowsChange={handleChange}
                  pagination
                  customStyles={customTableStyles}
                />
              </Card.Body>
            </Card>
          </Col>
        </Container>
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
                            {affiliate.jobStatus === "Refused" ? (
                              <span className="badge bg-danger">
                                {affiliate.jobStatus}
                              </span>
                            ) : (
                              <span className="badge bg-info">
                                {affiliate.jobStatus}
                              </span>
                            )}
                          </td>
                        </tr>
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
export default JobShare;
