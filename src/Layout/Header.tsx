import React, { useState } from "react";

import SearchModal from "../Common/SearchModal";
import NotesDropdown from "../Common/NotesDropdown";
import SettingDropdown from "../Common/SettingDropdown";
import FullScreenDropdown from "../Common/FullScreenDropdown";
import NotificationDropdown from "../Common/NotificationDropdown";
import ProfileDropdown from "../Common/ProfileDropdown";
import LayoutModeDropdown from "Common/LayoutModeDropdown";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//import images
import logosm from "../assets/images/logo.png";
import logodark from "../assets/images/logo.png";
import logolight from "../assets/images/logo.png";
import Swal from "sweetalert2";
import {
  useGetAllModePricesQuery,
  useUpdateModePriceMutation,
} from "features/modePrice/modePriceSlice";

const toogleMenuBtn = () => {
  var windowSize = document.documentElement.clientWidth;

  if (windowSize > 767)
    document.querySelector(".hamburger-icon")?.classList.toggle("open");

  //For collapse horizontal menu
  if (document.documentElement.getAttribute("data-layout") === "horizontal") {
    document.body.classList.contains("menu")
      ? document.body.classList.remove("menu")
      : document.body.classList.add("menu");
  }

  //For collapse vertical menu
  if (document.documentElement.getAttribute("data-layout") === "vertical") {
    if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove("vertical-sidebar-enable");
      document.documentElement.getAttribute("data-sidebar-size") === "sm"
        ? document.documentElement.setAttribute("data-sidebar-size", "")
        : document.documentElement.setAttribute("data-sidebar-size", "sm");
    } else if (windowSize > 1025) {
      document.body.classList.remove("vertical-sidebar-enable");
      document.documentElement.getAttribute("data-sidebar-size") === "lg"
        ? document.documentElement.setAttribute("data-sidebar-size", "sm")
        : document.documentElement.setAttribute("data-sidebar-size", "lg");
    } else if (windowSize <= 767) {
      document.body.classList.add("vertical-sidebar-enable");
      document.documentElement.setAttribute("data-sidebar-size", "lg");
    }
  }

  //Two column menu
  if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
    document.body.classList.contains("twocolumn-panel")
      ? document.body.classList.remove("twocolumn-panel")
      : document.body.classList.add("twocolumn-panel");
  }
};

const Header = () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const { data: modePricing = [] } = useGetAllModePricesQuery();
  const [updateModeMutation] = useUpdateModePriceMutation();
  const handleUpdate = () => {
    updateModeMutation({
      _id: modePricing[0]._id,
      type: modePricing[0].type === "1" ? "0" : "1",
    });
  };
  // function for handleClick Mode
  const handleClickMode = () => {
    setChangeMode(!changeMode);
  };

  const AlertConfirm = async () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are You Sure?",
        text: "You won't be able to go back !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, change it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          handleClickMode();
          handleUpdate();
          swalWithBootstrapButtons.fire(
            "Changed !",
            "The Mode has been changed.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "The Mode is still the same :)",
            "info"
          );
        }
      });
  };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logosm} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logodark} alt="" height="25" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logosm} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logolight} alt="" height="25" />
                  </span>
                </Link>
              </div>

              <Button
                variant="link"
                size="sm"
                type="button"
                className="px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
                onClick={toogleMenuBtn}
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </Button>

              {/* SearchModal */}
              <SearchModal />
            </div>

            <div className="d-flex align-items-center">
              <div className="d-md-none topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle"
                  id="page-header-search-dropdown"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                >
                  <i className="bi bi-search fs-16"></i>
                </button>
              </div>

              <button
                type="button"
                onClick={() => AlertConfirm()}
                className={`btn btn-darken-success custom-toggle btn-lg ${
                  changeMode === false && modePricing[0]?.type! === "0"
                    ? "btn-darken-info"
                    : "btn-darken-success"
                }`}
                data-bs-toggle="button"
              >
                <span className="icon-on">
                  <i
                    className={`${
                      changeMode === false && modePricing[0]?.type! === "0"
                        ? "mdi mdi-human-greeting-variant align-bottom me-1"
                        : "mdi mdi-robot-excited-outline align-bottom me-1"
                    }`}
                  ></i>
                  {changeMode === false && modePricing[0]?.type! === "0"
                    ? "Manual"
                    : "Automatic"}
                </span>
              </button>
              {/* Setting Dropdown */}
              <SettingDropdown />

              {/* FullScreenDropdown */}
              <FullScreenDropdown />

              {/* Layout Mode Dropdown */}
              <LayoutModeDropdown />

              {/* Notes Dropdown */}
              <NotesDropdown />

              {/* NotificationDropdown */}
              <NotificationDropdown />

              {/* ProfileDropdown */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <div
        id="removeNotificationModal"
        className="modal fade zoomIn"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="NotificationModalbtn-close"
              ></button>
            </div>
            <div className="modal-body p-md-5">
              <div className="text-center">
                <div className="text-danger">
                  <i className="bi bi-trash display-4"></i>
                </div>
                <div className="mt-4 fs-15">
                  <h4 className="mb-1">Are you sure ?</h4>
                  <p className="text-muted mx-4 mb-0">
                    Are you sure you want to remove this Notification ?
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                <button
                  type="button"
                  className="btn w-sm btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn w-sm btn-danger"
                  id="delete-notification"
                >
                  Yes, Delete It!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
