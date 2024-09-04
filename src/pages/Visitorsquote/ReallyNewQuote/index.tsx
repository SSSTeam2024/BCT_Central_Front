import React, { useState, useRef } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import Flatpickr from "react-flatpickr";
import { numbersList } from "Common/data";
import { useGetAllPassengerAndLuggagesQuery } from "features/PassengerAndLuggageLimits/passengerAndLuggageSlice";
import { useGetAllJourneyQuery } from "features/Journeys/journeySlice";
import { useGetAllSourcesQuery } from "features/Sources/sourcesSlice";
import Swal from "sweetalert2";
import { useCreateNewQuoteMutation } from "features/Quotes/quoteSlice";
import { useAddNewVisitorMutation } from "features/Visitor/visitorSlice";

const ReallyNewQuote = () => {
  document.title = "Create New Quote | Bouden Coach Travel";

  const { data: AllPassengerLimit = [] } = useGetAllPassengerAndLuggagesQuery();
  const { data: AllJourneys = [] } = useGetAllJourneyQuery();
  const { data: AllSources = [] } = useGetAllSourcesQuery();

  const [createQuote] = useCreateNewQuoteMutation();
  const [createVisitor] = useAddNewVisitorMutation();

  const [selectedPax, setSelectedPax] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedLuggage, setSelectedLuggage] = useState("");
  const [selectedJourney, setSelectedJourney] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPickupTime, setSelectedPickupTime] = useState<Date | null>(
    null
  );
  const [selectedQuoteType, setSelectedQuoteType] = useState<string>("");
  const [selectedDropOffDate, setSelectedDropOffDate] = useState<Date | null>(
    null
  );
  const [selectedDropOffTime, setSelectedDropOffTime] = useState<Date | null>(
    null
  );
  const [distance_to_send, setDistance] = useState("");
  const [duration_to_send, setDuration] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [fatma, setFatma] = useState<any>();
  const [nom, setNom] = useState<any>();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [routeDirections, setRouteDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const originRef = useRef<any>(null);
  const destinationRef = useRef<any>(null);

  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API!,
    libraries: ["places"],
  });

  const initialQuote = {
    passengers_number: 0,
    journey_type: "",
    estimated_start_time: "",
    estimated_return_start_time: "",
    destination_point: {
      placeName: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    start_point: {
      placeName: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    quote_ref: "",
    vehicle_type: "",
    id_visitor: "",
    notes: "",
    luggage_details: "",
    manual_cost: "",
    status: "",
    progress: "",
    balance: "",
    deposit: "",
    total_price: "",
    deposit_percentage: "",
    automatic_cost: "",
    deposit_amount: "",
    category: "",
    pushed_price: "",
    date: "",
    dropoff_date: "",
    return_time: "",
    return_date: "",
    pickup_time: "",
    type: "",
    heard_of_us: "",
    duration: "",
    distance: "",
    dropoff_time: "",
  };

  const initialVisitor = {
    _id: "",
    email: "",
    name: "",
    estimated_start_time: "",
    estimated_return_start_time: "--",
    destination_point: {
      placeName: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    start_point: {
      placeName: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    phone: "",
    status: "",
    enquiryDate: "",
  };

  const [quote, setQuote] = useState(initialQuote);
  const [visitor, setVisitor] = useState(initialVisitor);

  const {
    passengers_number,
    journey_type,
    estimated_start_time,
    estimated_return_start_time,
    destination_point,
    start_point,
    quote_ref,
    vehicle_type,
    id_visitor,
    notes,
    luggage_details,
    manual_cost,
    status,
    progress,
    balance,
    deposit,
    total_price,
    deposit_percentage,
    automatic_cost,
    deposit_amount,
    category,
    pushed_price,
    date,
    dropoff_date,
    return_time,
    return_date,
    pickup_time,
    type,
    heard_of_us,
    duration,
    distance,
    dropoff_time,
  } = quote;

  if (!isLoaded) {
    return <p>Loading!!!!!</p>;
  }

  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }

  function onLoadDest(autocomplete: any) {
    setSearchDestination(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = (
        searchResult as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        const coordinates = { lat: location.lat(), lng: location.lng() };

        quote["start_point"]["placeName"] = name!;
        quote["start_point"]["coordinates"] = coordinates!;
        visitor["start_point"]["placeName"] = name!;
        visitor["start_point"]["coordinates"] = coordinates!;
        const status = place.business_status;
        const formattedAddress = place.formatted_address;
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  function onPlaceChangedDest() {
    if (searchDestination != null) {
      const place = (
        searchDestination as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        const coordinates = { lat: location.lat(), lng: location.lng() };

        quote["destination_point"]["placeName"] = name!;
        quote["destination_point"]["coordinates"] = coordinates!;
        visitor["destination_point"]["placeName"] = name!;
        visitor["destination_point"]["coordinates"] = coordinates!;
        const status = place.business_status;
        const formattedAddress = place.formatted_address;
      } else {
        console.error("Location not found in place object");
      }
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: new google.maps.LatLng(
          quote.start_point.coordinates.lat,
          quote.start_point.coordinates.lng
        ),
        destination: new google.maps.LatLng(
          quote.destination_point.coordinates.lat,
          quote.destination_point.coordinates.lng
        ),
        travelMode: google.maps.TravelMode.DRIVING,
      };
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);

          const route = result?.routes[0];
          const leg = route?.legs[0];
          const duration = leg?.duration?.value!;
          const distance = leg?.distance?.value!;
          setDuration(duration);
          setDistance(`${distance * 0.0006213711922} miles`);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    } else {
      alert("Please enter text");
    }
  }

  function convertToHHMM(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return {
      hours: hours,
      minutes: minutes,
    };
  }

  function addDurationToTime(
    time: string | null, // Allowing time to be null
    hoursToAdd: number,
    minutesToAdd: number,
    givenDate: string | null // Allowing givenDate to be null
  ) {
    if (!time || !givenDate) {
      throw new Error("Invalid time or date");
    }

    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes + hoursToAdd * 60 + minutesToAdd;

    const [year, month, day] = givenDate.split("-").map(Number);
    const currentDate = new Date(year, month - 1, day);

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    currentDate.setHours(currentDate.getHours() + newHours);
    currentDate.setMinutes(newMinutes);

    const newYear = currentDate.getFullYear();
    const newMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const newDay = String(currentDate.getDate()).padStart(2, "0");

    return {
      date: `${newDay}-${newMonth}-${newYear}`,
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes(),
    };
  }

  const handleLocationButtonClick = () => {
    setSelectedLocation(nom);
  };

  const handleLocationButtonClickDest = () => {
    setSelectedDestination(fatma);
  };

  const handlePassengerNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const passengerNumber = e.target.value;
    setSelectedPax(passengerNumber);
  };

  const handleVehicleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicleType = e.target.value;
    setSelectedVehicle(vehicleType);
  };

  const handleLuggage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const luggage = e.target.value;
    setSelectedLuggage(luggage);
  };

  const handleJourney = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const journey = e.target.value;
    setSelectedJourney(journey);
  };

  const handleSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const source = e.target.value;
    setSelectedSource(source);
  };

  const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value;
    setSelectedPriority(priority);
  };

  const handleDateChange = (selectedDates: Date[]) => {
    setSelectedDate(selectedDates[0]);
  };

  const handlePickupTimeChange = (selectedDates: Date[]) => {
    const time = selectedDates[0];
    setSelectedPickupTime(time);
  };

  const handleDropOffDateChange = (selectedDates: Date[]) => {
    setSelectedDropOffDate(selectedDates[0]);
  };

  const handleDropOffTimeChange = (selectedDates: Date[]) => {
    const time = selectedDates[0];
    setSelectedDropOffTime(time);
  };

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedQuoteType(event.target.value);
  };

  const optionVehicleTypes = AllPassengerLimit.filter(
    (item) => Number(item.max_passengers) >= Number(selected)
  );

  const optionLuggages = AllPassengerLimit.filter(
    (item) =>
      item.vehicle_type.type === selectedVehicle &&
      Number(item.max_passengers) >= Number(selected)
  );

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-GB").split("/").join("-")
    : null;

  const formattedDropOffDate = selectedDropOffDate
    ? selectedDropOffDate.toLocaleDateString("en-GB").split("/").join("-")
    : null;

  const formattedPickupTime = selectedPickupTime
    ? selectedPickupTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const formattedDropOffTime = selectedDropOffTime
    ? selectedDropOffTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const currentDate = new Date();

  const formattedCurrentDate = currentDate
    .toLocaleDateString("en-GB")
    .split("/")
    .join("-");

  const formattedDateToUse = selectedDate
    ? `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : null;

  let clean_dropoff_date = "";
  let clean_dropoff_time = "";
  if (formattedPickupTime && formattedDateToUse) {
    let durationToCalculate = convertToHHMM(duration_to_send);
    let dropoffTime = addDurationToTime(
      formattedPickupTime,
      durationToCalculate.hours,
      durationToCalculate.minutes,
      formattedDateToUse
    );

    clean_dropoff_date = dropoffTime.date;
    clean_dropoff_time =
      String(dropoffTime.hours).padStart(2, "0") +
      ":" +
      String(dropoffTime.minutes).padStart(2, "0");

    console.log("Clean Dropoff Date:", clean_dropoff_date);
    console.log("Clean Dropoff Time:", clean_dropoff_time);
  } else {
    console.error(
      "Pickup time or date is null, unable to calculate dropoff time."
    );
  }

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Quote is created successfully",
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

  const onChangeQuote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuote((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onChangeVisitor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVisitor((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      quote["passengers_number"] = Number(selectedPax);
      quote["vehicle_type"] = selectedVehicle;
      quote["luggage_details"] = selectedLuggage;
      quote["heard_of_us"] = selectedSource;
      quote["journey_type"] = selectedJourney;
      quote["date"] = formattedDate!;
      quote["pickup_time"] = formattedPickupTime!;
      quote["type"] = selectedQuoteType;
      quote["return_date"] = formattedDropOffDate!;
      quote["return_time"] = formattedDropOffTime!;
      quote["dropoff_date"] = clean_dropoff_date!;
      quote["dropoff_time"] = clean_dropoff_time!;
      quote["return_date"] = formattedDropOffDate!;
      quote["status"] = "Pending";
      quote["progress"] = "New";
      quote["category"] = "Private";
      quote["distance"] = distance_to_send;
      quote["duration"] = duration_to_send.toString();
      visitor["status"] = "Pending";
      visitor["estimated_start_time"] = formattedDate!;
      visitor["estimated_return_start_time"] = formattedDropOffDate!;
      const visitorResponse = await createVisitor(visitor).unwrap();
      quote["id_visitor"] = visitorResponse?._id!;
      visitor["enquiryDate"] = formattedCurrentDate!;

      await createQuote(quote);

      notifySuccess();

      navigate("/pending-quotes");
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <Card.Body className="form-steps">
              <Form onSubmit={onSubmitQuote}>
                <Row>
                  <Col lg={8}>
                    <Card>
                      <div className="d-flex align-items-center p-2">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-light text-dark fs-20">
                              <i className="ph ph-file-plus"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">
                            Create a new quote
                          </h5>
                        </div>
                      </div>
                      <Card.Header>
                        <div className="d-flex align-items-center p-1">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm">
                              <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                <i className="ph ph-user"></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="card-title mb-1">Customer</h5>
                          </div>
                        </div>
                        <Row>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="name">Name</Form.Label>
                              <Form.Control
                                type="text"
                                id="name"
                                name="name"
                                value={visitor.name}
                                onChange={onChangeVisitor}
                                placeholder="Enter full name"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="email">Email</Form.Label>
                              <Form.Control
                                type="email"
                                id="email"
                                name="email"
                                value={visitor.email}
                                onChange={onChangeVisitor}
                                placeholder="Enter email"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="phone">Phone</Form.Label>
                              <Form.Control
                                type="text"
                                id="phone"
                                name="phone"
                                value={visitor.phone}
                                onChange={onChangeVisitor}
                                placeholder="Enter phone number"
                              />
                            </div>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Card.Body>
                        <div className="mb-3">
                          <Row>
                            <Card.Header>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm">
                                    <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                      <i className="ph ph-bus"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <h5 className="card-title mb-1">Transport</h5>
                                </div>
                              </div>
                              <Row>
                                <Col lg={5}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label fs-13"
                                    >
                                      Passengers number
                                    </label>
                                    <select
                                      className="form-select text-muted"
                                      name="choices-single-default"
                                      id="statusSelect"
                                      onChange={handlePassengerNumber}
                                    >
                                      <option value="">Select</option>
                                      {numbersList.map((item) => (
                                        <option value={item.value}>
                                          {item.value}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </Col>
                                <Col lg={7}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="selectVehicleType"
                                      className="form-label"
                                    >
                                      Vehicle Type
                                    </label>
                                    <select
                                      className="form-select text-muted"
                                      name="selectVehicleType"
                                      id="selectVehicleType"
                                      onChange={handleVehicleType}
                                    >
                                      <option value="">Select</option>
                                      {selectedPax !== "" &&
                                        optionVehicleTypes.map((item) => (
                                          <option
                                            value={item.vehicle_type.type}
                                            key={item._id!}
                                          >
                                            {item.vehicle_type.type}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={6}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="selectLuggage"
                                      className="form-label"
                                    >
                                      Luggage Details
                                    </label>
                                    <select
                                      className="form-select text-muted"
                                      name="selectLuggage"
                                      id="selectLuggage"
                                      onChange={handleLuggage}
                                    >
                                      <option value="">Select</option>
                                      {selectedPax !== "" &&
                                        optionLuggages.map((item) => (
                                          <option
                                            value={item.max_luggage.description}
                                            key={item?._id!}
                                          >
                                            {item.max_luggage.description}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </Col>
                                <Col lg={6}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="journey"
                                      className="form-label"
                                    >
                                      Journey Type
                                    </label>
                                    <select
                                      className="form-select text-muted"
                                      name="journey"
                                      id="journey"
                                      onChange={handleJourney}
                                    >
                                      <option value="">Journey</option>
                                      {AllJourneys.map((journey) => (
                                        <option value={journey.type}>
                                          {journey.type}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Header>
                          </Row>
                        </div>
                        <div className="mb-1">
                          <Row>
                            <Card.Header>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm">
                                    <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                      <i className="ph ph-question"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <h5 className="card-title mb-1">Misc</h5>
                                </div>
                              </div>
                              <Row>
                                <Col lg={8}>
                                  <div className="mb-3">
                                    <Form.Label htmlFor="source">
                                      How did you hear of us ?
                                    </Form.Label>
                                    <select
                                      className="form-select text-muted"
                                      name="source"
                                      id="source"
                                      onChange={handleSource}
                                    >
                                      <option value="">Select</option>
                                      {AllSources.map((source) => (
                                        <option value={source.name}>
                                          {source.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Form.Label htmlFor="priority">
                                      Priority
                                    </Form.Label>
                                    <select
                                      className="form-select text-muted"
                                      name="priority"
                                      id="priority"
                                      onChange={handlePriority}
                                    >
                                      <option value="">Select</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="4">5</option>
                                    </select>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <div className="mb-1">
                                    <Form.Label htmlFor="notes">
                                      Notes
                                    </Form.Label>
                                    <textarea
                                      className="form-control"
                                      id="notes"
                                      name="notes"
                                      value={quote.notes}
                                      onChange={onChangeQuote}
                                      rows={3}
                                    ></textarea>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Header>
                          </Row>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card>
                      <Card.Header>
                        <div className="d-flex align-items-center p-1">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm">
                              <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                <i className="ph ph-car"></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="card-title mb-1">Trip Details</h5>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row className="gap-4">
                          <Col lg={4} className="p-2">
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                onChange={radioHandler}
                                value="One way"
                              />
                              <Form.Label
                                className="form-check-label fs-17"
                                htmlFor="flexRadioDefault1"
                              >
                                One Way
                              </Form.Label>
                            </div>
                          </Col>
                          <Col lg={4} className="p-2">
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                onChange={radioHandler}
                                value="Return"
                              />
                              <Form.Label
                                className="form-check-label fs-17"
                                htmlFor="flexRadioDefault1"
                              >
                                Return
                              </Form.Label>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <Form.Label>Pickup date</Form.Label>
                            <Flatpickr
                              className="form-control flatpickr-input mb-2"
                              placeholder="Select Date"
                              options={{
                                dateFormat: "d M, Y",
                              }}
                              onChange={handleDateChange}
                            />
                          </Col>
                          <Col lg={12}>
                            <Form.Label>Pickup Time</Form.Label>
                            <Flatpickr
                              className="form-control"
                              placeholder="Select Time"
                              options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                                time_24hr: true,
                              }}
                              onChange={handlePickupTimeChange}
                            />
                          </Col>
                          {selectedQuoteType === "Return" && (
                            <>
                              <Col lg={12}>
                                <Form.Label>Return date</Form.Label>
                                <Flatpickr
                                  className="form-control flatpickr-input mb-2"
                                  placeholder="Select DropOff Date"
                                  options={{
                                    dateFormat: "d M, Y",
                                  }}
                                  onChange={handleDropOffDateChange}
                                />
                              </Col>
                              <Col lg={12}>
                                <Form.Label>Return Time</Form.Label>
                                <Flatpickr
                                  className="form-control"
                                  placeholder="Select DropOff Time"
                                  options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true,
                                  }}
                                  onChange={handleDropOffTimeChange}
                                />
                              </Col>
                            </>
                          )}
                          <Col lg={12}>
                            <Form.Label>Collection Address</Form.Label>
                            <Autocomplete
                              onPlaceChanged={onPlaceChanged}
                              onLoad={onLoad}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Origin"
                                ref={originRef}
                                id="origin"
                                onClick={() => {
                                  handleLocationButtonClick();
                                  if (nom) {
                                    map?.panTo(nom);
                                    map?.setZoom(15);
                                  }
                                }}
                                onChange={onChangeQuote}
                                required
                              />
                            </Autocomplete>
                          </Col>
                          <Col lg={12}>
                            <Form.Label>Destination Address</Form.Label>
                            <Autocomplete
                              onPlaceChanged={onPlaceChangedDest}
                              onLoad={onLoadDest}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Destination"
                                ref={destinationRef}
                                id="dest"
                                onClick={() => {
                                  handleLocationButtonClickDest();
                                  if (fatma) {
                                    map?.panTo(fatma);
                                    map?.setZoom(15);
                                  }
                                }}
                                onChange={onChangeQuote}
                              />
                            </Autocomplete>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="success"
                      id="add-btn"
                      className="btn-sm"
                      type="submit"
                    >
                      Save & Send
                    </Button>
                  </div>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default ReallyNewQuote;
