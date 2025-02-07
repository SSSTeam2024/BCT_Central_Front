import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import Swal from "sweetalert2";
import {
  FooterListModel,
  useAddNewFooterListMutation,
  useAddNewItemToFooterListMutation,
  useGetFooterListsQuery,
  useUpdateFooterListMutation,
} from "features/FooterList/footerListSlice";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const FooterList = () => {
  document.title = "Web Site Footer List | Coach Hire Network";

  const notifyFooterList = () => {
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Footer List is added successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyErrorFooterList = (err: any) => {
    Swal.fire({
      position: "top-right",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [addingNewItem, setAddingNewItem] = React.useState<boolean>(false);
  const [displayForms, setDisplayForms] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [editFooterId, setEditFooterId] = useState<string | null>(null);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState<string>("");

  const [createNewFooterList] = useAddNewFooterListMutation();
  const [addNewItemFooterList] = useAddNewItemToFooterListMutation();
  const [updateFooterList] = useUpdateFooterListMutation();
  const { data = [] } = useGetFooterListsQuery();
  const { data: AllPages = [] } = useGetAllPagesQuery();
  const initialFooter = {
    name: "",
    items: [
      {
        name: "",
        order: "",
        display: "",
        link: "",
      },
    ],
    order: "",
    display: "",
  };
  const [newItem, setNewItem] = useState({
    _id: "",
    name: "",
    order: "1",
    display: "1",
    link: "",
  });

  const [newItems, setNewItems] = useState<{ [key: number]: typeof newItem }>(
    {}
  );

  const [footer, setFooter] = useState(initialFooter);
  const { name, items, order, display } = footer;

  const handleDisplayForm = (index: number) => {
    setDisplayForms((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const onChangeFooterList = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFooter((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onChangeFooterDisplay = (e: any) => {
    setFooter((prevState) => ({
      ...prevState,
      display: e.target.checked ? "1" : "0",
    }));
  };

  const onChangeItem = (index: number, e: any) => {
    const selectedPage = AllPages.find((page) => page.label === e.target.value);

    if (selectedPage) {
      const updatedItems = [...items];
      updatedItems[index] = {
        ...updatedItems[index],
        name: selectedPage.label,
        link: selectedPage.link,
      };
      setFooter((prevState) => ({
        ...prevState,
        items: updatedItems,
      }));
    }
  };

  const onChangeItemDisplay = (index: number, e: any) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      display: e.target.checked ? "1" : "0",
    };
    setFooter((prevState) => ({
      ...prevState,
      items: updatedItems,
    }));
  };

  const addNewItemRow = () => {
    setFooter((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { name: "", order: "", display: "1", link: "" },
      ],
    }));
    setAddingNewItem(true);
  };

  const onSubmitFooterList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      footer["display"] = "1";
      createNewFooterList(footer)
        .then(() => setFooter(initialFooter))
        .then(() => notifyFooterList());
    } catch (error) {
      notifyErrorFooterList(error);
    }
  };

  const handleFooterDisplayChange = (
    footerId: string,
    currentDisplay: string
  ) => {
    const footerToUpdate = data.find((footer) => footer._id === footerId);
    if (footerToUpdate) {
      updateFooterList({
        ...footerToUpdate,
        display: currentDisplay === "1" ? "0" : "1",
      });
    }
  };

  const handleFooterEdit = (footerId: string, currentName: string) => {
    setEditFooterId(footerId);
    setUpdatedName(currentName);
  };

  const handleFooterSave = (footerId: string) => {
    const footerToUpdate = data.find((footer) => footer._id === footerId);
    if (footerToUpdate) {
      updateFooterList({
        ...footerToUpdate,
        name: updatedName,
      });
      setEditFooterId(null);
      setUpdatedName("");
    }
  };

  const handleItemEdit = (itemId: string, currentName: string) => {
    setEditItemId(itemId);
    setUpdatedName(currentName);
  };

  const handleItemSave = (
    footerId: string,
    itemIndex: number,
    newDisplay: string,
    newName?: string
  ) => {
    const footerToUpdate = data.find((footer) => footer._id === footerId);
    if (footerToUpdate) {
      const updatedItems = [...footerToUpdate.items];

      // Only update the name if it is provided (i.e., when editing the name)
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        name: newName !== undefined ? newName : updatedItems[itemIndex].name, // Update name only if newName is passed
        display: newDisplay, // Always update display
      };

      // Now pass the updated items to the mutation
      updateFooterList({
        ...footerToUpdate,
        items: updatedItems,
      });

      // Reset edit state
      setEditItemId(null);
      setUpdatedName("");
    }
  };

  const handleAddItem = async (footerId: string, index: number) => {
    try {
      const itemToAdd = { ...newItems[index], footerListId: footerId };
      await addNewItemFooterList(itemToAdd);

      setNewItems({
        ...newItems,
        [index]: {
          _id: "",
          name: "",
          order: "1",
          display: "1",
          link: "",
        },
      });

      handleDisplayForm(index);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };
  const [dataFooter, setDataFooter] = useState<FooterListModel[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      setDataFooter(data);
    }
  }, [data]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If dropped outside a valid destination, exit
    if (!destination) return;

    console.log("Source:", source.index, "Destination:", destination.index);

    // Create a shallow copy of the current state
    const reorderedData = [...dataFooter];

    // Find the item to move using the source index
    const movedFooter = reorderedData[source.index];

    // Check if movedFooter exists
    if (!movedFooter) {
      console.error("Moved footer is undefined. Check your indices.");
      return;
    }

    // Remove the item from its original position
    reorderedData.splice(source.index, 1);

    // Insert the item at the new position
    reorderedData.splice(destination.index, 0, movedFooter);

    // Update the order of each item based on its new index
    const updatedData = reorderedData.map((footer, index) => ({
      ...footer,
      order: (index + 1).toString(), // Ensure the order is a string
    }));

    // Debug reordered and updated data
    console.log("Reordered Data:", reorderedData);
    console.log("Updated Data:", updatedData);

    // Update the state
    setDataFooter(updatedData);

    // Update the backend for each footer
    updatedData.forEach((footer) => {
      if (footer._id) {
        updateFooterList(footer); // Make sure to update only valid footers
      } else {
        console.error("Footer ID is undefined:", footer);
      }
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Footer List" pageTitle="Web Site Settings" />
          <Card>
            <Card.Header style={{ backgroundColor: "#eee" }}>
              <Row>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="footers">
                    {(provided: any) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {[...dataFooter]
                          .sort((a, b) => Number(a.order) - Number(b.order))
                          .map((footer, index) => (
                            <Draggable
                              key={footer._id}
                              draggableId={footer._id}
                              index={index}
                            >
                              {(provided: any) => (
                                <Col
                                  className="p-3"
                                  key={footer._id}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      checked={footer.display === "1"}
                                      onChange={() =>
                                        handleFooterDisplayChange(
                                          footer._id!,
                                          footer.display
                                        )
                                      }
                                      style={{ marginRight: "10px" }}
                                    />
                                    {editFooterId === footer._id ? (
                                      <input
                                        type="text"
                                        value={updatedName}
                                        onChange={(e) =>
                                          setUpdatedName(e.target.value)
                                        }
                                        onBlur={() =>
                                          handleFooterSave(footer._id!)
                                        }
                                        autoFocus
                                      />
                                    ) : (
                                      <>
                                        <h5
                                          className="mb-0"
                                          onClick={() =>
                                            handleFooterEdit(
                                              footer._id!,
                                              footer.name
                                            )
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          {footer.name}
                                        </h5>
                                        <i
                                          className="bi bi-pencil ms-2"
                                          onClick={() =>
                                            handleFooterEdit(
                                              footer._id!,
                                              footer.name
                                            )
                                          }
                                          style={{ cursor: "pointer" }}
                                        ></i>
                                      </>
                                    )}
                                  </div>
                                  {footer.items.map((item, index) => (
                                    <ul
                                      className="p-2"
                                      style={{ listStyleType: "none" }}
                                      key={index}
                                    >
                                      <li className="d-flex align-items-center text-dark">
                                        {/* Always show checkbox */}
                                        <input
                                          type="checkbox"
                                          checked={item.display === "1"} // Check if display is "1"
                                          onChange={(e) => {
                                            const newDisplay = e.target.checked
                                              ? "1"
                                              : "0"; // Toggle between "1" and "0"
                                            handleItemSave(
                                              footer._id!,
                                              index,
                                              newDisplay
                                            ); // Pass new display value and keep name unchanged
                                          }}
                                        />

                                        {/* Show name or input field depending on edit mode */}
                                        {editItemId ===
                                        `${footer._id}-${index}` ? (
                                          <div className="hstack gap-3">
                                            <input
                                              type="text"
                                              value={updatedName}
                                              onChange={(e) =>
                                                setUpdatedName(e.target.value)
                                              }
                                              onBlur={() =>
                                                handleItemSave(
                                                  footer._id!,
                                                  index,
                                                  item.display,
                                                  updatedName
                                                )
                                              } // Only pass updated name when editing
                                              autoFocus
                                            />
                                          </div>
                                        ) : (
                                          <>
                                            {item.name}
                                            <i
                                              className="bi bi-pencil ms-2"
                                              onClick={() =>
                                                handleItemEdit(
                                                  `${footer._id}-${index}`,
                                                  item.name
                                                )
                                              }
                                              style={{ cursor: "pointer" }}
                                            ></i>
                                          </>
                                        )}
                                      </li>
                                    </ul>
                                  ))}

                                  <button
                                    className="btn btn-darken-light btn-sm"
                                    onClick={() => handleDisplayForm(index)}
                                  >
                                    <i className="ri-add-line"></i>
                                  </button>
                                  {displayForms[index] && (
                                    <Form>
                                      <Row className="mt-2">
                                        <Col lg={6}>
                                          <Form.Select
                                            id="name"
                                            className="form-select-sm"
                                            value={newItems[index]?.name || ""}
                                            onChange={(e) => {
                                              const selectedPage =
                                                AllPages.find(
                                                  (page) =>
                                                    page.label ===
                                                    e.target.value
                                                );
                                              if (selectedPage) {
                                                setNewItems({
                                                  ...newItems,
                                                  [index]: {
                                                    ...newItems[index],
                                                    name: selectedPage.label,
                                                    link: selectedPage.link,
                                                  },
                                                });
                                              }
                                            }}
                                          >
                                            <option value="" disabled>
                                              Select
                                            </option>
                                            {AllPages.map((page) => (
                                              <option
                                                key={page.label}
                                                value={page.label}
                                              >
                                                {page.label}
                                              </option>
                                            ))}
                                          </Form.Select>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="hstack gap-1">
                                            <Form.Select
                                              className="form-select-sm"
                                              value={
                                                newItems[index]?.order || "1"
                                              }
                                              onChange={(e) =>
                                                setNewItems({
                                                  ...newItems,
                                                  [index]: {
                                                    ...newItems[index],
                                                    order: e.target.value,
                                                  },
                                                })
                                              }
                                            >
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4</option>
                                              <option value="5">5</option>
                                            </Form.Select>
                                            <button
                                              type="button"
                                              className="btn btn-primary btn-sm"
                                              onClick={() =>
                                                handleAddItem(
                                                  footer?._id!,
                                                  index
                                                )
                                              }
                                            >
                                              Add
                                            </button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Form>
                                  )}
                                </Col>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Row>
              {data.length === 4 ? (
                ""
              ) : (
                <Form onSubmit={onSubmitFooterList}>
                  <Row className="mt-3">
                    <Col>
                      <Form.Control
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChangeFooterList}
                        placeholder="Label"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        id="order"
                        name="order"
                        value={order}
                        onChange={onChangeFooterList}
                        placeholder="Order"
                      />
                    </Col>
                    <Col>
                      <input
                        type="checkbox"
                        checked={display === "1"}
                        onChange={onChangeFooterDisplay}
                      />
                    </Col>
                    <Col>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={addNewItemRow}
                      >
                        Add Item
                      </button>
                    </Col>
                  </Row>
                  {items.map((item, index) => (
                    <Row key={index} className="mt-3">
                      <Col>
                        <Form.Select
                          id="name"
                          value={item.name}
                          onChange={(e) => onChangeItem(index, e)}
                        >
                          <option value="" disabled>
                            Select a Page
                          </option>
                          {AllPages.map((page) => (
                            <option key={page.label} value={page.label}>
                              {page.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          id="order"
                          name={`order-${index}`}
                          value={item.order}
                          onChange={(e) => onChangeItem(index, e)}
                          placeholder="Item Order"
                        />
                      </Col>
                      <Col>
                        <input
                          type="checkbox"
                          checked={item.display === "1"}
                          onChange={(e) => onChangeItemDisplay(index, e)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Row className="mt-2">
                    <Col className="text-end">
                      <button type="submit" className="btn btn-info btn-sm">
                        New List
                      </button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Card.Header>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default FooterList;
