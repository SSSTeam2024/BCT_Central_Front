import {
  useGetAllNotificationsQuery,
  useUpdateNotificationMutation,
} from "features/Notifications/notificationSlice";
import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

//SimpleBar
import SimpleBar from "simplebar-react";

import { io } from "socket.io-client";

const socket = io("http://57.128.184.217:3000");

interface Notification {
  message: string;
  quote_id: string;
  type: string;
  timestamp: string;
}

const getTimeAgo = (createdAt: any) => {
  const now: any = new Date();
  const createdDate: any = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  if (diffInSeconds < 60) return `Just ${diffInSeconds} sec ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour(s) ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { data: AllNotifications = [], refetch } =
    useGetAllNotificationsQuery();
  const [updateNotification] = useUpdateNotificationMutation();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server, ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("notification", (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("notification");
    };
  }, []);

  const filtredNotifications = AllNotifications.filter(
    (notif) => notif.lu === "0"
  );
  const handleUpdateNotification = (id: any, readed: any) => {
    updateNotification({
      _id: id,
      lu: readed,
    });
    refetch();
  };

  const handleMarkAllAsRead = async () => {
    await Promise.all(
      filtredNotifications.map((notif) =>
        updateNotification({ _id: notif?._id!, lu: "1" })
      )
    );
    refetch();
  };
  return (
    <React.Fragment>
      <Dropdown
        className="topbar-head-dropdown ms-1 header-item"
        id="notificationDropdown"
      >
        <Dropdown.Toggle
          id="notification"
          type="button"
          className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle arrow-none"
        >
          <i className="mdi mdi-bell-outline fs-22"></i>
          <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
            <span className="notification-badge">
              {filtredNotifications.length}
            </span>
            <span className="visually-hidden">unread messages</span>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu
          className="dropdown-menu-lg dropdown-menu-end p-0"
          aria-labelledby="page-header-notifications-dropdown"
        >
          <div className="dropdown-head rounded-top">
            <div className="p-3 border-bottom border-bottom-dashed">
              <Row className="align-items-center">
                <Col>
                  <h6 className="mb-0 fs-16 fw-semibold">
                    {" "}
                    Notifications{" "}
                    <span className="badge badge-soft-danger fs-13 notification-badge">
                      {" "}
                      {filtredNotifications.length}
                    </span>
                  </h6>
                  <p className="fs-14 text-muted mt-1 mb-0">
                    You have{" "}
                    <span className="fw-semibold notification-unread">
                      {filtredNotifications.length}
                    </span>{" "}
                    unread notifications!
                  </p>
                </Col>
                {/* <Dropdown className="col-auto">
                  <Dropdown.Toggle
                    as="a"
                    href="/"
                    data-bs-toggle="dropdown"
                    className="link-secondary fs-14 bg-transparent border-0 arrow-none"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <li>
                      <Dropdown.Item href="/#">All Clear</Dropdown.Item>
                    </li>
                    <li>
                      <Dropdown.Item href="/#">Mark all as read</Dropdown.Item>
                    </li>
                    <li>
                      <Dropdown.Item href="/#">Archive All</Dropdown.Item>
                    </li>
                  </Dropdown.Menu>
                </Dropdown> */}
              </Row>
            </div>
          </div>

          <div className="py-2 ps-2" id="notificationItemsTabContent">
            <button
              className="btn btn-sm btn-primary mb-2"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
            <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
              {filtredNotifications.map((notif) => (
                <div
                  key={notif?._id!}
                  className="text-reset notification-item d-block dropdown-item position-relative unread-message"
                >
                  <div className="d-flex">
                    <div className="avatar-xs me-3 flex-shrink-0">
                      <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                        <i className="bx bx-badge-check"></i>
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <Link to="#!" className="stretched-link">
                        <h6 className="mt-0 fs-14 mb-2 lh-base">
                          {notif.message}
                        </h6>
                      </Link>
                      <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                        <span>
                          <i className="mdi mdi-clock-outline"></i>{" "}
                          {getTimeAgo(notif.createdAt)}
                        </span>
                      </p>
                    </div>
                    <div className="px-2 fs-15">
                      <div className="form-check notification-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id={`notification-check-${notif._id}`}
                          onClick={() =>
                            handleUpdateNotification(notif?._id!, "1")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`notification-check-${notif._id}`}
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </SimpleBar>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default NotificationDropdown;
