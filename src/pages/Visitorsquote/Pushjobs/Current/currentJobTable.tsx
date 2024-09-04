import React, { useState } from "react";
import {
  Row,
  Card,
  Col,
  Offcanvas,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Quote,
  useAcceptAssignedAffilaiteMutation,
  useAddAffiliateToWhiteListMutation,
  useDeleteAffiliateFromWhiteListMutation,
  useDeleteWhiteListMutation,
  useGetAllQuoteQuery,
  useUpdateProgressMutation,
} from "features/Quotes/quoteSlice";
import { useGetAllAffiliatesQuery } from "features/Affiliate/affiliateSlice";
import Select from "react-select";
import Swal from "sweetalert2";

import SimpleBar from "simplebar-react";

interface Column {
  name: JSX.Element;
  selector: (cell: Quote | any) => JSX.Element | any;
  sortable: boolean;
  width?: string;
}

const CurrentTable = () => {
  const whiteListLocation = useLocation();
  const locationQuote = useLocation();
  const navigate = useNavigate();

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

  const [selectedColumnValues, setSelectedColumnValues] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [showGroups, setShowGroups] = useState<boolean>(false);
  const [modal_AddAffiliateToWhiteList, setModalAddAffiliateToWhiteList] =
    useState<boolean>(false);
  const [isPrivateHiredChecked, setIsPrivateHiredChecked] = useState(false);
  const [isContractChecked, setIsContractChecked] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedProgress, setSelectedProgress] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteWhiteListMutation] = useDeleteWhiteListMutation();
  const [addAffiliateToWhiteListMutation] =
    useAddAffiliateToWhiteListMutation();
  const [deleteAffiliateFromWhiteListMutation] =
    useDeleteAffiliateFromWhiteListMutation();
  const [acceptAssignedAffiliate] = useAcceptAssignedAffilaiteMutation();
  const [updateQuoteProgress] = useUpdateProgressMutation();

  const { data: AllQuotes = [] } = useGetAllQuoteQuery();

  const { data: AllAffiliates = [] } = useGetAllAffiliatesQuery();

  const completeAffiliate = AllAffiliates.filter(
    (affiliates) => affiliates.statusAffiliate === "Accepted"
  );

  const whiteList = whiteListLocation?.state?.white_list || [];

  // Filter out affiliates that are not in the white list
  const filteredWhiteList = completeAffiliate.filter(
    (affiliate) =>
      !whiteList.some((item: any) => item?.id?._id! === affiliate._id)
  );

  const options = filteredWhiteList.map((affiliate) => ({
    value: affiliate?._id!,
    label: affiliate.name,
  }));

  const handleSelectValueChange = (selectedOption: any) => {
    let whiteList: any[] = [];

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

  let whiteListToBeAdded: any[] = selectedValues.concat(
    whiteListLocation?.state?.white_list!
  );

  const result = AllQuotes.filter(
    (bookings) =>
      (bookings.status === "Pushed" && bookings.id_affiliate !== null) ||
      (bookings.status === "Pushed" && bookings.white_list?.length !== 0) ||
      (bookings.status === "Allocated" && bookings.id_affiliate !== null) ||
      (bookings.status === "Vehicle Allocated" &&
        bookings.id_affiliate !== null) ||
      (bookings.status === "Driver Allocated" && bookings.id_affiliate !== null)
  );

  const privateHiredJobs = result.filter(
    (privateHired) => privateHired?.category === "Private"
  );

  const contractJobs = result.filter(
    (contract) => contract?.category === "Regular"
  );

  const handleChange = ({ selectedRows }: { selectedRows: Quote }) => {
    setIsChecked(!isChecked);
    setSelectedRow(selectedRows);
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

  const initiAlffiliateToWhiteList = {
    id_Quote: "",
    white_list: [""],
  };

  const [addAffiliateToWhiteList, setAddAffiliateToWhiteList] = useState(
    initiAlffiliateToWhiteList
  );

  const { id_Quote, white_list } = addAffiliateToWhiteList;

  const onSubmitAddAffiliateToWhiteList = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      addAffiliateToWhiteList["id_Quote"] = whiteListLocation.state?._id!;
      addAffiliateToWhiteList["white_list"] = whiteListToBeAdded;
      addAffiliateToWhiteListMutation(addAffiliateToWhiteList)
        .then(() => setShowGroups(!showGroups))
        .then(() => navigate("/current-push-jobs"))
        .then(() => notifySuccess());
    } catch (error) {
      notifyError(error);
    }
  };

  const deleteAssignedAffiliate = async (id: any, white_list: any) => {
    deleteAffiliateFromWhiteListMutation({
      QuoteID: id,
      whiteListe: white_list,
    });
  };

  const AlertUnassignAffiliate = async (id: any, white_list: any) => {
    try {
      let whiteList = whiteListLocation.state?.white_list!.filter(
        (item: any) => item.id._id !== white_list
      );
      await deleteAssignedAffiliate(id, whiteList);
      setShowGroups(!showGroups);
      swalWithBootstrapButtons.fire(
        "Unassigned !",
        "The Affiliate is unassigned from this job.",
        "success"
      );
    } catch (error) {
      console.error("Error:", error);
      swalWithBootstrapButtons.fire(
        "Error",
        "An error occurred while Unassigning the affiliate.",
        "error"
      );
    }
  };

  const deletePushedWhiteList = async (id: any) => {
    deleteWhiteListMutation({
      Quote_ID: id,
    });
  };

  const AlertDeleteWhiteList = async (id: any) => {
    try {
      await deletePushedWhiteList(id);
      setShowGroups(!showGroups);
      swalWithBootstrapButtons.fire(
        "Keep It !",
        "The Quote is keeped .",
        "success"
      );
    } catch (error) {
      console.error("Error:", error);
      swalWithBootstrapButtons.fire(
        "Error",
        "An error occurred while deleting affiliate list",
        "error"
      );
    }
  };

  const tog_AddAffiliateToWhiteList = () => {
    setModalAddAffiliateToWhiteList(!modal_AddAffiliateToWhiteList);
  };
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (cell: Quote) => {
        return <span className="text-info">{cell?.quote_ref}</span>;
      },
      sortable: true,
      width: "160px",
    },
    {
      name: (
        <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>
      ),
      selector: (row: any) =>
        row?.id_affiliate_driver === null ? (
          <span className="font-weight-meduim text-danger">No Driver</span>
        ) : (
          <span>
            {row?.id_affiliate_driver?.firstname!}{" "}
            {row?.id_affiliate_driver?.surname!}
          </span>
        ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle Type</span>,
      selector: (row: any) => row?.vehicle_type!,
      sortable: true,
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) =>
        row?.id_affiliate_vehicle! === null ? (
          <span className="font-weight-meduim text-danger">No Vehicle</span>
        ) : (
          <span>{row.id_affiliate_vehicle?.registration_number!}</span>
        ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Go Date</span>,
      selector: (row: any) => (
        <div>
          <strong>{row?.date!}</strong> at <strong>{row?.pickup_time!}</strong>
        </div>
      ),
      sortable: true,
      width: "160px",
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
      width: "120px",
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      sortable: true,
      selector: (row: any) => row.destination_point?.placeName!,
      width: "120px",
    },
    {
      name: <span className="font-weight-bold fs-13">Progress</span>,
      selector: (cell: any) => {
        switch (cell.progress) {
          case "Booked":
            return <span className="badge bg-warning"> {cell.progress} </span>;
          case "Accepted":
            return <span className="badge bg-success"> {cell.progress} </span>;
          case "Refused":
            return <span className="badge bg-info"> {cell.progress} </span>;
          case "Accept":
            return <span className="badge bg-success"> {cell.progress} </span>;
          case "Completed":
            return <span className="badge bg-success"> {cell.progress} </span>;
          default:
            return <span className="badge bg-danger"> {cell.progress} </span>;
        }
      },
      sortable: true,
      width: "120px",
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.status) {
          case "Pushed":
            return <span className="badge bg-success"> {cell.status} </span>;
          case "Allocated":
            return <span className="badge bg-info"> {cell.status} </span>;
          case "Vehicle Allocated":
            return <span className="badge bg-secondary"> {cell.status} </span>;
          case "Driver Allocated":
            return <span className="badge bg-primary"> {cell.status} </span>;
          default:
            return <span className="badge bg-danger"> {cell.status} </span>;
        }
      },
      width: "140px",
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      sortable: true,
      selector: (row: any) => (
        <span>
          £ <b>{row?.manual_cost!}</b>
        </span>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Push Price</span>,
      sortable: true,
      selector: (row: any) => (
        <span>
          £ <b>{row?.pushed_price!}</b>
        </span>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Passenger Name</span>,
      sortable: true,
      selector: (row: any) =>
        row.school_id! === null && row.company_id! === null ? (
          <span>{row.id_visitor?.name!}</span>
        ) : row.id_visitor! === null && row.company_id! === null ? (
          <span>{row.school_id?.name!}</span>
        ) : (
          <span>{row.company_id?.name!}</span>
        ),
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile</span>,
      sortable: true,
      selector: (row: any) =>
        row.school_id! === null && row.company_id! === null ? (
          <span>{row.id_visitor?.phone!}</span>
        ) : row.id_visitor! === null && row.company_id! === null ? (
          <span>{row.school_id?.phone!}</span>
        ) : (
          <span>{row.company_id?.phone!}</span>
        ),
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      sortable: true,
      selector: (row: any) =>
        row.school_id! === null && row.company_id! === null ? (
          <span>{row.id_visitor?.email!}</span>
        ) : row.id_visitor! === null && row.company_id! === null ? (
          <span>{row.school_id?.email!}</span>
        ) : (
          <span>{row.company_id?.email!}</span>
        ),
    },
    {
      name: <span className="font-weight-bold fs-13">Arrival Date</span>,
      sortable: true,
      selector: (row: any) => (
        <span>
          <b>{row.dropoff_date}</b> at <b>{row.dropoff_time}</b>
        </span>
      ),
      width: "160px",
    },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      sortable: true,
      selector: (row: Quote) => {
        const date = new Date(row?.createdAt!);
        return <span>{date.toDateString()}</span>;
      },
      width: "125px",
    },
    {
      name: <span className="font-weight-bold fs-13">Affiliate</span>,
      sortable: true,
      selector: (row: any) =>
        row?.white_list! === null ? (
          <span className="font-weight-meduim">{row?.id_affiliate?.name!}</span>
        ) : (
          <Link to="#" onClick={() => setShowGroups(!showGroups)} state={row}>
            {row?.white_list?.length!}
          </Link>
        ),
    },
    {
      name: <span className="font-weight-bold fs-13">Payment Status</span>,
      sortable: true,
      selector: (cell: any) => {
        return <span className="badge bg-danger"> Not Paid </span>;
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Account Name</span>,
      sortable: true,
      selector: (row: any) =>
        row.school_id! === null && row.company_id! === null ? (
          <span>{row.id_visitor?.name!}</span>
        ) : row.id_visitor! === null && row.company_id! === null ? (
          <span>{row.school_id?.name!}</span>
        ) : (
          <span>{row.company_id?.name!}</span>
        ),
    },
  ];

  const handlePrivateHiredCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPrivateHiredChecked(event.target.checked);
  };

  const handleContractCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsContractChecked(event.target.checked);
  };

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

  const acceptAssignedAffiliateToQuote = async (id: any, affiliate_id: any) => {
    acceptAssignedAffiliate({
      idQuote: id,
      id_affiliate: affiliate_id,
    });
  };

  const AlertConfirm = async (id: any, affiliate_id: any) => {
    try {
      await acceptAssignedAffiliateToQuote(id, affiliate_id);
      setShowGroups(!showGroups);
      swalWithBootstrapButtons.fire(
        "Accepted !",
        "The Affiliate is accepted to do this job.",
        "success"
      );
    } catch (error) {
      console.error("Error:", error);
      swalWithBootstrapButtons.fire(
        "Error",
        "An error occurred while converting the program.",
        "error"
      );
    }
  };

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

  // This function is triggered when the select Period
  const handleSelectPeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPeriod(value);
  };

  // This function is triggered when the select Progress
  const handleSelectProgress = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedProgress(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredJobs = () => {
    let filteredJobs = result;
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        (job: any) =>
          job?.quote_ref?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.start_point.placeName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          job.destination_point.placeName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          job?.id_visitor?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
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

    // if (selectedPayment && selectedPayment !== "all") {
    //   filteredJobs = filteredJobs.filter(
    //     (job) => job.payment_status === selectedPayment
    //   );
    // }

    if (selectedProgress && selectedProgress !== "all") {
      filteredJobs = filteredJobs.filter(
        (job) => job.progress === selectedProgress
      );
    }

    if (isPrivateHiredChecked) {
      filteredJobs = filteredJobs.filter((job) => job.category === "Private");
    }

    if (isContractChecked) {
      filteredJobs = filteredJobs.filter((job) => job.category === "Regular");
    }

    return filteredJobs;
  };

  return (
    <React.Fragment>
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
                  id="idPeriod"
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
              <Col sm={9} className="col-lg-auto">
                <select
                  className="form-select text-muted"
                  data-choices
                  data-choices-search-false
                  name="idProgress"
                  id="idProgress"
                  onChange={handleSelectProgress}
                >
                  <option value="all">All Progress</option>
                  <option value="Booked">Booked</option>
                  <option value="On Route">On route</option>
                  <option value="On site">On site</option>
                  <option value="Picked Up">Picked Up</option>
                </select>
              </Col>
              <Col className="d-flex align-items-center">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="option1"
                    checked={isPrivateHiredChecked}
                    onChange={handlePrivateHiredCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Private Hire
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="option2"
                    checked={isContractChecked}
                    onChange={handleContractCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    Contract
                  </label>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card id="shipmentsList">
          <Card.Header className="border-bottom-dashed">
            <Row className="g-3">
              <Col lg={5} className="d-flex justify-content-start">
                {isChecked ? (
                  <Link
                    to="#"
                    className="badge badge-soft-danger edit-item-btn fs-14"
                    onClick={() => AlertDelete()}
                  >
                    <i className="bi bi-trash-fill fs-20"></i> Delete
                  </Link>
                ) : (
                  ""
                )}
              </Col>
              <Col lg={7} className="d-flex justify-content-end">
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
              data={getFilteredJobs().reverse()}
              pagination
              selectableRows
              onSelectedRowsChange={handleChange}
              customStyles={customTableStyles}
            />
          </Card.Body>
        </Card>
      </Col>
      <Offcanvas
        show={showGroups}
        onHide={() => setShowGroups(!showGroups)}
        placement="end"
      >
        <Offcanvas.Header className="border-bottom" closeButton>
          <Offcanvas.Title>
            <Row>
              <Col className="mt-3">Job Details</Col>
              <Col>
                <div className="hstack gap-2 justify-content-start mb-2">
                  <Button
                    type="submit"
                    className="btn-ghost-warning"
                    data-bs-dismiss="modal"
                    onClick={() =>
                      AlertDeleteWhiteList(whiteListLocation?.state!._id!)
                    }
                  >
                    <i className="ri-safe-2-line me-1"></i> KeepIt
                  </Button>
                  <Button
                    type="submit"
                    className="btn-ghost-success"
                    data-bs-dismiss="modal"
                    onClick={tog_AddAffiliateToWhiteList}
                  >
                    <i className="ri-user-add-line me-1"></i> Assign
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <h6>From:</h6>
              </Col>
              <Col lg={9}>
                <h6>
                  <i>{whiteListLocation?.state?.start_point?.placeName!}</i>
                </h6>
                <h6>
                  <i>{whiteListLocation?.state?.date!}</i> at{" "}
                  <i>{whiteListLocation?.state?.pickup_time!}</i>
                </h6>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <h6>To :</h6>
              </Col>
              <Col lg={9}>
                <h6>
                  <i>
                    {whiteListLocation?.state?.destination_point?.placeName!}
                  </i>
                </h6>
                <h6>
                  <i>{whiteListLocation?.state?.dropoff_date!}</i> at{" "}
                  <i>{whiteListLocation?.state?.dropoff_time!}</i>
                </h6>
              </Col>{" "}
            </Row>
            <Row>
              <Col lg={4}>
                <h6>Price :</h6>
              </Col>
              <Col lg={8}>
                <h6>
                  £ <i>{whiteListLocation?.state?.pushed_price!}</i>
                </h6>
              </Col>{" "}
            </Row>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            {whiteListLocation?.state?.white_list!.map((affiliate: any) => (
              <SimpleBar>
                <div
                  className="p-3 border-bottom border-bottom-dashed"
                  key={affiliate._id}
                >
                  <div className="hstack gap-2 justify-content-end mb-2">
                    <Button
                      type="submit"
                      className="btn-ghost-secondary"
                      onClick={() =>
                        AlertConfirm(
                          whiteListLocation?.state!._id!,
                          affiliate.id._id
                        )
                      }
                      data-bs-dismiss="modal"
                    >
                      <i className="ri-user-follow-line me-1"></i> Accept
                    </Button>
                    <Button
                      type="submit"
                      className="btn-ghost-danger"
                      onClick={() =>
                        AlertUnassignAffiliate(
                          whiteListLocation?.state!._id!,
                          affiliate.id._id
                        )
                      }
                      data-bs-dismiss="modal"
                    >
                      <i className="ri-user-unfollow-line me-1"></i> Unassign
                    </Button>
                  </div>
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
                      <td>Name : </td>
                      <td>{affiliate?.id?.name}</td>
                    </tr>
                    <tr>
                      <td>Coverage Area: </td>
                      <td>
                        <ul>
                          {affiliate?.id?.coverageArea!.map(
                            (coverageArea: any) => (
                              <li>{coverageArea.placeName}</li>
                            )
                          )}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Vehicles : </td>
                      <td>
                        <ul>
                          {affiliate?.id?.vehicles?.map((vehicle: any) => (
                            <li>{vehicle.type}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </table>
                  {affiliate?.jobStatus! === undefined ||
                  affiliate?.jobStatus! === "" ? (
                    ""
                  ) : (
                    <div className="d-flex justify-content-end">
                      <span
                        className={
                          affiliate?.jobStatus! === "Refused"
                            ? "badge bg-danger mb-2"
                            : "badge bg-success mb-2"
                        }
                      >
                        {affiliate?.jobStatus!}
                      </span>
                    </div>
                  )}
                  {affiliate?.noteAcceptJob! === undefined ||
                  affiliate?.noteAcceptJob! === "" ? (
                    ""
                  ) : (
                    <div className="alert alert-warning" role="alert">
                      <b>{affiliate?.noteAcceptJob!}</b>
                    </div>
                  )}
                </div>
              </SimpleBar>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        className="fade zoomIn"
        size="lg"
        show={modal_AddAffiliateToWhiteList}
        onHide={() => {
          tog_AddAffiliateToWhiteList();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Add Affiliate
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Card>
            <Card.Header>
              <Form
                className="tablelist-form"
                onSubmit={onSubmitAddAffiliateToWhiteList}
              >
                <Row>
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
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-ghost-danger"
                        data-bs-dismiss="modal"
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        id="add-btn"
                        type="submit"
                        onClick={() => tog_AddAffiliateToWhiteList()}
                      >
                        Add
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Header>
          </Card>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default CurrentTable;
