import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { useLocation, useNavigate } from "react-router-dom";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Swal from "sweetalert2";
import {
  useUpdateVehicleMutation,
  Vehicle,
} from "features/Vehicles/vehicleSlice";
import Select from "react-select";
import { useGetAllExtrasQuery } from "features/VehicleExtraLuxury/extraSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function convertToBase64(
  file: File
): Promise<{ base64Data: string; extension: string }> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      const [, base64Data] = base64String.split(","); // Extract only the Base64 data
      const extension = file.name.split(".").pop() ?? ""; // Get the file extension
      resolve({ base64Data, extension });
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsDataURL(file);
  });
}

const EditVehicle = () => {
  document.title = "Edit Vehicle | Bouden Coach Travel";
  const { data: AllVehicleTypes = [] } = useGetAllVehicleTypesQuery();
  const { data: AllExtras = [] } = useGetAllExtrasQuery();
  const vehicleLocation = useLocation();

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

  const [numPages, setNumPages] = useState<number | null>(null);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const [modal_MOTFile, setmodal_MOTFile] = useState<boolean>(false);
  function tog_MOTFileModal() {
    setmodal_MOTFile(!modal_MOTFile);
  }

  const [modal_TaxFile, setmodal_TaxFile] = useState<boolean>(false);
  function tog_TaxFileModal() {
    setmodal_TaxFile(!modal_TaxFile);
  }

  const [modal_InsuranceFile, setmodal_InsuranceFile] =
    useState<boolean>(false);
  function tog_InsuranceFileModal() {
    setmodal_InsuranceFile(!modal_InsuranceFile);
  }

  const [showVehicleModel, setShowVehicleModel] = useState<boolean>(false);

  const [showVehicleType, setShowVehicleType] = useState<boolean>(false);

  const [showRegistrationDate, setShowRegistrationDate] =
    useState<boolean>(false);

  const [showPurchaseDate, setShowPurchaseDate] = useState<boolean>(false);

  const [showSaleDate, setShowSaleDate] = useState<boolean>(false);

  const [showVehicleStatus, setShowVehicleStatus] = useState<boolean>(false);

  const [showFuelType, setShowFuelType] = useState<boolean>(false);

  const [showSpeedLimit, setShowSpeedLimit] = useState<boolean>(false);

  const [showInsuranceType, setShowInsuranceType] = useState<boolean>(false);

  const [showOwnership, setShowOwnership] = useState<boolean>(false);

  const [showMOTExpiry, setShowMOTExpiry] = useState<boolean>(false);

  const [showTaxExpiry, setShowTaxExpiry] = useState<boolean>(false);

  const [showInsuranceExpiry, setShowInsuranceExpiry] =
    useState<boolean>(false);

  const [showInspectionDue, setShowInspectionDue] = useState<boolean>(false);

  const [showServiceDue, setServiceDue] = useState<boolean>(false);

  const [showTachoCalibration, setShowTachoCalibratio] =
    useState<boolean>(false);

  const [showCOIFCertificateDate, setShowCOIFCertificateDate] =
    useState<boolean>(false);

  const [showHPStartDate, setHPStartDate] = useState<boolean>(false);

  const [showHPEndDate, setShowHPEndDate] = useState<boolean>(false);

  const [vehicleReg, setVehicleReg] = useState<string>(
    vehicleLocation?.state?.registration_number ?? ""
  );

  const [selectedVehicleModel, setSelectedVehicleModel] = useState<string>("");

  const [selectedVehicleStatus, setSelectedVehicleStatus] =
    useState<string>("");

  const [selectedFuelType, setSelectedFuelType] = useState<string>("");

  const [selectedSpeedLimit, setSelectedSpeedLimit] = useState<string>("");

  const [selectedInsuranceType, setSelectedInsuranceType] =
    useState<string>("");

  const [selectedOwnership, setSelectedOwnership] = useState<string>("");

  const [vehicleColor, setVehicleColor] = useState<string>(
    vehicleLocation?.state?.color ?? ""
  );
  const [maxPassenger, setMaxPassenger] = useState<string>(
    vehicleLocation?.state?.max_passengers ?? ""
  );
  const [fleetNumber, setFleetNumber] = useState<string>(
    vehicleLocation?.state?.fleet_number ?? ""
  );
  const [engineNumber, setEngineNumber] = useState<string>(
    vehicleLocation?.state?.engine_number ?? ""
  );
  const [ownedOwnerName, setOwnedOwnerName] = useState<string>(
    vehicleLocation?.state?.owner_name ?? ""
  );
  const [vehicleMileage, setVehicleMileage] = useState<string>(
    vehicleLocation?.state?.mileage ?? ""
  );
  const [selectedRegistrationDate, setSelectedRegistrationDate] =
    useState<Date | null>(null);

  const [selectedPurchaseDate, setSelectedPurchaseDate] = useState<Date | null>(
    null
  );

  const [selectedSaleDate, setSelectedSaleDate] = useState<Date | null>(null);

  const [selectedMOTExpiryDate, setSelectedMOTExpiryDate] =
    useState<Date | null>(null);

  const [selectedInspectionDue, setSelectedInspectionDue] =
    useState<Date | null>(null);

  const [selectedTaxExpiryDate, setSelectedTaxExpiryDate] =
    useState<Date | null>(null);

  const [selectedInsuranceExpiryDate, setSelectedInsuranceExpiryDate] =
    useState<Date | null>(null);

  const [selectedServiceDue, setSelectedServiceDuee] = useState<Date | null>(
    null
  );

  const [selectedTachoCalibration, setSelectedTachoCalibration] =
    useState<Date | null>(null);

  const [selectedCOIFCertificateDate, setSelectedCOIFCertificateDate] =
    useState<Date | null>(null);

  const [selectedHPStartDate, setSelectedHPStartDate] = useState<Date | null>(
    null
  );

  const [selectedHPEndDate, setSelectedHPEndDate] = useState<Date | null>(null);

  const [purchasePrice, setPurchasePrice] = useState<string>(
    vehicleLocation?.state?.purchase_price ?? ""
  );
  const [depotName, setDepotName] = useState<string>(
    vehicleLocation?.state?.depot_name ?? ""
  );
  const [vehicleManufacturer, setVehicleManufacturer] = useState<string>(
    vehicleLocation?.state?.manufacturer ?? ""
  );
  const [engineSize, setEngineSize] = useState<string>(
    vehicleLocation?.state?.engine_size ?? ""
  );
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState<string>(
    vehicleLocation?.state?.insurance_policy_number ?? ""
  );
  const [vehicleNotes, setVehicleNotes] = useState<string>(
    vehicleLocation?.state?.note ?? ""
  );
  const [cOIFCertificateNumber, setCOIFCertificateNumber] = useState<string>(
    vehicleLocation?.state?.coif_certificate_number ?? ""
  );
  const [hPReferenceNo, setHPReferenceNo] = useState<string>(
    vehicleLocation?.state?.hp_reference_no ?? ""
  );
  const [monthlyRepaymentAmount, setMonthlyRepaymentAmount] = useState<string>(
    vehicleLocation?.state?.monthly_repayment_amount ?? ""
  );
  const [hpCompany, setHpCompany] = useState<string>(
    vehicleLocation?.state?.hp_company ?? ""
  );

  const [selectedVehiclType, setSelectedVehicleType] = useState<string>("");

  const handleVehicleReg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleReg(e.target.value);
  };
  const handleSelectVehicleModel = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleModel(value);
  };
  const handleSelectDepotName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepotName(event.target.value);
  };
  const handleVehicleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleColor(e.target.value);
  };
  const handleMaxPassenger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPassenger(e.target.value);
  };
  const handleFleetNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFleetNumber(e.target.value);
  };
  const handleOwnedOwnerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnedOwnerName(e.target.value);
  };
  const handleEngineNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEngineNumber(e.target.value);
  };
  const handleVehicleMileage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleMileage(e.target.value);
  };
  const handlePurchasePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasePrice(e.target.value);
  };
  const handleManufacturer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleManufacturer(e.target.value);
  };
  const handleEngineSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEngineSize(e.target.value);
  };
  const handleInsurancePolicyNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsurancePolicyNumber(e.target.value);
  };
  const handleVehicleNotes = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVehicleNotes(e.target.value);
  };
  const handleCOIFCertificateNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCOIFCertificateNumber(e.target.value);
  };
  const handleHPReferenceNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHPReferenceNo(e.target.value);
  };
  const handleMonthlyRepaymentAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMonthlyRepaymentAmount(e.target.value);
  };
  const handleHpCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHpCompany(e.target.value);
  };
  const handleSelectVehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleType(value);
  };
  const handleRegistrationDateChange = (selectedDates: Date[]) => {
    setSelectedRegistrationDate(selectedDates[0]);
  };
  const handlePurchaseDateChange = (selectedDates: Date[]) => {
    setSelectedPurchaseDate(selectedDates[0]);
  };
  const handleSaleDateChange = (selectedDates: Date[]) => {
    setSelectedSaleDate(selectedDates[0]);
  };
  const handleSelectVehicleStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicleStatus(value);
  };
  const handleSelectFuelType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedFuelType(value);
  };
  const handleSelectSpeedLimit = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedSpeedLimit(value);
  };
  const handleSelectInsuranceType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedInsuranceType(value);
  };
  const handleSelectOwnership = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedOwnership(value);
  };
  const handleMOTExpiryDateChange = (selectedDates: Date[]) => {
    setSelectedMOTExpiryDate(selectedDates[0]);
  };
  const handleTaxDateChange = (selectedDates: Date[]) => {
    setSelectedTaxExpiryDate(selectedDates[0]);
  };
  const handleInsuranceDateChange = (selectedDates: Date[]) => {
    setSelectedInsuranceExpiryDate(selectedDates[0]);
  };
  const handleInspectionDateChange = (selectedDates: Date[]) => {
    setSelectedInspectionDue(selectedDates[0]);
  };
  const handleServiceDueDateChange = (selectedDates: Date[]) => {
    setSelectedServiceDuee(selectedDates[0]);
  };
  const handleTachoCalibrationDateChange = (selectedDates: Date[]) => {
    setSelectedTachoCalibration(selectedDates[0]);
  };
  const handleCOIFCertificateDateChange = (selectedDates: Date[]) => {
    setSelectedCOIFCertificateDate(selectedDates[0]);
  };
  const handleHPStarDateChange = (selectedDates: Date[]) => {
    setSelectedHPStartDate(selectedDates[0]);
  };
  const handleHPEndDateChange = (selectedDates: Date[]) => {
    setSelectedHPEndDate(selectedDates[0]);
  };

  const [selectedValues, setSelectedValues] = useState(
    vehicleLocation?.state?.extra || []
  );

  const allExtraOptions = AllExtras.map((extra) => ({
    label: extra.name,
    value: extra.name,
  }));

  const defaultExtraOptions =
    vehicleLocation?.state?.extra?.map((item: any) => ({
      label: item,
      value: item,
    })) || [];

  const handleSelectValueColumnChange = (selectedOptions: any) => {
    const values = selectedOptions.map((option: any) => option.value);
    setSelectedValues(values);
  };

  const navigate = useNavigate();

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Driver Account Updated successfully",
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

  const [updateVehicleProfileMutation] = useUpdateVehicleMutation();

  const initialVehicleAccount = {
    _id: "",
    registration_number: "",
    model: "",
    color: "",
    type: "",
    max_passengers: "",
    fleet_number: "",
    engine_number: "",
    sale_date: "",
    purchase_price: "",
    purchase_date: "",
    depot_name: "",
    registration_date: "",
    mileage: "",
    statusVehicle: "",
    manufacturer: "",
    engine_size: "",
    fuel_type: "",
    speed_limit: "",
    insurance_type: "",
    insurance_policy_number: "",
    ownership: "",
    owner_name: "",
    note: "",
    extra: [""],
    vehicle_images_base64_string: [""],
    vehicle_images_extension: [""],
    vehicle_images: [""],
    mot_expiry: "",
    mot_file_base64_string: "",
    mot_file_extension: "",
    tax_expiry: "",
    tax_file_base64_string: "",
    tax_file_extension: "",
    insurance_file_base64_string: "",
    insurance_file_extension: "",
    insurance_expiry: "",
    inspection_due: "",
    service_due: "",
    tacho_calibration_due: "",
    coif_certificate_number: "",
    coif_certificate_date: "",
    hp_start_date: "",
    hp_end_date: "",
    hp_reference_no: "",
    monthly_repayment_amount: "",
    hp_company: "",
    mot_file: "",
    tax_file: "",
    insurance_file: "",
  };

  const [updateVehicleProfile, setUpdateVehicleProfile] = useState<Vehicle>(
    initialVehicleAccount
  );

  // Avatar
  const handleFileUpload = async (files: File[]) => {
    const base64Images = await Promise.all(
      files.map(async (file: File) => {
        const { base64Data, extension } = await convertToBase64(file);
        return {
          base64Data,
          extension,
          fileName: file.name,
        };
      })
    );

    setUpdateVehicleProfile((prevState) => ({
      ...prevState,
      vehicle_images: [
        ...prevState.vehicle_images,
        ...base64Images.map(
          (img) => `data:image/${img.extension};base64,${img.base64Data}`
        ),
      ],
      vehicle_images_base64_string: [
        ...prevState.vehicle_images_base64_string,
        ...base64Images.map((img) => img.base64Data),
      ],
      vehicle_images_extension: [
        ...prevState.vehicle_images_extension,
        ...base64Images.map((img) => img.extension),
      ],
    }));
  };

  const allImages = [
    ...vehicleLocation.state.vehicle_images,
    // ...updateVehicleProfile.vehicle_images,
  ];

  // Handle image removal
  const handleRemoveImage = (index: any) => {
    setUpdateVehicleProfile((prevState) => {
      const newVehicleImages = [...prevState.vehicle_images];
      newVehicleImages.splice(index, 1);

      const newVehicleImagesBase64String = [
        ...prevState.vehicle_images_base64_string,
      ];
      newVehicleImagesBase64String.splice(index, 1);

      const newVehicleImagesExtension = [...prevState.vehicle_images_extension];
      newVehicleImagesExtension.splice(index, 1);

      return {
        ...prevState,
        vehicle_images: newVehicleImages,
        vehicle_images_base64_string: newVehicleImagesBase64String,
        vehicle_images_extension: newVehicleImagesExtension,
      };
    });
  };

  // mot file
  const handleFileUploadMotFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("mot_file_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateVehicleProfile({
        ...updateVehicleProfile,
        mot_file: profileImage,
        mot_file_base64_string: base64Data,
        mot_file_extension: extension,
      });
    }
  };

  // tax file
  const handleFileUploadTaxFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("tax_file_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateVehicleProfile({
        ...updateVehicleProfile,
        tax_file: profileImage,
        tax_file_base64_string: base64Data,
        tax_file_extension: extension,
      });
    }
  };

  // insurance file
  const handleFileUploadInsuranceFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("insurance_file_base64_string") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateVehicleProfile({
        ...updateVehicleProfile,
        insurance_file: profileImage,
        insurance_file_base64_string: base64Data,
        insurance_file_extension: extension,
      });
    }
  };

  const {
    _id,
    registration_number,
    model,
    color,
    type,
    max_passengers,
    fleet_number,
    engine_number,
    sale_date,
    purchase_price,
    purchase_date,
    depot_name,
    registration_date,
    mileage,
    statusVehicle,
    manufacturer,
    engine_size,
    fuel_type,
    speed_limit,
    insurance_type,
    insurance_policy_number,
    ownership,
    owner_name,
    note,
    extra,
    vehicle_images_base64_string,
    vehicle_images_extension,
    vehicle_images,
    mot_expiry,
    mot_file_base64_string,
    mot_file_extension,
    tax_expiry,
    tax_file_base64_string,
    tax_file_extension,
    insurance_file_base64_string,
    insurance_file_extension,
    insurance_expiry,
    inspection_due,
    service_due,
    tacho_calibration_due,
    coif_certificate_number,
    coif_certificate_date,
    hp_start_date,
    hp_end_date,
    hp_reference_no,
    monthly_repayment_amount,
    hp_company,
    mot_file,
    tax_file,
    insurance_file,
  } = updateVehicleProfile as Vehicle;

  const onSubmitUpdateDriverProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      updateVehicleProfile["_id"] = vehicleLocation?.state?._id!;
      if (vehicleReg === "") {
        updateVehicleProfile["registration_number"] =
          vehicleLocation?.state?.registration_number!;
      } else {
        updateVehicleProfile["registration_number"] = vehicleReg;
      }

      if (selectedVehicleModel === "") {
        updateVehicleProfile["model"] = vehicleLocation?.state?.model!;
      } else {
        updateVehicleProfile["model"] = selectedVehicleModel;
      }

      if (vehicleColor === "") {
        updateVehicleProfile["color"] = vehicleLocation?.state?.color!;
      } else {
        updateVehicleProfile["color"] = vehicleColor;
      }

      if (selectedVehiclType === "") {
        updateVehicleProfile["type"] = vehicleLocation?.state?.type!;
      } else {
        updateVehicleProfile["type"] = selectedVehiclType;
      }

      if (maxPassenger === "") {
        updateVehicleProfile["max_passengers"] =
          vehicleLocation?.state?.max_passengers!;
      } else {
        updateVehicleProfile["max_passengers"] = maxPassenger;
      }

      if (fleetNumber === "") {
        updateVehicleProfile["fleet_number"] =
          vehicleLocation?.state?.fleet_number!;
      } else {
        updateVehicleProfile["fleet_number"] = fleetNumber;
      }

      if (engineNumber === "") {
        updateVehicleProfile["engine_number"] =
          vehicleLocation?.state?.engine_number!;
      } else {
        updateVehicleProfile["engine_number"] = engineNumber;
      }

      if (vehicleMileage === "") {
        updateVehicleProfile["mileage"] = vehicleLocation?.state?.mileage!;
      } else {
        updateVehicleProfile["mileage"] = vehicleMileage;
      }

      if (selectedRegistrationDate === null) {
        updateVehicleProfile["registration_date"] =
          vehicleLocation?.state?.registration_date!;
      } else {
        updateVehicleProfile["registration_date"] =
          selectedRegistrationDate?.toDateString()!;
      }

      if (depotName === "") {
        updateVehicleProfile["depot_name"] =
          vehicleLocation?.state?.depot_name!;
      } else {
        updateVehicleProfile["depot_name"] = depotName;
      }

      if (selectedPurchaseDate === null) {
        updateVehicleProfile["purchase_date"] =
          vehicleLocation?.state?.purchase_date!;
      } else {
        updateVehicleProfile["purchase_date"] =
          selectedPurchaseDate?.toDateString()!;
      }

      if (purchasePrice === "") {
        updateVehicleProfile["purchase_price"] =
          vehicleLocation?.state?.purchase_price!;
      } else {
        updateVehicleProfile["purchase_price"] = purchasePrice;
      }

      if (selectedSaleDate === null) {
        updateVehicleProfile["sale_date"] = vehicleLocation?.state?.sale_date!;
      } else {
        updateVehicleProfile["sale_date"] = selectedSaleDate?.toDateString()!;
      }

      if (selectedVehicleStatus === "") {
        updateVehicleProfile["statusVehicle"] =
          vehicleLocation?.state?.statusVehicle!;
      } else {
        updateVehicleProfile["statusVehicle"] = selectedVehicleStatus;
      }

      if (vehicleManufacturer === "") {
        updateVehicleProfile["manufacturer"] =
          vehicleLocation?.state?.manufacturer!;
      } else {
        updateVehicleProfile["manufacturer"] = vehicleManufacturer;
      }

      if (engineSize === "") {
        updateVehicleProfile["engine_size"] =
          vehicleLocation?.state?.engine_size!;
      } else {
        updateVehicleProfile["engine_size"] = engineSize;
      }

      if (selectedFuelType === "") {
        updateVehicleProfile["fuel_type"] = vehicleLocation?.state?.fuel_type!;
      } else {
        updateVehicleProfile["fuel_type"] = selectedFuelType;
      }

      if (selectedSpeedLimit === "") {
        updateVehicleProfile["speed_limit"] =
          vehicleLocation?.state?.speed_limit!;
      } else {
        updateVehicleProfile["speed_limit"] = selectedSpeedLimit;
      }

      if (selectedInsuranceType === "") {
        updateVehicleProfile["insurance_type"] =
          vehicleLocation?.state?.insurance_type!;
      } else {
        updateVehicleProfile["insurance_type"] = selectedInsuranceType;
      }

      if (insurancePolicyNumber === "") {
        updateVehicleProfile["insurance_policy_number"] =
          vehicleLocation?.state?.insurance_policy_number!;
      } else {
        updateVehicleProfile["insurance_policy_number"] = insurancePolicyNumber;
      }

      if (selectedOwnership === "") {
        updateVehicleProfile["ownership"] = vehicleLocation?.state?.ownership!;
      } else {
        updateVehicleProfile["ownership"] = selectedOwnership;
      }

      if (vehicleNotes === "") {
        updateVehicleProfile["note"] = vehicleLocation?.state?.note!;
      } else {
        updateVehicleProfile["note"] = vehicleNotes;
      }

      if (selectedMOTExpiryDate === null) {
        updateVehicleProfile["mot_expiry"] =
          vehicleLocation?.state?.mot_expiry!;
      } else {
        updateVehicleProfile["mot_expiry"] =
          selectedMOTExpiryDate?.toDateString()!;
      }

      if (selectedTaxExpiryDate === null) {
        updateVehicleProfile["tax_expiry"] =
          vehicleLocation?.state?.tax_expiry!;
      } else {
        updateVehicleProfile["tax_expiry"] =
          selectedTaxExpiryDate?.toDateString()!;
      }

      if (selectedInspectionDue === null) {
        updateVehicleProfile["inspection_due"] =
          vehicleLocation?.state?.inspection_due!;
      } else {
        updateVehicleProfile["inspection_due"] =
          selectedInspectionDue?.toDateString()!;
      }

      if (selectedInsuranceExpiryDate === null) {
        updateVehicleProfile["insurance_expiry"] =
          vehicleLocation?.state?.insurance_expiry!;
      } else {
        updateVehicleProfile["insurance_expiry"] =
          selectedInsuranceExpiryDate?.toDateString()!;
      }

      if (selectedServiceDue === null) {
        updateVehicleProfile["service_due"] =
          vehicleLocation?.state?.service_due!;
      } else {
        updateVehicleProfile["service_due"] =
          selectedServiceDue?.toDateString()!;
      }

      if (selectedTachoCalibration === null) {
        updateVehicleProfile["tacho_calibration_due"] =
          vehicleLocation?.state?.tacho_calibration_due!;
      } else {
        updateVehicleProfile["tacho_calibration_due"] =
          selectedTachoCalibration?.toDateString()!;
      }

      if (selectedCOIFCertificateDate === null) {
        updateVehicleProfile["coif_certificate_date"] =
          vehicleLocation?.state?.coif_certificate_date!;
      } else {
        updateVehicleProfile["coif_certificate_date"] =
          selectedCOIFCertificateDate?.toDateString()!;
      }

      if (selectedHPStartDate === null) {
        updateVehicleProfile["hp_start_date"] =
          vehicleLocation?.state?.hp_start_date!;
      } else {
        updateVehicleProfile["hp_start_date"] =
          selectedHPStartDate?.toDateString()!;
      }

      if (selectedHPEndDate === null) {
        updateVehicleProfile["hp_end_date"] =
          vehicleLocation?.state?.hp_end_date!;
      } else {
        updateVehicleProfile["hp_end_date"] =
          selectedHPEndDate?.toDateString()!;
      }

      if (cOIFCertificateNumber === "") {
        updateVehicleProfile["coif_certificate_number"] =
          vehicleLocation?.state?.coif_certificate_number!;
      } else {
        updateVehicleProfile["coif_certificate_number"] = cOIFCertificateNumber;
      }

      if (hPReferenceNo === "") {
        updateVehicleProfile["hp_reference_no"] =
          vehicleLocation?.state?.hp_reference_no!;
      } else {
        updateVehicleProfile["hp_reference_no"] = hPReferenceNo;
      }

      if (monthlyRepaymentAmount === "") {
        updateVehicleProfile["monthly_repayment_amount"] =
          vehicleLocation?.state?.monthly_repayment_amount!;
      } else {
        updateVehicleProfile["monthly_repayment_amount"] =
          monthlyRepaymentAmount;
      }

      if (hpCompany === "") {
        updateVehicleProfile["hp_company"] =
          vehicleLocation?.state?.hp_company!;
      } else {
        updateVehicleProfile["hp_company"] = hpCompany;
      }

      if (ownedOwnerName === "") {
        updateVehicleProfile["owner_name"] =
          vehicleLocation?.state?.owner_name!;
      } else {
        updateVehicleProfile["owner_name"] = ownedOwnerName;
      }

      updateVehicleProfile["extra"] = selectedValues;

      if (!updateVehicleProfile.mot_file_base64_string) {
        updateVehicleProfile["mot_file"] = vehicleLocation?.state?.mot_file!;
        updateVehicleProfile["mot_file_base64_string"] =
          vehicleLocation?.state?.mot_file_base64_string!;
        updateVehicleProfile["mot_file_extension"] =
          vehicleLocation?.state?.mot_file_extension!;
      }

      if (!updateVehicleProfile.tax_file_base64_string) {
        updateVehicleProfile["tax_file"] = vehicleLocation?.state?.tax_file!;
        updateVehicleProfile["tax_file_base64_string"] =
          vehicleLocation?.state?.tax_file_base64_string!;
        updateVehicleProfile["tax_file_extension"] =
          vehicleLocation?.state?.tax_file_extension!;
      }

      if (!updateVehicleProfile.insurance_file_base64_string) {
        updateVehicleProfile["insurance_file"] =
          vehicleLocation?.state?.insurance_file!;
        updateVehicleProfile["insurance_file_base64_string"] =
          vehicleLocation?.state?.insurance_file_base64_string!;
        updateVehicleProfile["insurance_file_extension"] =
          vehicleLocation?.state?.insurance_file_extension!;
      }
      updateVehicleProfileMutation(updateVehicleProfile)
        .then(() => navigate("/vehicles"))
        .then(() => notifySuccess());
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Card>
              <Form onSubmit={onSubmitUpdateDriverProfile}>
                <Card.Body>
                  <Tab.Container defaultActiveKey="home1">
                    <Nav
                      as="ul"
                      variant="pills"
                      className="nav-pills-custom nav-info nav-justified mb-3 "
                    >
                      <Nav.Item as="li">
                        <Nav.Link eventKey="home1">
                          <i className="mdi mdi-car-info fs-20 mb-1 align-middle"></i>{" "}
                          Profile
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="profile1">
                          <i className="mdi mdi-card-bulleted-outline align-middle fs-20 mb-1"></i>
                          Documents
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="home1">
                        <Row>
                          <Col lg={7}>
                            <Card>
                              <Card.Body>
                                <div className="mb-3">
                                  {/* Avatar ===  */}
                                  <Row className="mb-3">
                                    <div className="d-flex justify-content-center flex-wrap">
                                      {allImages.length > 0 ? (
                                        allImages.map((image, index) => (
                                          <div
                                            key={index}
                                            className="image-wrapper"
                                          >
                                            <Image
                                              src={
                                                image.startsWith("data:image")
                                                  ? image
                                                  : `${process.env.REACT_APP_BASE_URL}/VehicleFiles/vehicleImages/${image}`
                                              }
                                              alt={`Vehicle Image ${index + 1}`}
                                              className="img-thumbnail p-1 bg-body mt-n3"
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleRemoveImage(index)
                                              }
                                              className="btn btn-danger btn-sm"
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        ))
                                      ) : (
                                        <p>No images available</p>
                                      )}
                                    </div>
                                    <div className="d-flex justify-content-center mt-n2">
                                      <label
                                        htmlFor="profile_image"
                                        className="mb-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Select affiliate logo"
                                      >
                                        <span className="avatar-xs d-inline-block">
                                          <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                            <i className="bi bi-pen"></i>
                                          </span>
                                        </span>
                                      </label>
                                      <input
                                        className="form-control d-none"
                                        type="file"
                                        name="profile_image"
                                        id="profile_image"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                          const files = e.target.files;
                                          if (files) {
                                            handleFileUpload(Array.from(files));
                                          }
                                        }}
                                      />
                                    </div>
                                  </Row>
                                  <Row>
                                    {/* Vehicle reg  == Done */}
                                    <Col lg={12}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="registration_number">
                                          Vehicle reg
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="registration_number"
                                          name="registration_number"
                                          value={vehicleReg}
                                          onChange={handleVehicleReg}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/* Vehicle make/model  == Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Vehicle make/model :{" "}
                                          <span>
                                            {vehicleLocation.state.model}
                                          </span>
                                          <div
                                            className="d-flex justify-content-start mt-n2"
                                            style={{ marginLeft: "240px" }}
                                          >
                                            <label
                                              htmlFor="id_file"
                                              className="mb-0"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="right"
                                              title="Select Driver Status"
                                            >
                                              <span
                                                className="d-inline-block"
                                                onClick={() =>
                                                  setShowVehicleModel(
                                                    !showVehicleModel
                                                  )
                                                }
                                              >
                                                <span className="text-success cursor-pointer">
                                                  <i className="bi bi-pen fs-14"></i>
                                                </span>
                                              </span>
                                            </label>
                                          </div>
                                        </Form.Label>
                                        {showVehicleModel && (
                                          <select
                                            className="form-select text-muted"
                                            name="choices-single-default"
                                            id="statusSelect"
                                            onChange={handleSelectVehicleModel}
                                          >
                                            <option value="">Select</option>
                                            <option value="Tesla">Tesla</option>
                                            <option value="BMW">BMW</option>
                                            <option value="Ford">Ford</option>
                                            <option value="Porsche">
                                              Porsche
                                            </option>
                                            <option value="Bentley">
                                              Bentley
                                            </option>
                                            <option value="Toyota">
                                              Toyota
                                            </option>
                                            <option value="Audi">Audi</option>
                                            <option value="Jeep">Jeep</option>
                                            <option value="Jaguar">
                                              Jaguar
                                            </option>
                                            <option value="Rolls-Royce">
                                              Rolls-Royce
                                            </option>
                                            <option value="Mercedes-Benz">
                                              Mercedes-Benz
                                            </option>
                                            <option value="Infiniti">
                                              Infiniti
                                            </option>
                                          </select>
                                        )}
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/* Vehicle_color  == Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="color">
                                          Vehicle color
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="color"
                                          name="color"
                                          value={vehicleColor}
                                          onChange={handleVehicleColor}
                                        />
                                      </div>
                                    </Col>
                                    {/* Vehicle_Type  === Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Vehicle Type :{" "}
                                          <span>
                                            {vehicleLocation.state.type}
                                          </span>
                                          <div
                                            className="d-flex justify-content-start mt-n3"
                                            style={{ marginLeft: "200px" }}
                                          >
                                            <label
                                              htmlFor="id_file"
                                              className="mb-0"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="right"
                                              title="Select Driver Status"
                                            >
                                              <span
                                                className="d-inline-block"
                                                onClick={() =>
                                                  setShowVehicleType(
                                                    !showVehicleType
                                                  )
                                                }
                                              >
                                                <span className="text-success cursor-pointer">
                                                  <i className="bi bi-pen fs-14"></i>
                                                </span>
                                              </span>
                                            </label>
                                          </div>
                                        </Form.Label>
                                        {showVehicleType && (
                                          <select
                                            className="form-select text-muted"
                                            name="vehicleType"
                                            id="vehicleType"
                                            onChange={handleSelectVehicleType}
                                          >
                                            <option value="">Select</option>
                                            {AllVehicleTypes.map(
                                              (vehicleType) => (
                                                <option
                                                  value={vehicleType.type}
                                                  key={vehicleType?._id!}
                                                >
                                                  {vehicleType.type}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        )}
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/*Max_Passenger  === Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="pax">
                                          Max Passenger
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="pax"
                                          name="pax"
                                          value={maxPassenger}
                                          onChange={handleMaxPassenger}
                                        />
                                      </div>
                                    </Col>
                                    {/* Fleet_Number == Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="fleet_number">
                                          Fleet Number
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="fleet_number"
                                          name="fleet_number"
                                          value={fleetNumber}
                                          onChange={handleFleetNumber}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/* Engine_number == Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="engine_number">
                                          Engine Number
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="engine_number"
                                          name="engine_number"
                                          value={engineNumber}
                                          onChange={handleEngineNumber}
                                        />
                                      </div>
                                    </Col>
                                    {/* Mileage / KM == Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="mileage">
                                          Mileage / KM
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="mileage"
                                          name="mileage"
                                          value={vehicleMileage}
                                          onChange={handleVehicleMileage}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/* Registration_Date  === Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Registration date :{" "}
                                          <span>
                                            {
                                              vehicleLocation.state
                                                .registration_date
                                            }
                                          </span>
                                          <div
                                            className="d-flex justify-content-start mt-n3"
                                            style={{ marginLeft: "230px" }}
                                          >
                                            <label
                                              htmlFor="id_file"
                                              className="mb-0"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="right"
                                              title="Select Driver Status"
                                            >
                                              <span
                                                className="d-inline-block"
                                                onClick={() =>
                                                  setShowRegistrationDate(
                                                    !showRegistrationDate
                                                  )
                                                }
                                              >
                                                <span className="text-success cursor-pointer">
                                                  <i className="bi bi-pen fs-14"></i>
                                                </span>
                                              </span>
                                            </label>
                                          </div>
                                        </Form.Label>
                                        {showRegistrationDate && (
                                          <Flatpickr
                                            className="form-control flatpickr-input"
                                            placeholder="Select Date"
                                            options={{
                                              dateFormat: "d M, Y",
                                            }}
                                            onChange={
                                              handleRegistrationDateChange
                                            }
                                          />
                                        )}
                                      </div>
                                    </Col>
                                    {/* Depot_name  === Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="depotName">
                                          Depot name
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="depotName"
                                          name="depotName"
                                          value={depotName}
                                          onChange={handleSelectDepotName}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/* Purchase_date  == Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Purchase Date :{" "}
                                          <span>
                                            {
                                              vehicleLocation.state
                                                .purchase_date
                                            }
                                          </span>
                                          <div
                                            className="d-flex justify-content-start mt-n3"
                                            style={{ marginLeft: "230px" }}
                                          >
                                            <label
                                              htmlFor="id_file"
                                              className="mb-0"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="right"
                                              title="Select Driver Status"
                                            >
                                              <span
                                                className="d-inline-block"
                                                onClick={() =>
                                                  setShowPurchaseDate(
                                                    !showPurchaseDate
                                                  )
                                                }
                                              >
                                                <span className="text-success cursor-pointer">
                                                  <i className="bi bi-pen fs-14"></i>
                                                </span>
                                              </span>
                                            </label>
                                          </div>
                                        </Form.Label>
                                        {showPurchaseDate && (
                                          <Flatpickr
                                            className="form-control flatpickr-input"
                                            placeholder="Select Date"
                                            options={{
                                              dateFormat: "d M, Y",
                                            }}
                                            onChange={handlePurchaseDateChange}
                                          />
                                        )}
                                      </div>
                                    </Col>
                                    {/* Purchase_price  == Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="purchase_price">
                                          Purchase Price
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="purchase_price"
                                          name="purchase_price"
                                          value={purchasePrice}
                                          onChange={handlePurchasePrice}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/* Sale_date  === Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Sale Date :{" "}
                                          <span>
                                            {vehicleLocation.state.sale_date}
                                          </span>
                                          <div
                                            className="d-flex justify-content-start mt-n3"
                                            style={{ marginLeft: "200px" }}
                                          >
                                            <label
                                              htmlFor="id_file"
                                              className="mb-0"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="right"
                                              title="Select Driver Status"
                                            >
                                              <span
                                                className="d-inline-block"
                                                onClick={() =>
                                                  setShowSaleDate(!showSaleDate)
                                                }
                                              >
                                                <span className="text-success cursor-pointer">
                                                  <i className="bi bi-pen fs-14"></i>
                                                </span>
                                              </span>
                                            </label>
                                          </div>
                                        </Form.Label>
                                        {showSaleDate && (
                                          <Flatpickr
                                            className="form-control flatpickr-input"
                                            placeholder="Select Date"
                                            options={{
                                              dateFormat: "d M, Y",
                                            }}
                                            onChange={handleSaleDateChange}
                                          />
                                        )}
                                      </div>
                                    </Col>
                                    {/* Status  === Done */}
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="statusVehicle">
                                          Status :{" "}
                                          {vehicleLocation.state
                                            .statusVehicle === "Active" ? (
                                            <span className="badge bg-success">
                                              {
                                                vehicleLocation.state
                                                  .statusVehicle
                                              }
                                            </span>
                                          ) : (
                                            <span className="badge bg-danger">
                                              {
                                                vehicleLocation.state
                                                  .statusVehicle
                                              }
                                            </span>
                                          )}
                                          <div
                                            className="d-flex justify-content-start mt-n3"
                                            style={{ marginLeft: "110px" }}
                                          >
                                            <label
                                              htmlFor="id_file"
                                              className="mb-0"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="right"
                                              title="Select Driver Status"
                                            >
                                              <span
                                                className="d-inline-block"
                                                onClick={() =>
                                                  setShowVehicleStatus(
                                                    !showVehicleStatus
                                                  )
                                                }
                                              >
                                                <span className="text-success cursor-pointer">
                                                  <i className="bi bi-pen fs-14"></i>
                                                </span>
                                              </span>
                                            </label>
                                          </div>
                                          {showVehicleStatus && (
                                            <select
                                              className="form-select text-muted"
                                              name="statusVehicle"
                                              id="statusVehicle"
                                              onChange={
                                                handleSelectVehicleStatus
                                              }
                                            >
                                              <option value="">Status</option>
                                              <option value="Active">
                                                Active
                                              </option>
                                              <option value="Inactive">
                                                Inactive
                                              </option>
                                              <option value="Reparing Mode">
                                                Reparing Mode
                                              </option>
                                              <option value="On Road">
                                                On Road
                                              </option>
                                            </select>
                                          )}
                                        </Form.Label>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col lg={5}>
                            <Card>
                              <Card.Body>
                                <div className="mb-3">
                                  <Form className="tablelist-form">
                                    <input type="hidden" id="id-field" />
                                    <Row>
                                      <Row>
                                        {/* Manufacturer  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="manufacturer"
                                              className="form-label"
                                            >
                                              Manufacturer
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="manufacturer"
                                              name="manufacturer"
                                              value={vehicleManufacturer}
                                              onChange={handleManufacturer}
                                            />
                                          </div>
                                        </Col>
                                        {/* Engine_Size  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="engine_size"
                                              className="form-label"
                                            >
                                              Engine Size
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="engine_size"
                                              name="engine_size"
                                              value={engineSize}
                                              onChange={handleEngineSize}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Fuel_Type  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="FuelType"
                                              className="form-label"
                                            >
                                              Fuel Type :{" "}
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .fuel_type
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "120px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowFuelType(
                                                        !showFuelType
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                            </label>
                                            {showFuelType && (
                                              <select
                                                className="form-select text-muted"
                                                name="FuelType"
                                                id="FuelType"
                                                onChange={handleSelectFuelType}
                                              >
                                                <option value="">Select</option>
                                                <option value="Diesel">
                                                  Diesel
                                                </option>
                                                <option value="Gazoile">
                                                  Gazoile
                                                </option>
                                                <option value="Hybrid">
                                                  Hybrid
                                                </option>
                                                <option value="Full Electric">
                                                  Full Electric
                                                </option>
                                              </select>
                                            )}
                                          </div>
                                        </Col>
                                        {/* Speed_Limit  === Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="SpeedLimit"
                                              className="form-label"
                                            >
                                              Speed Limit :{" "}
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .speed_limit
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "135px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowSpeedLimit(
                                                        !showSpeedLimit
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                            </label>
                                            {showSpeedLimit && (
                                              <select
                                                className="form-select text-muted"
                                                name="SpeedLimit"
                                                id="SpeedLimit"
                                                onChange={
                                                  handleSelectSpeedLimit
                                                }
                                              >
                                                <option value="">Limit</option>
                                                <option value="60mph">
                                                  60mph
                                                </option>
                                                <option value="100mph">
                                                  100mph
                                                </option>
                                              </select>
                                            )}
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/*  Insurance_type  === Done */}
                                        <Col lg={12}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="insurance_type"
                                              className="form-label"
                                            >
                                              Insurance Type :{" "}
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .insurance_type
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "260px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowInsuranceType(
                                                        !showInsuranceType
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                            </label>
                                            {showInsuranceType && (
                                              <select
                                                className="form-select text-muted"
                                                name="insurance_type"
                                                id="insurance_type"
                                                onChange={
                                                  handleSelectInsuranceType
                                                }
                                              >
                                                <option value="">Select</option>
                                                <option value="Fully comprehensive">
                                                  Fully comprehensive
                                                </option>
                                                <option value="Third party">
                                                  Third party
                                                </option>
                                                <option value="Third party, fire and theft">
                                                  Third party, fire and theft
                                                </option>
                                              </select>
                                            )}
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Insurance_policy_number  === Done */}
                                        <Col lg={12}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="insurance_policy_number"
                                              className="form-label"
                                            >
                                              Insurance Policy Number
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="insurance_policy_number"
                                              name="insurance_policy_number"
                                              value={insurancePolicyNumber}
                                              onChange={
                                                handleInsurancePolicyNumber
                                              }
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/*  Ownership  === Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="ownership"
                                              className="form-label"
                                            >
                                              Ownership :{" "}
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .ownership
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "130px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowOwnership(
                                                        !showOwnership
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                            </label>
                                            {showOwnership && (
                                              <select
                                                className="form-select text-muted"
                                                name="ownership"
                                                id="ownership"
                                                onChange={handleSelectOwnership}
                                              >
                                                <option value="">Select</option>
                                                <option value="Owned">
                                                  Owned
                                                </option>
                                                <option value="Rented">
                                                  Rented
                                                </option>
                                              </select>
                                            )}
                                          </div>
                                        </Col>
                                        {/* Owner  == Done */}
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="statusSelect"
                                              className="form-label"
                                            >
                                              Owner Name
                                            </label>
                                            <Form.Control
                                              type="text"
                                              id="supplierName-field"
                                              value={ownedOwnerName}
                                              onChange={handleOwnedOwnerName}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Note  == Done */}
                                        <Col lg={12}>
                                          <div className="mb-3">
                                            <Form.Label htmlFor="note">
                                              Note
                                            </Form.Label>
                                            <div>
                                              <textarea
                                                className="form-control"
                                                id="note"
                                                name="note"
                                                value={vehicleNotes}
                                                onChange={handleVehicleNotes}
                                                rows={3}
                                              ></textarea>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* Extra  === !Done */}
                                        <Col lg={12}>
                                          <Form.Label htmlFor="supplierName-field">
                                            Extra
                                          </Form.Label>
                                          {/* <Select
                                              isMulti
                                              options={colourOptions}
                                            /> */}
                                        </Col>
                                        <Col lg={12}>
                                          <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={allExtraOptions} // Provide all possible options to select from
                                            styles={customStyles}
                                            onChange={
                                              handleSelectValueColumnChange
                                            }
                                            placeholder="Filter Columns"
                                            defaultValue={defaultExtraOptions} // Pre-select the options based on the extra array
                                          />
                                        </Col>
                                      </Row>
                                    </Row>
                                  </Form>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="profile1">
                        <Row>
                          <Col lg={12}>
                            <Card>
                              <Card.Body>
                                <div className="mb-3">
                                  <Form className="tablelist-form">
                                    <input type="hidden" id="id-field" />
                                    <Row>
                                      <Col lg={6}>
                                        <table>
                                          {/* MOT Expiry  === Done */}
                                          <tr>
                                            <td>
                                              <span className="fw-bold">
                                                MOT Expiry
                                              </span>
                                            </td>
                                            <td>
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .mot_expiry
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "180px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowMOTExpiry(
                                                        !showMOTExpiry
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                              {showMOTExpiry && (
                                                <Flatpickr
                                                  className="form-control flatpickr-input"
                                                  placeholder="Select Date"
                                                  options={{
                                                    dateFormat: "d M, Y",
                                                  }}
                                                  onChange={
                                                    handleMOTExpiryDateChange
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              MOT File{" "}
                                            </td>
                                            <td>
                                              <Button
                                                variant="soft-danger"
                                                onClick={() => {
                                                  tog_MOTFileModal();
                                                }}
                                              >
                                                <i className="bi bi-filetype-pdf align-middle fs-22"></i>
                                              </Button>
                                              <div
                                                className="d-flex justify-content-start mt-n2"
                                                style={{ marginLeft: "50px" }}
                                              >
                                                <label
                                                  htmlFor="mot_file_base64_string"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select MOT File"
                                                >
                                                  <span className="d-inline-block">
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                                <input
                                                  className="form-control d-none"
                                                  type="file"
                                                  name="mot_file_base64_string"
                                                  id="mot_file_base64_string"
                                                  accept=".pdf"
                                                  onChange={(e) =>
                                                    handleFileUploadMotFile(e)
                                                  }
                                                  style={{
                                                    width: "210px",
                                                    height: "120px",
                                                  }}
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                          {/* Tax Expiry  == Done */}
                                          <tr>
                                            <td className="fw-bold">
                                              Tax Expiry
                                            </td>
                                            <td>
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .tax_expiry
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "180px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowTaxExpiry(
                                                        !showTaxExpiry
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                              {showTaxExpiry && (
                                                <Flatpickr
                                                  className="form-control flatpickr-input"
                                                  placeholder="Select Date"
                                                  options={{
                                                    dateFormat: "d M, Y",
                                                  }}
                                                  onChange={handleTaxDateChange}
                                                />
                                              )}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Tax File
                                            </td>
                                            <td>
                                              <Button
                                                variant="soft-danger"
                                                onClick={() => {
                                                  tog_TaxFileModal();
                                                }}
                                              >
                                                <i className="bi bi-filetype-pdf align-middle fs-22"></i>
                                              </Button>
                                              <div
                                                className="d-flex justify-content-start mt-n2"
                                                style={{ marginLeft: "50px" }}
                                              >
                                                <label
                                                  htmlFor="tax_file_base64_string"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driving License"
                                                >
                                                  <span className="d-inline-block">
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                                <input
                                                  className="form-control d-none"
                                                  type="file"
                                                  name="tax_file_base64_string"
                                                  id="tax_file_base64_string"
                                                  accept=".pdf"
                                                  onChange={(e) =>
                                                    handleFileUploadTaxFile(e)
                                                  }
                                                  style={{
                                                    width: "210px",
                                                    height: "120px",
                                                  }}
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                          {/* Insurance Expiry == Done */}
                                          <tr>
                                            <td className="fw-bold">
                                              Insurance Expiry
                                            </td>
                                            <td>
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .insurance_expiry
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "180px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowInsuranceExpiry(
                                                        !showInsuranceExpiry
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                              {showInsuranceExpiry && (
                                                <Flatpickr
                                                  className="form-control flatpickr-input"
                                                  placeholder="Select Date"
                                                  options={{
                                                    dateFormat: "d M, Y",
                                                  }}
                                                  onChange={
                                                    handleInsuranceDateChange
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Insurance File
                                            </td>
                                            <td>
                                              <Button
                                                variant="soft-danger"
                                                onClick={() => {
                                                  tog_InsuranceFileModal();
                                                }}
                                              >
                                                <i className="bi bi-filetype-pdf align-middle fs-22"></i>
                                              </Button>
                                              <div
                                                className="d-flex justify-content-start mt-n2"
                                                style={{ marginLeft: "50px" }}
                                              >
                                                <label
                                                  htmlFor="insurance_file_base64_string"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driving License"
                                                >
                                                  <span className="d-inline-block">
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                                <input
                                                  className="form-control d-none"
                                                  type="file"
                                                  name="insurance_file_base64_string"
                                                  id="insurance_file_base64_string"
                                                  accept=".pdf"
                                                  onChange={(e) =>
                                                    handleFileUploadInsuranceFile(
                                                      e
                                                    )
                                                  }
                                                  style={{
                                                    width: "210px",
                                                    height: "120px",
                                                  }}
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Inspection Due
                                            </td>
                                            <td>
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .inspection_due
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "180px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowInspectionDue(
                                                        !showInspectionDue
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                              {showInspectionDue && (
                                                <Flatpickr
                                                  className="form-control flatpickr-input"
                                                  placeholder="Select Date"
                                                  options={{
                                                    dateFormat: "d M, Y",
                                                  }}
                                                  onChange={
                                                    handleInspectionDateChange
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Service Due
                                            </td>
                                            <td>
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .service_due
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "180px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setServiceDue(
                                                        !showServiceDue
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                              {showServiceDue && (
                                                <Flatpickr
                                                  className="form-control flatpickr-input"
                                                  placeholder="Select Date"
                                                  options={{
                                                    dateFormat: "d M, Y",
                                                  }}
                                                  onChange={
                                                    handleServiceDueDateChange
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Tacho calibration Due
                                            </td>
                                            <td>
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .tacho_calibration_due
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "180px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowTachoCalibratio(
                                                        !showTachoCalibration
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                              {showTachoCalibration && (
                                                <Flatpickr
                                                  className="form-control flatpickr-input"
                                                  placeholder="Select Date"
                                                  options={{
                                                    dateFormat: "d M, Y",
                                                  }}
                                                  onChange={
                                                    handleTachoCalibrationDateChange
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>
                                        </table>
                                      </Col>
                                      <Col lg={6}>
                                        <table>
                                          <tr>
                                            <td className="fw-bold">
                                              COIF Certificate Number
                                            </td>
                                            <td>
                                              <Form.Control
                                                type="text"
                                                id="coif_certificate_number"
                                                name="coif_certificate_number"
                                                className="form-control mb-2"
                                                value={cOIFCertificateNumber}
                                                onChange={
                                                  handleCOIFCertificateNumber
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              COIF Certificate Date
                                            </td>
                                            <td>
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .coif_certificate_date
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "180px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowCOIFCertificateDate(
                                                        !showCOIFCertificateDate
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                              {showCOIFCertificateDate && (
                                                <Flatpickr
                                                  className="form-control flatpickr-input"
                                                  placeholder="Select Date"
                                                  options={{
                                                    dateFormat: "d M, Y",
                                                  }}
                                                  onChange={
                                                    handleCOIFCertificateDateChange
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              HP Start Date
                                            </td>
                                            <td>
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .hp_start_date
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "180px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setHPStartDate(
                                                        !showHPStartDate
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                              {showHPStartDate && (
                                                <Flatpickr
                                                  className="form-control flatpickr-input"
                                                  placeholder="Select Date"
                                                  options={{
                                                    dateFormat: "d M, Y",
                                                  }}
                                                  onChange={
                                                    handleHPStarDateChange
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              HP End Date
                                            </td>
                                            <td>
                                              <span>
                                                {
                                                  vehicleLocation.state
                                                    .hp_end_date
                                                }
                                              </span>
                                              <div
                                                className="d-flex justify-content-start mt-n3"
                                                style={{ marginLeft: "180px" }}
                                              >
                                                <label
                                                  htmlFor="id_file"
                                                  className="mb-0"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Select Driver Status"
                                                >
                                                  <span
                                                    className="d-inline-block"
                                                    onClick={() =>
                                                      setShowHPEndDate(
                                                        !showHPEndDate
                                                      )
                                                    }
                                                  >
                                                    <span className="text-success cursor-pointer">
                                                      <i className="bi bi-pen fs-14"></i>
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                              {showHPEndDate && (
                                                <Flatpickr
                                                  className="form-control flatpickr-input"
                                                  placeholder="Select Date"
                                                  options={{
                                                    dateFormat: "d M, Y",
                                                  }}
                                                  onChange={
                                                    handleHPEndDateChange
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              HP Reference No
                                            </td>
                                            <td>
                                              <Form.Control
                                                type="text"
                                                id="hp_reference_no"
                                                name="hp_reference_no"
                                                className="form-control mb-2"
                                                value={hPReferenceNo}
                                                onChange={handleHPReferenceNo}
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              Monthly Repayment Amount
                                            </td>
                                            <td>
                                              <Form.Control
                                                type="text"
                                                className="form-control mb-2"
                                                id="monthly_repayment_amount"
                                                name="monthly_repayment_amount"
                                                value={monthlyRepaymentAmount}
                                                onChange={
                                                  handleMonthlyRepaymentAmount
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fw-bold">
                                              HP Company
                                            </td>
                                            <td>
                                              <Form.Control
                                                type="text"
                                                id="hp_company"
                                                name="hp_company"
                                                className="form-control"
                                                value={hpCompany}
                                                onChange={handleHpCompany}
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </Col>
                                    </Row>
                                  </Form>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="d-flex justify-content-center btn btn-info btn-label"
                  >
                    <i className="ri-check-fill label-icon align-middle fs-16 me-2"></i>{" "}
                    Apply
                  </button>
                </Card.Footer>
              </Form>
            </Card>
          </Row>
        </Container>
      </div>
      {/* MOT File */}
      <Modal
        className="fade zoomIn"
        size="xl"
        show={modal_MOTFile}
        onHide={() => {
          tog_MOTFileModal();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            MOT
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <div>
            <Document
              file={`${process.env.REACT_APP_BASE_URL}/VehicleFiles/motFiles/${vehicleLocation.state.mot_file}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        </Modal.Body>
      </Modal>
      {/* Tax File */}
      <Modal
        className="fade zoomIn"
        size="xl"
        show={modal_TaxFile}
        onHide={() => {
          tog_TaxFileModal();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Tax
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <div>
            <Document
              file={`${process.env.REACT_APP_BASE_URL}/VehicleFiles/taxFiles/${vehicleLocation.state.tax_file}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        </Modal.Body>
      </Modal>
      {/* Insurance File */}
      <Modal
        className="fade zoomIn"
        size="xl"
        show={modal_InsuranceFile}
        onHide={() => {
          tog_InsuranceFileModal();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Insurance
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <div>
            <Document
              file={`${process.env.REACT_APP_BASE_URL}/VehicleFiles/insuranceFiles/${vehicleLocation.state.insurance_file}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default EditVehicle;
