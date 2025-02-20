import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col, Image } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  HeaderModel,
  useGetAllHeadersQuery,
  useUpdateHeaderMutation,
} from "features/header/headerSlice";

function convertToBase64(
  file: File
): Promise<{ base64Data: string; extension: string }> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      const [, base64Data] = base64String.split(",");
      const extension = file.name.split(".").pop() ?? "";
      resolve({ base64Data, extension });
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsDataURL(file);
  });
}

const Header = () => {
  document.title = "WebSite Header | Coach Hire Network";
  const [hovered, setHovered] = useState<string>("");
  const { data = [] } = useGetAllHeadersQuery();
  const navigate = useNavigate();

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Header updated successfully",
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

  // const location = useLocation();
  // const data = location.state;
  const [isEditingPhoneLabel, setIsEditingPhoneLabel] = useState(false);
  const [isEditingPhoneValue, setIsEditingPhoneValue] = useState(false);
  const [isEditingEmailLabel, setIsEditingEmailLabel] = useState(false);
  const [isEditingEmailValue, setIsEditingEmailValue] = useState(false);
  const [isEditingAddressLabel, setIsEditingAddressLabel] = useState(false);
  const [isEditingAddressValue, setIsEditingAddressValue] = useState(false);
  const [phoneLabel, setPhoneLabel] = useState(data[0]?.phone_label!);
  const [phoneValue, setPhoneValue] = useState(data[0]?.phone_value!);
  const [emailValue, setEmailValue] = useState(data[0]?.email_value!);
  const [emailLabel, setEmailLabel] = useState(data[0]?.email_label!);
  const [addressValue, setAddressValue] = useState(data[0]?.address_value!);
  const [addressLabel, setAddressLabel] = useState(data[0]?.address_label!);
  const [buttonText, setButtonText] = useState(data[0]?.button_text!);
  const [isEditing, setIsEditing] = useState(false);
  //   const [isAddressChecked, setIsAddressChecked] = useState(
  //     data[0]?.address_display! === "1"
  //   );
  //   const [isEmailChecked, setIsEmailChecked] = useState(
  //     data[0]?.email_display! === "1"
  //   );
  useEffect(() => {
    if (data.length > 0) {
      setPhoneLabel(data[0]?.phone_label);
      setPhoneValue(data[0]?.phone_value);
      setEmailValue(data[0]?.email_value);
      setEmailLabel(data[0]?.email_label);
      setAddressValue(data[0]?.address_value);
      setAddressLabel(data[0]?.address_label);
      setButtonText(data[0]?.button_text);
    }
  }, [data]);
  //! Phone Label
  const handleIconClick = () => {
    setIsEditingPhoneLabel(true);
  };

  const handleInputChange = (e: any) => {
    setPhoneLabel(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditingPhoneLabel(false);
  };

  //! Phone Value
  const handleIconPhoneValueClick = () => {
    setIsEditingPhoneValue(true);
  };

  const handleInputPhoneValueChange = (e: any) => {
    setPhoneValue(e.target.value);
  };

  const handleInputPhoneWalueBlur = () => {
    setIsEditingPhoneValue(false);
  };

  //! Email Value
  const handleIconEmailValueClick = () => {
    setIsEditingEmailValue(true);
  };

  const handleInputEmailValueChange = (e: any) => {
    setEmailValue(e.target.value);
  };

  const handleInputEmailValueBlur = () => {
    setIsEditingEmailValue(false);
  };

  //! Email Label
  const handleIconEmailLabelClick = () => {
    setIsEditingEmailLabel(true);
  };

  const handleInputEmailLabelChange = (e: any) => {
    setEmailLabel(e.target.value);
  };

  const handleInputEmailLabelBlur = () => {
    setIsEditingEmailLabel(false);
  };

  //! Address Label
  const handleIconAddressLabelClick = () => {
    setIsEditingAddressLabel(true);
  };

  const handleInputAddressLabelChange = (e: any) => {
    setAddressLabel(e.target.value);
  };

  const handleInputAddressLabelBlur = () => {
    setIsEditingAddressLabel(false);
  };

  //! Address Value
  const handleIconAddressValueClick = () => {
    setIsEditingAddressValue(true);
  };

  const handleInputAddressValueChange = (e: any) => {
    setAddressValue(e.target.value);
  };

  const handleInputAddressValueBlur = () => {
    setIsEditingAddressValue(false);
  };

  //! Button
  const handleButtonIconClick = () => {
    setIsEditing(true);
  };

  const handleInputButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonText(e.target.value);
  };

  const handleInputButtonBlur = () => {
    setIsEditing(false);
  };

  const [updateHeaderMutation] = useUpdateHeaderMutation();

  const initialHeader = {
    _id: "",
    logo_link: "",
    logo: "",
    logo_base64: "",
    logo_extension: "",
    phone_label: "",
    phone_value: "",
    email_label: "",
    email_value: "",
    button_text: "",
    button_link: "",
    color: "",
    address_label: "",
    address_value: "",
    phone_display: "",
    email_display: "",
    button_display: "",
    address_display: "",
  };

  const [updateHeader, setUpdateHeader] = useState<HeaderModel>({
    ...initialHeader,
    ...data,
  });

  const [isAddressChecked, setIsAddressChecked] = useState(
    updateHeader.address_display === "1"
  );
  const [isEmailChecked, setIsEmailChecked] = useState(
    updateHeader.email_display === "1"
  );

  const [isPhoneChecked, setIsPhoneChecked] = useState(
    updateHeader.phone_display === "1"
  );

  const [isButtonChecked, setIsButtonChecked] = useState(
    updateHeader.button_display === "1"
  );

  const handleAddressCheckboxChange = () => {
    const newCheckedState = !isAddressChecked;
    setIsAddressChecked(newCheckedState);

    setUpdateHeader((prev) => ({
      ...prev,
      address_display: newCheckedState ? "1" : "0",
    }));
  };

  const handleEmailCheckboxChange = () => {
    const newCheckedState = !isEmailChecked;
    setIsEmailChecked(newCheckedState);
    setUpdateHeader((prev) => ({
      ...prev,
      email_display: newCheckedState ? "1" : "0",
    }));
  };

  const handlePhoneCheckboxChange = () => {
    const newCheckedState = !isPhoneChecked;
    setIsPhoneChecked(newCheckedState);
    setUpdateHeader((prev) => ({
      ...prev,
      phone_display: newCheckedState ? "1" : "0",
    }));
  };

  useEffect(() => {
    setIsEmailChecked(data[0]?.email_display === "1");
    setIsPhoneChecked(data[0]?.phone_display === "1");
    setIsButtonChecked(data[0]?.button_display === "1");
    setUpdateHeader((prev) => ({
      ...prev,
      ...data,
    }));
  }, [data]);

  const handleButtonCheckboxChange = () => {
    const newCheckedState = !isButtonChecked;
    setIsButtonChecked(newCheckedState);
    setUpdateHeader((prev) => ({
      ...prev,
      button_display: newCheckedState ? "1" : "0",
    }));
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("logo") as HTMLFormElement).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setUpdateHeader({
        ...updateHeader,
        logo: profileImage,
        logo_base64: base64Data,
        logo_extension: extension,
      });
    }
  };

  const {
    _id,
    logo_link,
    logo,
    logo_base64,
    logo_extension,
    phone_label,
    phone_value,
    email_label,
    email_value,
    button_text,
    button_link,
    color,
    address_label,
    address_value,
    phone_display,
    email_display,
    button_display,
    address_display,
  } = updateHeader as HeaderModel;

  const onSubmitUpdateHeader = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      updateHeader["_id"] = data[0]?._id!;
      updateHeader["phone_label"] = phoneLabel;
      updateHeader["phone_value"] = phoneValue;
      updateHeader["email_label"] = emailLabel;
      updateHeader["email_value"] = emailValue;
      updateHeader["address_label"] = addressLabel;
      updateHeader["address_value"] = addressValue;
      updateHeader["button_text"] = buttonText;

      if (isButtonChecked) {
        updateHeader["button_display"] = "1";
      } else {
        updateHeader["button_display"] = "0";
      }
      if (isEmailChecked) {
        updateHeader["email_display"] = "1";
      } else {
        updateHeader["email_display"] = "0";
      }
      if (isPhoneChecked) {
        updateHeader["phone_display"] = "1";
      } else {
        updateHeader["phone_display"] = "0";
      }
      if (!updateHeader.logo_base64) {
        updateHeader["logo"] = data[0]?.logo!;
        updateHeader["logo_base64"] = data[0]?.logo_base64!;
        updateHeader["logo_extension"] = data[0]?.logo_extension!;
      }

      await updateHeaderMutation(updateHeader);
      notifySuccess();
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Header" pageTitle="Web Site Settings" />

          <Card>
            <Card.Header>
              <Row className="p-3">
                <Col lg={2}>
                  {updateHeader.logo && updateHeader.logo_base64 ? (
                    <Image
                      src={`data:image/jpeg;base64, ${updateHeader.logo_base64}`}
                      alt=""
                      className="img-thumbnail"
                      width="200"
                    />
                  ) : (
                    <Image
                      src={`${process.env.REACT_APP_BASE_URL}/header/${data[0]
                        ?.logo!}`}
                      alt=""
                      className="img-thumbnail"
                      width="160"
                    />
                  )}
                  <div className="d-flex justify-content-center mt-n2">
                    <label
                      htmlFor="logo"
                      className="mb-0"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="Select logo"
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
                      name="logo"
                      id="logo"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e)}
                      style={{ width: "210px", height: "120px" }}
                    />
                  </div>
                </Col>
                <Col lg={10}>
                  <div className="hstack gap-4">
                    <Col>
                      <div className="hstack gap-1">
                        <span className=" badge badge-outline-light text-danger fs-20 rounded-pill ">
                          <i className="ph ph-phone-call"></i>
                        </span>
                        <div className="vstack gap-3">
                          <span className="text-muted fw-medium fs-18 position-relative">
                            {isEditingPhoneLabel ? (
                              <input
                                type="text"
                                value={phoneLabel}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                autoFocus
                                className="form-control d-inline-block w-auto"
                              />
                            ) : (
                              <>
                                {phoneLabel}
                                <i
                                  className="bi bi-pencil-fill position-absolute end-0 bottom-0 text-muted cursor-pointer"
                                  onClick={handleIconClick}
                                  style={{ fontSize: "0.75rem" }}
                                ></i>
                              </>
                            )}
                          </span>
                          <span
                            className={
                              hovered === "phone"
                                ? "text-danger position-relative"
                                : "position-relative"
                            }
                            onMouseEnter={() => setHovered("phone")}
                            onMouseLeave={() => setHovered("")}
                          >
                            {isEditingPhoneValue ? (
                              <input
                                type="text"
                                value={phoneValue}
                                onChange={handleInputPhoneValueChange}
                                onBlur={handleInputPhoneWalueBlur}
                                autoFocus
                                className="form-control d-inline-block w-auto"
                              />
                            ) : (
                              <>
                                {phoneValue}
                                <i
                                  className="bi bi-pencil-fill position-absolute end-0 bottom-0 text-muted cursor-pointer"
                                  onClick={handleIconPhoneValueClick}
                                  style={{ fontSize: "0.75rem" }}
                                ></i>
                              </>
                            )}
                          </span>
                        </div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="formCheck1"
                          checked={isPhoneChecked}
                          onChange={handlePhoneCheckboxChange}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="hstack gap-1">
                        <span className=" badge badge-outline-light text-danger fs-20 rounded-pill ">
                          <i className="ph ph-envelope"></i>
                        </span>
                        <div className="vstack gap-3">
                          <span className="text-muted fw-medium fs-18 position-relative">
                            {isEditingEmailLabel ? (
                              <input
                                type="text"
                                value={emailLabel}
                                onChange={handleInputEmailLabelChange}
                                onBlur={handleInputEmailLabelBlur}
                                autoFocus
                                className="form-control d-inline-block w-auto"
                              />
                            ) : (
                              <>
                                {emailLabel}
                                <i
                                  className="bi bi-pencil-fill position-absolute end-0 bottom-0 text-muted cursor-pointer"
                                  onClick={handleIconEmailLabelClick}
                                  style={{ fontSize: "0.75rem" }}
                                ></i>
                              </>
                            )}
                          </span>
                          <span
                            className={
                              hovered === "email"
                                ? "text-danger position-relative"
                                : "position-relative"
                            }
                            onMouseEnter={() => setHovered("email")}
                            onMouseLeave={() => setHovered("")}
                          >
                            {isEditingEmailValue ? (
                              <input
                                type="text"
                                value={emailValue}
                                onChange={handleInputEmailValueChange}
                                onBlur={handleInputEmailValueBlur}
                                autoFocus
                                className="form-control d-inline-block w-auto"
                              />
                            ) : (
                              <>
                                {emailValue}
                                <i
                                  className="bi bi-pencil-fill position-absolute end-0 bottom-0 text-muted cursor-pointer"
                                  onClick={handleIconEmailValueClick}
                                  style={{ fontSize: "0.75rem" }}
                                ></i>
                              </>
                            )}
                          </span>
                        </div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="formCheck1"
                          checked={isEmailChecked}
                          onChange={handleEmailCheckboxChange}
                        />
                      </div>
                    </Col>
                    {/* <Col>
                      <div className="hstack gap-1">
                        <span className=" badge badge-outline-light text-danger fs-20 rounded-pill ">
                          <i className="ph ph-map-pin"></i>
                        </span>
                        <div className="vstack gap-3">
                          <span className="text-muted fw-medium fs-18 position-relative">
                            {isEditingAddressLabel ? (
                              <input
                                type="text"
                                value={addressLabel}
                                onChange={handleInputAddressLabelChange}
                                onBlur={handleInputAddressLabelBlur}
                                autoFocus
                                className="form-control d-inline-block w-auto"
                              />
                            ) : (
                              <>
                                {addressLabel}
                                <i
                                  className="bi bi-pencil-fill position-absolute end-0 bottom-0 text-muted cursor-pointer"
                                  onClick={handleIconAddressLabelClick}
                                  style={{ fontSize: "0.75rem" }}
                                ></i>
                              </>
                            )}
                          </span>
                          <span
                            className={
                              hovered === "address"
                                ? "text-danger position-relative"
                                : "position-relative"
                            }
                            onMouseEnter={() => setHovered("address")}
                            onMouseLeave={() => setHovered("")}
                          >
                            {isEditingAddressValue ? (
                              <input
                                type="text"
                                value={addressValue}
                                onChange={handleInputAddressValueChange}
                                onBlur={handleInputAddressValueBlur}
                                autoFocus
                                className="form-control d-inline-block w-auto"
                              />
                            ) : (
                              <>
                                {addressValue}
                                <i
                                  className="bi bi-pencil-fill position-absolute end-0 bottom-0 text-muted cursor-pointer"
                                  onClick={handleIconAddressValueClick}
                                  style={{ fontSize: "0.75rem" }}
                                ></i>
                              </>
                            )}
                          </span>
                        </div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="formCheck1"
                          checked={isAddressChecked}
                          onChange={handleAddressCheckboxChange}
                        />
                      </div>
                    </Col> */}
                    <Col>
                      <div className="hstack gap-4">
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-danger btn-animation btn-sm"
                            data-text={buttonText}
                            style={{ position: "relative", overflow: "hidden" }}
                          >
                            <span>{buttonText}</span>
                          </button>
                          {!isEditing && (
                            <span
                              className="text-muted"
                              onClick={handleButtonIconClick}
                            >
                              <i className="bi bi-pencil-fill"></i>{" "}
                            </span>
                          )}
                          {isEditing && (
                            <input
                              type="text"
                              value={buttonText}
                              onChange={handleInputButtonChange}
                              onBlur={handleInputButtonBlur}
                              autoFocus
                              className="form-control d-inline-block w-auto"
                            />
                          )}
                        </div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="formCheck1"
                          checked={isButtonChecked}
                          onChange={handleButtonCheckboxChange}
                        />
                      </div>
                    </Col>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <button
                type="button"
                className="btn btn-success float-end"
                onClick={(e) => onSubmitUpdateHeader(e)}
              >
                Update
              </button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Header;
