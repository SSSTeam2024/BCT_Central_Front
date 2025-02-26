import React, { useState } from "react";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import {
  useAddNewItemMutation,
  useAddSubItemToItemMutation,
  useGetMenusQuery,
  useUpdateMenuMutation,
} from "features/menu/menuSlice";
import { useLocation } from "react-router-dom";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";

const MenuSite = () => {
  document.title = "WebSite Menu | Coach Hire Network";

  const { data: AllMenu = [] } = useGetMenusQuery();
  const { data: AllPages = [] } = useGetAllPagesQuery();
  const [updateMenuMutation] = useUpdateMenuMutation();
  const [addNewItemMutation] = useAddNewItemMutation();
  const [addingSubItem, setAddingSubItem] = React.useState<{
    menuId: string;
    itemId: string;
  } | null>(null);
  const [newSubItem, setNewSubItem] = useState({
    label: "",
    link: "",
    order: 0,
    target: "_self",
    display: true,
  });
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const location = useLocation();
  const menu = location.state;
  const [editing, setEditing] = useState<{
    itemId: string | null;
    subItemId: string | null;
    label: string;
  }>({ itemId: null, subItemId: null, label: "" });

  const handleEditClick = (
    itemId: string,
    subItemId: string | null,
    label: string
  ) => {
    setEditing({ itemId, subItemId, label });
  };

  const handleSave = (menuId: string) => {
    const updatedMenu = AllMenu.find((menu) => menu._id === menuId);
    if (!updatedMenu) return;

    const updatedItems = updatedMenu.items.map((item: any) => {
      if (item._id === editing.itemId) {
        if (editing.subItemId) {
          return {
            ...item,
            subItems: item.subItems.map((subItem: any) =>
              subItem._id === editing.subItemId
                ? { ...subItem, label: editing.label }
                : subItem
            ),
          };
        }
        return { ...item, label: editing.label };
      }
      return item;
    });

    updateMenuMutation({
      _id: menuId,
      menuName: "Nav Bar",
      items: updatedItems,
    });
    setEditing({ itemId: null, subItemId: null, label: "" });
  };

  const handleCheckboxChange = (
    menuId: string,
    itemId: string,
    subItemId: string | null,
    display: boolean
  ) => {
    const updatedMenu = AllMenu.find((menu) => menu._id === menuId);
    if (!updatedMenu) return;

    const updatedItems = updatedMenu.items.map((item: any) => {
      if (item._id === itemId) {
        if (subItemId) {
          return {
            ...item,
            subItems: item.subItems.map((subItem: any) =>
              subItem._id === subItemId
                ? { ...subItem, display: !display }
                : subItem
            ),
          };
        }
        return { ...item, display: !display };
      }
      return item;
    });

    updateMenuMutation({
      _id: menuId,
      menuName: "Nav Bar",
      items: updatedItems,
    });
  };

  const [newItem, setNewItem] = useState({
    menuId: "",
    label: "",
    link: "",
    order: 0,
    target: "_self",
    display: true,
  });

  const handleAddNewItem = async () => {
    try {
      await addNewItemMutation({
        menuId: menu?._id!,
        newItem: {
          label: newItem.label,
          link: newItem.link,
          order: newItem.order,
          target: newItem.target,
          display: newItem.display,
        },
      });
      setNewItem({
        menuId: "",
        label: "",
        link: "",
        order: 0,
        target: "_self",
        display: true,
      });
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };
  const totalItemsLength = AllMenu.reduce(
    (sum, menu) => sum + menu.items.length,
    0
  );
  const [addSubItemMutation] = useAddSubItemToItemMutation();

  const handleAddSubItem = async () => {
    if (!addingSubItem) return;

    const { menuId, itemId } = addingSubItem;

    try {
      // console.log("new sub item", newSubItem);
      await addSubItemMutation({
        menuId,
        itemId,
        subItem: {
          label: newSubItem.label,
          link: newSubItem.link,
          order: newSubItem.order,
          target: newSubItem.target,
          display: newSubItem.display,
        },
      });

      setAddingSubItem(null);
      setNewSubItem({
        label: "",
        link: "",
        order: 0,
        target: "_self",
        display: true,
      });
    } catch (error) {
      console.error("Error adding subitem:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Menu" pageTitle="Web Site Settings" />
          <Card>
            <Card.Header className="p-3">
              {AllMenu.map((menu) =>
                menu.items.map((item: any) => (
                  <Row key={item.label} className="border-bottom">
                    <Col className="mt-2 mb-3">
                      <input
                        type="checkbox"
                        checked={item.display}
                        onChange={() =>
                          handleCheckboxChange(
                            menu._id!,
                            item._id!,
                            null,
                            item.display
                          )
                        }
                      />
                      {editing.itemId === item._id && !editing.subItemId ? (
                        <input
                          type="text"
                          value={editing.label}
                          onChange={(e) =>
                            setEditing({ ...editing, label: e.target.value })
                          }
                          onBlur={() => handleSave(menu._id!)}
                        />
                      ) : (
                        <span>
                          {item.label}{" "}
                          <span
                            onClick={() =>
                              handleEditClick(item._id!, null, item.label)
                            }
                          >
                            <i className="ph ph-pencil-simple"></i>
                          </span>
                        </span>
                      )}
                    </Col>

                    <Col lg={10} className="mt-2 mb-3">
                      <ul>
                        {item.subItems.map((subItem: any) => (
                          <li key={subItem.label}>
                            <input
                              type="checkbox"
                              checked={subItem.display}
                              onChange={() =>
                                handleCheckboxChange(
                                  menu._id!,
                                  item._id!,
                                  subItem._id!,
                                  subItem.display
                                )
                              }
                            />
                            {editing.itemId === item._id &&
                            editing.subItemId === subItem._id ? (
                              <input
                                type="text"
                                value={editing.label}
                                onChange={(e) =>
                                  setEditing({
                                    ...editing,
                                    label: e.target.value,
                                  })
                                }
                                onBlur={() => handleSave(menu._id!)}
                              />
                            ) : (
                              <span>
                                {subItem.label}{" "}
                                <span
                                  onClick={() =>
                                    handleEditClick(
                                      item._id!,
                                      subItem._id!,
                                      subItem.label
                                    )
                                  }
                                >
                                  <i className="ph ph-pencil-simple"></i>
                                </span>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          setAddingSubItem({
                            menuId: menu._id!,
                            itemId: item._id!,
                          })
                        }
                      >
                        +
                      </button>
                      {addingSubItem?.itemId === item._id && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddSubItem();
                          }}
                          className="mt-2"
                        >
                          <Row>
                            <Col>
                              {/* <Form.Control
                                type="text"
                                placeholder="Subitem label"
                                value={newSubItem.label}
                                onChange={(e) =>
                                  setNewSubItem({
                                    ...newSubItem,
                                    label: e.target.value,
                                  })
                                }
                              /> */}
                              <Form.Select
                                id="name"
                                className="form-select-sm"
                                // value={newItems[index]?.name || ""}
                                onChange={(e) => {
                                  const selectedPage = AllPages.find(
                                    (page) => page.label === e.target.value
                                  );
                                  // console.log("selectedPage", selectedPage);
                                  if (selectedPage) {
                                    setNewSubItem({
                                      ...newSubItem,
                                      label: selectedPage.label,
                                      link: selectedPage.link,
                                    });
                                  }
                                }}
                              >
                                <option value="" disabled>
                                  Select
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
                                type="number"
                                placeholder="Order"
                                value={newSubItem.order}
                                onChange={(e) =>
                                  setNewSubItem({
                                    ...newSubItem,
                                    order: +e.target.value,
                                  })
                                }
                              />
                            </Col>
                            <Col>
                              <div className="hstack gap-3">
                                <button
                                  type="submit"
                                  className="btn btn-success btn-sm"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => setAddingSubItem(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </form>
                      )}
                    </Col>
                  </Row>
                ))
              )}
              <Row className="m-2">
                <Col>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => setDisplayForm(!displayForm)}
                    disabled={totalItemsLength >= 10}
                  >
                    <i className="ph ph-plus"></i>
                  </button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {displayForm && (
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Label"
                      value={newItem.label}
                      onChange={(e) =>
                        setNewItem({ ...newItem, label: e.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Order"
                      value={newItem.order}
                      onChange={(e) =>
                        setNewItem({ ...newItem, order: +e.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <input
                      type="checkbox"
                      checked={newItem.display}
                      onChange={(e) =>
                        setNewItem({ ...newItem, display: e.target.checked })
                      }
                    />
                  </Col>
                  <Col>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleAddNewItem()}
                      disabled={!newItem.label}
                    >
                      Add
                    </button>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default MenuSite;
