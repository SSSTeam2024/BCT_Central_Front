import React, { useState } from "react";
import {
  Container,
  Dropdown,
  Form,
  Row,
  Card,
  Col,
  Button,
  Image,
  ListGroup,
  Modal,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import img1 from "assets/images/brands/img-1.png";
import img2 from "assets/images/brands/img-2.png";
import img3 from "assets/images/brands/img-3.png";
import img4 from "assets/images/brands/img-4.png";
import img5 from "assets/images/brands/img-5.png";
import img6 from "assets/images/brands/img-6.png";
import img7 from "assets/images/brands/img-7.png";
import img8 from "assets/images/brands/img-8.png";
import img9 from "assets/images/brands/img-9.png";
import img10 from "assets/images/brands/img-10.png";
import img11 from "assets/images/brands/img-11.png";
import img12 from "assets/images/brands/img-12.png";
import img13 from "assets/images/brands/img-13.png";
import img14 from "assets/images/brands/img-14.png";
import { Link } from "react-router-dom";
import CompanyName from "./CompanyName";
import AddressSetting from "./AddressSetting";
import { SketchPicker } from "react-color";

const CompanyColor = () => {
  const [modal_QuoteInfo, setmodal_QuoteInfo] = useState<boolean>(false);
  function tog_QuoteInfo() {
    setmodal_QuoteInfo(!modal_QuoteInfo);
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Car Type</span>,
      selector: (row: any) => row.carType,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Limit</span>,
      selector: (row: any) => row.Limit,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => row.Price,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      cell: () => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link to="#" className="badge badge-soft-primary edit-item-btn">
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn">
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];
  const data = [
    {
      carType: "10-16 Seat Standard Minibus",
      Limit: "8 hours",
      Price: "£ 5.00",
    },
    {
      carType: "10-16 Seat Standard Minibus",
      Limit: "15 hours",
      Price: "£ 10.00",
    },
    {
      carType: "10-16 Seat Executive Minibus",
      Limit: "8 hours",
      Price: "£ 5.00",
    },
    {
      carType: "10-16 Seat Executive Minibus",
      Limit: "15 hours",
      Price: "£ 10.00",
    },
    {
      carType: "17-24 Seat Standard Midi Coach",
      Limit: "8 hours",
      Price: "£ 6.00",
    },
    {
      carType: "17-24 Seat Standard Midi Coach",
      Limit: "15 hours",
      Price: "£ 12.00",
    },
    {
      carType: "17-24 Seat Executive Midi Coach",
      Limit: "8 hours",
      Price: "£ 6.00",
    },
    {
      carType: "17-24 Seat Executive Midi Coach",
      Limit: "15 hours",
      Price: "£ 12.00",
    },
    {
      carType: "17-24 Seat Luxury Midi Coach",
      Limit: "6 hours",
      Price: "£ 12.00",
    },
    {
      carType: "29 Seat Standard Midi Coach",
      Limit: "8 hours",
      Price: "£ 7.00",
    },
  ];

  const [modal_AddMileage, setmodal_AddMileage] = useState<boolean>(false);
  function tog_AddMileage() {
    setmodal_AddMileage(!modal_AddMileage);
  }

  return (
    <React.Fragment>
      <Col lg={12}>
        <SketchPicker />
      </Col>
    </React.Fragment>
  );
};
export default CompanyColor;
