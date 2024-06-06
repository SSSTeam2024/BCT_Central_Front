import React, {useEffect, useRef, useState } from "react";
import { Form, Row, Card, Col, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddNewLocationMutation,
  useDeleteLocationMutation,
  useGetAllLocationsQuery,
} from "features/Location/locationSlice";
// import { GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import Map from './Map/';
import {loadMapApi} from "../../helpers/GoogleMapsUtils";

// const LoadingContainer = () => <div>Loading...</div>;
const LocationSettings = () => {
  const { data: AllLocations = [] } = useGetAllLocationsQuery();
  const [lt, setLat] = useState<number>(0);
  const [lg, setLng] = useState<number>(0);
  const [pN, setPlaceName] = useState<string>("");

  const notifySuccess = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Location is created successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyError = (err: any) => {
    Swal.fire({
      position: "top-right",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [deleteLocation] = useDeleteLocationMutation();

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
          deleteLocation(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Location is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Location is safe :)",
            "info"
          );
        }
      });
  };

  const [createLocation] = useAddNewLocationMutation();

  const initialLocation = {
    start_point: {
      placeName: "",
      coordinates: {
        lat: 1,
        lon: 1,
      },
      postalCode: ""
    },
  };

  const [location, setLocation] = useState(initialLocation);

  const { start_point } = location;

  const onSubmitLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      location["start_point"].coordinates.lat = Number(localStorage.getItem("lt"))
      location["start_point"].coordinates.lon = Number(localStorage.getItem("lg"))
      location["start_point"].placeName = localStorage?.getItem("pn")!
      location["start_point"].postalCode = localStorage?.getItem("pc")!
      createLocation(location)
        .then(() => notifySuccess())
        .then(() => setLocation(initialLocation))
        .then(() => localStorage.clear())
    } catch (error) {
      notifyError(error);
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Location Name</span>,
      selector: (row: any) => row.start_point.placeName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(row._id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const [modal_AddLocation, setmodal_AddLocation] = useState<boolean>(false);
  function tog_AddLocation() {
    setmodal_AddLocation(!modal_AddLocation);
  }
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [distanceInKm, setDistanceInKm] = useState<number>(-1);

  useEffect(() => {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener('load', function () {
          setScriptLoaded(true);
      });
  }, []);

  const renderDistanceSentence = () => {
      return (
          <div className='distance-info'>
              {`Distance between selected marker and home address is ${distanceInKm}km.`}
          </div>
      );
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
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => tog_AddLocation()}
                  >
                    <i className="ri-map-pin-line align-middle"></i>{" "}
                    <span>Add New Location</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable columns={columns} data={AllLocations} pagination />
          </Card.Body>
        </Card>
      </Col>
      <Modal
        className="fade zoomIn"
        size="xl"
        show={modal_AddLocation}
        onHide={() => {
          tog_AddLocation();
        }}
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            New Location
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <Form className="tablelist-form" onSubmit={onSubmitLocation}>
            <input type="hidden" id="id-field" />
            <Row>
              <Col lg={12} className="mb-3">
                {/* <div
                  id="gmaps-types"
                  className="gmaps"
                  style={{ position: "relative" }}
                  ref={ref as any}
                >
                  <Map
                    google={map}
                    // zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    // initialCenter={{ lat: 52.5244734, lng: -1.9857876 }}
                  >
                  </Map>
                </div> */}
               {scriptLoaded && (
                <Map
                  mapType={google.maps.MapTypeId.ROADMAP}
                  mapTypeControl={true}
                  setDistanceInKm={setDistanceInKm}
                />
            )}
            {distanceInKm > -1 && renderDistanceSentence()}
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddLocation();
                      setLocation(initialLocation);
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    id="add-btn"
                    type="submit"
                    onClick={() => {
                      tog_AddLocation();
                    }}
                  >
                    Add
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default LocationSettings;
