import React, { useRef, useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image1 from "assets/images/products/img-1.png";
import image2 from "assets/images/products/img-2.png";
import image3 from "assets/images/products/img-3.png";
import image6 from "assets/images/products/img-6.png";
import image5 from "assets/images/products/img-5.png";

const MyCartDropdown = () => {
  const cartItemTotal: any = useRef();
  const emptyCart: any = useRef();
  const cartData = [
    {
      id: 1,
      img: image1,
      product: "Branded T-Shirts",
      quantity: 10,
      price: 32,
      total: 320,
    },
    {
      id: 2,
      img: image2,
      product: "Bentwood Chair",
      quantity: 5,
      price: 18,
      total: 90,
    },
    {
      id: 3,
      img: image3,
      product: "Borosil Paper Cup",
      quantity: 3,
      price: 250,
      total: 750,
    },
    {
      id: 4,
      img: image6,
      product: "Gray Styled T-Shirt",
      quantity: 1,
      price: 1250,
      total: 1250,
    },
    {
      id: 5,
      img: image5,
      product: "Stillbird Helmet",
      quantity: 2,
      price: 495,
      total: 990,
    },
  ];

  const [cartItem, setCartItem] = useState(cartData.length);

  const removeItem = (ele: any) => {
    var price = ele
      .closest(".dropdown-item-cart")
      .querySelector(".cart-item-price").innerHTML;
    var subTotal = cartItemTotal.current.innerHTML;
    cartItemTotal.current.innerHTML = subTotal - price;

    ele.closest(".dropdown-item-cart").remove();
    const element = document.querySelectorAll(".dropdown-item-cart").length;
    const ecart = emptyCart.current;

    if (element === 0) {
      ecart.style.display = "block";
    } else {
      ecart.style.display = "none";
    }

    setCartItem(element);
  };

  return (
    <React.Fragment>
      <Link to="/settings">
        <Dropdown className="topbar-head-dropdown ms-1 header-item">
          <Dropdown.Toggle
            id="cart-dropdown"
            type="button"
            className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle arrow-none"
          >
            <i className="ri ri-settings-5-line fs-22"></i>
          </Dropdown.Toggle>
        </Dropdown>
      </Link>
    </React.Fragment>
  );
};

export default MyCartDropdown;
