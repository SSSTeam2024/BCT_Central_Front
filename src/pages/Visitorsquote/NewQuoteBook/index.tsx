import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetQuotesByReferenceQuery,
  useUpdateQuoteMutation,
} from "features/Quotes/quoteSlice";
import Swal from "sweetalert2";
import { useGetAllDriverQuery } from "features/Driver/driverSlice";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";
import SimpleBar from "simplebar-react";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import { useGetAllLuggageQuery } from "features/luggage/luggageSlice";
import { useGetAllJourneyQuery } from "features/Journeys/journeySlice";
import AddQuoteNoteModal from "./AddQuoteNoteModal";
import Flatpickr from "react-flatpickr";
import { formatDate, formatTime } from "helpers/date_time_format";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { addDurationToTime } from "helpers/add_duration_to_time";
import { convertToHHMM } from "helpers/convert_to_hhmm";

const NewQuoteBook = () => {
  document.title = "Assign Driver & Vehicle | Coach Hire Network";
  const quoteLocation = useLocation();
  const navigate = useNavigate();

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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API!,
    libraries: ["places"],
  });

  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  const { data: AllVehicles = [] } = useGetAllVehiclesQuery();
  const { data: AllVehicleTypes = [] } = useGetAllVehicleTypesQuery();
  const { data: AllLuggageDetails = [] } = useGetAllLuggageQuery();
  const { data: AllJourneys = [] } = useGetAllJourneyQuery();
  const { data: quotesByReference = [] } = useGetQuotesByReferenceQuery(
    quoteLocation.state.quote_ref,
    { refetchOnMountOrArgChange: true }
  );

  const [updateQuote] = useUpdateQuoteMutation();

  const result = AllVehicles.filter(
    (vehicle) => vehicle.statusVehicle === "Active"
  );

  const resultDriver = AllDrivers.filter(
    (driver) => driver.driverStatus === "Active"
  );

  const [maxPassenger, setMaxPassenger] = useState<string>(
    quoteLocation?.state?.passengers_number ?? ""
  );

  const handleMaxPassenger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPassenger(e.target.value);
  };

  const [vehiclePrice, setVehiclePrice] = useState<string>(
    quoteLocation?.state?.manual_cost ?? ""
  );

  const handleVehiclePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehiclePrice(e.target.value);
  };

  const [totalPrice, setTotalPrice] = useState<string>(
    quoteLocation?.state?.total_price ?? ""
  );

  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [returnDistance, setReturnDistance] = useState<string>("");
  const [returnDuration, setReturnDuration] = useState<string>("");
  const [dropoffDate, setDropoffDate] = useState<string>("");
  const [dropoffTime, setDropoffTime] = useState<string>("");
  const [dropoffReturnDate, setDropoffReturnDate] = useState<string>("");
  const [dropoffReturnTime, setDropoffReturnTime] = useState<string>("");

  const [collectionPoint, setCollectionPoint] = useState<{
    placeName: string;
    coordinates: { lat: number; lng: number };
  }>({
    placeName: quoteLocation?.state?.start_point?.placeName ?? "",
    coordinates: {
      lat: quoteLocation?.state?.start_point?.coordinates?.lat!,
      lng: quoteLocation?.state?.start_point?.coordinates?.lng!,
    },
  });

  const [destinationPoint, setDestinationPoint] = useState<{
    placeName: string;
    coordinates: { lat: number; lng: number };
  }>({
    placeName: quoteLocation?.state?.destination_point?.placeName ?? "",
    coordinates: {
      lat: quoteLocation?.state?.destination_point?.coordinates?.lat!,
      lng: quoteLocation?.state?.destination_point?.coordinates?.lng!,
    },
  });

  const [distanceMatrixService, setDistanceMatrixService] =
    useState<google.maps.DistanceMatrixService | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const service = new google.maps.DistanceMatrixService();
      setDistanceMatrixService(service);
    }
  }, [isLoaded]);

  const calculateDistanceAndDuration = () => {
    if (!collectionPoint.coordinates || !destinationPoint.coordinates) return;
    const service = distanceMatrixService;

    service?.getDistanceMatrix(
      {
        origins: [
          {
            lat: collectionPoint.coordinates.lat,
            lng: collectionPoint.coordinates.lng,
          },
        ],
        destinations: [
          {
            lat: destinationPoint.coordinates.lat,
            lng: destinationPoint.coordinates.lng,
          },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (
          status === google.maps.DistanceMatrixStatus.OK &&
          response!.rows[0].elements[0].status === "OK"
        ) {
          const element = response!.rows[0].elements[0];
          setDistance(element.distance.text);
          setDuration(String(element.duration.value));
        } else {
          console.error("Error calculating distance and duration:", status);
        }
      }
    );
  };

  const collectionAutocompleteRef =
    useRef<google.maps.places.Autocomplete | null>(null);
  const destinationAutocompleteRef =
    useRef<google.maps.places.Autocomplete | null>(null);

  const handleCollectionPlaceChange = () => {
    const place = collectionAutocompleteRef.current?.getPlace();
    if (place?.formatted_address && place.geometry) {
      setCollectionPoint({
        placeName: place.formatted_address,
        coordinates: {
          lat:
            place.geometry.location?.lat() ??
            quoteLocation?.state?.start_point?.coordinates?.lat!,
          lng:
            place.geometry.location?.lng() ??
            quoteLocation?.state?.start_point?.coordinates?.lng!,
        },
      });

      setDistance("");
      setDuration("");

      calculateDistanceAndDuration();
    }
  };

  const handleDestinationPlaceChange = () => {
    const place = destinationAutocompleteRef.current?.getPlace();
    if (place?.formatted_address && place.geometry) {
      setDestinationPoint({
        placeName: place.formatted_address,
        coordinates: {
          lat:
            place.geometry.location?.lat() ??
            quoteLocation?.state?.destination_point?.coordinates?.lat!,
          lng:
            place.geometry.location?.lng() ??
            quoteLocation?.state?.destination_point?.coordinates?.lng!,
        },
      });

      setDistance("");
      setDuration("");

      calculateDistanceAndDuration();
    }
  };
  useEffect(() => {
    if (
      isLoaded &&
      distanceMatrixService &&
      collectionPoint.coordinates.lat &&
      collectionPoint.coordinates.lng &&
      destinationPoint.coordinates.lat &&
      destinationPoint.coordinates.lng
    ) {
      calculateDistanceAndDuration();
    }
  }, [isLoaded, distanceMatrixService, collectionPoint, destinationPoint]);

  const [returnCollectionPoint, setReturnCollectionPoint] = useState<{
    placeName: string;
    coordinates: { lat: number; lng: number };
  }>({
    placeName: "",
    coordinates: { lat: 0, lng: 0 },
  });

  useEffect(() => {
    if (quotesByReference[1]?.start_point) {
      setReturnCollectionPoint({
        placeName: quotesByReference[1].start_point.placeName,
        coordinates: {
          lat: quotesByReference[1].start_point.coordinates.lat,
          lng: quotesByReference[1].start_point.coordinates.lng,
        },
      });
    }
  }, [quotesByReference]);

  const [returnDestinationPoint, setReturnDestinationPoint] = useState<{
    placeName: string;
    coordinates: { lat: number; lng: number };
  }>({
    placeName: "",
    coordinates: { lat: 0, lng: 0 },
  });

  useEffect(() => {
    if (quotesByReference[1]?.destination_point) {
      setReturnDestinationPoint({
        placeName: quotesByReference[1].destination_point.placeName,
        coordinates: {
          lat: quotesByReference[1].destination_point.coordinates.lat,
          lng: quotesByReference[1].destination_point.coordinates.lng,
        },
      });
    }
  }, [quotesByReference]);

  const calculateReturnDistanceAndDuration = () => {
    if (
      !returnCollectionPoint.coordinates ||
      !returnDestinationPoint.coordinates
    )
      return;
    const service = distanceMatrixService;

    service?.getDistanceMatrix(
      {
        origins: [
          {
            lat: returnCollectionPoint.coordinates.lat,
            lng: returnCollectionPoint.coordinates.lng,
          },
        ],
        destinations: [
          {
            lat: returnDestinationPoint.coordinates.lat,
            lng: returnDestinationPoint.coordinates.lng,
          },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (
          status === google.maps.DistanceMatrixStatus.OK &&
          response!.rows[0].elements[0].status === "OK"
        ) {
          const element = response!.rows[0].elements[0];
          setReturnDistance(element.distance.text);
          setReturnDuration(String(element.duration.value));
        } else {
          console.error("Error calculating distance and duration:", status);
        }
      }
    );
  };

  const returnCollectionAutocompleteRef =
    useRef<google.maps.places.Autocomplete | null>(null);
  const returnDestinationAutocompleteRef =
    useRef<google.maps.places.Autocomplete | null>(null);

  const handleCollectionPlaceForReturnChange = () => {
    const place = returnCollectionAutocompleteRef.current?.getPlace();
    if (place?.formatted_address && place.geometry) {
      setReturnCollectionPoint({
        placeName: place.formatted_address,
        coordinates: {
          lat:
            place.geometry.location?.lat() ??
            quotesByReference[1]?.destination_point?.coordinates?.lat!,
          lng:
            place.geometry.location?.lng() ??
            quotesByReference[1]?.destination_point?.coordinates?.lng!,
        },
      });
      setReturnDistance("");
      setReturnDuration("");

      calculateReturnDistanceAndDuration();
    }
  };

  const handleDestinationPlaceForReturnChange = () => {
    const place = returnDestinationAutocompleteRef.current?.getPlace();
    if (place?.formatted_address && place.geometry) {
      setReturnDestinationPoint({
        placeName: place.formatted_address,
        coordinates: {
          lat: place.geometry.location?.lat() ?? 0,
          lng: place.geometry.location?.lng() ?? 0,
        },
      });
      setReturnDistance("");
      setReturnDuration("");

      calculateReturnDistanceAndDuration();
    }
  };

  useEffect(() => {
    if (
      isLoaded &&
      distanceMatrixService &&
      returnCollectionPoint.coordinates.lat &&
      returnCollectionPoint.coordinates.lng &&
      returnDestinationPoint.coordinates.lat &&
      returnDestinationPoint.coordinates.lng
    ) {
      calculateReturnDistanceAndDuration();
    }
  }, [
    isLoaded,
    distanceMatrixService,
    returnCollectionPoint,
    returnDestinationPoint,
  ]);

  const [deposit, setDeposit] = useState<string>(
    quoteLocation?.state?.deposit_percentage ?? ""
  );

  const handleDeposit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(e.target.value);
  };

  const [depositAmount, setDepositAmount] = useState<string>(
    quoteLocation?.state?.deposit_amount ?? ""
  );

  const [selectedPickupDate, setSelectedPickupDate] = useState<Date | null>(
    null
  );

  const handlePickupDateChange = (selectedDates: Date[]) => {
    setSelectedPickupDate(selectedDates[0]);
  };

  const [selectedPickupTime, setSelectedPickupTime] = useState<Date | null>(
    null
  );

  const handlePickupTimehange = (selectedDates: Date[]) => {
    setSelectedPickupTime(selectedDates[0]);
  };

  const [selectedReturnDate, setSelectedReturnDate] = useState<Date | null>(
    null
  );

  const handleReturnDateChange = (selectedDates: Date[]) => {
    setSelectedReturnDate(selectedDates[0]);
  };

  const [selectedReturnTime, setSelectedReturnTime] = useState<Date | null>(
    null
  );

  const handleReturnTimehange = (selectedDates: Date[]) => {
    setSelectedReturnTime(selectedDates[0]);
  };

  useEffect(() => {
    const vehiclePriceNum = parseFloat(vehiclePrice) || 0;
    const depositPercentageNum = parseFloat(deposit) || 0;

    const calculatedDepositAmount =
      (vehiclePriceNum * depositPercentageNum) / 100;
    setDepositAmount(calculatedDepositAmount.toFixed(2));

    const calculatedTotalPrice = vehiclePriceNum + calculatedDepositAmount;
    setTotalPrice(calculatedTotalPrice.toFixed(2));
  }, [vehiclePrice, deposit]);

  const [showVehicleType, setShowVehicleType] = useState<boolean>(false);
  const [showVehicle, setShowVehicle] = useState<boolean>(false);
  const [showPickUpDate, setShowPickUpDate] = useState<boolean>(false);
  const [showPickUpTime, setShowPickUpTime] = useState<boolean>(false);
  const [showReturnDate, setShowReturnDate] = useState<boolean>(false);
  const [showReturnTime, setShowReturnTime] = useState<boolean>(false);
  const [showDriver, setShowDriver] = useState<boolean>(false);
  const [showLuggageDetails, setShowLuggageDetails] = useState<boolean>(false);
  const [showUpdateJourney, setShowUpdateJourney] = useState<boolean>(true);
  const [showUpdateJourney2, setShowUpdateJourney2] = useState<boolean>(true);
  const [showJourneyType, setShowJourneyType] = useState<boolean>(false);

  const [assignedVehicle, setAssignedVehicle] = useState<string>("");
  // This function is triggered when the select Model
  const handleAssignVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setAssignedVehicle(value);
  };

  const [assignedDriver, setAssignedDriver] = useState<string>("");
  // This function is triggered when the select Model
  const handleAssignDriver = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setAssignedDriver(value);
  };

  const [selectedVehiclType, setSelectedVehicleType] = useState<string>("");

  const handleSelectVehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleType(value);
  };

  const [selectedLuggageDetails, setSelectedLuggageDetails] =
    useState<string>("");

  const handleSelectLuggageDetails = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedLuggageDetails(value);
  };

  const [selectedJourneyType, setSelectedJourneyType] = useState<string>("");

  const handleSelectJourneyType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedJourneyType(value);
  };

  const initialQuoteData = {
    _id: "",
    quote_ref: "",
    id_schedule: "",
    company_id: "",
    school_id: "",
    owner: "",
    handled_by: "",
    id_driver: "",
    id_vehicle: "",
    handled_by_subcontractor: "",
    id_visitor: "",
    vehicle_type: "",
    passengers_number: 0,
    luggage_details: "",
    journey_type: "",
    notes: "",
    heard_of_us: "",
    pushed_price: "",
    id_invoice: "",
    paid_by_client: "",
    paid_by_bouden: "",
    status: "",
    manual_cost: "",
    progress: "",
    balance: "",
    deposit_percentage: "",
    deposit_amount: "",
    automatic_cost: "",
    pickup_time: "",
    real_start_time: "",
    start_delay_time: "",
    mid_stations: [
      {
        id: "",
        address: "",
        time: "",
      },
    ],
    delays: "",
    change_route: "",
    dropoff_time: "",
    dropoff_date: "",
    start_point: {
      placeName: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    destination_point: {
      placeName: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    type: "",
    // estimated_return_start_time: "",
    total_price: "",
    checklist_id: "",
    date: "",
    return_date: "",
    return_time: "",
    enquiryDate: "",
    category: "",
  };

  const [quoteData, setQuoteData] = useState(initialQuoteData);

  const {
    _id,
    quote_ref,
    id_schedule,
    company_id,
    school_id,
    owner,
    handled_by,
    id_driver,
    id_vehicle,
    handled_by_subcontractor,
    id_visitor,
    vehicle_type,
    passengers_number,
    luggage_details,
    journey_type,
    notes,
    heard_of_us,
    pushed_price,
    id_invoice,
    paid_by_client,
    paid_by_bouden,
    status,
    manual_cost,
    progress,
    balance,
    deposit_percentage,
    deposit_amount,
    automatic_cost,
    start_point,
    pickup_time,
    real_start_time,
    start_delay_time,
    mid_stations,
    delays,
    change_route,
    dropoff_time,
    dropoff_date,
    destination_point,
    type,
    // estimated_return_start_time,
    total_price,
    checklist_id,
    date,
    return_date,
    return_time,
    enquiryDate,
    category,
  } = quoteData;

  const onChangeQuoteData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuoteData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    const convertedDuration = convertToHHMM(duration);

    if (selectedPickupDate === null && selectedPickupTime === null) {
      let drop_off_date_time = addDurationToTime(
        quoteLocation.state.pickup_time,
        convertedDuration.hours,
        convertedDuration.minutes,
        quoteLocation.state.date
      );
      let clean_dropoff_time =
        String(drop_off_date_time.hours).padStart(2, "0") +
        ":" +
        String(drop_off_date_time.minutes).padStart(2, "0");
      setDropoffDate(drop_off_date_time.date);
      setDropoffTime(clean_dropoff_time);
    }
    if (selectedPickupDate !== null && selectedPickupTime !== null) {
      let drop_off_date_time = addDurationToTime(
        formatTime(selectedPickupTime),
        convertedDuration.hours,
        convertedDuration.minutes,
        formatDate(selectedPickupDate)
      );
      let clean_dropoff_time =
        String(drop_off_date_time.hours).padStart(2, "0") +
        ":" +
        String(drop_off_date_time.minutes).padStart(2, "0");
      setDropoffDate(drop_off_date_time.date);
      setDropoffTime(clean_dropoff_time);
    }
    if (selectedPickupDate === null && selectedPickupTime !== null) {
      let drop_off_date_time = addDurationToTime(
        formatTime(selectedPickupTime),
        convertedDuration.hours,
        convertedDuration.minutes,
        quoteLocation.state.date
      );
      let clean_dropoff_time =
        String(drop_off_date_time.hours).padStart(2, "0") +
        ":" +
        String(drop_off_date_time.minutes).padStart(2, "0");
      setDropoffDate(drop_off_date_time.date);
      setDropoffTime(clean_dropoff_time);
    }
    if (selectedPickupDate !== null && selectedPickupTime === null) {
      let drop_off_date_time = addDurationToTime(
        quoteLocation.state.pickup_time,
        convertedDuration.hours,
        convertedDuration.minutes,
        formatDate(selectedPickupDate)
      );
      let clean_dropoff_time =
        String(drop_off_date_time.hours).padStart(2, "0") +
        ":" +
        String(drop_off_date_time.minutes).padStart(2, "0");

      setDropoffDate(drop_off_date_time.date);
      setDropoffTime(clean_dropoff_time);
    }
  }, [duration, selectedPickupDate, selectedPickupTime, quoteLocation.state]);

  useEffect(() => {
    if (quotesByReference.length === 0) return;
    const convertedDuration = convertToHHMM(returnDuration);
    if (quotesByReference.length === 1) {
      if (selectedReturnDate === null && selectedReturnTime === null) {
        let drop_off_date_time = addDurationToTime(
          quotesByReference[0]?.pickup_time!,
          convertedDuration.hours,
          convertedDuration.minutes,
          quotesByReference[0]?.date!
        );
        let clean_dropoff_time =
          String(drop_off_date_time.hours).padStart(2, "0") +
          ":" +
          String(drop_off_date_time.minutes).padStart(2, "0");
        setDropoffReturnDate(drop_off_date_time.date);
        setDropoffReturnTime(clean_dropoff_time);
      }
    }
    if (quotesByReference.length === 2) {
      if (selectedReturnDate === null && selectedReturnTime === null) {
        let drop_off_date_time = addDurationToTime(
          quotesByReference[1]?.pickup_time!,
          convertedDuration.hours,
          convertedDuration.minutes,
          quotesByReference[1]?.date!
        );
        let clean_dropoff_time =
          String(drop_off_date_time.hours).padStart(2, "0") +
          ":" +
          String(drop_off_date_time.minutes).padStart(2, "0");
        setDropoffReturnDate(drop_off_date_time.date);
        setDropoffReturnTime(clean_dropoff_time);
      }
    }
    if (selectedReturnDate !== null && selectedReturnTime !== null) {
      let drop_off_date_time = addDurationToTime(
        formatTime(selectedReturnTime),
        convertedDuration.hours,
        convertedDuration.minutes,
        formatDate(selectedReturnDate)
      );
      let clean_dropoff_time =
        String(drop_off_date_time.hours).padStart(2, "0") +
        ":" +
        String(drop_off_date_time.minutes).padStart(2, "0");
      setDropoffReturnDate(drop_off_date_time.date);
      setDropoffReturnTime(clean_dropoff_time);
    }
    if (selectedReturnDate === null && selectedReturnTime !== null) {
      let drop_off_date_time = addDurationToTime(
        formatTime(selectedReturnTime),
        convertedDuration.hours,
        convertedDuration.minutes,
        quotesByReference[1]?.date!
      );
      let clean_dropoff_time =
        String(drop_off_date_time.hours).padStart(2, "0") +
        ":" +
        String(drop_off_date_time.minutes).padStart(2, "0");
      setDropoffReturnDate(drop_off_date_time.date);
      setDropoffReturnTime(clean_dropoff_time);
    }
    if (selectedReturnDate !== null && selectedReturnTime === null) {
      let drop_off_date_time = addDurationToTime(
        quotesByReference[1]?.pickup_time!,
        convertedDuration.hours,
        convertedDuration.minutes,
        formatDate(selectedReturnDate)
      );
      let clean_dropoff_time =
        String(drop_off_date_time.hours).padStart(2, "0") +
        ":" +
        String(drop_off_date_time.minutes).padStart(2, "0");

      setDropoffReturnDate(drop_off_date_time.date);
      setDropoffReturnTime(clean_dropoff_time);
    }
  }, [
    returnDuration,
    selectedReturnDate,
    selectedReturnTime,
    quotesByReference,
  ]);

  const onSubmitUpdateQuoteData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const updateData = {
        _id: quoteLocation.state?._id!,
        quote_ref: quoteLocation.state?.quote_ref!,
        id_schedule: quoteLocation.state?.id_schedule!,
        company_id: quoteLocation.state?.company_id!,
        school_id: quoteLocation.state?.school_id!,
        owner: quoteLocation.state?.owner!,
        handled_by: quoteLocation.state?.handled_by!,
        id_driver:
          assignedDriver === ""
            ? quoteLocation.state?.id_driver!
            : assignedDriver,
        id_vehicle:
          assignedVehicle === ""
            ? quoteLocation.state?.id_vehicle!
            : assignedVehicle,
        handled_by_subcontractor:
          quoteLocation.state?.handled_by_subcontractor!,
        id_visitor: quoteLocation.state?.id_visitor!,
        vehicle_type:
          selectedVehiclType === ""
            ? quoteLocation.state?.vehicle_type!
            : selectedVehiclType,
        passengers_number:
          maxPassenger === ""
            ? quoteLocation.state?.passengers_number!
            : maxPassenger,
        luggage_details:
          selectedLuggageDetails === ""
            ? quoteLocation.state?.luggage_details!
            : selectedLuggageDetails,
        journey_type:
          selectedJourneyType === ""
            ? quoteLocation.state?.journey_type!
            : selectedJourneyType,
        notes: quoteLocation.state?.notes!,
        heard_of_us: quoteLocation.state?.heard_of_us!,
        pushed_price: quoteLocation.state?.pushed_price!,
        id_invoice: quoteLocation.state?.id_invoice!,
        paid_by_client: quoteLocation.state?.paid_by_client!,
        paid_by_bouden: quoteLocation.state?.paid_by_bouden!,
        status: quoteLocation.state?.status!,
        manual_cost:
          vehiclePrice === ""
            ? quoteLocation.state?.manual_cost!
            : vehiclePrice,
        progress: quoteLocation.state?.progress!,
        balance: quoteLocation.state?.balance!,
        deposit_percentage:
          deposit === "" ? quoteLocation.state?.deposit_percentage! : deposit,
        deposit_amount:
          depositAmount === ""
            ? quoteLocation.state?.deposit_amount!
            : depositAmount,
        automatic_cost: quoteLocation.state?.automatic_cost!,
        start_point: collectionPoint,
        pickup_time:
          selectedPickupTime === null
            ? quoteLocation?.state?.pickup_time!
            : formatTime(selectedPickupTime),
        real_start_time: quoteLocation.state?.real_start_time!,
        start_delay_time: quoteLocation.state?.start_delay_time!,
        mid_stations: [
          {
            id: quoteLocation.state?.mid_stations?.id || "",
            address: quoteLocation.state?.mid_stations?.address || "",
            time: quoteLocation.state?.mid_stations?.time || "",
          },
        ],
        delays: quoteLocation.state?.delays!,
        change_route: quoteLocation.state?.change_route!,
        dropoff_time: dropoffTime,
        dropoff_date: dropoffDate,
        destination_point: destinationPoint,
        type: quoteLocation.state?.type!,
        total_price:
          totalPrice === "" ? quoteLocation.state?.total_price! : totalPrice,
        checklist_id: quoteLocation.state?.checklist_id!,
        date:
          selectedPickupDate === null
            ? quoteLocation.state?.date!
            : formatDate(selectedPickupDate),
        return_date: quoteLocation.state?.return_date!,
        return_time: quoteLocation.state?.return_time!,
        enquiryDate: quoteLocation.state?.enquiryDate!,
        category: quoteLocation.state?.category!,
      };

      const updateReturnData = {
        _id: quotesByReference[1]._id!,
        quote_ref: quotesByReference[1].quote_ref!,
        company_id: quotesByReference[1].company_id!,
        school_id: quotesByReference[1].school_id!,
        id_driver:
          assignedDriver === ""
            ? quotesByReference[1].id_driver!
            : assignedDriver,
        id_vehicle:
          assignedVehicle === ""
            ? quotesByReference[1].id_vehicle!
            : assignedVehicle,

        id_visitor: quotesByReference[1].id_visitor!,
        vehicle_type:
          selectedVehiclType === ""
            ? quotesByReference[1].vehicle_type!
            : selectedVehiclType,
        passengers_number:
          maxPassenger === ""
            ? quotesByReference[1].passengers_number!
            : Number(maxPassenger),
        luggage_details:
          selectedLuggageDetails === ""
            ? quotesByReference[1].luggage_details!
            : selectedLuggageDetails,
        journey_type:
          selectedJourneyType === ""
            ? quotesByReference[1].journey_type!
            : selectedJourneyType,
        notes: quotesByReference[1].notes!,
        heard_of_us: quotesByReference[1].heard_of_us!,
        pushed_price: quotesByReference[1].pushed_price!,
        status: quotesByReference[1].status!,
        manual_cost:
          vehiclePrice === ""
            ? quotesByReference[1].manual_cost!
            : vehiclePrice,
        progress: quotesByReference[1].progress!,
        balance: quotesByReference[1].balance!,
        deposit_percentage:
          deposit === "" ? quotesByReference[1].deposit_percentage! : deposit,
        deposit_amount:
          depositAmount === ""
            ? quotesByReference[1].deposit_amount!
            : depositAmount,
        automatic_cost: quotesByReference[1].automatic_cost!,
        start_point: returnCollectionPoint,
        pickup_time:
          selectedReturnTime === null
            ? quotesByReference[1].pickup_time!
            : formatTime(selectedReturnTime),

        mid_stations: quotesByReference[1].mid_stations!,
        dropoff_date: dropoffReturnDate,
        destination_point: returnDestinationPoint,
        type: quotesByReference[1].type!,
        total_price:
          totalPrice === "" ? quotesByReference[1].total_price! : totalPrice,
        date:
          selectedReturnDate === null
            ? quotesByReference[1].date!
            : formatDate(selectedReturnDate),
        return_date: quotesByReference[1].return_date!,
        return_time: quotesByReference[1].return_time!,
        category: quotesByReference[1].category!,
        dropoff_time: dropoffReturnTime,
      };

      if (quotesByReference.length === 1) {
        await updateQuote(updateData);
      }
      if (quotesByReference.length === 2) {
        await updateQuote(updateData);
        await updateQuote(updateReturnData);
      }
      notifySuccess();
      navigate("/bookings");
    } catch (error) {
      notifyError(error);
    }
  };

  const AlertConfirm = async (handleHideSelect: () => void) => {
    Swal.fire({
      title: "Submit your password",
      input: "password",
      html: `
        <p class="text-muted">This job is <b class="text-danger">not paid</b> yet.
        To assign a driver please enter a valid password.</p>
      `,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: "btn btn-secondary",
        cancelButton: "btn btn-danger",
      },
      preConfirm: async (password) => {
        try {
          const validPassword = "123456789";

          if (password !== validPassword) {
            throw new Error("Invalid password");
          }

          handleHideSelect();
          return {};
        } catch (error: any) {
          Swal.showValidationMessage(`Error: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const [selectHide, setSelectHide] = useState(false);
  const handleHideSelect = () => {
    setSelectHide(true);
  };

  const [modal_AddNote, setModal_AddNote] = useState<boolean>(false);
  function tog_AddNote() {
    setModal_AddNote(!modal_AddNote);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={7}>
              <Form onSubmit={onSubmitUpdateQuoteData}>
                <Card>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-danger fs-20">
                            <i className="ph ph-file-plus"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">
                          Assign Vehicle & Driver
                        </h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Header>
                      <div className="d-flex align-items-center p-1">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                              <i className="ph ph-user-square"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">Customer</h5>
                        </div>
                      </div>
                      <Row>
                        {/* Email == Done */}
                        <Col lg={5}>
                          <div className="mb-3">
                            <Form.Label htmlFor="supplierName-field">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              id="supplierName-field"
                              placeholder="Enter email"
                              defaultValue={
                                quoteLocation.state.id_visitor?.email!
                              }
                            />
                          </div>
                        </Col>
                        {/* Phone  == Done */}
                        <Col lg={3}>
                          <div className="mb-3">
                            <Form.Label htmlFor="supplierName-field">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="supplierName-field"
                              placeholder="Enter phone number"
                              defaultValue={
                                quoteLocation.state.id_visitor?.phone!
                              }
                            />
                          </div>
                        </Col>
                        {/* Name  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="customerName-field">
                              Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="customerName-field"
                              placeholder="Enter full name"
                              defaultValue={
                                quoteLocation.state.id_visitor?.name!
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Header>
                      <div className="d-flex align-items-center p-1">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                              <i className="ph ph-bus"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h4 className="mb-1">Transport</h4>
                        </div>
                      </div>
                      <Row className="mb-3 mt-2">
                        {/* Vehicle Type  == Pax */}
                        <Col lg={5}>
                          <div className="mb-3">
                            <h6>Passengers number</h6>
                            <Form.Control
                              type="text"
                              id="pax"
                              name="pax"
                              value={maxPassenger}
                              onChange={handleMaxPassenger}
                            />
                          </div>
                        </Col>
                        {/* Vehicle Type  == Done */}
                        <Col lg={7}>
                          <div className="mb-3">
                            <h6>Vehicle Type</h6>
                            {showVehicleType ? (
                              <select
                                className="form-select text-muted"
                                name="vehicleType"
                                id="vehicleType"
                                onChange={handleSelectVehicleType}
                              >
                                <option value="">Select Vehicle Type</option>
                                {AllVehicleTypes.map((types) => (
                                  <option key={types._id} value={types.type}>
                                    {types.type}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="fw-medium">
                                {quoteLocation?.state?.vehicle_type!}
                              </span>
                            )}
                            {!showVehicleType && (
                              <div className="d-flex justify-content-center mt-n1">
                                <label
                                  htmlFor="vehicleType"
                                  className="mb-0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  title="Select Vehicle Type"
                                >
                                  <span
                                    className="d-inline-block"
                                    onClick={() => setShowVehicleType(true)}
                                  >
                                    <span className="text-success cursor-pointer">
                                      <i className="bi bi-pen fs-14"></i>
                                    </span>
                                  </span>
                                </label>
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        {/* Luggage Details  == Done */}
                        <Col lg={7}>
                          <div className="mb-3">
                            <h6>Luggage Details</h6>
                            {showLuggageDetails ? (
                              <select
                                className="form-select text-muted"
                                name={`luggageDetails`}
                                id={`luggageDetails`}
                                onChange={handleSelectLuggageDetails}
                              >
                                <option value="">Select Luggage Details</option>
                                {AllLuggageDetails.map((luggage) => (
                                  <option
                                    key={luggage._id}
                                    value={luggage.description}
                                  >
                                    {luggage.description}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="fw-medium">
                                {quoteLocation.state.luggage_details}
                              </span>
                            )}
                            {!showLuggageDetails && (
                              <div className="d-flex justify-content-center mt-n1">
                                <label
                                  htmlFor={`luggageDetails`}
                                  className="mb-0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  title="Select Luggage Details"
                                >
                                  <span
                                    className="d-inline-block"
                                    onClick={() => setShowLuggageDetails(true)}
                                  >
                                    <span className="text-success cursor-pointer">
                                      <i className="bi bi-pen fs-14"></i>
                                    </span>
                                  </span>
                                </label>
                              </div>
                            )}
                          </div>
                        </Col>
                        {/* Journey Type  == Done */}
                        <Col lg={5}>
                          <div className="mb-3">
                            <h6>Journey Type</h6>
                            {showJourneyType ? (
                              <select
                                className="form-select text-muted"
                                name={`JourneyType`}
                                id={`JourneyType`}
                                onChange={handleSelectJourneyType}
                              >
                                <option value="">Select Journey Type</option>
                                {AllJourneys.map((journey) => (
                                  <option
                                    key={journey._id}
                                    value={journey.type}
                                  >
                                    {journey.type}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="fw-medium">
                                {quoteLocation.state.journey_type}
                              </span>
                            )}
                            {!showJourneyType && (
                              <div className="d-flex justify-content-center mt-n1">
                                <label
                                  htmlFor={`JourneyType`}
                                  className="mb-0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  title="Select Journey Type"
                                >
                                  <span
                                    className="d-inline-block"
                                    onClick={() => setShowJourneyType(true)}
                                  >
                                    <span className="text-success cursor-pointer">
                                      <i className="bi bi-pen fs-14"></i>
                                    </span>
                                  </span>
                                </label>
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Header>
                      <div className="d-flex align-items-center p-1">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                              <i className="ph ph-currency-gbp"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1 hstack gap-2">
                          <h5 className="card-title mb-1">Price</h5>
                          {quoteLocation?.state?.payment_type! === undefined ? (
                            <span className="badge bg-danger">Unpaid</span>
                          ) : (
                            <span className="badge bg-success">Paid</span>
                          )}
                        </div>
                      </div>
                      <Row>
                        {/* Vehicle Price  == Done */}
                        <Col lg={3}>
                          <div className="mb-3">
                            <label
                              htmlFor="vehiclePrice"
                              className="form-label"
                            >
                              Price
                            </label>
                            <Form.Control
                              type="text"
                              id="vehiclePrice"
                              name="vehiclePrice"
                              value={vehiclePrice}
                              onChange={handleVehiclePrice}
                            />
                          </div>
                        </Col>
                        {/* Deposit %  == Done */}
                        <Col lg={2}>
                          <div className="mb-3">
                            <Form.Label htmlFor="deposit">Deposit%</Form.Label>
                            <Form.Control
                              type="text"
                              id="deposit"
                              name="deposit"
                              value={deposit}
                              onChange={handleDeposit}
                            />
                          </div>
                        </Col>
                        {/* Deposit Amount  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="depositAmount">
                              Deposit Amount
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="depositAmount"
                              name="depositAmount"
                              value={`£ ${depositAmount}`}
                              readOnly
                            />
                          </div>
                        </Col>
                        {/* Total Price  == Done */}
                        <Col lg={3}>
                          <div className="mb-3">
                            <label htmlFor="totalPrice" className="form-label">
                              Total Price
                            </label>
                            <Form.Control
                              type="text"
                              id="totalPrice"
                              name="totalPrice"
                              value={`£ ${totalPrice}`}
                              readOnly
                            />
                          </div>
                        </Col>
                      </Row>
                    </Card.Header>
                    {quoteLocation.state.payment_type === undefined ? (
                      <Row className="d-flex justify-content-center mt-2">
                        <Col lg={6}>
                          <div
                            className="alert alert-warning alert-modern alert-dismissible fade show"
                            role="alert"
                            hidden={selectHide}
                          >
                            <i className="ri-alert-line icons"></i>{" "}
                            <strong>Warning</strong> -{" "}
                            <div className="d-flex align-items-center">
                              <p className="text-muted m-1 mt-2">
                                This job is{" "}
                                <strong className="text-dark">unpaid</strong>{" "}
                                yet. To assign a driver please enter your
                                password.
                              </p>
                              <span
                                className="badge rounded-pill text-bg-warning m-1 fs-20 pe-auto"
                                onClick={() => AlertConfirm(handleHideSelect)}
                              >
                                <i className="mdi mdi-account-tie"></i>
                                OVERRIDE
                              </span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <div className="mb-3">
                        <Row>
                          <Col lg={6}>
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
                                  <h5 className="card-title mb-1">Driver</h5>
                                </div>
                              </div>
                              <div className="mb-3">
                                {showDriver ? (
                                  <select
                                    className="form-select text-muted"
                                    name="driver"
                                    id="driver"
                                    onChange={handleAssignDriver}
                                  >
                                    <option value="">Driver Name</option>
                                    {resultDriver.map((drivers) => (
                                      <option value={drivers._id}>
                                        {drivers.firstname} {drivers.surname}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <span className="fw-medium">
                                    {
                                      quoteLocation?.state?.id_driver
                                        ?.firstname!
                                    }{" "}
                                    {quoteLocation?.state?.id_driver?.surname!}
                                  </span>
                                )}
                                {!showDriver && (
                                  <div className="d-flex justify-content-center mt-n1">
                                    <label
                                      htmlFor="vehicleType"
                                      className="mb-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="right"
                                      title="Select Vehicle Type"
                                    >
                                      <span
                                        className="d-inline-block"
                                        onClick={() => setShowDriver(true)}
                                      >
                                        <span className="text-success cursor-pointer">
                                          <i className="bi bi-pen fs-14"></i>
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                )}
                              </div>
                            </Card.Header>
                          </Col>
                          <Col lg={6}>
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
                                  <h5 className="card-title mb-1">Vehicle</h5>
                                </div>
                              </div>
                              {/* <div className="mb-3">
                                <select
                                  className="form-select text-muted"
                                  name="vehicle"
                                  id="vehicle"
                                  onChange={handleAssignVehicle}
                                >
                                  <option value="">Vehicle Ref</option>
                                  {result.map((vehicles) => (
                                    <option value={vehicles._id}>
                                      {vehicles.registration_number}
                                    </option>
                                  ))}
                                </select>
                              </div> */}
                              <div className="mb-3">
                                {showVehicle ? (
                                  <select
                                    className="form-select text-muted"
                                    name="vehicle"
                                    id="vehicle"
                                    onChange={handleAssignVehicle}
                                  >
                                    <option value="">Vehicle Ref</option>
                                    {result.map((vehicles) => (
                                      <option
                                        value={vehicles._id}
                                        key={vehicles._id}
                                      >
                                        {vehicles.registration_number}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <span className="fw-medium">
                                    {
                                      quoteLocation?.state?.id_vehicle
                                        ?.registration_number!
                                    }
                                  </span>
                                )}
                                {!showVehicle && (
                                  <div className="d-flex justify-content-center mt-n1">
                                    <label
                                      htmlFor="vehicleType"
                                      className="mb-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="right"
                                      title="Select Vehicle Type"
                                    >
                                      <span
                                        className="d-inline-block"
                                        onClick={() => setShowVehicle(true)}
                                      >
                                        <span className="text-success cursor-pointer">
                                          <i className="bi bi-pen fs-14"></i>
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                )}
                              </div>
                            </Card.Header>
                          </Col>
                        </Row>
                      </div>
                    )}
                    {selectHide ? (
                      <Row>
                        <Col lg={6}>
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
                                <h5 className="card-title mb-1">Driver</h5>
                              </div>
                            </div>
                            <div className="mb-3">
                              <select
                                className="form-select text-muted"
                                name="driver"
                                id="driver"
                                onChange={handleAssignDriver}
                              >
                                <option value="">Driver Name</option>
                                {resultDriver.map((drivers) => (
                                  <option value={drivers._id}>
                                    {drivers.firstname} {drivers.surname}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Card.Header>
                        </Col>
                        <Col lg={6}>
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
                                <h5 className="card-title mb-1">Vehicle</h5>
                              </div>
                            </div>
                            <div className="mb-3">
                              <select
                                className="form-select text-muted"
                                name="vehicle"
                                id="vehicle"
                                onChange={handleAssignVehicle}
                              >
                                <option value="">Vehicle Ref</option>
                                {result.map((vehicles) => (
                                  <option value={vehicles._id}>
                                    {vehicles.registration_number}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Card.Header>
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <div>
                      <Row>
                        <Col lg={12} className="p-3">
                          <div className="hstack gap-2 justify-content-end">
                            <Button
                              variant="success"
                              id="add-btn"
                              className="btn-sm"
                              type="submit"
                            >
                              Save & Send
                            </Button>
                            {/* <Button
                              variant="info"
                              id="add-btn"
                              className="btn-sm"
                              type="submit"
                            >
                              Quick Save
                            </Button> */}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Form>
            </Col>
            <Col lg={5}>
              <Card>
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                          <i className="ph ph-map-trifold"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1">Trip Details</h5>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <div className="hstack mb-2">
                      <h5>Journey 01</h5>
                      <button
                        type="button"
                        className="btn rounded-pill btn-soft-info ms-auto"
                        onClick={() => setShowUpdateJourney(!showUpdateJourney)}
                      >
                        Update
                      </button>
                    </div>
                    {showUpdateJourney ? (
                      <table className="table table-bordered border-info">
                        <thead>
                          <tr>
                            <th scope="col">Collection</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Pickup Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {quotesByReference[0]?.start_point?.placeName!}
                            </td>
                            <td>
                              {
                                quotesByReference[0]?.destination_point
                                  ?.placeName!
                              }
                            </td>
                            <td>
                              <span className="fw-medium">
                                {quotesByReference[0]?.date!}
                              </span>{" "}
                              at{" "}
                              <span className="fw-medium">
                                {quotesByReference[0]?.pickup_time!}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <Row>
                        <div className="mb-2">
                          <Form.Label htmlFor="collectionPoint">
                            Collection
                          </Form.Label>
                          <Autocomplete
                            onLoad={(autocomplete) =>
                              (collectionAutocompleteRef.current = autocomplete)
                            }
                            onPlaceChanged={handleCollectionPlaceChange}
                          >
                            <Form.Control
                              type="text"
                              id="collectionPoint"
                              name="collectionPoint"
                              value={collectionPoint.placeName}
                              onChange={(e) =>
                                setCollectionPoint((prev) => ({
                                  ...prev,
                                  placeName: e.target.value,
                                }))
                              }
                            />
                          </Autocomplete>
                        </div>
                        <div className="mb-2">
                          <Form.Label htmlFor="destinationPoint">
                            Destination
                          </Form.Label>
                          <Autocomplete
                            onLoad={(autocomplete) =>
                              (destinationAutocompleteRef.current =
                                autocomplete)
                            }
                            onPlaceChanged={handleDestinationPlaceChange}
                          >
                            <Form.Control
                              type="text"
                              id="destinationPoint"
                              name="destinationPoint"
                              value={destinationPoint.placeName}
                              onChange={(e) =>
                                setDestinationPoint((prev) => ({
                                  ...prev,
                                  placeName: e.target.value,
                                }))
                              }
                            />
                          </Autocomplete>
                        </div>
                        <div className="mb-2">
                          <Form.Label htmlFor="pickupDate">
                            Pickup Date :{" "}
                            <span>{quoteLocation.state.date}</span>
                            <div
                              className="d-flex justify-content-start mt-n3"
                              style={{ marginLeft: "180px" }}
                            >
                              <label
                                htmlFor="pickupDate"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select Pickup Date"
                              >
                                <span
                                  className="d-inline-block"
                                  onClick={() =>
                                    setShowPickUpDate(!showPickUpDate)
                                  }
                                >
                                  <span className="text-success cursor-pointer">
                                    <i className="bi bi-pen fs-14"></i>
                                  </span>
                                </span>
                              </label>
                            </div>
                          </Form.Label>
                          {showPickUpDate && (
                            <Flatpickr
                              className="form-control flatpickr-input"
                              placeholder="Select Date"
                              options={{
                                dateFormat: "d M, Y",
                              }}
                              onChange={handlePickupDateChange}
                            />
                          )}
                        </div>
                        <div>
                          <Form.Label htmlFor="pickupTime">
                            Pickup Time :{" "}
                            <span>{quoteLocation.state.pickup_time}</span>
                            <div
                              className="d-flex justify-content-start mt-n3"
                              style={{ marginLeft: "180px" }}
                            >
                              <label
                                htmlFor="pickupTime"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select Pickup Time"
                              >
                                <span
                                  className="d-inline-block"
                                  onClick={() =>
                                    setShowPickUpTime(!showPickUpTime)
                                  }
                                >
                                  <span className="text-success cursor-pointer">
                                    <i className="bi bi-pen fs-14"></i>
                                  </span>
                                </span>
                              </label>
                            </div>
                          </Form.Label>
                          {showPickUpTime && (
                            <Flatpickr
                              className="form-control"
                              options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                                time_24hr: true,
                              }}
                              onChange={handlePickupTimehange}
                            />
                          )}
                        </div>
                      </Row>
                    )}
                  </Row>
                  {quotesByReference.map((quote: any) =>
                    quote?.type! === "Return" ? (
                      <Row>
                        <div className="hstack mb-2">
                          <h5>Journey 02</h5>
                          <button
                            type="button"
                            className="btn rounded-pill btn-soft-info ms-auto"
                            onClick={() =>
                              setShowUpdateJourney2(!showUpdateJourney2)
                            }
                          >
                            Update
                          </button>
                        </div>
                        {showUpdateJourney2 ? (
                          <table className="table table-bordered border-info">
                            <thead>
                              <tr>
                                <th scope="col">Collection</th>
                                <th scope="col">Destination</th>
                                <th scope="col">Pickup Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{quote?.start_point?.placeName!}</td>
                                <td>{quote?.destination_point?.placeName!}</td>
                                <td>
                                  <span className="fw-medium">
                                    {quote?.date!}
                                  </span>{" "}
                                  at{" "}
                                  <span className="fw-medium">
                                    {quote?.pickup_time!}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        ) : (
                          <Row>
                            <div className="mb-2">
                              <Form.Label htmlFor="returnCollectionPoint">
                                Collection
                              </Form.Label>
                              <Autocomplete
                                onLoad={(autocomplete) =>
                                  (returnCollectionAutocompleteRef.current =
                                    autocomplete)
                                }
                                onPlaceChanged={
                                  handleCollectionPlaceForReturnChange
                                }
                              >
                                <Form.Control
                                  type="text"
                                  id="returnCollectionPoint"
                                  name="returnCollectionPoint"
                                  value={returnCollectionPoint.placeName}
                                  onChange={(e) =>
                                    setReturnCollectionPoint((prev) => ({
                                      ...prev,
                                      placeName: e.target.value,
                                    }))
                                  }
                                />
                              </Autocomplete>
                            </div>
                            <div className="mb-2">
                              <Form.Label htmlFor="returnDestinationPoint">
                                Destination
                              </Form.Label>
                              <Autocomplete
                                onLoad={(autocomplete) =>
                                  (returnDestinationAutocompleteRef.current =
                                    autocomplete)
                                }
                                onPlaceChanged={
                                  handleDestinationPlaceForReturnChange
                                }
                              >
                                <Form.Control
                                  type="text"
                                  id="returnDestinationPoint"
                                  name="returnDestinationPoint"
                                  value={returnDestinationPoint.placeName}
                                  onChange={(e) =>
                                    setReturnDestinationPoint((prev) => ({
                                      ...prev,
                                      placeName: e.target.value,
                                    }))
                                  }
                                />
                              </Autocomplete>
                            </div>
                            <div className="mb-2">
                              <Form.Label htmlFor="pickupDate">
                                Pickup Date : <span>{quote?.date!}</span>
                                <div
                                  className="d-flex justify-content-start mt-n3"
                                  style={{ marginLeft: "180px" }}
                                >
                                  <label
                                    htmlFor="pickupDate"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select Pickup Date"
                                  >
                                    <span
                                      className="d-inline-block"
                                      onClick={() =>
                                        setShowReturnDate(!showReturnDate)
                                      }
                                    >
                                      <span className="text-success cursor-pointer">
                                        <i className="bi bi-pen fs-14"></i>
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </Form.Label>
                              {showReturnDate && (
                                <Flatpickr
                                  className="form-control flatpickr-input"
                                  placeholder="Select Date"
                                  options={{
                                    dateFormat: "d M, Y",
                                  }}
                                  onChange={handleReturnDateChange}
                                />
                              )}
                            </div>
                            <div>
                              <Form.Label htmlFor="pickupTime">
                                Pickup Time : <span>{quote?.pickup_time!}</span>
                                <div
                                  className="d-flex justify-content-start mt-n3"
                                  style={{ marginLeft: "180px" }}
                                >
                                  <label
                                    htmlFor="pickupTime"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select Pickup Time"
                                  >
                                    <span
                                      className="d-inline-block"
                                      onClick={() =>
                                        setShowReturnTime(!showReturnTime)
                                      }
                                    >
                                      <span className="text-success cursor-pointer">
                                        <i className="bi bi-pen fs-14"></i>
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </Form.Label>
                              {showReturnTime && (
                                <Flatpickr
                                  className="form-control"
                                  options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true,
                                  }}
                                  onChange={handleReturnTimehange}
                                />
                              )}
                            </div>
                          </Row>
                        )}
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                          <i className="ph ph-note"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1">Note Details</h5>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  {quoteLocation?.state?.information?.length === 0 && (
                    <div className="d-flex justify-content-center">
                      <h6 className="text-warning">No Note for this Quote</h6>
                    </div>
                  )}
                  <SimpleBar
                    autoHide={true}
                    data-simplebar-track="dark"
                    style={{ maxHeight: "436px" }}
                  >
                    {quoteLocation?.state?.information?.map((note: any) => (
                      <Card>
                        <Row className="p-1">
                          <Col>
                            <span className="fw-bold">Note: </span>
                            <span className="fw-medium">{note.note}</span>
                          </Col>
                        </Row>
                        <Row className="p-1">
                          <Col>
                            <span className="fw-bold">By: </span>
                            <span className="fw-medium">{note.by.name}</span>
                          </Col>
                        </Row>
                        <Row className="p-1">
                          <Col>
                            <span className="fw-bold">Date: </span>
                            <span className="fw-medium">
                              {note.date}
                            </span> at{" "}
                            <span className="fw-medium">{note.time}</span>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </SimpleBar>
                </Card.Body>
                <Card.Footer>
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      id="add-btn"
                      className="btn btn-outline-dark btn-border btn-sm text-white"
                      onClick={tog_AddNote}
                    >
                      New Note
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          className="fade zoomIn"
          size="sm"
          show={modal_AddNote}
          onHide={() => {
            tog_AddNote();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              New Note
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <AddQuoteNoteModal
              modal_AddNote={modal_AddNote}
              setModal_AddNote={setModal_AddNote}
              quoteId={quoteLocation.state?._id!}
            />
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default NewQuoteBook;
