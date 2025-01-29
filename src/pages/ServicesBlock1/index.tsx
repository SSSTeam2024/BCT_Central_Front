import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Image,
  Tab,
  Nav,
  Form,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import {
  useAddTabToOurValueMutation,
  useGetOurValueQuery,
  useUpdateOurValuesMutation,
} from "features/OurValuesComponent/ourValuesSlice";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import {
  useAddTabToBestOfferMutation,
  useGetBestOffersQuery,
  useUpdateBestOfferMutation,
} from "features/bestOfferComponent/bestOfferSlice";
import {
  Block1Model,
  useGetBlock1sQuery,
  useUpdateBlock1Mutation,
} from "features/block1Component/block1Slice";
import aboutus from "assets/images/about-us.jpg";
import avatar2 from "assets/images/users/avatar-2.jpg";

interface Block1ModelInterface {
  image: {
    path: string;
    display: string;
  };
  littleTitle: {
    name: string;
    display: string;
  };
  bigTitle: {
    name: string;
    display: string;
  };
  subTitle: {
    name: string;
    display: string;
  };
  tabs: {
    title: string;
    icon: string;
    content: string;
  }[];
}

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

const ServicesBlock1 = () => {
  document.title = "Services Block 1 | Coach Hire Network";
  const { data = [] } = useGetBlock1sQuery();
  const [updateOurValue] = useUpdateBlock1Mutation();
  const { data: AllPages = [] } = useGetAllPagesQuery();

  const [selectedPage, setSelectedPage] = useState<string>("");
  const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPage(value);
  };

  const filtredOurValuesData = data.filter(
    (ourValue) => ourValue.page === selectedPage
  );

  const [localDisplay, setLocalDisplay] = useState<string | undefined>(
    undefined
  );
  const [addNewTabForm, setAddNewTabForm] = useState<boolean>(false);
  useEffect(() => {
    if (data[0]?.image?.display) {
      setLocalDisplay(data[0].image.display);
    }
  }, [data]);

  const [editingField, setEditingField] = useState<{
    id: string;
    field: string | null;
  }>({ id: "", field: null });

  const [editedValue, setEditedValue] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] =
    useState<string>("From Our Pages");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRadioChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = (
    about: Block1Model,
    field: keyof Block1ModelInterface,
    value: boolean
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "display" in about[field]
    ) {
      const updatedData: Block1Model = {
        ...about,
        [field]: {
          ...about[field],
          display: value ? "1" : "0",
        },
      };

      updateOurValue(updatedData)
        .unwrap()
        .then(() => {
          console.log("Update successful");
        })
        .catch((error) => {
          console.error("Update failed:", error);
        });
    } else {
      console.warn(
        `Field "${field}" is not structured as expected or lacks a 'display' property`,
        about[field]
      );
    }
  };

  const handleTabCheckboxChange = (
    about: Block1Model,
    index: number,
    value: boolean,
    field: keyof (typeof about.tabs)[0]
  ) => {
    const updatedTabs = about.tabs.map((tab, i) =>
      i === index
        ? {
            ...tab,
            [field]: value ? "1" : "0",
          }
        : tab
    );

    const updatedData = { ...about, tabs: updatedTabs };
    updateOurValue(updatedData)
      .unwrap()
      .then(() => console.log("Checkbox update successful"))
      .catch((error) => console.error("Checkbox update failed:", error));
  };

  const handleEditStart = (id: string, field: string, value: string) => {
    setEditingField({ id, field });
    setEditedValue(value);
  };

  const handleEditSave = (
    about: Block1Model,
    field: keyof Block1ModelInterface,
    index: number,
    subfield: keyof (typeof about.tabs)[0],
    value: string
  ) => {
    const updatedTabs = about.tabs.map((tab, i) =>
      i === index
        ? {
            ...tab,
            [subfield]: value,
          }
        : { ...tab }
    );

    const updatedData = { ...about, tabs: updatedTabs };

    updateOurValue(updatedData)
      .unwrap()
      .then(() => setEditingField({ id: "", field: null }))
      .catch((error) => console.error("Update failed:", error));
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    about: Block1Model,
    field: keyof Block1ModelInterface
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const updatedData = {
        ...about,
        image_base64: base64Data,
        image_extension: extension,
        image: {
          ...about.image,
          path: `${base64Data}.${extension}`,
        },
      };
      setPreviewImage(`data:image/${extension};base64,${base64Data}`);
      updateOurValue(updatedData);
      setEditingField({ id: "", field: null });
    }
  };

  const handleSelectChange = (
    about: Block1Model,
    index: number,
    selectedLink: string
  ) => {
    const selectedPage = AllPages.find((page) => page.link === selectedLink);

    if (selectedPage) {
      const updatedTabs = about.tabs.map((tab, i) =>
        i === index
          ? {
              ...tab,
              buttonLabel: selectedPage.label,
              buttonLink: selectedPage.link,
            }
          : tab
      );

      const updatedData = { ...about, tabs: updatedTabs };

      updateOurValue(updatedData)
        .unwrap()
        .then(() => console.log("Button update successful"))
        .catch((error) => console.error("Button update failed:", error));
    }
  };

  const handleEditSaveField = (
    about: Block1Model,
    field: keyof Block1ModelInterface,
    value: string
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "name" in about[field]
    ) {
      const updatedData = {
        ...about,
        [field]: { ...about[field], name: value },
      };

      updateOurValue(updatedData)
        .unwrap()
        .then(() => setEditingField({ id: "", field: null }))
        .catch((error) => console.error("Edit save failed:", error));
    } else {
      console.error("Invalid field for editing:", field);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    display: "1",
    content: "",
    buttonLabel: "",
    buttonLink: "",
    buttonDisplay: "",
  });

  const [addTabToOurValue] = useAddTabToBestOfferMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleBlur = () => {
    let link = formData.buttonLink.trim();

    const validExtensions = /\.(com|fr|uk|org|net)$/i;
    if (!validExtensions.test(link)) {
      setErrorMessage(
        "Please enter a valid link with a valid domain extension (e.g., .com, .fr, .org)."
      );
      return;
    }

    if (!/^https?:\/\/www\./.test(link)) {
      link = `https://www.${link
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")}`;
    }

    setFormData((prev) => ({
      ...prev,
      buttonLink: link,
    }));
  };

  const location = useLocation();
  const ourValues = location.state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTabToOurValue({
        _id: filtredOurValuesData[0]?._id!,
        tabData: formData,
      }).unwrap();
      alert("Tab added successfully!");
      setFormData({
        title: "",
        display: "",
        content: "",
        buttonLabel: "",
        buttonLink: "",
        buttonDisplay: "",
      });
      setAddNewTabForm(!addNewTabForm);
    } catch (error) {
      console.error("Error adding tab:", error);
      alert("Failed to add tab.");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Services Block 1" pageTitle="Web Site Settings" />
          <Card>
            <Card.Header className="p-3">
              <Row className="p-3">
                <Col lg={1}>
                  <Form.Label>Pages:</Form.Label>
                </Col>
                <Col lg={4}>
                  <select className="form-select" onChange={handleSelectPage}>
                    <option value="">Select page</option>
                    {AllPages.map((page) => (
                      <option value={page.link} key={page?._id!}>
                        {page.label}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {filtredOurValuesData.length !== 0 ? (
                filtredOurValuesData.map((value) => (
                  <>
                    <Row className="d-flex justify-content-center">
                      <div className="vstack gap-2">
                        <div className="hstack gap-2 justify-content-center">
                          <input
                            type="checkbox"
                            checked={value.littleTitle?.display === "1"}
                            onChange={(e) =>
                              handleCheckboxChange(
                                value,
                                "littleTitle",
                                e.target.checked
                              )
                            }
                          />
                          {editingField.id === value._id &&
                          editingField.field === "littleTitle" ? (
                            <input
                              type="text"
                              className="form-control"
                              value={editedValue}
                              autoFocus
                              onChange={(e) => setEditedValue(e.target.value)}
                              onBlur={() =>
                                handleEditSaveField(
                                  value,
                                  "littleTitle",
                                  editedValue
                                )
                              }
                            />
                          ) : (
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#CD2528",
                              }}
                            >
                              {value.littleTitle.name}
                            </span>
                          )}
                          <i
                            className="bi bi-pencil"
                            style={{ cursor: "pointer", marginLeft: "8px" }}
                            onClick={() =>
                              handleEditStart(
                                value._id as string,
                                "littleTitle",
                                value.littleTitle.name
                              )
                            }
                          ></i>
                        </div>
                        <div className="hstack gap-2 justify-content-center">
                          <input
                            type="checkbox"
                            checked={value.bigTitle.display === "1"}
                            onChange={(e) =>
                              handleCheckboxChange(
                                value,
                                "bigTitle",
                                e.target.checked
                              )
                            }
                          />
                          {editingField.id === value._id &&
                          editingField.field === "bigTitle" ? (
                            <input
                              type="text"
                              className="form-control mb-3"
                              value={editedValue}
                              autoFocus
                              onChange={(e) => setEditedValue(e.target.value)}
                              onBlur={() =>
                                handleEditSaveField(
                                  value,
                                  "bigTitle",
                                  editedValue
                                )
                              }
                            />
                          ) : (
                            <h2 className="h2-with-after">
                              {value.bigTitle.name}
                            </h2>
                          )}
                          <i
                            className="bi bi-pencil"
                            style={{ cursor: "pointer", marginLeft: "8px" }}
                            onClick={() =>
                              handleEditStart(
                                value._id as string,
                                "bigTitle",
                                value.bigTitle.name
                              )
                            }
                          ></i>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div
                        style={{
                          backgroundImage: `url(${aboutus})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        className="p-3"
                      >
                        <Card className="w-75">
                          <Card.Header className="bg-transparent border-0">
                            <div className="hstack gap-3">
                              <input
                                type="checkbox"
                                checked={value.subTitle.display === "1"}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    value,
                                    "subTitle",
                                    e.target.checked
                                  )
                                }
                              />
                              {editingField.field === "subTitle" ? (
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editedValue}
                                  autoFocus
                                  onChange={(e) =>
                                    setEditedValue(e.target.value)
                                  }
                                  onBlur={() =>
                                    handleEditSaveField(
                                      value,
                                      "subTitle",
                                      editedValue
                                    )
                                  }
                                />
                              ) : (
                                <h4>{value.subTitle.name}</h4>
                              )}
                              <i
                                className="bi bi-pencil"
                                style={{ cursor: "pointer", marginLeft: "8px" }}
                                onClick={() =>
                                  handleEditStart(
                                    value._id as string,
                                    "subTitle",
                                    value.subTitle.name
                                  )
                                }
                              ></i>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <table>
                              <tbody>
                                {/* First row with the first 3 tabs */}
                                <tr>
                                  {value.tabs.map((tab, index) => (
                                    <td
                                      key={index}
                                      //   className="w-25 border-bottom border-end p-3"
                                      className="border-bottom border-end"
                                    >
                                      <div className="vstack gap-2">
                                        {/* <i className="flaticon-stopwatch"></i> */}
                                        {editingField.id === value._id &&
                                        editingField.field ===
                                          `title-${index}` ? (
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={editedValue}
                                            onChange={(e) =>
                                              setEditedValue(e.target.value)
                                            }
                                            onBlur={() =>
                                              handleEditSave(
                                                value,
                                                "tabs",
                                                index,
                                                "title",
                                                editedValue
                                              )
                                            }
                                            autoFocus
                                          />
                                        ) : (
                                          <div className="hstack gap-2">
                                            <h6>{tab.title}</h6>
                                            <button
                                              className="btn btn-link p-0 ms-2"
                                              onClick={() =>
                                                handleEditStart(
                                                  value?._id!,
                                                  `title-${index}`,
                                                  tab.title
                                                )
                                              }
                                            >
                                              <i className="bi bi-pencil"></i>
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  ))}
                                </tr>

                                {/* Second row with the next 3 tabs */}
                                {/* <tr>
                                  {value.tabs.slice(3, 6).map((tab, index) => (
                                    <td
                                      key={index}
                                      className="w-25 border-end p-3"
                                    >
                                      <div className="vstack gap-2">
                                        {editingField.id === value._id &&
                                        editingField.field ===
                                          `title-${index}` ? (
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={editedValue}
                                            onChange={(e) =>
                                              setEditedValue(e.target.value)
                                            }
                                            onBlur={() =>
                                              handleEditSave(
                                                value,
                                                "tabs",
                                                index,
                                                "title",
                                                editedValue
                                              )
                                            }
                                            autoFocus
                                          />
                                        ) : (
                                          <div className="hstack gap-2">
                                            <h6>{tab.title}</h6>
                                            <button
                                              className="btn btn-link p-0 ms-2"
                                              onClick={() =>
                                                handleEditStart(
                                                  value?._id!,
                                                  `title-${index}`,
                                                  tab.title
                                                )
                                              }
                                            >
                                              <i className="bi bi-pencil"></i>
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  ))}
                                </tr> */}
                              </tbody>
                            </table>
                          </Card.Body>
                        </Card>
                      </div>
                    </Row>
                  </>
                ))
              ) : (
                <h4 className="m-5 d-flex justify-content-center">
                  Please Select a page with Our Values Section to update it !!
                </h4>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default ServicesBlock1;
