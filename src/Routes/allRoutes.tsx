import { Navigate } from "react-router-dom";

import Dashboard from "pages/Dashboard";

import UserProfile from "pages/Authentication/user-profile";

//? Administration
import Driver from "pages/Administration/Driver";
import Team from "pages/Administration/Team";
import Vehicles from "pages/Administration/Vehicles";

//? Vehicles
import AddNewVehicle from "pages/Administration/Vehicles/AddNewVehicle";

//? Notes
import Notes from "pages/Notes";
import AddNewDriver from "pages/Administration/Driver/AddNewDriver";
import AddNewTeam from "pages/Administration/Team/AddNewTeam";
import Companies from "pages/Corporate/Companies";
import AddNewCompany from "pages/Corporate/Companies/AddNewCompany";
import Schools from "pages/Corporate/Schools";
import AddNewSchool from "pages/Corporate/Schools/AddNewSchool";
import Subcontractors from "pages/Corporate/Subcontractor";
import AddNewSubcontractor from "pages/Corporate/Subcontractor/AddNewSubcontractor";
import NewApplications from "pages/Corporate/Subcontractor/NewApplications";
import EmailTemplates from "pages/EmailTemplate";
import Feedback from "pages/Feedback&Claims/Feedback";
import Claims from "pages/Feedback&Claims/Claims";
import ReportingManagement from "pages/ReportingManagement";
import Maptracking from "pages/Tracking/MapTracking";
import Delayschanges from "pages/Tracking/Delayschanges";
import Newquote from "pages/Visitorsquote/Newquote";
import Quotesrequest from "pages/Visitorsquote/Quotesrequest";
import Listingmanagement from "pages/Visitorsquote/Listingmanagement";
import Current from "pages/Visitorsquote/Pushjobs/Current";
import History from "pages/Visitorsquote/Pushjobs/History";
import Management from "pages/CorporateTransport/Management";
import NewContract from "pages/CorporateTransport/NewContract";
import Scheduling from "pages/CorporateTransport/Programming/Scheduling";
import Offers from "pages/CorporateTransport/Programming/Offers";
import Stations from "pages/CorporateTransport/Programming/Stations";
import TripModels from "pages/CorporateTransport/Programming/TripModels";
import TeamDetails from "pages/Administration/Team/TeamDetails";
import DriverDetails from "pages/Administration/Driver/DriverDetails";
import CompanyDetails from "pages/Corporate/Companies/CompanyDetails";
import SchoolDetails from "pages/Corporate/Schools/SchoolDetails";
import SubcontractorDetails from "pages/Corporate/Subcontractor/SubcontractorDetails";
import VehicleDetails from "pages/Administration/Vehicles/VehicleDetails";
import LatestQuotes from "pages/LatestQuotes";
import PendingQuotes from "pages/PendingQuotes";
import Bookings from "pages/Bookings";
import CompletedJobs from "pages/CompletedJobs";
import DeletedJobs from "pages/DeletedJobs";
import Callbacks from "pages/Callbacks";
import JobShare from "pages/JobShare";
import PartialQuotes from "pages/PartialQuotes";
import JobsTemplates from "pages/JobsTemplates";
import AddNewContract from "pages/CorporateTransport/NewContract/AddNewContract";
import Outstanding from "pages/Outstanding";
import AgedDebtors from "pages/AgedDebtors";
import Payments from "pages/Payments/index";
import Invoices from "pages/Invoices";
import AddNewOffer from "pages/CorporateTransport/Programming/Offers/AddNewOffer";
import OfferDetails from "pages/CorporateTransport/Programming/Offers/OfferDetails";
import AddNewTripModel from "pages/CorporateTransport/Programming/TripModels/AddNewTripModel";
import TripModelDetails from "pages/CorporateTransport/Programming/TripModels/TripModelDetails";
import SiteSettings from "pages/Settings";
import RequestFeature from "pages/Help/RequestFeature";
import ReportError from "pages/Help/ReportError";
import UserManual from "pages/Help/UserManual";
import DefectsManagement from "pages/Administration/Vehicles/DefectsManagement";
import EditSchool from "pages/Corporate/Schools/EditSchools";
import EditCompany from "pages/Corporate/Companies/EditCompany";
import EditAffiliate from "pages/Corporate/Subcontractor/EditAffiliate";
import EditVehicle from "pages/Administration/Vehicles/EditVehicle";
import Programs from "pages/Programs";
import ProgramList from "pages/Programs/index";
import ProgramClone from "pages/Programs/ProgramClone";
import ProgramDetails from "pages/Programs/ProgramDetails";
import EditProgram from "pages/Programs/ProgramEdit";
import ReallyNewQuote from "pages/Visitorsquote/ReallyNewQuote";
import NewQuoteBook from "pages/Visitorsquote/NewQuoteBook";
import AddProgramm from "pages/Programs/AddProgramm";
import Login from "pages/Authentication/Login";
import ContractDetails from "pages/CorporateTransport/NewContract/ContractDetails";
import AffilaiteDetails from "pages/Corporate/Subcontractor/AffiliateDetails";
import NewEmail from "pages/Messages/NewEmail";
import EmailsSent from "pages/Messages/EmailsSent";
import CancelledJobs from "pages/CancelledJobs";
import Test from "pages/Test";
import AddNewDefect from "pages/Administration/Vehicles/AddNewDefect";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/request-feature", component: <RequestFeature /> },
  { path: "/report-error", component: <ReportError /> },
  { path: "/user-manual", component: <UserManual /> },
  { path: "/defects-management", component: <DefectsManagement /> },
  { path: "/new-vehicle-defect", component: <AddNewDefect /> },
  { path: "/contract/:name", component: <ContractDetails /> },

  //? Tracking
  { path: "/map-tracking", component: <Maptracking /> },
  { path: "/delays&changes", component: <Delayschanges /> },
  { path: "/cancelled-jobs", component: <CancelledJobs /> },
  { path: "/site-settings", component: <SiteSettings /> },

  { path: "/new-suggested-route", component: <AddProgramm /> },
  { path: "/list-of-program", component: <ProgramList /> },
  { path: "/program/:name", component: <ProgramClone /> },
  { path: "/program-details/:name", component: <ProgramDetails /> },
  { path: "/edit-program/:name", component: <EditProgram /> },

  { path: "/edit-vehicle/:name", component: <EditVehicle /> },

  //? Visitors Quote
  { path: "/new-quote/:name", component: <Newquote /> },
  { path: "/new-quote", component: <ReallyNewQuote /> },
  { path: "/assign-quote/:name", component: <NewQuoteBook /> },
  { path: "/quote-request", component: <Quotesrequest /> },
  { path: "/all-quotes", component: <Listingmanagement /> },
  { path: "/deleted-jobs", component: <DeletedJobs /> },
  //? Visitors Quote ==> Push Jobs
  { path: "/current-push-jobs", component: <Current /> },
  { path: "/history-push-job", component: <History /> },

  { path: "/outstanding", component: <Outstanding /> },
  { path: "/aged-debtors", component: <AgedDebtors /> },
  { path: "/payments", component: <Payments /> },
  { path: "/invoices", component: <Invoices /> },
  //? Corporate Transport
  { path: "/list-corporate-transport", component: <Management /> },
  { path: "/contract", component: <NewContract /> },
  { path: "/new-contract", component: <AddNewContract /> },
  //? Corporate Transport ==> Programming
  { path: "/scheduling", component: <Scheduling /> },
  { path: "/offers", component: <Offers /> },
  { path: "/stations", component: <Stations /> },
  { path: "/trip-models", component: <TripModels /> },
  { path: "/new-trip-model", component: <AddNewTripModel /> },
  { path: "/trip-model-details/:name", component: <TripModelDetails /> },

  { path: "/new-offer", component: <AddNewOffer /> },
  { path: "/offer-details/:name", component: <OfferDetails /> },
  { path: "/edit-offer/:name", component: <AddNewOffer /> },

  //? Corporate
  { path: "/schools", component: <Schools /> },
  { path: "/edit-school/:name", component: <EditSchool /> },
  { path: "/companies", component: <Companies /> },
  { path: "/edit-company/:name", component: <EditCompany /> },
  //? Corporate ==> Sub-Contractor
  { path: "/new-applications", component: <NewApplications /> },
  { path: "/all-sub-contractors", component: <Subcontractors /> },
  { path: "/edit-affiliate/:name", component: <EditAffiliate /> },

  //? Companies
  { path: "/new-company", component: <AddNewCompany /> },
  { path: "/company-details/:name", component: <CompanyDetails /> },
  //? Schools
  { path: "/new-school", component: <AddNewSchool /> },
  { path: "/school-details/:name", component: <SchoolDetails /> },
  //? Sub-Contractor
  {
    path: "/corporate/subcontractors/new-subcontractor",
    component: <AddNewSubcontractor />,
  },
  { path: "/subcontractor-details/:name", component: <SubcontractorDetails /> },
  { path: "/latest-quotes", component: <LatestQuotes /> },
  { path: "/pending-quotes", component: <PendingQuotes /> },
  { path: "/bookings", component: <Bookings /> },
  { path: "/completed-jobs", component: <CompletedJobs /> },
  { path: "/callbacks", component: <Callbacks /> },
  { path: "/job-share", component: <JobShare /> },
  { path: "/partial-quotes", component: <PartialQuotes /> },
  { path: "/job-template", component: <JobsTemplates /> },

  //? Feedback & Claims
  { path: "/feedback", component: <Feedback /> },
  { path: "/claims", component: <Claims /> },

  //? Reporting Management
  { path: "/reporting-management", component: <ReportingManagement /> },

  //? Email Templates
  { path: "/email-templates", component: <EmailTemplates /> },

  //? Administration
  { path: "/team", component: <Team /> },
  { path: "/team-details/:fullName", component: <TeamDetails /> },
  { path: "/driver", component: <Driver /> },
  { path: "/driver-details/:fullName", component: <DriverDetails /> },
  { path: "/vehicles", component: <Vehicles /> },
  { path: "/vehicle-details/:name", component: <VehicleDetails /> },

  { path: "/affilaite_details", component: <AffilaiteDetails /> },

  //? Vehicles
  {
    path: "/new-vehicle",
    component: <AddNewVehicle />,
  },

  //? Driver
  { path: "/new-driver", component: <AddNewDriver /> },

  //? Team
  { path: "/new-team", component: <AddNewTeam /> },

  //? Notes
  { path: "/notes", component: <Notes /> },

  {
    path: "/new-email",
    component: <NewEmail />,
  },
  {
    path: "/emails-sent",
    component: <EmailsSent />,
  },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
  { path: "*", component: <Navigate to="/dashboard" /> },
  { path: "/user-profile", component: <UserProfile /> },
];

const publicRoutes = [
  // AuthenticationInner
  { path: "/login", component: <Login /> },
  // { path: "/test", component: <Test /> },
  // { path: "/auth-pass-reset-basic", component: <PasswordReset /> },
  // { path: "/auth-pass-change-basic", component: <PasswordCreate /> },
  // { path: "/auth-success-msg-basic", component: <SuccessMessage /> },
  // { path: "/auth-twostep-basic", component: <TwoStepVerify /> },
  // { path: "/auth-logout-basic", component: <BasicLogout /> },
  // { path: "/auth-404", component: <Error404 /> },
  // { path: "/auth-500", component: <Error500 /> },
];

// export { authProtectedRoutes, publicRoutes };
export { authProtectedRoutes, publicRoutes };
