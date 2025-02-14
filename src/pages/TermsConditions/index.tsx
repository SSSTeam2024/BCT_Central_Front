import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col, Form, Image } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import {
  useGetAboutUsComponentsQuery,
  useUpdateAboutUsMutation,
} from "features/AboutUsComponent/aboutUsSlice";
import { useGetAllPagesQuery } from "features/pageCollection/pageSlice";
import {
  TermConditionModel,
  useGetTermsConditionsQuery,
  useUpdateTermConditionMutation,
} from "features/TermsConditionsComponent/termsCoditionSlice";

interface TermsConditionsModelInterface {
  bigTitle: {
    content: string;
    display: string;
  };
  paragraph: {
    content: string;
    display: string;
  };
}

interface TermsConditionProps {
  selectedPage: string;
}

const TermsConditions: React.FC<TermsConditionProps> = ({ selectedPage }) => {
  const { data: AllTermsConditions = [] } = useGetTermsConditionsQuery();
  const [updateTermCondition] = useUpdateTermConditionMutation();

  const filtredTermsConditionData = AllTermsConditions.filter(
    (term) => term.page === selectedPage
  );

  const [editingField, setEditingField] = useState<{
    id: string;
    field: string | null;
  }>({ id: "", field: null });
  const [editedValue, setEditedValue] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCheckboxChange = (
    about: TermConditionModel,
    field: keyof TermsConditionsModelInterface,
    value: boolean
  ) => {
    if (
      typeof about[field] === "object" &&
      about[field] !== null &&
      "display" in about[field]!
    ) {
      const updatedData: TermConditionModel = {
        ...about,
        [field]: {
          ...about[field],
          display: value ? "1" : "0",
        },
      };

      updateTermCondition(updatedData)
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

  const handleEditSave = (
    about: TermConditionModel,
    field: keyof TermsConditionsModelInterface
  ) => {
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
      updateTermCondition(updatedData);
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
      updateTermCondition(updatedData);
      setEditingField({ id: "", field: null });
    }
  };

  return (
    <React.Fragment>
      {filtredTermsConditionData.map((about) => (
        <Row className="p-4">
          <Col lg={1}>
            <input
              type="checkbox"
              checked={about?.display === "1"}
              onChange={(e) =>
                updateTermCondition({
                  ...about,
                  display: e.target.checked ? "1" : "0",
                })
              }
            />
          </Col>
          <Col lg={11}>
            <div className="hstack gap-2">
              <div className="vstack gap-3">
                <div className="hstack gap-2">
                  <input
                    type="checkbox"
                    checked={about.bigTitle.display === "1"}
                    onChange={(e) =>
                      handleCheckboxChange(about, "bigTitle", e.target.checked)
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
                    <h3>{about.bigTitle.content}</h3>
                  )}
                  <i
                    className="bi bi-pencil"
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                    onClick={() =>
                      handleEditStart(
                        about._id as string,
                        "bigTitle",
                        about.bigTitle.content
                      )
                    }
                  ></i>
                </div>
                <div className="hstack gap-2">
                  <input
                    type="checkbox"
                    checked={about.paragraph.display === "1"}
                    onChange={(e) =>
                      handleCheckboxChange(about, "paragraph", e.target.checked)
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
                    <span>{about.paragraph.content.slice(0, 178)}...</span>
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
              </div>
            </div>
          </Col>
        </Row>
      ))}
    </React.Fragment>
  );
};
export default TermsConditions;
