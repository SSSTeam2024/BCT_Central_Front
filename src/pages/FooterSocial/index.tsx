import React, { useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import {
  FooterSocialModel,
  useGetFooterSocialsQuery,
  useUpdateFooterSocialMutation,
} from "features/FooterSocial/footerSocialSlice";

interface FooterSocialModelInterface {
  termsAndConditions: {
    name: string;
    link: string;
    display: string;
  };
  privacyPolicy: {
    name: string;
    link: string;
    display: string;
  };
  socialLinks: {
    x: {
      link: string;
      display: string;
    };
    facebook: {
      link: string;
      display: string;
    };
    googlePlus: {
      link: string;
      display: string;
    };
    tiktok: {
      link: string;
      display: string;
    };
    youtube: {
      link: string;
      display: string;
    };
  };
}

const FooterSocial = () => {
  document.title = "WebSite Social Media | Coach Hire Network";

  const { data: socialMediaData = [] } = useGetFooterSocialsQuery();

  const [updateSocialMediaLinks] = useUpdateFooterSocialMutation();

  const [editingField, setEditingField] = useState<{
    id: string;
    field: string | null;
  }>({ id: "", field: null });
  const [editedValue, setEditedValue] = useState<string>("");

  const handleCheckboxChange = (
    footer: FooterSocialModel | any,
    field: keyof FooterSocialModelInterface,
    value: boolean
  ) => {
    const [part1, part2] = field.split(".");

    if (
      typeof footer[part1][part2] === "object" &&
      footer[part1][part2] !== null &&
      "display" in footer[part1][part2]!
    ) {
      const updatedData = {
        ...footer,
        [part1]: {
          ...footer[part1],
          [part2]: {
            ...footer[part1][part2],
            display: value ? "1" : "0",
          },
        },
      };
      updateSocialMediaLinks(updatedData)
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

  const handleCheckboxChangeLevel1 = (
    footer: FooterSocialModel,
    field: keyof FooterSocialModelInterface,
    value: boolean
  ) => {
    if (
      typeof footer[field] === "object" &&
      footer[field] !== null &&
      "display" in footer[field]!
    ) {
      const updatedData: FooterSocialModel = {
        ...footer,
        [field]: {
          ...footer[field],
          display: value ? "1" : "0",
        },
      };

      updateSocialMediaLinks(updatedData)
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

  const handleEditSave = (footer: FooterSocialModel, field: any) => {
    let updatedData: FooterSocialModel;

    if (field.startsWith("socialLinks.") && field.endsWith(".link")) {
      const socialKey = field.split(
        "."
      )[1] as keyof FooterSocialModel["socialLinks"];

      updatedData = {
        ...footer,
        socialLinks: {
          ...footer.socialLinks,
          [socialKey]: {
            ...footer.socialLinks[socialKey],
            link: editedValue,
          },
        },
      };
    } else if (field === "siteName") {
      updatedData = {
        ...footer,
        siteName: editedValue,
      };
    } else {
      updatedData = {
        ...footer,
        [field]: {
          ...footer[field as keyof FooterSocialModelInterface],
          name: editedValue,
        },
      };
    }

    updateSocialMediaLinks(updatedData)
      .unwrap()
      .then(() => setEditingField({ id: "", field: null }))
      .catch((error) => console.error("Update failed:", error));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Social Media" pageTitle="Web Site Settings" />
          <Card>
            <Card.Header>
              {socialMediaData.map((footer) => (
                <>
                  <div className="hstack gap-2 p-4">
                    <div className="vstack gap-3">
                      <div className="hstack gap-2">
                        <input
                          style={{
                            marginBottom: "10px",
                            marginTop: "-8px",
                          }}
                          type="checkbox"
                          checked={footer.termsAndConditions.display === "1"}
                          onChange={(e) =>
                            handleCheckboxChangeLevel1(
                              footer,
                              "termsAndConditions",
                              e.target.checked
                            )
                          }
                        />
                        {editingField.id === footer._id &&
                        editingField.field === "termsAndConditions" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedValue}
                            autoFocus
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() =>
                              handleEditSave(footer, "termsAndConditions")
                            }
                          />
                        ) : (
                          <span>{footer.termsAndConditions.name}</span>
                        )}
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              footer._id as string,
                              "termsAndConditions",
                              footer.termsAndConditions.name
                            )
                          }
                        ></i>
                      </div>
                      <div className="hstack gap-2">
                        <input
                          type="checkbox"
                          checked={footer.privacyPolicy.display === "1"}
                          onChange={(e) =>
                            handleCheckboxChangeLevel1(
                              footer,
                              "privacyPolicy",
                              e.target.checked
                            )
                          }
                        />
                        {editingField.id === footer._id &&
                        editingField.field === "privacyPolicy" ? (
                          <input
                            className="form-control"
                            type="text"
                            autoFocus
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() =>
                              handleEditSave(footer, "privacyPolicy")
                            }
                          />
                        ) : (
                          <span>{footer.privacyPolicy.name}</span>
                        )}
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              footer._id as string,
                              "privacyPolicy",
                              footer.privacyPolicy.name
                            )
                          }
                        ></i>
                      </div>
                      <div>
                        {editingField.id === footer._id &&
                        editingField.field === "siteName" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            onBlur={() => {
                              if (editedValue.trim() !== "") {
                                handleEditSave(footer, "siteName");
                              } else {
                                setEditingField({ id: "", field: null });
                              }
                            }}
                          />
                        ) : (
                          <span>{footer.siteName}</span>
                        )}
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={() =>
                            handleEditStart(
                              footer._id as string,
                              "siteName",
                              footer.siteName
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <Row>
                    {Object.entries(footer.socialLinks).map(([key, social]) => (
                      <Col key={key}>
                        <div className="hstack gap-2">
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={social.display === "1"}
                            onChange={(e) =>
                              handleCheckboxChange(
                                footer,
                                `socialLinks.${key}` as keyof FooterSocialModelInterface,
                                e.target.checked
                              )
                            }
                          />
                          <i
                            className={`bi bi-${
                              key === "x"
                                ? "twitter"
                                : key === "googlePlus"
                                ? "google"
                                : key
                            }`}
                            onClick={() =>
                              handleEditStart(
                                footer._id || "",
                                `socialLinks.${key}.link`,
                                social.link
                              )
                            }
                          ></i>
                          {editingField.id === footer?._id! &&
                          editingField.field === `socialLinks.${key}.link` ? (
                            <input
                              type="text"
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
                              onBlur={() =>
                                handleEditSave(
                                  footer,
                                  `socialLinks.${key}.link`
                                )
                              }
                            />
                          ) : (
                            <i
                              className="mdi mdi-pencil"
                              onClick={() =>
                                handleEditStart(
                                  footer?._id! || "",
                                  `socialLinks.${key}.link`,
                                  social.link
                                )
                              }
                            ></i>
                          )}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </>
              ))}
            </Card.Header>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default FooterSocial;
