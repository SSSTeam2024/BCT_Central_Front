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
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Quote,
  useAddAffilaiteToQuoteMutation,
  useAddDriverToQuoteMutation,
  useAssignDriverAndVehicleToQuoteMutation,
  useDeleteQuoteMutation,
  useGetAllQuoteQuery,
  useUpdateProgressMutation,
  useUpdateStatusQuoteToCancelMutation,
} from "features/Quotes/quoteSlice";
import ModalAssignVehicle from "./ModalAssignVehicle";
import Swal from "sweetalert2";
import {
  useGetAllDriverQuery,
  useGetDriverByIDQuery,
} from "features/Driver/driverSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";
import { useGetAllAffiliatesQuery } from "features/Affiliate/affiliateSlice";

import Select from "react-select";

interface Column {
  name: JSX.Element;
  selector: (cell: Quote | any) => JSX.Element | any;
  sortable: boolean;
  width?: string;
}

const Bookings = () => {
  document.title = "Bookings | Bouden Coach Travel";
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

  const [modal_AssignDriver, setModal_AssignDriver] = useState<boolean>(false);
  const [modal_PushJob, setModal_PushJob] = useState<boolean>(false);
  function tog_PushJob() {
    setModal_PushJob(!modal_PushJob);
  }
  const [modal_AssignVehicle, setModal_AssignVehicle] =
    useState<boolean>(false);
  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const result = AllQuotes.filter(
    (bookings) =>
      bookings.progress !== "New" &&
      bookings.progress !== "Completed" &&
      bookings.progress !== "Cancel" &&
      bookings?.type! === "One way" &&
      bookings?.progress! !== "Deleted"
  );

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const handleChange = ({ selectedRows }: { selectedRows: Quote }) => {
    setIsChecked(!isChecked);
    setSelectedRow(selectedRows);
  };
  const [modal_DriverVehicleAssign, setmodal_DriverVehicleAssign] =
    useState<boolean>(false);
  function tog_DriverVehicleAssign() {
    setmodal_DriverVehicleAssign(!modal_DriverVehicleAssign);
  }
  const [modal_UpdateQuote, setmodal_UpdateQuote] = useState<boolean>(false);
  const tog_ModalUpdateQuote = () => {
    setmodal_UpdateQuote(!modal_UpdateQuote);
  };
  const locationQuote = useLocation();
  const navigate = useNavigate();
  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  let filterdDrivers = AllDrivers.filter(
    (driver) => driver.driverStatus === "Active"
  );

  const notifySuccessAssignDriver = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Assign Driver Done successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifySuccessAssignVehicleAndDrvier = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Assign Vehicle & Driver Done successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifySuccessCancel = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Job Cancelled Done successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifySuccessPushToAffiliate = () => {
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

  const [selectVehicle, setSelectedVehicle] = useState<string>("");
  // This function is triggered when the select Vehicle
  const handleSelectVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedVehicle(value);
  };

  const [updateQuoteProgress] = useUpdateProgressMutation();

  let { data: oneDriver } = useGetDriverByIDQuery(selectVehicle);

  const [assignDriverToQuoteMutation] = useAddDriverToQuoteMutation();

  const initialAssignDriverToQuote = {
    quote_id: "",
    id_driver: "",
  };

  const [assignDriverToDriver, setAssignDriverToQuote] = useState(
    initialAssignDriverToQuote
  );

  const { quote_id, id_driver } = assignDriverToDriver;

  const onChangeAssignDriverToQuote = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAssignDriverToQuote((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitAssignDriverToQuote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      assignDriverToDriver["quote_id"] = locationQuote.state?._id!;
      assignDriverToDriver["id_driver"] = selectVehicle;
      assignDriverToQuoteMutation(assignDriverToDriver)
        .then(() => navigate("/bookings"))
        .then(() => notifySuccessAssignDriver());
    } catch (error) {
      notifyError(error);
    }
  };

  const openModalAssignDriver = () => {
    setModal_AssignDriver(!modal_AssignDriver);
  };

  const openModalAssignVehicle = () => {
    setModal_AssignVehicle(!modal_AssignVehicle);
  };

  const [selectedColumnOption, setSelectedColumnOption] = useState("");

  const handleChangeColumnOption = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedColumnOption(e.target.value);
  };

  const columns: Column[] = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (cell: Quote) => {
        return (
          <span>
            <Link to={`/assign-quote/${cell?._id!}`} state={cell}>
              <span className="text-info">
                <u>{cell?.quote_ref!}</u>
              </span>
            </Link>{" "}
          </span>
        );
      },
      sortable: true,
      width: "200px",
    },
    {
      name: (
        <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>
      ),
      selector: (row: any) =>
        row?.id_driver?.firstname! === undefined ? (
          <Link to="#" onClick={() => openModalAssignDriver()} state={row}>
            No Driver
          </Link>
        ) : (
          <span>
            {row?.id_driver?.firstname!} {row?.id_driver?.surname!}
          </span>
        ),
      sortable: true,
      width: "170px",
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle Type</span>,
      selector: (row: any) => row?.vehicle_type!,
      sortable: true,
      width: "160px",
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) =>
        row.id_vehicle?.registration_number! === undefined ? (
          <Link to="#" onClick={() => openModalAssignVehicle()} state={row}>
            No Vehicle
          </Link>
        ) : (
          <span>{row.id_vehicle?.registration_number!}</span>
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
      name: <span className="font-weight-bold fs-13">Group</span>,
      selector: (row: any) =>
        row.id_group_employee === null && row.id_group_student === null ? (
          <span className="text-danger">No Group</span>
        ) : row.school_id === null ? (
          row?.id_group_employee?.groupName!
        ) : (
          row?.id_group_student?.groupName!
        ),
      sortable: true,
      width: "240px",
    },
    {
      name: <span className="font-weight-bold fs-13">Pick Up</span>,
      selector: (row: any) => row.start_point?.placeName!,
      sortable: true,
      width: "140px",
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      sortable: true,
      selector: (row: any) => row.destination_point?.placeName!,
      width: "140px",
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
            return <span className="badge bg-danger"> {cell.progress} </span>;
          default:
            return <span className="badge bg-info"> {cell.progress} </span>;
        }
      },
      sortable: true,
      width: "100px",
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.status) {
          case "Booked":
            return <span className="badge bg-warning"> {cell.status} </span>;
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
      width: "130px",
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      sortable: true,
      selector: (row: any) =>
        row.category === "Regular" ? (
          <span>
            £ <b>{row?.manual_cost!}</b>
          </span>
        ) : (
          <span>
            £ <b>{row?.total_price!}</b>
          </span>
        ),
      width: "90px",
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
      name: <span className="font-weight-bold fs-13">Balance</span>,
      sortable: true,
      selector: (row: any) => "No Balance",
    },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      sortable: true,
      selector: (row: Quote) => {
        const date = new Date(row.createdAt);
        return <span>{date.toDateString()}</span>;
      },
      // width: "125px",
    },
    {
      name: <span className="font-weight-bold fs-13">Affiliate</span>,
      sortable: true,
      selector: (row: any) => "No Affiliate",
    },
    {
      name: <span className="font-weight-bold fs-13">Callback</span>,
      sortable: true,
      selector: (row: any) => "No CallBack",
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
    {
      name: <span className="font-weight-bold fs-13">Notes</span>,
      sortable: true,
      selector: (row: any) => {
        return row?.id_visitor?.notes! !== ""
          ? row?.id_visitor?.notes!
          : "No Notes";
      },
    },
  ];

  const optionColumnsTable = [
    { value: "Quote ID", label: "Quote ID" },
    { value: "Vehicle Type", label: "Vehicle Type" },
    { value: "Date", label: "Date" },
    { value: "Pax", label: "Pax" },
    { value: "Group", label: "Group" },
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

  const [isPrivateHiredChecked, setIsPrivateHiredChecked] = useState(false);
  const handlePrivateHiredCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPrivateHiredChecked(event.target.checked);
  };

  const [isContractChecked, setIsContractChecked] = useState(false);
  const handleContractCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsContractChecked(event.target.checked);
  };

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

  // The selected Reglement
  const [selectedCancelCause, setSelectedCancelCause] = useState<string>("");

  // This function will be triggered when a radio button is selected
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCancelCause(event.target.value);
  };

  const [
    selectVehicleWhenAssignDriverAndVehicle,
    setSelectedVehicleWhenAssignDriverAndVehicle,
  ] = useState<string>("");
  // This function is triggered when the select Vehicle
  const handleSelectVehicleWhenAssignDriverAndVehicle = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleWhenAssignDriverAndVehicle(value);
  };

  const [
    selectDriverWhenAssignDriverAndVehicle,
    setSelectedDriverWhenAssignDriverAndVehicle,
  ] = useState<string>("");
  // This function is triggered when the select Driver
  const handleSelectDriverWhenAssignDriverAndVehicle = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedDriverWhenAssignDriverAndVehicle(value);
  };

  const [assignDriverAndVehicleToQuoteMutation] =
    useAssignDriverAndVehicleToQuoteMutation();

  const initialAssginDriverAndVehicleToQuote = {
    quote_ID: "",
    vehicle_ID: "",
    driver_ID: "",
  };

  const [
    assignDriverAndVehicleToQuoteState,
    setAssignDriverAndVehicleToQuoteState,
  ] = useState(initialAssginDriverAndVehicleToQuote);

  const { quote_ID, vehicle_ID, driver_ID } =
    assignDriverAndVehicleToQuoteState;

  const onSubmitAssignDriverAndVehicleToQuote = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      assignDriverAndVehicleToQuoteState["quote_ID"] = selectedRow[0]._id;
      assignDriverAndVehicleToQuoteState["vehicle_ID"] =
        selectVehicleWhenAssignDriverAndVehicle;
      assignDriverAndVehicleToQuoteState["driver_ID"] =
        selectDriverWhenAssignDriverAndVehicle;
      assignDriverAndVehicleToQuoteMutation(assignDriverAndVehicleToQuoteState)
        .then(() => navigate("/bookings"))
        .then(() => notifySuccessAssignVehicleAndDrvier())
        .then(() => setIsChecked(!isChecked));
    } catch (error) {
      notifyError(error);
    }
  };

  const [updateStatusQuoteToCancelMutation] =
    useUpdateStatusQuoteToCancelMutation();

  const initialUpdateStatusQuoteToCancel = {
    quoteId: "",
    status: "",
  };

  const [updateStatusToCancel, setUpdateStatusToCancel] = useState(
    initialUpdateStatusQuoteToCancel
  );

  const { quoteId, status } = updateStatusToCancel;

  const onChangeStatusToCancel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateStatusToCancel((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitUpdateStatusToCancel = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      updateStatusToCancel["quoteId"] = selectedRow[0]._id;
      updateStatusToCancel["status"] = selectedCancelCause;
      updateStatusQuoteToCancelMutation(updateStatusToCancel)
        .then(() => navigate("/bookings"))
        .then(() => notifySuccessCancel());
    } catch (error) {
      notifyError(error);
    }
  };

  const activeDrivers = AllDrivers.filter(
    (drivers) => drivers.driverStatus === "Active"
  );

  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();
  const activeVehicles = AllVehicles.filter(
    (vehicles) => vehicles.statusVehicle === "Active"
  );

  const { data: AllAffiliates = [] } = useGetAllAffiliatesQuery();
  const completeAffiliate = AllAffiliates.filter(
    (affiliates) => affiliates.statusAffiliate === "Accepted"
  );
  const options = completeAffiliate.map((affiliate) => ({
    value: affiliate?._id!,
    label: affiliate.name,
  }));

  // State to store the selected options
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Event handler to handle changes in selected options
  const handleSelectChange = (selectedOption: any) => {
    setSelectedOptions(selectedOption);
  };
  // console.log("selectedOptions", selectedOptions);
  const [selectAffiliate, setSelectedAffiliate] = useState<string>("");
  // This function is triggered when the select Affiliate
  const handleSelectAffiliate = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedAffiliate(value);
  };

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

  const date = new Date();

  const [assignAffiliateToQuote] = useAddAffilaiteToQuoteMutation();

  const initialPushJob = {
    idQuote: "",
    white_list: [""],
    pushedDate: "",
    pushed_price: "",
  };

  const [assignAffiliateToQuoteStatus, setAffiliateToQuoteStatus] =
    useState(initialPushJob);

  const { idQuote, white_list, pushedDate, pushed_price } =
    assignAffiliateToQuoteStatus;

  const onChangeAssignAffiliate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAffiliateToQuoteStatus((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitAssignAffiliate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      assignAffiliateToQuoteStatus["idQuote"] = selectedRow[0]._id;
      assignAffiliateToQuoteStatus["white_list"] = selectedValues;
      assignAffiliateToQuoteStatus["pushedDate"] = date.toDateString();
      assignAffiliateToQuote(assignAffiliateToQuoteStatus)
        .then(() => navigate("/current-push-jobs"))
        .then(() => notifySuccessPushToAffiliate());
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

  const [selectedPayment, setSelectedPayment] = useState<string>("");
  // This function is triggered when the select Payment
  const handleSelectPayment = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPayment(value);
  };

  const [selectedProgress, setSelectedProgress] = useState<string>("");
  // This function is triggered when the select Progress
  const handleSelectProgress = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedProgress(value);
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
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Bookings" pageTitle="Jobs" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-lg-1 g-3">
                  <Col lg={3}>
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
                      name="Period"
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
                      name="Payment"
                      id="idPayment"
                      onChange={handleSelectPayment}
                    >
                      <option value="all">All Payment</option>
                      <option value="Part Paid">Part Paid</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </Col>
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="Progress"
                      id="idProgress"
                      onChange={handleSelectProgress}
                    >
                      <option value="all">All Progress</option>
                      <option value="Accepted">Accepted</option>
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
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox2"
                      >
                        Contract
                      </label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <Row>
                  <Col lg={9} className="d-flex justify-content-start">
                    {isChecked ? (
                      <ul className="hstack gap-2 list-unstyled mb-0">
                        <li>
                          <Link
                            to="#"
                            className="badge badge-soft-info remove-item-btn fs-16"
                            state={selectedRow}
                            onClick={() => tog_DriverVehicleAssign()}
                          >
                            <i className="bi bi-plus-square-dotted fs-18"></i>{" "}
                            Assign Vehicle/Driver
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="badge badge-soft-secondary remove-item-btn fs-16"
                            state={selectedRow}
                            onClick={() => tog_PushJob()}
                          >
                            <i className="bi bi-send-check fs-18"></i> Push Job
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="badge badge-soft-dark edit-item-btn fs-16"
                            state={selectedRow}
                            onClick={() => tog_ModalUpdateQuote()}
                          >
                            <i className="bi bi-x-square fs-18"></i> Cancel Job
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="badge badge-soft-danger edit-item-btn fs-16"
                            onClick={() => AlertDelete()}
                          >
                            <i className="bi bi-trash2 fs-18"></i> Delete Job
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col lg={3} className="d-flex justify-content-end">
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
                  {/* <Col lg={2} className="d-flex justify-content-end">
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
                  </Col> */}
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
          {/* Modal To Assign Driver */}
          <Modal
            className="fade zoomIn"
            size="lg"
            show={modal_AssignDriver}
            onHide={() => {
              openModalAssignDriver();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Assign Driver
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <Card>
                <Card.Header>
                  <div className="d-flex align-items-center p-1">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title rounded-circle bg-light text-primary fs-24">
                          <i className="mdi mdi-account-tie-hat"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="mb-1">Choose Driver</h4>
                    </div>
                  </div>
                  <Form
                    className="tablelist-form"
                    onSubmit={onSubmitAssignDriverToQuote}
                  >
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <select
                            className="form-select text-muted"
                            name="vehicle_type"
                            id="vehicle_type"
                            onChange={handleSelectVehicle}
                          >
                            <option value="">Select</option>
                            {filterdDrivers.map((driver) => (
                              <option
                                value={`${driver._id}`}
                                key={driver?._id!}
                              >
                                {driver.firstname} {driver.surname}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      {selectVehicle && (
                        <Row className="mb-2">
                          <Col lg={6}>
                            <div>
                              <Form.Label>Driver Name</Form.Label>
                              <Form.Control
                                type="text"
                                readOnly
                                defaultValue={oneDriver?.firstname!}
                              />
                            </div>
                            <div className="mt-2">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                type="text"
                                readOnly
                                defaultValue={oneDriver?.phonenumber!}
                              />
                            </div>
                            <div className="mt-2">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="text"
                                readOnly
                                defaultValue={oneDriver?.email!}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Form.Label>Driving License Expiry</Form.Label>
                              <Form.Control
                                type="text"
                                className="text-danger"
                                readOnly
                                defaultValue={
                                  oneDriver?.driving_license_expiry!
                                }
                              />
                            </div>
                            <div className="mt-2">
                              <Form.Label>DQC Expiry</Form.Label>
                              <Form.Control
                                type="text"
                                className="text-danger"
                                readOnly
                                defaultValue={oneDriver?.dqc_expiry!}
                              />
                            </div>
                            <div className="mt-2">
                              <Form.Label>PVC Expiry</Form.Label>
                              <Form.Control
                                className="text-danger"
                                type="text"
                                readOnly
                                defaultValue={oneDriver?.pvc_expiry!}
                              />
                            </div>
                          </Col>
                        </Row>
                      )}
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
                            onClick={() => openModalAssignDriver()}
                          >
                            Assign Driver
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Card.Header>
              </Card>
            </Modal.Body>
          </Modal>
          {/* Modal To Assign Vehicle */}
          <Modal
            className="fade zoomIn"
            size="lg"
            show={modal_AssignVehicle}
            onHide={() => {
              openModalAssignVehicle();
            }}
            centered
          >
            <Modal.Body className="p-4">
              <ModalAssignVehicle
                modal_AssignVehicle={modal_AssignVehicle}
                setModal_AssignVehicle={setModal_AssignVehicle}
              />
            </Modal.Body>
          </Modal>
          {/* Modal To Cancel Job */}
          <Modal
            className="fade zoomIn"
            size="lg"
            show={modal_UpdateQuote}
            onHide={() => {
              tog_ModalUpdateQuote();
            }}
            centered
          >
            <Modal.Body className="p-4">
              <Form
                className="tablelist-form"
                onSubmit={onSubmitUpdateStatusToCancel}
              >
                <Row>
                  <Col lg={12}>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onChange={radioHandler}
                        value="Canceled By Client"
                      />
                      <Form.Label
                        className="form-check-label fs-17"
                        htmlFor="flexRadioDefault1"
                      >
                        Canceled By Client
                      </Form.Label>
                    </div>
                  </Col>
                  {selectedCancelCause === "Canceled By Client" ? (
                    <div
                      className="alert alert-danger alert-modern alert-dismissible fade show"
                      role="alert"
                    >
                      <i className="ri-error-warning-line icons"></i> By
                      Choosing this option, the contract will be terminated at
                      the customer disire.
                    </div>
                  ) : (
                    ""
                  )}
                  <Col lg={12}>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="Canceled By Admin"
                        onChange={radioHandler}
                      />
                      <Form.Label
                        className="form-check-label fs-17"
                        htmlFor="flexRadioDefault1"
                      >
                        Canceled By Admin
                      </Form.Label>
                    </div>
                  </Col>
                  {selectedCancelCause === "Canceled By Admin" ? (
                    <div
                      className="alert alert-danger alert-modern alert-dismissible fade show"
                      role="alert"
                    >
                      <i className="ri-error-warning-line icons"></i> This
                      option means that <strong>You Will Cancel</strong> the
                      contract.
                    </div>
                  ) : (
                    ""
                  )}
                  <Col lg={12}>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="Called off By Client"
                        onChange={radioHandler}
                      />
                      <Form.Label
                        className="form-check-label fs-17"
                        htmlFor="flexRadioDefault1"
                      >
                        Called off By Client
                      </Form.Label>
                    </div>
                  </Col>
                  {selectedCancelCause === "Called off By Client" ? (
                    <div
                      className="alert alert-warning alert-modern alert-dismissible fade show"
                      role="alert"
                    >
                      <i className="ri-alert-line icons"></i> The selected
                      option will cancel jobs at the demand of the client
                    </div>
                  ) : (
                    ""
                  )}

                  <Col lg={12}>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="Called off By Admin"
                        onChange={radioHandler}
                      />
                      <Form.Label
                        className="form-check-label fs-17"
                        htmlFor="flexRadioDefault1"
                      >
                        Called off By Admin
                      </Form.Label>
                    </div>
                  </Col>
                  {selectedCancelCause === "Called off By Admin" ? (
                    <div
                      className="alert alert-warning alert-modern alert-dismissible fade show"
                      role="alert"
                    >
                      <i className="ri-alert-line icons"></i> These jobs will be
                      canceled due to You.
                    </div>
                  ) : (
                    ""
                  )}
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-soft-danger"
                        onClick={() => {
                          tog_ModalUpdateQuote();
                        }}
                        data-bs-dismiss="modal"
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Close
                      </Button>
                      <Button
                        className="btn-soft-info"
                        type="submit"
                        onClick={() => {
                          tog_ModalUpdateQuote();
                        }}
                      >
                        <i className="ri-send-plane-line align-bottom me-1"></i>{" "}
                        Send
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
          {/* Modal To Assign Driver & Vehicle */}
          <Modal
            className="fade zoomIn"
            size="lg"
            show={modal_DriverVehicleAssign}
            onHide={() => {
              tog_DriverVehicleAssign();
            }}
            centered
          >
            <Modal.Body className="p-4">
              <Form
                className="tablelist-form"
                onSubmit={onSubmitAssignDriverAndVehicleToQuote}
              >
                <Row>
                  <Col lg={3}>
                    <div className="mb-3">
                      <Form.Label htmlFor="vehicle_type">Driver</Form.Label>
                    </div>
                  </Col>
                  <Col lg={9}>
                    <div className="mb-3">
                      <select
                        className="form-select text-muted"
                        name="vehicle_type"
                        id="vehicle_type"
                        onChange={handleSelectDriverWhenAssignDriverAndVehicle}
                      >
                        <option value="">Select</option>
                        {activeDrivers.map((driver) => (
                          <option value={`${driver._id}`} key={`${driver._id}`}>
                            {driver.firstname} {driver.surname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <div className="mb-3">
                      <Form.Label htmlFor="vehicle_type">Vehicle</Form.Label>
                    </div>
                  </Col>
                  <Col lg={9}>
                    <div className="mb-3">
                      <select
                        className="form-select text-muted"
                        name="vehicle_type"
                        id="vehicle_type"
                        onChange={handleSelectVehicleWhenAssignDriverAndVehicle}
                      >
                        <option value="">Select</option>
                        {activeVehicles.map((vehicle) => (
                          <option
                            value={`${vehicle._id}`}
                            key={`${vehicle._id}`}
                          >
                            {vehicle.registration_number}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-soft-danger"
                        onClick={() => {
                          tog_DriverVehicleAssign();
                        }}
                        data-bs-dismiss="modal"
                      >
                        <i className="ri-close-fill align-bottom me-1"></i>{" "}
                        Close
                      </Button>
                      <Button
                        className="btn-soft-primary"
                        type="submit"
                        onClick={() => tog_DriverVehicleAssign()}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Assign
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
          {/* Modal To Push Job */}
          <Modal
            className="fade zoomIn"
            size="lg"
            show={modal_PushJob}
            onHide={() => {
              tog_PushJob();
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
              <Form
                className="tablelist-form"
                onSubmit={onSubmitAssignAffiliate}
              >
                <Row>
                  <Col lg={12} className="d-flex justify-content-center">
                    <div className="mb-3">
                      <Col lg={12}>
                        <Form.Label htmlFor="vehicle_type">
                          Affiliate
                        </Form.Label>
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
                <Row className="mb-2">
                  {/* <Col lg={6}>
                    <Form.Label>Suggested Price :</Form.Label>
                    <h5>£ {selectedRow[0]?._id!}</h5>
                  </Col> */}
                  <Col lg={6}>
                    <Form.Label htmlFor="pushed_price">
                      Pushed Price :
                    </Form.Label>
                    <Form.Control
                      className="text-mutated"
                      type="text"
                      id="pushed_price"
                      name="pushed_price"
                      value={assignAffiliateToQuoteStatus.pushed_price}
                      onChange={onChangeAssignAffiliate}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-soft-danger"
                        onClick={() => {
                          tog_PushJob();
                        }}
                        data-bs-dismiss="modal"
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Close
                      </Button>
                      <Button
                        className="btn-soft-info"
                        id="add-btn"
                        type="submit"
                      >
                        <i className="ri-send-plane-line align-bottom me-1"></i>{" "}
                        Push
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Bookings;
