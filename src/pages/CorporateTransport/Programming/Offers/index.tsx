import React, { useState } from "react";
import { Container, Row, Card, Col, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteOfferMutation,
  useGetAllOffersQuery,
} from "features/offers/offerSlice";
import Swal from "sweetalert2";

const Offers = () => {
  document.title = "Offers | Coach Hire Network";

  const navigate = useNavigate();
  const { data: allOffers = [] } = useGetAllOffersQuery();
  const [deleteOffer] = useDeleteOfferMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoorporate, setSelectedCoorporate] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event: any) => {
    setSelectedCoorporate(event.target.value);
  };

  function tog_AddOffer() {
    navigate("/new-offer");
  }

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
          deleteOffer(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Offer is deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Canceled", "Offer is safe :)", "info");
        }
      });
  };

  const getFilteredOffers = () => {
    let filteredOffers = allOffers;

    if (searchTerm) {
      filteredOffers = filteredOffers.filter(
        (offer: any) =>
          (offer?.name &&
            offer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (offer?.contract_id?.contractName! &&
            offer?.contract_id
              ?.contractName!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (offer?.vehicle_id?.registration_number! &&
            offer?.vehicle_id
              ?.registration_number!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (offer?.driver_id?.firstname! &&
            offer?.driver_id
              ?.firstname!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (offer?.driver_id?.surname! &&
            offer?.driver_id
              ?.surname!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (offer?.pick_up! &&
            offer?.pick_up!.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (offer?.destination! &&
            offer
              ?.destination!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (offer?.offer_number! &&
            offer
              ?.offer_number!.toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (offer?.cost! &&
            offer?.cost!.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCoorporate && selectedCoorporate !== "") {
      if (selectedCoorporate === "Companies") {
        filteredOffers = filteredOffers.filter(
          (claim: any) => claim.company_id !== null
        );
      }
      if (selectedCoorporate === "Schools") {
        filteredOffers = filteredOffers.filter(
          (claim: any) => claim.school_id !== null
        );
      }
    }
    return filteredOffers;
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Corporate</span>,
      selector: (row: any) =>
        row?.company_id! === null ? (
          <span>{row?.school_id?.name!}</span>
        ) : (
          <span>{row?.company_id?.name!}</span>
        ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Contact</span>,
      selector: (row: any) => row?.contract_id?.contractName!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle</span>,
      selector: (row: any) => row.vehicle_id.registration_number,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Driver</span>,
      selector: (row: any) => (
        <span>
          {row.driver_id?.firstname!} {row.driver_id?.surname!}
        </span>
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pickup</span>,
      sortable: true,
      selector: (row: any) => row.pick_up,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      sortable: true,
      selector: (row: any) => row.destination,
    },
    {
      name: <span className="font-weight-bold fs-13">Cost</span>,
      sortable: true,
      selector: (row: any) => <span>£ {row.cost}</span>,
    },
    {
      name: <span className="font-weight-bold fs-13">Offer Number</span>,
      sortable: true,
      selector: (row: any) => row.offer_number,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to={`/offer-details/${cell.name}`}
                className="badge badge-soft-primary edit-item-btn"
                state={cell}
              >
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to={`/edit-offer/${cell.name}`}
                className="badge badge-soft-success edit-item-btn"
                state={cell}
              >
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(cell._id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Offers" pageTitle="Suggested Routes" />
          <Card>
            <Card.Header className="border-bottom-dashed">
              <Row className="g-3">
                <Col lg={4}>
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
                <Col lg={3}>
                  <select
                    className="form-select text-muted"
                    onChange={handleSelectChange}
                  >
                    <option value="">Coorporate</option>
                    <option value="Companies">Companies</option>
                    <option value="Schools">Schools</option>
                  </select>
                </Col>
                <Col className="col-xxl-auto col-sm-auto ms-auto">
                  <Button
                    variant="success"
                    onClick={() => tog_AddOffer()}
                    className="add-btn btn-sm"
                  >
                    <i className="mdi mdi-bullhorn me-1 align-middle fs-22"></i>{" "}
                    Add Offer
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={columns}
                data={getFilteredOffers()}
                pagination
              />
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Offers;
