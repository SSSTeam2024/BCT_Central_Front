import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useGetAllPassengerAndLuggagesQuery } from "features/PassengerAndLuggageLimits/passengerAndLuggageSlice";
import {
  useEditProgramMutation,
  useUpdateProgramMutation,
} from "features/Programs/programSlice";
import {
  useAddNewGroupMutation,
  useDeleteManyGroupsMutation,
  useGetGroupsByProgramIdMutation,
} from "features/employeeGroups/employeeGroupSlice";
import ProgramRunDates from "./ProgramRunDates";
import ProgramOptions from "./ProgramOptions";

interface GroupSchool {
  groupName: string;
  student_number: string;
  id_school: string;
  vehicle_type: string;
  luggage_details: string;
  passenger_limit: any[];
  luggages?: any[];
  program: string;
  unit_price?: number;
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
  unit_price?: number;
}

const JourneyGroups = () => {
  const [step, setStep] = useState<string>("groups");

  const goToDates = (step: string) => {
    setStep(step);
  };

  const [updatedProg, setUpdatedProg] = useState<any>();

  const { data: AllPassengersLimit = [] } =
    useGetAllPassengerAndLuggagesQuery();
  const [updateProgram] = useEditProgramMutation();
  const [deleteMany] = useDeleteManyGroupsMutation();
  const [createGroups] = useAddNewGroupMutation();

  const uniqueItems = AllPassengersLimit.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) => t.max_luggage.description === item.max_luggage.description
      )
  );
  const location = useLocation();
  const groupsLocation = location.state;
  console.log("groupsLocation : ", groupsLocation);
  const [contractTotalPrice, setContractTotalPrice] = useState<number>(0);
  const [recommandedCapacityState, setRecommandedCapacityState] = useState(
    groupsLocation?.recommanded_capacity || ""
  );
  const [affectedCounter, setAffectedCounter] = useState(
    groupsLocation?.employees_groups?.reduce(
      (acc: any, group: any) => acc + Number(group.passenger_number),
      0
    ) || "0"
  );
  const [schoolGroups, setSchoolGroups] = useState<GroupSchool[]>([]);
  const [companyGroups, setCompanyGroups] = useState<GroupCompany[]>(
    groupsLocation?.employees_groups || []
  );

  console.log("recommandedCapacityState", recommandedCapacityState);
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
      groupsLocation.company_id === null ||
      groupsLocation.company_id === ""
    ) {
      const updatedSchoolGroups = [...schoolGroups];
      updatedSchoolGroups[index].unit_price = value;
      setSchoolGroups(updatedSchoolGroups);
    } else if (
      groupsLocation.school_id === null ||
      groupsLocation.school_id === ""
    ) {
      const updatedCompanyGroups = [...companyGroups];
      updatedCompanyGroups[index].unit_price! = value;
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

    setCompanyGroups((prevCompanyGroups) => {
      const newCompanyGroups = [...prevCompanyGroups];
      newCompanyGroups[index] = {
        ...newCompanyGroups[index],
        luggage_details: value,
      };
      return newCompanyGroups;
    });
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
      location?.state?.company_id! === null ||
      location?.state?.company_id! === ""
    ) {
      let name =
        location?.state?.programName! +
        "_" +
        "group" +
        (schoolGroups.length + 1);
      setSchoolGroups([
        ...schoolGroups,
        {
          groupName: name,
          student_number: "",
          unit_price: 0,
          vehicle_type: "",
          luggage_details: "",
          program: location?.state?._id!,
          id_school: location?.state?.school_id!,
          passenger_limit: [],
        },
      ]);
    }
    if (
      location?.state?.school_id! === null ||
      location?.state?.school_id! === ""
    ) {
      let name =
        location?.state?.programName! +
        "_" +
        "group" +
        (companyGroups.length + 1);
      setCompanyGroups([
        ...companyGroups,
        {
          groupName: name,
          passenger_number: "",
          unit_price: 0,
          vehicle_type: "",
          luggage_details: "",
          program: location?.state?._id!,
          id_company: location?.state?.company_id!,
          passenger_limit: [],
        },
      ]);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    const activeGroups =
      groupsLocation?.school_id! === null || groupsLocation?.school_id! === ""
        ? companyGroups
        : schoolGroups;

    activeGroups.forEach((group) => {
      const price = parseFloat(group.unit_price?.toString() || "0");
      totalPrice += price;
    });

    return totalPrice.toFixed(2);
  };

  const calculateContractTotalPrice = () => {
    const workDatesCount = location?.state?.workDates?.length!;

    const groupsNumber =
      location?.state?.school_id! !== null
        ? schoolGroups.length
        : companyGroups.length;

    const totalPrice = calculateTotalPrice();
    setContractTotalPrice(Number(totalPrice) * workDatesCount * groupsNumber);
  };

  useEffect(() => {
    calculateContractTotalPrice();
  }, [calculateTotalPrice(), schoolGroups, companyGroups]);

  const saveProgress = async () => {
    try {
      let groupIdsToDelete: string[] = [];
      let groupsToCreate: any[] = [];
      let updateData: any = {};

      const isSchoolGroups =
        !groupsLocation.company_id || groupsLocation.company_id === "";
      const isCompanyGroups =
        !groupsLocation.school_id || groupsLocation.school_id === "";

      if (isSchoolGroups) {
        groupIdsToDelete = [...groupsLocation.students_groups];
        groupsToCreate = schoolGroups.map((group) => ({
          groupName: group.groupName,
          student_number: group.student_number,
          id_school: group.id_school,
          vehicle_type: group.vehicle_type,
          luggage_details: group.luggage_details,
          program: groupsLocation._id,
          unit_price: String(group.unit_price),
        }));
        updateData = { students_groups: [] };
      } else if (isCompanyGroups) {
        groupIdsToDelete = [...groupsLocation.employees_groups];
        groupsToCreate = companyGroups.map((group) => ({
          groupName: group.groupName,
          passenger_number: group.passenger_number,
          id_company: group.id_company,
          vehicle_type: group.vehicle_type,
          luggage_details: group.luggage_details,
          program: groupsLocation._id,
          unit_price: String(group.unit_price),
        }));
        updateData = { employees_groups: [] };
      }

      await updateProgram({
        id: groupsLocation._id,
        updatedProgram: updateData,
      }).unwrap();

      if (groupIdsToDelete.length > 0) {
        try {
          const deleteResponse = await deleteMany({
            ids: groupIdsToDelete,
          }).unwrap();
        } catch (deleteError) {
          console.warn("Delete groups warning (may be expected):", deleteError);
        }
      }

      const creationPromises = groupsToCreate.map((group) =>
        createGroups(group)
      );
      const createdGroups = await Promise.all(creationPromises);

      const createdGroupIds = createdGroups.map(
        (response: any) => response.data._id
      );

      if (isSchoolGroups) {
        await updateProgram({
          id: groupsLocation._id,
          updatedProgram: { students_groups: createdGroupIds },
        }).unwrap();
      } else if (isCompanyGroups) {
        const updatedJourney = {
          ...groupsLocation,
          employees_groups: createdGroupIds,
          recommanded_capacity: recommandedCapacityState,
        };
        await updateProgram({
          id: groupsLocation._id,
          updatedProgram: {
            updatedJourney,
          },
        }).unwrap();
        setUpdatedProg(updatedJourney);
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  return (
    <>
      {step === "groups" && (
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
                              key={`${vehicleType.vehicle_type._id}-${index}`}
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
                              key={`${Luggage.max_luggage._id}-${index}`}
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
                          value={group.unit_price || ""}
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
                          value={group.vehicle_type || ""}
                          onChange={(e) =>
                            handleCustomSelectCompanyVehicleType(e, index)
                          }
                        >
                          <option value="">Select Vehicle Type</option>
                          {AllPassengersLimit.map((vehicleType, vtIndex) => (
                            <option
                              value={vehicleType.vehicle_type._id}
                              key={`vehicle-${index}-${vtIndex}-${vehicleType.vehicle_type._id}`}
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
                          value={group.luggage_details || ""}
                          onChange={(e) =>
                            handleCustomSelectCompanyLuggageDetails(e, index)
                          }
                        >
                          <option value="">Select Luggage</option>
                          {uniqueItems.map((Luggage, lgIndex) => (
                            <option
                              value={Luggage.max_luggage.description}
                              key={`luggage-${index}-${lgIndex}-${Luggage.max_luggage._id}`}
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
                          value={group.unit_price}
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
              {Number(recommandedCapacityState) === Number(affectedCounter) && (
                <Col lg={6}>
                  <div className="d-flex align-items-center">
                    <Button
                      type="button"
                      id="add-item"
                      className="btn btn-soft-info fw-medium"
                      disabled
                      // onClick={handleAddGroupClick}
                    >
                      <i className="ri-add-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                    </Button>
                  </div>
                </Col>
              )}
              {Number(recommandedCapacityState) > Number(affectedCounter) && (
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
              )}

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
            <Button
              onClick={() => {
                goToDates("dates");
              }}
              className="btn btn-light btn-label previestab"
            >
              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
              Back to Run Dates
            </Button>
            <Link
              to="#"
              // state={updatedProg}
              className="btn btn-success btn-label right ms-auto nexttab nexttab"
              onClick={() => {
                saveProgress();
                goToDates("options");
              }}
            >
              <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
              Go To Extra
            </Link>
          </div>
        </div>
      )}
      {step === "dates" && <ProgramRunDates runDatesLocation={updatedProg} />}
      {step === "options" && <ProgramOptions extraLocation={updatedProg} />}
    </>
  );
};
export default JourneyGroups;
