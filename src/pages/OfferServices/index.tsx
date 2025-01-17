import React, { useState } from "react";
import { Container, Row, Card, Col, Image } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import {
  OffreServiceModel,
  useAddCardToOfferServiceMutation,
  useGetOfferServiceQuery,
  useUpdateOfferServiceMutation,
} from "features/OffreServicesComponent/offreServicesSlice";
import { useGetAllIconsQuery } from "features/Icons/iconSlice";
import { useLocation } from "react-router-dom";
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

const OfferServices = () => {
  document.title = "Services Offer | Coach Hire Network";
  const { data = [] } = useGetOfferServiceQuery();
  const [updateOfferServices] = useUpdateOfferServiceMutation();
  const { data: AllIcons = [] } = useGetAllIconsQuery();
  const { data: AllPages = [] } = useGetAllPagesQuery();
  const [addNewCardForm, setAddNewCardForm] = useState<boolean>(false);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const filteredServices = data.filter(
    (service) => service.associatedPage === selectedPageId
  );
  const [editingField, setEditingField] = useState<{
    id: string;
    field: string | null;
  }>({ id: "", field: null });

  const [editedValue, setEditedValue] = useState<string>("");

  const handleCheckboxChange = (
    about: OffreServiceModel,
    field: keyof OffreServiceModel,
    value: boolean,
    selectedPageId: string | null
  ) => {
    if (!selectedPageId) {
      alert("Please select a page before updating the display.");
      return;
    }

    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "display" in about[field]
    ) {
      const updatedData: OffreServiceModel = {
        ...about,
        [field]: {
          ...about[field],
          display: value ? "1" : "0",
        },
        associatedPage: value ? selectedPageId : "",
      };

      updateOfferServices(updatedData)
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

  const handleEditStart = (id: string, field: string, value: string) => {
    setEditingField({ id, field });
    setEditedValue(value);
  };

  const handleEditSave = (
    about: OffreServiceModel,
    field: keyof OffreServiceModel,
    index: number,
    subfield: keyof (typeof about.cards)[0],
    value: string
  ) => {
    const updatedCards = about.cards.map((card, i) =>
      i === index
        ? {
            ...card,
            [subfield]: value,
          }
        : { ...card }
    );

    const updatedData = { ...about, cards: updatedCards };

    updateOfferServices(updatedData)
      .unwrap()
      .then(() => setEditingField({ id: "", field: null }))
      .catch((error) => console.error("Update failed:", error));
  };

  const handleEditSaveField = (
    about: OffreServiceModel,
    field: keyof OffreServiceModel,
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
      console.log("Updated Data with Edit Save Field:", updatedData);

      updateOfferServices(updatedData)
        .unwrap()
        .then(() => setEditingField({ id: "", field: null }))
        .catch((error) => console.error("Edit save failed:", error));
    } else {
      console.error("Invalid field for editing:", field);
    }
  };

  const handleTabCheckboxChange = (
    about: OffreServiceModel,
    index: number,
    value: boolean,
    field: keyof (typeof about.cards)[0]
  ) => {
    const updatedTabs = about.cards.map((tab, i) =>
      i === index
        ? {
            ...tab,
            [field]: value ? "1" : "0",
          }
        : tab
    );

    const updatedData = { ...about, cards: updatedTabs };
    updateOfferServices(updatedData)
      .unwrap()
      .then(() => console.log("Checkbox update successful"))
      .catch((error) => console.error("Checkbox update failed:", error));
  };

  const handleSelectChange = (
    about: OffreServiceModel,
    index: number,
    selectedLink: string
  ) => {
    const selectedIcon = AllIcons.find((icon) => icon.code === selectedLink);

    if (selectedIcon) {
      const updatedCards = about.cards.map((card, i) =>
        i === index
          ? {
              ...card,
              icon: selectedIcon.code,
            }
          : card
      );

      const updatedData = { ...about, cards: updatedCards };

      updateOfferServices(updatedData)
        .unwrap()
        .then(() => console.log("Button update successful"))
        .catch((error) => console.error("Button update failed:", error));
    }
  };

  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>(
    {}
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    card: OffreServiceModel["cards"][0],
    offerId: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const updatedCard = {
        ...card,
        image_base64: base64Data,
        image_extension: extension,
        image: `${base64Data}.${extension}`,
      };

      const updatedOffer = data.find((offer) => offer._id === offerId);
      if (updatedOffer) {
        const newOffer = {
          ...updatedOffer,
          cards: updatedOffer.cards.map((c) =>
            c.title === card.title ? updatedCard : c
          ),
        };
        updateOfferServices(newOffer);
        setImagePreviews({
          ...imagePreviews,
          [card.title]: `data:image/${extension};base64,${base64Data}`,
        });
        setEditingField({ id: "", field: null });
      }
    }
  };

  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const handleSelectIcon = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedIcon(value);
  };

  const [addNewCard] = useAddCardToOfferServiceMutation();
  const initialCardForm = {
    title: "",
    display: "",
    content: "",
    image_base64: "",
    image_extension: "",
    image: "",
    icon: "",
  };
  const [cardFrom, setCardForm] = useState(initialCardForm);
  const {
    title,
    display,
    content,
    image_base64,
    image_extension,
    image,
    icon,
  } = cardFrom;

  const onChangeCardForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCardForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const location = useLocation();
  const cardState = location.state;
  const handleFileCardUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("image_base64") as HTMLFormElement)
      .files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const logoImage = base64Data + "." + extension;
      setCardForm({
        ...cardFrom,
        image: logoImage,
        image_base64: base64Data,
        image_extension: extension,
      });
    }
  };

  const onSubmitCardForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedCardForm = {
        ...cardFrom,
        icon: selectedIcon,
        display: "1",
        offerId: cardState?._id!,
      };
      await addNewCard(updatedCardForm).unwrap();
      setCardForm(initialCardForm);
      setAddNewCardForm(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Services Offer" pageTitle="Web Site Settings" />
          <Card>
            <Card.Header>
              <Row>
                <Col lg={4}>
                  <select
                    name="buttonLabel"
                    className="form-select mt-2"
                    onChange={(e) => setSelectedPageId(e.target.value)}
                  >
                    <option value="">Select a Page</option>
                    {AllPages.map((page) => (
                      <option value={page.link} key={page?._id!}>
                        {page.label}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-3">
              {data.map((offer) => (
                <>
                  <Row className="d-flex justify-content-center">
                    <div className="vstack gap-2">
                      <div className="hstack gap-2 justify-content-center">
                        <input
                          type="checkbox"
                          checked={offer.littleTitle?.display === "1"}
                          onChange={(e) =>
                            handleCheckboxChange(
                              offer,
                              "littleTitle",
                              e.target.checked,
                              selectedPageId //
                            )
                          }
                        />
                        {editingField.id === offer._id &&
                        editingField.field === "littleTitle" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedValue}
                            autoFocus
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() =>
                              handleEditSaveField(
                                offer,
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
                            {offer.littleTitle.name}
                          </span>
                        )}

                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              offer._id as string,
                              "littleTitle",
                              offer.littleTitle.name
                            )
                          }
                        ></i>
                      </div>
                      <div className="hstack gap-2 justify-content-center">
                        <input
                          type="checkbox"
                          checked={offer.bigTitle.display === "1"}
                          onChange={(e) =>
                            handleCheckboxChange(
                              offer,
                              "bigTitle",
                              e.target.checked,
                              selectedPageId //
                            )
                          }
                        />
                        {editingField.id === offer._id &&
                        editingField.field === "bigTitle" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedValue}
                            autoFocus
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() =>
                              handleEditSaveField(
                                offer,
                                "bigTitle",
                                editedValue
                              )
                            }
                          />
                        ) : (
                          <h2 className="h2-with-after">
                            {offer.bigTitle.name}
                          </h2>
                        )}
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              offer._id as string,
                              "bigTitle",
                              offer.bigTitle.name
                            )
                          }
                        ></i>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    {offer.cards.map((card, index) => (
                      <Col>
                        <Card
                          className="single-service"
                          key={index}
                          style={{
                            backgroundImage: `url(${card.image})`,
                          }}
                        >
                          <div className="d-flex align-items-start">
                            <input
                              type="checkbox"
                              className="me-2"
                              checked={card.display === "1"}
                              onChange={(e) =>
                                handleTabCheckboxChange(
                                  offer,
                                  index,
                                  e.target.checked,
                                  "display"
                                )
                              }
                            />
                          </div>
                          {editingField.id === offer._id &&
                          editingField.field === `icon-${index}` ? (
                            <select
                              className="form-select form-select-sm"
                              value={card.icon}
                              onChange={(e) =>
                                handleSelectChange(offer, index, e.target.value)
                              }
                              onBlur={() =>
                                setEditingField({
                                  id: "",
                                  field: null,
                                })
                              }
                            >
                              {AllIcons.map((icon) => (
                                <option key={icon.code} value={icon.code}>
                                  {icon.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="d-flex justify-content-center hstack gap-2">
                              <i className={`${card.icon} icon`}></i>
                              <button
                                className="btn btn-link p-0 ms-2"
                                onClick={() =>
                                  handleEditStart(
                                    offer?._id!,
                                    `icon-${index}`,
                                    card.icon
                                  )
                                }
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </div>
                          )}
                          {editingField.id === offer._id &&
                          editingField.field === `title-${index}` ? (
                            <input
                              type="text"
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
                              onBlur={() =>
                                handleEditSave(
                                  offer,
                                  "cards",
                                  index,
                                  "title",
                                  editedValue
                                )
                              }
                              autoFocus
                            />
                          ) : (
                            <div className="hstack gap-2 d-flex justify-content-center">
                              <h5>{card.title}</h5>
                              <button
                                className="btn btn-link p-0 ms-2"
                                onClick={() =>
                                  handleEditStart(
                                    offer?._id!,
                                    `title-${index}`,
                                    card.title
                                  )
                                }
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </div>
                          )}
                          {editingField.id === offer._id &&
                          editingField.field === `content-${index}` ? (
                            <textarea
                              className="form-control"
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
                              onBlur={() =>
                                handleEditSave(
                                  offer,
                                  "cards",
                                  index,
                                  "content",
                                  editedValue
                                )
                              }
                              autoFocus
                            />
                          ) : (
                            <div className="hstack gap-2 d-flex justify-content-center">
                              <p>{card.content}</p>
                              <button
                                className="btn btn-link p-0 ms-2"
                                onClick={() =>
                                  handleEditStart(
                                    offer?._id!,
                                    `content-${index}`,
                                    card.content
                                  )
                                }
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </div>
                          )}
                          <div className="vstack gap-3" key={index}>
                            <h6>Font Image</h6>
                            <div className="vstack gap-2">
                              {imagePreviews[card.title] ? (
                                <Image
                                  src={imagePreviews[card.title]}
                                  alt="Preview"
                                  className="rounded"
                                  width="160"
                                />
                              ) : (
                                <Image
                                  src={`${process.env.REACT_APP_BASE_URL}/offerService/${card?.image}`}
                                  alt=""
                                  className="rounded"
                                  width="160"
                                />
                              )}
                              <div
                                className="mt-n3"
                                style={{ marginLeft: "-250px" }}
                              >
                                <label
                                  htmlFor={`image-${card.title}`}
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
                                  id={`image-${card.title}`}
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileUpload(e, card, offer._id!)
                                  }
                                  style={{ width: "210px", height: "120px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    <Col>
                      <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={() => setAddNewCardForm(!addNewCardForm)}
                      >
                        <span className="icon-on">
                          <i className="ri-add-line align-bottom"></i> New Card
                        </span>
                      </button>
                    </Col>
                    {addNewCardForm && (
                      <form onSubmit={onSubmitCardForm}>
                        <div className="hstack gap-3 mt-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Card Title"
                            id="title"
                            name="title"
                            value={cardFrom.title}
                            onChange={onChangeCardForm}
                          />
                          <select
                            className="form-select text-muted"
                            onChange={handleSelectIcon}
                          >
                            <option value="">Select Icon</option>
                            {AllIcons.map((icon) => (
                              <option value={icon.code} key={icon?._id!}>
                                {icon.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="hstack gap-3 mt-3">
                          <textarea
                            className="form-control"
                            id="content"
                            name="content"
                            value={cardFrom.content}
                            onChange={onChangeCardForm}
                            placeholder="Card Content"
                          />
                          <input
                            type="file"
                            className="form-control"
                            id="image_base64"
                            onChange={handleFileCardUpload}
                          />
                          <Image
                            src={`data:image/jpeg;base64, ${cardFrom.image_base64}`}
                            alt="Preview"
                            className="rounded"
                            width="160"
                          />
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                          <button type="submit" className="btn btn-info">
                            <span className="icon-on">Add</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </Row>
                </>
              ))}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default OfferServices;
