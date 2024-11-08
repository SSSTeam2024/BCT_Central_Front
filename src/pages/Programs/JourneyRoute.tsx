import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import SimpleBar from "simplebar-react";
import Flatpickr from "react-flatpickr";
import { useGetAllSchoolsQuery } from "features/Schools/schools";
import { useGetAllCompanyQuery } from "features/Company/companySlice";
import { createDateFromStrings } from "helpers/create_date_from_string";
import { addDurationToTime } from "helpers/add_duration_to_time_program";
import {
  Programm,
  useAddProgrammMutation,
} from "features/Programs/programSlice";
import "./AddProgram.css";

interface JourneyRouteProps {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

interface StopTime {
  hours: number;
  minutes: number;
}

interface Stop {
  id: number;
  address: string;
}

interface RouteSegment {
  segment: number;
  startAddress: string;
  endAddress: string;
  distance: string;
  duration: string;
}

const JourneyRoute: React.FC<JourneyRouteProps> = ({ setActiveTab }) => {
  const center = { lat: 52.4862, lng: -1.8904 };

  const [loading, setLoading] = useState<boolean>(false);

  const { data: allSchools = [] } = useGetAllSchoolsQuery();
  const { data: allCompanies = [] } = useGetAllCompanyQuery();

  const [selectedClientType, setSelectedClientType] = useState<string>("");
  const [programm_name, setProgrammName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [origin_name, setOriginName] = useState<any>();
  const [destination_name, setDestinationName] = useState<any>();
  const originRef = useRef<any>(null);
  const destinationRef = useRef<any>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pickUp_time, setPickUp_time] = useState<Date>();
  const [searchDestination, setSearchDestination] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [stopTimes, setStopTimes] = useState<StopTime[]>([]);
  const [stops2, setStops2] = useState<Stop[]>([]);

  const [originSwitchRef, setOriginSwitchRef] = useState<google.maps.LatLng[]>(
    []
  );
  const [destSwitchRef, setDestSwitchRef] = useState<google.maps.LatLng[]>([]);
  const [waypts, setWaypts] = useState<any[]>([]);

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

  const [routeDirections, setRouteDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [routeSegments, setRouteSegments] = useState<RouteSegment[]>([]);

  const [searchStop, setSearchStop] = useState<string>("");
  const [stop, setStop] = useState<any>();

  const [selectedStop, setSelectedStop] = useState(null);
  const stopRef = useRef<any>(null);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [selectSchoolID, setSelectedSchoolID] = useState<string>("");
  const [selectCompanyID, setSelectedCompanyID] = useState<string>("");

  // The selected Group Creation Mode
  const [selectedGroupCreationMode, setSelectedGroupCreationMode] =
    useState<string>("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API!,
    libraries: ["places"],
  });

  const [programmData, setProgrammData] = useState({
    programDetails: {
      _id: "",
      programName: "",
      origin_point: {
        placeName: "",
        coordinates: {
          lat: 1,
          lng: 1,
        },
      },
      stops: [
        {
          id: "",
          address: {
            placeName: "",
            coordinates: {
              lat: 0,
              lng: 0,
            },
          },
          time: "",
        },
      ],
      destination_point: {
        placeName: "",
        coordinates: {
          lat: 1,
          lng: 1,
        },
      },
      pickUp_date: "",
      droppOff_date: "",
      freeDays_date: [""],
      exceptDays: [""],
      recommanded_capacity: "",
      extra: [""],
      notes: "",
      journeyType: "",
      dropOff_time: "",
      pickUp_Time: "",
      workDates: [""],
      company_id: "",
      school_id: "",
      invoiceFrequency: "",
      within_payment_days: "",
      total_price: "",
      unit_price: "",
      program_status: [
        {
          status: "",
          date_status: "",
        },
      ],
      tab_number: "",
      employees_groups: [""],
      students_groups: [""],
      groups_creation_mode: "",
    },
    groups: {
      type: "",
      groupCollection: [
        {
          groupName: "",
          program: "",
          vehicle_type: "",
          luggage_details: "",
          unit_price: "",
        },
      ],
    },
  });

  // This function will be triggered when a radio button to select client type
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClientType(event.target.value);
  };

  const onChangeProgramName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgrammName(event.target.value);
  };

  function onPlaceOriginChanged() {
    if (searchResult != null) {
      const place = (
        searchResult as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        const coordinates = { lat: location.lat(), lng: location.lng() };
        programmData["programDetails"]["origin_point"].placeName = name!;
        programmData["programDetails"]["origin_point"].coordinates =
          coordinates!;
        const status = place.business_status;
        const formattedAddress = place.formatted_address;
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  function onLoadOrigin(autocomplete: any) {
    autocomplete.setComponentRestrictions({
      country: ["uk"],
    });
    setSearchResult(autocomplete);
  }

  const handleLocationButtonClick = () => {
    setSelectedLocation(origin_name);
  };

  function onPlaceChangedDest() {
    if (searchDestination != null) {
      const place = (
        searchDestination as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        const coordinates = { lat: location.lat(), lng: location.lng() };
        programmData["programDetails"]["destination_point"].placeName = name!;
        programmData["programDetails"]["destination_point"].coordinates =
          coordinates!;
        const status = place.business_status;
        const formattedAddress = place.formatted_address;
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  function onLoadDest(autocomplete: any) {
    autocomplete.setComponentRestrictions({
      country: ["uk"],
    });
    setSearchDestination(autocomplete);
  }

  const handleLocationButtonClickDest = () => {
    setSelectedDestination(destination_name);
  };

  function onPlaceChangedStop() {
    if (searchStop != null) {
      const place = (
        searchStop as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      const location = place.geometry?.location;
      if (location) {
        const nom = { lat: location.lat(), lng: location.lng() };
        setStop(nom);

        const status = place.business_status;
        const formattedAddress = place.formatted_address;
        const wayPoint = {
          location: formattedAddress,
          coordinates: {
            lat: nom.lat,
            lng: nom.lng,
          },
          stopover: true,
        };
        setWaypts((waypts) => [...waypts, wayPoint]);
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  const handleLocationButtonClickStop = () => {
    setSelectedStop(stop);
  };

  function onLoadStop(autocomplete: any) {
    autocomplete.setComponentRestrictions({
      country: ["uk"],
    });
    setSearchStop(autocomplete);
  }

  const handlePickupTime = (selectedDates: any) => {
    const formattedTime = selectedDates[0];
    setPickUp_time(formattedTime);
  };

  const compareTimes = (time1: string, time2: string) => {
    let ref = 0;
    if (time1 > time2) {
      ref = 1;
    } else if (time1 < time2) {
      ref = 2;
    }
    return ref;
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    let totalStartMinutes = startHours * 60 + startMinutes;
    let totalEndMinutes = endHours * 60 + endMinutes;

    let durationInMinutes = totalEndMinutes - totalStartMinutes;

    if (durationInMinutes < 0) {
      durationInMinutes += 24 * 60;
    }

    const durationHours = Math.floor(durationInMinutes / 60);
    const durationMinutes = durationInMinutes % 60;

    let duration = {
      hours: durationHours,
      minutes: durationMinutes,
    };

    return duration;
  };

  const subtractTime = (
    time: string,
    hoursToSubtract: number,
    minutesToSubtract: number
  ) => {
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes -= hoursToSubtract * 60 + minutesToSubtract;

    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    return {
      hours: newHours,
      minutes: newMinutes,
    };
  };

  const handleStopTime = (selectedTime: any, index: number) => {
    const formattedTime = selectedTime[0];
    let hour = formattedTime?.getHours();
    let minute = formattedTime?.getMinutes();
    let tempStopTimes = [...stopTimes];
    let newSelectedTime =
      String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0");

    tempStopTimes[index] = {
      hours: hour,
      minutes: minute,
    };

    let apiTime =
      String(stopTimes[index].hours).padStart(2, "0") +
      ":" +
      String(stopTimes[index].minutes).padStart(2, "0");

    let comparisonTime = compareTimes(apiTime, newSelectedTime);

    let duration = {
      hours: 0,
      minutes: 0,
    };

    if (comparisonTime === 2) {
      duration = calculateDuration(apiTime, newSelectedTime);
    }
    if (comparisonTime === 1) {
      duration = calculateDuration(newSelectedTime, apiTime);
    }
    for (let i = index + 1; i < stopTimes.length; i++) {
      let oldTime =
        String(stopTimes[i].hours).padStart(2, "0") +
        ":" +
        String(stopTimes[i].minutes).padStart(2, "0");

      let newTime = {
        hours: 0,
        minutes: 0,
      };
      if (comparisonTime === 2) {
        newTime = addDurationToTime(oldTime, duration.hours, duration.minutes);
      }

      if (comparisonTime === 1) {
        newTime = subtractTime(oldTime, duration.hours, duration.minutes);
      }

      tempStopTimes[i].hours = newTime.hours;
      tempStopTimes[i].minutes = newTime.minutes;
    }

    setStopTimes(tempStopTimes);
  };

  async function calculateRoute(): Promise<void> {
    //stopTimes = [];
    setOriginSwitchRef(originRef?.current!.value);
    setDestSwitchRef(destinationRef?.current!.value);

    if (
      originRef?.current!.value === "" ||
      destinationRef?.current!.value === "" ||
      !map
    ) {
      console.error("Invalid inputs or map not loaded.");
      return;
    }

    setLoading(true);

    const directionsService = new google.maps.DirectionsService();
    let waypoints = [];
    for (let point of waypts) {
      waypoints.push({
        location: point.location,
        stopover: true,
      });
    }
    directionsService.route(
      {
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints,
      },
      (result, status) => {
        setLoading(false);

        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          setRouteDirections(result);

          const selectedRoute = result?.routes!.find((route) => {
            const segments = route.legs.map((leg, index) => ({
              segment: index + 1,
              startAddress: leg.start_address,
              endAddress: leg.end_address,
              distance: leg?.distance!.text!,
              duration: leg?.duration!.text!,
            }));
            setRouteSegments(segments);

            let durations = route.legs.map((leg, index) => ({
              duration: leg?.duration!.value!,
            }));
            const hours_first = Math.floor(durations[0].duration / 3600);
            const minutes_first = Math.floor(
              (durations[0].duration % 3600) / 60
            );

            let pickUpHour = String(pickUp_time?.getHours()).padStart(2, "0");
            let pickUpMinute = String(pickUp_time?.getMinutes()).padStart(
              2,
              "0"
            );

            const time_first = addDurationToTime(
              pickUpHour + ":" + pickUpMinute,
              hours_first,
              minutes_first
            );
            let temporarryTimes = [time_first];
            for (let i = 1; i < durations.length; i++) {
              const hours = Math.floor(durations[i].duration / 3600);
              const minutes = Math.floor((durations[i].duration % 3600) / 60);

              const time = addDurationToTime(
                String(temporarryTimes[i - 1]?.hours) +
                  ":" +
                  String(temporarryTimes[i - 1]?.minutes),
                hours,
                minutes
              );
              temporarryTimes.push(time);
            }
            setStopTimes(temporarryTimes);
          });

          if (!selectedRoute) {
            return;
          }

          if (map && directionsResponse) {
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(directionsResponse);
          }
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }

  const handleRemoveStopClick = (idToRemove: any) => {
    setStops2((prevStops) => {
      const updatedStops = prevStops.filter((stop) => stop.id !== idToRemove);
      return updatedStops;
    });

    const newWaypts = [...waypts];
    newWaypts.splice(idToRemove - 1, 1);
    setWaypts(newWaypts);
    calculateRoute();
  };

  const handleAddStopClickWrapper = (address: string) => {
    return () => handleAddStopClick(address);
  };

  const handleAddStopClick = (address: string) => {
    setStops2((prevStops) => [
      ...prevStops,
      { id: prevStops.length + 1, address },
    ]);
  };

  function clearRoute() {
    setDirectionsResponse(null);
    setLoading(false);
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  // This function is triggered when the select SchoolID
  const handleSelectSchoolID = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedSchoolID(value);
    setSelectedCompanyID("");
  };

  // This function is triggered when the select CompanyID
  const handleSelectCompanyID = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedCompanyID(value);
    setSelectedSchoolID("");
  };

  const [createProgram] = useAddProgrammMutation<Programm>();

  const onChangeProgramms = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProgrammData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const saveProgress = async (tabNumber: string, data: typeof programmData) => {
    const pickUpHour = pickUp_time
      ? String(pickUp_time.getHours()).padStart(2, "0")
      : "";

    const pickUpMinute = pickUp_time
      ? String(pickUp_time.getMinutes()).padStart(2, "0")
      : "";

    const pickTime = pickUp_time ? `${pickUpHour}:${pickUpMinute}` : "";

    const destTime =
      stopTimes.length > 0
        ? `${String(stopTimes[stopTimes.length - 1]?.hours).padStart(
            2,
            "0"
          )}:${String(stopTimes[stopTimes.length - 1]?.minutes).padStart(
            2,
            "0"
          )}`
        : "";

    data["programDetails"]["programName"] = programm_name;
    data["programDetails"]["dropOff_time"] = destTime;
    data["programDetails"]["pickUp_Time"] = pickTime;

    if (selectedClientType === "School") {
      data["programDetails"]["school_id"] = selectSchoolID;
    }
    if (selectedClientType === "Company") {
      data["programDetails"]["company_id"] = selectCompanyID;
    }
    data["programDetails"]["tab_number"] = tabNumber;
    data["programDetails"]["program_status"][0] = {
      status: "Pending",
      date_status: new Date().toDateString()!,
    };
    let stops = [];

    for (let i = 0; i < waypts.length; i++) {
      stops.push({
        id: "",
        address: {
          placeName: waypts[i].location,
          coordinates: waypts[i].coordinates,
        },

        time:
          String(stopTimes[i].hours).padStart(2, "0") +
          ":" +
          String(stopTimes[i].minutes).padStart(2, "0"),
      });
    }
    data["programDetails"]["stops"] = stops;
    const response = await createProgram(data).unwrap();
    localStorage.setItem("prog_id", response?._id!);
    setActiveTab(2);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Row>
      <Col lg={5}>
        <Row>
          <Col lg={4} className="p-2">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={radioHandler}
                value="School"
              />
              <Form.Label
                className="form-check-label fs-17"
                htmlFor="flexRadioDefault1"
              >
                School
              </Form.Label>
            </div>
          </Col>
          <Col lg={2} className="p-2">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={radioHandler}
                value="Company"
              />
              <Form.Label
                className="form-check-label fs-17"
                htmlFor="flexRadioDefault1"
              >
                Company
              </Form.Label>
            </div>
          </Col>
        </Row>
        {selectedClientType === "School" && (
          <Row>
            <Col lg={10}>
              <Form.Label htmlFor="school_id">Client Name</Form.Label>
              <div className="mb-3">
                <select
                  className="form-select text-muted"
                  name="school_id"
                  id="school_id"
                  onChange={handleSelectSchoolID}
                >
                  <option value="">Select</option>
                  {allSchools.map((school) => (
                    <option value={`${school?._id!}`} key={school?._id!}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
          </Row>
        )}
        {selectedClientType === "Company" && (
          <Row>
            <Col lg={10}>
              <Form.Label htmlFor="company_id">Client Name</Form.Label>
              <div className="mb-3">
                <select
                  className="form-select text-muted"
                  name="company_id"
                  id="company_id"
                  onChange={handleSelectCompanyID}
                >
                  <option value="">Select</option>
                  {allCompanies.map((company) => (
                    <option value={`${company?._id!}`} key={company?._id!}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <Col lg={10}>
            <Form.Label htmlFor="programDetails.programName">
              Program Name
            </Form.Label>
            <Form.Control
              type="text"
              id="programDetails.programName"
              required
              className="mb-2"
              placeholder="Add Program Name"
              name="programDetails.programName"
              value={programm_name}
              onChange={onChangeProgramName}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="customerName-field">Locations</Form.Label>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col lg={2}>
            <InputGroup.Text id="basic-addon1" style={{ width: "100px" }}>
              From
            </InputGroup.Text>
          </Col>
          <Col lg={5}>
            <Autocomplete
              onPlaceChanged={onPlaceOriginChanged}
              onLoad={onLoadOrigin}
            >
              <Form.Control
                type="text"
                placeholder="Origin"
                ref={originRef}
                id="origin"
                onClick={() => {
                  handleLocationButtonClick();
                  if (origin_name) {
                    map?.panTo(origin_name);
                    map?.setZoom(15);
                  }
                }}
                onChange={onChangeProgramms}
              />
            </Autocomplete>
          </Col>
          <Col lg={3}>
            <Flatpickr
              className="form-control text-center"
              id="pickUp_time"
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
                onChange: handlePickupTime,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={1}>
            <InputGroup.Text id="basic-addon1" style={{ width: "100px" }}>
              To
            </InputGroup.Text>
          </Col>
          <Col lg={6}>
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
                  if (destination_name) {
                    map?.panTo(destination_name);
                    map?.setZoom(15);
                  }
                }}
                onChange={onChangeProgramms}
              />
            </Autocomplete>
          </Col>
          <Col lg={3}>
            <Flatpickr
              placeholder="HH:MM"
              className="form-control text-center"
              id="pickUp_time"
              value={createDateFromStrings(
                String(new Date().getFullYear()).padStart(2, "0") +
                  "-" +
                  String(new Date().getMonth() + 1).padStart(2, "0") +
                  "-" +
                  String(new Date().getDate().toLocaleString()).padStart(
                    2,
                    "0"
                  ),
                stopTimes[stopTimes.length - 1]?.hours +
                  ":" +
                  stopTimes[stopTimes.length - 1]?.minutes +
                  ":00"
              ).getTime()}
              disabled={true}
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
              }}
            />
          </Col>
        </Row>
        {loading ? (
          <p>Calculating route...</p>
        ) : (
          <Row>
            <Col lg={10}>
              <Button
                type="submit"
                onClick={calculateRoute}
                className="custom-button"
              >
                Plan Route
              </Button>
            </Col>
          </Row>
        )}
        <SimpleBar
          autoHide={false}
          data-simplebar-track="dark"
          className="overflow-auto mb-4"
          style={{ height: "240px" }}
        >
          {stops2.map((stop, index) => (
            <Row className="mt-3">
              <Col lg={2}>
                <Form.Label htmlFor="customerName-field">
                  Stop {index + 1}
                </Form.Label>
              </Col>
              <Col lg={5} key={index}>
                <div className="mb-3">
                  <Autocomplete
                    onPlaceChanged={onPlaceChangedStop}
                    onLoad={onLoadStop}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Stop"
                      ref={stopRef}
                      id="stop"
                      onClick={() => {
                        handleLocationButtonClickStop();
                      }}
                    />
                  </Autocomplete>
                </div>
              </Col>
              <Col lg={3}>
                <Flatpickr
                  className="form-control"
                  id="pickUp_time"
                  value={createDateFromStrings(
                    String(new Date().getFullYear()).padStart(2, "0") +
                      "-" +
                      String(new Date().getMonth() + 1).padStart(2, "0") +
                      "-" +
                      String(new Date().getDate().toLocaleString()).padStart(
                        2,
                        "0"
                      ),
                    stopTimes[index]?.hours +
                      ":" +
                      stopTimes[index]?.minutes +
                      ":00"
                  ).getTime()}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                  }}
                  onChange={(selectedDates) =>
                    handleStopTime(selectedDates, index)
                  }
                />
              </Col>
              <Col lg={1}>
                <button
                  type="button"
                  className="btn btn-danger btn-icon"
                  onClick={() => handleRemoveStopClick(stop.id)}
                >
                  <i className="ri-delete-bin-5-line"></i>
                </button>
              </Col>
            </Row>
          ))}
        </SimpleBar>
        <Row>
          <div>
            <Link
              to="#"
              id="add-item"
              className="btn btn-soft-info fw-medium w-lg"
              onClick={handleAddStopClickWrapper("New Stop Address")}
            >
              <i className="ri-add-line label-icon align-middle rounded-pill fs-16 me-2">
                {" "}
                Via
              </i>
            </Link>
          </div>
        </Row>
      </Col>
      <Col lg={7}>
        <Row style={{ height: "80vh", position: "relative" }}>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{
              width: "100%",
              height: "80%",
            }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,

              fullscreenControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
              },
            }}
            onLoad={(map) => setMap(map)}
          >
            {selectedLocation && <Marker position={origin_name} />}
            {selectedDestination && <Marker position={destination_name} />}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
          <Button
            aria-label="center back"
            onClick={clearRoute}
            variant="danger"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 1000,
              padding: "5px 10px",
              width: "auto",
            }}
          >
            <i className="bi bi-eraser"></i> Clear Route
          </Button>
        </Row>
        <Row className="d-flex align-items-end">
          <Col>
            <Dropdown style={{ marginLeft: "0" }}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Route Information
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {routeSegments.map((segment, index) => (
                  <Dropdown.Item key={index}>
                    <div>
                      <p>Route Segment: {segment.segment}</p>
                      <p>
                        {segment.startAddress} To {segment.endAddress}
                      </p>
                      <p>{segment.distance}</p>
                      <p>{segment.duration}</p>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Link
              to="#"
              state={{ program: programmData.programDetails }}
              className="btn btn-success btn-label right ms-auto nexttab"
              onClick={() => {
                saveProgress("1", programmData);
              }}
            >
              <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
              Set Run dates
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default JourneyRoute;
