import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useGetAllPassengerAndLuggagesQuery } from "features/PassengerAndLuggageLimits/passengerAndLuggageSlice";
import { useUpdateProgramMutation } from "features/Programs/programSlice";

interface ProgramGroupsProps {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

interface GroupSchool {
  groupName: string;
  student_number: string;
  id_school: string;
  vehicle_type: string;
  luggage_details: string;
  passenger_limit: any[];
  luggages?: any[];
  program: string;
  price?: number;
}

interface GroupCompany {
  groupName: string;
  passenger_number: string;
  id_company: string;
  vehicle_type: string;
  luggage_details: string;
  passenger_limit: any[];
  luggages?: any[];
  program: string;
  price?: number;
}

const ProgramGroups: React.FC<ProgramGroupsProps> = ({ setActiveTab }) => {
  const { data: AllPassengersLimit = [] } =
    useGetAllPassengerAndLuggagesQuery();
  const [updateProgram] = useUpdateProgramMutation();

  const location = useLocation();
  const groupsLocation = location.state;
  console.log(location.state);
  const [contractTotalPrice, setContractTotalPrice] = useState<number>(0);
  const [recommandedCapacityState, setRecommandedCapacityState] =
    useState<string>("");
  const [affectedCounter, setAffectedCounter] = useState<string>("0");
  const [schoolGroups, setSchoolGroups] = useState<GroupSchool[]>([]);
  const [companyGroups, setCompanyGroups] = useState<GroupCompany[]>([]);

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

  const onChangeRecommandedCapacityState = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecommandedCapacityState(event.target.value);
  };

  const onChangeSchoolGroupName = (
    event: React.ChangeEvent<any>,
    index: any
  ) => {
    const name = event.target.value;
    const tempArray = [...schoolGroups];
    tempArray[index].groupName = name;
    setSchoolGroups(tempArray);
  };

  const onChangeSchoolGroupPax = (
    event: React.ChangeEvent<any>,
    index: any
  ) => {
    if (recommandedCapacityState === "") {
      alert("Fill the total passengers number first");
    } else {
      const pax = event.target.value;
      const tempArray = [...schoolGroups];
      let prevNumber = tempArray[index].student_number;
      let prevAffectedCounter = Number(affectedCounter) - Number(prevNumber);
      if (prevAffectedCounter !== 0) {
        if (
          prevAffectedCounter + Number(pax) >
          Number(recommandedCapacityState)
        ) {
          alert(
            "The number of group(s) passengers exceed the estimated total number"
          );
          tempArray[index].student_number = "";
          setAffectedCounter(prevAffectedCounter.toString());
        } else {
          setAffectedCounter((prevAffectedCounter + Number(pax)).toString());
          tempArray[index].student_number = pax;
          const customFilteredLimit = AllPassengersLimit.filter(
            (vehcileType) => Number(pax) <= Number(vehcileType.max_passengers)
          );
          tempArray[index].passenger_limit = customFilteredLimit;
        }
      } else {
        if (
          prevAffectedCounter + Number(pax) >
          Number(recommandedCapacityState)
        ) {
          alert(
            "The number of group passengers exceed the estimated total number"
          );
          tempArray[index].student_number = "";
          prevAffectedCounter = Number(affectedCounter) - Number(prevNumber);
          setAffectedCounter(prevAffectedCounter.toString());
        } else {
          setAffectedCounter((prevAffectedCounter + Number(pax)).toString());
          tempArray[index].student_number = pax;
          const customFilteredVehicleType = AllPassengersLimit.filter(
            (vehcileType) => Number(pax) <= Number(vehcileType.max_passengers)
          );
          tempArray[index].passenger_limit = customFilteredVehicleType;
        }
      }
      setSchoolGroups(tempArray);
    }
  };

  const handleCustomSelectSchoolVehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: any
  ) => {
    const value = event.target.value;
    let prevSchoolGroups = [...schoolGroups];
    prevSchoolGroups[index].vehicle_type = value;
    let pass_limit = prevSchoolGroups[index].passenger_limit;
    let luggages = pass_limit.filter(
      (element) => element.vehicle_type._id === value
    );
    prevSchoolGroups[index].luggages = luggages;
    setSchoolGroups(prevSchoolGroups);
  };

  const handleCustomSelectSchoolLuggageDetails = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: any
  ) => {
    const value = event.target.value;
    let prevSchoolGroups = [...schoolGroups];
    prevSchoolGroups[index].luggage_details = value;
  };

  const onChangeGroupPrice = (e: any, index: number) => {
    const { value } = e.target;
    if (
      groupsLocation.program.company_id === null ||
      groupsLocation.program.company_id === ""
    ) {
      const updatedSchoolGroups = [...schoolGroups];
      updatedSchoolGroups[index].price = value;
      setSchoolGroups(updatedSchoolGroups);
    } else if (
      groupsLocation.program.school_id === null ||
      groupsLocation.program.school_id === ""
    ) {
      const updatedCompanyGroups = [...companyGroups];
      updatedCompanyGroups[index].price! = value;
      setCompanyGroups(updatedCompanyGroups);
    }
  };

  const handleRemoveStudentGroupClick = (index: any) => {
    let prevGroups = [...schoolGroups];

    let prevAffectedNumber = Number(affectedCounter);
    prevAffectedNumber -= Number(prevGroups[index]?.student_number!);
    setAffectedCounter(String(prevAffectedNumber));

    if (prevGroups.length === 0) {
      prevGroups = [];
    } else {
      prevGroups.splice(index, 1);
    }
    setSchoolGroups(prevGroups);
  };

  const onChangeCompanyGroupName = (
    event: React.ChangeEvent<any>,
    index: any
  ) => {
    const name = event.target.value;
    const tempArray = [...companyGroups];
    tempArray[index].groupName = name;
    setCompanyGroups(tempArray);
  };

  const onChangeCompanyGroupPax = (
    event: React.ChangeEvent<any>,
    index: any
  ) => {
    if (recommandedCapacityState === "") {
      alert("Fill the total passengers number first");
    } else {
      const pax = event.target.value;
      const tempArray = [...companyGroups];
      let prevNumber = tempArray[index].passenger_number;

      let prevAffectedCounter = Number(affectedCounter) - Number(prevNumber);
      if (prevAffectedCounter !== 0) {
        if (
          prevAffectedCounter + Number(pax) >
          Number(recommandedCapacityState)
        ) {
          alert(
            "The number of group(s) passengers exceed the estimated total number"
          );
          tempArray[index].passenger_number = "";

          setAffectedCounter(prevAffectedCounter.toString());
        } else {
          setAffectedCounter((prevAffectedCounter + Number(pax)).toString());
          tempArray[index].passenger_number = pax;
          const customFilteredLimit = AllPassengersLimit.filter(
            (vehcileType) => Number(pax) <= Number(vehcileType.max_passengers)
          );
          tempArray[index].passenger_limit = customFilteredLimit;
          if (Number(affectedCounter) < Number(recommandedCapacityState)) {
          } else if (
            Number(affectedCounter) === Number(recommandedCapacityState)
          ) {
          }
        }
      } else {
        if (
          prevAffectedCounter + Number(pax) >
          Number(recommandedCapacityState)
        ) {
          alert(
            "The number of group passengers exceed the estimated total number"
          );

          tempArray[index].passenger_number = "";
          prevAffectedCounter = Number(affectedCounter) - Number(prevNumber);
          setAffectedCounter(prevAffectedCounter.toString());
        } else {
          setAffectedCounter((prevAffectedCounter + Number(pax)).toString());
          tempArray[index].passenger_number = pax;
          const customFilteredVehicleType = AllPassengersLimit.filter(
            (vehcileType) => Number(pax) <= Number(vehcileType.max_passengers)
          );
          tempArray[index].passenger_limit = customFilteredVehicleType;
          if (Number(affectedCounter) < Number(recommandedCapacityState)) {
          } else if (
            Number(affectedCounter) === Number(recommandedCapacityState)
          ) {
          }
        }
      }
      setCompanyGroups(tempArray);
    }
  };

  const handleCustomSelectCompanyVehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: any
  ) => {
    const value = event.target.value;

    let prevCompanyGroups = [...companyGroups];
    prevCompanyGroups[index].vehicle_type = value;
    let pass_limit = prevCompanyGroups[index].passenger_limit;
    let luggages = pass_limit.filter(
      (element) => element.vehicle_type._id === value
    );
    prevCompanyGroups[index].luggages = luggages;
    setCompanyGroups(prevCompanyGroups);
  };

  const handleCustomSelectCompanyLuggageDetails = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: any
  ) => {
    const value = event.target.value;

    let prevCompanyGroups = [...companyGroups];
    prevCompanyGroups[index].luggage_details = value;
  };

  const handleRemoveCompanyGroupClick = (index: any) => {
    let prevGroups = [...companyGroups];

    let prevAffectedNumber = Number(affectedCounter);
    prevAffectedNumber -= Number(prevGroups[index]?.passenger_number!);
    setAffectedCounter(String(prevAffectedNumber));

    if (prevGroups.length === 0) {
      prevGroups = [];
    } else {
      prevGroups.splice(index, 1);
    }
    setCompanyGroups(prevGroups);
  };

  const handleAddGroupClick = () => {
    if (
      location?.state?.program?.company_id! === null ||
      location?.state?.program?.company_id! === ""
    ) {
      console.log("inside first if");
      let prevG = [...schoolGroups];
      let name =
        location?.state?.program?.programName! +
        "_" +
        "group" +
        (prevG.length + 1);
      setSchoolGroups((prevGroups) => [
        ...prevGroups,
        {
          groupName: name,
          student_number: "",
          id_school: location?.state?.program?.school_id!,
          vehicle_type: "",
          luggage_details: "",
          passenger_limit: [],
          luggages: [],
          program: "",
        },
      ]);
    }
    if (
      location?.state?.program?.school_id! === null ||
      location?.state?.program?.school_id! === ""
    ) {
      console.log("inside second if");
      let prevG = [...companyGroups];
      let name =
        location?.state?.program?.programName! +
        "_" +
        "group" +
        (prevG.length + 1);
      setCompanyGroups((prevGroups) => [
        ...prevGroups,
        {
          groupName: name,
          passenger_number: "",
          id_company: location?.state?.program?.company_id!,
          vehicle_type: "",
          luggage_details: "",
          passenger_limit: [],
          luggages: [],
          program: "",
        },
      ]);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    const activeGroups =
      location?.state?.program?.school_id! !== null ||
      location?.state?.program?.school_id! !== ""
        ? schoolGroups
        : companyGroups;

    activeGroups.forEach((group) => {
      const price = parseFloat(group.price?.toString() || "0");

      totalPrice += price;
    });
    return totalPrice.toFixed(2);
  };

  const calculateContractTotalPrice = () => {
    const workDatesCount = location?.state?.program?.workDates?.length!;

    const groupsNumber =
      location?.state?.program?.school_id! !== null
        ? schoolGroups.length
        : companyGroups.length;

    const totalPrice = calculateTotalPrice();
    setContractTotalPrice(Number(totalPrice) * workDatesCount * groupsNumber);
  };

  useEffect(() => {
    calculateContractTotalPrice();
  }, [calculateTotalPrice(), schoolGroups, companyGroups]);

  const saveProgress = async (tabNumber: string, data: typeof programmData) => {
    data["programDetails"]["programName"] = groupsLocation.program.programName;
    data["programDetails"]["destination_point"] =
      groupsLocation.program.destination_point;
    data["programDetails"]["stops"] = groupsLocation.program.stops;
    data["programDetails"]["origin_point"] =
      groupsLocation.program.origin_point;
    data["programDetails"]["dropOff_time"] =
      groupsLocation.program.dropOff_time;
    data["programDetails"]["pickUp_Time"] = groupsLocation.program.pickUp_Time;
    if (groupsLocation.program.company_id === null) {
      data["programDetails"]["school_id"] = groupsLocation.program.school_id;
    }
    if (groupsLocation.program.school_id === null) {
      data["programDetails"]["company_id"] = groupsLocation.program.company_id;
    }
    data["programDetails"]["tab_number"] = tabNumber;
    data["programDetails"]["program_status"] =
      groupsLocation.program.program_status;
    data["programDetails"]["stops"] = groupsLocation.program.stops;

    data["programDetails"]["pickUp_date"] = groupsLocation.program.pickUp_date;
    data["programDetails"]["droppOff_date"] =
      groupsLocation.program.droppOff_date;
    data["programDetails"]["exceptDays"] = groupsLocation.program.exceptDays;
    data["programDetails"]["freeDays_date"] =
      groupsLocation.program.freeDays_date;
    data["programDetails"]["workDates"] = groupsLocation.program.workDates;

    data["programDetails"]["recommanded_capacity"] = recommandedCapacityState;
    if (
      groupsLocation.program.company_id === null ||
      groupsLocation.program.company_id === ""
    ) {
      let validSchoolGroups = [];
      for (let index = 0; index < schoolGroups.length; index++) {
        const group = {
          groupName: schoolGroups[index].groupName,
          student_number: schoolGroups[index].student_number,
          id_school: schoolGroups[index].id_school,
          vehicle_type: schoolGroups[index].vehicle_type,
          luggage_details: schoolGroups[index].luggage_details,
          program: groupsLocation.program._id!,
          unit_price: String(schoolGroups[index].price),
        };
        validSchoolGroups.push(group);
      }
      data["groups"]["type"] = "School";
      data["groups"]["groupCollection"] = validSchoolGroups;
    }

    if (
      groupsLocation.program.school_id === null ||
      groupsLocation.program.school_id === ""
    ) {
      let validCompanyGroups = [];
      for (let index = 0; index < companyGroups.length; index++) {
        const group = {
          groupName: companyGroups[index].groupName,
          passenger_number: companyGroups[index].passenger_number,
          id_company: companyGroups[index].id_company,
          vehicle_type: companyGroups[index].vehicle_type,
          luggage_details: companyGroups[index].luggage_details,
          program: groupsLocation.program._id!,
          unit_price: String(companyGroups[index].price),
        };
        validCompanyGroups.push(group);
      }
      data["groups"]["type"] = "Company";
      data["groups"]["groupCollection"] = validCompanyGroups;
    }
    data["programDetails"]["total_price"] = contractTotalPrice!.toFixed(2);
    data["programDetails"]["_id"] = groupsLocation.program._id!;
    console.log("data", data);
    await updateProgram({
      id: groupsLocation.program._id!,
      updatedProgram: data,
    });
    setActiveTab(4);
  };

  return (
    <div>
      <Row>
        <Col lg={4}>
          <div className="mb-3">
            <Form.Label htmlFor="recommanded_capacity">
              Recommanded Capacity
            </Form.Label>
            <Form.Control
              type="text"
              id="recommanded_capacity"
              required
              className="mb-2"
              name="recommanded_capacity"
              value={recommandedCapacityState}
              onChange={onChangeRecommandedCapacityState}
            />
          </div>
        </Col>
        <Col lg={4}>
          <div className="mb-3">
            <Form.Label htmlFor="recommanded_capacity">
              Affected / Total
            </Form.Label>
            <Form.Control
              type="text"
              id="recommanded_capacity"
              disabled
              className="bg-light mb-2"
              name="recommanded_capacity"
              value={affectedCounter + "/" + recommandedCapacityState}
            />
          </div>
        </Col>
      </Row>
      <hr className="text-muted" />
      <Row
        className="mb-3"
        style={{
          maxHeight: "calc(50vh - 50px)",
          overflowX: "auto",
        }}
      >
        {schoolGroups.length > 0
          ? schoolGroups.map((group, index) => (
              <Row key={index}>
                <Col lg={2}>
                  <Form.Label htmlFor="customerName-field">
                    Group Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="customerName-field"
                    className="mb-2"
                    name="customerName-field"
                    value={group.groupName}
                    onChange={(e) => onChangeSchoolGroupName(e, index)}
                  />
                </Col>
                <Col lg={2}>
                  <Form.Label htmlFor="pax">Passengers</Form.Label>
                  <Form.Control
                    type="text"
                    id="pax"
                    className="mb-2"
                    name="pax"
                    placeholder={`1 - ${recommandedCapacityState}`}
                    value={group.student_number}
                    onChange={(e) => onChangeSchoolGroupPax(e, index)}
                  />
                </Col>
                <Col lg={3}>
                  <div>
                    <Form.Label htmlFor="customerName-field">
                      Vehicle
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="vehicleType"
                      id="vehicleType"
                      onChange={(e) =>
                        handleCustomSelectSchoolVehicleType(e, index)
                      }
                    >
                      <option value="">Select Vehicle Type</option>
                      {group?.passenger_limit?.map((vehicleType) => (
                        <option
                          value={vehicleType.vehicle_type._id}
                          key={vehicleType.vehicle_type._id}
                        >
                          {vehicleType.vehicle_type.type}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="mb-3">
                    <Form.Label htmlFor="luggageDetails">
                      Luggage Details
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="luggageDetails"
                      id="luggageDetails"
                      onChange={(e) =>
                        handleCustomSelectSchoolLuggageDetails(e, index)
                      }
                    >
                      <option value="">Select Luggage</option>
                      {group?.luggages?.map((Luggage) => (
                        <option
                          value={Luggage.max_luggage.description}
                          key={Luggage.max_luggage._id}
                        >
                          {Luggage.max_luggage.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col lg={1}>
                  <div>
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Form.Control
                      type="text"
                      id="price"
                      className="mb-2"
                      name="price"
                      value={group.price || ""}
                      onChange={(e) => onChangeGroupPrice(e, index)}
                    />
                  </div>
                </Col>
                <Col lg={1}>
                  <button
                    type="button"
                    className="btn btn-danger btn-icon"
                    onClick={() => handleRemoveStudentGroupClick(index)}
                    style={{
                      marginTop: "29px",
                      marginBottom: "15px",
                    }}
                  >
                    <i className="ri-delete-bin-5-line"></i>
                  </button>
                </Col>
              </Row>
            ))
          : companyGroups.map((group, index) => (
              <Row key={index}>
                <Col lg={2}>
                  <Form.Label htmlFor="customerName-field">
                    Group Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="customerName-field"
                    className="mb-2"
                    name="customerName-field"
                    value={group.groupName}
                    onChange={(e) => onChangeCompanyGroupName(e, index)}
                  />
                </Col>
                <Col lg={2}>
                  <Form.Label htmlFor="pax">Passengers</Form.Label>
                  <Form.Control
                    type="text"
                    id="pax"
                    className="mb-2"
                    name="pax"
                    placeholder={`1 - ${recommandedCapacityState}`}
                    value={group.passenger_number}
                    onChange={(e) => onChangeCompanyGroupPax(e, index)}
                  />
                </Col>
                <Col lg={3}>
                  <div>
                    <Form.Label htmlFor="customerName-field">
                      Vehicle
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="vehicleType"
                      id="vehicleType"
                      onChange={(e) =>
                        handleCustomSelectCompanyVehicleType(e, index)
                      }
                    >
                      <option value="">Select Vehicle Type</option>
                      {group.passenger_limit.map((vehicleType) => (
                        <option
                          value={vehicleType.vehicle_type._id}
                          key={vehicleType.vehicle_type._id}
                        >
                          {vehicleType.vehicle_type.type}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="mb-3">
                    <Form.Label htmlFor="luggageDetails">
                      Luggage Details
                    </Form.Label>
                    <select
                      className="form-select text-muted"
                      name="luggageDetails"
                      id="luggageDetails"
                      onChange={(e) =>
                        handleCustomSelectCompanyLuggageDetails(e, index)
                      }
                    >
                      <option value="">Select Luggage</option>
                      {group?.luggages!.map((Luggage) => (
                        <option
                          value={Luggage.max_luggage.description}
                          key={Luggage.max_luggage._id}
                        >
                          {Luggage.max_luggage.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col lg={1}>
                  <div>
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Form.Control
                      type="text"
                      id="price"
                      className="mb-2"
                      name="price"
                      value={group.price || ""}
                      onChange={(e) => onChangeGroupPrice(e, index)}
                    />
                  </div>
                </Col>
                <Col lg={1}>
                  <button
                    type="button"
                    className="btn btn-danger btn-icon"
                    onClick={() => handleRemoveCompanyGroupClick(index)}
                    style={{
                      marginTop: "29px",
                      marginBottom: "15px",
                    }}
                  >
                    <i className="ri-delete-bin-5-line"></i>
                  </button>
                </Col>
              </Row>
            ))}

        <Row className="align-items-center">
          <Col lg={6}>
            <div className="d-flex align-items-center">
              <Button
                type="button"
                id="add-item"
                className="btn btn-soft-info fw-medium"
                onClick={handleAddGroupClick}
              >
                <i className="ri-add-line label-icon align-middle rounded-pill fs-16 me-2"></i>
              </Button>
            </div>
          </Col>

          <Col lg={6} className="text-end">
            <Form.Label className="fw-bold" htmlFor="total-price">
              Total Price:
            </Form.Label>
            <span id="total-price" className="ms-2">
              £ {calculateTotalPrice()}{" "}
            </span>
          </Col>
        </Row>
      </Row>
      <div className="d-flex align-items-start gap-3">
        <Link
          to="#"
          state={{ program: location?.state?.program! }}
          className="btn btn-light btn-label previestab"
          onClick={() => setActiveTab(7)}
        >
          <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
          Back to Run Dates
        </Link>
        <Link
          to="#"
          state={{ program: programmData.programDetails }}
          className="btn btn-success btn-label right ms-auto nexttab nexttab"
          onClick={() => {
            saveProgress("3", programmData);
          }}
        >
          <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
          Go To Extra
        </Link>
      </div>
    </div>
  );
};
export default ProgramGroups;
