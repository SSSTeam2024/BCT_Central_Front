import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
  GoogleApiWrapper,
  Map,
  Marker,
  InfoWindow,
  Polyline,
} from "google-maps-react";
import { io } from "socket.io-client";
import coach from "../../../assets/images/coach.png";
import coachOnTime from "../../../assets/images/coachOnTime.png";
import coachWithDelay from "../../../assets/images/coachWithDelay.png";
import chauffeur from "../../../assets/images/chauffeur.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import start_clicked from "../../../assets/images/start_clicked.png";
import dest_unclicked from "../../../assets/images/dest_unclicked.png";

const LoadingContainer = () => <div>Loading...</div>;
const Maptracking = (props: any) => {
  document.title = "Live Tracking | Bouden Coach Travel";

  const notify = (msg: string) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: msg,
      showConfirmButton: true,
    });
  };
  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  let activeDrivers = AllDrivers.filter(
    (driver) =>
      driver.driverStatus !== "onVacation" && driver.driverStatus !== "Inactive"
  );
  const [markers, setMarkers] = useState<any[]>([]);
  const [currentDrvierIndex, setCurrentDriverIndex] = useState<any>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<any[]>([]);
  const [routeMarkers, setRouteMarkers] = useState<any[]>([]);
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState<string>("");

  const URL = "http://57.128.184.217:3000"; //=== 'production' ? http://57.128.184.217:3000 : 'http://localhost:8800';
  const socket = io(URL);

  useEffect(() => {
    //For Disconnected Drivers
    socket.on("live-tracking-disconnection-listening", (quoteId: any) => {
      let temparkers = [...markers];
      const index = temparkers.findIndex(
        (obj) => obj.details.details.id === quoteId
      );
      if (index !== -1) {
        temparkers.splice(index, 1);
      }
      setMarkers(temparkers);
    });
    //For Active present drivers
    socket.on("live-tracking-listening", (socketData: any) => {
      let tripExists = false;
      let counter = 0;
      let temparkers = [...markers];
      for (let element of temparkers) {
        counter++;
        if (element.details.details.id === socketData.details.id) {
          if (socketData.details.progress === "Completed") {
            notify(
              "Driver " + socketData.details.driver + " has completed this job"
            );
          } else {
            element.details.position = socketData.position;
            element.positions.push(socketData.position);
          }
          setMarkers(temparkers);
          tripExists = true;
          break;
        }
      }

      if (counter === markers.length && tripExists === false) {
        // if (user._id === socketData.details.companyId) {
        temparkers.push({
          details: socketData,
          positions: [socketData.position],
        });
        setMarkers(temparkers);
        // }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [markers]);
  let quotes_with_delay = markers.filter(
    (quote) => quote.details.details.delays.length !== 0
  );
  const drawPolyline = async (positions?: any) => {
    let array = positions
      .map((position: any) => `${position.lat},${position.lng}`)
      .join("|");

    try {
      const requestUrl = `https://roads.googleapis.com/v1/snapToRoads?path=${array}&key=${"AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw"}&interpolate=true`;

      const response: any = await axios.get(requestUrl);

      if (response) {
        const snappedPoints = response.snappedPoints.map((point: any) => ({
          lat: point.location.latitude,
          lng: point.location.longitude,
        }));
        setRouteCoordinates(snappedPoints);
      }
    } catch (error) {
      console.error("Error snapping to road:", error);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    // //? Polyline Solution
    // //?setRouteCoordinates(positions);

    // //? Directions Service Route Solution
    // //TODO: Construct an array of arrays where each sub array contains 27 point positions
    // //TODO : 1 for origin, 1 for destination, 25 for waypoints array

    // let segmentsContainer: any[][] = [];

    // for (let i = 0; i < positions.length; i += 27) {
    //   const subArray: string[] = positions.slice(i, i + 27);
    //   segmentsContainer.push(subArray);
    // }

    // console.log("segmentsContainer", segmentsContainer);

    // let temp_routes = [];

    // for (let i = 1; i < segmentsContainer.length; i++) {
    //   let waypts = [];
    //   let segment = segmentsContainer[i];
    //   console.log("segment", segment);
    //   for (let j = 1; j < segment.length - 1; j++) {
    //     waypts.push({
    //       location: segment[j],
    //     });
    //   }
    //   console.log(waypts);
    //   let result = drawRoute(segment[0], segment[segment.length - 1], waypts);

    //   temp_routes.push(result);
    // }
    // setRouteCoordinates(temp_routes);
  };

  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: process.env.REACT_APP_MAPS_API!,
  //   libraries: ["places"],
  // });
  const handleStopClick = (index: number) => {
    let prevRouteMarkers = [...routeMarkers];
    prevRouteMarkers[index].infoWindowVisibility = true;
    for (let i = 0; i < prevRouteMarkers.length; i++) {
      if (i !== index) {
        prevRouteMarkers[i].infoWindowVisibility = false;
      }
    }
    setRouteMarkers(prevRouteMarkers);
    getDurationBetweenDriverAndCurrentStop(prevRouteMarkers[index].coordinates);
  };

  const getDurationBetweenDriverAndCurrentStop = (stopPosition: any) => {
    let currentMarkers = getFilteredJobs();
    let driverPosition = currentMarkers[currentDrvierIndex].details.position;
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: driverPosition,
        destination: stopPosition,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (result !== null && status === google.maps.DirectionsStatus.OK) {
          let duration = result.routes[0].legs[0].duration?.value;
          const currentDate = new Date();
          const currentTime = currentDate.toTimeString().substring(0, 5);
          let durationHhMm = convertSeconds(duration!);
          let newTime = addDurationToTime(
            currentTime,
            durationHhMm.hours,
            durationHhMm.minutes
          );
          setEstimatedArrivalTime(
            newTime.hours.toString().padStart(2, "0") +
              ":" +
              newTime.minutes.toString().padStart(2, "0")
          );
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  };

  const convertSeconds = (
    seconds: number
  ): { hours: number; minutes: number } => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  };

  const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const addDurationToTime = (
    time: string,
    hoursToAdd: number,
    minutesToAdd: number
  ) => {
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes += hoursToAdd * 60 + minutesToAdd;

    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    return {
      hours: newHours,
      minutes: newMinutes,
    };
  };

  const drawRoute = (marker: any, index: number) => {
    const directionsService = new google.maps.DirectionsService();
    const waypoints = marker.details.details.mid_stations.map((stop: any) => ({
      location: { query: stop.address.placeName },
      stopover: true,
    }));

    directionsService.route(
      {
        origin: marker.details.details.start_point.coordinates,
        destination: marker.details.details.destination_point.coordinates,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints,
      },
      (result, status) => {
        if (result !== null && status === google.maps.DirectionsStatus.OK) {
          const route = result.routes[0].overview_path.map((point: any) => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
          setRouteCoordinates(route);
          let stopMarkers = [
            {
              time: marker.details.details.pickup_time,
              placeName: marker.details.details.start_point.placeName,
              infoWindowVisibility: false,
              type: "stop",
              coordinates: marker.details.details.start_point.coordinates,
            },
          ];

          for (let stop of marker.details.details.mid_stations) {
            stopMarkers.push({
              time: stop.time,
              placeName: stop.address.placeName,
              infoWindowVisibility: false,
              type: "stop",
              coordinates: {
                lat: Number(stop.address.coordinates.lat),
                lng: Number(stop.address.coordinates.lng),
              },
            });
          }

          stopMarkers.push({
            time: marker.details.details.dropoff_time,
            placeName: marker.details.details.destination_point.placeName,
            infoWindowVisibility: false,
            type: "destination",
            coordinates: marker.details.details.destination_point.coordinates,
          });

          setRouteMarkers(stopMarkers);
          setCurrentDriverIndex(index);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  };

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

  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  // This function is triggered when the select Period
  const handleSelectPeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPeriod(value);
  };

  const [selectedProgress, setSelectedProgress] = useState<string>("");
  // This function is triggered when the select Progress
  const handleSelectProgress = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedProgress(value);
  };

  const [selectedDriver, setSelectedDriver] = useState<string>("");
  // This function is triggered when the select Driver
  const handleSelectDriver = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedDriver(value);
  };

  const getFilteredJobs = () => {
    let filteredJobs = markers;

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
      filteredJobs = filteredJobs.filter((job: any) =>
        filterByDate(job.details.details.date)
      );
    }

    if (selectedProgress && selectedProgress !== "all") {
      filteredJobs = filteredJobs.filter(
        (job: any) => job.details.details.progress === selectedProgress
      );
    }

    if (selectedDriver && selectedDriver !== "all") {
      filteredJobs = filteredJobs.filter(
        (job: any) => job.details.details.driver?._id! === selectedDriver
      );
    }

    if (isPrivateHiredChecked) {
      filteredJobs = filteredJobs.filter(
        (job: any) => job.details.details.category === "Private"
      );
    }

    if (isContractChecked) {
      filteredJobs = filteredJobs.filter(
        (job: any) => job.details.details.category === "Regular"
      );
    }

    return filteredJobs;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={2} className="hstack gap-1">
                  <span className="badge bg-success-subtle text-success fs-12">
                    {markers.length}
                  </span>
                  <span className="fw-bold align-middle">Current Trips</span>
                </Col>
                <Col lg={2} className="hstack gap-1">
                  <span className="badge bg-danger-subtle text-danger fs-12">
                    {quotes_with_delay.length}
                  </span>
                  <span className="fw-bold align-middle">With Delay</span>
                </Col>
                <Col lg={2}>
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
                <Col lg={2}>
                  <select
                    className="form-select text-muted"
                    data-choices
                    data-choices-search-false
                    name="Progress"
                    id="idProgress"
                    onChange={handleSelectDriver}
                  >
                    <option value="all">All Drivers</option>
                    {activeDrivers.map((driver) => (
                      <option value={driver?._id!} key={driver?._id!}>
                        {driver.firstname} {driver.surname}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col className="d-flex align-items-center" lg={4}>
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
          <Row>
            <Col lg={8}>
              <Row>
                <Col lg={12}>
                  <div className="card-body">
                    <div
                      id="gmaps-types"
                      className="gmaps"
                      style={{ position: "relative" }}
                    >
                      <Map
                        google={props.google}
                        zoom={13}
                        style={{ height: "220%", width: `151%` }}
                        initialCenter={{ lat: 52.5244734, lng: -1.9857876 }}
                      >
                        {getFilteredJobs().map((marker, index) => (
                          <InfoWindow
                            key={index}
                            position={{
                              lat: marker.details.position.lat,
                              lng: marker.details.position.lng,
                            }} // Use the position of the first marker
                            visible={true}
                            pixelOffset={{ width: 0, height: -35 }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <span>
                                Quote ID: {marker.details.details?.quote_ref!}
                              </span>
                              <br />
                              <img
                                src={chauffeur}
                                alt=""
                                style={{ width: "25px" }}
                              />
                              <span>
                                {marker.details.details.driver.firstname}{" "}
                                {marker.details.details.driver.surname}
                              </span>
                              <br />

                              <span>
                                {
                                  marker.details.details.vehicle
                                    ?.registration_number!
                                }
                              </span>
                            </div>
                          </InfoWindow>
                        ))}
                        {getFilteredJobs().map((marker, index) =>
                          convertTimeToMinutes(
                            marker.details.details.pickup_time
                          ) < convertTimeToMinutes(estimatedArrivalTime) ? (
                            <Marker
                              key={index}
                              position={{
                                lat: marker.details.position.lat,
                                lng: marker.details.position.lng,
                              }}
                              icon={{
                                url: coachWithDelay,
                                scaledSize: new window.google.maps.Size(35, 35),
                              }}
                              onClick={() => {
                                drawRoute(marker, index);
                              }}
                            />
                          ) : convertTimeToMinutes(
                              marker.details.details.pickup_time
                            ) >= convertTimeToMinutes(estimatedArrivalTime) ? (
                            <Marker
                              key={index}
                              position={{
                                lat: marker.details.position.lat,
                                lng: marker.details.position.lng,
                              }}
                              icon={{
                                url: coachOnTime,
                                scaledSize: new window.google.maps.Size(35, 35),
                              }}
                              onClick={() => {
                                drawRoute(marker, index);
                              }}
                            />
                          ) : (
                            <Marker
                              key={index}
                              position={{
                                lat: marker.details.position.lat,
                                lng: marker.details.position.lng,
                              }}
                              icon={{
                                url: coach,
                                scaledSize: new window.google.maps.Size(35, 35), // Adjust the size of the icon
                              }}
                              onClick={() => {
                                drawRoute(marker, index);
                              }}
                            />
                          )
                        )}
                        <Polyline
                          path={routeCoordinates}
                          strokeColor="#FF1493"
                          strokeOpacity={0.7}
                          strokeWeight={7}
                        />
                        {routeMarkers.map((marker, index) => (
                          <InfoWindow
                            key={index}
                            position={{
                              lat: Number(marker.coordinates.lat),
                              lng: Number(marker.coordinates.lng),
                            }} // Use the position of the first marker
                            visible={marker.infoWindowVisibility}
                            pixelOffset={{ width: 0, height: -35 }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <span>Location: {marker.placeName}</span> <br />
                              <span>
                                Time:{" "}
                                <span className="fw-bold">{marker.time}</span>
                              </span>{" "}
                              <br />
                              <span>
                                Arrival Time:{" "}
                                <strong className="text-success">
                                  {estimatedArrivalTime}
                                </strong>
                              </span>
                            </div>
                          </InfoWindow>
                        ))}
                        {routeMarkers.map((marker, index) =>
                          marker.type === "stop" ? (
                            <Marker
                              key={index}
                              position={{
                                lat: Number(marker.coordinates.lat),
                                lng: Number(marker.coordinates.lng),
                              }}
                              icon={{
                                url: start_clicked,
                                scaledSize: new window.google.maps.Size(40, 40),
                              }}
                              onClick={() => {
                                handleStopClick(index);
                              }}
                            />
                          ) : (
                            <Marker
                              key={index}
                              position={{
                                lat: Number(marker.coordinates.lat),
                                lng: Number(marker.coordinates.lng),
                              }}
                              icon={{
                                url: dest_unclicked,
                                scaledSize: new window.google.maps.Size(40, 40),
                              }}
                              onClick={() => {
                                handleStopClick(index);
                              }}
                            />
                          )
                        )}
                      </Map>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
  LoadingContainer: LoadingContainer,
  v: "3",
})(Maptracking);
