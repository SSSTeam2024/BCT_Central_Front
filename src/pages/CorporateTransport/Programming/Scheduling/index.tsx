import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Form,
  Modal,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";
import SimpleBar from "simplebar-react";
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";
import { useFormik } from "formik";
//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Scheduling = () => {
  const dispatch: any = useDispatch();
  const [event, setEvent] = useState<any>({});
  const [modal, setModal] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<any>(0);
  const [selectedNewDay, setSelectedNewDay] = useState<any>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditButton, setIsEditButton] = useState<boolean>(true);
  const [upcommingevents, setUpcommingevents] = useState<any>([]);

  const { events, isEventUpdated } = useSelector((state: any) => ({
    events: state.Calendar.events,
    isEventUpdated: state.Calendar.isEventUpdated,
  }));

  useEffect(() => {
    setUpcommingevents(events);
    upcommingevents.slice().sort(function (o1: any, o2: any) {
      return Math.abs(
        new Date(o1.start).getTime() - new Date(o2.start).getTime()
      );
    });
  }, [events, upcommingevents]);

  // Handling the modal state
  const toggle = () => {
    if (modal) {
      setModal(false);
      setEvent(null);
      setIsEdit(false);
      setIsEditButton(true);
    } else {
      setModal(true);
    }
  };

  // Handling date click on calendar
  const handleDateClick = (arg: any) => {
    const date = arg["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );

    const modifiedData = { ...arg, date: modifiedDate };

    setSelectedNewDay(date);
    setSelectedDay(modifiedData);
    toggle();
  };

  const str_dt = function formatDate(date: any) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d = new Date(date),
      month = "" + monthNames[d.getMonth()],
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day + " " + month, year].join(",");
  };

  const date_r = function formatDate(date: any) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  // Handling click on event on calendar
  const handleEventClick = (arg: any) => {
    const event = arg.event;
    const st_date = event.start;
    const ed_date = event.end;
    const r_date =
      ed_date == null
        ? str_dt(st_date)
        : str_dt(st_date) + " to " + str_dt(ed_date);
    const er_date =
      ed_date == null
        ? date_r(st_date)
        : date_r(st_date) + " to " + date_r(ed_date);

    setEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      className: event.classNames,
      category: event.classNames[0],
      location: event._def.extendedProps.location,
      description: event._def.extendedProps.description,
      defaultDate: er_date,
      datetag: r_date,
      payment: event._def.extendedProps.payment,
    });

    setIsEdit(true);
    setIsEditButton(false);
    toggle();
  };

  // events validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || "",
      category: (event && event.category) || "",
      payment: (event && event.payment) || "",
      location: (event && event.location) || "",
      description: (event && event.description) || "",
      defaultDate: (event && event.defaultDate) || "",
      datetag: (event && event.datetag) || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Customer Name"),
      category: Yup.string().required("Please Select Your Category"),
      payment: Yup.string().required("Please Add Payment Value"),
      location: Yup.string().required("Please Add location"),
      description: Yup.string().required("Please Add description"),
    }),
    onSubmit: (values) => {
      var updatedDay: any = "";
      if (selectedNewDay) {
        updatedDay = new Date(selectedNewDay[1]);
        updatedDay.setDate(updatedDay.getDate() + 1);
      }

      if (isEdit) {
        const updateEvent = {
          id: event.id,
          title: values.title,
          className: values.category,
          start: selectedNewDay ? selectedNewDay[0] : event.start,
          end: selectedNewDay ? updatedDay : event.end,
          location: values.location,
          payment: values.payment,
          description: values.description,
        };
        // update event
        validation.resetForm();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          title: values["title"],
          start: selectedDay ? selectedNewDay[0] : new Date(),
          end: selectedDay ? updatedDay : new Date(),
          className: values.category,
          location: values["location"],
          payment: values["payment"],
          description: values["description"],
        };
        // save new event
        validation.resetForm();
      }
      setSelectedDay(null);
      setSelectedNewDay(null);
      toggle();
    },
  });

  const submitOtherEvent = () => {
    document.getElementById("form-event")?.classList.remove("view-event");

    document
      .getElementById("event-title")
      ?.classList.replace("d-none", "d-block");
    document
      .getElementById("event-category")
      ?.classList.replace("d-none", "d-block");
    (
      document.getElementById("event-start-date")?.parentNode as HTMLElement
    ).classList.remove("d-none");
    document
      .getElementById("event-start-date")
      ?.classList.replace("d-none", "d-block");
    document
      .getElementById("event-location")
      ?.classList.replace("d-none", "d-block");
    document
      .getElementById("event-payment")
      ?.classList.replace("d-none", "d-block");
    document
      .getElementById("event-description")
      ?.classList.replace("d-none", "d-block");
    document
      .getElementById("event-start-date-tag")
      ?.classList.replace("d-block", "d-none");
    document
      .getElementById("event-location-tag")
      ?.classList.replace("d-block", "d-none");
    document
      .getElementById("event-payment-tag")
      ?.classList.replace("d-block", "d-none");
    document
      .getElementById("event-description-tag")
      ?.classList.replace("d-block", "d-none");

    setIsEditButton(true);
  };

  // On calendar drop event
  const onDrop = (event: any) => {
    const date = event["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );

    const draggedEl = event.draggedEl;
    const draggedElclass = draggedEl.className;
    if (
      draggedEl.classList.contains("external-event") &&
      draggedElclass.indexOf("fc-event-draggable") === -1
    ) {
      const modifiedData = {
        id: Math.floor(Math.random() * 1000),
        title: draggedEl.innerText,
        start: modifiedDate,
        className: draggedEl.className,
      };
    }
  };

  const searchCustomer = (ele: any) => {
    let search = ele.target.value;
    if (search) {
      search = search.toLowerCase();
      setUpcommingevents(
        events.filter((data: any) => data.title.toLowerCase().includes(search))
      );
    } else {
      setUpcommingevents(events);
    }
  };

  document.title = "Scheduling | Coach Hire Network";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="SCHEDULE" pageTitle="Dashboard" />
          <Row>
            <Col xl={12}>
              <Card className="card-h-100">
                <Card.Header className="border-bottom-dashed">
                  <Row className="g-3">
                    <Col xxl={2} lg={6}>
                      <select
                        className="form-select text-muted"
                        data-choices
                        data-choices-search-false
                        name="choices-single-default"
                        id="idStatus"
                      >
                        <option value="">Quote</option>
                        <option value="Pickups">Journey</option>
                        <option value="Pending">Movement</option>
                      </select>
                    </Col>
                    <Col lg={7}></Col>
                    <Col>
                      <div
                        className="btn-group btn-group-sm mt-2"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button type="button" className="btn btn-outline-dark">
                          Excel
                        </button>
                        <button type="button" className="btn btn-outline-dark">
                          PDF
                        </button>
                        <button type="button" className="btn btn-outline-dark">
                          Print
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <div id="calendar">
                    <FullCalendar
                      plugins={[
                        BootstrapTheme,
                        dayGridPlugin,
                        interactionPlugin,
                        listPlugin,
                      ]}
                      initialView="dayGridMonth"
                      slotDuration={"00:15:00"}
                      handleWindowResize={true}
                      themeSystem="bootstrap"
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                      }}
                      events={events}
                      editable={true}
                      droppable={true}
                      selectable={true}
                      dateClick={handleDateClick}
                      eventClick={handleEventClick}
                      drop={onDrop}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Scheduling;
