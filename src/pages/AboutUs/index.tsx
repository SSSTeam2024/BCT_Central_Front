import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col, Form, Image } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import {
  AboutUsModel,
  useGetAboutUsComponentsQuery,
  useUpdateAboutUsMutation,
} from "features/AboutUsComponent/aboutUsSlice";
import "./styles.css";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";

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

const AboutUs = () => {
  document.title = "About Us | Coach Hire Network";
  const { data: aboutUsData = [] } = useGetAboutUsComponentsQuery();
  const { data: allPages = [] } = useGetAllPagesQuery();
  const [updateAboutUs] = useUpdateAboutUsMutation();

  const [localDisplay, setLocalDisplay] = useState<string | undefined>(
    undefined
  );

  const [selectedPage, setSelectedPage] = useState<string>("");
  const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPage(value);
  };

  const filtredAboutUsData = aboutUsData.filter(
    (aboutUs) => aboutUs.page === selectedPage
  );

  useEffect(() => {
    if (filtredAboutUsData[0]?.image?.display) {
      setLocalDisplay(filtredAboutUsData[0].image.display);
    }
  }, [filtredAboutUsData]);

  const [editingField, setEditingField] = useState<{
    id: string;
    field: string | null;
  }>({ id: "", field: null });
  const [editedValue, setEditedValue] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCheckboxChange = (
    about: AboutUsModel,
    field: keyof AboutUsModel,
    value: boolean
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "display" in about[field]!
    ) {
      const updatedData: AboutUsModel = {
        ...about,
        [field]: {
          ...about[field],
          display: value ? "1" : "0",
        },
      };

      updateAboutUs(updatedData)
        .unwrap()
        .then(() => {
          console.log("Update successful");
        })
        .catch((error) => {
          console.error("Update failed:", error);
        });
    } else {
      console.warn("Invalid field or format for update");
    }
  };

  const handleEditStart = (id: string, field: string, value: string) => {
    setEditingField({ id, field });
    setEditedValue(value);
  };

  const handleEditSave = (about: AboutUsModel, field: keyof AboutUsModel) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "name" in about[field]!
    ) {
      const updatedData = {
        ...about,
        [field]: {
          ...about[field],
          name: editedValue,
        },
      };
      updateAboutUs(updatedData);
      setEditingField({ id: "", field: null });
    }
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "content" in about[field]!
    ) {
      const updatedData = {
        ...about,
        [field]: {
          ...about[field],
          content: editedValue,
        },
      };
      updateAboutUs(updatedData);
      setEditingField({ id: "", field: null });
    }
    if (field === "button") {
      const [label, link] = editedValue.split("|");
      const updatedData = {
        ...about,
        [field]: {
          ...about[field],
          label,
          link,
        },
      };
      updateAboutUs(updatedData);
      setEditingField({ id: "", field: null });
    }
  };

  const handleCheckboxChangeWithLocalUpdate = (
    about: AboutUsModel,
    field: keyof AboutUsModel,
    value: boolean
  ) => {
    setLocalDisplay(value ? "1" : "0"); // Immediate UI update
    handleCheckboxChange(about, field, value); // Trigger mutation
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    about: AboutUsModel,
    field: keyof AboutUsModel
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
      updateAboutUs(updatedData);
      setEditingField({ id: "", field: null });
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="About Us" pageTitle="Web Site Settings" />
          <Card>
            <Card.Header>
              <Row>
                <Col lg={1}>
                  <Form.Label>Page: </Form.Label>
                </Col>
                <Col lg={4}>
                  <select className="form-select" onChange={handleSelectPage}>
                    <option value="">Choose ...</option>
                    {allPages.map((page) => (
                      <option value={page?.link!} key={page?._id!}>
                        {page?.label!}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
              {filtredAboutUsData.length !== 0 ? (
                filtredAboutUsData.map((about) => (
                  <div className="hstack gap-2 p-4">
                    <input
                      style={{
                        marginBottom: "10px",
                        marginTop: "-8px",
                      }}
                      type="checkbox"
                      checked={localDisplay === "1"}
                      onChange={(e) =>
                        handleCheckboxChangeWithLocalUpdate(
                          about,
                          "image",
                          e.target.checked
                        )
                      }
                    />
                    <div className="vstack gap-2">
                      {previewImage ? (
                        <Image
                          src={previewImage}
                          alt="Preview"
                          className="rounded"
                          width="320"
                        />
                      ) : (
                        <Image
                          src={`${process.env.REACT_APP_BASE_URL}/aboutUs/${about?.image.path}`}
                          alt=""
                          className="rounded"
                          width="320"
                        />
                      )}
                      <div className="d-flex justify-content-center mt-n2">
                        <label
                          htmlFor="image"
                          className="mb-0"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          title="Select image"
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
                          name="image"
                          id="image"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, about, "image")}
                          style={{ width: "210px", height: "120px" }}
                        />
                      </div>
                    </div>
                    <span
                      className="bg-danger text-white"
                      style={{
                        borderRadius: "50%",
                        fontSize: "50px",
                        lineHeight: "80px",
                      }}
                    >
                      <i className="bx bxs-quote-alt-left bx-tada"></i>
                    </span>
                    <div className="vstack gap-3">
                      <div className="hstack gap-2">
                        <input
                          style={{
                            marginBottom: "10px",
                            marginTop: "-8px",
                          }}
                          type="checkbox"
                          checked={about.littleTitle.display === "1"}
                          onChange={(e) =>
                            handleCheckboxChange(
                              about,
                              "littleTitle",
                              e.target.checked
                            )
                          }
                        />
                        {editingField.id === about._id &&
                        editingField.field === "littleTitle" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedValue}
                            autoFocus
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() => handleEditSave(about, "littleTitle")}
                          />
                        ) : (
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: "13px",
                              fontWeight: 600,
                              marginBottom: "10px",
                              marginTop: "-8px",
                              color: "#CD2528",
                            }}
                          >
                            {about.littleTitle.name}
                          </span>
                        )}
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              about._id as string,
                              "littleTitle",
                              about.littleTitle.name
                            )
                          }
                        ></i>
                      </div>
                      <div className="hstack gap-2">
                        <input
                          type="checkbox"
                          checked={about.bigTitle.display === "1"}
                          onChange={(e) =>
                            handleCheckboxChange(
                              about,
                              "bigTitle",
                              e.target.checked
                            )
                          }
                        />
                        {editingField.id === about._id &&
                        editingField.field === "bigTitle" ? (
                          <input
                            className="form-control"
                            type="text"
                            autoFocus
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() => handleEditSave(about, "bigTitle")}
                          />
                        ) : (
                          <h2 className="h2-with-after">
                            {about.bigTitle.name}
                          </h2>
                        )}
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              about._id as string,
                              "bigTitle",
                              about.bigTitle.name
                            )
                          }
                        ></i>
                      </div>
                      <div className="hstack gap-2">
                        <input
                          type="checkbox"
                          checked={about.paragraph.display === "1"}
                          onChange={(e) =>
                            handleCheckboxChange(
                              about,
                              "paragraph",
                              e.target.checked
                            )
                          }
                        />
                        {editingField.id === about._id &&
                        editingField.field === "paragraph" ? (
                          <textarea
                            className="form-control"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() => {
                              if (editedValue.trim() !== "") {
                                handleEditSave(about, "paragraph");
                              } else {
                                setEditingField({ id: "", field: null });
                              }
                            }}
                          />
                        ) : (
                          <span>{about.paragraph.content}</span>
                        )}
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              about._id as string,
                              "paragraph",
                              about.paragraph.content
                            )
                          }
                        />
                      </div>
                      <div className="hstack gap-2">
                        <input
                          type="checkbox"
                          checked={about.button.display === "1"}
                          onChange={(e) =>
                            handleCheckboxChange(
                              about,
                              "button",
                              e.target.checked
                            )
                          }
                        />
                        {editingField.id === about._id &&
                        editingField.field === "button" ? (
                          <select
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() => handleEditSave(about, "button")}
                            className="form-control w-25"
                          >
                            {allPages.map((page) => (
                              <option
                                value={`${page.label}|${page.link}`}
                                key={page?._id!}
                              >
                                {page.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <button
                            type="button"
                            style={{ width: "100px" }}
                            className="btn btn-danger btn-animation"
                            data-text={`${about.button.label}`}
                          >
                            <span>{about.button.label}</span>
                          </button>
                        )}
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              about._id as string,
                              "button",
                              `${about.button.label}|${about.button.link}`
                            )
                          }
                        ></i>
                      </div>
                      {/* <button
                      type="button"
                      style={{ width: "100px" }}
                      className="btn btn-danger btn-animation"
                      data-text={`${about.button.label}`}
                    >
                      <span>{about.button.label}</span>
                    </button> */}
                    </div>
                  </div>
                ))
              ) : (
                <h4 className="m-5 d-flex justify-content-center">
                  Please Select a page with About Us Section to update it !!
                </h4>
              )}
            </Card.Header>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default AboutUs;
